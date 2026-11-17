import { createFileRoute, Link } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Brand } from "@/components/ccp/Logo";
import { CoachProfile } from "@/components/ccp/CoachProfile";
import { coaches } from "@/lib/mock";

export const Route = createFileRoute("/coach/")({
  head: () => ({ meta: [{ title: "My Passport — Coach Portal" }, { name: "description", content: "Your CPD, certifications, CV and E-card." }, { property: "og:title", content: "My Passport — Coach Portal" }, { property: "og:description", content: "Your CPD, certifications, CV and E-card." }] }),
  component: () => (
    <div className="min-h-screen"><header className="border-b bg-card"><div className="mx-auto flex max-w-6xl items-center justify-between p-4"><Brand /><Button variant="ghost" asChild><Link to="/"><LogOut /> Sign out</Link></Button></div></header>
      <main className="mx-auto max-w-6xl p-6"><p className="mb-4 text-sm text-muted-foreground">Welcome back 👋 — your data is kept up to date by the federation.</p><CoachProfile c={coaches[1]!} self /></main></div>
  ),
});
