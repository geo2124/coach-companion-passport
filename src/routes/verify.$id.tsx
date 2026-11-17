import { createFileRoute, notFound } from "@tanstack/react-router";
import { BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { logoUrl } from "@/components/ccp/Logo";
import { CpdRing } from "@/components/ccp/CoachProfile";
import { findCoach, LEVEL_TARGET, nextLevel } from "@/lib/mock";

export const Route = createFileRoute("/verify/$id")({
  loader: ({ params }) => { const c = findCoach(params.id); if (!c) throw notFound(); return c; },
  head: () => ({ meta: [{ title: "Verified Coach — LBF Passport" }, { name: "description", content: "Official LBF coach verification." }, { property: "og:title", content: "Verified Coach — LBF Passport" }, { property: "og:description", content: "Official LBF coach verification." }] }),
  component: Verify,
});

function Verify() {
  const c = Route.useLoaderData(); const last = c.assessments[0]!;
  return (
    <div className="min-h-screen bg-hero p-4 text-ink-foreground">
      <div className="mx-auto max-w-md space-y-4 py-6">
        <div className="flex items-center gap-3"><span className="rounded-lg bg-card p-1"><img src={logoUrl} alt="LBF" className="h-9 w-9" /></span><b className="font-display text-xl">LBF COACH VERIFICATION</b></div>
        <div className="rounded-3xl bg-card p-6 text-card-foreground shadow-elegant">
          <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground w-fit"><BadgeCheck className="h-4 w-4" /> Verified & Active</div>
          <div className="mt-5 flex items-center gap-4"><img src={c.photo} alt="" className="h-20 w-20 rounded-2xl object-cover" /><div><h1 className="text-3xl font-bold">{c.name}</h1><p className="text-sm text-muted-foreground">{c.id} · {c.club}</p><Badge className="mt-1">{c.level}</Badge></div></div>
          <div className="mt-6 flex items-center gap-5"><CpdRing c={c} /><div className="text-sm"><p className="font-semibold">CPD {c.cpd} / {LEVEL_TARGET[c.level]}</p><p className="text-muted-foreground">{nextLevel(c.level) ? `${Math.max(0, LEVEL_TARGET[c.level] - c.cpd)} pts to ${nextLevel(c.level)}` : "Top level"}</p></div></div>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-muted p-3"><p className="text-xs text-muted-foreground">Certifications</p><b className="font-display text-2xl">{c.certifications.length}</b></div>
            <div className="rounded-xl bg-muted p-3"><p className="text-xs text-muted-foreground">Latest assessment</p><b className="font-display text-2xl">{last.grade}/100</b> <span className="text-xs">{last.result}</span></div>
          </div>
        </div>
        <p className="text-center text-xs opacity-60">Scanned {new Date().toLocaleDateString()} · Lebanese Basketball Federation</p>
      </div>
    </div>
  );
}
