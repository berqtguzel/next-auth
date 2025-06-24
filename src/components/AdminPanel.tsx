"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
};

type AdminPanelProps = {
  initialUsers: User[];
};

export default function AdminPanel({ initialUsers }: AdminPanelProps) {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleRoleChange = (id: number, newRole: "user" | "moderator") => {
    setUsers(users.map((user) =>
      user.id === id ? { ...user, role: newRole } : user
    ));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-red-100 py-6 px-2 sm:py-12 sm:px-4">
      <div className="w-full max-w-2xl bg-white/95 rounded-3xl shadow-2xl p-4 sm:p-10 border border-white/60">
        <button
          onClick={() => router.push("/dashboard")}
          className="mb-4 sm:mb-6 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold shadow hover:from-cyan-400 hover:to-blue-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm sm:text-base"
        >
          ← Dashboard'a Dön
        </button>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-pink-700 mb-6 sm:mb-8 text-center tracking-tight">Admin Paneli</h1>
        {/* Masaüstü için klasik tablo, mobilde blok görünüm */}
        <div className="hidden sm:block">
          <table className="w-full text-left border-separate border-spacing-y-2 text-base">
            <thead>
              <tr className="bg-pink-100 rounded-xl">
                <th className="py-3 px-4 font-bold text-gray-700 rounded-l-xl">Ad Soyad</th>
                <th className="py-3 px-4 font-bold text-gray-700">E-posta</th>
                <th className="py-3 px-4 font-bold text-gray-700">Rol</th>
                <th className="py-3 px-4 font-bold text-gray-700 rounded-r-xl">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-gray-400">Hiç kullanıcı yok.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="bg-white rounded-xl shadow hover:bg-pink-50 transition">
                    <td className="py-3 px-4 text-gray-900 font-medium align-middle">{user.name}</td>
                    <td className="py-3 px-4 text-gray-800 align-middle">{user.email}</td>
                    <td className="py-3 px-4 align-middle">
                      <span className={
                        user.role === "admin"
                          ? "px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-xs font-bold shadow"
                          : user.role === "moderator"
                          ? "px-3 py-1 rounded-full bg-gradient-to-r from-green-400 to-blue-400 text-white text-xs font-bold shadow"
                          : "px-3 py-1 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-xs font-semibold"
                      }>
                        {user.role === "admin"
                          ? "Admin"
                          : user.role === "moderator"
                          ? "Moderatör"
                          : "Kullanıcı"}
                      </span>
                    </td>
                    <td className="py-3 px-4 flex gap-2 items-center align-middle">
                      {user.role !== "admin" ? (
                        <>
                          <select
                            className="px-3 py-1 rounded border-2 border-pink-400 text-sm font-semibold bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 shadow-sm hover:border-pink-500 transition"
                            value={user.role}
                            onChange={e => handleRoleChange(user.id, e.target.value as "user" | "moderator")}
                          >
                            <option value="user" className="font-semibold text-gray-800 bg-white">Kullanıcı</option>
                            <option value="moderator" className="font-semibold text-gray-800 bg-white">Moderatör</option>
                          </select>
                          <button
                            className="px-3 py-1 rounded bg-red-600 text-white text-xs font-semibold shadow hover:bg-red-700 transition border border-red-700"
                            onClick={() => handleDelete(user.id)}
                          >
                            Sil
                          </button>
                        </>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-500 text-xs font-semibold border border-gray-300">Düzenlenemez</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Mobil için blok görünüm */}
        <div className="block sm:hidden space-y-4">
          {users.length === 0 ? (
            <div className="py-6 text-center text-gray-400 bg-white rounded-xl shadow">Hiç kullanıcı yok.</div>
          ) : (
            users.map((user) => (
              <div key={user.id} className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-700">Ad Soyad:</span>
                  <span className="text-gray-900 font-medium">{user.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-700">E-posta:</span>
                  <span className="text-gray-800">{user.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-700">Rol:</span>
                  <span className={
                    user.role === "admin"
                      ? "px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-xs font-bold shadow"
                      : user.role === "moderator"
                      ? "px-3 py-1 rounded-full bg-gradient-to-r from-green-400 to-blue-400 text-white text-xs font-bold shadow"
                      : "px-3 py-1 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-xs font-semibold"
                  }>
                    {user.role === "admin"
                      ? "Admin"
                      : user.role === "moderator"
                      ? "Moderatör"
                      : "Kullanıcı"}
                  </span>
                </div>
                <div className="flex justify-between items-center gap-2 mt-2">
                  {user.role !== "admin" ? (
                    <>
                      <select
                        className="px-3 py-1 rounded border-2 border-pink-400 text-sm font-semibold bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 shadow-sm hover:border-pink-500 transition"
                        value={user.role}
                        onChange={e => handleRoleChange(user.id, e.target.value as "user" | "moderator")}
                      >
                        <option value="user" className="font-semibold text-gray-800 bg-white">Kullanıcı</option>
                        <option value="moderator" className="font-semibold text-gray-800 bg-white">Moderatör</option>
                      </select>
                      <button
                        className="px-3 py-1 rounded bg-red-600 text-white text-xs font-semibold shadow hover:bg-red-700 transition border border-red-700"
                        onClick={() => handleDelete(user.id)}
                      >
                        Sil
                      </button>
                    </>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-500 text-xs font-semibold border border-gray-300">Düzenlenemez</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 