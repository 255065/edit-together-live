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
      <ChatDemo />
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
            Public Beta
          </span>
          Connect Strava to ChatGPT &amp; Claude
        </div>
        <h1 className="evr-headline mx-auto max-w-[16ch] bg-gradient-to-b from-neutral-950 to-neutral-700 bg-clip-text text-[clamp(48px,9vw,80px)] font-semibold leading-[1] tracking-[-0.045em] text-transparent">
          Understand your training with{" "}
          <em className="not-italic bg-gradient-to-br from-[#ff6b46] to-[#a855f7] bg-clip-text text-transparent">
            AI.
          </em>
        </h1>
        <p className="mx-auto mt-6 max-w-[40rem] text-[18.5px] leading-relaxed text-neutral-600">
          Connect your Strava account to ChatGPT, Claude, or Gemini and get deeper
          insights into your workouts, recovery, fitness trends, and performance —
          using your real training data.
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
        <HeroConnector />
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

function ChatDemo() {
  const months = [
    { m: "Jan", pace: "5:23/km", bpm: 149, x: 12, y: 70 },
    { m: "Feb", pace: "5:17/km", bpm: 147, x: 50, y: 50 },
    { m: "Mar", pace: "5:08/km", bpm: 145, x: 88, y: 28 },
  ];

  return (
    <section className="mx-auto max-w-[760px] px-6 pb-24">
      <div className="rounded-[28px] border border-neutral-200 bg-[#f5f0e8] p-3 shadow-[0_24px_60px_-30px_rgba(60,40,20,0.35)]">
        {/* window chrome */}
        <div className="relative flex items-center justify-center rounded-t-[20px] bg-[#ece6dc] px-4 py-2.5">
          <div className="absolute left-4 flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
          </div>
          <span className="font-mono text-[11px] tracking-[0.2em] text-neutral-600">CLAUDE.AI</span>
        </div>

        <div className="space-y-3 p-4 md:p-6">
          {/* greeting */}
          <div className="flex items-center justify-center gap-3 py-3">
            <ClaudeStar />
            <span className="evr-headline text-[28px] tracking-[-0.02em]">Afternoon</span>
          </div>

          {/* user prompt card */}
          <div className="rounded-2xl border border-neutral-200/80 bg-white p-5">
            <p className="text-[14.5px] leading-relaxed text-neutral-900">
              Compare my easy running pace trend this year with Jan, Feb, March pace and easy HR.
            </p>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-[12.5px] text-neutral-500">Sonnet 4.6</span>
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#cc785c] text-white">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* thinking pill */}
          <div className="rounded-full border border-neutral-200/80 bg-[#ece6dc]/60 px-4 py-2 text-[12.5px] text-neutral-600">
            Grouping easy runs by month and comparing pace to HR efficiency<span className="ml-1 tracking-widest text-neutral-400">. . .</span>
          </div>

          {/* tools card */}
          <div className="rounded-2xl border border-neutral-200/80 bg-white p-5">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#cc785c]" />
              <span className="font-mono text-[11px] tracking-[0.18em] text-neutral-700">USING CHIRONA TOOLS</span>
              <span className="ml-1 rounded-full border border-[#cc785c]/40 px-2 py-[2px] font-mono text-[10px] tracking-[0.15em] text-[#cc785c]">
                CHIRONA
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <ToolChip source="STRAVA" name="get-strava-easy-runs" />
              <ToolChip source="STRAVA" name="compare-strava-periods" />
              <ToolChip source="STRAVA" name="chart-easy-pace-trend" />
              <ToolChip source="COROS" name="get-coros-training-zones" />
            </div>

            <p className="mt-5 text-[13.5px] leading-relaxed text-neutral-700">
              Claude is filtering your easy runs by month, charting pace against easy-run HR,
              and using your zones to spot whether efficiency is improving.
            </p>
          </div>

          {/* chart card */}
          <div className="rounded-2xl border border-neutral-200/80 bg-white p-5">
            <div className="flex items-center justify-between text-[12px] text-neutral-500">
              <span>Easy runs</span>
              <span>Jan – March</span>
              <span>Pace vs HR</span>
            </div>

            <div className="relative mt-6 h-[180px]">
              {/* grid lines */}
              <div className="absolute inset-x-0 top-0 h-px bg-neutral-200" />
              <div className="absolute inset-x-0 top-1/2 h-px bg-neutral-200" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-neutral-200" />

              {/* trend line */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polyline
                  points={months.map((p) => `${p.x},${p.y}`).join(" ")}
                  fill="none"
                  stroke="#cc785c"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
                {months.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r="1.4" fill="#cc785c" />
                ))}
              </svg>

              {/* bars + labels */}
              {months.map((p, i) => (
                <div
                  key={i}
                  className="absolute flex flex-col items-center"
                  style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%,-50%)" }}
                >
                  <div className="absolute -top-6 whitespace-nowrap text-[12px] font-medium text-neutral-700">
                    {p.pace}
                  </div>
                  <div className="h-[58px] w-[34px] rounded-md bg-[#8aa9ff]/80" />
                  <div className="absolute top-[60%] whitespace-nowrap text-[12px] text-neutral-700">
                    {p.bpm} bpm
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between px-1 text-[13px] text-neutral-700">
              {months.map((p) => (
                <span key={p.m}>{p.m}</span>
              ))}
            </div>

            {/* metric grid */}
            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <MetricCard label="JAN" value="5:23/km at 149 bpm" />
              <MetricCard label="FEB" value="5:17/km at 147 bpm" />
              <MetricCard label="MAR" value="5:08/km at 145 bpm" />
              <MetricCard label="TREND" value="Faster pace, lower easy HR" />
            </div>

            <InsightBlock label="WHAT CHANGED">
              Your easy-run pace improved each month while average easy HR dropped, which
              usually points to stronger aerobic efficiency rather than simply running harder.
            </InsightBlock>
            <InsightBlock label="HOW CLAUDE KNOWS">
              It grouped easy runs using your training zones, compared month-by-month pace
              and HR, and then summarized the direction of change for you.
            </InsightBlock>
          </div>

          <p className="px-1 pt-2 text-[13.5px] leading-relaxed text-neutral-700">
            Your easy pace trend is moving the right way: from roughly 5:23/km in January
            to 5:08/km in March, while easy HR fell from about 149 bpm to 145 bpm, which
            suggests improving aerobic efficiency.
          </p>
        </div>
      </div>
    </section>
  );
}

function ClaudeStar() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="#cc785c">
      <path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2z" />
    </svg>
  );
}

function ToolChip({ source, name }: { source: string; name: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-[#fdf6f1] px-2 py-1.5">
      <span className="rounded-full bg-white px-2 py-[2px] font-mono text-[10px] tracking-[0.15em] text-[#cc785c]">
        {source}
      </span>
      <span className="font-mono text-[12px] text-neutral-800">{name}</span>
      <span className="ml-auto text-neutral-400">›</span>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3">
      <div className="font-mono text-[10.5px] tracking-[0.18em] text-neutral-500">{label}</div>
      <div className="mt-1 text-[13.5px] font-medium text-neutral-900">{value}</div>
    </div>
  );
}

function InsightBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-3 rounded-xl border border-neutral-200 bg-[#f5f0e8]/70 px-4 py-3">
      <div className="font-mono text-[10.5px] tracking-[0.18em] text-neutral-500">{label}</div>
      <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-700">{children}</p>
    </div>
  );
}
