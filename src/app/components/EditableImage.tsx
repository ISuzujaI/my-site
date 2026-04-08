import { useState, useEffect, useRef } from 'react';
import { Edit2, Upload, X, Loader2 } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { useContent } from '../context/ContentContext';

const runtimeImageCache = new Map<string, string>();

interface EditableImageProps {
  page: string;
  contentKey: string;
  defaultSrc: string;
  alt: string;
  className?: string;
  isAdmin?: boolean;
  adminOnly?: boolean;
}

export function EditableImage({
  page,
  contentKey,
  defaultSrc,
  alt,
  className = '',
  isAdmin = false,
  adminOnly = false,
}: EditableImageProps) {
  const imageCacheId = `${page}:${contentKey}`;
  const [imageSrc, setImageSrc] = useState(
    runtimeImageCache.get(imageCacheId) || (adminOnly ? '' : defaultSrc)
  );
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { refreshContent, contentVersion } = useContent();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-de695671`;
  const isAbsolutePositioned = /(^|\s)absolute(\s|$)/.test(className);

  const addCacheBuster = (url: string, stamp?: string) => {
    const version = stamp || Date.now().toString();
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.set('v', version);
      return urlObj.toString();
    } catch {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}v=${encodeURIComponent(version)}`;
    }
  };

  // Load image on mount and when contentVersion changes
  useEffect(() => {
    loadImage();
  }, [page, contentKey, contentVersion]);

  const loadImage = async () => {
    try {
      const response = await fetch(`${API_BASE}/content/${page}/${contentKey}?_ts=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          const nextSrc = addCacheBuster(result.data.value, result.data.updatedAt);
          setImageSrc(nextSrc);
          runtimeImageCache.set(imageCacheId, nextSrc);
        } else {
          const fallback = adminOnly ? '' : defaultSrc;
          setImageSrc(fallback);
          runtimeImageCache.set(imageCacheId, fallback);
        }
      } else {
        // Use default only when content key doesn't exist yet.
        // For transient/server errors keep current value to avoid wrong fallback image.
        if (response.status === 404) {
          const fallback = adminOnly ? '' : defaultSrc;
          setImageSrc(fallback);
          runtimeImageCache.set(imageCacheId, fallback);
        }
      }
    } catch (err) {
      console.warn('Error loading image (using default):', err);
      if (!imageSrc) {
        setImageSrc(adminOnly ? '' : defaultSrc);
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      alert('Недопустимый тип файла. Разрешены только JPEG, PNG, WebP и SVG.');
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('Файл слишком большой. Максимальный размер 10МБ.');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('page', page);
      formData.append('key', contentKey);

      const response = await fetch(`${API_BASE}/content/upload-image`, {
        method: 'POST',
        cache: 'no-store',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          const nextSrc = addCacheBuster(result.data.value, result.data.updatedAt);
          setImageSrc(nextSrc);
          setIsEditing(false);
          // Trigger global content refresh
          refreshContent();
        } else {
          alert('Не удалось загрузить изображение');
        }
      } else {
        alert('Не удалось загрузить изображение');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      alert('Не удалось загрузить изображение');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const renderImage = imageSrc ? (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => {
        // Re-fetch latest image metadata instead of forcing a fallback.
        void loadImage();
      }}
    />
  ) : (
    <div
      className={`${className} ${isAdmin ? 'bg-gray-100 border border-dashed border-gray-300 text-center text-gray-500 flex items-center justify-center' : ''}`}
    >
      {isAdmin ? 'Изображение отсутствует' : ''}
    </div>
  );

  if (!isAdmin) {
    return renderImage;
  }

  const uploadPanel = (
    <div className="bg-beige p-4 rounded-lg shadow-xl border border-purple/15">
      <h3 className="text-lg font-bold text-purple mb-4">Загрузить новое изображение</h3>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex gap-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-4 py-2 bg-green text-white rounded hover:bg-purple transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Загрузка...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              Выбрать файл
            </>
          )}
        </button>

        <button
          onClick={() => setIsEditing(false)}
          disabled={uploading}
          className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors disabled:opacity-50"
        >
          <X className="w-4 h-4" />
          Отмена
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        JPEG, PNG, WebP или SVG (макс. 10МБ)
      </p>
    </div>
  );

  return (
    <div className={`group ${isAbsolutePositioned ? 'absolute inset-0 z-0' : 'relative inline-block'}`}>
      {renderImage}
      
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-2 right-2 p-2 bg-green text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple shadow-lg"
          title="Изменить изображение"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      )}

      {isEditing && (
        <div
          className={
            isAbsolutePositioned
              ? 'absolute top-4 right-4 z-20'
              : 'absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded'
          }
        >
          <div className={isAbsolutePositioned ? '' : ''}>
            {uploadPanel}
          </div>
        </div>
      )}
    </div>
  );
}

