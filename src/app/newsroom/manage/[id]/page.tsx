import { NewsEditor } from '@/modules/NewsEditor';

export default function NewsroomEditPage({ params }: { params: { id: string } }) {
  return <NewsEditor id={params.id === 'new' ? undefined : params.id} />;
}
