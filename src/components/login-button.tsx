"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

type LoginButtonProps = {
  callbackUrl: string;
};

export function LoginButton({ callbackUrl }: LoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      await signIn("auth0", { callbackUrl });
    } catch {
      setErrorMessage("Giriş başlatılamadı. Lütfen yeniden deneyin.");
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={handleLogin}
        disabled={isLoading}
        className="w-full rounded-xl bg-slate-950 px-5 py-3 text-base font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-950 disabled:cursor-wait disabled:opacity-70"
      >
        {isLoading ? "Auth0'a yönlendiriliyor..." : "Auth0 ile giriş yap"}
      </button>
      {errorMessage ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
