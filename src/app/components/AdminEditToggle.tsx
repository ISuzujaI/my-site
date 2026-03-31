import { useState } from 'react';
import { Edit3, Eye } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface AdminEditToggleProps {
  isAdmin: boolean;
  onToggle: (enabled: boolean) => void;
}

export function AdminEditToggle({ isAdmin, onToggle }: AdminEditToggleProps) {
  const [editMode, setEditMode] = useState(false);
  const { refreshContent } = useContent();

  if (!isAdmin) return null;

  const handleToggle = () => {
    const newMode = !editMode;
    setEditMode(newMode);
    onToggle(newMode);
    
    // When turning off edit mode, refresh all content to show latest changes
    if (!newMode) {
      refreshContent();
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg font-semibold transition-all ${
        editMode
          ? 'bg-purple text-white hover:bg-green'
          : 'bg-green text-white hover:bg-purple'
      }`}
      title={editMode ? 'Выключить режим редактирования' : 'Включить режим редактирования'}
    >
      {editMode ? (
        <>
          <Eye className="w-5 h-5" />
          Режим просмотра
        </>
      ) : (
        <>
          <Edit3 className="w-5 h-5" />
          Режим редактирования
        </>
      )}
    </button>
  );
}
