"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Play, RotateCcw, AlertCircle } from "lucide-react";
import { useSolver, type SolutionMethod } from "@/contexts/solver-context";
import { useLanguage } from "@/contexts/language-context";
import { solveLinearSystem } from "@/lib/solver";

export default function InputSection() {
  const { state, dispatch } = useSolver();
  const { t } = useLanguage();
  const [method, setMethod] = useState<SolutionMethod>("gauss");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSizeChange = (value: string) => {
    const size = Number.parseInt(value);
    dispatch({ type: "SET_SIZE", payload: size });
    setValidationError(null);
  };

  const handleMatrixChange = (row: number, col: number, value: string) => {
    const numValue = Number.parseFloat(value) || 0;
    dispatch({ type: "SET_MATRIX", payload: { row, col, value: numValue } });
    setValidationError(null);
  };

  const handleVectorChange = (index: number, value: string) => {
    const numValue = Number.parseFloat(value) || 0;
    dispatch({ type: "SET_VECTOR", payload: { index, value: numValue } });
    setValidationError(null);
  };

  const validateInput = (): boolean => {
    // Check if matrix has any non-zero values
    const hasNonZeroMatrix = state.matrix.some((row) => row.some((val) => val !== 0));
    if (!hasNonZeroMatrix) {
      setValidationError(t("input.error.allZeros"));
      return false;
    }

    // Check for NaN values
    const hasNaN = state.matrix.some((row) => row.some((val) => isNaN(val))) || state.vector.some((val) => isNaN(val));
    if (hasNaN) {
      setValidationError(t("input.error.invalidNumbers"));
      return false;
    }

    return true;
  };

  const handleSolve = async () => {
    if (!validateInput()) return;

    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      const result = await solveLinearSystem(state.matrix, state.vector, method);
      dispatch({ type: "SET_RESULT", payload: result });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error instanceof Error ? error.message : "Unknown error" });
    }
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
    setValidationError(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      {/* Configuration */}
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
          <CardTitle className="text-[#00ADB5] text-lg sm:text-xl">{t("input.title")}</CardTitle>
          <CardDescription className="text-gray-400">{t("input.description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-4 sm:px-6 py-2 sm:py-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="size" className="text-white mb-3 block">
                {t("input.matrixSize")}
              </Label>
              <Select value={state.size.toString()} onValueChange={handleSizeChange}>
                <SelectTrigger className="bg-[#121212] border-gray-700 text-white w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-gray-700">
                  {[2, 3, 4, 5, 6].map((size) => (
                    <SelectItem key={size} value={size.toString()} className="text-white">
                      {size}x{size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="method" className="text-white mb-3 block">
                {t("input.method")}
              </Label>
              <Select value={method} onValueChange={(value: SolutionMethod) => setMethod(value)}>
                <SelectTrigger className="bg-[#121212] border-gray-700 text-white w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-gray-700">
                  <SelectItem value="gauss" className="text-white">
                    {t("input.gaussMethod")}
                  </SelectItem>
                  <SelectItem value="gauss-jordan" className="text-white">
                    {t("input.gaussJordanMethod")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSolve} disabled={state.isLoading} className="bg-[#00ADB5] hover:bg-[#00ADB5]/80 text-white flex-1 h-10">
              <Play className="h-4 w-4 mr-2" />
              {state.isLoading ? t("input.solving") : t("input.solve")}
            </Button>
            <Button onClick={handleReset} variant="outline" className="border-gray-700 text-white hover:bg-gray-800 bg-transparent w-10 h-10 px-0 flex items-center justify-center" title={t("input.reset")}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {validationError && (
            <Alert className="border-[#FF3D3D] bg-[#FF3D3D]/10 py-2 px-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-[#FF3D3D] mt-0.5 flex-shrink-0" />
                <AlertDescription className="text-[#FF3D3D] text-sm">{validationError}</AlertDescription>
              </div>
            </Alert>
          )}

          {state.error && (
            <Alert className="border-[#FF3D3D] bg-[#FF3D3D]/10 py-2 px-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-[#FF3D3D] mt-0.5 flex-shrink-0" />
                <AlertDescription className="text-[#FF3D3D] text-sm">{t("input.error")}</AlertDescription>
              </div>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Matrix Input */}
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
          <CardTitle className="text-[#00ADB5] text-lg sm:text-xl">{t("input.matrixCoefficients")}</CardTitle>
          <CardDescription className="text-gray-400">{t("input.matrixInstructions")}</CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 py-2 sm:py-3">
          <div className="overflow-x-auto pb-2 -mx-2 px-2">
            <div className="min-w-[280px]">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {Array.from({ length: state.size }, (_, i) => (
                      <th key={i} className="p-1 sm:p-2 text-[#F8B400] font-mono text-sm">
                        x{i + 1}
                      </th>
                    ))}
                    <th className="p-1 sm:p-2 text-[#F8B400] font-mono text-sm">=</th>
                    <th className="p-1 sm:p-2 text-[#F8B400] font-mono text-sm">b</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: state.size }, (_, row) => (
                    <tr key={row}>
                      {Array.from({ length: state.size }, (_, col) => (
                        <td key={col} className="p-1">
                          <Input
                            type="number"
                            step="any"
                            value={state.matrix[row][col] || ""}
                            onChange={(e) => handleMatrixChange(row, col, e.target.value)}
                            className="w-12 sm:w-14 md:w-16 h-10 sm:h-8 text-center font-mono text-sm bg-[#121212] border-gray-700 text-white"
                            placeholder="0"
                          />
                        </td>
                      ))}
                      <td className="p-1 text-center text-[#F8B400]">=</td>
                      <td className="p-1">
                        <Input
                          type="number"
                          step="any"
                          value={state.vector[row] || ""}
                          onChange={(e) => handleVectorChange(row, e.target.value)}
                          className="w-12 sm:w-14 md:w-16 h-10 sm:h-8 text-center font-mono text-sm bg-[#121212] border-gray-700 text-white"
                          placeholder="0"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
