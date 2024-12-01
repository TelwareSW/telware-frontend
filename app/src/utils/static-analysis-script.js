import { ESLint } from "eslint";
import fs from "fs";

async function generateStaticAnalysisReport() {
  const eslint = new ESLint();

  const results = await eslint.lintFiles(["src/**/*.{js,jsx,ts,tsx}"]);

  const report = {
    totalFiles: results.length,
    errorCount: results.reduce((sum, result) => sum + result.errorCount, 0),
    warningCount: results.reduce((sum, result) => sum + result.warningCount, 0),
    fixableErrorCount: results.reduce(
      (sum, result) => sum + result.fixableErrorCount,
      0,
    ),
    fixableWarningCount: results.reduce(
      (sum, result) => sum + result.fixableWarningCount,
      0,
    ),
    details: results.map((result) => ({
      filePath: result.filePath,
      errors: result.messages.filter((m) => m.severity === 2),
      warnings: result.messages.filter((m) => m.severity === 1),
    })),
  };

  fs.writeFileSync(
    "static-analysis-report.json",
    JSON.stringify(report, null, 2),
  );

  console.log("Static Analysis Report Generated");
}

generateStaticAnalysisReport();
