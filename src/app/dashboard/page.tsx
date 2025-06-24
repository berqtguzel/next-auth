import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/logoutButton/logoutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const userName = session.user?.name || "Kullanıcı";
  const avatarLetter = userName.charAt(0).toUpperCase();

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-gradient-to-br from-cyan-100 via-blue-200 to-indigo-200 overflow-hidden">
      <svg className="absolute top-0 left-0 w-full h-64 md:h-80 z-0" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="url(#waveGradient)" fillOpacity="1" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
        <defs>
          <linearGradient id="waveGradient" x1="0" y1="0" x2="1440" y2="320" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38bdf8" />
            <stop offset="0.5" stopColor="#6366f1" />
            <stop offset="1" stopColor="#a5b4fc" />
          </linearGradient>
        </defs>
      </svg>
      <main className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 py-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-6 animate-fade-in bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
          Dashboard'a Hoşgeldin
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-6 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-8 border border-white/40">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 text-white text-3xl font-bold shadow-lg">
            {avatarLetter}
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-lg text-gray-700 font-semibold">Hoşgeldin,</span>
            <span className="text-2xl font-bold text-blue-700 flex items-center gap-2">
              {userName}
              {session.user?.role === "admin" && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-white text-xs font-bold shadow-md animate-pulse border border-white/60">Admin</span>
              )}
            </span>
          </div>
        </div>
        <div className="w-full max-w-xs flex flex-col items-center">
          <LogoutButton />
        </div>
      </main>
      <footer className="relative z-10 w-full py-4 flex flex-col items-center bg-white/60 backdrop-blur-md border-t border-white/30 mt-8">
        <span className="text-xs text-gray-500">© {new Date().getFullYear()} Şirketiniz. Tüm hakları saklıdır.</span>
        <span className="text-xs text-gray-400 mt-1">Powered by Next.js &amp; Tailwind CSS</span>
      </footer>
    </div>
  );
}
