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
import { Paragraph, Subtitle } from '~/components/ui/typography';
import { Alert } from '~/components/ui/alert';
import { api } from '~/trpc/server';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await api.user.getUserAdmin();
  const isAdmin = user.isAdmin;

  // If the user does not have the admin role, redirect them to the home page
  if (!isAdmin) {
    redirect('/admin/sign-in');
  }
  return (
    <div>
      <Alert>
        <Subtitle>This is the admin dashboard</Subtitle>
        <Paragraph>
          This page is restricted to users with the admin role.
        </Paragraph>
      </Alert>
      <div className={'flex justify-center py-10'}>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/admin/dashboard" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  All Tickets
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
      <div className={'px-10 py-10 flex justify-center items-center'}>
        {children}
      </div>
    </div>
  );
}
