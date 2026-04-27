"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex items-center gap-3 text-sm font-medium">
      {/* Light */}
      <span
        className={`${!isDark ? "text-black dark:text-white" : "text-gray-400"}`}
      >
        Light
      </span>

      {/* 토글 */}
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={`
          relative w-14 h-7 rounded-full overflow-hidden
          transition-all duration-500 shadow-inner
          ${
            isDark
              ? "bg-linear-to-r from-[#0f172a] via-[#1e1b4b] to-[#020617]"
              : "bg-linear-to-r from-[#87CEEB] via-[#bae6fd] to-[#e0f2fe]"
          }
        `}
      >
        {/* ⭐ 별 (점 + 아이콘) */}
        <div
          className={`
            absolute inset-0 transition-opacity duration-500
            ${isDark ? "opacity-100" : "opacity-0"}
          `}
        >
          {/* 점 별 */}
          <div className="absolute w-1 h-1 bg-white rounded-full top-2 left-3" />
          <div className="absolute w-1 h-1 bg-white rounded-full top-4 left-7" />

          {/* 큰 별 */}
          <div className="absolute text-[8px] top-1 left-6">⭐</div>
        </div>

        {/* ☁️ 구름 */}
        <div
          className={`
            absolute left-2 top-3 w-4 h-2 bg-white rounded-full
            transition-all duration-500
            ${isDark ? "opacity-0 translate-y-2" : "opacity-100"}
          `}
        />
        <div
          className={`
            absolute left-4 top-4 w-3 h-2 bg-white rounded-full
            transition-all duration-500 delay-75
            ${isDark ? "opacity-0 translate-y-2" : "opacity-100"}
          `}
        />

        {/* ☀️ */}
        <div
          className={`
            absolute left-1 top-1/2 -translate-y-1/2 text-xs
            transition-all duration-500
            ${isDark ? "opacity-0 -translate-x-4" : "opacity-100"}
          `}
        >
          ☀️
        </div>

        {/* 🌙 */}
        <div
          className={`
            absolute right-1 top-1/2 -translate-y-1/2 text-xs
            transition-all duration-500
            ${isDark ? "opacity-100" : "opacity-0 translate-x-4"}
          `}
        >
          🌙
        </div>

        {/* 🔘 썸 */}
        <div
          className={`
            absolute top-0.5 w-6 h-6 rounded-full bg-white/90 shadow-md
            transition-all duration-500
            ease-[cubic-bezier(0.34,1.56,0.64,1)]
            ${isDark ? "left-7" : "left-0.5"}
          `}
        />
      </button>

      {/* Dark */}
      <span className={`${isDark ? "text-white" : "text-gray-400"}`}>Dark</span>
    </div>
  );
}
