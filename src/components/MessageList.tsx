"use client";

import Link from "next/link";
import UserAvatar from "./UserAvatar";

interface Message {
  id: string;
  content: string;
  createdAt: Date;
  from: {
    id: string;
    name: string;
    email: string;
  };
  to: {
    id: string;
    name: string;
    email: string;
  };
}

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

export default function MessageList({ messages, currentUserId }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">💬</div>
        <p className="text-gray-600">Henüz mesajınız bulunmuyor.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {messages.map((message) => {
        const isFromMe = message.from.id === currentUserId;
        const otherUser = isFromMe ? message.to : message.from;
        
        return (
          <div
            key={message.id}
            className={`border rounded-lg p-4 ${
              isFromMe ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <UserAvatar user={otherUser} size="sm" />
                <div className="text-sm">
                  {isFromMe ? (
                    <span className="text-blue-600 font-medium">
                      Siz → <Link 
                        href={`/users/${otherUser.id}`}
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {otherUser.name}
                      </Link>
                    </span>
                  ) : (
                    <span className="text-gray-600 font-medium">
                      <Link 
                        href={`/users/${otherUser.id}`}
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {otherUser.name}
                      </Link> → Size
                    </span>
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {new Date(message.createdAt).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
            <p className="text-gray-800">{message.content}</p>
          </div>
        );
      })}
    </div>
  );
}
