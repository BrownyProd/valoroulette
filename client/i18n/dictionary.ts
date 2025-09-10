export type Locale = "en" | "es" | "fr";
export const fallbackLocale: Locale = "en";

type Dict = Record<string, string>;

type Bundle = Record<Locale, Dict>;

export const DICT: Bundle = {
  en: {
    "nav.play": "Play",
    "nav.how": "How it works",
    "nav.minigames": "Minigames",
    "btn.signin": "Sign in",
    "btn.provably": "Provably Fair",
    "home.title": "Valorant Agent Randomizer.",
    "home.desc":
      "Click agents to disable them, then pick a random one from the rest.",
    "stats.time": "< 5s",
    "stats.uptime": "99.9%",
    "stats.fair": "100%",
    "stats.time.label": "Spin duration",
    "stats.uptime.label": "Uptime target",
    "stats.fair.label": "Provably fair",
    "agents.enabled": "Enabled {n} / {total}",
    "agents.enableAll": "Enable all",
    "agents.disableAll": "Disable all",
    "agents.pick": "Pick Random",
    "agents.picking": "Picking...",
    "agents.tip":
      "Tip: click agents to disable/enable them. Pick Random reveals an agent in a night‑market style overlay.",
    "role.duelist": "Duelist",
    "role.controller": "Controller",
    "role.sentinel": "Sentinel",
    "role.initiator": "Initiator",
    "reveal.disable": "Disable Agent",
    "reveal.disabled": "Disabled",
    "reveal.repick": "Repick",
    "reveal.close": "Close",
    "how.title": "How Valoroulette Works",
    "how.lead":
      "Disable agents you don’t want, then roll a uniform random choice from the remaining pool. We reveal the selection with a Night‑Market style animation using the agent’s full portrait.",
    "how.data": "Data sources",
    "how.rules": "Selection rules",
    "how.algoTitle": "Randomness algorithm",
    "how.revealTitle": "Reveal animation",
    "how.revealCopy":
      "The Night‑Market style reveal opens sliding panels with colored glow. The chosen agent is computed first; animation does not affect randomness.",
    "footer.terms": "Terms",
    "footer.privacy": "Privacy",
    "footer.provably": "Provably fair",
    "minigames.title": "Party Minigames",
    "games.noComms":
      "Play a round without voice; one player types a single word hint each round.",
    "games.sheriff":
      "Custom: Only Sheriffs allowed. First to 10 headshots wins.",
    "games.ability":
      "Each player bans one ability for the enemy team before round start.",
    "games.eco":
      "Everyone buys only Classic/Shorty. Utility allowed; no armor.",
    "games.knife": "Attackers knives only; defenders pistols. Swap next round.",
    "games.site":
      "Team rolls a random site and must commit every time until switch.",
    "games.viperWall":
      "Lay Viper’s Toxic Screen as a maze. Attackers must pass through blindfolded (minimap off) guided by teammates.",
    "games.sageNoHeals":
      "Play with Sage but no heals or res. Her walls must be used for jumps and creative boosts only.",
    "games.jettDash":
      "Only Jett can move freely; others freeze unless Jett dashes. Jett tags someone by dashing past them—roles swap.",
    "games.omenTP":
      "Omen hides using Shrouded Step/TP. Seekers must locate him before time runs out.",
    "games.sovaRecon":
      "Sova fires recon. Anyone fully revealed must freeze for 2 seconds; team protects them.",
    "games.killjoyLock":
      "Defenders must plant Killjoy Lockdown and attackers rush to escape radius before detonation.",
    "games.phoenixFlash":
      "Phoenix throws a curved flash from spawn; opponents predict and turn. Fail = drop your gun for a round.",
    "games.neonRace":
      "Neon leads a sprint path; others follow without stopping. Last to keep up does a forfeit.",
    "games.skyeTrail":
      "Skye sends a Tasmanian tiger—team must stay within 5m of it. Anyone straying is out.",
    "games.reynaDismiss":
      "1v1 arena: Reyna can only secure kills while Dismissing through the duel area.",
    "lang.en": "EN",
    "lang.es": "ES",
    "lang.fr": "FR",
    "lang.label": "Language",
  },
  es: {
    "nav.play": "Jugar",
    "nav.how": "Cómo funciona",
    "nav.minigames": "Minijuegos",
    "btn.signin": "Iniciar sesión",
    "btn.provably": "Prueba de equidad",
    "home.title": "Aleatorizador de Agentes de Valorant.",
    "home.desc":
      "Haz clic en los agentes para deshabilitarlos y elige uno aleatorio del resto.",
    "stats.time": "< 5s",
    "stats.uptime": "99.9%",
    "stats.fair": "100%",
    "stats.time.label": "Duración del giro",
    "stats.uptime.label": "Disponibilidad",
    "stats.fair.label": "Justicia comprobable",
    "agents.enabled": "Habilitados {n} / {total}",
    "agents.enableAll": "Habilitar todo",
    "agents.disableAll": "Deshabilitar todo",
    "agents.pick": "Elegir al azar",
    "agents.picking": "Eligiendo...",
    "agents.tip":
      "Consejo: haz clic para (des)habilitar agentes. 'Elegir al azar' revela con una animación tipo Night‑Market.",
    "role.duelist": "Duelista",
    "role.controller": "Controlador",
    "role.sentinel": "Centinela",
    "role.initiator": "Iniciador",
    "reveal.disable": "Deshabilitar agente",
    "reveal.disabled": "Deshabilitado",
    "reveal.repick": "Volver a elegir",
    "reveal.close": "Cerrar",
    "how.title": "Cómo funciona Valoroulette",
    "how.lead":
      "Deshabilita agentes y elige uno al azar del resto. La revelación imita al Night‑Market con el retrato completo.",
    "how.data": "Fuentes de datos",
    "how.rules": "Reglas de selección",
    "how.algoTitle": "Algoritmo de aleatoriedad",
    "how.revealTitle": "Animación de revelación",
    "how.revealCopy":
      "La revelación abre paneles deslizantes con brillo. El agente se calcula primero; la animación no afecta el resultado.",
    "footer.terms": "Términos",
    "footer.privacy": "Privacidad",
    "footer.provably": "Prueba de equidad",
    "minigames.title": "Minijuegos en grupo",
    "games.noComms":
      "Juega una ronda sin voz; un jugador escribe una pista de una palabra.",
    "games.sheriff":
      "Personalizado: Solo Sheriffs. Primero a 10 disparos a la cabeza.",
    "games.ability":
      "Cada jugador prohíbe una habilidad del equipo enemigo antes de la ronda.",
    "games.eco":
      "Todos compran solo Classic/Shorty. Utilidad permitida; sin armadura.",
    "games.knife":
      "Atacantes solo cuchillos; defensores pistolas. Intercambia siguiente ronda.",
    "games.site":
      "El equipo sortea un sitio y debe comprometerse siempre hasta el cambio.",
    "games.viperWall":
      "Coloca la pantalla de Viper como laberinto. Atacantes pasan con minimapa apagado guiados por el equipo.",
    "games.sageNoHeals":
      "Juega con Sage sin curas ni resurrección. Sus muros solo para saltos y boosts creativos.",
    "games.jettDash":
      "Solo Jett se mueve libremente; el resto se congela salvo cuando Jett hace dash. Si te pasa cerca, estás ‘taggeado’.",
    "games.omenTP":
      "Omen se esconde usando TP. Buscadores deben encontrarlo antes de que termine el tiempo.",
    "games.sovaRecon":
      "Sova lanza recon. Quien quede revelado se congela 2s; su equipo lo cubre.",
    "games.killjoyLock":
      "Defensores deben plantar Lockdown y atacantes correr fuera del radio antes de detonar.",
    "games.phoenixFlash":
      "Phoenix lanza flash curvada desde base; rivales predicen y giran. Fallo = suelta el arma una ronda.",
    "games.neonRace":
      "Neon marca un recorrido; los demás siguen sin parar. Último en mantener el ritmo paga penitencia.",
    "games.skyeTrail":
      "Skye envía el lobo; todos deben mantenerse a 5m. Quien se aleje queda fuera.",
    "games.reynaDismiss":
      "1v1: Reyna solo puede asegurar bajas mientras usa Dismiss en la arena.",
    "lang.en": "EN",
    "lang.es": "ES",
    "lang.fr": "FR",
    "lang.label": "Idioma",
  },
  fr: {
    "nav.play": "Jouer",
    "nav.how": "Fonctionnement",
    "nav.minigames": "Mini‑jeux",
    "btn.signin": "Se connecter",
    "btn.provably": "Équité vérifiable",
    "home.title": "Randomiseur d’agents Valorant.",
    "home.desc":
      "Cliquez sur les agents pour les désactiver, puis tirez-en un au hasard.",
    "stats.time": "< 5s",
    "stats.uptime": "99,9%",
    "stats.fair": "100%",
    "stats.time.label": "Durée du tirage",
    "stats.uptime.label": "Disponibilité",
    "stats.fair.label": "Équité vérifiable",
    "agents.enabled": "Activés {n} / {total}",
    "agents.enableAll": "Activer tout",
    "agents.disableAll": "Désactiver tout",
    "agents.pick": "Tirage au sort",
    "agents.picking": "Tirage...",
    "agents.tip":
      "Astuce : cliquez pour (dé)activer des agents. Le tirage révèle via une animation type Night‑Market.",
    "role.duelist": "Dueliste",
    "role.controller": "Contrôleur",
    "role.sentinel": "Sentinelle",
    "role.initiator": "Initiateur",
    "reveal.disable": "Désactiver l’agent",
    "reveal.disabled": "Désactivé",
    "reveal.repick": "Re‑tirer",
    "reveal.close": "Fermer",
    "how.title": "Fonctionnement de Valoroulette",
    "how.lead":
      "Désactivez des agents puis tirez uniformément parmi le reste. Révélation style Night‑Market avec portrait complet.",
    "how.data": "Sources de données",
    "how.rules": "Règles de sélection",
    "how.algoTitle": "Algorithme de tirage",
    "how.revealTitle": "Animation de révélation",
    "how.revealCopy":
      "La révélation ouvre des panneaux coulissants avec une lueur colorée. L’agent est choisi avant ; l’animation n’influence pas le hasard.",
    "footer.terms": "Conditions",
    "footer.privacy": "Confidentialité",
    "footer.provably": "Équité vérifiable",
    "minigames.title": "Mini‑jeux de groupe",
    "games.noComms":
      "Une manche sans vocal ; un joueur tape un indice d’un mot.",
    "games.sheriff": "Perso : Seulement Sheriffs. Premier à 10 têtes.",
    "games.ability":
      "Chaque joueur bannit une capacité de l’équipe adverse avant la manche.",
    "games.eco":
      "Tous achètent seulement Classic/Shorty. Utilitaires ok ; sans armure.",
    "games.knife":
      "Attaquants couteaux uniquement ; défenseurs pistolets. Inverser au round suivant.",
    "games.site":
      "L’équipe tire un site et doit s’y engager jusqu’au changement.",
    "games.viperWall":
      "Placez l’écran de Viper en labyrinthe. Attaquants traversent (minicarte off) guidés par l’équipe.",
    "games.sageNoHeals":
      "Jouez Sage sans soins ni résurrection. Ses murs servent à des sauts/boosts créatifs uniquement.",
    "games.jettDash":
      "Seule Jett bouge librement ; les autres sont figés sauf pendant son dash. Touché par le dash = rôle inversé.",
    "games.omenTP":
      "Omen se cache via TP. Les chercheurs doivent le trouver avant la fin du temps.",
    "games.sovaRecon":
      "Sova tire un recon. Toute personne révélée reste immobile 2s ; l’équipe la protège.",
    "games.killjoyLock":
      "Les défenseurs posent Lockdown, les attaquants doivent sortir du rayon avant la détonation.",
    "games.phoenixFlash":
      "Phoenix lance un flash courbé depuis le spawn ; adversaires anticipent et se retournent. Échec = lâcher l’arme une manche.",
    "games.neonRace":
      "Neon trace une course ; les autres suivent sans s’arrêter. Le dernier à tenir a un gage.",
    "games.skyeTrail":
      "Skye envoie son tigre ; l’équipe doit rester à 5 m. Qui s’éloigne est éliminé.",
    "games.reynaDismiss":
      "1v1 : Reyna ne valide les kills qu’en Dismiss dans l’arène.",
    "lang.en": "EN",
    "lang.es": "ES",
    "lang.fr": "FR",
    "lang.label": "Langue",
  },
};
