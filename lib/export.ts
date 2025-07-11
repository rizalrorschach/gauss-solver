import type { SolutionResult } from "@/contexts/solver-context";

export async function exportResults(result: SolutionResult, matrix: number[][], vector: number[], format: "pdf" | "txt") {
  if (format === "txt") {
    exportToTxt(result, matrix, vector);
  } else {
    await exportToPdf(result, matrix, vector);
  }
}

function exportToTxt(result: SolutionResult, matrix: number[][], vector: number[]) {
  let content = "GAUSS SOLVER - SOLUTION REPORT\n";
  content += "================================\n\n";

  content += `Method: ${result.method === "gauss" ? "Gauss Elimination" : "Gauss-Jordan Elimination"}\n`;
  content += `Status: ${result.status}\n`;
  content += `Matrix Size: ${matrix.length}x${matrix.length}\n\n`;

  content += "ORIGINAL SYSTEM:\n";
  content += "----------------\n";
  for (let i = 0; i < matrix.length; i++) {
    const equation = matrix[i]
      .map((coef, j) => {
        const sign = coef >= 0 && j > 0 ? "+" : "";
        return `${sign}${coef}x${j + 1}`;
      })
      .join(" ");
    content += `${equation} = ${vector[i]}\n`;
  }
  content += "\n";

  if (result.solution) {
    content += "SOLUTION:\n";
    content += "---------\n";
    result.solution.forEach((value, index) => {
      content += `x${index + 1} = ${typeof value === "number" ? value.toFixed(6) : value}\n`;
    });
    content += "\n";
  }

  content += "SOLUTION STEPS:\n";
  content += "---------------\n";
  result.steps.forEach((step) => {
    content += `Step ${step.step}: ${step.description}\n`;
    if (step.operation) {
      content += `Operation: ${step.operation}\n`;
    }
    content += "Matrix:\n";
    step.matrix.forEach((row, i) => {
      content += `[${row.map((val) => val.toFixed(6).padStart(12)).join(" ")} | ${step.vector[i].toFixed(6).padStart(12)}]\n`;
    });
    content += "\n";
  });

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `gauss-solver-${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function exportToPdf(result: SolutionResult, matrix: number[][], vector: number[]) {
  // Dynamic import to avoid SSR issues
  const { jsPDF } = await import("jspdf");

  const doc = new jsPDF();
  let yPosition = 20;

  // Title
  doc.setFontSize(20);
  doc.text("GAUSS SOLVER - SOLUTION REPORT", 20, yPosition);
  yPosition += 20;

  // Method and status
  doc.setFontSize(12);
  doc.text(`Method: ${result.method === "gauss" ? "Gauss Elimination" : "Gauss-Jordan Elimination"}`, 20, yPosition);
  yPosition += 10;
  doc.text(`Status: ${result.status}`, 20, yPosition);
  yPosition += 10;
  doc.text(`Matrix Size: ${matrix.length}x${matrix.length}`, 20, yPosition);
  yPosition += 20;

  // Original system
  doc.setFontSize(14);
  doc.text("ORIGINAL SYSTEM:", 20, yPosition);
  yPosition += 15;

  doc.setFontSize(10);
  for (let i = 0; i < matrix.length; i++) {
    const equation = matrix[i]
      .map((coef, j) => {
        const sign = coef >= 0 && j > 0 ? "+" : "";
        return `${sign}${coef}x${j + 1}`;
      })
      .join(" ");
    doc.text(`${equation} = ${vector[i]}`, 20, yPosition);
    yPosition += 8;
  }
  yPosition += 10;

  // Solution
  if (result.solution) {
    doc.setFontSize(14);
    doc.text("SOLUTION:", 20, yPosition);
    yPosition += 15;

    doc.setFontSize(10);
    result.solution.forEach((value, index) => {
      doc.text(`x${index + 1} = ${typeof value === "number" ? value.toFixed(6) : value}`, 20, yPosition);
      yPosition += 8;
    });
    yPosition += 10;
  }

  // Steps summary
  doc.setFontSize(14);
  doc.text("SOLUTION STEPS SUMMARY:", 20, yPosition);
  yPosition += 15;

  doc.setFontSize(10);
  result.steps.forEach((step) => {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    doc.text(`Step ${step.step}: ${step.description}`, 20, yPosition);
    yPosition += 8;
    if (step.operation) {
      doc.text(`Operation: ${step.operation}`, 25, yPosition);
      yPosition += 8;
    }
    yPosition += 5;
  });

  doc.save(`gauss-solver-${Date.now()}.pdf`);
}
