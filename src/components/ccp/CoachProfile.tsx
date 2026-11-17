import { useState } from "react";
import { Download, Upload, Award, CalendarDays, CreditCard, Phone, Mail, MapPin, IdCard } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { type Coach, LEVEL_TARGET, nextLevel } from "@/lib/mock";
import { downloadCert, downloadECard } from "./ecard";

export function CpdRing({ c }: { c: Coach }) {
  const target = LEVEL_TARGET[c.level], pct = Math.min(100, Math.round((c.cpd / target) * 100));
  return (
    <div className="relative grid h-28 w-28 place-items-center rounded-full" style={{ background: `conic-gradient(var(--primary) ${pct}%, var(--muted) 0)` }}>
      <div className="grid h-22 w-22 place-items-center rounded-full bg-card text-center">
        <div><div className="font-display text-3xl font-bold">{c.cpd}</div><div className="text-[10px] uppercase text-muted-foreground">of {target} CPD</div></div>
      </div>
    </div>
  );
}

export function CoachProfile({ c, self }: { c: Coach; self?: boolean }) {
  const [filter, setFilter] = useState("All");
  const target = LEVEL_TARGET[c.level], next = nextLevel(c.level), left = Math.max(0, target - c.cpd);
  const events = ["All", ...Array.from(new Set(c.gallery.map((g) => g.event)))];
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl bg-passport p-6 text-ink-foreground shadow-elegant md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <img src={c.photo} alt={c.name} className="h-28 w-28 rounded-2xl object-cover ring-4 ring-ink-foreground/15" />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2"><Badge>{c.level}</Badge><Badge variant="outline" className="border-ink-foreground/30 text-ink-foreground">{c.status}</Badge></div>
            <h1 className="mt-2 text-4xl font-bold md:text-5xl">{c.name}</h1>
            <p className="text-sm opacity-70">{c.id} · {c.club} · Coaching since {c.since}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Button onClick={() => downloadECard(c).then(() => toast.success("E-card downloaded"))}><CreditCard /> Download E-card</Button>
            {self && <Button variant="secondary" onClick={() => toast.success("CV uploaded (mock)")}><Upload /> Upload CV</Button>}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex items-center gap-5 rounded-2xl border bg-card p-5 md:col-span-2">
          <CpdRing c={c} />
          <div className="flex-1 space-y-2">
            <h3 className="text-2xl font-bold">CPD Tracker</h3>
            <Progress value={(c.cpd / target) * 100} />
            <p className="text-sm text-muted-foreground">{next ? (left ? <><b className="text-primary">{left} points</b> left to be eligible for <b>{next}</b></> : <>Eligible for <b className="text-secondary">{next}</b> 🎉</>) : "Highest level reached"}</p>
          </div>
        </div>
        <div className="space-y-2 rounded-2xl border bg-card p-5 text-sm">
          <h3 className="text-2xl font-bold">ID Information</h3>
          {[[IdCard, c.nationalId], [Phone, c.phone], [Mail, c.email], [MapPin, `${c.city} · ${c.nationality}`], [CalendarDays, `Born ${c.dob}`]].map(([I, v], k) => { const Icon = I as typeof Phone; return <div key={k} className="flex items-center gap-2 text-muted-foreground"><Icon className="h-4 w-4 text-primary" />{v as string}</div>; })}
        </div>
      </div>

      <Tabs defaultValue="cv">
        <TabsList className="flex h-auto flex-wrap justify-start">
          {["cv", "certifications", "activities", "assessments", "gallery"].map((t) => <TabsTrigger key={t} value={t} className="capitalize">{t === "activities" ? "Workshops & Clinics" : t}</TabsTrigger>)}
        </TabsList>
        <TabsContent value="cv" className="space-y-3 pt-3">
          {c.cv.map((x) => <div key={x.title} className="rounded-xl border bg-card p-4"><div className="flex justify-between gap-2"><b>{x.title}</b><span className="text-xs text-muted-foreground">{x.period}</span></div><p className="text-sm text-muted-foreground">{x.detail}</p></div>)}
        </TabsContent>
        <TabsContent value="certifications" className="grid gap-3 pt-3 md:grid-cols-2">
          {c.certifications.map((x) => <div key={x.code} className="flex items-center gap-3 rounded-xl border bg-card p-4"><Award className="h-8 w-8 text-primary" /><div className="flex-1"><b>{x.name}</b><p className="text-xs text-muted-foreground">{x.code} · {x.date}</p></div><Button size="sm" variant="outline" onClick={() => downloadCert(c, x)}><Download /> PDF</Button></div>)}
        </TabsContent>
        <TabsContent value="activities" className="pt-3">
          <div className="divide-y rounded-xl border bg-card">
            {c.activities.map((a) => <div key={a.name} className="flex items-center gap-3 p-4"><Badge variant={a.type === "Clinic" ? "default" : "secondary"}>{a.type}</Badge><div className="flex-1"><b>{a.name}</b><p className="text-xs text-muted-foreground">{a.date}</p></div><span className="font-display text-2xl font-bold text-secondary">+{a.points}</span></div>)}
          </div>
        </TabsContent>
        <TabsContent value="assessments" className="grid gap-3 pt-3 md:grid-cols-3">
          {c.assessments.map((a) => <div key={a.name} className="rounded-xl border bg-card p-4"><p className="text-xs text-muted-foreground">{a.date}</p><b>{a.name}</b><div className="mt-3 flex items-end justify-between"><span className="font-display text-4xl font-bold">{a.grade}<span className="text-base text-muted-foreground">/100</span></span><Badge variant="secondary">{a.result}</Badge></div></div>)}
        </TabsContent>
        <TabsContent value="gallery" className="pt-3">
          <div className="mb-3 flex flex-wrap gap-2">{events.map((e) => <Button key={e} size="sm" variant={filter === e ? "default" : "outline"} onClick={() => setFilter(e)}>{e}</Button>)}</div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{c.gallery.filter((g) => filter === "All" || g.event === filter).map((g, k) => <figure key={k} className="overflow-hidden rounded-xl"><img src={g.img} alt={g.event} className="aspect-[3/2] w-full object-cover transition hover:scale-105" /><figcaption className="bg-card p-2 text-xs text-muted-foreground">{g.event}</figcaption></figure>)}</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
