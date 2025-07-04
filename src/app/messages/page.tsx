import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import MessageList from "@/components/MessageList";
import SendMessageForm from "@/components/SendMessageForm";

export default async function Messages() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { fromId: session.user.id },
        { toId: session.user.id },
      ],
    },
    include: {
      from: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      to: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const users = await prisma.user.findMany({
    where: {
      id: {
        not: session.user.id,
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
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
              <a href="/" className="text-xl font-bold text-gray-900">
                Kütüphane Sistemi
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/" className="text-blue-600 hover:text-blue-800">
                Ana Sayfa
              </a>
              <a href="/books" className="text-blue-600 hover:text-blue-800">
                Kitaplar
              </a>
              <a href={`/users/${session.user.id}`} className="text-blue-600 hover:text-blue-800">
                Profil
              </a>
              {session.user.role === "admin" && (
                <a href="/admin" className="text-red-600 hover:text-red-800">
                  Admin Panel
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Yeni Mesaj Gönder</h1>
            <SendMessageForm users={users} />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Mesajlar</h1>
            <MessageList messages={messages} currentUserId={session.user.id} />
          </div>
        </div>
      </main>
    </div>
  );
}
