import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgentReveal from "./AgentReveal";
import { useI18n } from "@/i18n/I18nProvider";

type Role = "duelist" | "controller" | "sentinel" | "initiator";

export type Agent = {
  id: string;
  name: string;
  role: Role;
  img: string; // grid icon (displayIcon)
  fullPortrait?: string; // reveal image
  description?: string;
  abilities?: {
    slot: string;
    name: string;
    description: string;
    icon?: string;
  }[];
  color: string; // tailwind gradient
};

function norm(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

const ROLE_COLOR: Record<Role, string> = {
  duelist: "from-rose-600 to-rose-800",
  controller: "from-violet-600 to-violet-800",
  sentinel: "from-amber-500 to-amber-700",
  initiator: "from-sky-600 to-sky-800",
};

const ROLE_TAG: Record<Role, string> = {
  duelist: "border-rose-500/50 bg-rose-500/15 text-rose-300",
  controller: "border-violet-500/50 bg-violet-500/15 text-violet-300",
  sentinel: "border-amber-500/50 bg-amber-500/15 text-amber-300",
  initiator: "border-sky-500/50 bg-sky-500/15 text-sky-300",
};

export default function AgentPicker() {
  const [locked, setLocked] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<string | null>(null);
  const [picking, setPicking] = useState(false);
  const [highlight, setHighlight] = useState<string | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [tab, setTab] = useState<"all" | Role>("all");
  const [resultAgent, setResultAgent] = useState<Agent | null>(null);

  const unlockedAgents = useMemo(
    () => agents.filter((a) => !locked.has(a.id)),
    [agents, locked],
  );

  useEffect(() => {
    const cached = localStorage.getItem("valo_agents_full");
    if (cached) {
      try {
        setAgents(JSON.parse(cached));
      } catch {}
    }
    fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true")
      .then((r) => r.json())
      .then((json) => {
        if (!json || !json.data) return;
        const list: Agent[] = (json.data as any[])
          .map((it) => {
            const roleName = String(it.role?.displayName || "").toLowerCase();
            const role = (roleName as Role) ?? "duelist";
            const img = it.displayIcon || it.displayIconSmall || "";
            const fullPortrait =
              it.fullPortrait || it.bustPortrait || it.displayIcon || "";
            const name = String(it.displayName || "");
            const id = String(it.uuid || norm(name));
            const description = String(it.description || "");
            const abilities = Array.isArray(it.abilities)
              ? it.abilities.map((ab: any) => ({
                  slot: String(ab.slot || ""),
                  name: String(ab.displayName || ""),
                  description: String(ab.description || ""),
                  icon: ab.displayIcon || undefined,
                }))
              : [];
            const color = ROLE_COLOR[role] ?? "from-slate-600 to-slate-800";
            return {
              id,
              name,
              role: role as Role,
              img,
              fullPortrait,
              description,
              abilities,
              color,
            } as Agent;
          })
          .filter((a) => !!a.img && !!a.name);
        if (list.length) {
          setAgents(list);
          try {
            localStorage.setItem("valo_agents_full", JSON.stringify(list));
          } catch {}
        }
      })
      .catch(() => {});
  }, []);

  const toggleLock = (id: string) => {
    if (picking) return;
    setLocked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      if (next.has(selected || "") && selected === id) setSelected(null);
      return next;
    });
  };

  const pickRandom = () => {
    if (picking) return;
    const pool =
      tab === "all"
        ? unlockedAgents
        : unlockedAgents.filter((a) => a.role === tab);
    if (pool.length === 0) return;
    setPicking(true);
    try {
      if (navigator.vibrate) navigator.vibrate([25, 30, 25]);
    } catch {}
    const idx = Math.floor(Math.random() * pool.length);
    const choice = pool[idx]!;
    setSelected(choice.id);
    setHighlight(null);
    setResultAgent(choice);
  };

  const lockAll = () => !picking && setLocked(new Set(agents.map((a) => a.id)));
  const unlockAll = () => !picking && setLocked(new Set());

  const { t } = useI18n();
  return (
    <div className="w-full">
      <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div className="text-sm text-muted-foreground">
          {t("agents.enabled", {
            n: unlockedAgents.length,
            total: agents.length,
          })}
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={unlockAll}
            disabled={picking}
          >
            {t("agents.enableAll")}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={lockAll}
            disabled={picking}
          >
            {t("agents.disableAll")}
          </Button>
          <Button
            size="sm"
            onClick={pickRandom}
            disabled={unlockedAgents.length === 0 || picking}
          >
            {picking ? t("agents.picking") : t("agents.pick")}
          </Button>
        </div>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="sentinel">{t("role.sentinel")}</TabsTrigger>
          <TabsTrigger value="initiator">{t("role.initiator")}</TabsTrigger>
          <TabsTrigger value="controller">{t("role.controller")}</TabsTrigger>
          <TabsTrigger value="duelist">{t("role.duelist")}</TabsTrigger>
        </TabsList>
      </Tabs>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {agents
          .filter((a) => (tab === "all" ? true : a.role === tab))
          .map((a) => {
            const isLocked = locked.has(a.id);
            const isSelected = selected === a.id;
            const isHighlight = highlight === a.id;
            return (
              <li key={a.id}>
                <motion.div
                  layout
                  onClick={() => toggleLock(a.id)}
                  role="button"
                  tabIndex={0}
                  className={cn(
                    "group relative overflow-hidden rounded-xl border p-2 shadow transition cursor-pointer",
                    isSelected && "ring-2 ring-primary",
                    isHighlight && "ring-2 ring-accent",
                    "bg-card/50",
                  )}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0, scale: isHighlight ? 1.03 : 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <div
                    className={cn(
                      "absolute -inset-px rounded-xl bg-gradient-to-br opacity-20",
                      a.color,
                    )}
                  />
                  <div
                    className={cn(
                      "relative z-10 flex flex-col gap-3",
                      isLocked && "opacity-60 contrast-75",
                    )}
                  >
                    <div className="relative w-full aspect-square overflow-hidden rounded-lg border bg-black/20 shadow-inner">
                      <img
                        src={a.img}
                        alt={a.name}
                        className={cn(
                          "block h-full w-full object-contain p-1 transition",
                          isLocked && "grayscale brightness-75 opacity-80",
                        )}
                      />
                      {/* streak when highlighting */}
                      {isHighlight && (
                        <motion.div
                          initial={{ x: "-150%", rotate: 12 }}
                          animate={{ x: "150%" }}
                          transition={{
                            duration: 0.35,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="pointer-events-none absolute top-1/3 left-0 h-10 w-[160%] -rotate-12 bg-gradient-to-r from-transparent via-white/50 to-transparent mix-blend-screen blur"
                        />
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" />
                      <div
                        className={cn(
                          "absolute right-1.5 top-1.5 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider",
                          ROLE_TAG[a.role],
                          isLocked && "opacity-70",
                        )}
                      >
                        {t(`role.${a.role}`)}
                      </div>
                    </div>

                    <div
                      className={cn(
                        "text-sm font-semibold text-center md:text-base",
                        isLocked &&
                          "line-through decoration-primary/70 decoration-2",
                      )}
                    >
                      {a.name}
                    </div>
                  </div>
                </motion.div>
              </li>
            );
          })}
      </ul>

      <div className="mt-4 text-sm text-muted-foreground">
        Tip: click agents to disable/enable them. Pick Random reveals an agent
        in a night-market style overlay.
      </div>

      {resultAgent && (
        <AgentReveal
          key={resultAgent.id}
          agent={resultAgent}
          isLocked={locked.has(resultAgent.id)}
          onLock={(ag) => {
            setLocked((prev) => {
              const next = new Set(prev);
              next.add(ag.id);
              return next;
            });
            setResultAgent(null);
            setPicking(false);
          }}
          onRepick={() => {
            const pool =
              tab === "all"
                ? unlockedAgents
                : unlockedAgents.filter((a) => a.role === tab);
            if (pool.length === 0) return;
            try {
              if (navigator.vibrate) navigator.vibrate([20, 30, 20]);
            } catch {}
            const idx = Math.floor(Math.random() * pool.length);
            const choice = pool[idx]!;
            setSelected(choice.id);
            setResultAgent(choice);
          }}
          onClose={() => {
            setResultAgent(null);
            setPicking(false);
          }}
        />
      )}
    </div>
  );
}
