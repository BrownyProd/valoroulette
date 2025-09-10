import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ITEM_W = 160; // px
const GAP = 12; // px
const SLOT = ITEM_W + GAP;
const REPEAT = 40; // long track for smooth spin

type Role = "duelist" | "controller" | "sentinel" | "initiator";

type Agent = {
  id: string;
  name: string;
  role: Role;
  color: string; // gradient color
};

const AGENTS: Agent[] = [
  // Duelists
  {
    id: "jett",
    name: "Jett",
    role: "duelist",
    color: "from-sky-500 to-sky-600",
  },
  {
    id: "raze",
    name: "Raze",
    role: "duelist",
    color: "from-orange-400 to-amber-500",
  },
  {
    id: "reyna",
    name: "Reyna",
    role: "duelist",
    color: "from-fuchsia-500 to-purple-600",
  },
  {
    id: "yoru",
    name: "Yoru",
    role: "duelist",
    color: "from-indigo-500 to-indigo-700",
  },
  {
    id: "neon",
    name: "Neon",
    role: "duelist",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "phoenix",
    name: "Phoenix",
    role: "duelist",
    color: "from-rose-500 to-red-600",
  },
  {
    id: "iso",
    name: "Iso",
    role: "duelist",
    color: "from-pink-500 to-rose-600",
  },
  // Controllers
  {
    id: "brimstone",
    name: "Brimstone",
    role: "controller",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "omen",
    name: "Omen",
    role: "controller",
    color: "from-violet-500 to-purple-700",
  },
  {
    id: "viper",
    name: "Viper",
    role: "controller",
    color: "from-emerald-500 to-green-600",
  },
  {
    id: "astra",
    name: "Astra",
    role: "controller",
    color: "from-purple-500 to-violet-700",
  },
  {
    id: "harbor",
    name: "Harbor",
    role: "controller",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "clove",
    name: "Clove",
    role: "controller",
    color: "from-rose-500 to-rose-700",
  },
  // Sentinels
  {
    id: "sage",
    name: "Sage",
    role: "sentinel",
    color: "from-teal-500 to-emerald-600",
  },
  {
    id: "killjoy",
    name: "Killjoy",
    role: "sentinel",
    color: "from-yellow-400 to-amber-500",
  },
  {
    id: "cypher",
    name: "Cypher",
    role: "sentinel",
    color: "from-slate-500 to-slate-700",
  },
  {
    id: "chamber",
    name: "Chamber",
    role: "sentinel",
    color: "from-amber-400 to-yellow-500",
  },
  {
    id: "deadlock",
    name: "Deadlock",
    role: "sentinel",
    color: "from-gray-500 to-zinc-600",
  },
  // Initiators
  {
    id: "sova",
    name: "Sova",
    role: "initiator",
    color: "from-blue-400 to-sky-600",
  },
  {
    id: "skye",
    name: "Skye",
    role: "initiator",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "breach",
    name: "Breach",
    role: "initiator",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "fade",
    name: "Fade",
    role: "initiator",
    color: "from-indigo-500 to-blue-700",
  },
  {
    id: "kayo",
    name: "KAY/O",
    role: "initiator",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "gekko",
    name: "Gekko",
    role: "initiator",
    color: "from-lime-500 to-green-600",
  },
];

const ROLE_BORDER: Record<Role, string> = {
  duelist: "border-rose-500",
  controller: "border-violet-500",
  sentinel: "border-amber-500",
  initiator: "border-sky-500",
};

const ROLE_GLOW: Record<Role, string> = {
  duelist: "shadow-[0_0_24px_rgba(244,63,94,0.35)]",
  controller: "shadow-[0_0_24px_rgba(139,92,246,0.35)]",
  sentinel: "shadow-[0_0_24px_rgba(245,158,11,0.35)]",
  initiator: "shadow-[0_0_24px_rgba(14,165,233,0.35)]",
};

function pickRandom<T>(arr: T[]): { value: T; index: number } {
  const index = Math.floor(Math.random() * arr.length);
  return { value: arr[index]!, index };
}

export default function Roulette() {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Agent | null>(null);

  const base = AGENTS;
  const repeated = useMemo(
    () => Array.from({ length: REPEAT }, () => base).flat(),
    [base],
  );
  const centerBaseIndex = Math.floor((base.length * REPEAT) / 2);

  useEffect(() => {
    const onResize = () =>
      setContainerW(containerRef.current?.clientWidth ?? 0);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!containerW) return;
    const centerOffset = containerW / 2 - ITEM_W / 2;
    const initialX = -(centerBaseIndex * SLOT) + centerOffset;
    controls.set({ x: initialX });
  }, [containerW, centerBaseIndex, controls]);

  const onSpin = async () => {
    if (spinning || !containerW) return;
    setSpinning(true);
    setResult(null);

    const { value, index: chosenIndex } = pickRandom(base);

    const cycles = 3 + Math.floor(Math.random() * 3);
    const finalIndex = centerBaseIndex + cycles * base.length + chosenIndex;
    const centerOffset = containerW / 2 - ITEM_W / 2;
    const targetX = -(finalIndex * SLOT) + centerOffset;

    await controls.start({
      x: targetX,
      transition: { duration: 4.8, ease: [0.08, 0.6, 0.12, 1] },
    });

    setResult(value);
    setSpinning(false);
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2">
          <div className="h-6 w-0 border-x-8 border-b-8 border-x-transparent border-b-primary" />
        </div>

        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-xl border bg-gradient-to-b from-secondary/60 to-secondary p-4 shadow-xl"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

          <motion.div
            className="flex items-center"
            animate={controls}
            style={{ gap: GAP }}
          >
            {repeated.map((it, i) => (
              <div
                key={`${i}-${it.id}`}
                className={cn(
                  "relative h-36 w-[160px] shrink-0 rounded-lg border bg-card/60 p-3 text-center shadow transition-transform",
                  ROLE_BORDER[it.role],
                  ROLE_GLOW[it.role],
                )}
              >
                <div
                  className={cn(
                    "absolute -inset-px rounded-lg bg-gradient-to-br opacity-20",
                    it.color,
                  )}
                />
                <div className="relative z-10 flex h-full flex-col items-center justify-center gap-2">
                  <span className="rounded-sm bg-black/30 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white/90">
                    {it.role}
                  </span>
                  <span className="line-clamp-2 text-sm font-semibold text-white/95">
                    {it.name}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-sm text-muted-foreground">
          {result ? (
            <span>
              Selected:{" "}
              <span className="font-semibold text-foreground">
                {result.name}
              </span>{" "}
              ·
              <span
                className={cn(
                  "ml-1 rounded px-1.5 py-0.5 text-xs capitalize text-background",
                  roleToBg(result.role),
                )}
              >
                {result.role}
              </span>
            </span>
          ) : (
            <span>Press Spin to pick a random agent.</span>
          )}
        </div>
        <Button size="lg" onClick={onSpin} disabled={spinning}>
          {spinning ? "Spinning..." : "Spin"}
        </Button>
      </div>
    </div>
  );
}

function roleToBg(r: Role) {
  switch (r) {
    case "duelist":
      return "bg-rose-600";
    case "controller":
      return "bg-violet-600";
    case "sentinel":
      return "bg-amber-500";
    case "initiator":
      return "bg-sky-600";
  }
}
