import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminPanel from "@/components/AdminPanel";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    redirect("/dashboard");
  }

  // Örnek kullanıcı listesi (mock data)
  const initialUsers = [
    { id: 1, name: "Ali Yılmaz", email: "ali@example.com", role: "user" as const },
    { id: 2, name: "Ayşe Demir", email: "ayse@example.com", role: "user" as const },
    { id: 3, name: "Admin Kullanıcı", email: "administrator@example.com", role: "admin" as const },
  ];

  return <AdminPanel initialUsers={initialUsers} />;
} 