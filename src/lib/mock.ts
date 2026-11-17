export type Level = "Level 1" | "Level 2" | "Level 3" | "Level 4";
export const LEVELS: Level[] = ["Level 1", "Level 2", "Level 3", "Level 4"];
export const LEVEL_TARGET: Record<Level, number> = { "Level 1": 40, "Level 2": 80, "Level 3": 120, "Level 4": 200 };

export type Coach = {
  id: string; name: string; phone: string; email: string; level: Level; club: string;
  dob: string; nationality: string; nationalId: string; city: string; since: string; status: "Active" | "Pending";
  cpd: number; photo: string;
  cv: { title: string; period: string; detail: string }[];
  certifications: { name: string; date: string; code: string }[];
  activities: { type: "Workshop" | "Clinic"; name: string; date: string; points: number }[];
  assessments: { name: string; date: string; grade: number; result: "Pass" | "Merit" | "Distinction" | "Retake" }[];
  gallery: { event: string; img: string }[];
};

const names = ["Rami Haddad","Nadine Khoury","Elie Sfeir","Joe Abi Nader","Maya Karam","Fadi El Khatib","Georges Daou","Rita Nassar","Karim Chamoun","Hadi Fares"];
const clubs = ["Al Riyadi","Sagesse","Homenetmen","Beirut Club","Champville","Antranik","Dynamo","Hoops Club"];
const events = ["FIBA Clinic 2026","Summer Camp","Youth Nationals","Coaches Retreat"];

export const coaches: Coach[] = names.map((name, i) => {
  const level = LEVELS[i % 4]!;
  return {
    id: `CCP-${(2401 + i * 37).toString()}`,
    name, level, club: clubs[i % clubs.length]!,
    phone: `+961 ${70 + (i % 9)} ${100 + i * 11} ${300 + i * 7}`,
    email: name.toLowerCase().replace(/ /g, ".") + "@lbf.coach",
    dob: `19${80 + i}-0${(i % 9) + 1}-1${i % 9}`, nationality: "Lebanese", nationalId: `LB-${883120 + i * 913}`,
    city: ["Beirut","Jounieh","Byblos","Tripoli","Zahle","Saida"][i % 6]!, since: `20${15 + (i % 9)}`,
    status: i === 7 ? "Pending" : "Active",
    cpd: Math.round(LEVEL_TARGET[level] * (0.35 + ((i * 17) % 55) / 100)),
    photo: `https://i.pravatar.cc/300?img=${[12,47,15,33,44,60,53,49,59,68][i]}`,
    cv: [
      { title: `Head Coach — ${clubs[i % clubs.length]} U18`, period: "2022 – Present", detail: "Led team to national semi-finals; developed 4 players to senior squad." },
      { title: "Assistant Coach — Lebanese U16 National Team", period: "2019 – 2022", detail: "Defensive schemes & scouting for FIBA Asia qualifiers." },
      { title: "B.Sc. Physical Education — LU", period: "2012 – 2016", detail: "Sports science & coaching methodology." },
    ],
    certifications: LEVELS.slice(0, LEVELS.indexOf(level) + 1).map((l, k) => ({ name: `LBF Coaching ${l} Certificate`, date: `20${18 + k}-06-15`, code: `LBF-${l.slice(-1)}-${4400 + i * 3 + k}` })),
    activities: [
      { type: "Clinic", name: "FIBA Europe Coaching Clinic", date: "2026-09-12", points: 12 },
      { type: "Workshop", name: "Modern Pick & Roll Defense", date: "2026-07-03", points: 6 },
      { type: "Workshop", name: "Youth Player Development", date: "2026-04-20", points: 8 },
      { type: "Clinic", name: "LBF National Coaches Clinic", date: "2026-02-10", points: 10 },
      { type: "Workshop", name: "Sports Psychology Basics", date: "2025-11-05", points: 4 },
    ],
    assessments: [
      { name: "Practical Session Evaluation", date: "2026-08-01", grade: 88 - i, result: "Distinction" },
      { name: "Rules & Officiating Exam", date: "2026-05-14", grade: 76 + (i % 5), result: "Merit" },
      { name: "Game Strategy Written Test", date: "2025-12-02", grade: 64 + i, result: "Pass" },
    ],
    gallery: Array.from({ length: 8 }, (_, k) => ({ event: events[k % 4]!, img: `https://picsum.photos/seed/lbf${i}${k}/600/400` })),
  };
});

export const nextLevel = (l: Level): Level | null => LEVELS[LEVELS.indexOf(l) + 1] ?? null;
export const findCoach = (id: string) => coaches.find((c) => c.id === id);
