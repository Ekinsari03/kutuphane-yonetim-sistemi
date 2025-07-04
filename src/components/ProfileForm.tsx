"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Profile {
  id: string;
  bio: string | null;
  avatarUrl: string | null;
  location: string | null;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

interface ProfileFormProps {
  user: User;
  profile: Profile | null;
}

export default function ProfileForm({ user, profile }: ProfileFormProps) {
  const [bio, setBio] = useState(profile?.bio || "");
  const [location, setLocation] = useState(profile?.location || "");
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatarUrl || "");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio,
          location,
          avatarUrl,
        }),
      });

      if (response.ok) {
        setMessage("Profil başarıyla güncellendi!");
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || "Profil güncellenirken bir hata oluştu");
      }
    } catch (error) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Profil Bilgileri</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Biyografi
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-black bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Kendiniz hakkında bir şeyler yazın..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Konum
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-black bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Şehir, Ülke"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700">
            Profil Fotoğrafı URL
          </label>
          <input
            type="url"
            id="avatarUrl"
            name="avatarUrl"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-black bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://ornekwebsite.com/avatar.jpg"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        {message && (
          <div className="text-green-600 text-sm">{message}</div>
        )}

        <div className="space-y-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? "Güncelleniyor..." : "Profili Güncelle"}
          </button>
          
          <Link
            href={`/users/${user.id}`}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Profilini Görüntüle
          </Link>
        </div>
      </form>
    </div>
  );
}
