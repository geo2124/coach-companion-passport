import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, CheckCircle2, ScanFace } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Brand } from "@/components/ccp/Logo";

export const Route = createFileRoute("/coach/register")({
  head: () => ({ meta: [{ title: "Coach Registration — LBF Passport" }, { name: "description", content: "Register and verify your identity to get your coach passport." }, { property: "og:title", content: "Coach Registration — LBF Passport" }, { property: "og:description", content: "Register and verify your identity to get your coach passport." }] }),
  component: Register,
});

const moves = [[ArrowLeft, "Look left"], [ArrowRight, "Look right"], [ArrowUp, "Look up"], [ArrowDown, "Look down"]] as const;

function Register() {
  const [step, setStep] = useState(0);
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-muted">
      <header className="border-b bg-card"><div className="mx-auto max-w-4xl p-4"><Brand /></div></header>
      <main className="mx-auto max-w-xl space-y-6 p-6">
        <div className="flex gap-2">{["Details", "Face verification", "Done"].map((s, i) => <div key={s} className="flex-1"><div className={"h-1.5 rounded-full " + (i <= step ? "bg-primary" : "bg-border")} /><p className="mt-1 text-xs text-muted-foreground">{s}</p></div>)}</div>
        <div className="rounded-3xl border bg-card p-6 md:p-8">
          {step === 0 && <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep(1); }}>
            <h1 className="text-4xl font-bold">Create your passport</h1>
            <div className="grid gap-3 sm:grid-cols-2">{["Full name", "Phone number", "Email", "National ID", "Date of birth", "Club"].map((f) => <div key={f} className="space-y-1"><Label>{f}</Label><Input type={f === "Date of birth" ? "date" : "text"} /></div>)}</div>
            <div className="space-y-1"><Label>ID document (front)</Label><Input type="file" /></div>
            <Button className="w-full" size="lg">Continue to face verification</Button>
          </form>}
          {step === 1 && <Kyc onDone={() => setStep(2)} />}
          {step === 2 && <div className="space-y-4 py-6 text-center"><CheckCircle2 className="mx-auto h-16 w-16 text-secondary" /><h1 className="text-4xl font-bold">You're verified!</h1><p className="text-muted-foreground">The federation will review your application. Meanwhile, explore your passport.</p><Button size="lg" onClick={() => nav({ to: "/coach" })}>Go to my portal</Button></div>}
        </div>
      </main>
    </div>
  );
}

function Kyc({ onDone }: { onDone: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const [i, setI] = useState(-1);
  useEffect(() => {
    let stream: MediaStream | undefined;
    navigator.mediaDevices?.getUserMedia({ video: true }).then((s) => { stream = s; if (video.current) video.current.srcObject = s; }).catch(() => {});
    return () => stream?.getTracks().forEach((t) => t.stop());
  }, []);
  useEffect(() => { if (i < 0) return; if (i >= moves.length) { const t = setTimeout(onDone, 800); return () => clearTimeout(t); } const t = setTimeout(() => setI(i + 1), 1600); return () => clearTimeout(t); }, [i, onDone]);
  const cur = moves[Math.min(Math.max(i, 0), moves.length - 1)]!; const Icon = cur[0];
  return (
    <div className="space-y-5 text-center">
      <h1 className="text-4xl font-bold">Face verification</h1>
      <p className="text-sm text-muted-foreground">Keep your face in the oval and follow the prompts.</p>
      <div className="relative mx-auto aspect-[3/4] w-64 overflow-hidden rounded-[50%] bg-ink ring-4 ring-primary">
        <video ref={video} autoPlay muted playsInline className="h-full w-full -scale-x-100 object-cover" />
        <ScanFace className="absolute inset-0 m-auto h-20 w-20 text-ink-foreground/30" />
        {i >= 0 && i < moves.length && <div className="absolute inset-x-0 bottom-6 flex flex-col items-center text-ink-foreground"><Icon className="h-10 w-10 animate-pulse text-primary" /><b className="font-display text-2xl">{cur[1]}</b></div>}
      </div>
      <Progress value={(Math.max(0, i) / moves.length) * 100} />
      <div className="flex justify-center gap-3">{moves.map(([M, l], k) => <div key={l} className={"grid h-10 w-10 place-items-center rounded-full " + (k < i ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground")}><M className="h-4 w-4" /></div>)}</div>
      {i < 0 && <Button size="lg" onClick={() => setI(0)}>Start recording</Button>}
    </div>
  );
}
