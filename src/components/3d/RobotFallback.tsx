import { cn } from "@/lib/cn";

export function RobotFallback({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-[340px]", className)} role="img" aria-label="GrydIn assistant robot">
      <div className="absolute inset-x-[14%] top-[4%] aspect-square animate-float rounded-full bg-[radial-gradient(circle_at_35%_30%,#5eead4,#0d8b99_55%,#0b5d68)] shadow-[0_0_80px_-10px_rgba(45,212,191,.55)]">
        <div className="absolute inset-[20%] flex items-center justify-center gap-[12%] rounded-full bg-navy-950">
          <span className="h-[36%] w-[13%] rounded-full bg-yellow-300 shadow-[0_0_18px_rgba(250,204,21,.8)]" />
          <span className="h-[36%] w-[13%] rounded-full bg-yellow-300 shadow-[0_0_18px_rgba(250,204,21,.8)]" />
        </div>
      </div>
      <div className="absolute inset-x-[8%] bottom-[2%] h-[14%] rounded-[50%] border-2 border-teal-glow/70 shadow-[0_0_30px_rgba(45,212,191,.5)]" />
    </div>
  );
}
