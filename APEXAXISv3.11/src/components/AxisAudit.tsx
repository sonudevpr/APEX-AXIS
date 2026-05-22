import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ShieldAlert, TrendingUp, Cog, HandCoins, Megaphone } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Full 20-Question Axis Audit — 4 Engines × 5 Questions              */
/*  Binary scoring: Yes = 0 points, No = 1 point                       */
/* ------------------------------------------------------------------ */

type EngineKey = "MARKETING" | "SALES" | "OPERATIONS" | "GROWTH";

type Question = {
  id: string;
  engine: EngineKey;
  prompt: string;
};

const QUESTIONS: Question[] = [
  // ENGINE 01 — MARKETING
  { id: "m1", engine: "MARKETING", prompt: "Can your marketing generate qualified attention for 7 days without any input from you?" },
  { id: "m2", engine: "MARKETING", prompt: "Do you have a documented system for converting attention into a tracked audience?" },
  { id: "m3", engine: "MARKETING", prompt: "Is your content production sequence written down so a stranger could execute it?" },
  { id: "m4", engine: "MARKETING", prompt: "Does your distribution run on a fixed cadence, independent of your daily mood or schedule?" },
  { id: "m5", engine: "MARKETING", prompt: "Can you measure exactly how many leads each marketing action produced last month?" },

  // ENGINE 02 — SALES
  { id: "s1", engine: "SALES", prompt: "Can a prospect move from interest to purchase without a 1-on-1 call with you?" },
  { id: "s2", engine: "SALES", prompt: "Do you have a documented qualification sequence that filters out wrong-fit buyers automatically?" },
  { id: "s3", engine: "SALES", prompt: "Are your objection responses written down and tested, or improvised every time?" },
  { id: "s4", engine: "SALES", prompt: "Is your pricing structure fixed and defensible, or negotiated case-by-case?" },
  { id: "s5", engine: "SALES", prompt: "Can your sales process close revenue while you are asleep or offline?" },

  // ENGINE 03 — OPERATIONS
  { id: "o1", engine: "OPERATIONS", prompt: "Can a new client be fully onboarded without your manual involvement?" },
  { id: "o2", engine: "OPERATIONS", prompt: "Is your core service delivery documented step-by-step in an SOP?" },
  { id: "o3", engine: "OPERATIONS", prompt: "Does your fulfillment continue if you take a 7-day operational absence?" },
  { id: "o4", engine: "OPERATIONS", prompt: "Are client communications handled by a system, or by your inbox?" },
  { id: "o5", engine: "OPERATIONS", prompt: "Can you identify the exact bottleneck in your delivery process without thinking about it?" },

  // ENGINE 04 — GROWTH
  { id: "g1", engine: "GROWTH", prompt: "Do you know the exact capacity ceiling of your current operation in clients per month?" },
  { id: "g2", engine: "GROWTH", prompt: "Is there a documented plan for what changes when you hit that ceiling?" },
  { id: "g3", engine: "GROWTH", prompt: "Can you raise prices without losing the entire client base?" },
  { id: "g4", engine: "GROWTH", prompt: "Is there a structural path to higher-ticket offers built into your current model?" },
  { id: "g5", engine: "GROWTH", prompt: "Does your business have a scenario where it grows while you reduce your hours?" },
];

const ENGINE_META: Record<EngineKey, { label: string; code: string; subtitle: string; icon: typeof Megaphone; color: string }> = {
  MARKETING: { label: "Marketing Engine", code: "Engine 01", subtitle: "How attention finds you.", icon: Megaphone, color: "#7B2FBE" },
  SALES: { label: "Sales Engine", code: "Engine 02", subtitle: "How attention becomes revenue.", icon: HandCoins, color: "#F5A524" },
  OPERATIONS: { label: "Operations Engine", code: "Engine 03", subtitle: "How revenue becomes delivery.", icon: Cog, color: "#30A46C" },
  GROWTH: { label: "Growth Engine", code: "Engine 04", subtitle: "How delivery scales without you.", icon: TrendingUp, color: "#E5484D" },
};

type Zone = "GREEN" | "AMBER" | "RED";

function classifyZone(score: number): Zone {
  if (score <= 5) return "GREEN";
  if (score <= 12) return "AMBER";
  return "RED";
}

const ZONE_VERDICT: Record<
  Zone,
  { label: string; color: string; title: string; body: string[] }
> = {
  GREEN: {
    label: "Green Zone",
    color: "#30A46C",
    title: "Architecturally Sound.",
    body: [
      "Your firm operates with structural decoupling. Revenue, delivery, and growth do not collapse the moment you step away.",
      "You are in the rare 5% of solo operators who own a business rather than embody one. The next phase is scale — extending capacity without reintroducing dependency.",
    ],
  },
  AMBER: {
    label: "Amber Zone",
    color: "#F5A524",
    title: "Structural Fragility.",
    body: [
      "Your firm functions — but it functions because you are present. Strip away one week of your involvement and the architecture begins to crack.",
      "This is the most dangerous zone. Most operators die here, because the business is profitable enough to mask the dependency. You are one illness, one burnout, one bad month from collapse.",
    ],
  },
  RED: {
    label: "Red Zone",
    color: "#E5484D",
    title: "Critical Founder-Dependency Syndrome.",
    body: [
      "You do not own a firm. You are the firm.",
      "Every engine — marketing, sales, operations, growth — runs through you. Revenue stops the moment you stop. This is not a workload problem. It is a structural failure. Scaling from here without architectural intervention will accelerate collapse, not prevent it.",
    ],
  },
};

const ENGINE_DIAGNOSIS: Record<EngineKey, { title: string; body: string[] }> = {
  MARKETING: {
    title: "Your attention is manual.",
    body: [
      "You are the signal. Distribution stops the moment you stop typing. You have built a personality channel, not a marketing engine. The fix is not \"post more\" — it is documenting the system that produces the posts so it can run without your daily authorship.",
    ],
  },
  SALES: {
    title: "Your revenue is conversational.",
    body: [
      "Every dollar requires a real-time exchange with you. Pricing is negotiated, objections are improvised, closing depends on your mood. You have not built a sales engine — you have built a sales identity. The fix is converting your best conversations into a documented qualification sequence that runs without you.",
    ],
  },
  OPERATIONS: {
    title: "Your delivery is hostage to your memory.",
    body: [
      "Nothing is documented. Onboarding, fulfillment, client communication — all live in your head. The moment you step away, delivery breaks. This is the most expensive form of FDS because it is invisible until it fails catastrophically. The fix begins with one SOP, written for the most repeated task in your week.",
    ],
  },
  GROWTH: {
    title: "You have no architecture for the next level.",
    body: [
      "You know your current operation. You do not know its ceiling, its ascension path, or its escape sequence. Growth, when it arrives, will overwhelm the structure rather than scale it. The fix is building the capacity plan before you need it — not after.",
    ],
  },
};

/* Tiebreaker order: Operations → Marketing → Sales → Growth */
const ENGINE_PRIORITY: EngineKey[] = ["OPERATIONS", "MARKETING", "SALES", "GROWTH"];

export default function AxisAudit() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).length;

  // Calculate total score (No = 1 point, Yes = 0 points)
  const totalScore = useMemo(() => {
    return QUESTIONS.reduce((acc, q) => acc + (answers[q.id] === false ? 1 : 0), 0);
  }, [answers]);

  // Calculate per-engine scores
  const engineScores = useMemo(() => {
    const scores: Record<EngineKey, number> = { MARKETING: 0, SALES: 0, OPERATIONS: 0, GROWTH: 0 };
    QUESTIONS.forEach((q) => {
      if (answers[q.id] === false) {
        scores[q.engine] += 1;
      }
    });
    return scores;
  }, [answers]);

  // Current step logic for sectional flow
  const [currentStep, setCurrentStep] = useState(0); // 0: Marketing, 1: Sales, 2: Operations, 3: Growth, 4: Results
  const engineOrder: EngineKey[] = ["MARKETING", "SALES", "OPERATIONS", "GROWTH"];
  const currentEngineKey = engineOrder[currentStep];

  // Find weakest engine (most No answers, with tiebreaker)
  const weakestEngine = useMemo(() => {
    if (!submitted) return null;
    let maxScore = -1;
    let weakest: EngineKey = "MARKETING";
    for (const engine of ENGINE_PRIORITY) {
      if (engineScores[engine] > maxScore) {
        maxScore = engineScores[engine];
        weakest = engine;
      }
    }
    return weakest;
  }, [submitted, engineScores]);

  const zone = submitted ? classifyZone(totalScore) : null;

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      // Scroll to top of audit
      const element = document.getElementById("axis-audit");
      if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setSubmitted(true);
      setCurrentStep(4);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentEngineQuestions = QUESTIONS.filter(q => q.engine === currentEngineKey);
  const currentEngineAnsweredCount = currentEngineQuestions.filter(q => answers[q.id] !== undefined).length;
  const currentEngineComplete = currentEngineAnsweredCount === 5;

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const whopStarterKit = "https://whop.com/joined/apex-axis/products/axis-starter-kit/";
  const whopVault = "https://whop.com/joined/apex-axis/products/apex-vault-blueprint/";

  return (
    <div className="border border-[#1c1c1c] bg-[#0f0f0f] overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-[#1c1c1c] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6 lg:p-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-none border border-[#7b2fbe] bg-[#7b2fbe]/10">
             <span className="font-mono text-xs font-bold text-[#7b2fbe]">{currentStep + 1}</span>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7b2fbe]">
              Diagnostic / Full Audit
            </p>
            <h3 className="mt-1 text-lg font-bold tracking-tight text-white">
              {currentStep < 4 ? ENGINE_META[currentEngineKey].label : "Audit Results"}
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8a8a8a] sm:tracking-[0.28em]">
            {answeredCount} / {QUESTIONS.length}
          </div>
          <div className="h-1 w-28 bg-[#1c1c1c] sm:w-24">
            <div
              className="h-full bg-[#7b2fbe] transition-all duration-500 ease-out"
              style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Engine Sections Flow */}
      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key={currentEngineKey}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="p-4 sm:p-6 lg:p-8"
            >
              <div className="mb-8">
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = ENGINE_META[currentEngineKey].icon;
                    return <Icon className="h-4 w-4" style={{ color: ENGINE_META[currentEngineKey].color }} />;
                  })()}
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: ENGINE_META[currentEngineKey].color }}>
                    {ENGINE_META[currentEngineKey].code}
                  </p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#aaaaaa]">
                  {ENGINE_META[currentEngineKey].subtitle}
                </p>
              </div>

              <div className="space-y-8">
                {currentEngineQuestions.map((q, idx) => {
                  const answer = answers[q.id];
                  return (
                    <motion.div 
                      key={q.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.24em] text-[#7b2fbe]">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <p className="text-sm font-medium leading-relaxed text-white sm:text-[15px]">{q.prompt}</p>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3 sm:pl-8">
                        <button
                          type="button"
                          onClick={() => setAnswers((a) => ({ ...a, [q.id]: true }))}
                          className={`border px-4 py-3 text-[11px] font-mono uppercase tracking-widest transition-all sm:px-6 ${
                            answer === true
                              ? "border-[#30A46C] bg-[#30A46C]/10 text-white"
                              : "border-[#1c1c1c] bg-[#0a0a0a] text-[#8a8a8a] hover:border-[#3a3a3a] hover:text-white"
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setAnswers((a) => ({ ...a, [q.id]: false }))}
                          className={`border px-4 py-3 text-[11px] font-mono uppercase tracking-widest transition-all sm:px-6 ${
                            answer === false
                              ? "border-[#E5484D] bg-[#E5484D]/10 text-white"
                              : "border-[#1c1c1c] bg-[#0a0a0a] text-[#8a8a8a] hover:border-[#3a3a3a] hover:text-white"
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Step Navigation */}
              <div className="mt-10 flex flex-col gap-4 border-t border-[#1c1c1c] pt-6 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:pt-8">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`self-start font-mono text-[10px] uppercase tracking-[0.2em] transition-opacity ${
                    currentStep === 0 ? "opacity-0 pointer-events-none" : "opacity-100 hover:text-[#7b2fbe]"
                  }`}
                >
                  ← Previous
                </button>

                <button
                  onClick={nextStep}
                  disabled={!currentEngineComplete}
                  className={`inline-flex w-full items-center justify-between gap-4 bg-[#7b2fbe] px-5 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-all sm:w-auto sm:px-8 sm:text-[11px] sm:tracking-[0.28em] ${
                    currentEngineComplete ? "opacity-100 hover:bg-[#6a27a6]" : "opacity-30 cursor-not-allowed"
                  }`}
                >
                  {currentStep === 3 ? "Compute Final Diagnosis" : "Next Engine"}
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6 p-4 sm:space-y-8 sm:p-6 lg:p-8"
            >
              {zone && weakestEngine && (
                <>
                  {/* Layer 01 — Zone Verdict */}
                  <div className="border border-[#1c1c1c] bg-[#0a0a0a] p-5 sm:p-6 lg:p-8">
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="h-5 w-5" style={{ color: ZONE_VERDICT[zone].color }} />
                      <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: ZONE_VERDICT[zone].color }}>
                        Overall Zone Verdict
                      </p>
                    </div>

                    <div className="mt-5">
                      <h4 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                        {ZONE_VERDICT[zone].label}
                        <span className="ml-4 font-mono text-lg text-[#8a8a8a]">
                          / {totalScore}/20
                        </span>
                      </h4>
                      <p className="mt-3 text-xl font-semibold text-white">{ZONE_VERDICT[zone].title}</p>
                    </div>

                    <div className="mt-5 space-y-3">
                      {ZONE_VERDICT[zone].body.map((paragraph, i) => (
                        <p key={i} className="text-[15px] leading-relaxed text-[#aaaaaa]">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Zone Progress Bar */}
                    <div className="mt-6 flex flex-col gap-2">
                      <div className="flex h-2 w-full overflow-hidden rounded-none">
                        <div
                          className={`h-full transition-all duration-1000 delay-300 ${totalScore <= 5 ? "bg-[#30A46C]" : "bg-[#2a2a2a]"}`}
                          style={{ width: "33.33%" }}
                        />
                        <div
                          className={`h-full transition-all duration-1000 delay-300 ${totalScore >= 6 && totalScore <= 12 ? "bg-[#F5A524]" : "bg-[#2a2a2a]"}`}
                          style={{ width: "33.33%" }}
                        />
                        <div
                          className={`h-full transition-all duration-1000 delay-300 ${totalScore >= 13 ? "bg-[#E5484D]" : "bg-[#2a2a2a]"}`}
                          style={{ width: "33.34%" }}
                        />
                      </div>
                      <div className="flex justify-between font-mono text-[9px] uppercase tracking-[0.24em] text-[#8a8a8a]">
                        <span>Green (0–5)</span>
                        <span>Amber (6–12)</span>
                        <span>Red (13–20)</span>
                      </div>
                    </div>
                  </div>

                  {/* Layer 02 — Engine-Specific Diagnosis */}
                  <div className="border border-[#1c1c1c] bg-[#0a0a0a] p-5 sm:p-6 lg:p-8">
                    <div className="flex items-center gap-3">
                      {(() => {
                        const Icon = ENGINE_META[weakestEngine].icon;
                        const color = ENGINE_META[weakestEngine].color;
                        return <Icon className="h-5 w-5" style={{ color }} />;
                      })()}
                      <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: ENGINE_META[weakestEngine].color }}>
                        Weakest Engine Diagnosis
                      </p>
                    </div>

                    <div className="mt-5">
                      <h4 className="text-xl font-bold text-white uppercase tracking-tight">{ENGINE_META[weakestEngine].label}</h4>
                      <p className="mt-2 text-lg font-semibold text-white">{ENGINE_DIAGNOSIS[weakestEngine].title}</p>
                    </div>

                    <div className="mt-4 space-y-3">
                      {ENGINE_DIAGNOSIS[weakestEngine].body.map((paragraph, i) => (
                        <p key={i} className="text-[15px] leading-relaxed text-[#aaaaaa]">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Engine Score Summary */}
                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {(Object.keys(ENGINE_META) as EngineKey[]).map((engine) => (
                        <div
                          key={engine}
                          className={`border p-3 ${
                            engine === weakestEngine ? "border-[#7b2fbe] bg-[#7b2fbe]/5" : "border-[#1c1c1c] bg-[#0f0f0f]"
                          }`}
                        >
                          <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#8a8a8a]">
                            {engine === "MARKETING" ? "MKT" : engine === "SALES" ? "SLS" : engine === "OPERATIONS" ? "OPS" : "GRW"}
                          </p>
                          <p className="mt-1 text-2xl font-extrabold text-white">{engineScores[engine]}/5</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Layer 03 — Universal CTA */}
                  <div className="border border-[#7b2fbe] bg-[#0f0f0f] p-5 sm:p-6 lg:p-8">
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7b2fbe]">
                      Treatment Protocol
                    </p>
                    <p className="mt-4 text-lg font-semibold text-white">
                      The diagnosis identifies the symptom. The architecture treats the disease.
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#aaaaaa]">
                      The Apex Vault contains the 6-chapter cure — structural protocols across all four engines.
                    </p>

                    <div className="mt-8 flex flex-col gap-4 md:flex-row">
                      <a
                        href={whopVault}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex flex-1 items-center justify-between gap-5 bg-[#7b2fbe] px-5 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-all hover:bg-[#6a27a6] hover:scale-[1.02] active:scale-[0.98] sm:px-8 sm:py-5 sm:text-[11px] sm:tracking-[0.28em]"
                      >
                        Begin the Cure (Apex Vault)
                        <ArrowUpRight className="h-5 w-5" />
                      </a>
                      <a
                        href={whopStarterKit}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-3 border border-[#2a2a2a] px-5 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#aaaaaa] transition-all hover:border-white hover:text-white hover:scale-[1.02] active:scale-[0.98] sm:px-8 sm:py-5 sm:text-[11px] sm:tracking-[0.28em]"
                      >
                        Access Starter Kit ($0)
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          reset();
                          setCurrentStep(0);
                        }}
                        className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#555] hover:text-[#888] transition-colors"
                      >
                        Re-run Audit Diagnostic
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}