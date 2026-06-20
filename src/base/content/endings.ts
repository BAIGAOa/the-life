import GenericIncident from "../content-base/incident/GenericIncident.js";

/*
 * 25 distinct life endings across 5 categories.
 * Each ending has children=[], theEnd=true so auto-advance stops here.
 */

function ending(name: string, title: string, descKey: string, msg: string) {
  return new GenericIncident({
    name,
    title,
    descKey,
    children: [],
    theEnd: true,
    message: msg,
  });
}

export function registerEndings(): void {
  /* ── Glorious (5) ─────────────────────────────────── */
  ending(
    "ending_scholar",
    "events.ending.scholar",
    "events.ending.scholar.desc",
    "Your treatises reshape human knowledge. Universities chant your name. The world thinks differently because you existed.",
  );
  ending(
    "ending_visionary",
    "events.ending.visionary",
    "events.ending.visionary.desc",
    "Nations follow the path you charted. Your vision outlasts empires.",
  );
  ending(
    "ending_artisan",
    "events.ending.artisan",
    "events.ending.artisan.desc",
    "Your creations outlive centuries. Each piece whispers your devotion to craft.",
  );
  ending(
    "ending_hero",
    "events.ending.hero",
    "events.ending.hero.desc",
    "They sing songs of your victories. The battlefield remembers your courage.",
  );
  ending(
    "ending_sage",
    "events.ending.sage",
    "events.ending.sage.desc",
    "Generations seek your counsel. Your wisdom becomes the foundation of a new tradition.",
  );

  /* ── Contented (5) ────────────────────────────────── */
  ending(
    "ending_farmer",
    "events.ending.farmer",
    "events.ending.farmer.desc",
    "The earth you tilled remembers. Seasons passed in quiet rhythm, and the land repaid your care.",
  );
  ending(
    "ending_parent",
    "events.ending.parent",
    "events.ending.parent.desc",
    "Your children carry your love forward. In their eyes, you see your own beginning.",
  );
  ending(
    "ending_merchant",
    "events.ending.merchant",
    "events.ending.merchant.desc",
    "A life of fair deals and quiet prosperity. Your handshake was your bond.",
  );
  ending(
    "ending_teacher",
    "events.ending.teacher",
    "events.ending.teacher.desc",
    "Knowledge passed, one student at a time. The ripples of your patience spread beyond measure.",
  );
  ending(
    "ending_servant",
    "events.ending.servant",
    "events.ending.servant.desc",
    "You served something greater than yourself. In service, you found meaning.",
  );

  /* ── Tragic / Dark (5) ────────────────────────────── */
  ending(
    "ending_consumption",
    "events.ending.consumption",
    "events.ending.consumption.desc",
    "Disease claims you before your time. The cough that would not leave, the fever that would not break.",
  );
  ending(
    "ending_war",
    "events.ending.war",
    "events.ending.war.desc",
    "The battlefield takes everything. Your last thought was of home.",
  );
  ending(
    "ending_betrayed",
    "events.ending.betrayed",
    "events.ending.betrayed.desc",
    "Those you trusted most destroy you. The knife was held by a friend.",
  );
  ending(
    "ending_prisoner",
    "events.ending.prisoner",
    "events.ending.prisoner.desc",
    "The cell walls become your world. Years blur into the grey of stone and silence.",
  );
  ending(
    "ending_destitute",
    "events.ending.destitute",
    "events.ending.destitute.desc",
    "Hunger and cold are your final companions. The world moved on without you.",
  );

  /* ── Ironic / Satirical (5) ───────────────────────── */
  ending(
    "ending_bureaucrat",
    "events.ending.bureaucrat",
    "events.ending.bureaucrat.desc",
    "Buried under the paperwork you created. Form 7C, subsection 12, remains unsigned.",
  );
  ending(
    "ending_tyrant",
    "events.ending.tyrant",
    "events.ending.tyrant.desc",
    "You became what you swore to destroy. The revolutionary's statue now wears a crown.",
  );
  ending(
    "ending_prophet",
    "events.ending.prophet",
    "events.ending.prophet.desc",
    "Your disciples realize you were ordinary all along. The temple empties by noon.",
  );
  ending(
    "ending_miser",
    "events.ending.miser",
    "events.ending.miser.desc",
    "You die clutching your fortune, alone. The coins are cold against your chest.",
  );
  ending(
    "ending_fame",
    "events.ending.fame",
    "events.ending.fame.desc",
    "The crowd's adoration suffocates you. You longed for silence, but the applause never stopped.",
  );

  /* ── Redemption (5) ───────────────────────────────── */
  ending(
    "ending_reformed",
    "events.ending.reformed",
    "events.ending.reformed.desc",
    "From darkness, you walked into light. Every step was a battle, and you won.",
  );
  ending(
    "ending_late_bloomer",
    "events.ending.late_bloomer",
    "events.ending.late_bloomer.desc",
    "Success came when all seemed lost. The final chapter was the brightest.",
  );
  ending(
    "ending_sacrifice",
    "events.ending.sacrifice",
    "events.ending.sacrifice.desc",
    "Your death saves countless others. One life, freely given, changes everything.",
  );
  ending(
    "ending_sage_mountain",
    "events.ending.sage_mountain",
    "events.ending.sage_mountain.desc",
    "Peace found in solitude, wisdom shared freely. The mountain asked nothing of you.",
  );
  ending(
    "ending_letter",
    "events.ending.letter",
    "events.ending.letter.desc",
    "One act of kindness changes everything. A letter, sent years ago, finds its recipient at last.",
  );
}
