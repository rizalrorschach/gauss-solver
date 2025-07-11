"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSolver } from "@/contexts/solver-context";
import { useLanguage } from "@/contexts/language-context";

export default function VisualizationSection() {
  const { state } = useSolver();
  const { t } = useLanguage();

  const renderMatrixVisualization = () => {
    if (!state.result?.steps.length) return null;

    return (
      <div className="space-y-6">
        {state.result.steps.map((step, index) => (
          <Card key={index} className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-[#00ADB5] text-lg">{t("visualization.stepVisualization").replace("{step}", String(step.step))}</CardTitle>
              <CardDescription className="text-gray-400">{step.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Matrix Heatmap */}
                <div>
                  <h4 className="text-[#F8B400] font-semibold mb-3">{t("visualization.matrixHeatmap")}</h4>
                  <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${state.size}, 1fr)` }}>
                    {step.matrix.flat().map((value, cellIndex) => {
                      const absValue = Math.abs(value);
                      const maxValue = Math.max(...step.matrix.flat().map((v) => Math.abs(v)));
                      const intensity = maxValue > 0 ? absValue / maxValue : 0;
                      const row = Math.floor(cellIndex / state.size);
                      const col = cellIndex % state.size;
                      const isPivot = step.pivotRow === row && step.pivotCol === col;

                      return (
                        <div
                          key={cellIndex}
                          className={`aspect-square flex items-center justify-center text-xs font-mono rounded ${isPivot ? "bg-[#00ADB5] text-black font-bold" : value === 0 ? "bg-gray-800 text-gray-500" : `bg-blue-500 text-white`}`}
                          style={{
                            opacity: isPivot ? 1 : Math.max(0.3, intensity),
                            backgroundColor: isPivot ? "#00ADB5" : value === 0 ? "#374151" : `rgba(59, 130, 246, ${intensity})`,
                          }}
                        >
                          {value.toFixed(1)}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Vector Visualization */}
                <div>
                  <h4 className="text-[#F8B400] font-semibold mb-3">{t("visualization.vectorB")}</h4>
                  <div className="space-y-1">
                    {step.vector.map((value, index) => {
                      const absValue = Math.abs(value);
                      const maxValue = Math.max(...step.vector.map((v) => Math.abs(v)));
                      const intensity = maxValue > 0 ? absValue / maxValue : 0;
                      const isPivotRow = step.pivotRow === index;

                      return (
                        <div
                          key={index}
                          className={`h-8 flex items-center justify-center text-sm font-mono rounded ${isPivotRow ? "bg-[#00ADB5] text-black font-bold" : value === 0 ? "bg-gray-800 text-gray-500" : "bg-green-500 text-white"}`}
                          style={{
                            opacity: isPivotRow ? 1 : Math.max(0.3, intensity),
                            backgroundColor: isPivotRow ? "#00ADB5" : value === 0 ? "#374151" : `rgba(34, 197, 94, ${intensity})`,
                          }}
                        >
                          {value.toFixed(6)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderSolutionPath = () => {
    if (!state.result?.solution || state.size !== 2) return null;

    const [x, y] = state.result.solution;
    if (typeof x !== "number" || typeof y !== "number") return null;

    // Create a simple 2D plot for 2x2 systems
    const scale = 10;
    const centerX = 150;
    const centerY = 150;

    return (
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader>
          <CardTitle className="text-[#00ADB5]">{t("visualization.solutionVisualization")}</CardTitle>
          <CardDescription className="text-gray-400">{t("visualization.solutionPoint")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <svg width="300" height="300" className="border border-gray-700 rounded-lg bg-[#121212]">
              {/* Grid lines */}
              {Array.from({ length: 21 }, (_, i) => (
                <g key={i}>
                  <line x1={i * 15} y1={0} x2={i * 15} y2={300} stroke="#374151" strokeWidth="0.5" />
                  <line x1={0} y1={i * 15} x2={300} y2={i * 15} stroke="#374151" strokeWidth="0.5" />
                </g>
              ))}

              {/* Axes */}
              <line x1={centerX} y1={0} x2={centerX} y2={300} stroke="#6B7280" strokeWidth="2" />
              <line x1={0} y1={centerY} x2={300} y2={centerY} stroke="#6B7280" strokeWidth="2" />

              {/* Solution point */}
              <circle cx={centerX + x * scale} cy={centerY - y * scale} r="6" fill="#00ADB5" stroke="#FFFFFF" strokeWidth="2" />

              {/* Labels */}
              <text x={centerX + x * scale + 10} y={centerY - y * scale - 10} fill="#00ADB5" fontSize="12" fontFamily="monospace">
                ({x.toFixed(2)}, {y.toFixed(2)})
              </text>

              {/* Axis labels */}
              <text x={290} y={centerY + 15} fill="#F8B400" fontSize="12">
                x
              </text>
              <text x={centerX + 5} y={15} fill="#F8B400" fontSize="12">
                y
              </text>
            </svg>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (!state.result) {
    return (
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader>
          <CardTitle className="text-[#00ADB5]">{t("visualization.title")}</CardTitle>
          <CardDescription className="text-gray-400">{t("visualization.empty")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">📈</div>
            <p>{t("visualization.notAvailable")}</p>
            <p className="text-sm mt-2">{t("visualization.solveToSee")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {renderSolutionPath()}
      {renderMatrixVisualization()}
    </div>
  );
}
