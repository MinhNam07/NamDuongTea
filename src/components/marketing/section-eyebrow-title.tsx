import { cn } from "@/lib/utils";

type SectionEyebrowTitleProps = {
  eyebrow: string;
  title: string;
  titleEmphasis?: string;
  className?: string;
  headingClassName?: string;
  centered?: boolean;
};

export function SectionEyebrowTitle({
  eyebrow,
  title,
  titleEmphasis,
  className,
  headingClassName,
  centered = false,
}: SectionEyebrowTitleProps) {
  return (
    <div className={cn(centered && "text-center", className)}>
      <div
        className={cn(
          "mb-4 flex items-center gap-3",
          centered && "justify-center",
        )}
      >
        {!centered ? <span className="h-px w-10 bg-tea-moss" aria-hidden /> : null}
        <p className="font-sans text-[17px] font-medium uppercase tracking-[0.28em] text-tea-moss">
          {eyebrow}
        </p>
      </div>

      <h2
        className={cn(
          "max-w-2xl text-4xl leading-[1.05] tracking-tight text-tea-dark-green md:text-5xl lg:text-[3.5rem]",
          centered && "mx-auto",
          headingClassName,
        )}
      >
        <span className="font-serif">{title}</span>
        {titleEmphasis ? (
          <>
            {" "}
            <span className="font-serif italic text-tea-moss">{titleEmphasis}</span>
          </>
        ) : null}
      </h2>
    </div>
  );
}
