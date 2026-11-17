import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, QrCode, TrendingUp, ScanFace, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Brand, logoUrl } from "@/components/ccp/Logo";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Coach Companion Passport — Lebanese Basketball Federation" },
    { name: "description", content: "The digital passport for every LBF coach: CPD tracking, certifications, assessments and a verifiable QR E-card." },
    { property: "og:title", content: "Coach Companion Passport — LBF" },
    { property: "og:description", content: "CPD tracking, certifications and verifiable QR E-cards for Lebanese basketball coaches." },
  ] }),
  component: Index,
});

const features = [
  [TrendingUp, "CPD Tracker", "See your points and exactly how many remain for the next level."],
  [Award, "Certifications", "Every LBF certificate, downloadable anytime."],
  [QrCode, "QR E-card", "A verifiable passport card in your pocket."],
  [ScanFace, "Face Verification", "Secure KYC onboarding in under a minute."],
] as const;

function Index() {
  return (
    <div>
      <section className="bg-hero text-ink-foreground">
        <header className="mx-auto flex max-w-6xl items-center justify-between p-6">
          <Brand light />
          <div className="flex gap-2"><Button variant="ghost" asChild className="text-ink-foreground"><Link to="/admin/login">Admin</Link></Button><Button asChild><Link to="/coach/register">Register</Link></Button></div>
        </header>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-24 pt-10 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Official LBF Platform</p>
            <h1 className="mt-4 text-6xl font-extrabold leading-[0.9] md:text-8xl">EVERY COACH.<br /><span className="text-primary">ONE</span> PASSPORT.</h1>
            <p className="mt-6 max-w-md opacity-75">Track your growth, prove your credentials and carry your coaching career in a single verified digital passport.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild><Link to="/coach/register">Register as a coach</Link></Button>
              <Button size="lg" variant="secondary" asChild><Link to="/coach">Coach portal</Link></Button>
            </div>
          </div>
          <div className="relative mx-auto aspect-[85.6/54] w-full max-w-md rotate-[-4deg] overflow-hidden rounded-2xl bg-passport p-6 shadow-elegant ring-1 ring-ink-foreground/10">
            <div className="absolute -right-10 -top-10 h-40 w-40 rotate-45 bg-primary" />
            <div className="flex items-center gap-3"><span className="rounded-lg bg-card p-1"><img src={logoUrl} alt="" className="h-9 w-9" /></span><div><b className="font-display text-lg">COACH COMPANION PASSPORT</b><p className="text-[9px] tracking-widest opacity-60">LEBANESE BASKETBALL FEDERATION</p></div></div>
            <div className="mt-6 flex items-end justify-between"><div><p className="font-display text-3xl font-bold">RAMI HADDAD</p><p className="text-xs opacity-60">CCP-2401 · Level 1 · 32 CPD</p></div><QrCode className="h-16 w-16 rounded-lg bg-card p-1 text-ink" /></div>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 px-6 py-20 md:grid-cols-4">
        {features.map(([I, t, d]) => <div key={t} className="rounded-2xl border bg-card p-6"><I className="h-8 w-8 text-primary" /><h3 className="mt-4 text-2xl font-bold">{t}</h3><p className="mt-1 text-sm text-muted-foreground">{d}</p></div>)}
      </section>
      <section className="mx-auto mb-20 grid max-w-6xl gap-4 px-6 md:grid-cols-2">
        <Link to="/admin/login" className="group rounded-2xl bg-ink p-8 text-ink-foreground"><Users className="h-8 w-8 text-primary" /><h3 className="mt-4 text-3xl font-bold">Federation Admin →</h3><p className="opacity-70">Manage the coaches database, levels and records.</p></Link>
        <Link to="/coach/register" className="rounded-2xl bg-secondary p-8 text-secondary-foreground"><ShieldCheck className="h-8 w-8" /><h3 className="mt-4 text-3xl font-bold">Coach Registration →</h3><p className="opacity-80">Join the system with face verification.</p></Link>
      </section>
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">© 2026 Lebanese Basketball Federation · Coach Companion Passport (design prototype)</footer>
    </div>
  );
}
