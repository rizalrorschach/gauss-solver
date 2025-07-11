"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useSolver } from "@/contexts/solver-context";
import { useLanguage } from "@/contexts/language-context";
import { exportResults } from "@/lib/export";

export default function OutputSection() {
  const { state } = useSolver();
  const { t } = useLanguage();

  const getTranslatedMessage = (message: string) => {
    // Map the hardcoded messages to translation keys
    if (message === "System solved successfully using Gauss Elimination with partial pivoting") {
      return t("output.successMessage");
    }
    return message;
  };

  const getStatusIcon = () => {
    if (!state.result) return null;

    switch (state.result.status) {
      case "solved":
        return <CheckCircle className="h-5 w-5 text-[#4CAF50]" />;
      case "no-solution":
        return <XCircle className="h-5 w-5 text-[#FF3D3D]" />;
      case "infinite-solutions":
        return <AlertTriangle className="h-5 w-5 text-[#F8B400]" />;
      case "error":
        return <XCircle className="h-5 w-5 text-[#FF3D3D]" />;
      default:
        return null;
    }
  };

  // Removed unused getStatusBadge function

  const handleExport = async (format: "pdf" | "txt") => {
    if (!state.result) return;

    try {
      await exportResults(state.result, state.matrix, state.vector, format);
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  if (!state.result) {
    return (
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
          <CardTitle className="text-[#00ADB5] text-lg sm:text-xl">{t("output.title")}</CardTitle>
          <CardDescription className="text-gray-400">{t("output.waitingForResults")}</CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 py-2 sm:py-3">
          <div className="text-center py-8 sm:py-12 text-gray-500">
            <div className="text-5xl sm:text-6xl mb-4">📊</div>
            <p>{t("output.noSolutionComputed")}</p>
            <p className="text-sm mt-2">{t("output.configureSystem")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              {getStatusIcon()}
              <CardTitle className="text-[#00ADB5] text-lg sm:text-xl">{t("output.status")}</CardTitle>
            </div>
            <div className="bg-[#4CAF50] text-white text-sm font-medium py-1 px-3 rounded-md">{t("output.status.solved")}</div>
          </div>
          <CardDescription className="text-gray-400">
            {t("output.method")} {state.result.method === "gauss" ? t("output.gaussMethod") : t("output.gaussJordanMethod")}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 py-2 sm:py-3">
          {state.result.message && (
            <p className="text-gray-300 mb-4">
              {t("output.message")} {getTranslatedMessage(state.result.message)}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={() => handleExport("pdf")} className="bg-[#F8B400] hover:bg-[#F8B400]/80 text-black h-10 flex-1 sm:flex-none">
              <Download className="h-4 w-4 mr-2" />
              {t("output.export")} (PDF)
            </Button>
            <Button onClick={() => handleExport("txt")} variant="outline" className="border-gray-700 text-white hover:bg-gray-800 h-10 flex-1 sm:flex-none">
              <Download className="h-4 w-4 mr-2" />
              {t("output.export")} (TXT)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Solution Vector */}
      {state.result.solution && (
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
            <CardTitle className="text-[#00ADB5] text-lg sm:text-xl">{t("output.solution")}</CardTitle>
            <CardDescription className="text-gray-400">{t("output.variableValues")}</CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 py-2 sm:py-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {state.result.solution.map((value, index) => (
                <div key={index} className="bg-[#121212] border border-gray-700 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-[#F8B400] font-mono text-sm mb-1">x{index + 1}</div>
                  <div className="text-white font-mono text-base sm:text-lg">{typeof value === "number" ? value.toFixed(6) : value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Statistics */}
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
          <CardTitle className="text-[#00ADB5] text-lg sm:text-xl">{t("output.solutionSummary")}</CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 py-2 sm:py-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
            <div className="bg-[#121212] border border-gray-700 rounded-lg p-2 sm:p-3">
              <div className="text-[#F8B400] text-sm">{t("output.matrixSize")}</div>
              <div className="text-white font-mono text-base sm:text-lg">
                {state.size}×{state.size}
              </div>
            </div>
            <div className="bg-[#121212] border border-gray-700 rounded-lg p-3">
              <div className="text-[#F8B400] text-sm">{t("output.steps")}</div>
              <div className="text-white font-mono text-lg">{state.result.steps.length}</div>
            </div>
            <div className="bg-[#121212] border border-gray-700 rounded-lg p-3">
              <div className="text-[#F8B400] text-sm">{t("output.methodLabel")}</div>
              <div className="text-white text-sm">{state.result.method === "gauss" ? "Gauss" : "G-Jordan"}</div>
            </div>
            <div className="bg-[#121212] border border-gray-700 rounded-lg p-3">
              <div className="text-[#F8B400] text-sm">{t("output.statusLabel")}</div>
              <div className="text-white text-sm capitalize">{state.result.status.replace("-", " ")}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
