"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { FileText, ExternalLink, BookOpen, Video, Link2, Plus, Trash2, X } from "lucide-react";
import type { Id } from "../../../../convex/_generated/dataModel";

const typeIcons: Record<string, React.ElementType> = {
  Guide: FileText,
  Vidéo: Video,
  Lien: Link2,
  Livre: BookOpen,
};

const catColors: Record<string, string> = {
  Méthodologie: "bg-blue-100 text-blue-700",
  Juridique: "bg-orange-100 text-orange-700",
  Outils: "bg-green-100 text-green-700",
  Pitch: "bg-purple-100 text-purple-700",
};

const TYPES = ["Guide", "Vidéo", "Lien", "Livre"];
const CATS = ["Méthodologie", "Juridique", "Outils", "Pitch"];

const inputClass =
  "w-full h-9 px-3 rounded-[4px] border border-[#e4e4e4] text-[14px] text-[#202124] placeholder:text-[#909090] bg-white outline-none transition-all duration-100 focus:border-[#1a3a8f] focus:ring-2 focus:ring-[#1a3a8f]/10";

const selectClass =
  "w-full h-9 px-3 rounded-[4px] border border-[#e4e4e4] text-[14px] text-[#202124] bg-white outline-none transition-all duration-100 focus:border-[#1a3a8f] focus:ring-2 focus:ring-[#1a3a8f]/10 cursor-pointer";

export default function RessourcesPage() {
  const user = useCurrentUser();
  const ressources = useQuery(api.ressources.list) ?? [];
  const createRessource = useMutation(api.ressources.create);
  const removeRessource = useMutation(api.ressources.remove);

  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ titre: "", description: "", type: "Guide", categorie: "Méthodologie", url: "" });

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await createRessource({
        titre: form.titre,
        description: form.description,
        type: form.type,
        categorie: form.categorie,
        url: form.url || undefined,
      });
      setForm({ titre: "", description: "", type: "Guide", categorie: "Méthodologie", url: "" });
      setShowForm(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove(id: Id<"ressources">) {
    if (!confirm("Supprimer cette ressource ?")) return;
    await removeRessource({ id });
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Ressources</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Guides, outils et contenus pour avancer sur ton projet
          </p>
        </div>
        {user?.isAdmin && (
          <Button
            onClick={() => setShowForm((v) => !v)}
            className="h-8 px-3 rounded-[25px] bg-[#1a3a8f] hover:bg-[#152d70] text-white text-xs gap-1.5"
          >
            {showForm ? <X size={13} /> : <Plus size={13} />}
            {showForm ? "Annuler" : "Ajouter"}
          </Button>
        )}
      </div>

      {/* Formulaire admin */}
      {user?.isAdmin && showForm && (
        <Card className="border-[#1a3a8f]/20 shadow-none bg-[#f8f9ff]">
          <CardContent className="pt-4 pb-5 px-5">
            <form onSubmit={handleCreate} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-medium text-[#202124] mb-1">Titre</label>
                  <input className={inputClass} placeholder="Titre de la ressource" value={form.titre}
                    onChange={(e) => setForm((f) => ({ ...f, titre: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#202124] mb-1">URL (optionnel)</label>
                  <input className={inputClass} placeholder="https://…" value={form.url} type="url"
                    onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#202124] mb-1">Description</label>
                <textarea className={`${inputClass} h-20 pt-2 resize-none`} placeholder="Description…"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-medium text-[#202124] mb-1">Type</label>
                  <select className={selectClass} value={form.type}
                    onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
                    {TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#202124] mb-1">Catégorie</label>
                  <select className={selectClass} value={form.categorie}
                    onChange={(e) => setForm((f) => ({ ...f, categorie: e.target.value }))}>
                    {CATS.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" disabled={saving}
                  className="h-8 px-4 rounded-[25px] bg-[#1a3a8f] hover:bg-[#152d70] disabled:opacity-50 text-white text-xs font-medium transition-colors">
                  {saving ? "Ajout…" : "Ajouter"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {ressources.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-[#e2e8f0] rounded-xl">
          <BookOpen size={36} className="text-[#cbd5e1] mb-3" />
          <p className="text-sm font-medium text-[#334155]">Aucune ressource pour l'instant</p>
          {user?.isAdmin ? (
            <p className="text-xs text-muted-foreground mt-1">
              Utilise le bouton ci-dessus pour ajouter la première ressource.
            </p>
          ) : (
            <p className="text-xs text-muted-foreground mt-1">
              Les guides et outils partagés par le club apparaîtront ici.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {ressources.map((r) => {
            const Icon = typeIcons[r.type] ?? FileText;
            return (
              <Card key={r._id} className="border-border shadow-none hover:shadow-sm transition-shadow">
                <CardContent className="py-4 px-5">
                  <div className="flex gap-4">
                    <div className="bg-[#e8eef9] rounded-lg p-2.5 h-fit shrink-0">
                      <Icon size={18} className="text-[#1a3a8f]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-[#0f172a]">{r.titre}</p>
                        <div className="flex items-center gap-2 shrink-0">
                          <Badge className={`${catColors[r.categorie] ?? "bg-gray-100 text-gray-700"} border-0 text-[10px]`}>
                            {r.categorie}
                          </Badge>
                          {user?.isAdmin && (
                            <button
                              onClick={() => handleRemove(r._id)}
                              className="text-[#94a3b8] hover:text-[#d93025] transition-colors"
                              aria-label="Supprimer"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{r.description}</p>
                      {r.url && (
                        <a href={r.url} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[#1a3a8f] font-medium mt-2 hover:underline">
                          Ouvrir <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
