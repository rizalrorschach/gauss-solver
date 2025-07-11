"use client";

import { useLanguage } from "@/contexts/language-context";
import { Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <Globe className="h-4 w-4 text-[#00ADB5]" />
      <Select defaultValue={language} onValueChange={(value) => setLanguage(value as "id" | "en")}>
        <SelectTrigger className="w-[100px] sm:w-[140px] h-8 sm:h-9 text-xs sm:text-sm bg-[#1a1a1a] border-gray-800 text-white">
          <SelectValue placeholder={t("language.select")} />
        </SelectTrigger>
        <SelectContent className="bg-[#1a1a1a] border-gray-800 text-white">
          <SelectItem value="id">{t("language.id")}</SelectItem>
          <SelectItem value="en">{t("language.en")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
