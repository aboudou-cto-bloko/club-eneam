import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Lightbulb,
  Users,
  Rocket,
  Calendar,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

const phases = [
  { num: "01", label: "Lancer", desc: "Kick-off & cartographie des compétences", date: "17–21 mai", color: "#f97316" },
  { num: "02", label: "Apprendre", desc: "2 conférences avec entrepreneurs locaux", date: "31 mai – 11 juin", color: "#1a3a8f" },
  { num: "03", label: "Faire", desc: "Challenge 72h — résoudre un problème réel", date: "14–25 juin", color: "#22a84a" },
  { num: "04", label: "Ouvrir", desc: "Visite terrain incubateur / entreprise", date: "28 juin – 2 juil", color: "#8b5cf6" },
  { num: "05", label: "Clôturer", desc: "Demo Day interne + Bilan de semestre", date: "5 – fin juil", color: "#ef4444" },
];

const valeurs = [
  { icon: Lightbulb, titre: "Innovation", desc: "Transformer les idées en solutions concrètes pour le marché local." },
  { icon: Users, titre: "Collectif", desc: "S'appuyer sur la diversité des compétences de chaque membre." },
  { icon: Rocket, titre: "Action", desc: "Passer de l'idée au prototype — vite, sans attendre la perfection." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-roboto, Roboto), Helvetica, Arial, sans-serif" }}>

      {/* ── NAV ─────────────────────────────────────── */}
      <nav
        role="navigation"
        aria-label="Navigation principale"
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#e4e4e4]"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <Image src="/assets/logo-club.jpeg" alt="Club Entrepreneuriat ENEAM" width={28} height={28} className="rounded-full shrink-0" />
            <span className="text-[13.33px] font-bold text-[#1a3a8f] truncate">Club Entrepreneuriat</span>
            <span className="hidden sm:inline text-[13px] text-[#909090] shrink-0">· ENEAM</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/dashboard"
              className="hidden sm:block text-[13.33px] text-[#909090] hover:text-[#1a3a8f] transition-colors duration-100 px-2 py-1 rounded focus-visible:outline-2 focus-visible:outline-[#1a3a8f]"
            >
              Espace membre
            </Link>
            <a
              href="https://chat.whatsapp.com/H4LORJFYBBRGVXY30OqZmB"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 h-8 px-4 rounded-[25px] bg-[#1a3a8f] text-white text-[13px] font-medium hover:bg-[#152d70] transition-colors duration-100 focus-visible:outline-2 focus-visible:outline-[#1a3a8f] focus-visible:outline-offset-2"
            >
              <MessageCircle size={14} aria-hidden="true" />
              Rejoindre
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────── */}
      <section className="pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-[13px] font-medium text-[#1a3a8f] bg-[#eef2fb] px-3 py-1 rounded-[25px] mb-5">
            Semestre 2 · 2025/2026
          </span>
          <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-[#202124] leading-[1.2] tracking-[-0.02em]">
            Transforme ton idée<br />
            <span className="text-[#1a3a8f]">en projet concret.</span>
          </h1>
          <p className="mt-5 text-[16px] text-[#909090] leading-[1.6] max-w-lg mx-auto">
            Le Club Entrepreneuriat de l&apos;ENEAM t&apos;accompagne pour passer de l&apos;idée à l&apos;action —
            avec des pairs, des mentors et un programme en 5 phases.
          </p>
          <div className="mt-7 flex items-center justify-center gap-3 flex-wrap">
            <a
              href="https://chat.whatsapp.com/H4LORJFYBBRGVXY30OqZmB"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-7 rounded-[25px] bg-[#1a3a8f] text-white text-[14px] font-medium hover:bg-[#152d70] transition-colors duration-100 focus-visible:outline-2 focus-visible:outline-[#1a3a8f] focus-visible:outline-offset-2"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Rejoindre le groupe
            </a>
            <Link
              href="/pta"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-[25px] border border-[#e4e4e4] text-[#202124] text-[14px] font-medium hover:border-[#1a3a8f] hover:text-[#1a3a8f] transition-colors duration-100 focus-visible:outline-2 focus-visible:outline-[#1a3a8f] focus-visible:outline-offset-2"
            >
              Voir le programme
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center gap-5 flex-wrap text-[13px] text-[#909090]">
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="text-[#22a84a]" aria-hidden="true" />
              <span>Mai – Juillet 2026</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={13} className="text-[#22a84a]" aria-hidden="true" />
              <span>Ouvert à tous les étudiants ENEAM</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALEURS ─────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 bg-[#f8f7f5]" aria-label="Nos valeurs">
        <div className="max-w-3xl mx-auto">
          <p className="text-[13px] font-medium text-[#909090] uppercase tracking-[0.08em] text-center mb-8">
            Ce qu&apos;on construit ensemble
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {valeurs.map(({ icon: Icon, titre, desc }) => (
              <div key={titre} className="bg-white rounded-[10px] border border-[#e4e4e4] p-5 text-center">
                <div className="w-10 h-10 rounded-[10px] bg-[#eef2fb] flex items-center justify-center mx-auto mb-3">
                  <Icon size={20} className="text-[#1a3a8f]" aria-hidden="true" />
                </div>
                <h3 className="text-[14px] font-bold text-[#202124] mb-1.5">{titre}</h3>
                <p className="text-[13px] text-[#909090] leading-[1.5]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMME ───────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6" aria-label="Programme d'activités">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[13px] font-medium text-[#909090] uppercase tracking-[0.08em] mb-2">
              Programme du semestre
            </p>
            <h2 className="text-[24px] font-bold text-[#202124]">5 phases. 10 activités.</h2>
            <p className="text-[14px] text-[#909090] mt-1.5">
              Un parcours progressif de la découverte au pitch.
            </p>
          </div>
          <ol className="space-y-2" aria-label="Les 5 phases du programme">
            {phases.map((p) => (
              <li
                key={p.num}
                className="flex items-center gap-4 bg-white border border-[#e4e4e4] rounded-[10px] px-4 sm:px-5 py-3.5 hover:border-[#1a3a8f]/40 hover:shadow-[0_1px_4px_rgba(26,58,143,0.08)] transition-all duration-100"
              >
                <span className="text-[20px] font-black w-7 shrink-0 leading-none" style={{ color: p.color }} aria-hidden="true">
                  {p.num}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-[#202124]">{p.label}</p>
                  <p className="text-[13px] text-[#909090] mt-0.5 truncate">{p.desc}</p>
                </div>
                <span className="text-[13px] text-[#22a84a] font-medium shrink-0 hidden sm:block">{p.date}</span>
              </li>
            ))}
          </ol>
          <div className="text-center mt-6">
            <Link
              href="/pta"
              className="inline-flex items-center gap-2 h-9 px-5 rounded-[25px] border border-[#1a3a8f] text-[#1a3a8f] text-[13.33px] font-medium hover:bg-[#eef2fb] transition-colors duration-100 focus-visible:outline-2 focus-visible:outline-[#1a3a8f] focus-visible:outline-offset-2"
            >
              Voir le PTA complet
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ───────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#1a3a8f]" aria-label="Rejoindre le club">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-[24px] sm:text-[28px] font-bold text-white leading-[1.25]">
            Prêt à rejoindre l&apos;aventure ?
          </h2>
          <p className="text-[#93c5fd] text-[14px] mt-3 leading-[1.6]">
            Rejoins le groupe WhatsApp du club pour ne rien rater des activités
            et rencontrer tes futurs co-fondateurs.
          </p>
          <a
            href="https://chat.whatsapp.com/H4LORJFYBBRGVXY30OqZmB"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-7 h-11 px-8 rounded-[25px] bg-[#22a84a] text-white text-[14px] font-medium hover:bg-[#1b8f3e] transition-colors duration-100 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Rejoindre sur WhatsApp
          </a>
          <p className="mt-5 text-[13px] text-[#93c5fd]">
            Une question ?{" "}
            <a
              href="mailto:faboudou.zinsou+club_entrepreneuriat_eneam@gmail.com"
              className="underline hover:text-white transition-colors duration-100 focus-visible:outline-2 focus-visible:outline-white focus-visible:rounded"
            >
              Contacter le coordinateur
            </a>
          </p>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer role="contentinfo" className="py-6 px-4 sm:px-6 border-t border-[#e4e4e4]">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Image src="/assets/logo-club.jpeg" alt="Logo Club Entrepreneuriat" width={22} height={22} className="rounded-full" />
            <span className="text-[13px] text-[#909090]">Club Entrepreneuriat · ENEAM · 2025/2026</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/assets/logo-eneam.png" alt="Logo ENEAM" width={18} height={18} className="opacity-50" />
            <span className="text-[13px] text-[#909090]">École Nationale d&apos;Économie Appliquée et de Management</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
