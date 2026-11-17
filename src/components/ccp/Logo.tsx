import logo from "@/assets/flb-logo.png.asset.json";
import { Link } from "@tanstack/react-router";
export const logoUrl = logo.url;
export function Brand({ light }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-card p-1"><img src={logo.url} alt="LBF logo" className="h-full w-full object-contain" /></span>
      <span className={"leading-none " + (light ? "text-ink-foreground" : "text-foreground")}>
        <span className="block font-display text-xl font-bold tracking-wide">COACH PASSPORT</span>
        <span className="block text-[10px] uppercase tracking-[0.25em] opacity-70">Lebanese Basketball Federation</span>
      </span>
    </Link>
  );
}
