"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type Mode = "signIn" | "signUp";

export function SignInForm() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signIn");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const data = new FormData(e.currentTarget);

    try {
      await signIn("password", {
        email: data.get("email") as string,
        password: data.get("password") as string,
        flow: mode,
      });
      router.push("/dashboard");
    } catch {
      setError(
        mode === "signIn"
          ? "Email ou mot de passe incorrect."
          : "Erreur lors de la création du compte. Essaie à nouveau."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full h-9 px-3 rounded-[4px] border border-[#e4e4e4] text-[14px] text-[#202124] placeholder:text-[#909090] bg-white outline-none transition-all duration-100 focus:border-[#1a3a8f] focus:ring-2 focus:ring-[#1a3a8f]/10";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-[13px] font-medium text-[#202124]">
          Adresse email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="ton.prenom@eneam.bj"
          className={inputClass}
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-[13px] font-medium text-[#202124]">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete={mode === "signIn" ? "current-password" : "new-password"}
          placeholder="••••••••"
          minLength={8}
          className={inputClass}
        />
      </div>

      {error && (
        <p role="alert" className="text-[13px] text-[#d93025] bg-[#fdf2f2] px-3 py-2 rounded-[4px] border border-[#fca5a5]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        className="w-full h-9 rounded-[25px] bg-[#1a3a8f] text-white text-[14px] font-medium hover:bg-[#152d70] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-100 focus-visible:outline-2 focus-visible:outline-[#1a3a8f] focus-visible:outline-offset-2 flex items-center justify-center gap-2"
      >
        {loading ? (
          <Loader2 size={15} className="animate-spin" aria-label="Chargement…" />
        ) : mode === "signIn" ? (
          "Se connecter"
        ) : (
          "Créer mon compte"
        )}
      </button>

      <p className="text-center text-[13px] text-[#909090]">
        {mode === "signIn" ? "Pas encore de compte ?" : "Déjà inscrit ?"}{" "}
        <button
          type="button"
          onClick={() => { setMode(mode === "signIn" ? "signUp" : "signIn"); setError(null); }}
          className="text-[#1a3a8f] font-medium hover:underline focus-visible:outline-2 focus-visible:outline-[#1a3a8f] focus-visible:rounded"
        >
          {mode === "signIn" ? "S'inscrire" : "Se connecter"}
        </button>
      </p>

      <p className="text-center text-[12px] text-[#909090]">
        Réservé aux étudiants ENEAM.{" "}
        <a
          href="mailto:faboudou.zinsou+club_entrepreneuriat_eneam@gmail.com"
          className="text-[#1a3a8f] hover:underline focus-visible:outline-2 focus-visible:outline-[#1a3a8f] focus-visible:rounded"
        >
          Contacter le coordinateur
        </a>
      </p>
    </form>
  );
}
