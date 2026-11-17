import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2, LogOut, Users, TrendingUp, Clock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Brand } from "@/components/ccp/Logo";
import { coaches as seed, LEVELS, LEVEL_TARGET, type Coach, type Level } from "@/lib/mock";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Coaches Database — LBF Admin" }, { name: "description", content: "Manage all registered LBF coaches." }, { property: "og:title", content: "Coaches Database — LBF Admin" }, { property: "og:description", content: "Manage all registered LBF coaches." }] }),
  component: Admin,
});

function Admin() {
  const [list, setList] = useState<Coach[]>(seed);
  const [q, setQ] = useState(""), [lvl, setLvl] = useState("all");
  const [edit, setEdit] = useState<Partial<Coach> | null>(null);
  const rows = useMemo(() => list.filter((c) => (lvl === "all" || c.level === lvl) && (c.name.toLowerCase().includes(q.toLowerCase()) || c.phone.replace(/\s/g, "").includes(q.replace(/\s/g, "")))), [list, q, lvl]);
  const save = () => {
    if (!edit?.name) { toast.error("Name required"); return; }
    if (edit.id && list.some((c) => c.id === edit.id)) setList(list.map((c) => (c.id === edit.id ? { ...c, ...edit } as Coach : c)));
    else setList([{ ...seed[0], ...edit, id: `CCP-${3000 + list.length}`, cpd: 0, status: "Pending" } as Coach, ...list]);
    toast.success("Coach saved"); setEdit(null);
  };
  return (
    <div className="min-h-screen">
      <header className="bg-ink text-ink-foreground"><div className="mx-auto flex max-w-7xl items-center justify-between p-4"><Brand light /><Button variant="ghost" asChild className="text-ink-foreground"><Link to="/admin/login"><LogOut /> Sign out</Link></Button></div></header>
      <main className="mx-auto max-w-7xl space-y-6 p-6">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs uppercase tracking-widest text-primary">Admin</p><h1 className="text-5xl font-bold">Coaches Database</h1></div><Button size="lg" onClick={() => setEdit({ level: "Level 1" })}><Plus /> New coach</Button></div>
        <div className="grid gap-4 md:grid-cols-4">
          {[[Users, "Total coaches", list.length], [TrendingUp, "Avg CPD", Math.round(list.reduce((a, c) => a + c.cpd, 0) / list.length)], [Clock, "Pending KYC", list.filter((c) => c.status === "Pending").length], [Users, "Level 4", list.filter((c) => c.level === "Level 4").length]].map(([I, l, v]) => { const Icon = I as typeof Users; return <div key={l as string} className="rounded-2xl border bg-card p-5"><Icon className="h-5 w-5 text-primary" /><p className="mt-2 font-display text-4xl font-bold">{v as number}</p><p className="text-sm text-muted-foreground">{l as string}</p></div>; })}
        </div>
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input className="pl-9" placeholder="Search by name or phone number…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
          <Select value={lvl} onValueChange={setLvl}><SelectTrigger className="md:w-48"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All levels</SelectItem>{LEVELS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent></Select>
        </div>
        <div className="overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left text-xs uppercase text-muted-foreground"><tr>{["Coach", "Phone", "Level", "Club", "CPD", "Status", ""].map((h) => <th key={h} className="p-3">{h}</th>)}</tr></thead>
            <tbody>{rows.map((c) => (
              <tr key={c.id} className="border-t hover:bg-muted/50">
                <td className="p-3"><Link to="/admin/coaches/$id" params={{ id: c.id }} className="flex items-center gap-3"><img src={c.photo} alt="" className="h-9 w-9 rounded-full object-cover" /><div><b>{c.name}</b><p className="text-xs text-muted-foreground">{c.id}</p></div></Link></td>
                <td className="p-3">{c.phone}</td><td className="p-3"><Badge variant="outline">{c.level}</Badge></td><td className="p-3">{c.club}</td>
                <td className="p-3 font-semibold">{c.cpd}<span className="text-muted-foreground">/{LEVEL_TARGET[c.level]}</span></td>
                <td className="p-3"><Badge variant={c.status === "Active" ? "secondary" : "default"}>{c.status}</Badge></td>
                <td className="p-3 text-right"><Button size="icon" variant="ghost" onClick={() => setEdit(c)}><Pencil /></Button><Button size="icon" variant="ghost" onClick={() => { setList(list.filter((x) => x.id !== c.id)); toast("Coach deleted"); }}><Trash2 className="text-destructive" /></Button></td>
              </tr>))}
              {!rows.length && <tr><td colSpan={7} className="p-10 text-center text-muted-foreground">No coaches match your search.</td></tr>}
            </tbody>
          </table>
        </div>
      </main>
      <Dialog open={!!edit} onOpenChange={(o) => !o && setEdit(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle className="font-display text-3xl">{edit?.id ? "Edit coach" : "New coach"}</DialogTitle></DialogHeader>
          <div className="grid gap-3 sm:grid-cols-2">
            {(["name", "phone", "email", "club", "nationalId", "city"] as const).map((f) => <div key={f} className="space-y-1"><Label className="capitalize">{f === "nationalId" ? "National ID" : f}</Label><Input value={(edit?.[f] as string) ?? ""} onChange={(e) => setEdit({ ...edit, [f]: e.target.value })} /></div>)}
            <div className="space-y-1"><Label>Level</Label><Select value={edit?.level ?? "Level 1"} onValueChange={(v) => setEdit({ ...edit, level: v as Level })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{LEVELS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent></Select></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setEdit(null)}>Cancel</Button><Button onClick={save}>Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
