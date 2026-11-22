import { Conversation } from '@/containers/Discussions';

export default async function DiscussionThreadPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  return <Conversation id={id} />;
}
