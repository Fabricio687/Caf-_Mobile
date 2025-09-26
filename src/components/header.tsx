// Importa componentes básicos do React Native
import { Image, View, Text, TouchableOpacity } from "react-native";

// Importa ícones do Expo
import { Feather } from "@expo/vector-icons";

// Importa cores do Tailwind CSS
import colors from "tailwindcss/colors";

// Importa componentes de navegação
import { Link, useRouter } from "expo-router";

// Define as propriedades que o componente Header recebe
type HeaderProps = {
  title: string; // Título a ser exibido no centro
  cartQuantityItem?: number; // Quantidade de itens no carrinho (opcional)
  showLogout?: boolean; // Se deve mostrar botão de logout (opcional)
};

// Componente de cabeçalho reutilizável
export function Header({ title, cartQuantityItem, showLogout }: HeaderProps) {
  // Hook para navegação
  const router = useRouter();
  
  // Função para fazer logout (volta para login)
  function handleLogout() {
    router.replace("/login");
  }
  
  return (
    // Container principal do cabeçalho
    <View className="flex-row items-center border-b border-gray-200 pb-5 mx-5 pt-4">
      {/* Botão esquerdo - logout ou voltar */}
      {showLogout ? (
        // Se showLogout for true, mostra ícone de logout
        <TouchableOpacity className="mr-4" onPress={handleLogout}>
          <Feather name="log-out" color={colors.gray[800]} size={24} />
        </TouchableOpacity>
      ) : (
        // Caso contrário, mostra ícone de voltar
        <TouchableOpacity className="mr-4" onPress={() => router.back()}>
          <Feather name="arrow-left" color={colors.gray[800]} size={24} />
        </TouchableOpacity>
      )}
      
      {/* Título centralizado */}
      <View className="flex-1">
        <Text className="text-gray-800 text-xl font-bold text-center">{title}</Text>
      </View>

      {/* Link para o carrinho */}
      <Link href={"/cart"} asChild>
        <TouchableOpacity className="relative">
          {/* Badge com quantidade de itens (só aparece se > 0) */}
          {cartQuantityItem! > 0 && (
            <View className="bg-orange-500 w-4 h-4 rounded-full items-center justify-center top-2 z-10 -right-3.5">
              <Text className="text-white font-bold text-xs">
                {cartQuantityItem}
              </Text>
            </View>
          )}
          {/* Ícone do carrinho */}
          <Feather name="shopping-bag" color={colors.gray[800]} size={24} />
        </TouchableOpacity>
      </Link>
    </View>
  );
}
