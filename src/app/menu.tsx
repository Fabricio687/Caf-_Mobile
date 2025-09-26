import { useEffect, useRef, useState } from "react";
import { SectionList, Text, FlatList } from "react-native";
import { Link } from "expo-router";

import { Product } from "../components/products";
import { CategoryButton } from "../components/category-button";


// agora puxa do utils/data/products
import { CATEGORIES, MENU } from "../utils/data/products";

export default function Menu() {
  const sectionListRef = useRef<SectionList>(null);

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [sections, setSections] = useState<any[]>([]);

  // carrega dados locais
  useEffect(() => {
    setSections(MENU);
    setCategories(CATEGORIES);
    setCategory(CATEGORIES[0] || "");
  }, []);

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory);

    const sectionIndex = sections.findIndex(
      (section) => section.title === selectedCategory
    );

    if (sectionIndex >= 0) {
      sectionListRef.current?.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
      });
    }
  }

  return (
    <>
      {/* Lista de categorias */}
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

      {/* Lista de produtos por categoria */}
      <SectionList
        ref={sectionListRef}
        sections={sections}
        keyExtractor={(item) => String(item.id)}
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
    </>
  );
}
