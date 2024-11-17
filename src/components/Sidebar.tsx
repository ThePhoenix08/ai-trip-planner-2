import { Plane, Plus, Tickets } from 'lucide-react';
import { SidebarFooter, useSidebar } from '@/components/ui/sidebar';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { NavUser } from './nav-user';
import { useAuth } from '@/state/AuthContext';
import { Link } from 'react-router-dom';
import { useTrips } from '@/state/TripsContext';

export function AppSidebar() {
  const { open } = useSidebar();
  const { user } = useAuth();
  const { trips } = useTrips();

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarHeader>
          <div className="flex justify-between">
            {open && <SidebarLogo />}
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={'/app/planner'}>
                    <Plus />
                    <span>{'Plan a Trip'}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={'/app/trips'}>
                    <Tickets />
                    <span>{'My Trips'}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>My Trips</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {trips.map((trip) => (
                <SidebarMenuItem key={trip.id}>
                  <SidebarMenuButton asChild>
                    <Link to={`/app/trips/${trip.id}`}>
                      <Plane />
                      <span>{trip.destination}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user?.displayName || 'John Doe',
            avatar: 'https://avatar.iran.liara.run/public',
            email: user?.email || 'john.doe@example.com',
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}

const SidebarLogo = () => {
  return (
    <div className="flex items-center gap-2 text-lg">
      <Plane />
      <span>AI Trip Planner</span>
    </div>
  );
};
