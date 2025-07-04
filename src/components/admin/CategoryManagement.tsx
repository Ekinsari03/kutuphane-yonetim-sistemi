"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
  _count: {
    books: number;
  };
}

interface CategoryManagementProps {
  categories: Category[];
}

export default function CategoryManagement({ categories }: CategoryManagementProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoryName }),
      });

      if (response.ok) {
        setMessage("Kategori başarıyla eklendi");
        setCategoryName("");
        setShowAddForm(false);
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || "Kategori eklenirken bir hata oluştu");
      }
    } catch (error) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (categoryId: string, categoryName: string, bookCount: number) => {
    if (bookCount > 0) {
      setError(`"${categoryName}" kategorisini silmek için önce bu kategorideki kitapları silin veya başka kategoriye taşıyın.`);
      return;
    }

    if (!confirm(`"${categoryName}" kategorisini silmek istediğinizden emin misiniz?`)) {
      return;
    }

    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/admin/categories/${categoryId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Kategori başarıyla silindi");
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || "Kategori silinirken bir hata oluştu");
      }
    } catch (error) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Kategoriler ({categories.length})
        </h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {showAddForm ? "İptal" : "Yeni Kategori Ekle"}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {message}
        </div>
      )}

      {showAddForm && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Yeni Kategori Ekle</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Kategori Adı</label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-black bg-white"
                placeholder="Kategori adını girin"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {isLoading ? "Ekleniyor..." : "Ekle"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setCategoryName("");
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-600">
                  {category._count.books} kitap
                </p>
              </div>
              <button
                onClick={() => handleDelete(category.id, category.name, category._count.books)}
                disabled={isLoading}
                className="text-red-600 hover:text-red-900 disabled:opacity-50"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📂</div>
          <p className="text-gray-600">Henüz kategori bulunmuyor.</p>
        </div>
      )}
    </div>
  );
}
