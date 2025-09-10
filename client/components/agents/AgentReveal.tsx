import { motion } from "framer-motion";
import type { Agent } from "./AgentPicker";
import { cn } from "@/lib/utils";
import { useEffect, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";

const ROLE_RING: Record<Agent["role"], string> = {
  duelist: "ring-rose-500",
  controller: "ring-violet-500",
  sentinel: "ring-amber-400",
  initiator: "ring-sky-500",
};

export default function AgentReveal({
  agent,
  onClose,
  onLock,
  onRepick,
  isLocked = false,
}: {
  agent: Agent;
  onClose: () => void;
  onLock: (agent: Agent) => void;
  onRepick: () => void;
  isLocked?: boolean;
}) {
  // Haptic vibration on reveal (best-effort)
  useEffect(() => {
    try {
      if (navigator.vibrate) navigator.vibrate([20, 30, 20]);
    } catch {}
  }, []);

  const ringClass = useMemo(
    () => ROLE_RING[agent.role] || "ring-primary",
    [agent.role],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] grid place-items-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Card container */}
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border bg-card/70 p-6 shadow-2xl ring-2",
            ringClass,
          )}
        >
          {/* Closed doors */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-br from-slate-900 to-slate-800"
          />
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-tl from-slate-900 to-slate-800"
          />

          {/* Glow pulse */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 0.6, 1], scale: [0.8, 1.02, 1] }}
            transition={{ duration: 0.9, times: [0, 0.5, 0.75, 1] }}
            className={cn(
              "pointer-events-none absolute -inset-8 rounded-3xl blur-2xl",
              `bg-gradient-to-br ${agent.color}`,
            )}
          />

          {/* Streak FX */}
          <motion.div
            initial={{ x: "-140%", rotate: 12 }}
            animate={{ x: "140%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="pointer-events-none absolute top-1/3 left-0 h-24 w-[140%] -rotate-12 bg-gradient-to-r from-transparent via-white/70 to-transparent mix-blend-screen blur-md"
          />
          <motion.div
            initial={{ x: "140%", rotate: -10 }}
            animate={{ x: "-140%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="pointer-events-none absolute bottom-6 left-0 h-16 w-[140%] -rotate-12 bg-gradient-to-r from-transparent via-white/40 to-transparent mix-blend-screen blur"
          />

          {/* Content */}
          <div className="relative z-10 grid gap-6 md:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border bg-black/30">
              <img
                src={agent.fullPortrait || agent.img}
                alt={agent.name}
                className="block h-full w-full object-contain p-2"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div>
              <div className="text-2xl font-extrabold tracking-wide">
                {agent.name}
              </div>
              {agent.description && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {agent.description}
                </p>
              )}
              <Tabs
                defaultValue={agent.abilities && agent.abilities[0]?.slot}
                className="mt-4"
              >
                <TabsList>
                  {(agent.abilities || []).map((ab) => (
                    <TabsTrigger key={ab.slot} value={ab.slot}>
                      {ab.name || ab.slot}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {(agent.abilities || []).map((ab) => (
                  <TabsContent key={ab.slot} value={ab.slot} className="mt-3">
                    <div className="flex items-start gap-3">
                      {ab.icon && (
                        <img
                          src={ab.icon}
                          alt={ab.name}
                          className="h-10 w-10 rounded border bg-black/20 object-contain p-1"
                        />
                      )}
                      <div>
                        <div className="text-sm font-semibold">{ab.name}</div>
                        <p className="text-sm text-muted-foreground">
                          {ab.description}
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button
            className="flex-1"
            variant="destructive"
            onClick={() => onLock(agent)}
            disabled={isLocked}
          >
            {isLocked
              ? useI18n().t("reveal.disabled")
              : useI18n().t("reveal.disable")}
          </Button>
          <Button className="flex-1" variant="default" onClick={onRepick}>
            {useI18n().t("reveal.repick")}
          </Button>
          <Button className="flex-1" variant="secondary" onClick={onClose}>
            {useI18n().t("reveal.close")}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
