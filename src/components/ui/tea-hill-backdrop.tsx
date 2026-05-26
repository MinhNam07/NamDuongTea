import { cn } from "@/lib/utils";
import { teaHillBgSrc } from "@/lib/site-assets";

type TeaHillBackdropProps = {
  variant?: "header" | "footer";
  className?: string;
  /** Static blur on image layer — do not change during scroll */
  imageBlurClass?: string;
  children: React.ReactNode;
};

export function TeaHillBackdrop({
  variant = "header",
  className,
  imageBlurClass = "blur-sm",
  children,
}: TeaHillBackdropProps) {
  return (
    <div
      className={cn(
        "relative isolate h-full",
        variant === "header" ? "overflow-visible" : "overflow-hidden",
        className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-x-px -top-px -bottom-px overflow-hidden bg-cover bg-center [transform:translateZ(0)]",
          imageBlurClass,
        )}
        style={{ backgroundImage: `url('${teaHillBgSrc(variant)}')` }}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-x-px -top-px -bottom-px",
          variant === "header"
            ? "bg-gradient-to-b from-tea-dark-green/88 via-tea-deep-brown/78 to-tea-deep-brown/90"
            : "bg-gradient-to-b from-tea-deep-brown/90 via-tea-dark-green/82 to-tea-deep-brown/95",
        )}
      />
      <div className="relative z-10 h-full overflow-visible">{children}</div>
    </div>
  );
}
