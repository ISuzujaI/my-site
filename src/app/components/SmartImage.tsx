import { useEditMode } from '../context/EditModeContext';
import { useAuth } from '../context/AuthContext';
import { EditableImage } from './EditableImage';

interface SmartImageProps {
  page: string;
  contentKey: string;
  src: string;
  alt: string;
  className?: string;
  adminOnly?: boolean;
}

export function SmartImage({ page, contentKey, src, alt, className, adminOnly = false }: SmartImageProps) {
  const { isEditMode } = useEditMode();
  const { user } = useAuth();

  // Always use EditableImage for content synchronization
  // It will show edit controls only when isAdmin is true
  return (
    <EditableImage
      page={page}
      contentKey={contentKey}
      defaultSrc={src}
      alt={alt}
      className={className}
      isAdmin={isEditMode && user?.isAdmin}
      adminOnly={adminOnly}
    />
  );
}
