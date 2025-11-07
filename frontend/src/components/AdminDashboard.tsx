import React, { useState, useEffect, useCallback, useRef } from "react"; // Tambahkan useRef
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Trash2, UploadCloud, Edit3 } from "lucide-react";
import { Label } from "./ui/label";

interface Product {
  id: number;
  nama: string;
  deskripsi: string;
  gambar_url: string;
}

interface NewProductState {
  id?: number | null;
  file: File | null;
  preview: string;
  nama: string;
  deskripsi: string;
}

function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<NewProductState | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const createdObjectUrlRef = useRef<string | null>(null);

  const authHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/admin/products", { headers: authHeaders() });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    return () => {
      if (createdObjectUrlRef.current) {
        URL.revokeObjectURL(createdObjectUrlRef.current);
        createdObjectUrlRef.current = null;
      }
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      if (createdObjectUrlRef.current) {
        URL.revokeObjectURL(createdObjectUrlRef.current);
        createdObjectUrlRef.current = null;
      }
      const url = URL.createObjectURL(file);
      createdObjectUrlRef.current = url;
      setNewProduct((prev) => ({
        id: prev?.id ?? null,
        file,
        preview: url,
        nama: prev?.nama ?? "",
        deskripsi: prev?.deskripsi ?? "",
      }));
    } else {
      alert("File harus berupa gambar.");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const cancelUpload = () => {
    if (createdObjectUrlRef.current) {
      URL.revokeObjectURL(createdObjectUrlRef.current);
      createdObjectUrlRef.current = null;
    }
    setNewProduct(null);
  };

const handleSave = async () => {
  if (!newProduct || !newProduct.nama) {
    alert("Nama produk wajib diisi.");
    return;
  }

  const formData = new FormData();
  if (newProduct.file) {
    formData.append("gambar", newProduct.file); // backend expects 'gambar'
  }
  formData.append("nama", newProduct.nama);
  formData.append("deskripsi", newProduct.deskripsi || "");

  try {
    let response: any;
    if (newProduct.id) {
      response = await api.put(`/api/admin/products/${newProduct.id}`, formData, {
        headers: authHeaders(), // jangan set Content-Type manual
      });
      setProducts((prev) => prev.map((p) => (p.id === newProduct.id ? response.data : p)));
    } else {
      response = await api.post("/api/admin/upload", formData, {
        headers: authHeaders(),
      });
      setProducts((prev) => [response.data, ...prev]);
    }
    cancelUpload();
  } catch (error: any) {
    console.error("Error saving product", error);
    if (error?.response) {
      console.error("Backend response:", error.response.status, error.response.data);
      alert(`Gagal menyimpan produk: ${error.response.data?.message || error.response.status}`);
    } else {
      alert("Gagal menyimpan produk. Periksa console/network untuk detail.");
    }
  }
};

  const handleDelete = async (id: number) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;

    try {
      await api.delete(`/api/admin/products/${id}`, { headers: authHeaders() });
      setProducts((p) => p.filter((x) => x.id !== id));
    } catch (error) {
      console.error("Error deleting product", error);
      alert("Gagal menghapus produk.");
    }
  };

  const startEdit = (product: Product) => {
    setNewProduct({
      id: product.id,
      file: null,
      preview: product.gambar_url,
      nama: product.nama,
      deskripsi: product.deskripsi,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{newProduct?.id ? "Edit Produk" : "Tambah Produk Baru"}</CardTitle>
        </CardHeader>
        <CardContent>
          {!newProduct ? (
            <div
              className={`flex justify-center items-center w-full h-48 border-2 border-dashed rounded-lg transition-colors cursor-pointer ${
                isDragging ? "border-primary bg-primary/10" : "border-border"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="text-center text-muted-foreground pointer-events-none">
                <UploadCloud className="mx-auto h-12 w-12" />
                <p>Drag & drop gambar ke sini, atau klik untuk memilih file</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-6">
              <img src={newProduct.preview} alt="Preview" className="w-full md:w-1/3 h-auto object-cover rounded-lg" />
              <div className="flex-1 space-y-4">
                <div>
                  <Label htmlFor="nama">Nama Produk</Label>
                  <Input id="nama" name="nama" value={newProduct.nama} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="deskripsi">Deskripsi</Label>
                  <Textarea id="deskripsi" name="deskripsi" value={newProduct.deskripsi} onChange={handleInputChange} />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSave}>{newProduct.id ? "Perbarui" : "Simpan"}</Button>
                  <Button variant="outline" onClick={cancelUpload}>Batal</Button>
                  <Button variant="ghost" onClick={() => fileInputRef.current?.click()}>Ganti Gambar</Button>
                  <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold text-primary mb-4">Daftar Produk</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="relative group">
              <img src={product.gambar_url} alt={product.nama} className="w-full h-48 object-cover rounded-t-lg" />
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{product.nama}</h3>
                    <p className="text-sm text-muted-foreground truncate">{product.deskripsi}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="opacity-80"
                      onClick={() => startEdit(product)}
                      title="Edit"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="opacity-80"
                      onClick={() => handleDelete(product.id)}
                      title="Hapus"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
// ini comment