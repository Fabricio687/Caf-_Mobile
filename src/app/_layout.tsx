// Importa componentes de navegação do Expo Router
import { Slot, Redirect } from "expo-router";
// Importa componente para área segura (evita sobreposição com status bar)
import { SafeAreaView } from "react-native-safe-area-context";

// Importa as fontes Inter do Google Fonts para usar no app
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

// Importa componente de loading personalizado
import { Loading } from "@/components/loading";

// Componente principal de layout que envolve toda a aplicação
export default function Layout() {
  // Hook para carregar as fontes Inter com diferentes pesos
  const [fontsLoaded] = useFonts({
    Inter_400Regular,    // Fonte regular (400)
    Inter_500Medium,     // Fonte medium (500)
    Inter_600SemiBold,   // Fonte semi-bold (600)
    Inter_700Bold,       // Fonte bold (700)
  });

  // Se as fontes ainda não carregaram, mostra tela de loading
  if (!fontsLoaded) {
    return <Loading />;
  }

  // Retorna o layout principal com área segura e fundo branco
  return (
    <SafeAreaView className="bg-white flex-1">
      {/* Slot renderiza as telas filhas baseado na rota atual */}
      <Slot />
    </SafeAreaView>
  );
}
