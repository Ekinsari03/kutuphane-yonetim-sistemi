import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import BookManagement from "@/components/admin/BookManagement";

export default async function AdminBooks() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  const books = await prisma.book.findMany({
    include: {
      category: true,
      createdBy: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const categories = await prisma.category.findMany({
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
              <Link href="/" className="text-xl font-bold text-gray-900">
                Kütüphane Sistemi
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-red-600 hover:text-red-800">
                Admin Paneline Dön
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Kitap Yönetimi</h1>
          <p className="text-gray-600">Kitap ekle, düzenle ve sil</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <BookManagement books={books} categories={categories} />
        </div>
      </main>
    </div>
  );
}
