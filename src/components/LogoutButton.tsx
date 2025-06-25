"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });

      const auth0Domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
      const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
      const returnTo =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : process.env.NEXT_PUBLIC_AUTH0_RETURN_TO;

      if (!auth0Domain || !clientId || !returnTo) {
        console.error("Missing Auth0 logout config");
        return;
      }

      const logoutUrl = `${auth0Domain}/v2/logout?client_id=${clientId}&returnTo=${encodeURIComponent(returnTo)}`;
      window.location.href = logoutUrl;
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow hover:from-pink-500 hover:to-red-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
    >
      Çıkış Yap
    </button>
  );
}
