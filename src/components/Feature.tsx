import type { LucideIcon } from "lucide-react";
import type React from "react";
import { useTheme } from "./ThemeProvider";

type FeatureProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

const Feature: React.FC<FeatureProps> = ({
  title,
  description,
  icon: Icon,
  color,
}) => {
  const { theme } = useTheme();

  return (
    <div
      className={`flex flex-col justify-center items-center rounded-lg px-4 py-10 text-center ${
        theme === "dark" ? "bg-neutral-900" : "shadow-lg"
      }`}
    >
      <Icon
        className={`sm:w-8 sm:h-8 flex justify-center items-center mb-4 ${color}`}
      />
      <h3 className="text-md sm:text-lg md:text-xl font-bold">{title}</h3>
      <p className="mt-2 text-sm">{description}</p>
    </div>
  );
};

export default Feature;
