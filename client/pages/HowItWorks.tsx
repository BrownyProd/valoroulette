import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

export default function HowItWorks() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

      <section className="container py-12 md:py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-3 text-balance text-4xl font-extrabold tracking-tight md:text-5xl"
        >
          {useI18n().t("how.title")}
        </motion.h1>
        <p className="max-w-3xl text-muted-foreground">
          {useI18n().t("how.lead")}
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card
            title={useI18n().t("how.data")}
            items={[
              "Agent list and portraits come from the public valorant-api.com",
              "Images are cached locally for snappy loads",
              "No login or personal data required",
            ]}
          />
          <Card
            title={useI18n().t("how.rules")}
            items={[
              useI18n().t("agents.disableAll") +
                "/" +
                useI18n().t("agents.enableAll"),
              "Only enabled agents are eligible",
              "One agent is chosen per roll (no duplicates)",
            ]}
          />
          <AlgoCard />
          <SuspenseCard />
        </div>

        <div id="provably-fair" className="mt-14">
          <h2 className="text-2xl font-bold tracking-tight">Fairness demo</h2>
          <p className="mt-1 text-muted-foreground">
            Run a quick simulation to see the distribution. In a fair picker
            each enabled agent has the same chance.
          </p>
          <Simulator />
        </div>
      </section>
    </main>
  );
}

function Card({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border bg-card/50 p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {items.map((t) => (
          <li key={t} className="flex gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AlgoCard() {
  return (
    <div className="rounded-xl border bg-card/50 p-6">
      <h3 className="text-lg font-semibold">{useI18n().t("how.algoTitle")}</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        We pick uniformly at random from the enabled list:
      </p>
      <pre className="mt-3 overflow-auto rounded-lg border bg-black/40 p-4 text-xs leading-relaxed text-white">{`const pool = enabledAgents; // already filtered
const i = Math.floor(Math.random() * pool.length);
const result = pool[i]; // each has 1/pool.length chance`}</pre>
      <p className="mt-3 text-sm text-muted-foreground">
        This yields equal probability for each enabled agent (no weighting). If
        you want seeded, verifiable rolls (provably-fair with hashes), we can
        add a client seed + server seed and reveal the server seed after the
        roll.
      </p>
    </div>
  );
}

function SuspenseCard() {
  return (
    <div className="rounded-xl border bg-card/50 p-6">
      <h3 className="text-lg font-semibold">
        {useI18n().t("how.revealTitle")}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {useI18n().t("how.revealCopy")}
      </p>
    </div>
  );
}

function Simulator() {
  const [trials, setTrials] = useState(1000);
  const agents = useMemo(
    () => [
      "Jett",
      "Raze",
      "Reyna",
      "Yoru",
      "Neon",
      "Phoenix",
      "Iso",
      "Brimstone",
      "Omen",
      "Viper",
    ],
    [],
  );

  const results = useMemo(() => {
    const counts = Object.fromEntries(agents.map((a) => [a, 0]));
    for (let i = 0; i < trials; i++) {
      const pick = Math.floor(Math.random() * agents.length);
      counts[agents[pick] as keyof typeof counts]!++;
    }
    return counts as Record<string, number>;
  }, [agents, trials]);

  const max = Math.max(...Object.values(results));

  return (
    <div className="mt-6 rounded-xl border bg-card/50 p-6">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <label className="text-muted-foreground" htmlFor="trials">
          Trials
        </label>
        <input
          id="trials"
          type="number"
          min={100}
          max={20000}
          step={100}
          value={trials}
          onChange={(e) => setTrials(Number(e.target.value) || 1000)}
          className="h-9 w-28 rounded-md border bg-background px-2 text-sm"
        />
      </div>
      <div className="mt-5 grid gap-3">
        {agents.map((a) => {
          const v = results[a] ?? 0;
          const pct = ((v / trials) * 100).toFixed(1);
          const width = max ? Math.max(2, Math.round((v / max) * 100)) : 0;
          return (
            <div key={a} className="text-sm">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-muted-foreground">{a}</span>
                <span className="tabular-nums">
                  {v} ({pct}%)
                </span>
              </div>
              <div className="h-2 rounded-full bg-secondary">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Expected: each bar ≈ {(100 / agents.length).toFixed(1)}%. With more
        trials the bars converge.
      </p>
    </div>
  );
}
