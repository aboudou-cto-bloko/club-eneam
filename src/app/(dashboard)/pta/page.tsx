import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const phases = [
  {
    num: "01",
    label: "Lancer la machine",
    color: "#f97316",
    bg: "#fff7ed",
    activites: [
      { titre: "Kick-off — Qui veut créer quoi ?", date: "17–21 mai", indicateur: "≥ 15 membres" },
      { titre: "Forum des compétences", date: "17–21 mai", indicateur: "Annuaire 100%" },
    ],
  },
  {
    num: "02",
    label: "Apprendre vite",
    color: "#1a3a8f",
    bg: "#e8eef9",
    activites: [
      { titre: "Conférence #1 — Premier lancement", date: "31 mai – 4 juin", indicateur: "≥ 30 participants" },
      { titre: "Conférence #2 — Erreurs à éviter", date: "7–11 juin", indicateur: "≥ 30 participants" },
    ],
  },
  {
    num: "03",
    label: "Faire quelque chose de concret",
    color: "#22a84a",
    bg: "#e8f5ed",
    activites: [
      { titre: "Lancement Challenge 72h", date: "14–18 juin", indicateur: "Équipes briefées" },
      { titre: "Challenge 72h actif", date: "14–25 juin", indicateur: "≥ 5 équipes" },
      { titre: "Clôture Challenge — Prototypes", date: "21–25 juin", indicateur: "≥ 5 présentations" },
    ],
  },
  {
    num: "04",
    label: "Ouvrir vers l'extérieur",
    color: "#8b5cf6",
    bg: "#f3f0ff",
    activites: [
      { titre: "Visite terrain — incubateur/entreprise", date: "28 juin – 2 juil", indicateur: "≥ 20 participants" },
    ],
  },
  {
    num: "05",
    label: "Clôturer fort",
    color: "#ef4444",
    bg: "#fef2f2",
    activites: [
      { titre: "Demo Day interne", date: "5–9 juil", indicateur: "≥ 10 projets, ≥ 3 invités ext." },
      { titre: "Bilan + Élection comité suivant", date: "Fin juil.", indicateur: "Successeurs identifiés" },
    ],
  },
];

const objectifsCT = [
  { code: "OC-1", titre: "Créer une dynamique collective", delai: "Juil. 2026" },
  { code: "OC-2", titre: "Cartographier les compétences internes", delai: "Mai 2026" },
  { code: "OC-3", titre: "Exposer à des modèles inspirants", delai: "Juil. 2026" },
  { code: "OC-4", titre: "Faire passer à l'action via le Challenge", delai: "Juil. 2026" },
  { code: "OC-5", titre: "Clôturer avec impact — Demo Day", delai: "Juil. 2026" },
];

const objectifsLT = [
  { code: "OL-1", titre: "Construire un écosystème de partenaires", delai: "Déc. 2026" },
  { code: "OL-2", titre: "Structurer un programme de mentoring", delai: "Déc. 2026" },
  { code: "OL-3", titre: "Participer à une compétition nationale", delai: "Déc. 2026" },
  { code: "OL-4", titre: "Assurer la pérennité du club", delai: "Nov. 2026" },
];

export default function PTAPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-[#0f172a]">Programme de Travail et d'Activités</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Semestre 2 · 2025/2026 — Mai à Juillet 2026
        </p>
      </div>

      {/* Vision */}
      <Card className="border-[#1a3a8f]/20 bg-[#e8eef9] shadow-none">
        <CardContent className="py-5 px-6">
          <p className="text-xs font-bold text-[#1a3a8f] uppercase tracking-wider mb-2">Vision</p>
          <p className="text-sm text-[#1e293b] leading-relaxed">
            Devenir le principal catalyseur de l'esprit entrepreneurial sur le campus de l'ENEAM,
            en formant des étudiants capables de créer de la valeur durable dans leur environnement local.
          </p>
        </CardContent>
      </Card>

      {/* Objectifs */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-[#334155] uppercase tracking-wider mb-3">
            Court terme
          </p>
          <div className="space-y-2">
            {objectifsCT.map((o) => (
              <div key={o.code} className="flex items-start gap-2.5 bg-white border border-border rounded-lg px-3 py-2.5">
                <span className="text-[10px] font-bold text-white bg-[#f97316] rounded px-1.5 py-0.5 shrink-0 mt-0.5">{o.code}</span>
                <div>
                  <p className="text-xs font-medium text-[#0f172a] leading-snug">{o.titre}</p>
                  <p className="text-[10px] text-[#22a84a] font-medium mt-0.5">{o.delai}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-[#334155] uppercase tracking-wider mb-3">
            Long terme
          </p>
          <div className="space-y-2">
            {objectifsLT.map((o) => (
              <div key={o.code} className="flex items-start gap-2.5 bg-white border border-border rounded-lg px-3 py-2.5">
                <span className="text-[10px] font-bold text-white bg-[#1a3a8f] rounded px-1.5 py-0.5 shrink-0 mt-0.5">{o.code}</span>
                <div>
                  <p className="text-xs font-medium text-[#0f172a] leading-snug">{o.titre}</p>
                  <p className="text-[10px] text-[#64748b] font-medium mt-0.5">{o.delai}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phases */}
      <div>
        <p className="text-xs font-semibold text-[#334155] uppercase tracking-wider mb-4">
          Programme en 5 phases
        </p>
        <div className="space-y-4">
          {phases.map((phase) => (
            <div key={phase.num} className="rounded-xl border border-border overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3" style={{ backgroundColor: phase.bg }}>
                <span className="text-lg font-black" style={{ color: phase.color }}>{phase.num}</span>
                <p className="text-sm font-bold" style={{ color: phase.color }}>{phase.label}</p>
              </div>
              <div className="divide-y divide-border">
                {phase.activites.map((a, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-3 bg-white">
                    <div>
                      <p className="text-xs font-medium text-[#0f172a]">{a.titre}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{a.date}</p>
                    </div>
                    <Badge className="bg-[#f1f5f9] text-[#475569] border-0 text-[10px]">
                      {a.indicateur}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
