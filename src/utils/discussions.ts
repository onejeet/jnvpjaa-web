export interface DiscussionReply {
  id: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  content: string;
  createdAt: string;
  likes: number;
  dislikes: number;
}

export interface DiscussionThread {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  dislikes: number;
  replies: DiscussionReply[];
}

const STORAGE_KEY = 'jnvpjaa_discussions_v1';

function readStore(): DiscussionThread[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DiscussionThread[]) : [];
  } catch {
    return [];
  }
}

function writeStore(threads: DiscussionThread[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
}

export function listThreads(): DiscussionThread[] {
  return readStore().sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function getThread(id: string): DiscussionThread | undefined {
  return readStore().find((t) => t.id === id);
}

export function createThread(
  input: Pick<DiscussionThread, 'title' | 'content' | 'authorId' | 'authorName' | 'authorImage'>
): DiscussionThread {
  const now = new Date().toISOString();
  const thread: DiscussionThread = {
    id: crypto.randomUUID(),
    title: input.title,
    content: input.content,
    authorId: input.authorId,
    authorName: input.authorName,
    authorImage: input.authorImage,
    createdAt: now,
    updatedAt: now,
    likes: 0,
    dislikes: 0,
    replies: [],
  };
  const threads = readStore();
  threads.unshift(thread);
  writeStore(threads);
  return thread;
}

export function addReply(
  threadId: string,
  reply: Omit<DiscussionReply, 'id' | 'createdAt' | 'likes' | 'dislikes'>
): DiscussionReply | undefined {
  const threads = readStore();
  const idx = threads.findIndex((t) => t.id === threadId);
  if (idx === -1) return undefined;
  const newReply: DiscussionReply = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    likes: 0,
    dislikes: 0,
    ...reply,
  };
  threads[idx].replies.push(newReply);
  threads[idx].updatedAt = new Date().toISOString();
  writeStore(threads);
  return newReply;
}

export function react(threadId: string, type: 'like' | 'dislike') {
  const threads = readStore();
  const idx = threads.findIndex((t) => t.id === threadId);
  if (idx === -1) return;
  if (type === 'like') threads[idx].likes += 1;
  if (type === 'dislike') threads[idx].dislikes += 1;
  threads[idx].updatedAt = new Date().toISOString();
  writeStore(threads);
}

export function reactToReply(threadId: string, replyId: string, type: 'like' | 'dislike') {
  const threads = readStore();
  const tIdx = threads.findIndex((t) => t.id === threadId);
  if (tIdx === -1) return;
  const rIdx = threads[tIdx].replies.findIndex((r) => r.id === replyId);
  if (rIdx === -1) return;
  if (type === 'like') threads[tIdx].replies[rIdx].likes += 1;
  if (type === 'dislike') threads[tIdx].replies[rIdx].dislikes += 1;
  threads[tIdx].updatedAt = new Date().toISOString();
  writeStore(threads);
}

export function seedDiscussionsIfEmpty(): boolean {
  const existing = readStore();
  if (existing.length > 0) return false;

  const now = new Date();
  const minus = (mins: number) => new Date(now.getTime() - mins * 60000).toISOString();

  const sample: DiscussionThread[] = [
    {
      id: crypto.randomUUID(),
      title: 'How did JNV shape your career path? Share your story',
      content:
        'From hostel nights to board exams — how did JNV influence your personal or professional journey? Any career tips for current students?',
      authorId: 'u1',
      authorName: 'Aakash Sharma',
      authorImage: undefined,
      createdAt: minus(3000),
      updatedAt: minus(120),
      likes: 12,
      dislikes: 1,
      replies: [
        {
          id: crypto.randomUUID(),
          authorId: 'u2',
          authorName: 'Priya Verma',
          content: 'Discipline and peer support at JNV helped me crack GATE. Highly recommend group studies.',
          createdAt: minus(110),
          authorImage: undefined,
          likes: 3,
          dislikes: 0,
        },
        {
          id: crypto.randomUUID(),
          authorId: 'u7',
          authorName: 'Manish Kumar',
          content: 'Agree! Study circles and weekly mock reviews worked great for us in 2011 batch.',
          createdAt: minus(95),
          authorImage: undefined,
          likes: 1,
          dislikes: 0,
        },
        {
          id: crypto.randomUUID(),
          authorId: 'u3',
          authorName: 'Rahul Jain',
          content: 'House competitions built my confidence — crucial for my startup pitches later!',
          createdAt: minus(90),
          authorImage: undefined,
          likes: 0,
          dislikes: 0,
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      title: 'Best preparation strategy for SSC CGL 2025?',
      content:
        'For those who cleared SSC recently — which books/mock tests worked? How to balance accuracy vs speed? Any batch-wise study groups?',
      authorId: 'u4',
      authorName: 'Neha Gupta',
      authorImage: undefined,
      createdAt: minus(800),
      updatedAt: minus(60),
      likes: 7,
      dislikes: 0,
      replies: [
        {
          id: crypto.randomUUID(),
          authorId: 'u5',
          authorName: 'Ankit Kumar',
          content: 'Plinth to Paramount for English + 2 mocks/week. Track weak topics in a spreadsheet.',
          createdAt: minus(50),
          authorImage: undefined,
          likes: 2,
          dislikes: 0,
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      title: 'Alumni meetup in Jaipur — dates that work?',
      content:
        'Planning an informal catch-up in Jaipur next month. Venue suggestions welcome. Fill your preferred dates!',
      authorId: 'u6',
      authorName: 'Ritika Singh',
      authorImage: undefined,
      createdAt: minus(400),
      updatedAt: minus(10),
      likes: 3,
      dislikes: 0,
      replies: [],
    },
  ];

  writeStore(sample);
  return true;
}
