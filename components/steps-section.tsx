"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Play, Pause } from "lucide-react";
import { useSolver } from "@/contexts/solver-context";
import { useLanguage } from "@/contexts/language-context";

export default function StepsSection() {
  const { state } = useSolver();
  const { t } = useLanguage();
  const [openSteps, setOpenSteps] = useState<Set<number>>(new Set());
  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleStep = (stepIndex: number) => {
    const newOpenSteps = new Set(openSteps);
    if (newOpenSteps.has(stepIndex)) {
      newOpenSteps.delete(stepIndex);
    } else {
      newOpenSteps.add(stepIndex);
    }
    setOpenSteps(newOpenSteps);
  };

  const toggleAllSteps = () => {
    if (openSteps.size === state.result?.steps.length) {
      setOpenSteps(new Set());
    } else {
      setOpenSteps(new Set(Array.from({ length: state.result?.steps.length || 0 }, (_, i) => i)));
    }
  };

  const startAnimation = () => {
    if (!state.result?.steps.length) return;

    setIsAnimating(true);
    setAnimationStep(0);

    const interval = setInterval(() => {
      setAnimationStep((prev) => {
        if (prev >= (state.result?.steps.length || 0) - 1) {
          setIsAnimating(false);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  const formatMatrix = (matrix: number[][], vector: number[], pivotRow?: number, pivotCol?: number) => {
    return (
      <div className="overflow-x-auto">
        <table className="mx-auto border-collapse font-mono text-sm">
          <tbody>
            {matrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="pr-2 text-[#F8B400]">[</td>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className={`px-2 py-1 text-center min-w-[60px] ${pivotRow === rowIndex && pivotCol === colIndex ? "bg-[#00ADB5] text-black font-bold rounded" : "text-white"}`}>
                    {cell.toFixed(6)}
                  </td>
                ))}
                <td className="px-2 text-[#F8B400]">|</td>
                <td className={`px-2 py-1 text-center min-w-[60px] ${pivotRow === rowIndex ? "bg-[#00ADB5] text-black font-bold rounded" : "text-white"}`}>{vector[rowIndex].toFixed(6)}</td>
                <td className="pl-2 text-[#F8B400]">]</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (!state.result) {
    return (
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader>
          <CardTitle className="text-[#00ADB5]">{t("steps.title")}</CardTitle>
          <CardDescription className="text-gray-400">{t("steps.empty")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">🔢</div>
            <p>{t("steps.noStepsToDisplay")}</p>
            <p className="text-sm mt-2">{t("steps.solveSystem")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader>
          <CardTitle className="text-[#00ADB5]">{t("steps.controls")}</CardTitle>
          <CardDescription className="text-gray-400">{t("steps.controlsDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            <Button onClick={toggleAllSteps} variant="outline" className="border-gray-700 text-white hover:bg-gray-800 bg-transparent">
              {openSteps.size === state.result.steps.length ? t("steps.collapseAll") : t("steps.expandAll")}
            </Button>
            <Button onClick={startAnimation} disabled={isAnimating} className="bg-[#F8B400] hover:bg-[#F8B400]/80 text-black">
              {isAnimating ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  {t("steps.animating")}
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  {t("steps.animate")}
                </>
              )}
            </Button>
          </div>

          {isAnimating && (
            <div className="mt-4">
              <div className="text-sm text-gray-400 mb-2">
                {t("steps.animationProgress")
                  .replace("{current}", String(animationStep + 1))
                  .replace("{total}", String(state.result.steps.length))}
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-[#00ADB5] h-2 rounded-full transition-all duration-300" style={{ width: `${((animationStep + 1) / state.result.steps.length) * 100}%` }} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Steps */}
      <div className="space-y-4">
        {state.result.steps.map((step, index) => (
          <Card key={index} className={`bg-[#1a1a1a] border-gray-800 transition-all duration-500 ${isAnimating && index <= animationStep ? "ring-2 ring-[#00ADB5]" : ""}`}>
            <Collapsible open={openSteps.has(index) || (isAnimating && index <= animationStep)} onOpenChange={() => !isAnimating && toggleStep(index)}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-[#1f1f1f] transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#00ADB5] text-white rounded-full w-8 h-8 flex items-center justify-center font-mono text-sm">{step.step}</div>
                      <div>
                        <CardTitle className="text-[#00ADB5] text-lg">
                          {t("steps.step")} {step.step}
                        </CardTitle>
                        <CardDescription className="text-gray-400">{step.description}</CardDescription>
                      </div>
                    </div>
                    {openSteps.has(index) || (isAnimating && index <= animationStep) ? <ChevronDown className="h-5 w-5 text-gray-400" /> : <ChevronRight className="h-5 w-5 text-gray-400" />}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent>
                  <div className="space-y-4">
                    {step.operation && (
                      <div className="bg-[#121212] border border-gray-700 rounded-lg p-3">
                        <div className="text-[#F8B400] text-sm font-semibold mb-1">{t("steps.operation.label")}</div>
                        <div className="text-white font-mono text-sm">{step.operation}</div>
                      </div>
                    )}

                    <div className="bg-[#121212] border border-gray-700 rounded-lg p-4">
                      <div className="text-[#F8B400] text-sm font-semibold mb-3 text-center">{t("steps.augmentedMatrix")}</div>
                      {formatMatrix(step.matrix, step.vector, step.pivotRow, step.pivotCol)}
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
}
