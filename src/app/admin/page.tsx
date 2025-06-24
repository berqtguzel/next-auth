import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    redirect("/dashboard");
  }

  // Örnek kullanıcı listesi (mock data)
  const users = [
    { id: 1, name: "Ali Yılmaz", email: "ali@example.com", role: "user" },
    { id: 2, name: "Ayşe Demir", email: "ayse@example.com", role: "user" },
    { id: 3, name: "Admin Kullanıcı", email: "admin@example.com", role: "admin" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-red-100 py-12 px-4">
      <div className="w-full max-w-2xl bg-white/95 rounded-3xl shadow-2xl p-10 border border-white/60">
        <h1 className="text-3xl font-extrabold text-pink-700 mb-6 text-center tracking-tight">Admin Paneli</h1>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b font-semibold">Ad Soyad</th>
              <th className="py-2 px-4 border-b font-semibold">E-posta</th>
              <th className="py-2 px-4 border-b font-semibold">Rol</th>
              <th className="py-2 px-4 border-b font-semibold">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-pink-50">
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">
                  {user.role === "admin" ? (
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-xs font-bold shadow">Admin</span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-xs font-semibold">Kullanıcı</span>
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  <button className="px-3 py-1 rounded bg-yellow-400 text-white text-xs font-semibold shadow hover:bg-yellow-500 transition">Düzenle</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 