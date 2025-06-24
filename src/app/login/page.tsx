"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineLock } from "react-icons/ai";
import { HiOutlineUserAdd } from "react-icons/hi";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (session) {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400 overflow-hidden px-4">
      
      <div className="relative z-10 bg-white/60 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-full max-w-md flex flex-col items-center border border-white/30">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-6 tracking-tight drop-shadow-lg text-center">
          <span className="bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-400 bg-clip-text text-transparent">Giriş Yap</span>
        </h1>

        <button
          onClick={() => signIn("auth0", { prompt: "login" })}
          className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <AiOutlineLock className="w-6 h-6" />
         Giriş yap
        </button>

        <p className="mt-6 text-sm text-gray-700 justify-center flex flex-col items-center text-center">
          Hesabınız yok mu?{' '}
          <button
            onClick={() => signIn("auth0", { screen_hint: "signup" })}
            className="text-cyan-600 font-semibold hover:underline hover:text-cyan-800 transition-colors flex items-center gap-1 align-center"
          >
            <HiOutlineUserAdd className="w-4 h-4" />
            Kayıt Ol
          </button>
        </p>

        <div className="mt-8 w-full flex flex-col items-center  gap-2">
          <span className="text-xs text-gray-400">© {new Date().getFullYear()} Berat Güzel. Tüm hakları saklıdır.</span>
        </div>
      </div>
    </div>
  );
}
