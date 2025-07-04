'use client';

import { useState } from 'react';

interface UserAvatarProps {
  user: {
    name: string;
    email: string;
    profile?: {
      avatarUrl?: string | null;
    } | null;
  };
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-12 h-12 text-base',
  lg: 'w-16 h-16 text-lg',
  xl: 'w-20 h-20 text-2xl'
};

const colorVariants = [
  'bg-red-100 text-red-600',
  'bg-blue-100 text-blue-600', 
  'bg-green-100 text-green-600',
  'bg-yellow-100 text-yellow-600',
  'bg-purple-100 text-purple-600',
  'bg-pink-100 text-pink-600',
  'bg-indigo-100 text-indigo-600',
  'bg-teal-100 text-teal-600',
];

function getColorFromName(name: string): string {
  const index = name.charCodeAt(0) % colorVariants.length;
  return colorVariants[index];
}

export default function UserAvatar({ user, size = 'md', className = '' }: UserAvatarProps) {
  const [imageError, setImageError] = useState(false);
  
  const initials = user.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2);
  const colorClass = getColorFromName(user.name);
  const sizeClass = sizeClasses[size];
  
  // Eğer avatarUrl varsa ve resim yüklenememişse, fallback göster
  if (user.profile?.avatarUrl && !imageError) {
    return (
      <div className={`${sizeClass} rounded-full overflow-hidden ${className}`}>
        <img 
          src={user.profile.avatarUrl} 
          alt={`${user.name} profil resmi`}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }
  
  // Default olarak renkli initials göster
  return (
    <div className={`${sizeClass} ${colorClass} rounded-full flex items-center justify-center font-bold ${className}`}>
      {initials}
    </div>
  );
}
