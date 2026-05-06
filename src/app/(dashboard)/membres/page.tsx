"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Users, Trash2, ChevronDown } from "lucide-react";
import type { Id } from "../../../../convex/_generated/dataModel";

const ROLES = ["Membre", "Secrétaire", "Trésorier", "Vice-coordinateur", "Coordinateur"];

const roleColors: Record<string, string> = {
  Coordinateur: "bg-[#e8eef9] text-[#1a3a8f]",
  "Vice-coordinateur": "bg-[#e8f5ed] text-[#22a84a]",
  Secrétaire: "bg-orange-100 text-orange-700",
  Trésorier: "bg-purple-100 text-purple-700",
  Membre: "bg-gray-100 text-gray-600",
};

export default function MembresPage() {
  const user = useCurrentUser();
  const membres = useQuery(api.membres.list) ?? [];
  const updateRole = useMutation(api.membres.updateRole);
  const removeMembre = useMutation(api.membres.remove);

  async function handleRemove(id: Id<"membres">) {
    if (!confirm("Retirer ce membre ?")) return;
    await removeMembre({ id });
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Membres</h1>
          <p className="text-sm text-muted-foreground mt-1">
            L'équipe du Club Entrepreneuriat ENEAM
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users size={16} />
          <span>{membres.length} membre{membres.length > 1 ? "s" : ""}</span>
        </div>
      </div>

      {membres.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-[#e2e8f0] rounded-xl">
          <Users size={36} className="text-[#cbd5e1] mb-3" />
          <p className="text-sm font-medium text-[#334155]">Aucun profil enregistré</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs">
            Les membres apparaîtront ici après avoir complété leur profil.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {membres.map((m) => (
            <Card key={m._id} className="border-border shadow-none hover:shadow-sm transition-shadow">
              <CardContent className="py-3.5 px-5">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#1a3a8f] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {m.initiales}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-[#0f172a]">{m.nom}</p>
                      {user?.isAdmin ? (
                        <div className="relative inline-flex items-center gap-1">
                          <select
                            value={m.role}
                            onChange={(e) => updateRole({ id: m._id, role: e.target.value })}
                            className={`text-[10px] font-medium rounded-full px-2 py-0.5 border-0 cursor-pointer appearance-none pr-5 ${roleColors[m.role] ?? "bg-gray-100 text-gray-600"}`}
                          >
                            {ROLES.map((r) => <option key={r}>{r}</option>)}
                          </select>
                          <ChevronDown size={10} className="absolute right-1.5 pointer-events-none opacity-60" />
                        </div>
                      ) : (
                        <Badge className={`${roleColors[m.role] ?? "bg-gray-100 text-gray-600"} border-0 text-[10px]`}>
                          {m.role}
                        </Badge>
                      )}
                    </div>
                    {m.competences.length > 0 && (
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {m.competences.map((c) => (
                          <span key={c} className="text-[10px] bg-[#f1f5f9] text-[#475569] px-2 py-0.5 rounded-full">
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {user?.isAdmin && (
                    <button
                      onClick={() => handleRemove(m._id)}
                      className="text-[#94a3b8] hover:text-[#d93025] transition-colors shrink-0"
                      aria-label="Retirer"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
