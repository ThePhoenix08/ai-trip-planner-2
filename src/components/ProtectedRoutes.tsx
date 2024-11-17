import { useAuth } from '@/state/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { AppSidebar } from './Sidebar';
import { SidebarTrigger } from './ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { TripsProvider } from '@/state/TripsContext';
import { SidebarProvider } from '@/components/ui/sidebar';

function ProtectedRoutes() {
  const { user, loading } = useAuth();
  const isMobile = useIsMobile();
  if (loading) return <div>Loading...</div>;
  return (
    <TripsProvider>
      <SidebarProvider>
        <div className="ProtectedRoutes flex h-screen w-screen">
          <aside>
            {isMobile && <SidebarTrigger />}
            <AppSidebar />
          </aside>
          <main className="grid place-items-center flex-grow p-2">
            <div className="border-2 w-full h-full rounded-lg grid place-items-center overflow-x-hidden overflow-y-auto">
              {user ? <Outlet /> : <Navigate to="/login" />}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </TripsProvider>
  );
}

export default ProtectedRoutes;
