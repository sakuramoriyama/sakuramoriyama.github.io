// status: "current" | "previous" | "future". Omit any section you do not need.
DATA.research = [
 { id: "gpcr-trp", no: "01", status: "current", title: "GPCR–TRP Crosstalk",
   summary: "How GPCR–TRP crosstalk reshapes cellular responses to chemical stimuli.",
   keywords: ["GPCR signaling", "TRP channels", "phosphorylation", "ligand-dependent responses", "intracellular crosstalk", "cellular sensing"],
   overview: "We study how crosstalk between GPCRs and TRP channels changes cellular responses to chemical stimuli.",
   ja: "GPCRとTRPチャネルのクロストークが、化学刺激に対する細胞応答をどう変えるかを研究しています。" },
 { id: "trp-thermal", no: "02", status: "current", title: "Molecular Mechanisms of TRP Thermal Sensing",
   summary: "How structural dynamics give TRP channels their temperature sensitivity.",
   keywords: ["TRP channel structure", "structural fluctuations", "molecular dynamics", "temperature sensing", "conformational states"],
   overview: "We focus on the structural dynamics of TRP channels to understand how temperature sensitivity arises.",
   ja: "TRPチャネルの構造動態に着目し、温度感受性がどのように形成されるかを研究しています。" },
 { id: "or-sensor", no: "03", status: "previous", title: "Human Olfactory Receptor Cell-Array Sensors",
   summary: "Cell-based chemical sensors built on human olfactory receptors (Ph.D. research).",
   keywords: ["olfactory receptors", "cell-based sensing", "receptor arrays", "chemical sensing"],
   overview: "Cell-based sensor research using human olfactory receptors, which formed the foundation of my research career.",
   ja: "ヒト嗅覚受容体を用いた細胞ベースのセンサー研究。博士課程時代の研究で、現在の研究の基盤です。" }
 // Optional keys per theme: background, question, approach, findings, direction (strings)
];
DATA.vision = {
  current: ["Sensory receptor mechanisms", "GPCR–TRP crosstalk", "TRP thermal sensing", "Olfactory receptor-based sensing"],
  future: ["Mechanistic understanding of aroma-related sensory responses", "Evidence-based applications of aroma / aroma compounds"],
  note: "The items under 'Long-term vision' are future directions, not results of current work."
};
DATA.rules = [
  // ---- Research 01: GPCR–TRP Crosstalk ----
  { type: "publications", first: true, journal: /Biosci|Biotechnol|Biochem/i, themes: ["gpcr-trp"] },
  { type: "funding", match: /特別研究員|DC2/, themes: ["gpcr-trp", "or-sensor"] },
  { type: "funding", match: /ヒト嗅覚による匂い/, themes: ["gpcr-trp"] },
  { type: "funding", match: /教育研究振興財団/, themes: ["gpcr-trp"] },
  // ---- Research 03: Olfactory receptor cell-array sensors ----
  { type: "publications", kind: /^book$|introduction/i, themes: ["or-sensor"] },
  { type: "publications", match: /総説|\breview\b/i, themes: ["or-sensor"] },
  { type: "funding", match: /アロマ精油|ビジネスモデル/, themes: ["or-sensor"] },
  // ---- 学会発表（年の補正つき） ----
  { type: "presentations", match: /27th SANKEN/i, set: { year: 2024 }, themes: ["gpcr-trp"] },
  { type: "presentations", match: /26th SANKEN/i, set: { year: 2023 }, themes: ["gpcr-trp"] },
  { type: "presentations", match: /第56回味と匂/, set: { year: 2022 }, themes: ["gpcr-trp"] }
];
