import PublicProfileNotFound from '@/containers/PublicProfile/PublicProfileNotFound';
import LayoutModule from '@/layouts/Layout';

export default function NotFound() {
  return (
    <LayoutModule disableCover>
      <PublicProfileNotFound />
    </LayoutModule>
  );
}
