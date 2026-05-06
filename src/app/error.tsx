"use client";

import { useEffect } from "react";
import { ErrorScreenInner, detectVariant } from "@/components/ui/ErrorScreen";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorScreenInner
      variant={detectVariant(error)}
      reset={reset}
      primaryCta={{ label: "Réessayer", onClick: reset }}
      secondaryCta={{ label: "Retour à l'accueil", href: "/" }}
    />
  );
}
