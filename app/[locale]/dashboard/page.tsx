"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { useUserRole } from '@/hooks/useUserRole';
import { useUserRole } from '@/features/auth/hooks/profile/useUserRole';

export default function DashboardPage() {
  const router = useRouter();
  const { isAdmin, isLoading } = useUserRole();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.replace('/');
    }
  }, [isAdmin, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold text-[#1e3a8a]">Admin Dashboard</h1>
      <p className="text-gray-500 mt-2">Welcome back, Admin!</p>
    </div>
  );
}