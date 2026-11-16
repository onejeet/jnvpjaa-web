import { redirect } from 'next/navigation';

// Old links and bookmarks land in the Security Center, which holds the password form now.
export default function ChangePasswordPage() {
  redirect('/security');
}
