// Importa forwardRef do React para referenciar o componente
import { forwardRef } from "react";

// Importa componentes básicos do React Native
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ImageProps,
  Image,
  View,
  Text,
} from "react-native";

// Define o tipo das propriedades dos dados do produto
type ProductDataProps = {
  title: string; // Nome do produto
  description: string; // Descrição do produto
  thumbnail: any; // Imagem miniatura do produto
  quantity?: number; // Quantidade (opcional)
  price?: number; // Preço (opcional)
};

// Define o tipo das propriedades do componente Product
type ProductProps = TouchableOpacityProps & {
  data: ProductDataProps; // Dados do produto
};

// Componente Product usando forwardRef para permitir referências
export const Product = forwardRef<
  React.ComponentRef<typeof TouchableOpacity>, // Tipo da referência
  ProductProps // Tipo das propriedades
>(({ data, ...rest }, ref) => {
  return (
    // Botão clicável que representa um produto
    <TouchableOpacity
      ref={ref} // Referência para o componente
      className="w-full flex-row items-center pb-4 px-5" // Estilos do container
      {...rest} // Passa todas as outras propriedades
    >
      {/* Container com informações do produto */}
      <View className="flex-1 mr-3">
        {/* Categoria do produto (fixo como "Bebida") */}
        <Text className="text-gray-500 text-xs mb-1"></Text>
        {/* Nome do produto */}
        <Text className="text-gray-800 font-bold text-lg mb-1">
          {data.title}
        </Text>
        {/* Preço do produto formatado */}
        <Text className="text-gray-500 text-sm">
          R$ {data.price?.toFixed(2)}
        </Text>
      </View>

      {/* Imagem miniatura do produto */}
      <Image source={data.thumbnail} className="w-20 h-20 rounded-lg" />
    </TouchableOpacity>
  );
});
