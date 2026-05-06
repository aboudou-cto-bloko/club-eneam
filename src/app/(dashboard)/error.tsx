"use client";

import { useEffect } from "react";
import { ErrorScreenInner, detectVariant } from "@/components/ui/ErrorScreen";

export default function DashboardError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const variant = detectVariant(error);

  return (
    <ErrorScreenInner
      variant={variant}
      reset={reset}
      primaryCta={
        variant === "auth"
          ? { label: "Se connecter", href: "/connexion" }
          : { label: "Réessayer", onClick: reset }
      }
      secondaryCta={{ label: "Tableau de bord", href: "/dashboard" }}
    />
  );
}
