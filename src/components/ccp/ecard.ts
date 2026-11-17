import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import type { Coach } from "@/lib/mock";
import { LEVEL_TARGET } from "@/lib/mock";
import { logoUrl } from "./Logo";

const toData = (url: string) => fetch(url).then((r) => r.blob()).then((b) => new Promise<string>((res) => { const f = new FileReader(); f.onload = () => res(f.result as string); f.readAsDataURL(b); }));

export async function downloadECard(c: Coach) {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: [54, 85.6] });
  const qr = await QRCode.toDataURL(`${window.location.origin}/verify/${c.id}`, { margin: 0, width: 400, color: { dark: "#111827", light: "#ffffff" } });
  const [logo, photo] = await Promise.all([toData(logoUrl).catch(() => ""), toData(c.photo).catch(() => "")]);
  // Front background
  doc.setFillColor(22, 26, 38); doc.rect(0, 0, 85.6, 54, "F");
  doc.setFillColor(225, 50, 60); doc.triangle(55, 0, 85.6, 0, 85.6, 30, "F");
  doc.setFillColor(0, 135, 75); doc.triangle(85.6, 30, 85.6, 54, 70, 54, "F");
  doc.setFillColor(255, 255, 255); doc.roundedRect(4, 4, 11, 11, 1.5, 1.5, "F");
  if (logo) doc.addImage(logo, "PNG", 4.5, 4.5, 10, 10);
  doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(8.5);
  doc.text("COACH COMPANION PASSPORT", 17.5, 8.6);
  doc.setFont("helvetica", "normal"); doc.setFontSize(5); doc.setTextColor(190, 195, 205);
  doc.text("LEBANESE BASKETBALL FEDERATION", 17.5, 12);
  if (photo) { doc.setFillColor(255, 255, 255); doc.roundedRect(4, 19, 20, 24, 1.5, 1.5, "F"); doc.addImage(photo, "JPEG", 4.6, 19.6, 18.8, 22.8); }
  doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.text(c.name.toUpperCase(), 27, 23.5);
  doc.setFontSize(5); doc.setFont("helvetica", "normal"); doc.setTextColor(160, 165, 180);
  const rows: [string, string][] = [["PASSPORT ID", c.id], ["LEVEL", c.level], ["CLUB", c.club], ["CPD", `${c.cpd} / ${LEVEL_TARGET[c.level]} pts`]];
  rows.forEach(([k, v], i) => { const x = 27 + (i % 2) * 18, y = 29 + Math.floor(i / 2) * 7; doc.setTextColor(160, 165, 180); doc.text(k, x, y); doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(6.5); doc.text(v, x, y + 3); doc.setFont("helvetica", "normal"); doc.setFontSize(5); });
  doc.setFillColor(255, 255, 255); doc.roundedRect(64, 25, 18, 18, 1.5, 1.5, "F"); doc.addImage(qr, "PNG", 65.2, 26.2, 15.6, 15.6);
  doc.setTextColor(200, 205, 215); doc.setFontSize(4); doc.text("SCAN TO VERIFY", 73, 46, { align: "center" });
  doc.setFillColor(225, 50, 60); doc.rect(0, 50, 50, 1, "F"); doc.setFillColor(255, 255, 255); doc.rect(50, 50, 10, 1, "F"); doc.setFillColor(0, 135, 75); doc.rect(60, 50, 10, 1, "F");
  doc.setTextColor(130, 135, 150); doc.text(`VALID THRU 12/2027  ·  ${c.phone}`, 4, 48);
  doc.save(`${c.id}-ecard.pdf`);
}

export function downloadCert(c: Coach, cert: { name: string; date: string; code: string }) {
  const d = new jsPDF({ orientation: "landscape" });
  d.setDrawColor(225, 50, 60); d.setLineWidth(2); d.rect(10, 10, 277, 190);
  d.setFont("helvetica", "bold"); d.setFontSize(28); d.text("CERTIFICATE", 148, 60, { align: "center" });
  d.setFontSize(14); d.setFont("helvetica", "normal"); d.text("Lebanese Basketball Federation certifies that", 148, 85, { align: "center" });
  d.setFont("helvetica", "bold"); d.setFontSize(24); d.text(c.name, 148, 105, { align: "center" });
  d.setFont("helvetica", "normal"); d.setFontSize(14); d.text(`has successfully completed ${cert.name}`, 148, 125, { align: "center" });
  d.setFontSize(10); d.text(`Issued ${cert.date}  ·  Code ${cert.code}  ·  (Mock document)`, 148, 175, { align: "center" });
  d.save(`${cert.code}.pdf`);
}
