import { cn } from "@/lib/utils";

type SectionEyebrowTitleProps = {
  eyebrow: string;
  title: string;
  titleEmphasis?: string;
  className?: string;
  headingClassName?: string;
  centered?: boolean;
  tone?: "default" | "inverse";
};

export function SectionEyebrowTitle({
  eyebrow,
  title,
  titleEmphasis,
  className,
  headingClassName,
  centered = false,
  tone = "default",
}: SectionEyebrowTitleProps) {
  const inverse = tone === "inverse";

  return (
    <div className={cn(centered && "text-center", className)}>
      <div
        className={cn(
          "mb-4 flex items-center gap-3",
          centered && "justify-center",
        )}
      >
        {centered && inverse ? (
          <span className="h-px w-10 bg-[#f3e2a6]/80" aria-hidden />
        ) : null}
        {!centered ? (
          <span
            className={cn(
              "h-px w-10",
              inverse ? "bg-[#f3e2a6]/80" : "bg-tea-moss",
            )}
            aria-hidden
          />
        ) : null}
        <p
          className={cn(
            "font-sans text-[17px] font-medium uppercase tracking-[0.28em]",
            inverse ? "text-[#f3e2a6]" : "text-tea-moss",
          )}
        >
          {eyebrow}
        </p>
        {centered && inverse ? (
          <span className="h-px w-10 bg-[#f3e2a6]/80" aria-hidden />
        ) : null}
      </div>

      <h2
        className={cn(
          "max-w-2xl text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-[3.5rem]",
          inverse ? "text-white" : "text-tea-dark-green",
          centered && "mx-auto",
          headingClassName,
        )}
      >
        <span className="font-serif">{title}</span>
        {titleEmphasis ? (
          <>
            {" "}
            <span
              className={cn(
                "font-serif italic",
                inverse ? "text-tea-olive" : "text-tea-moss",
              )}
            >
              {titleEmphasis}
            </span>
          </>
        ) : null}
      </h2>
    </div>
  );
}
