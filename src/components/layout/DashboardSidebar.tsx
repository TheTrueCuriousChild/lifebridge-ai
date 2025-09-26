import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { 
  Heart, 
  LogOut, 
  User,
  Building2,
  Users,
  UserPlus,
  AlertTriangle,
  Settings,
  BarChart3,
  Package,
  FileText,
  Activity,
  MapPin,
  Clock,
  Droplets,
  Shield
} from 'lucide-react';

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarSection {
  label: string;
  items: SidebarItem[];
}

const getSidebarConfig = (role: UserRole): SidebarSection[] => {
  const configs = {
    hospital: [
      {
        label: 'Management',
        items: [
          { title: 'Dashboard', url: '/dashboard/hospital', icon: BarChart3 },
          { title: 'Donor Management', url: '/dashboard/hospital/donors', icon: Users },
          { title: 'Patient Management', url: '/dashboard/hospital/patients', icon: UserPlus },
          { title: 'Emergency SOS', url: '/dashboard/hospital/emergency', icon: AlertTriangle },
        ]
      },
      {
        label: 'Settings',
        items: [
          { title: 'Profile', url: '/dashboard/hospital/profile', icon: User },
          { title: 'Settings', url: '/dashboard/hospital/settings', icon: Settings },
        ]
      }
    ],
    bloodbank: [
      {
        label: 'Operations',
        items: [
          { title: 'Dashboard', url: '/dashboard/bloodbank', icon: BarChart3 },
          { title: 'Inventory Management', url: '/dashboard/bloodbank/inventory', icon: Package },
          { title: 'Requests', url: '/dashboard/bloodbank/requests', icon: FileText },
          { title: 'Emergency SOS', url: '/dashboard/bloodbank/emergency', icon: AlertTriangle },
        ]
      },
      {
        label: 'Analytics',
        items: [
          { title: 'Reports & Analytics', url: '/dashboard/bloodbank/reports', icon: Activity },
        ]
      },
      {
        label: 'Settings',
        items: [
          { title: 'Profile', url: '/dashboard/bloodbank/profile', icon: User },
          { title: 'Settings', url: '/dashboard/bloodbank/settings', icon: Settings },
        ]
      }
    ],
    donor: [
      {
        label: 'Activity',
        items: [
          { title: 'Dashboard', url: '/dashboard/donor', icon: BarChart3 },
          { title: 'SOS Alerts', url: '/dashboard/donor/alerts', icon: AlertTriangle },
          { title: 'Recent Activity', url: '/dashboard/donor/activity', icon: Activity },
        ]
      },
      {
        label: 'Settings',
        items: [
          { title: 'Profile', url: '/dashboard/donor/profile', icon: User },
        ]
      }
    ],
    admin: [
      {
        label: 'Administration',
        items: [
          { title: 'Dashboard', url: '/dashboard/admin', icon: BarChart3 },
          { title: 'User Management', url: '/dashboard/admin/users', icon: Users },
          { title: 'System Reports', url: '/dashboard/admin/reports', icon: FileText },
          { title: 'Emergency Monitor', url: '/dashboard/admin/emergency', icon: AlertTriangle },
        ]
      },
      {
        label: 'Settings',
        items: [
          { title: 'System Settings', url: '/dashboard/admin/settings', icon: Settings },
        ]
      }
    ]
  };

  return configs[role] || configs.donor;
};

const getRoleIcon = (role: UserRole) => {
  const icons = {
    hospital: Building2,
    bloodbank: Droplets,
    donor: Heart,
    admin: Shield
  };
  return icons[role] || Heart;
};

const getRoleColor = (role: UserRole) => {
  const colors = {
    hospital: 'text-blood',
    bloodbank: 'text-primary',
    donor: 'text-health',
    admin: 'text-primary'
  };
  return colors[role] || 'text-primary';
};

export function DashboardSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useSidebar();
  
  const isCollapsed = state === 'collapsed';

  if (!user) return null;

  const sidebarConfig = getSidebarConfig(user.role);
  const RoleIcon = getRoleIcon(user.role);
  const roleColor = getRoleColor(user.role);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b p-4">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <RoleIcon className={`h-8 w-8 ${roleColor}`} />
            <div>
              <h2 className="font-semibold capitalize">{user.role}</h2>
              <p className="text-sm text-muted-foreground truncate">{user.name}</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <RoleIcon className={`h-8 w-8 ${roleColor} mx-auto`} />
        )}
      </SidebarHeader>

      <SidebarContent className="p-2">
        {sidebarConfig.map((section, sectionIdx) => (
          <SidebarGroup key={sectionIdx}>
            {!isCollapsed && (
              <SidebarGroupLabel className="px-3 py-2 text-xs font-medium text-muted-foreground">
                {section.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item, itemIdx) => (
                  <SidebarMenuItem key={itemIdx}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <Link to={item.url} className="flex items-center space-x-3 px-3 py-2 rounded-lg">
                        <item.icon className="h-4 w-4" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          {!isCollapsed && <ThemeToggle />}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}