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
      <div className="flex min-h-screen items-center justify-center bg-[#f5f0e8] text-sm text-neutral-500">
        Indlæser…
      </div>
    );
  }

  const firstName = email?.split("@")[0] ?? "athlete";

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-neutral-950">
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
        <div className="mt-4 space-y-3">
          <Row
            icon={<CoachIcon bg="#fde2d4" stroke="#dc6b3f" />}
            title="Claude"
            desc="Considered, careful with nuance"
            right={<SetupLink />}
          />
          <Row
            icon={<CoachIcon bg="#d6f0e2" stroke="#10a37f" />}
            title="ChatGPT"
            desc="Versatile, fast, broad"
            right={<SetupLink />}
          />
          <Row
            icon={<CoachIcon bg="#dde6fa" stroke="#4285f4" />}
            title="Gemini"
            desc="Multimodal, web-aware"
            right={<SetupLink />}
          />
        </div>

        {/* Training load */}
        <SectionLabel className="mt-16">Training load</SectionLabel>
        <p className="mt-4 text-[15px] text-neutral-700">
          We'll show your fitness once Strava has finished its first sync.
        </p>
        <div className="mt-6 rounded-xl border border-neutral-200 bg-[#faf6f0] p-6">
          <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
            Today
          </div>
          <div className="mt-2 text-[20px] font-semibold tracking-[-0.01em]">Easy</div>
          <div className="mt-1 text-[13.5px] text-neutral-600">
            45 min · 45min easy z1–z2 conversational pace
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

function DashNav({ onSignOut }: { onSignOut: () => void }) {
  return (
    <header className="border-b border-neutral-200/70">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-8 py-[18px]">
        <Link to="/" className="flex items-center gap-2 font-semibold text-[15px]">
          <img src={evrLogo} alt="" className="h-6 w-6 object-contain" />
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
    <div className="mt-4 flex items-center justify-between rounded-xl border border-neutral-200 bg-[#faf6f0] px-5 py-4">
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

function CoachIcon({ bg, stroke }: { bg: string; stroke: string }) {
  return (
    <div
      className="flex h-12 w-12 items-center justify-center rounded-xl"
      style={{ background: bg }}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round">
        <path d="M12 5v14M5 12h14" />
      </svg>
    </div>
  );
}

function SetupLink() {
  return (
    <a href="#" className="text-[13px] font-medium text-[#dc6b3f] hover:underline">
      Setup →
    </a>
  );
}

function PromptRow({ text }: { text: string }) {
  function copy() {
    navigator.clipboard.writeText(text).catch(() => {});
  }
  return (
    <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-[#faf6f0] px-5 py-3">
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
