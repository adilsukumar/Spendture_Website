import { useNavigate, useLocation } from 'react-router-dom';
import { Users, Mail, BarChart3, LogOut, Home, Settings, Eye } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import spendtureLogo from '@/assets/spendture-logo.jpg';

const navItems = [
  { title: 'Overview', url: '/admin', icon: BarChart3 },
  { title: 'Waitlist', url: '/admin/waitlist', icon: Users },
  { title: 'Visitors', url: '/admin/visitors', icon: Eye },
  { title: 'Email Events', url: '/admin/emails', icon: Mail },
  { title: 'Settings', url: '/admin/settings', icon: Settings },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center gap-3 px-3 py-4 mb-2">
            <img
              src={spendtureLogo}
              alt="Spendture"
              className="w-8 h-8 rounded-lg"
            />
            {!collapsed && (
              <span className="font-bold text-lg bg-gradient-to-r from-deep-teal to-emerald bg-clip-text text-transparent">
                Admin
              </span>
            )}
          </div>

          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => navigate(item.url)}
                      className={`${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <Home className="w-5 h-5" />
              <span>Back to Site</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleSignOut}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
