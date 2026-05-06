import Image from "next/image";
import Link from "next/link";
import { SignInForm } from "@/components/auth/SignInForm";
import { ArrowLeft } from "lucide-react";

export default function ConnexionPage() {
  return (
    <div className="min-h-screen bg-[#f8f7f5] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[360px]">
        <div className="flex flex-col items-center mb-7">
          <Image
            src="/assets/logo-club.jpeg"
            alt="Club Entrepreneuriat ENEAM"
            width={52}
            height={52}
            className="rounded-full mb-3.5"
          />
          <h1 className="text-[18px] font-bold text-[#202124]">Club Entrepreneuriat</h1>
          <p className="text-[13px] text-[#909090] mt-0.5">ENEAM · Espace membres</p>
        </div>

        <div className="bg-white rounded-[10px] border border-[#e4e4e4] shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-6">
          <h2 className="text-[16px] font-bold text-[#202124] mb-1">Connexion</h2>
          <p className="text-[13px] text-[#909090] mb-5">
            Accède au dashboard, aux projets et aux ressources du club.
          </p>
          <SignInForm />
        </div>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[13px] text-[#909090] hover:text-[#1a3a8f] transition-colors duration-100 focus-visible:outline-2 focus-visible:outline-[#1a3a8f] focus-visible:rounded"
          >
            <ArrowLeft size={13} aria-hidden="true" />
            Retour au site
          </Link>
        </div>
      </div>
    </div>
  );
}
