// Página de verificação removida; redireciona para login padrão.
export default function VerifyEmailPage() {
  if (typeof window !== 'undefined') {
    window.location.href = '/auth/login';
  }
  return null;
}
