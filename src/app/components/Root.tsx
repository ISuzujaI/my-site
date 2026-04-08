import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { AdminEditToggle } from './AdminEditToggle';
import { useAuth } from '../context/AuthContext';
import { useEditMode } from '../context/EditModeContext';

export function Root() {
  const { user } = useAuth();
  const { setEditMode } = useEditMode();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="abuvet-main flex-1">
        <Outlet />
      </main>
      <Footer />
      <AdminEditToggle 
        isAdmin={user?.isAdmin || false} 
        onToggle={setEditMode}
      />
    </div>
  );
}