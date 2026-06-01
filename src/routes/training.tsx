import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import evrLogo from "@/assets/evr-logo.png";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "Training plan — EvolveRun" },
      { name: "description", content: "See your weekly training plan with sessions, paces, and focus." },
      { property: "og:title", content: "Training plan — EvolveRun" },
      { property: "og:description", content: "Your AI-tuned weekly running plan." },
    ],
  }),
  component: TrainingPage,
});

type Session = {
  day: string;
  date: string;
  title: string;
  type: "Easy" | "Quality" | "Long" | "Rest" | "Recovery";
  distance: string;
  duration: string;
  detail: string;
};

const WEEK: Session[] = [
  { day: "Mon", date: "20 May", title: "Rest", type: "Rest", distance: "—", duration: "—", detail: "Full recovery. Mobility 10 min optional." },
  { day: "Tue", date: "21 May", title: "Easy · forest loop", type: "Easy", distance: "8 km", duration: "42 min", detail: "Z2 conversational. Cadence 178+." },
  { day: "Wed", date: "22 May", title: "Threshold · 5 × 1 km", type: "Quality", distance: "11 km", duration: "55 min", detail: "Reps at 4:35 /km, 90s float between. 2 km warm-up + cool-down." },
  { day: "Thu", date: "23 May", title: "Recovery shake-out", type: "Recovery", distance: "5 km", duration: "28 min", detail: "Very easy. HR cap 140." },
  { day: "Fri", date: "24 May", title: "Rest", type: "Rest", distance: "—", duration: "—", detail: "Strength: hips + calves, 25 min." },
  { day: "Sat", date: "25 May", title: "Strides + drills", type: "Easy", distance: "6 km", duration: "32 min", detail: "Easy with 6 × 20s strides last km." },
  { day: "Sun", date: "26 May", title: "Long run · river trail", type: "Long", distance: "18 km", duration: "1h 35", detail: "Steady Z2. Last 4 km lift to marathon pace." },
];

const TYPE_COLORS: Record<Session["type"], { bg: string; text: string }> = {
  Easy: { bg: "#e8f0e6", text: "#3d6b34" },
  Quality: { bg: "#fde2d4", text: "#a13e1a" },
  Long: { bg: "#e4ddf5", text: "#4a3a8a" },
  Recovery: { bg: "#dfeef0", text: "#2e6b75" },
  Rest: { bg: "#f0ece4", text: "#6b6356" },
};

function TrainingPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [weekOffset, setWeekOffset] = useState(0);

  const weekLabel = (() => {
    const base = new Date(2026, 4, 20); // anchor: Mon 20 May
    const start = new Date(base);
    start.setDate(base.getDate() + weekOffset * 7);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    const fmt = (d: Date) =>
      d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    return `${fmt(start)} — ${fmt(end)}`;
  })();

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user.email ?? null);
      if (!session) navigate({ to: "/login" });
    });
    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user.email ?? null);
      setChecking(false);
      if (!data.session) navigate({ to: "/login" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfaf7] text-sm text-neutral-500">
        Loading…
      </div>
    );
  }

  const totalKm = WEEK.reduce((acc, s) => {
    const n = parseFloat(s.distance);
    return acc + (isNaN(n) ? 0 : n);
  }, 0);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  }

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-neutral-950">
      <header className="border-b border-neutral-200/70">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-8 py-[18px]">
          <Link to="/" className="flex items-center gap-2 font-semibold text-[15px]">
            <img src={evrLogo} alt="" className="h-6 w-6 object-contain mix-blend-multiply" />
            EvolveRun
          </Link>
          <nav className="hidden gap-8 text-[14px] text-neutral-700 md:flex">
            <Link to="/dashboard" className="hover:text-neutral-950">Dashboard</Link>
            <Link to="/training" className="font-medium text-neutral-950">Training</Link>
            <a href="#" className="hover:text-neutral-950">Account</a>
          </nav>
          <button
            onClick={signOut}
            className="rounded-md border border-neutral-300 bg-white px-3.5 py-1.5 text-[13px] font-medium text-neutral-950 hover:bg-neutral-50"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-8 pt-14 pb-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                {weekOffset === 0 ? "This week" : weekOffset === -1 ? "Last week" : weekOffset === 1 ? "Next week" : `Week ${weekOffset > 0 ? "+" : ""}${weekOffset}`} · {weekLabel}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setWeekOffset((w) => w - 1)}
                  aria-label="Previous week"
                  className="flex h-6 w-6 items-center justify-center rounded-md border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50"
                >
                  ‹
                </button>
                <button
                  onClick={() => setWeekOffset((w) => w + 1)}
                  aria-label="Next week"
                  className="flex h-6 w-6 items-center justify-center rounded-md border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50"
                >
                  ›
                </button>
                {weekOffset !== 0 && (
                  <button
                    onClick={() => setWeekOffset(0)}
                    className="ml-1 rounded-md px-2 py-0.5 text-[11px] font-medium text-neutral-600 hover:text-neutral-950"
                  >
                    Today
                  </button>
                )}
              </div>
            </div>
            <h1 className="evr-headline mt-3 text-[56px] leading-[1] tracking-[-0.03em]">
              Training plan
            </h1>
            <p className="mt-4 max-w-xl text-[15px] text-neutral-600">
              Built around your last 90 days of Strava data. Block 3 of 12 — building marathon
              endurance with one weekly quality session.
            </p>
          </div>
          <button className="hidden rounded-lg bg-neutral-950 px-4 py-2.5 text-[13.5px] font-medium text-white hover:bg-neutral-800 md:inline-flex">
            Regenerate with AI →
          </button>
        </div>

        {/* Week summary */}
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          <SummaryCard label="Total volume" value={`${totalKm.toFixed(0)} km`} hint="vs 44 km last wk" />
          <SummaryCard label="Sessions" value="5" hint="2 rest days" />
          <SummaryCard label="Quality" value="1×" hint="Threshold Wed" />
          <SummaryCard label="Long run" value="18 km" hint="Sunday, Z2" />
        </div>

        {/* Week schedule */}
        <div className="mt-12 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
          Schedule
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          {WEEK.map((s, i) => (
            <SessionRow key={s.day} session={s} divider={i > 0} />
          ))}
        </div>

        {/* Focus + coach note */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
              Block focus
            </div>
            <h3 className="mt-3 text-[20px] font-semibold tracking-[-0.01em]">
              Build aerobic ceiling
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-neutral-600">
              Time on feet at Z2 stays the priority. The threshold session is the only hard run —
              everything else stays conversational. Avoid the grey zone.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3 text-[13px]">
              <KV k="Easy pace" v="5:20–5:40 /km" />
              <KV k="Threshold" v="4:30–4:40 /km" />
              <KV k="Long run" v="5:25–5:45 /km" />
            </div>
          </div>
          <div className="rounded-2xl border border-[#fde2d4] bg-[#fdf4ec] p-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#a13e1a]">
              Coach note · Claude
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-neutral-800">
              Your HR drift last Sunday was only 4% — aerobic base is responding well. Keep Wed
              honest but don't chase splits if HR creeps over 168.
            </p>
            <button className="mt-5 rounded-md bg-neutral-950 px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-neutral-800">
              Open in Claude →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function SummaryCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-neutral-500">
        {label}
      </div>
      <div className="mt-2 text-[26px] font-semibold tracking-[-0.02em]">{value}</div>
      <div className="mt-1 text-[12px] text-neutral-500">{hint}</div>
    </div>
  );
}

function SessionRow({ session, divider }: { session: Session; divider: boolean }) {
  const c = TYPE_COLORS[session.type];
  return (
    <div className={`grid grid-cols-[80px_1fr_auto] items-center gap-4 px-5 py-4 sm:grid-cols-[90px_1fr_220px_auto] ${divider ? "border-t border-neutral-200" : ""}`}>
      <div>
        <div className="text-[14px] font-semibold">{session.day}</div>
        <div className="text-[12px] text-neutral-500">{session.date}</div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span
            className="rounded-full px-2.5 py-[3px] text-[11px] font-medium"
            style={{ background: c.bg, color: c.text }}
          >
            {session.type}
          </span>
          <span className="text-[14.5px] font-semibold">{session.title}</span>
        </div>
        <div className="mt-1 text-[12.5px] text-neutral-500">{session.detail}</div>
      </div>
      <div className="hidden text-[13px] text-neutral-700 sm:block">
        <div><span className="text-neutral-400">Dist </span>{session.distance}</div>
        <div><span className="text-neutral-400">Time </span>{session.duration}</div>
      </div>
      <button className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-[12.5px] font-medium text-neutral-950 hover:bg-neutral-50">
        View
      </button>
    </div>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg bg-neutral-50 px-3 py-2.5">
      <div className="text-[11px] uppercase tracking-wide text-neutral-500">{k}</div>
      <div className="mt-0.5 text-[13.5px] font-semibold">{v}</div>
    </div>
  );
}
