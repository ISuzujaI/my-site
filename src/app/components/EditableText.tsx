import { useState, useEffect } from 'react';
import { Edit2, Save, X } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { useContent } from '../context/ContentContext';

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
  const [value, setValue] = useState(defaultValue);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const { refreshContent, contentVersion } = useContent();

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-de695671`;

  // Load content on mount and when contentVersion changes
  useEffect(() => {
    loadContent();
  }, [page, contentKey, contentVersion]);

  const loadContent = async () => {
    try {
      const response = await fetch(`${API_BASE}/content/${page}/${contentKey}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setValue(result.data.value);
          setEditValue(result.data.value);
        } else {
          setValue(defaultValue);
          setEditValue(defaultValue);
        }
      } else {
        setValue(defaultValue);
        setEditValue(defaultValue);
      }
    } catch (err) {
      console.warn('Error loading content (using default):', err);
      setValue(defaultValue);
      setEditValue(defaultValue);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_BASE}/content/${page}/${contentKey}`, {
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
        // Trigger global content refresh
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

  if (loading) {
    return <Component className={className} style={style}>{defaultValue}</Component>;
  }

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
    <div className="relative group inline-block w-full">
      <Component className={className} style={style}>{value || defaultValue}</Component>
      <button
        onClick={() => setIsEditing(true)}
        className="absolute -right-8 top-0 p-1 bg-green text-white rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple"
        title="Редактировать текст"
      >
        <Edit2 className="w-4 h-4" />
      </button>
    </div>
  );
}
