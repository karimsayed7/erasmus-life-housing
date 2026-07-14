"use client";
import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header/Header";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserRole } from '@/features/auth/hooks/profile/useUserRole';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        {/* <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /> */}
      </div>
    );
  }
  
  if (!isAdmin) return null;
  return (
    <div>
      <Header className="bg-gray-50 border-gray-50"/>

      <main className="flex min-w-0">
        <Sidebar />
        <div className="w-full min-w-0 overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}