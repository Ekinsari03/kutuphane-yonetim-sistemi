import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // Get categories for quick navigation
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Kütüphane Sistemi</h1>
            </div>
            <div className="flex items-center space-x-4">
              {session ? (
                <>
                  <span className="text-gray-700">Hoş geldin, {session.user.name}</span>
                  <Link
                    href={`/users/${session.user.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Profil
                  </Link>
                  <Link
                    href="/books"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Kitaplar
                  </Link>
                  <Link
                    href="/messages"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Mesajlar
                  </Link>
                  {session.user.role === "admin" && (
                    <Link
                      href="/admin"
                      className="text-red-600 hover:text-red-800"
                    >
                      Admin Panel
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    href="/books"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Kitaplar
                  </Link>
                  <Link
                    href="/login"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Giriş
                  </Link>
                  <Link
                    href="/register"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Kayıt Ol
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Kütüphane Yönetim Sistemi
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Dijital kütüphane sistemimize hoş geldiniz. Kitapları keşfedin, diğer kullanıcılarla mesajlaşın ve kütüphane deneyiminizi geliştirin.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Kitap Koleksiyonu</h3>
              <p className="text-gray-600">
                Geniş kitap koleksiyonumuzu keşfedin. Kategorilere göre arama yapın ve favori kitaplarınızı bulun.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Mesajlaşma</h3>
              <p className="text-gray-600">
                Diğer kullanıcılarla kitaplar hakkında konuşun ve deneyimlerinizi paylaşın.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-4">👤</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Profil Yönetimi</h3>
              <p className="text-gray-600">
                Kişisel profilinizi oluşturun ve okuma alışkanlıklarınızı takip edin.
              </p>
            </div>
          </div>

          {/* Kategoriler Bölümü */}
          {categories.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Kategoriler</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/books?category=${category.id}`}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center hover:bg-blue-50"
                  >
                    <span className="text-4xl mb-2">📖</span>
                    <span className="text-lg font-semibold text-gray-800 mb-1">
                      {category.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {category._count.books} Kitap
                    </span>
                  </Link>
                ))}
              </div>
              <div className="text-center">
                <Link
                  href="/books"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Tüm kitapları görüntüle →
                </Link>
              </div>
            </div>
          )}

          {!session && (
            <div className="space-x-4">
              <Link
                href="/register"
                className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Hemen Kayıt Ol
              </Link>
              <Link
                href="/login"
                className="bg-gray-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Giriş Yap
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
