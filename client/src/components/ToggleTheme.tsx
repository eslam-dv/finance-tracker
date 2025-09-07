import { Moon, Sun } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext } from "react";
import { AppContext, type Theme } from "@/context/appContext";

const ToggleTheme = () => {
  const { theme, setTheme } = useContext(AppContext);

  const handleToggle = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <div>
      <Label
        htmlFor="toggle-theme"
        className={`cursor-pointer relative p-1 rounded-full w-17 h-9 transition-bg duration-300 ${theme == "light" ? "bg-yellow-200" : "bg-blue-200"}`}
      >
        {/* Sliding circle */}
        <span
          className={`flex items-center absolute top-1 left-1 size-7 p-1 rounded-full transition-transform duration-300 ${theme == "light" ? "bg-yellow-400 translate-x-0" : "bg-blue-400 translate-x-8"}`}
        >
          {theme === "light" ? (
            <Sun className="text-white" />
          ) : (
            <Moon className="text-white" />
          )}
        </span>
      </Label>
      <Input
        id="toggle-theme"
        type="checkbox"
        className="hidden"
        onChange={handleToggle}
      />
    </div>
  );
};

export default ToggleTheme;
