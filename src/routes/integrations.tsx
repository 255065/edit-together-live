import { createFileRoute, Link } from "@tanstack/react-router";
import evrLogo from "@/assets/evr-logo.png";

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations — EvolveRun" },
      {
        name: "description",
        content:
          "Connect your training stack to Claude and ChatGPT. EvolveRun brings workout history, recovery, and planned sessions into the AI assistants you already use.",
      },
      { property: "og:title", content: "Integrations — EvolveRun" },
      {
        property: "og:description",
        content:
          "Bring Strava, Garmin, and COROS data into Claude and ChatGPT through EvolveRun.",
      },
    ],
  }),
  component: IntegrationsPage,
});

function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] text-neutral-950">
      <Nav />
      <main className="mx-auto max-w-[860px] px-8 pt-20 pb-28">
        <div className="font-mono text-[12px] uppercase tracking-[0.22em] text-neutral-500">
          Integrations
        </div>
        <h1 className="evr-headline mt-6 text-[clamp(40px,6vw,64px)] font-semibold leading-[1.02] tracking-[-0.035em]">
          Connect your training stack to Claude and ChatGPT.
        </h1>
        <p className="mt-6 max-w-[44rem] text-[17px] leading-relaxed text-neutral-600">
          EvolveRun brings workout history, recovery signals, planned sessions, and
          device context from your training apps into the AI assistants you already use.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-lg bg-neutral-950 px-6 py-3 text-[14.5px] font-medium text-white"
          >
            Get started
          </Link>
          <a
            href="#what"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white/70 px-5 py-3 text-[14.5px] text-neutral-950"
          >
            View pricing
          </a>
        </div>

        {/* AI assistants card */}
        <section className="mt-14 rounded-3xl bg-white px-8 py-9 shadow-[0_18px_50px_-30px_rgba(60,40,20,0.25)]">
          <h2 className="text-[22px] font-semibold tracking-[-0.015em]">AI assistants</h2>
          <p className="mt-2 text-[15px] text-neutral-600">
            Install EvolveRun once, then authorize your account in the assistant.
          </p>

          <div className="mt-7 divide-y divide-neutral-200">
            <AssistantRow
              name="Claude"
              desc="Ask natural-language training questions with EvolveRun connected as an MCP server."
              logo={
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5ede5]">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="#cc785c">
                    <path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2z" />
                  </svg>
                </div>
              }
            />
            <AssistantRow
              name="ChatGPT"
              desc="Bring the same connected training context into ChatGPT custom connectors."
              logo={
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef2ef]">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="#10a37f" strokeWidth="1.6">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8 12h8M12 8v8" />
                  </svg>
                </div>
              }
            />
          </div>
        </section>

        {/* What your assistant can use */}
        <section id="what" className="mt-8 rounded-3xl bg-white px-8 py-9 shadow-[0_18px_50px_-30px_rgba(60,40,20,0.25)]">
          <h2 className="text-[22px] font-semibold tracking-[-0.015em]">
            What your assistant can use
          </h2>
          <div className="mt-7 divide-y divide-neutral-200">
            <CapabilityRow
              title="Activities and routes"
              desc="Runs, rides, routes, splits, pace, power, heart rate, laps, and training volume."
            />
            <CapabilityRow
              title="Recovery and readiness"
              desc="Sleep, HRV, strain, readiness, body metrics, and daily wellness context where available."
            />
            <CapabilityRow
              title="Plans and workouts"
              desc="Upcoming structured workouts and training-calendar context from supported providers."
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function Nav() {
  return (
    <header className="border-b border-neutral-200/70">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-8 py-[18px]">
        <Link to="/" className="flex items-center gap-2 font-semibold text-[15px]">
          <img src={evrLogo} alt="" className="h-6 w-6 object-contain mix-blend-multiply" />
          EvolveRun
        </Link>
        <nav className="hidden gap-6 text-[13.5px] text-neutral-700 md:flex">
          <Link to="/" className="hover:text-neutral-950">Home</Link>
          <Link to="/integrations" className="font-medium text-neutral-950">Integrations</Link>
          <Link to="/dashboard" className="hover:text-neutral-950">Dashboard</Link>
        </nav>
        <Link
          to="/signup"
          className="rounded-md bg-neutral-950 px-3.5 py-1.5 text-[13px] font-medium text-white"
        >
          Start free trial
        </Link>
      </div>
    </header>
  );
}

function AssistantRow({
  name,
  desc,
  logo,
}: {
  name: string;
  desc: string;
  logo: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-5 py-5 first:pt-0 last:pb-0">
      {logo}
      <div>
        <div className="text-[16.5px] font-semibold">{name}</div>
        <p className="mt-1 text-[14.5px] leading-relaxed text-neutral-600">{desc}</p>
      </div>
    </div>
  );
}

function CapabilityRow({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="py-5 first:pt-0 last:pb-0">
      <div className="text-[17px] font-semibold tracking-[-0.01em]">{title}</div>
      <p className="mt-1.5 text-[14.5px] leading-relaxed text-neutral-600">{desc}</p>
    </div>
  );
}
