import { getServerSession } from "next-auth";
import Link from "next/link";

import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-5 py-12 sm:px-8">
      <section aria-labelledby="home-title" className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
          Auth0 ve NextAuth.js
        </p>
        <h1
          id="home-title"
          className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl"
        >
          Güvenli oturum yönetimi
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Auth0 ile giriş yapın ve JWT tabanlı oturumunuzla korunan dashboard alanına erişin.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href={session ? "/dashboard" : "/login"}
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-950"
          >
            {session ? "Dashboard'a git" : "Giriş yap"}
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-950"
          >
            Korumalı rotayı aç
          </Link>
        </div>
      </section>
    </main>
  );
}
