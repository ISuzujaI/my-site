#!/bin/bash

# Скрипт быстрого развертывания на production
# Использование: ./scripts/deploy.sh [vercel|netlify|supabase]

set -e

PLATFORM="${1:-vercel}"
ENVIRONMENT="production"

echo "🚀 Начинаем развертывание на $PLATFORM..."

# Проверка наличия необходимых файлов
if [ ! -f ".env.production" ]; then
    echo "❌ Файл .env.production не найден!"
    echo "Создайте его на основе .env.production.example"
    exit 1
fi

# Загрузка переменных окружения
export $(cat .env.production | xargs)

echo "📦 Установка зависимостей..."
npm install

echo "🔨 Сборка приложения..."
npm run build

if [ "$PLATFORM" == "vercel" ]; then
    echo "☁️  Развертывание на Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        echo "📥 Установка Vercel CLI..."
        npm install -g vercel
    fi
    
    vercel --prod --yes
    
elif [ "$PLATFORM" == "netlify" ]; then
    echo "☁️  Развертывание на Netlify..."
    
    if ! command -v netlify &> /dev/null; then
        echo "📥 Установка Netlify CLI..."
        npm install -g netlify-cli
    fi
    
    netlify deploy --prod --dir=dist
    
elif [ "$PLATFORM" == "supabase" ]; then
    echo "☁️  Развертывание Edge Functions на Supabase..."
    
    if ! command -v supabase &> /dev/null; then
        echo "❌ Supabase CLI не установлен!"
        echo "Установите его: https://supabase.com/docs/guides/cli"
        exit 1
    fi
    
    # Проверка наличия SUPABASE_PROJECT_REF
    if [ -z "$SUPABASE_PROJECT_REF" ]; then
        echo "❌ SUPABASE_PROJECT_REF не установлен в .env.production"
        exit 1
    fi
    
    echo "🔗 Связываем проект..."
    supabase link --project-ref "$SUPABASE_PROJECT_REF"
    
    echo "📤 Развертывание Edge Functions..."
    supabase functions deploy server --no-verify-jwt
    
    echo "🔑 Установка секретов..."
    supabase secrets set SUPABASE_URL="$VITE_SUPABASE_URL"
    supabase secrets set SUPABASE_ANON_KEY="$VITE_SUPABASE_ANON_KEY"
    
    if [ ! -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
        supabase secrets set SUPABASE_SERVICE_ROLE_KEY="$SUPABASE_SERVICE_ROLE_KEY"
    fi
    
else
    echo "❌ Неизвестная платформа: $PLATFORM"
    echo "Доступные варианты: vercel, netlify, supabase"
    exit 1
fi

echo "✅ Развертывание завершено успешно!"
echo ""
echo "📋 Следующие шаги:"
echo "1. Проверьте сайт в браузере"
echo "2. Инициализируйте базу данных: curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/make-server-de695671/seed"
echo "3. Создайте админ пользователя через /auth/signup"
echo "4. Настройте домен в панели управления"
echo ""
echo "🎉 Удачи!"
