import AgentPicker from "@/components/agents/AgentPicker";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";

export default function Index() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

      <section className="container pb-6 pt-12 md:pb-10 md:pt-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl text-balance text-4xl font-extrabold tracking-tight md:text-6xl"
        >
          {useI18n().t("home.title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-3 max-w-2xl text-lg text-muted-foreground"
        >
          {useI18n().t("home.desc")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-10"
        >
          <AgentPicker />
        </motion.div>
      </section>
    </main>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border bg-card/50 p-6">
      <div className="text-2xl font-extrabold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
