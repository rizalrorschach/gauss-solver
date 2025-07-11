"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { BookOpen, Calculator, Eye, Lightbulb } from "lucide-react";
import { useSolver } from "@/contexts/solver-context";
import { useLanguage } from "@/contexts/language-context";

export default function HelpSection() {
  const { dispatch } = useSolver();
  const { t } = useLanguage();

  const loadExample = () => {
    // Load a 3x3 example system
    dispatch({ type: "SET_SIZE", payload: 3 });

    // Example: 2x + y - z = 8, -3x - y + 2z = -11, -2x + y + 2z = -3
    const exampleMatrix = [
      [2, 1, -1],
      [-3, -1, 2],
      [-2, 1, 2],
    ];
    const exampleVector = [8, -11, -3];

    exampleMatrix.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        dispatch({ type: "SET_MATRIX", payload: { row: rowIndex, col: colIndex, value } });
      });
    });

    exampleVector.forEach((value, index) => {
      dispatch({ type: "SET_VECTOR", payload: { index, value } });
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
          <CardTitle className="text-[#00ADB5] flex items-center gap-2 text-lg sm:text-xl">
            <BookOpen className="h-5 w-5" />
            {t("help.title")}
          </CardTitle>
          <CardDescription className="text-gray-400">{t("help.intro")}</CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 py-2 sm:py-3">
          <Tabs defaultValue="overview" className="w-full">
            <div className="overflow-x-auto pb-2 -mx-1">
              <TabsList className="flex w-max min-w-full bg-[#121212] border border-gray-700 p-1">
                <TabsTrigger value="overview" className="data-[state=active]:bg-[#00ADB5] data-[state=active]:text-white whitespace-nowrap text-xs sm:text-sm py-1.5 px-2.5 sm:py-1 sm:px-3">
                  {t("help.tabs.overview")}
                </TabsTrigger>
                <TabsTrigger value="input" className="data-[state=active]:bg-[#00ADB5] data-[state=active]:text-white whitespace-nowrap text-xs sm:text-sm py-1.5 px-2.5 sm:py-1 sm:px-3">
                  {t("help.tabs.inputGuide")}
                </TabsTrigger>
                <TabsTrigger value="methods" className="data-[state=active]:bg-[#00ADB5] data-[state=active]:text-white whitespace-nowrap text-xs sm:text-sm py-1.5 px-2.5 sm:py-1 sm:px-3">
                  {t("help.tabs.methods")}
                </TabsTrigger>
                <TabsTrigger value="examples" className="data-[state=active]:bg-[#00ADB5] data-[state=active]:text-white whitespace-nowrap text-xs sm:text-sm py-1.5 px-2.5 sm:py-1 sm:px-3">
                  {t("help.tabs.examples")}
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="overview" className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              <div className="prose prose-invert max-w-none">
                <h3 className="text-[#00ADB5] text-xl font-semibold">{t("help.overview.whatIs")}</h3>
                <p className="text-gray-300">{t("help.overview.description")}</p>

                <h4 className="text-[#F8B400] text-lg font-semibold mt-6">{t("help.overview.keyFeatures")}</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• {t("help.overview.feature1")}</li>
                  <li>• {t("help.overview.feature2")}</li>
                  <li>• {t("help.overview.feature3")}</li>
                  <li>• {t("help.overview.feature4")}</li>
                  <li>• {t("help.overview.feature5")}</li>
                  <li>• {t("help.overview.feature6")}</li>
                </ul>

                <h4 className="text-[#F8B400] text-lg font-semibold mt-5 sm:mt-6">{t("help.overview.navigation")}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                  <div className="bg-[#121212] border border-gray-700 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-1 sm:mb-2">
                      <Calculator className="h-4 w-4 text-[#00ADB5]" />
                      <span className="text-[#00ADB5] font-semibold">{t("tabs.input")}</span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">{t("help.overview.inputNav")}</p>
                  </div>
                  <div className="bg-[#121212] border border-gray-700 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-1 sm:mb-2">
                      <Eye className="h-4 w-4 text-[#00ADB5]" />
                      <span className="text-[#00ADB5] font-semibold">{t("tabs.output")}</span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">{t("help.overview.outputNav")}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="input" className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              <div className="prose prose-invert max-w-none">
                <h3 className="text-[#00ADB5] text-xl font-semibold">{t("help.input.howTo")}</h3>

                <h4 className="text-[#F8B400] text-lg font-semibold">{t("help.input.step1Title")}</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• {t("help.input.step1a")}</li>
                  <li>• {t("help.input.step1b")}</li>
                </ul>

                <h4 className="text-[#F8B400] text-lg font-semibold mt-6">{t("help.input.step2Title")}</h4>
                <p className="text-gray-300">
                  {t("help.input.systemForm")} <code className="bg-[#121212] px-2 py-1 rounded text-[#00ADB5]">Ax = b</code>:
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li>• {t("help.input.matrixA")}</li>
                  <li>• {t("help.input.vectorB")}</li>
                  <li>• {t("help.input.decimals")}</li>
                  <li>• {t("help.input.empty")}</li>
                </ul>

                <Alert className="border-[#F8B400] bg-[#F8B400]/10 mt-4 py-2 sm:py-3 px-3 sm:px-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-[#F8B400] mt-0.5 flex-shrink-0" />
                    <AlertDescription className="text-[#F8B400] text-sm">
                      <strong>{t("help.input.tipTitle")}</strong> {t("help.input.tip")}
                    </AlertDescription>
                  </div>
                </Alert>

                <h4 className="text-[#F8B400] text-lg font-semibold mt-6">{t("help.input.validation")}</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>{t("help.input.validNumbers")}</li>
                  <li>{t("help.input.notAllZeros")}</li>
                  <li>{t("help.input.singularMatrices")}</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="methods" className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              <div className="prose prose-invert max-w-none">
                <h3 className="text-[#00ADB5] text-xl font-semibold">{t("help.methods.title")}</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
                  <Card className="bg-[#121212] border-gray-700">
                    <CardHeader className="px-3 sm:px-4 py-3 sm:py-4">
                      <CardTitle className="text-[#F8B400] text-base sm:text-lg">{t("help.methods.gaussTitle")}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-300 space-y-2 sm:space-y-3 px-3 sm:px-4 py-2 sm:py-3">
                      <p className="text-sm sm:text-base">
                        <strong>{t("help.methods.purposeLabel")}</strong> {t("help.methods.gaussPurpose").split(t("help.methods.purposeLabel"))[1]}
                      </p>
                      <p className="text-sm sm:text-base">
                        <strong>{t("help.methods.gaussProcess").split(":")[0]}:</strong>
                      </p>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>{t("help.methods.gaussStep1")}</li>
                        <li>{t("help.methods.gaussStep2")}</li>
                        <li>{t("help.methods.gaussStep3")}</li>
                      </ul>
                      <p className="text-sm sm:text-base">
                        <strong>{t("help.methods.gaussBestFor").split(":")[0]}:</strong> {t("help.methods.gaussBestFor").split(": ")[1]}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#121212] border-gray-700">
                    <CardHeader className="px-3 sm:px-4 py-3 sm:py-4">
                      <CardTitle className="text-[#F8B400] text-base sm:text-lg">{t("help.methods.jordanTitle")}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-300 space-y-2 sm:space-y-3 px-3 sm:px-4 py-2 sm:py-3">
                      <p className="text-sm sm:text-base">
                        <strong>{t("help.methods.purposeLabel")}</strong> {t("help.methods.jordanPurpose").split(t("help.methods.purposeLabel"))[1]}
                      </p>
                      <p className="text-sm sm:text-base">
                        <strong>{t("help.methods.jordanProcess").split(":")[0]}:</strong>
                      </p>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>{t("help.methods.jordanStep1")}</li>
                        <li>{t("help.methods.jordanStep2")}</li>
                        <li>{t("help.methods.jordanStep3")}</li>
                      </ul>
                      <p className="text-sm sm:text-base">
                        <strong>{t("help.methods.jordanBestFor").split(":")[0]}:</strong> {t("help.methods.jordanBestFor").split(": ")[1]}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <h4 className="text-[#F8B400] text-base sm:text-lg font-semibold mt-5 sm:mt-6">{t("help.methods.solutionTypes")}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
                  <div className="bg-[#121212] border border-green-500 rounded-lg p-3 sm:p-4">
                    <div className="text-[#4CAF50] font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{t("help.methods.uniqueSolution")}</div>
                    <p className="text-gray-400 text-xs sm:text-sm">{t("help.methods.uniqueDesc")}</p>
                  </div>
                  <div className="bg-[#121212] border border-yellow-500 rounded-lg p-3 sm:p-4">
                    <div className="text-[#F8B400] font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{t("help.methods.infiniteSolutions")}</div>
                    <p className="text-gray-400 text-xs sm:text-sm">{t("help.methods.infiniteDesc")}</p>
                  </div>
                  <div className="bg-[#121212] border border-red-500 rounded-lg p-3 sm:p-4">
                    <div className="text-[#FF3D3D] font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{t("help.methods.noSolution")}</div>
                    <p className="text-gray-400 text-xs sm:text-sm">{t("help.methods.noSolutionDesc")}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="examples" className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              <div className="prose prose-invert max-w-none">
                <h3 className="text-[#00ADB5] text-xl font-semibold">{t("help.examples.title")}</h3>

                <Card className="bg-[#121212] border-gray-700 mt-4 sm:mt-6">
                  <CardHeader className="px-3 sm:px-4 py-3 sm:py-4">
                    <CardTitle className="text-[#F8B400] text-base sm:text-lg">{t("help.examples.example1Title")}</CardTitle>
                    <CardDescription className="text-gray-400 text-xs sm:text-sm">{t("help.examples.example1Desc")}</CardDescription>
                  </CardHeader>
                  <CardContent className="px-3 sm:px-4 py-2 sm:py-3">
                    <div className="bg-[#1a1a1a] border border-gray-600 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm">
                      <div className="text-[#00ADB5] mb-2">{t("help.examples.system")}</div>
                      <div className="text-gray-300 space-y-1">
                        <div>2x + y - z = 8</div>
                        <div>-3x - y + 2z = -11</div>
                        <div>-2x + y + 2z = -3</div>
                      </div>
                      <div className="text-[#4CAF50] mt-3">
                        <strong>{t("help.examples.solution").split(":")[0]}:</strong> x = 2, y = 3, z = -1
                      </div>
                    </div>
                    <Button onClick={loadExample} className="mt-3 sm:mt-4 bg-[#00ADB5] hover:bg-[#00ADB5]/80 text-white h-10">
                      {t("help.examples.loadExample")}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-[#121212] border-gray-700 mt-3 sm:mt-4">
                  <CardHeader className="px-3 sm:px-4 py-3 sm:py-4">
                    <CardTitle className="text-[#F8B400] text-base sm:text-lg">{t("help.examples.commonIssues")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-4 py-2 sm:py-3">
                    <div className="bg-[#1a1a1a] border border-gray-600 rounded-lg p-3 sm:p-4">
                      <div className="text-[#FF3D3D] font-semibold mb-1 sm:mb-2 text-sm">{t("help.examples.issue1")}</div>
                      <div className="text-gray-300 text-xs sm:text-sm">
                        <strong>{t("help.examples.cause1").split(":")[0]}:</strong> {t("help.examples.cause1").split(": ")[1]}
                        <br />
                        <strong>{t("help.examples.solution1").split(":")[0]}:</strong> {t("help.examples.solution1").split(": ")[1]}
                      </div>
                    </div>
                    <div className="bg-[#1a1a1a] border border-gray-600 rounded-lg p-3 sm:p-4">
                      <div className="text-[#FF3D3D] font-semibold mb-1 sm:mb-2 text-sm">{t("help.examples.issue2")}</div>
                      <div className="text-gray-300 text-xs sm:text-sm">
                        <strong>{t("help.examples.cause2").split(":")[0]}:</strong> {t("help.examples.cause2").split(": ")[1]}
                        <br />
                        <strong>{t("help.examples.solution2").split(":")[0]}:</strong> {t("help.examples.solution2").split(": ")[1]}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
