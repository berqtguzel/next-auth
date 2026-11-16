import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

import { LoginButton } from "@/components/login-button";
import { authOptions } from "@/lib/auth";
import { getSafeCallbackUrl } from "@/lib/safe-callback-url";

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string | string[];
    error?: string | string[];
  }>;
};

const errorMessages: Record<string, string> = {
  AccessDenied: "Giriş izni verilmedi. İsterseniz yeniden deneyebilirsiniz.",
  Configuration: "Giriş hizmeti şu anda kullanılamıyor. Lütfen daha sonra yeniden deneyin.",
  OAuthCallback: "Auth0 girişi tamamlanamadı veya iptal edildi. Lütfen yeniden deneyin.",
  OAuthSignin: "Auth0 giriş sayfası açılamadı. Lütfen yeniden deneyin.",
};

const fallbackErrorMessage = "Giriş tamamlanamadı. Lütfen yeniden deneyin.";

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const callbackUrl = getSafeCallbackUrl(params.callbackUrl);
  const session = await getServerSession(authOptions);

  if (session) {
    redirect(callbackUrl);
  }

  const errorCode = Array.isArray(params.error) ? params.error[0] : params.error;
  const errorMessage = errorCode
    ? Object.hasOwn(errorMessages, errorCode)
      ? errorMessages[errorCode]
      : fallbackErrorMessage
    : "";

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12">
      <section
        aria-labelledby="login-title"
        className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-10"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
          Güvenli erişim
        </p>
        <h1 id="login-title" className="text-3xl font-bold tracking-tight text-slate-950">
          Hesabınıza giriş yapın
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Dashboard alanına devam etmek için Auth0 hesabınızı kullanın.
        </p>

        {errorMessage ? (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-800"
          >
            {errorMessage}
          </div>
        ) : null}

        <div className="mt-8">
          <LoginButton callbackUrl={callbackUrl} />
        </div>

        <Link
          href="/"
          className="mt-7 inline-flex rounded-md text-sm font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-950"
        >
          Ana sayfaya dön
        </Link>
      </section>
    </main>
  );
}
