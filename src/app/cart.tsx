// Importa componentes básicos do React Native
import { View, Text, ScrollView, Alert, Linking, TouchableOpacity, Image} from "react-native";

// Importa componente de cabeçalho personalizado
import { Header } from "@/components/header";

// Importa store do carrinho (Zustand)
import { useCartStore } from "@/stores/cart-store";

// Importa componente de produto
import { Product } from "@/components/products";

// Importa função para formatar moeda
import { formatCurrency } from "@/utils/functions/format-currency";

// Importa componente de input
import { Input } from "@/components/input";

// Importa componente para scroll com teclado
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Importa componente de botão
import { Button } from "@/components/button";

// Importa ícones do Expo
import { Feather } from "@expo/vector-icons";

// Importa componentes de navegação
import { Link } from "expo-router";

// Importa componente de botão de link
import { LinkButton } from "@/components/link-button";

// Importa hook useState
import { useState } from "react";

// Importa hook de navegação
import { useNavigation } from "expo-router";

// Número de telefone para WhatsApp (placeholder)
const PHONE_NUMBER = " ";

// Componente da tela do carrinho
export default function Cart() {
  // Estado para armazenar o endereço de entrega
  const [address, setAddress] = useState("");

  // Hook para acessar o store do carrinho
  const cartStore = useCartStore();

  // Hook para navegação
  const navigation = useNavigation();

  // Calcula o total do carrinho formatado em moeda
  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity, // Soma preço × quantidade
      0
    )
  );

  // Função para remover produto do carrinho
  function handleRemoveProduct(product: any) {
    // Mostra alerta de confirmação
    Alert.alert("Remover", `Deseja remover o item: ${product.title}?`, [
      {
        text: "Cancelar", // Botão de cancelar
      },
      {
        text: "Remover", // Botão de confirmar
        onPress: () => cartStore.remove(product.id), // Remove o produto pelo ID
      },
    ]);
  }

  // Função para finalizar pedido
  function handleOrder() {
    // Verifica se o endereço foi preenchido
    if (address.trim().length === 0) {
      return Alert.alert("Informe o endereço de entrega");
    }

    // Cria string com todos os produtos do pedido
    const products = cartStore.products
      .map((product) => `/n ${product.quantity} ${product.title}`) // Formato: "2x Cappuccino"
      .join("");

    // Cria mensagem completa para o WhatsApp
    const message = `Novo PEDIDO!\n Entregar em ${address}${products}\n Valor Total: ${total}`;

    // Abre WhatsApp com a mensagem
    Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`);
    // Limpa o carrinho
    cartStore.clear();
    // Volta para a tela anterior
    navigation.goBack();
  }

  return (
    // Container principal com fundo branco
    <View className="flex-1 bg-white">
      {/* Cabeçalho customizado com botão voltar e título */}
      <View className="flex-row items-center p-5 border-b border-gray-200">
        {/* Botão de voltar */}
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Feather name="arrow-left" size={24} color="#374151" />
        </TouchableOpacity>
        {/* Título da tela */}
        <Text className="text-gray-800 text-xl font-bold flex-1 text-center">Carrinho</Text>
      </View>

      {/* Área de scroll com os produtos */}
      <ScrollView className="flex-1 p-5">
        {/* Verifica se há produtos no carrinho */}
        {cartStore.products.length > 0 ? (
          <View className="mb-6">
            {/* Mapeia cada produto do carrinho */}
            {cartStore.products.map((product) => (
              <View key={product.id} className="flex-row items-center mb-4 p-3 bg-gray-50 rounded-lg">
                {/* Imagem do produto */}
                <Image source={product.thumbnail} className="w-16 h-16 rounded-lg mr-3" />
                {/* Informações do produto */}
                <View className="flex-1">
                  {/* Nome do produto */}
                  <Text className="text-gray-800 font-medium text-base">{product.title}</Text>
                  {/* Preço do produto */}
                  <Text className="text-gray-500 text-sm">R$ {product.price?.toFixed(2)}</Text>
                  {/* Controles de quantidade */}
                  <View className="flex-row items-center mt-2">
                    {/* Botão para diminuir quantidade */}
                    <TouchableOpacity 
                      onPress={() => cartStore.decrease(product.id)} // Diminui quantidade
                      className="bg-orange-500 w-8 h-8 rounded-full items-center justify-center"
                    >
                      <Feather name="minus" size={16} color="white" />
                    </TouchableOpacity>
                    {/* Quantidade atual */}
                    <Text className="text-gray-800 font-medium mx-3">{product.quantity}</Text>
                    {/* Botão para aumentar quantidade */}
                    <TouchableOpacity 
                      onPress={() => cartStore.add(product)} // Adiciona mais um
                      className="bg-orange-500 w-8 h-8 rounded-full items-center justify-center"
                    >
                      <Feather name="plus" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
                {/* Botão para remover produto */}
                <TouchableOpacity 
                  onPress={() => handleRemoveProduct(product)} // Chama função de remoção
                  className="ml-3 p-2"
                >
                  <Feather name="trash-2" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          // Mensagem quando carrinho está vazio
          <Text className="text-gray-500 text-center my-8">
            Seu carrinho está vazio
          </Text>
        )}
      </ScrollView>

      {/* Área inferior com total e botões */}
      <View className="p-5 border-t border-gray-200">
        {/* Linha com total */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-800 text-lg font-medium">Total</Text>
          <Text className="text-gray-800 text-lg font-bold">{total}</Text>
        </View>
        
        {/* Botões de ação */}
        <View className="gap-3">
          {/* Botão para finalizar pedido */}
          <Button onPress={handleOrder} className="bg-orange-500">
            <Button.Text className="text-white">Enviar pedido para o WhatsApp</Button.Text>
          </Button>
          
          {/* Botão para voltar aos produtos */}
          <Link href="/" asChild>
            <Button className="bg-gray-200">
              <Button.Text className="text-gray-800">Voltar para os produtos</Button.Text>
            </Button>
          </Link>
        </View>
      </View>
    </View>
  );
}

