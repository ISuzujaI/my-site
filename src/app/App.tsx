import { RouterProvider } from 'react-router';
import { router } from './routes';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { EditModeProvider } from './context/EditModeContext';
import { ContentProvider } from './context/ContentContext';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <EditModeProvider>
          <ContentProvider>
            <RouterProvider router={router} />
          </ContentProvider>
        </EditModeProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}