"use client";
import { useState } from "react";

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
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleRoleChange = (id: number, newRole: "user" | "moderator") => {
    setUsers(users.map((user) =>
      user.id === id ? { ...user, role: newRole } : user
    ));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-red-100 py-12 px-4">
      <div className="w-full max-w-2xl bg-white/95 rounded-3xl shadow-2xl p-10 border border-white/60">
        <h1 className="text-4xl font-extrabold text-pink-700 mb-8 text-center tracking-tight">Admin Paneli</h1>
        <table className="w-full text-left border-collapse text-base">
          <thead>
            <tr className="bg-pink-100">
              <th className="py-3 px-4 border-b font-bold text-gray-700">Ad Soyad</th>
              <th className="py-3 px-4 border-b font-bold text-gray-700">E-posta</th>
              <th className="py-3 px-4 border-b font-bold text-gray-700">Rol</th>
              <th className="py-3 px-4 border-b font-bold text-gray-700">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-400">Hiç kullanıcı yok.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-pink-50 transition">
                  <td className="py-3 px-4 border-b text-gray-900 font-medium">{user.name}</td>
                  <td className="py-3 px-4 border-b text-gray-800">{user.email}</td>
                  <td className="py-3 px-4 border-b">
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
                  <td className="py-3 px-4 border-b flex gap-2 items-center">
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
    </div>
  );
} 