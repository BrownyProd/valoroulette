import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

type Game = {
  title: string;
  key: string; // i18n description key
  tags: string[]; // agent or item tags
  setup: string[];
  rules: string[];
  win: string[];
};

const GAMES: Game[] = [
  {
    title: "Viper Wall Maze",
    key: "games.viperWall",
    tags: ["Viper"],
    setup: [
      "Custom lobby",
      "Bind/Ascent works well",
      "Minimap off for runners",
    ],
    rules: [
      "Viper draws a maze with Toxic Screen",
      "Attackers traverse guided by teammates",
      "If touched by enemy utility, restart",
    ],
    win: ["First team to cross in under 60s"],
  },
  {
    title: "Sage No Heals",
    key: "games.sageNoHeals",
    tags: ["Sage"],
    setup: ["Standard unrated/custom"],
    rules: [
      "Sage cannot heal or res",
      "Walls must be used only for jumps/boosts",
    ],
    win: ["Team with most creative boosts gets style point, or win round"],
  },
  {
    title: "Jett Dash Tag",
    key: "games.jettDash",
    tags: ["Jett"],
    setup: ["Open map area"],
    rules: [
      "Only Jett moves freely",
      "Others freeze unless she dashes",
      "If Jett dashes past you within 2m, you’re tagged and swap",
    ],
    win: ["Last untagged player wins"],
  },
  {
    title: "Omen TP Hide & Seek",
    key: "games.omenTP",
    tags: ["Omen"],
    setup: ["Custom, defenders = seekers"],
    rules: ["Omen hides using TP/Smokes", "Seekers find him before timer"],
    win: ["Omen wins if timer ends; seekers win if found"],
  },
  {
    title: "Sova Recon Freeze",
    key: "games.sovaRecon",
    tags: ["Sova"],
    setup: ["Custom, large site"],
    rules: [
      "Whoever is fully scanned must freeze 2s",
      "Team protects frozen players",
    ],
    win: ["Survive waves for 3 minutes"],
  },
  {
    title: "Killjoy Lockdown Rush",
    key: "games.killjoyLock",
    tags: ["Killjoy"],
    setup: ["Defenders place Lockdown"],
    rules: ["Attackers must exit radius before detonation", "No stuns/slows"],
    win: ["All attackers outside = attackers win; otherwise defenders"],
  },
  {
    title: "Phoenix Flash Roulette",
    key: "games.phoenixFlash",
    tags: ["Phoenix"],
    setup: ["Spawn area line-up"],
    rules: ["Phoenix throws curved flash", "Opponents predict and turn"],
    win: ["Fail = drop weapon next round; last with weapon wins"],
  },
  {
    title: "Neon Speed Race",
    key: "games.neonRace",
    tags: ["Neon"],
    setup: ["Pick long route"],
    rules: ["Follow Neon without stopping", "No cutting corners"],
    win: ["Last to keep up does a forfeit"],
  },
  {
    title: "Skye Trail Leader",
    key: "games.skyeTrail",
    tags: ["Skye"],
    setup: ["Path with obstacles"],
    rules: ["Stay within 5m of Tasmanian tiger", "If you stray, you’re out"],
    win: ["Last remaining wins"],
  },
  {
    title: "Reyna Dismiss Duel",
    key: "games.reynaDismiss",
    tags: ["Reyna"],
    setup: ["Small arena"],
    rules: ["Reyna must secure kills while dismissing through arena"],
    win: ["First to 5 wins"],
  },
  {
    title: "Sheriff Showdown",
    key: "games.sheriff",
    tags: ["Sheriff"],
    setup: ["Any mid lane"],
    rules: ["Only Sheriffs", "Headshots = 2 points"],
    win: ["First to 10 points"],
  },
  {
    title: "Ability Draft",
    key: "games.ability",
    tags: [],
    setup: ["5v5 lobby"],
    rules: ["Each bans one ability from enemy team"],
    win: ["Win map with limitations"],
  },
  {
    title: "Eco Heroes",
    key: "games.eco",
    tags: [],
    setup: ["Pistol round settings"],
    rules: ["Only Classic/Shorty", "Utility allowed", "No armor"],
    win: ["Win 3 rounds first"],
  },
  {
    title: "Knife Tag",
    key: "games.knife",
    tags: ["Knives", "Pistols"],
    setup: ["Open area"],
    rules: ["Attackers knives only; defenders pistols", "Swap next round"],
    win: ["Most tags wins"],
  },
  {
    title: "Site Lock",
    key: "games.site",
    tags: [],
    setup: ["Map with 2-3 sites"],
    rules: ["Roll random site", "Always commit until switch"],
    win: ["First to 5 commits wins"],
  },
  {
    title: "No Comms | Guess Caller",
    key: "games.noComms",
    tags: [],
    setup: ["Text chat on"],
    rules: ["One word hint each round"],
    win: ["Guess strat correctly"],
  },
];

export default function Minigames() {
  const { t } = useI18n();
  const [active, setActive] = useState<string[]>([]);
  const tags = useMemo(() => {
    const set = new Set<string>();
    GAMES.forEach((g) => g.tags.forEach((x) => set.add(x)));
    return Array.from(set).sort();
  }, []);
  const list = useMemo(() => {
    if (active.length === 0) return GAMES;
    return GAMES.filter((g) => g.tags.some((tg) => active.includes(tg)));
  }, [active]);

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

      <section className="container pb-12 pt-12 md:pb-16 md:pt-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-balance text-4xl font-extrabold tracking-tight md:text-5xl"
        >
          {t("minigames.title")}
        </motion.h1>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <button
            className={`rounded-full border px-3 py-1 text-xs ${active.length === 0 ? "bg-primary text-primary-foreground" : "bg-background"}`}
            onClick={() => setActive([])}
          >
            All
          </button>
          {tags.map((tg) => (
            <button
              key={tg}
              className={`rounded-full border px-3 py-1 text-xs ${active.includes(tg) ? "bg-primary text-primary-foreground" : "bg-background"}`}
              onClick={() =>
                setActive((prev) =>
                  prev.includes(tg)
                    ? prev.filter((x) => x !== tg)
                    : [...prev, tg],
                )
              }
            >
              {tg}
            </button>
          ))}
        </div>

        <ul className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((g) => (
            <li key={g.title} className="h-full">
              <div className="flex h-full flex-col rounded-xl border bg-card/60 p-5 shadow-sm">
                <h3 className="text-lg font-semibold">{g.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(g.key)}</p>

                {g.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {g.tags.map((tg) => (
                      <span
                        key={tg}
                        className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {tg}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4 space-y-2 text-sm">
                  {g.setup.length > 0 && (
                    <Section title="Setup" items={g.setup} />
                  )}
                  {g.rules.length > 0 && (
                    <Section title="Rules" items={g.rules} />
                  )}
                  {g.win.length > 0 && <Section title="Win" items={g.win} />}
                </div>

                <div className="mt-auto" />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      <ul className="mt-1 list-disc space-y-1 pl-5 text-muted-foreground">
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </div>
  );
}
