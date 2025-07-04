import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import BooksList from "@/components/BooksList";

interface BooksPageProps {
  searchParams: { category?: string };
}

export default async function Books({ searchParams }: BooksPageProps) {
  const session = await getServerSession(authOptions);
  const params = await searchParams;
  const selectedCategory = params.category;
  
  // Base query options
  const baseQuery = {
    include: {
      category: true,
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc" as const,
    },
  };

  // Add category filter if selected
  const booksQuery = selectedCategory
    ? {
        ...baseQuery,
        where: { categoryId: selectedCategory },
      }
    : baseQuery;

  const books = await prisma.book.findMany(booksQuery);

  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          books: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  const selectedCategoryData = selectedCategory
    ? categories.find(cat => cat.id === selectedCategory)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Kütüphane Sistemi
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                Ana Sayfa
              </Link>
              {session ? (
                <>
                  <Link href={`/users/${session.user.id}`} className="text-blue-600 hover:text-blue-800">
                    Profil
                  </Link>
                  <Link href="/messages" className="text-blue-600 hover:text-blue-800">
                    Mesajlar
                  </Link>
                  {session.user.role === "admin" && (
                    <Link href="/admin" className="text-red-600 hover:text-red-800">
                      Admin Panel
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link href="/login" className="text-blue-600 hover:text-blue-800">
                    Giriş
                  </Link>
                  <Link href="/register" className="text-green-600 hover:text-green-800">
                    Kayıt Ol
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {selectedCategoryData ? `${selectedCategoryData.name} Kategorisi` : "Kitap Koleksiyonu"}
          </h1>
          <p className="text-gray-600">
            {selectedCategoryData 
              ? `${selectedCategoryData.name} kategorisindeki kitapları görüntülüyorsunuz.`
              : "Kütüphanemizde bulunan kitapları keşfedin. Kategorilere göre filtreleme yapabilirsiniz."
            }
          </p>
        </div>

        {categories.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Kategoriler</h2>
              {selectedCategory && (
                <Link
                  href="/books"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Tüm kitapları göster
                </Link>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/books?category=${category.id}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  }`}
                >
                  {category.name} ({category._count.books})
                </Link>
              ))}
            </div>
          </div>
        )}

        <BooksList books={books} />
      </main>
    </div>
  );
}
