import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const userName = session.user?.name || "Kullanıcı";
  const avatarLetter = userName.charAt(0).toUpperCase();
  const userRole = session.user?.role === "admin" ? "Admin" : "Kullanıcı";

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-100 via-cyan-100 to-indigo-100">
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white/95 rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-white/60 transition-shadow hover:shadow-3xl">
          {userRole === "Admin" && (
            <a
              href="/admin"
              className="mb-6 px-7 py-3 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-400 to-indigo-500 text-white font-extrabold shadow-xl border-2 border-blue-400 flex items-center gap-2 text-lg tracking-wide hover:scale-105 hover:from-indigo-500 hover:to-cyan-400 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-cyan-200"
              style={{ alignSelf: "stretch", justifyContent: "center" }}
            >
              <svg className="w-7 h-7 mr-2 text-white drop-shadow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zm0 0V7m0 4v4m0 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"/></svg>
              Admin Paneline Git
            </a>
          )}
          <div className="relative flex flex-col items-center mb-6">
            <div className="flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white text-6xl font-extrabold shadow-lg border-4 border-white mb-2">
              <span className="flex items-center gap-2">
                {avatarLetter}
              </span>
            </div>
            {userRole === "Admin" ? (
              <span className="mt-2 px-5 py-1 rounded-full bg-gradient-to-r from-pink-600 via-red-500 to-yellow-400 text-white text-base font-bold shadow-lg border-2 border-yellow-200 flex items-center gap-2 animate-pulse">
                <svg className="w-4 h-4 mr-1 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.77l-4.77 2.51.91-5.32-3.87-3.77 5.34-.78z"/></svg>
                Admin
              </span>
            ) : (
              <span className="mt-2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 text-white text-sm font-semibold shadow-md border border-white/70 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-300 inline-block animate-pulse"></span>
                Kullanıcı
              </span>
            )}
          </div>
          <h1 className="text-3xl font-extrabold text-blue-700 mb-2 text-center tracking-tight">Hoşgeldin, <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-400 bg-clip-text text-transparent">{userName}</span>!</h1>
          <p className="text-gray-600 text-center mb-4">Dashboard'unuza hoşgeldiniz. Buradan hesabınızı ve işlemlerinizi yönetebilirsiniz.</p>
          <LogoutButton />
          {/* Ekstra dashboard içerikleri buraya eklenebilir */}
        </div>
      </main>
      <footer className="w-full py-4 flex flex-col items-center bg-white/70 backdrop-blur-md border-t border-white/30 mt-8">
        <span className="text-xs text-gray-500">© {new Date().getFullYear()} Berat Güzel. Tüm hakları saklıdır.</span>
        <span className="text-xs text-gray-400 mt-1">Powered by Next.js & Tailwind CSS</span>
      </footer>
    </div>
  );
}
