import { useState, useEffect } from 'react';
import { Edit2, Save, X } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';

type PageContentMap = Record<string, string>;
const pageContentPromiseCache = new Map<string, Promise<PageContentMap>>();
const pageContentValueCache = new Map<string, PageContentMap>();

async function loadPageContent(apiBase: string, page: string, version: number): Promise<PageContentMap> {
  const cacheId = `${page}:${version}`;

  if (pageContentValueCache.has(cacheId)) {
    return pageContentValueCache.get(cacheId)!;
  }

  if (pageContentPromiseCache.has(cacheId)) {
    return pageContentPromiseCache.get(cacheId)!;
  }

  const request = (async () => {
    const response = await fetch(`${apiBase}/content/${page}?_ts=${Date.now()}`, {
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    if (!response.ok) {
      return {};
    }

    const result = await response.json();
    if (!result.success || !Array.isArray(result.data)) {
      return {};
    }

    const map: PageContentMap = {};
    for (const item of result.data) {
      if (item?.key && typeof item.value === 'string') {
        map[item.key] = item.value;
      }
    }

    pageContentValueCache.set(cacheId, map);
    return map;
  })();

  pageContentPromiseCache.set(cacheId, request);
  request.finally(() => pageContentPromiseCache.delete(cacheId));

  return request;
}

interface EditableTextProps {
  page: string;
  contentKey: string;
  defaultValue: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  style?: React.CSSProperties;
  isAdmin?: boolean;
  multiline?: boolean;
}

export function EditableText({
  page,
  contentKey,
  defaultValue,
  as: Component = 'p',
  className = '',
  style,
  isAdmin = false,
  multiline = false,
}: EditableTextProps) {
  const { language } = useLanguage();
  const localizedContentKey = `${contentKey}_${language}`;
  const [value, setValue] = useState(defaultValue);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(defaultValue);
  const { refreshContent, contentVersion } = useContent();

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-de695671`;

  // Load content on mount and when contentVersion changes
  useEffect(() => {
    setValue(defaultValue);
    setEditValue(defaultValue);
    loadContent();
  }, [page, contentKey, contentVersion, language, defaultValue]);

  const loadContent = async () => {
    try {
      const pageContent = await loadPageContent(API_BASE, page, contentVersion);
      const localizedValue = pageContent[localizedContentKey];
      const legacyValue = language === 'lv' ? pageContent[contentKey] : undefined;
      const nextValue = localizedValue ?? legacyValue ?? defaultValue;

      setValue(nextValue);
      setEditValue(nextValue);
    } catch (err) {
      console.warn('Error loading content (using default):', err);
      setValue(defaultValue);
      setEditValue(defaultValue);
    }
  };

  const clearPageContentCache = () => {
    pageContentPromiseCache.clear();
    pageContentValueCache.clear();
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_BASE}/content/${page}/${localizedContentKey}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: editValue,
          type: 'text',
        }),
      });

      if (response.ok) {
        setValue(editValue);
        setIsEditing(false);
        clearPageContentCache();
        refreshContent();
      } else {
        alert('Не удалось сохранить контент');
      }
    } catch (err) {
      console.error('Error saving content:', err);
      alert('Не удалось сохранить контент');
    }
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (!isAdmin) {
    return <Component className={className} style={style}>{value || defaultValue}</Component>;
  }

  if (isEditing) {
    return (
      <div className="relative group">
        {multiline ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={`${className} border-2 border-green rounded p-2 w-full min-h-[100px] focus:outline-none focus:ring-2 focus:ring-green`}
            style={style}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={`${className} border-2 border-green rounded px-2 w-full focus:outline-none focus:ring-2 focus:ring-green`}
            style={style}
            autoFocus
          />
        )}
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-1 px-3 py-1 bg-green text-white rounded hover:bg-purple transition-colors text-sm"
          >
            <Save className="w-4 h-4" />
            Сохранить
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center gap-1 px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors text-sm"
          >
            <X className="w-4 h-4" />
            Отмена
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group inline-block w-full pr-8">
      <Component className={className} style={style}>{value || defaultValue}</Component>
      <button
        onClick={() => setIsEditing(true)}
        className="absolute right-1 top-1 p-1 bg-green text-white rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple"
        title="Редактировать текст"
      >
        <Edit2 className="w-4 h-4" />
      </button>
    </div>
  );
}
