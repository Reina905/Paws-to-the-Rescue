import { PawPrint } from "lucide-react";

export const PawBackground = () => {
  const paws = [
    { top: "5%", left: "8%", rotate: "12deg" },
    { top: "12%", right: "15%", rotate: "-18deg" },
    { top: "20%", left: "25%", rotate: "25deg" },
    { top: "28%", right: "8%", rotate: "-10deg" },
    { top: "36%", left: "70%", rotate: "40deg" },
    { top: "45%", left: "12%", rotate: "-30deg" },
    { top: "55%", right: "22%", rotate: "15deg" },
    { top: "63%", left: "45%", rotate: "-20deg" },
    { top: "72%", left: "18%", rotate: "35deg" },
    { top: "82%", right: "12%", rotate: "-15deg" },
    { top: "90%", left: "60%", rotate: "20deg" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {paws.map((paw, index) => (
        <PawPrint
          key={index}
          size={26}
          className="absolute text-primary opacity-[0.06]"
          style={{
            top: paw.top,
            left: paw.left,
            right: paw.right,
            transform: `rotate(${paw.rotate})`,
          }}
        />
      ))}
    </div>
  );
};