"use client";

import type React from "react";

import { createContext, useContext, useReducer, type ReactNode } from "react";

export type SolutionMethod = "gauss" | "gauss-jordan";

export interface MatrixStep {
  step: number;
  description: string;
  matrix: number[][];
  vector: number[];
  pivotRow?: number;
  pivotCol?: number;
  operation?: string;
}

export interface SolutionResult {
  solution: number[] | null;
  steps: MatrixStep[];
  method: SolutionMethod;
  status: "solved" | "no-solution" | "infinite-solutions" | "error";
  message?: string;
}

interface SolverState {
  size: number;
  matrix: number[][];
  vector: number[];
  result: SolutionResult | null;
  isLoading: boolean;
  error: string | null;
}

type SolverAction =
  | { type: "SET_SIZE"; payload: number }
  | { type: "SET_MATRIX"; payload: { row: number; col: number; value: number } }
  | { type: "SET_VECTOR"; payload: { index: number; value: number } }
  | { type: "SET_RESULT"; payload: SolutionResult }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "RESET" };

const initialState: SolverState = {
  size: 3,
  matrix: Array(3)
    .fill(null)
    .map(() => Array(3).fill(0)),
  vector: Array(3).fill(0),
  result: null,
  isLoading: false,
  error: null,
};

function solverReducer(state: SolverState, action: SolverAction): SolverState {
  switch (action.type) {
    case "SET_SIZE":
      const newSize = action.payload;
      return {
        ...state,
        size: newSize,
        matrix: Array(newSize)
          .fill(null)
          .map(() => Array(newSize).fill(0)),
        vector: Array(newSize).fill(0),
        result: null,
        error: null,
      };
    case "SET_MATRIX":
      const newMatrix = [...state.matrix];
      newMatrix[action.payload.row][action.payload.col] = action.payload.value;
      return { ...state, matrix: newMatrix };
    case "SET_VECTOR":
      const newVector = [...state.vector];
      newVector[action.payload.index] = action.payload.value;
      return { ...state, vector: newVector };
    case "SET_RESULT":
      return { ...state, result: action.payload, isLoading: false };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    case "RESET":
      return { ...initialState, size: state.size };
    default:
      return state;
  }
}

const SolverContext = createContext<{
  state: SolverState;
  dispatch: React.Dispatch<SolverAction>;
} | null>(null);

export function SolverProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(solverReducer, initialState);

  return <SolverContext.Provider value={{ state, dispatch }}>{children}</SolverContext.Provider>;
}

export function useSolver() {
  const context = useContext(SolverContext);
  if (!context) {
    throw new Error("useSolver must be used within a SolverProvider");
  }
  return context;
}
