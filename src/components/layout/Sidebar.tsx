"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FolderKanban,
  FileText,
  Newspaper,
  Home,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const navItems = [
  { label: "Accueil", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projets", href: "/projets", icon: FolderKanban },
  { label: "Ressources", href: "/ressources", icon: BookOpen },
  { label: "Membres", href: "/membres", icon: Users },
  { label: "Blog", href: "/blog", icon: Newspaper },
  { label: "PTA", href: "/pta", icon: FileText },
];

function NavLink({
  href,
  icon: Icon,
  label,
  active,
  onClick,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 px-3 py-[9px] rounded-[10px] text-[13.33px] font-medium transition-all duration-100",
        "focus-visible:outline-2 focus-visible:outline-[#1a3a8f] focus-visible:outline-offset-1",
        active
          ? "bg-[#eef2fb] text-[#1a3a8f]"
          : "text-[#202124] hover:bg-[#f8f7f5] hover:text-[#1a3a8f]"
      )}
    >
      <Icon
        size={17}
        aria-hidden="true"
        className={cn(
          "shrink-0 transition-colors duration-100",
          active ? "text-[#1a3a8f]" : "text-[#909090]"
        )}
      />
      <span>{label}</span>
    </Link>
  );
}

function SidebarContent({ onNavClick }: { onNavClick?: () => void }) {
  const pathname = usePathname();
  const user = useCurrentUser();
  const { signOut } = useAuthActions();

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-[#e4e4e4]">
        <Image
          src="/assets/logo-club.jpeg"
          alt="Club Entrepreneuriat ENEAM"
          width={34}
          height={34}
          className="rounded-full object-cover shrink-0"
        />
        <div className="min-w-0 leading-tight">
          <p className="text-[13px] font-bold text-[#1a3a8f] truncate">Club Entrepreneuriat</p>
          <p className="text-[11px] text-[#909090] truncate">ENEAM</p>
        </div>
      </div>

      {/* Nav */}
      <nav aria-label="Navigation principale" className="flex-1 py-3 px-2 space-y-[2px] overflow-y-auto">
        {navItems.map(({ label, href, icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <NavLink
              key={href}
              href={href}
              icon={icon}
              label={label}
              active={active}
              onClick={onNavClick}
            />
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-[#e4e4e4] space-y-3">
        {/* Profil utilisateur */}
        {user && (
          <div className="flex items-center gap-2 px-1 py-1.5 rounded-[10px] bg-[#f8f7f5]">
            <div className="w-6 h-6 rounded-full bg-[#1a3a8f] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
              {user.name ? user.name[0].toUpperCase() : user.email?.[0]?.toUpperCase() ?? "?"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium text-[#202124] truncate">
                {user.name ?? user.email}
              </p>
              {user.isAdmin && (
                <span className="inline-block text-[9px] font-bold bg-[#1a3a8f] text-white px-1.5 py-[1px] rounded-full leading-tight">
                  Admin
                </span>
              )}
            </div>
          </div>
        )}
        <Link
          href="/"
          onClick={onNavClick}
          className="flex items-center gap-2 px-1 text-[13px] text-[#909090] hover:text-[#1a3a8f] transition-colors duration-100 focus-visible:outline-2 focus-visible:outline-[#1a3a8f] focus-visible:rounded"
        >
          <Home size={14} aria-hidden="true" />
          <span>Retour au site</span>
        </Link>
        {user && (
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-1 text-[13px] text-[#909090] hover:text-[#d93025] transition-colors duration-100 focus-visible:outline-2 focus-visible:outline-[#d93025] focus-visible:rounded w-full"
          >
            <LogOut size={14} aria-hidden="true" />
            <span>Se déconnecter</span>
          </button>
        )}
        <div className="flex items-center gap-2 px-1">
          <Image
            src="/assets/logo-eneam.png"
            alt="Logo ENEAM"
            width={22}
            height={22}
            className="opacity-50 shrink-0"
          />
          <span className="text-[11px] text-[#909090] leading-[1.3]">
            École Nationale d&apos;Économie<br />Appliquée et de Management
          </span>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Ferme le drawer sur changement de route
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Empêche le scroll body quand le drawer est ouvert
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Mobile top bar ───────────────────────── */}
      <header
        className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center gap-3 px-4 h-14 bg-white border-b border-[#e4e4e4]"
        role="banner"
      >
        <button
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-sidebar"
          onClick={() => setMobileOpen((v) => !v)}
          className="p-2 rounded-[10px] text-[#202124] hover:bg-[#f8f7f5] transition-colors duration-100 focus-visible:outline-2 focus-visible:outline-[#1a3a8f]"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="flex items-center gap-2">
          <Image
            src="/assets/logo-club.jpeg"
            alt="Club Entrepreneuriat ENEAM"
            width={28}
            height={28}
            className="rounded-full object-cover"
          />
          <span className="text-[13.33px] font-bold text-[#1a3a8f]">Club Entrepreneuriat</span>
        </div>
      </header>

      {/* ── Mobile backdrop ──────────────────────── */}
      {mobileOpen && (
        <div
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
        />
      )}

      {/* ── Mobile drawer ────────────────────────── */}
      <aside
        id="mobile-sidebar"
        aria-label="Menu de navigation"
        className={cn(
          "lg:hidden fixed top-0 left-0 h-full w-[260px] z-50 bg-white border-r border-[#e4e4e4]",
          "transform transition-transform duration-200 ease-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent onNavClick={() => setMobileOpen(false)} />
      </aside>

      {/* ── Desktop sidebar ──────────────────────── */}
      <aside
        aria-label="Navigation principale"
        className="hidden lg:flex lg:flex-col fixed top-0 left-0 h-screen w-[220px] bg-white border-r border-[#e4e4e4] z-30"
      >
        <SidebarContent />
      </aside>
    </>
  );
}
