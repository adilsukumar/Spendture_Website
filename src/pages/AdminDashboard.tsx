import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isLoading, isAdmin } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate('/admin/auth');
      } else if (!isAdmin) {
        navigate('/admin/auth');
      }
    }
  }, [user, isLoading, isAdmin, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <main className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border flex items-center px-4 gap-4 bg-card">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <h1 className="font-semibold text-foreground">Spendture Admin</h1>
          </header>
          <div className="flex-1 p-6 overflow-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
