'use client';

import { Book, Category } from "@prisma/client";
import { useState } from "react";
import Link from "next/link";
import UserAvatar from "./UserAvatar";

interface BookWithRelations extends Book {
  category: Category;
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
}

interface BooksListProps {
  books: BookWithRelations[];
}

export default function BooksList({ books }: BooksListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">
          Henüz kitap bulunmuyor.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Arama Kutusu */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Kitap Ara
            </label>
            <input
              id="search"
              type="text"
              placeholder="Kitap adı, yazar veya kategori ile arama yapın..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black placeholder-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Kitap Listesi */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Kitaplar ({filteredBooks.length})
          </h2>
          
          {filteredBooks.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-500">
                Arama kriterlerinize uygun kitap bulunamadı.
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredBooks.map((book) => (
                <div key={book.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        <span className="font-medium">Yazar:</span> {book.author}
                      </p>
                      <p className="text-gray-600 mb-3">
                        <span className="font-medium">Kategori:</span> {book.category.name}
                      </p>
                      {book.description && (
                        <p className="text-gray-600 mb-3 text-sm">
                          {book.description.length > 100 
                            ? `${book.description.substring(0, 100)}...` 
                            : book.description
                          }
                        </p>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-2">
                        <UserAvatar user={book.createdBy} size="sm" />
                        <div className="text-xs text-gray-500">
                          <Link 
                            href={`/users/${book.createdBy.id}`}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            {book.createdBy.name}
                          </Link>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(book.createdAt).toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
