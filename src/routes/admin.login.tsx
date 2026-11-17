import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brand } from "@/components/ccp/Logo";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin Login — Coach Passport" }, { name: "description", content: "LBF administrator sign in." }, { property: "og:title", content: "Admin Login — Coach Passport" }, { property: "og:description", content: "LBF administrator sign in." }] }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="hidden bg-hero p-10 text-ink-foreground md:flex md:flex-col md:justify-between">
        <Brand light />
        <h1 className="text-7xl font-extrabold leading-[0.9]">FEDERATION<br /><span className="text-primary">CONTROL</span> ROOM</h1>
        <p className="text-sm opacity-60">Authorized LBF personnel only.</p>
      </div>
      <form className="m-auto w-full max-w-sm space-y-4 p-6" onSubmit={(e) => { e.preventDefault(); nav({ to: "/admin" }); }}>
        <div className="md:hidden"><Brand /></div>
        <h2 className="text-4xl font-bold">Admin sign in</h2>
        <p className="text-sm text-muted-foreground">Demo: any credentials work.</p>
        <div className="space-y-2"><Label>Email</Label><Input defaultValue="admin@lbf.org.lb" /></div>
        <div className="space-y-2"><Label>Password</Label><Input type="password" defaultValue="password" /></div>
        <Button className="w-full" size="lg">Sign in</Button>
      </form>
    </div>
  );
}
