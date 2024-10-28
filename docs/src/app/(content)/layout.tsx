import { AppBar } from '@/components/AppBar';
import { Navigation } from '@/components/Navigation';
import routes from '@data/pages';

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
