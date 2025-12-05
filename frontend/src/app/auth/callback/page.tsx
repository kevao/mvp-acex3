export default function AuthCallbackPage() {
  if (typeof window !== 'undefined') {
    window.location.href = '/auth/login';
  }
  return null;
}

