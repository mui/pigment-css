import routes from '@data/pages';
import { AppBar } from '@/components/AppBar';
import { Navigation } from '@/components/Navigation';

export default function ContentLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div>
      <AppBar />
      <section>
        <Navigation routes={routes} />
        {children}
      </section>
    </div>
  );
}
