import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProducts } from "@/hooks/useProducts";
import { useCategories, Category } from "@/hooks/useCategories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LogOut, Plus, Edit, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { Product } from "@/data/products";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts();
  const { categories, loading: categoriesLoading, addCategory, updateCategory, deleteCategory } = useCategories();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    rating: 4.5,
    asin: "",
    badge: "",
    category: "beleza",
    videoUrl: "",
  });
  const [submitting, setSubmitting] = useState(false);
  
  // Formulário de categoria
  const [categoryFormData, setCategoryFormData] = useState({
    categoryId: "",
    name: "",
  });
  const [submittingCategory, setSubmittingCategory] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      price: "",
      rating: 4.5,
      asin: "",
      badge: "",
      category: "beleza",
      videoUrl: "",
    });
    setEditingProduct(null);
  };

  const handleOpenDialog = (product?: Product) => {
    try {
      if (product) {
        setEditingProduct(product);
        setFormData({
          title: product.title,
          description: product.description,
          image: product.image,
          price: product.price,
          rating: product.rating,
          asin: product.asin,
          badge: product.badge || "",
          category: product.category,
          videoUrl: product.videoUrl || "",
        });
      } else {
        resetForm();
      }
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Erro ao abrir diálogo:", error);
      toast.error("Erro ao abrir formulário");
    }
  };

  const handleCloseDialog = () => {
    if (submitting) return; // Previne fechamento durante envio
    setIsDialogOpen(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const productData: any = {
        title: formData.title,
        description: formData.description,
        image: formData.image,
        price: formData.price,
        rating: Number(formData.rating),
        asin: formData.asin,
        category: formData.category,
      };

      // Só adiciona campos opcionais se tiverem valor
      if (formData.badge && formData.badge.trim()) {
        productData.badge = formData.badge.trim();
      }
      if (formData.videoUrl && formData.videoUrl.trim()) {
        productData.videoUrl = formData.videoUrl.trim();
      }

      if (editingProduct) {
        await updateProduct(editingProduct.id as string, productData);
        toast.success("Produto atualizado com sucesso!");
      } else {
        await addProduct(productData);
        toast.success("Produto adicionado com sucesso!");
      }

      handleCloseDialog();
    } catch (error: any) {
      toast.error(error.message || "Erro ao salvar produto");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("Tem certeza que deseja deletar este produto?")) return;

    try {
      await deleteProduct(productId);
      toast.success("Produto deletado com sucesso!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao deletar produto");
    }
  };

  // Funções para gerenciar categorias
  const handleOpenCategoryDialog = (category?: Category) => {
    try {
      if (category) {
        setEditingCategory(category);
        setCategoryFormData({
          categoryId: category.categoryId,
          name: category.name,
        });
      } else {
        setCategoryFormData({
          categoryId: "",
          name: "",
        });
        setEditingCategory(null);
      }
      setIsCategoryDialogOpen(true);
    } catch (error) {
      console.error("Erro ao abrir diálogo de categoria:", error);
      toast.error("Erro ao abrir formulário");
    }
  };

  const handleCloseCategoryDialog = () => {
    if (submittingCategory) return;
    setIsCategoryDialogOpen(false);
    setCategoryFormData({
      categoryId: "",
      name: "",
    });
    setEditingCategory(null);
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingCategory(true);

    try {
      // Normalizar categoryId (minúsculas, sem espaços, hífens permitidos)
      const normalizedCategoryId = categoryFormData.categoryId.toLowerCase().trim().replace(/\s+/g, "-");

      const categoryData = {
        categoryId: normalizedCategoryId,
        name: categoryFormData.name.trim(),
      };

      if (editingCategory && editingCategory.id) {
        await updateCategory(editingCategory.id, categoryData);
        toast.success("Categoria atualizada com sucesso!");
      } else {
        await addCategory(categoryData);
        toast.success("Categoria adicionada com sucesso!");
      }

      handleCloseCategoryDialog();
    } catch (error: any) {
      toast.error(error.message || "Erro ao salvar categoria");
    } finally {
      setSubmittingCategory(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm("Tem certeza que deseja deletar esta categoria?")) return;

    try {
      await deleteCategory(categoryId);
      toast.success("Categoria deletada com sucesso!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao deletar categoria");
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <div className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard de Produtos</h1>
            <p className="text-sm text-muted-foreground">
              Logado como: {currentUser?.email}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.open("/produtos", "_blank")}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Ver Site
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Actions */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold">Produtos da Amazon</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleOpenCategoryDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Categoria
            </Button>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Produto
            </Button>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            if (!submitting) {
              setIsDialogOpen(open);
              if (!open) {
                resetForm();
              }
            }
          }}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? "Editar Produto" : "Adicionar Novo Produto"}
                </DialogTitle>
                <DialogDescription>
                  Preencha os dados do produto da Amazon
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      placeholder="Nome do produto"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    <SelectContent>
                      {categories.length > 0 ? (
                        categories.map((cat) => (
                          <SelectItem key={cat.categoryId} value={cat.categoryId}>
                            {cat.name}
                          </SelectItem>
                        ))
                      ) : (
                        <>
                          <SelectItem value="beleza">Beleza</SelectItem>
                          <SelectItem value="roupas">Roupas</SelectItem>
                          <SelectItem value="sapatos">Sapatos</SelectItem>
                          <SelectItem value="saude">Saúde</SelectItem>
                        </>
                      )}
                    </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    placeholder="Descrição do produto"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="asin">ASIN ou URL da Amazon *</Label>
                    <Input
                      id="asin"
                      value={formData.asin}
                      onChange={(e) => setFormData({ ...formData, asin: e.target.value })}
                      required
                      placeholder="B08XXXXXXX ou https://amzn.to/..."
                    />
                    <p className="text-xs text-muted-foreground">
                      Aceita ASIN (ex: B08XXXXXXX) ou URL completa
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço *</Label>
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      placeholder="R$ 99,90"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="image">URL da Imagem *</Label>
                    <Input
                      id="image"
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      required
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rating">Avaliação (0-5)</Label>
                    <Input
                      id="rating"
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="badge">Badge (opcional)</Label>
                    <Select
                      value={formData.badge || "none"}
                      onValueChange={(value) => setFormData({ ...formData, badge: value === "none" ? "" : value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Nenhum" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Nenhum</SelectItem>
                        <SelectItem value="Mais Vendido">Mais Vendido</SelectItem>
                        <SelectItem value="Recomendado">Recomendado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="videoUrl">URL do Vídeo (opcional)</Label>
                    <Input
                      id="videoUrl"
                      type="url"
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      placeholder="YouTube ou Vimeo (ex: https://youtube.com/watch?v=...)"
                    />
                    <p className="text-xs text-muted-foreground">
                      Use URL do YouTube ou Vimeo para exibir o vídeo embutido. URLs da Amazon abrem em nova aba.
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={handleCloseDialog}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Salvando...
                      </>
                    ) : editingProduct ? (
                      "Atualizar"
                    ) : (
                      "Adicionar"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* Category Dialog */}
          <Dialog 
            open={isCategoryDialogOpen} 
            onOpenChange={(open) => {
              if (!submittingCategory) {
                if (open) {
                  setIsCategoryDialogOpen(true);
                } else {
                  handleCloseCategoryDialog();
                }
              }
            }}
          >
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingCategory ? "Editar Categoria" : "Adicionar Nova Categoria"}
                </DialogTitle>
                <DialogDescription>
                  Adicione ou edite uma categoria de produtos
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCategorySubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="categoryId">ID da Categoria *</Label>
                  <Input
                    id="categoryId"
                    value={categoryFormData.categoryId}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, categoryId: e.target.value })}
                    required
                    placeholder="Ex: eletronicos (minúsculas, sem espaços)"
                    disabled={!!editingCategory}
                  />
                  <p className="text-xs text-muted-foreground">
                    {editingCategory 
                      ? "O ID da categoria não pode ser alterado após criação"
                      : "Use minúsculas, sem espaços. Ex: eletronicos, maquiagem, etc."
                    }
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoryName">Nome Amigável *</Label>
                  <Input
                    id="categoryName"
                    value={categoryFormData.name}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                    required
                    placeholder="Ex: Eletrônicos, Maquiagem, etc."
                  />
                  <p className="text-xs text-muted-foreground">
                    Nome que aparecerá para os usuários no site
                  </p>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={handleCloseCategoryDialog}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={submittingCategory}>
                    {submittingCategory ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Salvando...
                      </>
                    ) : editingCategory ? (
                      "Atualizar"
                    ) : (
                      "Adicionar"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Categories Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Categorias</h3>
          {categoriesLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : categories.length === 0 ? (
            <Alert>
              <AlertDescription>
                Nenhuma categoria cadastrada. As categorias padrão (Beleza, Roupas, Sapatos, Saúde) são usadas automaticamente.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="bg-background rounded-lg border p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-sm text-muted-foreground font-mono">{category.categoryId}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenCategoryDialog(category)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCategory(category.id!)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Products Table */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : products.length === 0 ? (
          <Alert>
            <AlertDescription>
              Nenhum produto cadastrado. Clique em "Adicionar Produto" para começar.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="bg-background rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>ASIN</TableHead>
                  <TableHead>Avaliação</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-12 w-12 object-cover rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder-product.jpg";
                          }}
                        />
                        <div>
                          <div className="font-medium">{product.title}</div>
                          {product.badge && (
                            <span className="text-xs bg-primary text-white px-2 py-0.5 rounded">
                              {product.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">{product.category}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell className="font-mono text-sm">{product.asin}</TableCell>
                    <TableCell>⭐ {product.rating}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(product.id as string)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

