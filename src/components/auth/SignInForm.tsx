"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { Loader2 } from "lucide-react";

type Mode = "signIn" | "signUp";

const FILIERES = ["IG", "GTL", "GBA", "PLAN", "GFC", "GRH"];

const ANNEES = ["Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2", "Doctorat"];

const inputClass =
  "w-full h-9 px-3 rounded-[4px] border border-[#e4e4e4] text-[14px] text-[#202124] placeholder:text-[#909090] bg-white outline-none transition-all duration-100 focus:border-[#1a3a8f] focus:ring-2 focus:ring-[#1a3a8f]/10";

const selectClass =
  "w-full h-9 px-3 rounded-[4px] border border-[#e4e4e4] text-[14px] text-[#202124] bg-white outline-none transition-all duration-100 focus:border-[#1a3a8f] focus:ring-2 focus:ring-[#1a3a8f]/10 cursor-pointer";

export function SignInForm() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const createProfile = useMutation(api.membres.createProfile);

  const [mode, setMode] = useState<Mode>("signIn");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
  }

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

      if (mode === "signUp") {
        const nom = (data.get("nom") as string).trim();
        const prenoms = (data.get("prenoms") as string).trim();
        const initiales = [prenoms[0], nom[0]].filter(Boolean).join("").toUpperCase() || "?";
        await createProfile({
          nom,
          prenoms,
          filiere: data.get("filiere") as string,
          annee: data.get("annee") as string,
          role: "Membre",
          competences: [],
          initiales,
        });
      }

      router.push("/dashboard");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (mode === "signIn") {
        setError("Email ou mot de passe incorrect.");
      } else if (msg.toLowerCase().includes("already") || msg.toLowerCase().includes("existe")) {
        setError("Un compte existe déjà avec cet email.");
      } else {
        setError("Erreur lors de la création du compte. Réessaie.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>

      {/* Champs spécifiques à l'inscription */}
      {mode === "signUp" && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="prenoms" className="block text-[13px] font-medium text-[#202124]">
                Prénoms
              </label>
              <input
                id="prenoms" name="prenoms" type="text" required autoComplete="given-name"
                placeholder="Marie Chloé"
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="nom" className="block text-[13px] font-medium text-[#202124]">
                Nom de famille
              </label>
              <input
                id="nom" name="nom" type="text" required autoComplete="family-name"
                placeholder="AHOUANSOU"
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="filiere" className="block text-[13px] font-medium text-[#202124]">
              Filière
            </label>
            <select id="filiere" name="filiere" required className={selectClass} defaultValue="">
              <option value="" disabled>Choisir une filière…</option>
              {FILIERES.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="annee" className="block text-[13px] font-medium text-[#202124]">
              Année d'études
            </label>
            <select id="annee" name="annee" required className={selectClass} defaultValue="">
              <option value="" disabled>Choisir une année…</option>
              {ANNEES.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <hr className="border-[#e4e4e4]" />
        </>
      )}

      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-[13px] font-medium text-[#202124]">
          Adresse email
        </label>
        <input
          id="email" name="email" type="email" required autoComplete="email"
          placeholder="ton.prenom@eneam.bj"
          className={inputClass}
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-[13px] font-medium text-[#202124]">
          Mot de passe
        </label>
        <input
          id="password" name="password" type="password" required
          autoComplete={mode === "signIn" ? "current-password" : "new-password"}
          placeholder="••••••••"
          minLength={8}
          className={inputClass}
        />
        {mode === "signUp" && (
          <p className="text-[11px] text-[#909090]">8 caractères minimum</p>
        )}
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
          onClick={() => switchMode(mode === "signIn" ? "signUp" : "signIn")}
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
