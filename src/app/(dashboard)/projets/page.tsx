"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Plus, ExternalLink, Rocket, Trash2, X, ChevronDown } from "lucide-react";
import type { Id } from "../../../../convex/_generated/dataModel";

const STATUTS = ["Idée", "En développement", "Prototype", "Lancé"];

const statColors: Record<string, string> = {
  "En développement": "bg-blue-100 text-blue-700",
  Prototype: "bg-green-100 text-green-700",
  Idée: "bg-yellow-100 text-yellow-700",
  Lancé: "bg-purple-100 text-purple-700",
};

const inputClass =
  "w-full h-9 px-3 rounded-[4px] border border-[#e4e4e4] text-[14px] text-[#202124] placeholder:text-[#909090] bg-white outline-none transition-all duration-100 focus:border-[#1a3a8f] focus:ring-2 focus:ring-[#1a3a8f]/10";

const selectClass =
  "w-full h-9 px-3 rounded-[4px] border border-[#e4e4e4] text-[14px] text-[#202124] bg-white outline-none transition-all duration-100 focus:border-[#1a3a8f] focus:ring-2 focus:ring-[#1a3a8f]/10 cursor-pointer";

export default function ProjetsPage() {
  const user = useCurrentUser();
  const projets = useQuery(api.projets.list) ?? [];
  const createProjet = useMutation(api.projets.create);
  const removeProjet = useMutation(api.projets.remove);
  const updateStatut = useMutation(api.projets.updateStatut);

  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    nom: "", auteur: "", description: "", tags: "", statut: "Idée", lien: "",
  });

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await createProjet({
        nom: form.nom,
        auteur: form.auteur,
        description: form.description,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        statut: form.statut,
        lien: form.lien || undefined,
      });
      setForm({ nom: "", auteur: "", description: "", tags: "", statut: "Idée", lien: "" });
      setShowForm(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove(id: Id<"projets">) {
    if (!confirm("Supprimer ce projet ?")) return;
    await removeProjet({ id });
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Projets</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Les projets des membres du club
          </p>
        </div>
        {user && (
          <Button
            onClick={() => setShowForm((v) => !v)}
            className="h-8 px-3 rounded-[25px] bg-[#1a3a8f] hover:bg-[#152d70] text-white text-xs gap-1.5"
          >
            {showForm ? <X size={13} /> : <Plus size={13} />}
            {showForm ? "Annuler" : "Soumettre un projet"}
          </Button>
        )}
      </div>

      {/* Formulaire soumission (tout utilisateur connecté) */}
      {user && showForm && (
        <Card className="border-[#1a3a8f]/20 shadow-none bg-[#f8f9ff]">
          <CardContent className="pt-4 pb-5 px-5">
            <form onSubmit={handleCreate} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-medium text-[#202124] mb-1">Nom du projet</label>
                  <input className={inputClass} placeholder="Nom" value={form.nom}
                    onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#202124] mb-1">Auteur / Équipe</label>
                  <input className={inputClass} placeholder="Ton nom ou l'équipe" value={form.auteur}
                    onChange={(e) => setForm((f) => ({ ...f, auteur: e.target.value }))} required />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#202124] mb-1">Description</label>
                <textarea className={`${inputClass} h-20 pt-2 resize-none`}
                  placeholder="Décris ton projet en quelques phrases…"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-medium text-[#202124] mb-1">Tags (séparés par virgule)</label>
                  <input className={inputClass} placeholder="FinTech, Mobile, B2B" value={form.tags}
                    onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#202124] mb-1">Statut</label>
                  <select className={selectClass} value={form.statut}
                    onChange={(e) => setForm((f) => ({ ...f, statut: e.target.value }))}>
                    {STATUTS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#202124] mb-1">Lien (optionnel)</label>
                <input className={inputClass} placeholder="https://…" value={form.lien}
                  onChange={(e) => setForm((f) => ({ ...f, lien: e.target.value }))} type="url" />
              </div>
              <div className="flex justify-end">
                <button type="submit" disabled={saving}
                  className="h-8 px-4 rounded-[25px] bg-[#1a3a8f] hover:bg-[#152d70] disabled:opacity-50 text-white text-xs font-medium transition-colors">
                  {saving ? "Envoi…" : "Soumettre"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {projets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-[#e2e8f0] rounded-xl">
          <Rocket size={36} className="text-[#cbd5e1] mb-3" />
          <p className="text-sm font-medium text-[#334155]">Aucun projet pour l'instant</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs">
            Les projets des membres apparaîtront ici après le Challenge 72h.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {projets.map((p) => (
            <Card key={p._id} className="border-border shadow-none hover:shadow-sm transition-shadow">
              <CardContent className="py-4 px-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-[#0f172a]">{p.nom}</h3>
                      {user?.isAdmin ? (
                        <div className="relative inline-flex items-center gap-1">
                          <select
                            value={p.statut}
                            onChange={(e) => updateStatut({ id: p._id, statut: e.target.value })}
                            className={`text-[10px] font-medium rounded-full px-2 py-0.5 border-0 cursor-pointer appearance-none pr-5 ${statColors[p.statut] ?? "bg-gray-100 text-gray-700"}`}
                          >
                            {STATUTS.map((s) => <option key={s}>{s}</option>)}
                          </select>
                          <ChevronDown size={10} className="absolute right-1.5 pointer-events-none opacity-60" />
                        </div>
                      ) : (
                        <Badge className={`${statColors[p.statut] ?? "bg-gray-100 text-gray-700"} border-0 text-[10px]`}>
                          {p.statut}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-[#22a84a] font-medium mt-0.5">{p.auteur}</p>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{p.description}</p>
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {p.tags.map((tag) => (
                        <span key={tag} className="text-[10px] bg-[#f1f5f9] text-[#475569] px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {p.lien && (
                      <a href={p.lien} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                          <ExternalLink size={15} />
                        </Button>
                      </a>
                    )}
                    {user?.isAdmin && (
                      <button
                        onClick={() => handleRemove(p._id)}
                        className="h-8 w-8 flex items-center justify-center text-[#94a3b8] hover:text-[#d93025] transition-colors"
                        aria-label="Supprimer"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
