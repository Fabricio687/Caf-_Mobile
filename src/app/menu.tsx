import { View, Text, FlatList, SectionList, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Header } from "@/components/header";
import { CategoryButton } from "@/components/category-button";
// Importa o fetchJson para buscar os dados do backend
import { fetchJson } from "@/utils/api"; 
import { ProductProps } from "@/types/product"; 
import { Product } from "@/components/products";
import { useState, useRef, useEffect } from "react";
import { Link } from "expo-router";
import { useCartStore } from "@/stores/cart-store";

// Tipagem dos dados que vêm do servidor
type ApiProduct = ProductProps & { _id: string; category: string; };
type SectionData = { title: string; data: ProductProps[] };

export default function Menu() {
  const cartStore = useCartStore();
  const [loading, setLoading] = useState(true); // Estado para mostrar o indicador de carregamento
  const [categories, setCategories] = useState<string[]>([]);
  const [sections, setSections] = useState<SectionData[]>([]);
  const [category, setCategory] = useState<string>("");

  const sectionListRef = useRef<SectionList<ProductProps>>(null);
  const cartQuantyItems = cartStore.products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory);

    const sectionIndex = categories.findIndex((c) => c === selectedCategory);

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      });
    }
  }

  // **Lógica para buscar dados no Backend**
  useEffect(() => {
    (async () => {
      try {
        // Chamada ao endpoint que criamos no backend: /api/products
        const data: { products: ApiProduct[] } = await fetchJson('/products');

        // Mapeamento e agrupamento dos dados (baseado na sua lógica original)
        const grouped: Record<string, ProductProps[]> = {};
        const mappedProducts: ProductProps[] = [];

        // Mapeia e agrupa os produtos. O backend de mock não envia 'category'
        // de forma ideal, então o agrupamento é simplificado para funcionar.
        for (const p of data.products) {
          // Usa o ID (string) que o seu componente Product espera
          const mappedItem = {
            id: p.id || p._id, 
            title: p.title,
            description: p.description || '',
            price: p.price,
            thumbnail: p.thumbnail, 
            cover: p.cover,
            ingredients: p.ingredients || [],
            category: p.category, // Categoria vem do mock
          } as ProductProps;
          mappedProducts.push(mappedItem);
          
          const key = p.category || 'Bebidas'; // Usando 'Bebidas' como fallback para o mock
          if (!grouped[key]) grouped[key] = [];
          grouped[key].push(mappedItem);
        }
        
        const cats = Object.keys(grouped);
        const secs = cats.map((c) => ({ title: c, data: grouped[c] }));

        setCategories(cats);
        setSections(secs);
        setCategory(cats[0] || "");
        
      } catch (e) {
        console.error('Falha ao buscar produtos da API:', e);
        Alert.alert("Erro", "Não foi possível carregar o cardápio do servidor.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  
  // Exibe tela de carregamento
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
        <ActivityIndicator size="large" color="#FF7A00" />
        <Text style={{ marginTop: 10 }}>Carregando Cardápio...</Text>
      </View>
    );
  }

  // Renderização principal
  return (
    <View className="flex-1 bg-white">
      <Header title="Cardápio" cartQuantityItem={cartQuantyItems} showLogout={true} />

      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => handleCategorySelect(item)}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />

      <SectionList
        ref={sectionListRef}
        sections={sections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-gray-800 font-heading mt-8 mb-3 px-5">
            {title}
          </Text>
        )}
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
