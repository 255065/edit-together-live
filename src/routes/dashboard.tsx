import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Set up listener FIRST per Supabase auth best practices
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
      <div className="flex min-h-screen items-center justify-center text-sm text-neutral-500">
        Indlæser…
      </div>
    );
  }

  return (
    <div className="evr-dark">
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="font-semibold">
            EvolveRun
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-neutral-400 sm:inline">{email}</span>
            <Button onClick={signOut} variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10">
              Log ud
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="evr-headline text-4xl">
          Velkommen, <span className="evr-emphasis">{email?.split("@")[0]}</span>
        </h1>
        <p className="mt-4 text-neutral-400">
          Dashboard UI bliver porteret i næste fase. Auth virker — du er logget ind.
        </p>
      </main>
    </div>
  );
}
