import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitch() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.body.style.backgroundColor = dark ? "#0b1020" : "#CBD5E1";
  }, [dark]);

  return (
    <div className=" fixed top-4 right-4 z-50 ">
      <div
        onClick={() => setDark(!dark)}
        className="
          relative w-24 h-9 cursor-pointer select-none
          rounded-full p-1
          backdrop-blur-xl bg-white/25
          shadow-[0_6px_18px_rgba(0,0,0,0.25)]
          transition-all duration-400
        "
      >
        {/* SOFT GLOW */}
        <div
          className={`
            absolute inset-0 rounded-full blur-lg opacity-40
            transition-all duration-400
            ${dark ? "bg-purple-600" : "bg-yellow-400"}
          `}
        />

        {/* SLIDING KNOB */}
        <div
          className={`
            absolute top-1 left-1
            w-7 h-7 rounded-full
            flex items-center justify-center
            backdrop-blur-xl bg-white/40
            shadow-[inset_0_0_8px_rgba(255,255,255,0.45)]
            transition-all duration-400 ease-out
            ${dark ? "translate-x-0" : "translate-x-[60px]"}
          `}
        >
          {/* KNOB GLOW */}
          <div
            className={`
              absolute inset-0 rounded-full blur-sm
              ${dark ? "bg-purple-500" : "bg-yellow-400"}
            `}
          />

          {/* ICON */}
          <div className="relative z-10">
            {dark ? (
              <Moon size={12} className="text-white" />
            ) : (
              <Sun size={12} className="text-white" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
