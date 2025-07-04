import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import UserAvatar from "@/components/UserAvatar";

interface UserProfilePageProps {
  params: Promise<{ userId: string }>;
}

export default async function UserProfilePage({ params }: UserProfilePageProps) {
  const session = await getServerSession(authOptions);
  const { userId } = await params;
  
  // Get user with profile information
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      profile: true,
      books: {
        include: {
          category: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      _count: {
        select: {
          books: true,
          messagesSent: true,
          messagesReceived: true,
        },
      },
    },
  });

  if (!user) {
    notFound();
  }

  const isOwnProfile = session?.user.id === userId;

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

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <UserAvatar user={user} size="xl" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">
                Üyelik: {new Date(user.createdAt).toLocaleDateString("tr-TR")}
              </p>
            </div>
          </div>

          {user.profile && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Hakkında</h2>
              {user.profile.bio && (
                <p className="text-gray-700 mb-2">{user.profile.bio}</p>
              )}
              {user.profile.location && (
                <p className="text-gray-600">
                  <span className="font-medium">Konum:</span> {user.profile.location}
                </p>
              )}
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {user._count.books}
              </div>
              <div className="text-sm text-gray-600">Eklenen Kitap</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {user._count.messagesSent}
              </div>
              <div className="text-sm text-gray-600">Gönderilen Mesaj</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {user._count.messagesReceived}
              </div>
              <div className="text-sm text-gray-600">Alınan Mesaj</div>
            </div>
          </div>

          {session && !isOwnProfile && (
            <div className="flex space-x-4">
              <Link
                href={`/messages?to=${userId}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Mesaj Gönder
              </Link>
            </div>
          )}

          {isOwnProfile && (
            <div className="flex space-x-4">
              <Link
                href="/profile"
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Profili Düzenle
              </Link>
              <Link
                href="/signout"
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Oturumu Kapat
              </Link>
            </div>
          )}
        </div>

        {user.books.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Eklenen Kitaplar ({user.books.length})
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {user.books.map((book) => (
                <div key={book.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{book.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    <span className="font-medium">Yazar:</span> {book.author}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    <span className="font-medium">Kategori:</span> {book.category.name}
                  </p>
                  {book.description && (
                    <p className="text-gray-600 text-sm">
                      {book.description.length > 100 
                        ? `${book.description.substring(0, 100)}...` 
                        : book.description
                      }
                    </p>
                  )}
                  <div className="mt-2 text-xs text-gray-500">
                    {new Date(book.createdAt).toLocaleDateString('tr-TR')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
