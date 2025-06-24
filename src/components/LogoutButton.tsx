"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ redirect: false });

    const auth0Domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN!;
    const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!;
    const returnTo = process.env.NEXT_PUBLIC_AUTH0_RETURN_TO!;

    window.location.href = `${auth0Domain}/v2/logout?client_id=${clientId}&returnTo=${encodeURIComponent(returnTo)}`;
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