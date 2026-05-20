import { createFileRoute, Link } from "@tanstack/react-router";
import evrLogo from "@/assets/evr-logo.png";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <Nav />
      <Hero />
      <ConnectorVisual />
      <HowItWorks />
      <Footer />
    </div>
  );
}

function Brandmark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <img src={evrLogo} alt="EvolveRun" className={`${className} object-contain`} />
  );
}

function Nav() {
  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-[18px]">
        <Link to="/" className="flex items-center gap-2 font-semibold text-[15px]">
          <Brandmark />
          EvolveRun
        </Link>
        <nav className="hidden gap-6 text-[13.5px] text-neutral-600 md:flex">
          <a href="#how-it-works" className="hover:text-neutral-950">How it works</a>
          <a href="#integrations" className="hover:text-neutral-950">Integrations</a>
          <a href="#pricing" className="hover:text-neutral-950">Pricing</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-[13.5px] text-neutral-600 hover:text-neutral-950">
            Log in
          </Link>
          <Link
            to="/signup"
            className="rounded-md bg-neutral-950 px-3.5 py-1.5 text-[13px] font-medium text-white"
          >
            Start free trial
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto max-w-[1200px] overflow-hidden px-8 pt-28 pb-24 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -z-0 h-[600px] w-[800px] -translate-x-1/2 blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 30% 50%, rgba(255,107,70,0.15), transparent 50%), radial-gradient(circle at 70% 50%, rgba(168,85,247,0.12), transparent 50%)",
        }}
      />
      <div className="relative z-10">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/90 py-1.5 pr-3.5 pl-1.5 text-[13px] text-neutral-600">
          <span className="rounded-full bg-neutral-950 px-2.5 py-[3px] text-[11px] font-medium tracking-wide text-white">
            v1
          </span>
          Simple AI endurance coach for Strava athletes
        </div>
        <h1 className="evr-headline mx-auto max-w-[14ch] bg-gradient-to-b from-neutral-950 to-neutral-700 bg-clip-text text-[clamp(48px,9vw,80px)] font-semibold leading-[1] tracking-[-0.045em] text-transparent">
          Connect Strava.{" "}
          <em className="not-italic bg-gradient-to-br from-[#ff6b46] to-[#a855f7] bg-clip-text text-transparent">
            Get answers.
          </em>
        </h1>
        <p className="mx-auto mt-6 max-w-[36rem] text-[18.5px] leading-relaxed text-neutral-600">
          EvolveRun connects your Strava account to Claude, ChatGPT, or Gemini — so the
          AI you already use can answer real questions about <em className="not-italic">your</em>{" "}
          training. Zone analysis, plan writing, recovery debriefs, all from your actual data.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-lg bg-neutral-950 px-6 py-3 text-[14.5px] font-medium text-white"
          >
            Start free trial →
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-5 py-3 text-[14.5px] text-neutral-950"
          >
            How it works ↓
          </a>
        </div>
        <p className="mt-5 text-[12.5px] text-neutral-500">
          Works with Garmin, Apple Watch, Polar, COROS, Suunto and Wahoo — anything that auto-syncs to Strava.
        </p>
      </div>
    </section>
  );
}

function StatsGrid() {
  const cells = [
    { n: <>85<em className="not-italic text-[#ff6b46]">%</em></>, l: "of the endurance market — every device that auto-syncs to Strava is supported." },
    { n: <>3</>, l: "AI coaches you can use: Claude, ChatGPT, Gemini — connected via your own account." },
    { n: <>11</>, l: "MCP tools tuned for endurance data — splits, periods, plan writes, all kebab-cased." },
    { n: <>€9<span className="text-[18px] text-neutral-500">/mo</span></>, l: "One simple subscription. No free tier, no surprise upsells, cancel anytime." },
  ];
  return (
    <section
      id="integrations"
      className="mx-auto grid max-w-[1100px] grid-cols-2 border-t border-b border-neutral-200 px-8 py-[60px] md:grid-cols-4"
    >
      {cells.map((c, i) => (
        <div
          key={i}
          className={`px-0 py-7 ${i < cells.length - 1 ? "md:border-r md:border-neutral-200" : ""} pr-6`}
        >
          <div className="text-[36px] font-semibold tracking-[-0.03em] leading-none">{c.n}</div>
          <div className="mt-2 text-[13.5px] leading-snug text-neutral-600">{c.l}</div>
        </div>
      ))}
    </section>
  );
}

function ConnectorVisual() {
  return (
    <section className="relative mx-auto max-w-[1100px] overflow-hidden px-8 py-20">
      <div className="mb-14 text-center">
        <div className="text-[13px] font-medium uppercase tracking-wider text-[#dc6b3f]">
          The bridge
        </div>
        <h2 className="evr-headline mt-3 text-[36px] tracking-[-0.025em]">
          Strava, meet <span className="evr-emphasis">your AI.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] text-neutral-600">
          A direct line between your training feed and the chat you already use.
        </p>
      </div>

      <div className="relative mx-auto flex h-[240px] max-w-[640px] items-center justify-between">
        {/* Strava-orange glow on the left */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[4%] top-1/2 h-[240px] w-[60%] -translate-y-1/2 rounded-full blur-3xl opacity-80"
          style={{
            background:
              "radial-gradient(circle at 25% 50%, rgba(252,82,0,0.85) 0%, rgba(252,82,0,0.35) 38%, rgba(252,82,0,0) 72%)",
          }}
        />
        {/* Claude-clay glow on the right */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-[4%] top-1/2 h-[240px] w-[60%] -translate-y-1/2 rounded-full blur-3xl opacity-80"
          style={{
            background:
              "radial-gradient(circle at 75% 50%, rgba(204,120,92,0.8) 0%, rgba(204,120,92,0.3) 38%, rgba(204,120,92,0) 72%)",
          }}
        />
        {/* Soft connecting band that blends the two */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[14%] top-1/2 h-[44px] -translate-y-1/2 rounded-full blur-2xl opacity-90"
          style={{
            background:
              "linear-gradient(90deg, #fc5200 0%, #ef6a3a 38%, #dc6b3f 62%, #cc785c 100%)",
          }}
        />
        {/* Crisp focused core line */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[18%] top-1/2 h-[3px] -translate-y-1/2 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #fc5200 0%, #e07050 50%, #cc785c 100%)",
            boxShadow: "0 0 18px rgba(240,110,70,0.6)",
          }}
        />

        {/* Strava tile (left) */}
        <Tile label="Strava" ringColor="rgba(252,82,0,0.45)">
          <svg viewBox="0 0 24 24" className="h-12 w-12" fill="#fc5200">
            <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
          </svg>
        </Tile>

        {/* Claude tile (right) */}
        <Tile label="Claude" ringColor="rgba(204,120,92,0.45)">
          <svg viewBox="0 0 24 24" className="h-11 w-11" fill="#cc785c">
            <path d="M4.709 15.955l4.72-2.647.079-.23-.079-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.448.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.477 2.491 1.833.365.304.146-.103.018-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.418 1.002 2.228 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.243.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.005 1.81 2.508 2.33.127.578-.322.455-.34-.049-2.204-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.087-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" />
          </svg>
        </Tile>
      </div>

      <p className="mx-auto mt-6 text-center text-[12px] font-medium uppercase tracking-wider text-neutral-500">
        Powered by EvolveRun
      </p>
      <p className="mx-auto mt-3 max-w-md text-center text-[13px] text-neutral-500">
        Encrypted tokens. Row-level security. You stay in control of what your AI sees.
      </p>
    </section>
  );
}

function Tile({
  children,
  label,
  ringColor = "rgba(0,0,0,0.08)",
}: {
  children: React.ReactNode;
  label: string;
  ringColor?: string;
}) {
  return (
    <div className="relative z-10 flex flex-col items-center gap-3">
      <div
        className="flex h-[112px] w-[112px] items-center justify-center rounded-2xl bg-white"
        style={{ boxShadow: `0 18px 50px -12px ${ringColor}, 0 0 0 1px ${ringColor}` }}
      >
        {children}
      </div>
      <div className="text-[12px] font-medium text-neutral-700">{label}</div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Connect Strava", d: "One OAuth click. We pull your last 90 days and listen for new activities live. Encrypted tokens, RLS on every row." },
    { n: "02", t: "Add the connector", d: 'In Claude.ai, ChatGPT or Gemini, "Add custom connector" → paste the link → done. Your chat now has access to your training data.' },
    { n: "03", t: "Ask anything", d: '"Write me a 12-week marathon plan." "Why was Saturday\'s long run so hard?" "Am I polarized or stuck in grey zone?" Real answers from your real data.' },
  ];
  return (
    <section id="how-it-works" className="mx-auto max-w-[1100px] px-8 py-24">
      <div className="mb-12 max-w-2xl">
        <div className="text-[13px] font-medium uppercase tracking-wider text-[#dc6b3f]">
          How it works
        </div>
        <h2 className="evr-headline mt-3 text-[40px] tracking-[-0.025em]">
          Three steps. <span className="evr-emphasis">No new app to learn.</span>
        </h2>
        <p className="mt-4 text-[16px] text-neutral-600">
          The AI lives in the chat you already use. EvolveRun is the data layer that makes its
          answers actually correct for you.
        </p>
      </div>
      <div className="grid gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="bg-white p-7">
            <div className="font-mono text-[12px] text-neutral-500">{s.n}</div>
            <div className="mt-3 text-[18px] font-semibold tracking-[-0.01em]">{s.t}</div>
            <p className="mt-2 text-[14px] leading-relaxed text-neutral-600">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="pricing" className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-8 py-16 text-center">
        <div className="flex items-center gap-2 text-[15px] font-semibold">
          <Brandmark />
          EvolveRun
        </div>
        <h3 className="evr-headline max-w-xl text-[32px] tracking-[-0.02em]">
          Ready to let your AI <span className="evr-emphasis">read your training data?</span>
        </h3>
        <Link
          to="/signup"
          className="inline-flex items-center gap-2 rounded-lg bg-neutral-950 px-6 py-3 text-[14.5px] font-medium text-white"
        >
          Start free trial →
        </Link>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12.5px] text-neutral-500">
          <Link to="/login" className="hover:text-neutral-950">Log in</Link>
          <a href="#how-it-works" className="hover:text-neutral-950">How it works</a>
          <a
            href="https://github.com/255065/evovlerun"
            target="_blank"
            rel="noreferrer"
            className="hover:text-neutral-950"
          >
            GitHub
          </a>
          <span>© {new Date().getFullYear()} EvolveRun</span>
        </div>
      </div>
    </footer>
  );
}
