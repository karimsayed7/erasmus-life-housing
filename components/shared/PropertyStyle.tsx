import { icons } from "lucide-react";

// في PropertyStyle.tsx
interface Props {
  text: string;
  icon?: string; // ← string بدل LucideIcon
  bg?: "gray" | "blue";
  textcolor?: "gray" | "blue";
}

export default function PropertyStyle({ text, icon, bg = "gray", textcolor = "gray" }: Props) {
  const Icon = icon ? icons[icon as keyof typeof icons] : null; // ← هنا السحر

  return (
    <div className={`px-2 py-1 mb-2 mt-3 w-fit rounded-full flex items-center gap-2
      ${bg === "gray" ? "bg-gray-200" : "bg-blue-200"}`}
    >
      {Icon && <Icon size={16} className="shrink-0"/>}
      <p className={`${textcolor === "gray" ? "text-gray-800" : "text-blue-800"}`}>
        {text}
      </p>
    </div>
  );
}