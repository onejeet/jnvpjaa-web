import { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { paths } from '@/config/paths';
import { constructMetadata } from '@/config/seo.config';
import LayoutModule from '@/layouts/Layout';
import { NewsEditor, NewsroomGate } from '@/modules/NewsEditor';
import { brand } from '@/config/tenant';

type Props = { searchParams: Promise<{ id?: string | string[] }> };

const editId = async (props: Props) => {
  const searchParams = await props.searchParams;
  return typeof searchParams.id === 'string' && searchParams.id ? searchParams.id : undefined;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  return constructMetadata({
    url: '/newsroom/new/',
    noIndex: true,
    title: `${(await editId(props)) ? 'Edit' : 'Add'} News • ${brand.shortName} Newsroom`,
    description: `Write and publish ${brand.shortName} news`,
  });
}

// Same pattern as the blog: /newsroom/new creates, /newsroom/new?id=… edits.
export default async function NewNewsArticlePage(props: Props) {
  const id = await editId(props);
  return (
    <LayoutModule disableCover title={`${id ? 'Edit' : 'Add'} News • ${brand.shortName} Newsroom`} containerProps={{}}>
      <Breadcrumbs
        items={[{ label: 'Newsroom', path: paths.newsroom.root }, { label: id ? 'Edit news' : 'Add news' }]}
      />
      <NewsroomGate>
        <NewsEditor key={id ?? 'new'} id={id} />
      </NewsroomGate>
    </LayoutModule>
  );
}
