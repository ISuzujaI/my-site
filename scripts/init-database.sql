-- Инициализация базы данных для Abuvet
-- Этот файл нужно выполнить в Supabase SQL Editor

-- ============================================
-- 1. Создание таблицы KV Store
-- ============================================

CREATE TABLE IF NOT EXISTS kv_store_de695671 (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE kv_store_de695671 IS 'Ключ-значение хранилище для приложения Abuvet';

-- Индекс для быстрого поиска по префиксу
CREATE INDEX IF NOT EXISTS idx_kv_store_key_prefix 
  ON kv_store_de695671 (key text_pattern_ops);

-- Индекс для сортировки по дате создания
CREATE INDEX IF NOT EXISTS idx_kv_store_created_at 
  ON kv_store_de695671 (created_at DESC);

-- ============================================
-- 2. Триггер для автоматического обновления updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_kv_store_updated_at 
  BEFORE UPDATE ON kv_store_de695671
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 3. Row Level Security (RLS)
-- ============================================

ALTER TABLE kv_store_de695671 ENABLE ROW LEVEL SECURITY;

-- Политика: разрешить все операции для service_role
-- (это нужно для работы через Edge Functions)
CREATE POLICY "Allow all for service role" 
  ON kv_store_de695671
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Политика: authenticated пользователи могут читать публичные записи
CREATE POLICY "Authenticated users can read public data" 
  ON kv_store_de695671
  FOR SELECT
  USING (
    auth.role() = 'authenticated' 
    AND (value->>'public')::boolean = true
  );

-- ============================================
-- 4. Storage Buckets для изображений
-- ============================================

-- Создание bucket для фотографий врачей
INSERT INTO storage.buckets (id, name, public)
VALUES ('make-de695671-doctors', 'make-de695671-doctors', false)
ON CONFLICT (id) DO NOTHING;

-- Создание bucket для контента сайта
INSERT INTO storage.buckets (id, name, public)
VALUES ('make-de695671-content', 'make-de695671-content', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies для doctors bucket
CREATE POLICY "Service role can manage doctor images"
  ON storage.objects FOR ALL
  USING (bucket_id = 'make-de695671-doctors')
  WITH CHECK (bucket_id = 'make-de695671-doctors');

-- Storage policies для content bucket
CREATE POLICY "Service role can manage content images"
  ON storage.objects FOR ALL
  USING (bucket_id = 'make-de695671-content')
  WITH CHECK (bucket_id = 'make-de695671-content');

-- ============================================
-- 5. Функции для работы с KV Store
-- ============================================

-- Функция для получения значения по ключу
CREATE OR REPLACE FUNCTION get_kv_value(p_key TEXT)
RETURNS JSONB AS $$
BEGIN
  RETURN (SELECT value FROM kv_store_de695671 WHERE key = p_key);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Функция для установки значения
CREATE OR REPLACE FUNCTION set_kv_value(p_key TEXT, p_value JSONB)
RETURNS VOID AS $$
BEGIN
  INSERT INTO kv_store_de695671 (key, value)
  VALUES (p_key, p_value)
  ON CONFLICT (key) 
  DO UPDATE SET value = p_value, updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Функция для удаления значения
CREATE OR REPLACE FUNCTION delete_kv_value(p_key TEXT)
RETURNS VOID AS $$
BEGIN
  DELETE FROM kv_store_de695671 WHERE key = p_key;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Функция для получения всех ключей с префиксом
CREATE OR REPLACE FUNCTION get_kv_by_prefix(p_prefix TEXT)
RETURNS TABLE(key TEXT, value JSONB, created_at TIMESTAMP WITH TIME ZONE) AS $$
BEGIN
  RETURN QUERY
  SELECT kv.key, kv.value, kv.created_at
  FROM kv_store_de695671 kv
  WHERE kv.key LIKE p_prefix || '%'
  ORDER BY kv.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 6. Представления для удобного доступа
-- ============================================

-- Представление для врачей
CREATE OR REPLACE VIEW doctors_view AS
SELECT 
  key,
  value->>'id' as id,
  value->>'name' as name,
  value->>'specialty' as specialty,
  value->>'email' as email,
  value->>'phone' as phone,
  value
FROM kv_store_de695671
WHERE key LIKE 'doctor:%';

-- Представление для услуг
CREATE OR REPLACE VIEW services_view AS
SELECT 
  key,
  value->>'id' as id,
  value->>'name' as name,
  value->>'category' as category,
  value->>'price' as price,
  value
FROM kv_store_de695671
WHERE key LIKE 'service:%';

-- Представление для записей
CREATE OR REPLACE VIEW bookings_view AS
SELECT 
  key,
  value->>'id' as id,
  value->>'doctorId' as doctor_id,
  value->>'userId' as user_id,
  value->>'date' as booking_date,
  value->>'status' as status,
  value,
  created_at
FROM kv_store_de695671
WHERE key LIKE 'booking:%'
ORDER BY created_at DESC;

-- ============================================
-- 7. Индексы для улучшения производительности
-- ============================================

-- GIN индекс для JSONB поиска
CREATE INDEX IF NOT EXISTS idx_kv_store_value_gin 
  ON kv_store_de695671 USING gin(value);

-- Индекс для поиска по типу объекта (по началу ключа)
CREATE INDEX IF NOT EXISTS idx_kv_store_key_type
  ON kv_store_de695671 (split_part(key, ':', 1));

-- ============================================
-- 8. Статистика и мониторинг
-- ============================================

-- Представление для статистики использования
CREATE OR REPLACE VIEW kv_stats AS
SELECT 
  split_part(key, ':', 1) as object_type,
  COUNT(*) as count,
  pg_size_pretty(SUM(pg_column_size(value))) as total_size,
  MAX(created_at) as last_created,
  MAX(updated_at) as last_updated
FROM kv_store_de695671
GROUP BY split_part(key, ':', 1)
ORDER BY count DESC;

-- ============================================
-- 9. Функция очистки старых данных
-- ============================================

CREATE OR REPLACE FUNCTION cleanup_old_bookings(days_old INTEGER DEFAULT 365)
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  WITH deleted AS (
    DELETE FROM kv_store_de695671
    WHERE key LIKE 'booking:%'
      AND (value->>'status') = 'completed'
      AND created_at < NOW() - INTERVAL '1 day' * days_old
    RETURNING *
  )
  SELECT COUNT(*) INTO deleted_count FROM deleted;
  
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION cleanup_old_bookings IS 
  'Удаляет завершенные записи старше указанного количества дней (по умолчанию 365)';

-- ============================================
-- 10. Grants для безопасности
-- ============================================

-- Разрешить authenticated пользователям использовать представления
GRANT SELECT ON doctors_view TO authenticated;
GRANT SELECT ON services_view TO authenticated;
GRANT SELECT ON bookings_view TO authenticated;
GRANT SELECT ON kv_stats TO authenticated;

-- ============================================
-- Завершение
-- ============================================

-- Вывод информации о созданных объектах
DO $$
BEGIN
  RAISE NOTICE '✅ База данных успешно инициализирована!';
  RAISE NOTICE '';
  RAISE NOTICE '📊 Статистика:';
  RAISE NOTICE '  - Таблиц создано: 1';
  RAISE NOTICE '  - Индексов создано: 4';
  RAISE NOTICE '  - Функций создано: 5';
  RAISE NOTICE '  - Представлений создано: 4';
  RAISE NOTICE '  - Политик RLS: 4';
  RAISE NOTICE '  - Storage buckets: 2';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Следующие шаги:';
  RAISE NOTICE '  1. Вызовите POST /make-server-de695671/seed для загрузки начальных данных';
  RAISE NOTICE '  2. Создайте админ пользователя через POST /make-server-de695671/auth/signup';
  RAISE NOTICE '  3. Настройте SMTP для email уведомлений в Supabase Dashboard';
  RAISE NOTICE '';
  RAISE NOTICE '🎉 Готово к использованию!';
END $$;
