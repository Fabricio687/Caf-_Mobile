// Importa componente de redirecionamento do Expo Router
import { Redirect } from "expo-router";

// Componente da tela inicial (Home)
export default function Home() {
  // Redireciona automaticamente para a tela de login
  // Isso faz com que o app sempre abra na tela de login
  return <Redirect href="/login" />;
}
