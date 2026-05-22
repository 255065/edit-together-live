import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import evrLogo from "@/assets/evr-logo.png";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

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

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfaf7] text-sm text-neutral-500">
        Loading…
      </div>
    );
  }

  const firstName = email?.split("@")[0] ?? "athlete";

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-neutral-950">
      <DashNav onSignOut={signOut} />

      <main className="mx-auto max-w-[1100px] px-8 pt-14 pb-24">
        <h1 className="evr-headline text-[64px] leading-[1] tracking-[-0.03em]">Dashboard</h1>
        <p className="mt-4 text-[15px] text-neutral-600">
          Welcome back, <span className="capitalize">{firstName}</span>.
        </p>

        {/* Connected sources */}
        <SectionLabel className="mt-16">Connected sources</SectionLabel>
        <Row
          icon={
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fc5200]">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="#fff">
                <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
              </svg>
            </div>
          }
          title="Strava"
          desc="Synced — webhook listening for new activities"
          right={
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-[12px] font-medium text-emerald-700">
                Synced
              </span>
              <button className="text-[13px] text-neutral-500 hover:text-neutral-950">
                Disconnect
              </button>
            </div>
          }
        />

        {/* AI Coach */}
        <SectionHeader label="AI coach" action="Open setup" />
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <CoachCard
            name="Claude"
            tagline="Considered, careful with nuance"
            logo={<ClaudeLogo />}
            bg="#fde2d4"
          />
          <CoachCard
            name="ChatGPT"
            tagline="Versatile, fast, broad"
            logo={<ChatGPTLogo />}
            bg="#d6f0e2"
          />
        </div>

        {/* Recent activities + Weekly load side-by-side */}
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <SectionLabel>Recent activities</SectionLabel>
            <div className="mt-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
              {RECENT_ACTIVITIES.map((a, i) => (
                <ActivityRow key={a.title} activity={a} divider={i > 0} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-end justify-between">
              <SectionLabel>Weekly load</SectionLabel>
              <span className="text-[13px] font-medium text-[#dc6b3f]">38 km this week</span>
            </div>
            <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-6">
              <WeeklyLoadChart />
              <div className="mt-4 flex items-center justify-between text-[13px] text-neutral-600">
                <div>
                  <span className="font-semibold text-neutral-950">38 km</span> · 4 sessions
                </div>
                <div className="text-emerald-700">+12% vs last week</div>
              </div>
            </div>
          </div>
        </div>

        {/* Training load */}
        <SectionLabel className="mt-16">Today</SectionLabel>
        <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
            Session
          </div>
          <div className="mt-2 text-[20px] font-semibold tracking-[-0.01em]">Easy</div>
          <div className="mt-1 text-[13.5px] text-neutral-600">
            45 min · z1–z2 conversational pace
          </div>
        </div>

        {/* Quick prompts */}
        <SectionHeader label="Quick prompts" action="Connector setup" />
        <p className="mt-4 text-[15px] text-neutral-700">
          Copy any of these into Claude.ai, ChatGPT, or Gemini once the EvolveRun connector is attached.
        </p>
        <div className="mt-6 space-y-3">
          {QUICK_PROMPTS.map((p) => (
            <PromptRow key={p} text={p} />
          ))}
        </div>
      </main>
    </div>
  );
}

const QUICK_PROMPTS = [
  "How did this week compare to last?",
  "Am I ready for tomorrow's long run?",
  "Plan my next 7 days around a tempo Tuesday.",
  "Why was last Saturday's long run so hard?",
  "Am I training polarized or stuck in the grey zone?",
  "Write me a 12-week marathon plan based on my last 3 months of data.",
];

type Activity = {
  title: string;
  date: string;
  distance: string;
  pace: string;
  hr: string;
};

const RECENT_ACTIVITIES: Activity[] = [
  { title: "Easy run · forest loop", date: "Tue · 21 May", distance: "8.2 km", pace: "5:18 /km", hr: "144 bpm" },
  { title: "Threshold · 6 × 1 km", date: "Sun · 19 May", distance: "12.4 km", pace: "4:42 /km", hr: "162 bpm" },
  { title: "Recovery shake-out", date: "Sat · 18 May", distance: "5.0 km", pace: "5:46 /km", hr: "131 bpm" },
  { title: "Long run · river trail", date: "Thu · 16 May", distance: "16.1 km", pace: "5:09 /km", hr: "149 bpm" },
];

function ActivityRow({ activity, divider }: { activity: Activity; divider: boolean }) {
  return (
    <div
      className={`flex items-center justify-between px-5 py-4 ${
        divider ? "border-t border-neutral-200" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fc5200]">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff">
            <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
          </svg>
        </div>
        <div>
          <div className="text-[14.5px] font-semibold">{activity.title}</div>
          <div className="text-[12.5px] text-neutral-500">{activity.date}</div>
        </div>
      </div>
      <div className="hidden gap-8 text-[13px] text-neutral-700 sm:flex">
        <div><span className="text-neutral-400">Dist </span>{activity.distance}</div>
        <div><span className="text-neutral-400">Pace </span>{activity.pace}</div>
        <div><span className="text-neutral-400">HR </span>{activity.hr}</div>
      </div>
    </div>
  );
}

function WeeklyLoadChart() {
  const days = [
    { d: "M", km: 6 },
    { d: "T", km: 12.4 },
    { d: "W", km: 0 },
    { d: "T", km: 8.2 },
    { d: "F", km: 0 },
    { d: "S", km: 5 },
    { d: "S", km: 6.4 },
  ];
  const max = Math.max(...days.map((d) => d.km), 1);
  return (
    <div className="flex h-40 items-end gap-3">
      {days.map((day, i) => {
        const h = (day.km / max) * 100;
        return (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full flex-1 items-end">
              <div
                className="w-full rounded-md bg-[#fc5200]"
                style={{ height: `${h}%`, minHeight: day.km > 0 ? 6 : 2, opacity: day.km > 0 ? 1 : 0.15 }}
              />
            </div>
            <div className="font-mono text-[11px] text-neutral-500">{day.d}</div>
          </div>
        );
      })}
    </div>
  );
}

function DashNav({ onSignOut }: { onSignOut: () => void }) {
  return (
    <header className="border-b border-neutral-200/70">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-8 py-[18px]">
        <Link to="/" className="flex items-center gap-2 font-semibold text-[15px]">
          <img src={evrLogo} alt="" className="h-6 w-6 object-contain mix-blend-multiply" />
          EvolveRun
        </Link>
        <nav className="hidden gap-8 text-[14px] text-neutral-700 md:flex">
          <Link to="/dashboard" className="font-medium text-neutral-950">Dashboard</Link>
          <a href="#" className="hover:text-neutral-950">Training</a>
          <a href="#" className="hover:text-neutral-950">Account</a>
        </nav>
        <button
          onClick={onSignOut}
          className="rounded-md border border-neutral-300 bg-white px-3.5 py-1.5 text-[13px] font-medium text-neutral-950 hover:bg-neutral-50"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}

function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 ${className}`}>
      {children}
    </div>
  );
}

function SectionHeader({ label, action }: { label: string; action: string }) {
  return (
    <div className="mt-16 flex items-end justify-between">
      <SectionLabel>{label}</SectionLabel>
      <a href="#" className="text-[13px] font-medium text-[#dc6b3f] hover:underline">
        {action}
      </a>
    </div>
  );
}

function Row({
  icon,
  title,
  desc,
  right,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  right: React.ReactNode;
}) {
  return (
    <div className="mt-4 flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-5 py-4">
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <div className="text-[15px] font-semibold">{title}</div>
          <div className="text-[13px] text-neutral-600">{desc}</div>
        </div>
      </div>
      {right}
    </div>
  );
}

function CoachCard({
  name,
  tagline,
  logo,
  bg,
}: {
  name: string;
  tagline: string;
  logo: React.ReactNode;
  bg: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-5 py-5">
      <div className="flex items-center gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ background: bg }}
        >
          {logo}
        </div>
        <div>
          <div className="text-[15.5px] font-semibold">{name}</div>
          <div className="text-[13px] text-neutral-600">{tagline}</div>
        </div>
      </div>
      <a
        href="#"
        className="rounded-md border border-neutral-300 bg-white px-3.5 py-1.5 text-[13px] font-medium text-neutral-950 hover:bg-neutral-50"
      >
        Add
      </a>
    </div>
  );
}

function ClaudeLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="#cc785c">
      <path d="M4.2 18.6 9 6h2.4l4.8 12.6h-2.3l-1.1-3h-5l-1.1 3H4.2Zm4.5-4.9h3.5L10.5 9 8.7 13.7Zm8.7 4.9V6h2.2v12.6h-2.2Z" />
    </svg>
  );
}

function ChatGPTLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="#10a37f" strokeWidth="1.6">
      <path
        d="M21.55 10.36a5.45 5.45 0 0 0-.47-4.48 5.52 5.52 0 0 0-5.94-2.65A5.49 5.49 0 0 0 6.7 4.51a5.46 5.46 0 0 0-3.65 2.65 5.52 5.52 0 0 0 .68 6.48 5.45 5.45 0 0 0 .47 4.48 5.52 5.52 0 0 0 5.94 2.65 5.48 5.48 0 0 0 4.13 1.84 5.5 5.5 0 0 0 5.25-3.81 5.46 5.46 0 0 0 3.65-2.65 5.52 5.52 0 0 0-.62-6.79Z"
        fill="#10a37f"
        fillOpacity="0.12"
      />
      <path d="m9 9.5 3-1.7 3 1.7v3.4L12 14.6 9 12.9V9.5Z" />
    </svg>
  );
}

function PromptRow({ text }: { text: string }) {
  function copy() {
    navigator.clipboard.writeText(text).catch(() => {});
  }
  return (
    <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-5 py-3">
      <div className="text-[14.5px] text-neutral-800">{text}</div>
      <button
        onClick={copy}
        className="rounded-md bg-neutral-950 px-4 py-1.5 text-[13px] font-medium text-white hover:bg-neutral-800"
      >
        Copy
      </button>
    </div>
  );
}
