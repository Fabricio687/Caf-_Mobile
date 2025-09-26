// Importa tipo ProductProps dos dados dos produtos
import { ProductProps } from "@/types/product";

// Importa tipo productCartProps do store do carrinho
import { productCartProps } from "../cart-store";

// Função para adicionar produto ao carrinho ou incrementar quantidade
export function add(products: productCartProps[], newProduct: ProductProps) {
  // Procura se o produto já existe no carrinho
  const existingProduct = products.find(({ id }) => newProduct.id === id);

  // Se o produto já existe no carrinho
  if (existingProduct) {
    // Retorna array com quantidade incrementada do produto existente
    return products.map((product) =>
      product.id === existingProduct.id
        ? { ...product, quantity: product.quantity + 1 } // Incrementa quantidade
        : product // Mantém outros produtos inalterados
    );
  }

  // Se o produto não existe, adiciona novo produto com quantidade 1
  return [...products, { ...newProduct, quantity: 1 }];
}
