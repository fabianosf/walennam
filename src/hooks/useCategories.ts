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

const CATEGORIES_COLLECTION = "categories";

export interface Category {
  id?: string;
  categoryId: string; // Ex: "beleza", "roupas", etc.
  name: string; // Nome amigável: "Beleza", "Roupas", etc.
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar categorias do Firestore
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const q = query(collection(db, CATEGORIES_COLLECTION), orderBy("name", "asc"));
      const querySnapshot = await getDocs(q);
      const categoriesData: Category[] = [];
      
      querySnapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        categoriesData.push({
          id: docSnapshot.id,
          categoryId: data.categoryId,
          name: data.name,
        } as Category);
      });
      
      setCategories(categoriesData);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar categorias");
      console.error("Erro ao carregar categorias:", err);
    } finally {
      setLoading(false);
    }
  };

  // Adicionar categoria
  const addCategory = async (category: Omit<Category, "id">) => {
    try {
      const docRef = await addDoc(collection(db, CATEGORIES_COLLECTION), category);
      await fetchCategories();
      return docRef.id;
    } catch (err: any) {
      setError(err.message || "Erro ao adicionar categoria");
      throw err;
    }
  };

  // Atualizar categoria
  const updateCategory = async (categoryId: string, category: Partial<Category>) => {
    try {
      const categoryRef = doc(db, CATEGORIES_COLLECTION, categoryId);
      await updateDoc(categoryRef, category);
      await fetchCategories();
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar categoria");
      throw err;
    }
  };

  // Deletar categoria
  const deleteCategory = async (categoryId: string) => {
    try {
      const categoryRef = doc(db, CATEGORIES_COLLECTION, categoryId);
      await deleteDoc(categoryRef);
      await fetchCategories();
    } catch (err: any) {
      setError(err.message || "Erro ao deletar categoria");
      throw err;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};

