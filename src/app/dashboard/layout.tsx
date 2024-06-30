import Link from 'next/link';
import {
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenu,
  navigationMenuTriggerStyle,
} from '~/components/ui/navigation-menu';
import { ModeToggle } from '~/components/toggle-dark-mode';
import { UserButton } from '@clerk/nextjs';
import { api } from '~/trpc/server';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await api.user.getUserAdmin();
  const isAdmin = user.isAdmin;

  if (isAdmin) {
    redirect('/admin/dashboard');
  }
  return (
    <div>
      <div className={'flex justify-center py-10'}>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/dashboard" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/dashboard/tickets" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  My Tickets
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <UserButton showName={true} />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ModeToggle />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className={'px-3 md:px-10 py-10 flex justify-center items-center'}>
        {children}
      </div>
    </div>
  );
}
