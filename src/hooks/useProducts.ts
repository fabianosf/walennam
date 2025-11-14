import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/data/products";

const PRODUCTS_COLLECTION = "amazon_products";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar produtos do Firestore
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const q = query(collection(db, PRODUCTS_COLLECTION), orderBy("title", "asc"));
      const querySnapshot = await getDocs(q);
      const productsData: Product[] = [];
      
      querySnapshot.forEach((docSnapshot) => {
        productsData.push({ ...docSnapshot.data(), id: docSnapshot.id } as Product);
      });
      
      setProducts(productsData);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar produtos");
      console.error("Erro ao carregar produtos:", err);
    } finally {
      setLoading(false);
    }
  };

  // Adicionar produto
  const addProduct = async (product: Omit<Product, "id">) => {
    try {
      const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), product);
      await fetchProducts();
      return docRef.id;
    } catch (err: any) {
      setError(err.message || "Erro ao adicionar produto");
      throw err;
    }
  };

  // Atualizar produto
  const updateProduct = async (productId: string, product: Partial<Product>) => {
    try {
      const productRef = doc(db, PRODUCTS_COLLECTION, productId);
      await updateDoc(productRef, product);
      await fetchProducts();
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar produto");
      throw err;
    }
  };

  // Deletar produto
  const deleteProduct = async (productId: string) => {
    try {
      const productRef = doc(db, PRODUCTS_COLLECTION, productId);
      await deleteDoc(productRef);
      await fetchProducts();
    } catch (err: any) {
      setError(err.message || "Erro ao deletar produto");
      throw err;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};

