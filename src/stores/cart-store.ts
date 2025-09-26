// Importa função create do Zustand para criar o store
import { create } from "zustand";

// Importa tipo ProductProps dos dados dos produtos
import { ProductProps } from "@/types/product";

// Importa funções auxiliares para manipulação do carrinho
import * as cartInMemory from "./helpers/cart-in-memory";

// Importa AsyncStorage para persistência local
import AsyncStorage from "@react-native-async-storage/async-storage";

// Importa middleware de persistência do Zustand
import { createJSONStorage, persist } from "zustand/middleware";

// Define tipo para produto no carrinho (produto + quantidade)
export type productCartProps = ProductProps & {
  quantity: number; // Quantidade do produto no carrinho
};

// Define interface do estado do store
type StateProps = {
  products: productCartProps[]; // Array de produtos no carrinho
  add: (product: ProductProps) => void; // Função para adicionar produto
  remove: (productId: string) => void; // Função para remover produto
  decrease: (productId: string) => void; // Função para diminuir quantidade
  clear: () => void; // Função para limpar carrinho
};

// Cria o store do carrinho com persistência
export const useCartStore = create(
  persist<StateProps>( // Middleware de persistência
    (set) => ({
      // Estado inicial - carrinho vazio
      products: [],

      // Função para adicionar produto ao carrinho
      add: (product: ProductProps) =>
        set((state) => ({
          // Usa função auxiliar para adicionar ou incrementar quantidade
          products: cartInMemory.add(state.products, product),
        })),
      
      // Função para remover produto completamente do carrinho
      remove: (productId: string) =>
        set((state) => ({
          // Filtra removendo o produto com o ID especificado
          products: state.products.filter(
            (product) => product.id !== productId
          ),
        })),
      
      // Função para diminuir quantidade de um produto
      decrease: (productId: string) =>
        set((state) => ({
          // Mapeia os produtos, diminuindo quantidade do produto especificado
          products: state.products.map((product) =>
            product.id === productId
              ? { ...product, quantity: Math.max(1, product.quantity - 1) } // Mínimo de 1
              : product // Mantém outros produtos inalterados
          ),
        })),
      
      // Função para limpar todo o carrinho
      clear: () =>
        set({
          products: [], // Array vazio
        }),
    }),
    {
      // Configurações de persistência
      name: "cafe:cart", // Nome da chave no AsyncStorage
      storage: createJSONStorage(() => AsyncStorage), // Usa AsyncStorage como storage
    }
  )
);

