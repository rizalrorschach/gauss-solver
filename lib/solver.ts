import type { SolutionResult, SolutionMethod, MatrixStep } from "@/contexts/solver-context";

export async function solveLinearSystem(matrix: number[][], vector: number[], method: SolutionMethod): Promise<SolutionResult> {
  const steps: MatrixStep[] = [];

  // Create augmented matrix copy
  const augMatrix = matrix.map((row) => [...row]);
  const augVector = [...vector];

  // Add initial step
  steps.push({
    step: 0,
    description: "Initial augmented matrix",
    matrix: augMatrix.map((row) => [...row]),
    vector: [...augVector],
    operation: "Starting configuration",
  });

  try {
    if (method === "gauss") {
      return await gaussElimination(augMatrix, augVector, steps);
    } else {
      return await gaussJordan(augMatrix, augVector, steps);
    }
  } catch (error) {
    return {
      solution: null,
      steps,
      method,
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

async function gaussElimination(matrix: number[][], vector: number[], steps: MatrixStep[]): Promise<SolutionResult> {
  const n = matrix.length;
  let stepCount = 1;
  const PRECISION = 6; // Consistent decimal precision
  const EPSILON = 1e-10; // Smaller threshold for near-zero detection for better accuracy

  // Helper function to format numbers consistently
  const formatNumber = (num: number): string => {
    // Handle very small numbers that should be zero
    if (Math.abs(num) < EPSILON) {
      return "0.000000";
    }
    return num.toFixed(PRECISION);
  };

  // Helper function to create matrix/vector deep copies with consistent precision
  const copyWithPrecision = (m: number[][]): number[][] => {
    return m.map((row) => row.map((val) => parseFloat(formatNumber(val))));
  };

  const copyVectorWithPrecision = (v: number[]): number[] => {
    return v.map((val) => parseFloat(formatNumber(val)));
  };

  // Round to integer if very close to a whole number
  const cleanupNumber = (num: number): number => {
    const rounded = Math.round(num);
    return Math.abs(num - rounded) < EPSILON ? rounded : parseFloat(formatNumber(num));
  };

  // Forward elimination with partial pivoting
  for (let i = 0; i < n; i++) {
    // Find pivot (row with largest absolute value in current column)
    let maxRow = i;
    let maxValue = Math.abs(matrix[i][i]);

    for (let k = i + 1; k < n; k++) {
      const absValue = Math.abs(matrix[k][i]);
      if (absValue > maxValue) {
        maxRow = k;
        maxValue = absValue;
      }
    }

    // Check for singular or ill-conditioned matrix
    if (maxValue < EPSILON) {
      return {
        solution: null,
        steps,
        method: "gauss",
        status: "error",
        message: "Near-singular matrix detected. The system may be ill-conditioned or have no unique solution.",
      };
    }

    // Swap rows if needed (partial pivoting)
    if (maxRow !== i) {
      [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];
      [vector[i], vector[maxRow]] = [vector[maxRow], vector[i]];

      steps.push({
        step: stepCount++,
        description: `Partial pivoting: Swap row ${i + 1} with row ${maxRow + 1}`,
        matrix: copyWithPrecision(matrix),
        vector: copyVectorWithPrecision(vector),
        pivotRow: i,
        pivotCol: i,
        operation: `R${i + 1} ↔ R${maxRow + 1}`,
      });
    }

    // Make all rows below this one 0 in current column
    const pivotValue = matrix[i][i];

    for (let k = i + 1; k < n; k++) {
      const factor = matrix[k][i] / pivotValue;

      if (Math.abs(factor) > EPSILON) {
        // Subtract the scaled pivot row from the current row
        for (let j = i; j < n; j++) {
          matrix[k][j] = matrix[k][j] - factor * matrix[i][j];
          if (Math.abs(matrix[k][j]) < EPSILON) matrix[k][j] = 0;
        }
        vector[k] = vector[k] - factor * vector[i];
        if (Math.abs(vector[k]) < EPSILON) vector[k] = 0;

        steps.push({
          step: stepCount++,
          description: `Eliminate column ${i + 1} in row ${k + 1}`,
          matrix: copyWithPrecision(matrix),
          vector: copyVectorWithPrecision(vector),
          pivotRow: i,
          pivotCol: i,
          operation: `R${k + 1} = R${k + 1} - ${formatNumber(factor)} × R${i + 1}`,
        });
      }
    }
  }

  // Check for any very small diagonal elements before back substitution
  for (let i = 0; i < n; i++) {
    if (Math.abs(matrix[i][i]) < EPSILON) {
      return {
        solution: null,
        steps,
        method: "gauss",
        status: "error",
        message: "Matrix became nearly singular during elimination. The system is likely ill-conditioned.",
      };
    }
  }

  // Back substitution with improved precision
  const solution = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = vector[i];
    for (let j = i + 1; j < n; j++) {
      sum = sum - matrix[i][j] * solution[j]; // Avoid intermediate rounding
    }
    solution[i] = cleanupNumber(sum / matrix[i][i]); // Apply cleanup to detect integer solutions

    if (i > 0) {
      steps.push({
        step: stepCount++,
        description: `Back substitution: solve for x${i + 1}`,
        matrix: copyWithPrecision(matrix),
        vector: copyVectorWithPrecision(vector),
        operation: `x${i + 1} = ${formatNumber(solution[i])}`,
      });
    }
  }

  steps.push({
    step: stepCount,
    description: "Final solution obtained",
    matrix: copyWithPrecision(matrix),
    vector: copyVectorWithPrecision(vector),
    operation: `Solution: [${solution.map((x) => formatNumber(x)).join(", ")}]`,
  });

  return {
    solution: solution.map((val) => cleanupNumber(val)), // Apply cleanup to final solution
    steps,
    method: "gauss",
    status: "solved",
    message: "System solved successfully using Gauss Elimination with partial pivoting",
  };
}

async function gaussJordan(matrix: number[][], vector: number[], steps: MatrixStep[]): Promise<SolutionResult> {
  const n = matrix.length;
  let stepCount = 1;
  const PRECISION = 6; // Consistent decimal precision
  const EPSILON = 1e-10; // Smaller threshold for near-zero detection for better accuracy

  // Helper function to format numbers consistently
  const formatNumber = (num: number): string => {
    // Handle very small numbers that should be zero
    if (Math.abs(num) < EPSILON) {
      return "0.000000";
    }
    return num.toFixed(PRECISION);
  };

  // Helper function to create matrix/vector deep copies with consistent precision
  const copyWithPrecision = (m: number[][]): number[][] => {
    return m.map((row) => row.map((val) => parseFloat(formatNumber(val))));
  };

  const copyVectorWithPrecision = (v: number[]): number[] => {
    return v.map((val) => parseFloat(formatNumber(val)));
  };

  // Round to integer if very close to a whole number
  const cleanupNumber = (num: number): number => {
    const rounded = Math.round(num);
    return Math.abs(num - rounded) < EPSILON ? rounded : parseFloat(formatNumber(num));
  };

  // Forward elimination to row echelon form
  for (let i = 0; i < n; i++) {
    // Find pivot (row with largest absolute value in current column)
    let maxRow = i;
    let maxValue = Math.abs(matrix[i][i]);

    for (let k = i + 1; k < n; k++) {
      const absValue = Math.abs(matrix[k][i]);
      if (absValue > maxValue) {
        maxRow = k;
        maxValue = absValue;
      }
    }

    // Check for singular or ill-conditioned matrix
    if (maxValue < EPSILON) {
      return {
        solution: null,
        steps,
        method: "gauss-jordan",
        status: "error",
        message: "Near-singular matrix detected. The system may be ill-conditioned or have no unique solution.",
      };
    }

    // Swap rows if needed (partial pivoting)
    if (maxRow !== i) {
      [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];
      [vector[i], vector[maxRow]] = [vector[maxRow], vector[i]];

      steps.push({
        step: stepCount++,
        description: `Partial pivoting: Swap row ${i + 1} with row ${maxRow + 1}`,
        matrix: copyWithPrecision(matrix),
        vector: copyVectorWithPrecision(vector),
        pivotRow: i,
        pivotCol: i,
        operation: `R${i + 1} ↔ R${maxRow + 1}`,
      });
    }

    // Scale pivot row to make pivot = 1
    const pivot = matrix[i][i];
    for (let j = 0; j < n; j++) {
      // Perform division without intermediate formatting to maintain precision
      matrix[i][j] = matrix[i][j] / pivot;
      // Only format for display in the output matrix
      if (Math.abs(matrix[i][j]) < EPSILON) matrix[i][j] = 0;
    }
    vector[i] = vector[i] / pivot;
    if (Math.abs(vector[i]) < EPSILON) vector[i] = 0;

    steps.push({
      step: stepCount++,
      description: `Scale row ${i + 1} to make pivot = 1`,
      matrix: copyWithPrecision(matrix),
      vector: copyVectorWithPrecision(vector),
      pivotRow: i,
      pivotCol: i,
      operation: `R${i + 1} = R${i + 1} / ${formatNumber(pivot)}`,
    });

    // Eliminate column in all other rows
    for (let k = 0; k < n; k++) {
      if (k !== i && Math.abs(matrix[k][i]) > EPSILON) {
        const factor = matrix[k][i];

        // Update all columns in the row
        for (let j = 0; j < n; j++) {
          matrix[k][j] = matrix[k][j] - factor * matrix[i][j];
          if (Math.abs(matrix[k][j]) < EPSILON) matrix[k][j] = 0;
        }
        vector[k] = vector[k] - factor * vector[i];
        if (Math.abs(vector[k]) < EPSILON) vector[k] = 0;

        steps.push({
          step: stepCount++,
          description: `Eliminate column ${i + 1} in row ${k + 1}`,
          matrix: copyWithPrecision(matrix),
          vector: copyVectorWithPrecision(vector),
          pivotRow: i,
          pivotCol: i,
          operation: `R${k + 1} = R${k + 1} - ${formatNumber(factor)} × R${i + 1}`,
        });
      }
    }
  }

  // Solution is directly available in the vector, but ensure consistent precision
  const solution = vector.map((val) => cleanupNumber(val)); // Apply cleanup to find exact values

  steps.push({
    step: stepCount,
    description: "Reduced row echelon form achieved - solution obtained",
    matrix: copyWithPrecision(matrix),
    vector: copyVectorWithPrecision(vector),
    operation: `Solution: [${solution.map((x) => formatNumber(x)).join(", ")}]`,
  });

  return {
    solution,
    steps,
    method: "gauss-jordan",
    status: "solved",
    message: "System solved successfully using Gauss-Jordan Elimination with partial pivoting",
  };
}
