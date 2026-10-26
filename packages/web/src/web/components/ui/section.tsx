import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { useI18n } from "../../lib/i18n";
import { Reveal } from "./reveal";

export function Section({
  children,
  className,
  id,
  tone = "paper",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "paper" | "cream" | "sand" | "ink";
}) {
  const tones = {
    paper: "bg-white text-[#1c1814]",
    cream: "bg-cream text-[#1c1814]",
    sand: "bg-sand text-[#1c1814]",
    ink: "bg-ink text-sand",
  } as const;
  return (
    <section id={id} className={cn("py-20 lg:py-28", tones[tone], className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHeading({
  label,
  title,
  subtitle,
  tone = "light",
  align = "center",
  className,
}: {
  label?: string;
  title: string;
  subtitle?: string;
  tone?: "light" | "dark";
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
        {label ? <p className="label-gold mb-4">{label}</p> : null}
        <h2
          className={cn(
            "text-3xl leading-tight sm:text-4xl lg:text-[42px]",
            tone === "dark" ? "text-cream" : "text-[#1c1814]",
          )}
        >
          {title}
        </h2>
        <span
          className={cn(
            "mt-6 block h-px w-24 bg-gold/70",
            align === "center" && "mx-auto",
          )}
        />
        {subtitle ? (
          <p
            className={cn(
              "mt-5 text-[15px] leading-relaxed",
              tone === "dark" ? "text-sand/70" : "text-ink-soft",
            )}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}

export function Loader({ label }: { label?: string }) {
  const { t } = useI18n();
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-ink-soft">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      <span className="text-sm uppercase tracking-[0.2em]">{label ?? t("loading")}</span>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="animate-pulse border border-border bg-white">
      <div className="h-52 w-full bg-sand" />
      <div className="space-y-3 p-6">
        <div className="h-3 w-24 bg-sand" />
        <div className="h-5 w-3/4 bg-sand" />
        <div className="h-3 w-full bg-sand" />
        <div className="h-3 w-2/3 bg-sand" />
      </div>
    </div>
  );
}
