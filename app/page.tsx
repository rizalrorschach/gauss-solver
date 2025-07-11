"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, FileText, BarChart3, HelpCircle, Brain, Github } from "lucide-react";
import InputSection from "@/components/input-section";
import OutputSection from "@/components/output-section";
import StepsSection from "@/components/steps-section";
import VisualizationSection from "@/components/visualization-section";
import HelpSection from "@/components/help-section";
import LanguageSelector from "@/components/language-selector";
import { SolverProvider } from "@/contexts/solver-context";
import { useLanguage } from "@/contexts/language-context";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function GaussSolver() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("input");

  const handleSolvingComplete = () => {
    setActiveTab("output");
  };

  return (
    <SolverProvider>
      <div className="flex flex-col min-h-screen bg-[#121212] text-white">
        {/* Header */}
        <header className="border-b border-gray-800 bg-[#1a1a1a]">
          <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-[#00ADB5]" />
                <h1 className="text-xl sm:text-3xl font-bold">Gauss Solver</h1>
              </div>
              <LanguageSelector />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 flex-grow">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="overflow-x-auto pb-2">
              <TooltipProvider>
                <TabsList className="flex w-max min-w-full bg-[#1a1a1a] border border-gray-800 p-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger value="input" className="flex-1 data-[state=active]:bg-[#00ADB5] data-[state=active]:text-white px-3 sm:px-4">
                        <Calculator className="h-5 w-5 sm:h-4 sm:w-4 sm:mr-2" />
                        <span className="hidden sm:inline">{t("tabs.input")}</span>
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="sm:hidden">
                      {t("tabs.input")}
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger value="output" className="flex-1 data-[state=active]:bg-[#00ADB5] data-[state=active]:text-white px-3 sm:px-4">
                        <FileText className="h-5 w-5 sm:h-4 sm:w-4 sm:mr-2" />
                        <span className="hidden sm:inline">{t("tabs.output")}</span>
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="sm:hidden">
                      {t("tabs.output")}
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger value="steps" className="flex-1 data-[state=active]:bg-[#00ADB5] data-[state=active]:text-white px-3 sm:px-4">
                        <BarChart3 className="h-5 w-5 sm:h-4 sm:w-4 sm:mr-2" />
                        <span className="hidden sm:inline">{t("tabs.steps")}</span>
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="sm:hidden">
                      {t("tabs.steps")}
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger value="visualization" className="flex-1 data-[state=active]:bg-[#00ADB5] data-[state=active]:text-white px-3 sm:px-4">
                        <BarChart3 className="h-5 w-5 sm:h-4 sm:w-4 sm:mr-2" />
                        <span className="hidden sm:inline">{t("tabs.visualization")}</span>
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="sm:hidden">
                      {t("tabs.visualization")}
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger value="help" className="flex-1 data-[state=active]:bg-[#00ADB5] data-[state=active]:text-white px-3 sm:px-4">
                        <HelpCircle className="h-5 w-5 sm:h-4 sm:w-4 sm:mr-2" />
                        <span className="hidden sm:inline">{t("tabs.help")}</span>
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="sm:hidden">
                      {t("tabs.help")}
                    </TooltipContent>
                  </Tooltip>
                </TabsList>
              </TooltipProvider>
            </div>

            <div className="mt-6">
              <TabsContent value="input">
                <InputSection onSolvingComplete={handleSolvingComplete} />
              </TabsContent>

              <TabsContent value="output">
                <OutputSection />
              </TabsContent>

              <TabsContent value="steps">
                <StepsSection />
              </TabsContent>

              <TabsContent value="visualization">
                <VisualizationSection />
              </TabsContent>

              <TabsContent value="help">
                <HelpSection />
              </TabsContent>
            </div>
          </Tabs>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-800 bg-[#1a1a1a] mt-auto">
          <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
            <div className="text-center text-gray-400">
              <p className="text-sm sm:text-base">
                © 2025 Gauss Solver -{" "}
                <a href="https://rizalize.com" target="_blank" rel="noopener noreferrer" className="text-[#00ADB5] hover:text-[#00ADB5]/80 transition-colors">
                  Rizal Rorschach
                </a>
              </p>
              <p className="text-xs sm:text-sm mt-1">Numerical Methods Implementation</p>
              <div className="mt-3 flex justify-center">
                <a href="https://github.com/rizalrorschach/gauss-solver" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-gray-400 hover:text-white transition-colors" aria-label="GitHub Repository">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </SolverProvider>
  );
}
