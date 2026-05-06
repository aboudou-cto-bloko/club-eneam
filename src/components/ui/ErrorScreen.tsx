"use client";

import Link from "next/link";
import { AlertTriangle, WifiOff, Lock, SearchX, ServerCrash, RefreshCw } from "lucide-react";

type ErrorVariant = "notFound" | "auth" | "network" | "server" | "generic";

interface ErrorScreenProps {
  variant?: ErrorVariant;
  title?: string;
  message?: string;
  reset?: () => void;
  primaryCta?: { label: string; href?: string; onClick?: () => void };
  secondaryCta?: { label: string; href?: string; onClick?: () => void };
}

const DEFAULTS: Record<ErrorVariant, {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  message: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}> = {
  notFound: {
    icon: SearchX,
    iconBg: "bg-[#f1f5f9]",
    iconColor: "text-[#475569]",
    title: "Page introuvable",
    message: "Cette page n'existe pas ou a été déplacée.",
    primary: { label: "Retour à l'accueil", href: "/" },
    secondary: { label: "Tableau de bord", href: "/dashboard" },
  },
  auth: {
    icon: Lock,
    iconBg: "bg-[#fef3c7]",
    iconColor: "text-[#d97706]",
    title: "Accès restreint",
    message: "Tu dois être connecté pour accéder à cette page.",
    primary: { label: "Se connecter", href: "/connexion" },
    secondary: { label: "Retour à l'accueil", href: "/" },
  },
  network: {
    icon: WifiOff,
    iconBg: "bg-[#f1f5f9]",
    iconColor: "text-[#475569]",
    title: "Problème de connexion",
    message: "Impossible de joindre le serveur. Vérifie ta connexion internet.",
    primary: { label: "Réessayer", href: "#" },
    secondary: { label: "Retour à l'accueil", href: "/" },
  },
  server: {
    icon: ServerCrash,
    iconBg: "bg-[#fdf2f2]",
    iconColor: "text-[#d93025]",
    title: "Erreur serveur",
    message: "Une erreur inattendue s'est produite. Nos équipes ont été notifiées.",
    primary: { label: "Réessayer", href: "#" },
    secondary: { label: "Contacter le support", href: "mailto:faboudou.zinsou+club_entrepreneuriat_eneam@gmail.com" },
  },
  generic: {
    icon: AlertTriangle,
    iconBg: "bg-[#fef9c3]",
    iconColor: "text-[#ca8a04]",
    title: "Une erreur est survenue",
    message: "Quelque chose s'est mal passé. Réessaie ou contacte le coordinateur.",
    primary: { label: "Réessayer", href: "#" },
    secondary: { label: "Retour à l'accueil", href: "/" },
  },
};

function detectVariant(error?: Error): ErrorVariant {
  if (!error) return "generic";
  const msg = error.message.toLowerCase();
  if (msg.includes("not found") || msg.includes("404")) return "notFound";
  if (msg.includes("authentif") || msg.includes("unauthorized") || msg.includes("401") || msg.includes("403")) return "auth";
  if (msg.includes("network") || msg.includes("fetch") || msg.includes("connect")) return "network";
  if (msg.includes("500") || msg.includes("server")) return "server";
  return "generic";
}

export function ErrorScreen({
  variant,
  title,
  message,
  reset,
  primaryCta,
  secondaryCta,
}: ErrorScreenProps & { error?: Error }) {
  return <ErrorScreenInner
    variant={variant}
    title={title}
    message={message}
    reset={reset}
    primaryCta={primaryCta}
    secondaryCta={secondaryCta}
  />;
}

export function ErrorScreenInner({
  variant = "generic",
  title,
  message,
  reset,
  primaryCta,
  secondaryCta,
}: ErrorScreenProps) {
  const cfg = DEFAULTS[variant];
  const Icon = cfg.icon;
  const resolvedTitle = title ?? cfg.title;
  const resolvedMessage = message ?? cfg.message;
  const primary = primaryCta ?? cfg.primary;
  const secondary = secondaryCta ?? cfg.secondary;

  function CtaButton({ cta, primary: isPrimary }: { cta: typeof primary; primary: boolean }) {
    if (!cta) return null;

    const baseClass = isPrimary
      ? "inline-flex items-center gap-2 h-9 px-5 rounded-[25px] bg-[#1a3a8f] text-white text-[13px] font-medium hover:bg-[#152d70] transition-colors duration-100"
      : "inline-flex items-center h-9 px-5 rounded-[25px] border border-[#e4e4e4] text-[#202124] text-[13px] font-medium hover:border-[#1a3a8f] hover:text-[#1a3a8f] transition-colors duration-100";

    const onClick = "onClick" in cta ? cta.onClick : undefined;
    const href = "href" in cta ? cta.href : undefined;

    if (onClick || (reset && href === "#")) {
      return (
        <button type="button" onClick={onClick ?? reset} className={baseClass}>
          {isPrimary && href === "#" && <RefreshCw size={13} />}
          {cta.label}
        </button>
      );
    }
    if (href?.startsWith("mailto:") || href?.startsWith("http")) {
      return <a href={href} className={baseClass}>{cta.label}</a>;
    }
    return <Link href={href ?? "/"} className={baseClass}>{cta.label}</Link>;
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className={`w-16 h-16 ${cfg.iconBg} rounded-[10px] flex items-center justify-center mx-auto mb-5`}>
          <Icon size={28} className={cfg.iconColor} />
        </div>
        <h1 className="text-[20px] font-bold text-[#0f172a] mb-2">{resolvedTitle}</h1>
        <p className="text-[14px] text-[#909090] leading-[1.6] mb-7">{resolvedMessage}</p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <CtaButton cta={primary} primary />
          {secondary && <CtaButton cta={secondary} primary={false} />}
        </div>
      </div>
    </div>
  );
}

export { detectVariant };
