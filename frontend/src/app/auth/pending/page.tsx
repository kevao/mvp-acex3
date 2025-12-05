// Página desativada: verificação de e-mail foi removida. Redireciona para login.
export default function PendingVerificationPage() {
  if (typeof window !== 'undefined') {
    window.location.href = '/auth/login';
  }
  return null;
}