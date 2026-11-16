import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/logout-button";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const displayName = session.user?.name || session.user?.email || "Kullanıcı";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-5 py-12 sm:px-8">
      <section
        aria-labelledby="dashboard-title"
        className="w-full rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-10"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Oturum açık
        </p>
        <h1
          id="dashboard-title"
          className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
        >
          Hoş geldiniz, {displayName}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          Bu sayfa middleware ve sunucu tarafı oturum kontrolüyle korunuyor.
        </p>
        <div className="mt-8 border-t border-slate-200 pt-6">
          <LogoutButton />
        </div>
      </section>
    </main>
  );
}
