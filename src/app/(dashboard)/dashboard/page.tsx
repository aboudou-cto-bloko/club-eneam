"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Calendar, Megaphone, Rocket, Users, Bell, Plus, Trash2, X } from "lucide-react";
import type { Id } from "../../../../convex/_generated/dataModel";

const typeConfig: Record<string, { icon: React.ElementType; iconColor: string; bg: string }> = {
  Événement: { icon: Calendar, iconColor: "text-[#1a3a8f]", bg: "bg-[#e8eef9]" },
  Conférence: { icon: Megaphone, iconColor: "text-[#1a3a8f]", bg: "bg-[#e8eef9]" },
  Challenge: { icon: Rocket, iconColor: "text-[#22a84a]", bg: "bg-[#e8f5ed]" },
  Outil: { icon: Users, iconColor: "text-[#22a84a]", bg: "bg-[#e8f5ed]" },
};

const TYPES = ["Événement", "Conférence", "Challenge", "Outil"];
const BADGES = ["Nouveau", "Important", "Info", "Urgent"];

const inputClass =
  "w-full h-9 px-3 rounded-[4px] border border-[#e4e4e4] text-[14px] text-[#202124] placeholder:text-[#909090] bg-white outline-none transition-all duration-100 focus:border-[#1a3a8f] focus:ring-2 focus:ring-[#1a3a8f]/10";

const selectClass =
  "w-full h-9 px-3 rounded-[4px] border border-[#e4e4e4] text-[14px] text-[#202124] bg-white outline-none transition-all duration-100 focus:border-[#1a3a8f] focus:ring-2 focus:ring-[#1a3a8f]/10 cursor-pointer";

export default function DashboardPage() {
  const user = useCurrentUser();
  const annonces = useQuery(api.annonces.list) ?? [];
  const projets = useQuery(api.projets.list) ?? [];
  const membres = useQuery(api.membres.list) ?? [];
  const createAnnonce = useMutation(api.annonces.create);
  const removeAnnonce = useMutation(api.annonces.remove);

  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ titre: "", contenu: "", date: "", type: "Événement", badge: "Nouveau" });

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await createAnnonce(form);
      setForm({ titre: "", contenu: "", date: "", type: "Événement", badge: "Nouveau" });
      setShowForm(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove(id: Id<"annonces">) {
    if (!confirm("Supprimer cette annonce ?")) return;
    await removeAnnonce({ id });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0f172a]">Tableau de bord</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Semestre 2 · 2025/2026 — Club Entrepreneuriat ENEAM
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Membres", value: membres.length || "—", icon: Users, color: "#1a3a8f" },
          { label: "Projets", value: projets.length || "0", icon: Rocket, color: "#22a84a" },
          { label: "Activités planifiées", value: "10", icon: Calendar, color: "#f59e0b" },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-border shadow-none">
            <CardContent className="pt-5 pb-4 px-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold" style={{ color }}>{String(value)}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                </div>
                <Icon size={22} style={{ color }} className="opacity-60" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feed annonces */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-[#334155] uppercase tracking-wider">
            Annonces & Activités
          </h2>
          {user?.isAdmin && (
            <Button
              onClick={() => setShowForm((v) => !v)}
              className="h-8 px-3 rounded-[25px] bg-[#1a3a8f] hover:bg-[#152d70] text-white text-xs gap-1.5"
            >
              {showForm ? <X size={13} /> : <Plus size={13} />}
              {showForm ? "Annuler" : "Nouvelle annonce"}
            </Button>
          )}
        </div>

        {/* Formulaire admin */}
        {user?.isAdmin && showForm && (
          <Card className="border-[#1a3a8f]/20 shadow-none mb-4 bg-[#f8f9ff]">
            <CardContent className="pt-4 pb-5 px-5">
              <form onSubmit={handleCreate} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-medium text-[#202124] mb-1">Titre</label>
                    <input
                      className={inputClass}
                      placeholder="Titre de l'annonce"
                      value={form.titre}
                      onChange={(e) => setForm((f) => ({ ...f, titre: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-[#202124] mb-1">Date</label>
                    <input
                      className={inputClass}
                      placeholder="ex : 24 mai 2026"
                      value={form.date}
                      onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#202124] mb-1">Contenu</label>
                  <textarea
                    className={`${inputClass} h-20 pt-2 resize-none`}
                    placeholder="Description de l'annonce…"
                    value={form.contenu}
                    onChange={(e) => setForm((f) => ({ ...f, contenu: e.target.value }))}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-medium text-[#202124] mb-1">Type</label>
                    <select
                      className={selectClass}
                      value={form.type}
                      onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                    >
                      {TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-[#202124] mb-1">Badge</label>
                    <select
                      className={selectClass}
                      value={form.badge}
                      onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))}
                    >
                      {BADGES.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="h-8 px-4 rounded-[25px] bg-[#1a3a8f] hover:bg-[#152d70] disabled:opacity-50 text-white text-xs font-medium transition-colors"
                  >
                    {saving ? "Publication…" : "Publier"}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {annonces.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-[#e2e8f0] rounded-xl">
            <Bell size={32} className="text-[#cbd5e1] mb-3" />
            <p className="text-sm font-medium text-[#334155]">Aucune annonce pour l'instant</p>
            {user?.isAdmin && (
              <p className="text-xs text-muted-foreground mt-1">
                Utilise le bouton ci-dessus pour publier la première annonce.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {annonces.map((a) => {
              const cfg = typeConfig[a.type] ?? { icon: Bell, iconColor: "text-[#94a3b8]", bg: "bg-[#f1f5f9]" };
              const Icon = cfg.icon;
              return (
                <Card key={a._id} className="border-border shadow-none hover:shadow-sm transition-shadow">
                  <CardContent className="py-4 px-5">
                    <div className="flex gap-4">
                      <div className={`${cfg.bg} rounded-lg p-2.5 h-fit shrink-0`}>
                        <Icon size={18} className={cfg.iconColor} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-[#0f172a] leading-snug">{a.titre}</p>
                          <div className="flex items-center gap-2 shrink-0">
                            <Badge className="bg-[#f1f5f9] text-[#475569] border-0 text-[10px]">
                              {a.badge}
                            </Badge>
                            {user?.isAdmin && (
                              <button
                                onClick={() => handleRemove(a._id)}
                                className="text-[#94a3b8] hover:text-[#d93025] transition-colors"
                                aria-label="Supprimer"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-[#22a84a] font-medium mt-0.5">{a.date}</p>
                        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{a.contenu}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
