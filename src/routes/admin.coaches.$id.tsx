import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Brand } from "@/components/ccp/Logo";
import { CoachProfile } from "@/components/ccp/CoachProfile";
import { findCoach } from "@/lib/mock";

export const Route = createFileRoute("/admin/coaches/$id")({
  loader: ({ params }) => { const c = findCoach(params.id); if (!c) throw notFound(); return c; },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.name ?? "Coach"} — LBF Admin` }, { name: "description", content: "Coach profile, CPD and records." }, { property: "og:title", content: `${loaderData?.name ?? "Coach"} — LBF Admin` }, { property: "og:description", content: "Coach profile, CPD and records." }] }),
  component: () => { const c = Route.useLoaderData(); return (
    <div className="min-h-screen"><header className="bg-ink"><div className="mx-auto max-w-6xl p-4"><Brand light /></div></header>
      <main className="mx-auto max-w-6xl space-y-4 p-6"><Link to="/admin" className="inline-flex items-center gap-1 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" /> Back to database</Link><CoachProfile c={c} /></main></div>); },
});
