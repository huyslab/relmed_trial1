import fs from "node:fs/promises";
import { createRequire } from "node:module";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = new URL(".", import.meta.url).pathname;
const repoRoot = new URL("../../", import.meta.url).pathname;

globalThis.jsPsychInstructions = "placeholder";
globalThis.jsPsychSurveyTemplate = "survey-template";
globalThis.jsPsychSurveyMultiChoice = "survey-multi-choice";
globalThis.window = { session: "wk0", task: "quests" };
globalThis.document = { getElementById: () => null };

const require = createRequire(import.meta.url);
const questionnaireFunctions = require(`${repoRoot}questionnaires.js`);

const metadata = {
  PHQ9: { display: "PHQ-9", trialphase: "PHQ", dataField: "responses", legacyPrefix: "PHQ9", catchItems: [9] },
  GAD7: { display: "GAD-7", trialphase: "GAD", dataField: "responses", legacyPrefix: "GAD7", catchItems: [7] },
  WSAS: { display: "WSAS", trialphase: "WSAS", dataField: "responses", legacyPrefix: "WSAS", catchItems: [] },
  ICECAP: { display: "ICECAP-A", trialphase: "ICECAP", dataField: "response", legacyPrefix: "ICECAP", catchItems: [] },
  PVSS: { display: "PVSS", trialphase: "PVSS", dataField: "responses", legacyPrefix: "PVSS", catchItems: [20] },
  BADS: { display: "BADS-SF", trialphase: "BADS", dataField: "responses", legacyPrefix: "BADS", catchItems: [7] },
  hopelessness: { display: "Hopelessness (2 item)", trialphase: "Hopelessness", dataField: "responses", legacyPrefix: "hopelessness", catchItems: [] },
  RRS_brooding: { display: "RRS Brooding", trialphase: "RRS_brooding", dataField: "responses", legacyPrefix: "RRS_brooding", catchItems: [] },
  PERS_negAct: { display: "PERS Negative Activation", trialphase: "PERS_negAct", dataField: "responses", legacyPrefix: "PERS_negAct", catchItems: [] },
  BFI: { display: "BFI-2-S items", trialphase: "BFI", dataField: "responses", legacyPrefix: "BFI", catchItems: [] },
};

const stripHtml = (value) => String(value)
  .replace(/<br\s*\/?\s*>/gi, "\n")
  .replace(/<\/p>/gi, "\n")
  .replace(/<[^>]+>/g, "")
  .replace(/&nbsp;/g, " ")
  .replace(/&quot;/g, '"')
  .replace(/&amp;/g, "&")
  .replace(/\s+\n/g, "\n")
  .trim();

const itemRows = [];
const valueRows = [];

for (const [key, makeQuestionnaire] of Object.entries(questionnaireFunctions)) {
  const questionnaire = makeQuestionnaire(1, 1);
  const meta = metadata[key];
  const isTemplate = Array.isArray(questionnaire.items);
  const prompts = isTemplate ? questionnaire.items : questionnaire.questions.map((question) => question.prompt);

  prompts.forEach((prompt, index) => {
    const itemNumber = index + 1;
    const storedId = isTemplate ? `Q${String(itemNumber).padStart(2, "0")}` : `Q${index}`;
    const legacyId = `${meta.legacyPrefix}_Q${index}`;
    const isCatch = meta.catchItems.includes(itemNumber);
    const responseSummary = isTemplate
      ? questionnaire.scale.map((label, score) => `${score}: ${stripHtml(label) || "(unlabelled intermediate point)"}`).join(" | ")
      : questionnaire.questions[index].options.map((label) => stripHtml(label)).join(" | ");

    itemRows.push([
      meta.display,
      meta.trialphase,
      meta.dataField,
      storedId,
      legacyId,
      itemNumber,
      stripHtml(prompt),
      isCatch ? "attention_check" : "scale_item",
      isCatch ? "Exclude from conventional instrument totals; confirm against the statistical analysis plan." : "Raw item only; apply the protocol/published scoring rule outside the website.",
      responseSummary,
    ]);

    if (!isTemplate) {
      questionnaire.questions[index].options.forEach((label, optionIndex) => {
        const cleanLabel = stripHtml(label);
        valueRows.push([
          meta.display,
          storedId,
          cleanLabel,
          cleanLabel,
          optionIndex + 1,
          "The website stores the full option text, not a numeric score. Option position is supplied for reference only.",
        ]);
      });
    }
  });

  if (isTemplate) {
    questionnaire.scale.forEach((label, score) => {
      valueRows.push([
        meta.display,
        `Q01–Q${String(prompts.length).padStart(2, "0")}`,
        score,
        stripHtml(label) || "(unlabelled intermediate point)",
        score,
        "Numeric value written directly by the RELMED survey-template plugin; no reverse coding is applied in the website configuration.",
      ]);
    });
  }
}

itemRows.push([
  "WSAS",
  "WSAS",
  "responses",
  "retired_check",
  "WSAS_retired_check",
  "—",
  "If you're retired or choose not to have a job for reasons unrelated to your problem, tick here",
  "administrative_flag",
  "Do not include in the WSAS item total.",
  "false: not ticked | true: ticked",
]);

const workbook = Workbook.create();
const overview = workbook.worksheets.add("README");
const items = workbook.worksheets.add("Items");
const values = workbook.worksheets.add("Value Maps");
const batteries = workbook.worksheets.add("Batteries");
const scoring = workbook.worksheets.add("Scoring Notes");

const navy = "#17365D";
const teal = "#0F6B78";
const paleBlue = "#DCE6F1";
const paleAmber = "#FFF2CC";
const paleRed = "#FCE4D6";
const lightBorder = "#D9E2F3";

function styleTitle(sheet, range, title) {
  sheet.getRange(range).merge();
  sheet.getRange(range).values = [[title]];
  sheet.getRange(range).format = {
    fill: navy,
    font: { bold: true, color: "#FFFFFF", size: 16 },
    verticalAlignment: "center",
  };
  sheet.getRange(range).format.rowHeight = 30;
}

function styleHeader(range) {
  range.format = {
    fill: teal,
    font: { bold: true, color: "#FFFFFF" },
    wrapText: true,
    verticalAlignment: "center",
    borders: { preset: "outside", style: "thin", color: lightBorder },
  };
  range.format.rowHeight = 34;
}

styleTitle(overview, "A1:B1", "RELMED Questionnaire Data Dictionary");
overview.getRange("A3:B11").values = [
  ["Purpose", "Maps the questionnaire wording shown on the RELMED website to the exact raw keys and values stored by jsPsych."],
  ["Primary finding", "The live Likert plugin stores one-based, zero-padded IDs (Q01, Q02, …). The old validation HTML generated zero-based labels (for example PHQ9_Q0), which are not the stored keys."],
  ["PHQ example", "Stored Q01 corresponds to old HTML PHQ9_Q0; stored Q10 corresponds to old HTML PHQ9_Q9."],
  ["Likert storage", "Raw numeric strings/numbers begin at 0 and follow the displayed columns from left to right. The website does not calculate totals or reverse-score items."],
  ["ICECAP storage", "ICECAP-A is different: its data are under response (singular), use Q0–Q4, and store the full selected option text rather than a numeric score."],
  ["Attention checks", "Repository comments identify PHQ Q09, GAD Q07, PVSS Q20, and BADS Q07 as catch/attention-check items. They should not be included in conventional instrument totals without protocol confirmation."],
  ["Scoring caution", "Reverse coding, subscale construction, clinical cut-offs, and ICECAP valuation weights are not implemented in this repository. Confirm these against the trial statistical analysis plan or approved instrument scoring manuals."],
  ["Source files", "questionnaires.js; plugin-survey-template.js; jspsych/plugin-survey-multi-choice.js; validation/questionnaires/validate_questionnaires.js"],
  ["Repository version", "experiment.html reports version 2.2.0"],
];
overview.getRange("A3:A11").format = { fill: paleBlue, font: { bold: true }, wrapText: true };
overview.getRange("B3:B11").format = { wrapText: true };
overview.getRange("A3:B11").format.borders = { preset: "outside", style: "thin", color: lightBorder };
overview.getRange("A3:A11").format.columnWidth = 24;
overview.getRange("B3:B11").format.columnWidth = 105;
overview.getRange("A3:B11").format.autofitRows();
overview.showGridLines = false;

const itemHeaders = [["Questionnaire", "trialphase", "Data property", "Stored item ID", "Legacy HTML ID", "Item no.", "Question wording", "Item role", "Scoring guidance", "Response values displayed"]];
items.getRangeByIndexes(0, 0, 1, itemHeaders[0].length).values = itemHeaders;
items.getRangeByIndexes(1, 0, itemRows.length, itemHeaders[0].length).values = itemRows;
styleHeader(items.getRange("A1:J1"));
items.tables.add(`A1:J${itemRows.length + 1}`, true, "QuestionnaireItems").style = "TableStyleMedium2";
items.freezePanes.freezeRows(1);
items.getRange("A:J").format.verticalAlignment = "top";
items.getRange(`G2:J${itemRows.length + 1}`).format.wrapText = true;
items.getRange("A:A").format.columnWidth = 23;
items.getRange("B:B").format.columnWidth = 16;
items.getRange("C:F").format.columnWidth = 16;
items.getRange("G:G").format.columnWidth = 58;
items.getRange("H:H").format.columnWidth = 19;
items.getRange("I:I").format.columnWidth = 46;
items.getRange("J:J").format.columnWidth = 55;
items.getRange(`A2:J${itemRows.length + 1}`).format.rowHeight = 86;
items.getRange(`H2:H${itemRows.length + 1}`).conditionalFormats.add("containsText", { text: "attention_check", format: { fill: paleRed, font: { bold: true, color: "#9C0006" } } });
items.showGridLines = false;

const valueHeaders = [["Questionnaire", "Applies to stored ID(s)", "Stored value", "Displayed answer option", "Option position / numeric value", "Interpretation"]];
values.getRangeByIndexes(0, 0, 1, valueHeaders[0].length).values = valueHeaders;
values.getRangeByIndexes(1, 0, valueRows.length, valueHeaders[0].length).values = valueRows;
styleHeader(values.getRange("A1:F1"));
values.tables.add(`A1:F${valueRows.length + 1}`, true, "QuestionnaireValueMaps").style = "TableStyleMedium2";
values.freezePanes.freezeRows(1);
values.getRange("A:F").format.verticalAlignment = "top";
values.getRange(`C2:F${valueRows.length + 1}`).format.wrapText = true;
values.getRange("A:A").format.columnWidth = 24;
values.getRange("B:C").format.columnWidth = 24;
values.getRange("D:D").format.columnWidth = 55;
values.getRange("E:E").format.columnWidth = 26;
values.getRange("F:F").format.columnWidth = 55;
values.getRange(`A2:F${valueRows.length + 1}`).format.rowHeight = 72;
values.showGridLines = false;

const batteryRows = [
  ["Screening", "screening", "screening", "PHQ-9 → WSAS → ICECAP-A → BFI-2-S items"],
  ["Battery B", "wk0, wk2, wk4, wk28", "quests", "PHQ-9 → GAD-7 → PVSS → BADS-SF → Hopelessness → RRS Brooding → PERS Negative Activation"],
  ["Battery C", "Other quests sessions (for example wk6, wk8, wk52)", "quests", "PHQ-9 → GAD-7 → WSAS → ICECAP-A → PVSS → BADS-SF → Hopelessness → RRS Brooding → PERS Negative Activation"],
];
styleTitle(batteries, "A1:D1", "Questionnaire Batteries by Session");
batteries.getRange("A3:D3").values = [["Battery", "session", "task", "Questionnaires in website order"]];
batteries.getRange("A4:D6").values = batteryRows;
styleHeader(batteries.getRange("A3:D3"));
batteries.tables.add("A3:D6", true, "QuestionnaireBatteries").style = "TableStyleMedium2";
batteries.getRange("A:A").format.columnWidth = 22;
batteries.getRange("B:B").format.columnWidth = 42;
batteries.getRange("C:C").format.columnWidth = 16;
batteries.getRange("D:D").format.columnWidth = 100;
batteries.getRange("A4:D6").format = { wrapText: true, verticalAlignment: "top" };
batteries.getRange("A4:D6").format.rowHeight = 54;
batteries.showGridLines = false;

const scoringRows = [
  ["Live ID mapping", "Likert questionnaires", "Stored IDs are Q01, Q02, …; the legacy report's <questionnaire>_Q0, _Q1, … labels are off by one.", "Confirmed by plugin-survey-template.js, which builds qid from item index + 1."],
  ["PHQ-9 conventional item set", "PHQ-9", "Use Q01–Q08 and Q10; Q09 is a repository-labelled catch item.", "Repository inference; confirm with the approved trial analysis plan."],
  ["GAD-7 conventional item set", "GAD-7", "Use Q01–Q06 and Q08; Q07 is the Eurovision catch item.", "Repository inference; confirm with the approved trial analysis plan."],
  ["PVSS attention check", "PVSS", "Q20 is a repository-labelled catch item paired conceptually with Q14; do not silently add it to a published PVSS total.", "Repository inference; confirm the intended PVSS short-form scoring."],
  ["BADS attention check", "BADS-SF", "Q07 (lifting a cup/glass) is a repository-labelled positive catch item.", "Repository inference; confirm the intended BADS-SF scoring and any reverse-coded items."],
  ["No website reverse coding", "All Likert questionnaires", "No questionnaire passes a reverse array or non-zero scoring_index to the plugin; stored values are raw left-to-right option positions beginning at 0.", "Confirmed from questionnaire configuration and plugin defaults."],
  ["ICECAP-A", "ICECAP-A", "The site stores answer text under response.Q0–Q4. It does not store numeric levels or calculate an ICECAP tariff/value.", "Apply the trial-approved ICECAP-A coding/valuation method outside this website."],
  ["Clinical scoring", "All", "The repository contains no questionnaire total-score, subscale, threshold, or missing-data algorithm.", "Do not infer clinical scores solely from the website code; use the SAP/manual."],
];
styleTitle(scoring, "A1:D1", "Scoring and Interpretation Notes");
scoring.getRange("A3:D3").values = [["Topic", "Questionnaire(s)", "Repository evidence / mapping", "Action"]];
scoring.getRange("A4:D11").values = scoringRows;
styleHeader(scoring.getRange("A3:D3"));
scoring.tables.add("A3:D11", true, "QuestionnaireScoringNotes").style = "TableStyleMedium2";
scoring.getRange("A:A").format.columnWidth = 29;
scoring.getRange("B:B").format.columnWidth = 28;
scoring.getRange("C:C").format.columnWidth = 83;
scoring.getRange("D:D").format.columnWidth = 61;
scoring.getRange("A4:D11").format = { wrapText: true, verticalAlignment: "top" };
scoring.getRange("A4:D11").format.rowHeight = 62;
scoring.getRange("A4:D11").format.borders = { preset: "inside", style: "thin", color: lightBorder };
scoring.getRange("A4:D11").conditionalFormats.add("containsText", { text: "confirm", format: { fill: paleAmber } });
scoring.showGridLines = false;

const itemCheck = await workbook.inspect({ kind: "table", range: "Items!A1:J12", include: "values,formulas", tableMaxRows: 12, tableMaxCols: 10, maxChars: 8000 });
const errorCheck = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 100 }, summary: "final formula error scan", maxChars: 3000 });
console.log(itemCheck.ndjson);
console.log(errorCheck.ndjson);

for (const [sheetName, range] of [
  ["README", "A1:B11"],
  ["Items", "A1:J18"],
  ["Value Maps", "A1:F22"],
  ["Batteries", "A1:D6"],
  ["Scoring Notes", "A1:D11"],
]) {
  const preview = await workbook.render({ sheetName, range, scale: 1, format: "png" });
  await fs.writeFile(`${outputDir}preview_${sheetName.replace(/\s+/g, "_").toLowerCase()}.png`, new Uint8Array(await preview.arrayBuffer()));
}

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(`${outputDir}RELMED_questionnaire_data_dictionary.xlsx`);
console.log(`Created ${itemRows.length} item rows and ${valueRows.length} value-map rows.`);
