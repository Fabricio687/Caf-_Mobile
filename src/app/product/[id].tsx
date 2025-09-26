import { Image, Text, View, TouchableOpacity } from "react-native";

import { useLocalSearchParams, useNavigation, Redirect, Link } from "expo-router";

import { fetchJson } from "@/utils/api";

import { formatCurrency } from "@/utils/functions/format-currency";

import { Button } from "@/components/button";

import { Feather } from "@expo/vector-icons";

import { LinkButton } from "@/components/link-button";

import { useCartStore } from "@/stores/cart-store";
import { useEffect, useState } from "react";

export default function Product() {
  const cartStore = useCartStore();
  const { id } = useLocalSearchParams();

  const navigation = useNavigation();

  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { product } = await fetchJson(`/products/${id}`);
        if (mounted && product) {
          const mapped = {
            id: product._id,
            title: product.title,
            description: product.description || '',
            price: product.price,
            thumbnail: product.thumbnail ? { uri: product.thumbnail } : (product.cover ? { uri: product.cover } : undefined),
            cover: product.cover ? { uri: product.cover } : (product.thumbnail ? { uri: product.thumbnail } : undefined),
            ingredients: product.ingredients || [],
          };
          setProduct(mapped);
        }
      } catch (e) {}
    })();
    return () => { mounted = false };
  }, [id]);

  console.log(cartStore.products);

  function handleAddToCart() {
    cartStore.add(product!);

    navigation.goBack();
  }

  if (!product) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center justify-between p-5">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#374151" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="heart" size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      <View className="bg-gray-100 h-80">
        <Image
          source={typeof product.cover === 'string' ? { uri: product.cover } : product.cover}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      <View className="p-5 flex-1">
        <Text className="text-gray-800 text-2xl font-bold mb-4">{product.title}</Text>
        
        <Text className="text-gray-600 text-base leading-6 mb-6">
          {product.description}
        </Text>

        <Text className="text-gray-800 text-lg font-bold mb-3">Ingredientes</Text>
        {product.ingredients.map((ingredient) => (
          <Text
            key={ingredient}
            className="text-gray-600 text-base leading-6"
          >
            {ingredient}
          </Text>
        ))}
      </View>

      <View className="p-5 gap-4">
        <Button onPress={handleAddToCart} className="bg-orange-500">
          <Button.Text className="text-white">Adicionar item ao carrinho</Button.Text>
        </Button>

        <Link href="/" asChild>
          <Button className="bg-gray-200">
            <Button.Text className="text-gray-800">Voltar para os produtos</Button.Text>
          </Button>
        </Link>
      </View>
    </View>
  );
}
