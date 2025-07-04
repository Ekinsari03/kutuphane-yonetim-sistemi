import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Admin() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  const stats = await Promise.all([
    prisma.user.count(),
    prisma.book.count(),
    prisma.category.count(),
    prisma.message.count(),
  ]);

  const [userCount, bookCount, categoryCount, messageCount] = stats;

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
              <Link href="/books" className="text-blue-600 hover:text-blue-800">
                Kitaplar
              </Link>
              <Link href={`/users/${session.user.id}`} className="text-blue-600 hover:text-blue-800">
                Profil
              </Link>
              <Link href="/messages" className="text-blue-600 hover:text-blue-800">
                Mesajlar
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Sistem yönetimi ve içerik kontrolü</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-3xl">👥</div>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Kullanıcılar</div>
                <div className="text-2xl font-bold text-gray-900">{userCount}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-3xl">📚</div>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Kitaplar</div>
                <div className="text-2xl font-bold text-gray-900">{bookCount}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-3xl">📂</div>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Kategoriler</div>
                <div className="text-2xl font-bold text-gray-900">{categoryCount}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-3xl">💬</div>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Mesajlar</div>
                <div className="text-2xl font-bold text-gray-900">{messageCount}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Kullanıcı Yönetimi</h2>
            <p className="text-gray-600 mb-4">
              Kullanıcıları görüntüle, sil ve rol değiştir
            </p>
            <Link
              href="/admin/users"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Kullanıcıları Yönet
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Kitap Yönetimi</h2>
            <p className="text-gray-600 mb-4">
              Kitap ekle, düzenle ve sil
            </p>
            <Link
              href="/admin/books"
              className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Kitapları Yönet
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Kategori Yönetimi</h2>
            <p className="text-gray-600 mb-4">
              Kategori ekle ve sil
            </p>
            <Link
              href="/admin/categories"
              className="inline-block bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Kategorileri Yönet
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
