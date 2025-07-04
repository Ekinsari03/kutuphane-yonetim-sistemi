"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
}

interface SendMessageFormProps {
  users: User[];
}

export default function SendMessageForm({ users }: SendMessageFormProps) {
  const [toId, setToId] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    if (!toId || !content) {
      setError("Lütfen alıcı ve mesaj içeriğini doldurun");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toId,
          content,
        }),
      });

      if (response.ok) {
        setMessage("Mesaj başarıyla gönderildi!");
        setContent("");
        setToId("");
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || "Mesaj gönderilirken bir hata oluştu");
      }
    } catch (error) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">👥</div>
        <p className="text-gray-600">Mesaj gönderebileceğiniz başka kullanıcı bulunmuyor.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="toId" className="block text-sm font-medium text-gray-700">
          Alıcı
        </label>
        <select
          id="toId"
          name="toId"
          value={toId}
          onChange={(e) => setToId(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-black bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="">Kullanıcı seçin</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Mesaj
        </label>
        <textarea
          id="content"
          name="content"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-black bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Mesajınızı yazın..."
          required
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      {message && (
        <div className="text-green-600 text-sm">{message}</div>
      )}

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? "Gönderiliyor..." : "Mesajı Gönder"}
        </button>
      </div>
    </form>
  );
}
