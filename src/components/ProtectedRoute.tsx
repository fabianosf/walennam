import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ADMIN_EMAILS } from "@/config/admins";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/admin/login" replace />;
  }

  // Verificar se o email do usuário está na lista de administradores
  const isAdmin = currentUser.email && ADMIN_EMAILS.includes(currentUser.email.toLowerCase());

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-background rounded-lg border p-8 shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-destructive">Acesso Negado</h1>
            <p className="text-muted-foreground mb-4">
              Você não tem permissão para acessar esta área.
            </p>
            <p className="text-sm text-muted-foreground">
              Apenas administradores autorizados podem acessar o dashboard.
            </p>
            <div className="mt-6">
              <a
                href="/admin/login"
                className="text-primary hover:underline"
              >
                Voltar para Login
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;

