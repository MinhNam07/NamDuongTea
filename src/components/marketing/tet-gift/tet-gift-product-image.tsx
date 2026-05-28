"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
  type TransitionEvent,
} from "react";

import {
  TRA_QUAN_COLLECTION_NAME,
  tetGiftSlideSuffixes,
  type TetGiftSlideSuffix,
} from "@/lib/tet-gift-sets";
import { cn } from "@/lib/utils";

const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"] as const;
const SWIPE_THRESHOLD_PX = 48;
const SLIDE_MS = 300;

function slideSources(slug: string, suffix: TetGiftSlideSuffix) {
  return EXTENSIONS.map(
    (ext) => `/images/products/tet-gift-sets/${slug}${suffix}${ext}`,
  );
}

type SlideImageProps = {
  sources: string[];
  alt: string;
  priority?: boolean;
  sizes: string;
  onUnavailable: () => void;
};

function SlideImage({
  sources,
  alt,
  priority,
  sizes,
  onUnavailable,
}: SlideImageProps) {
  const [extIndex, setExtIndex] = useState(0);
  const src = sources[extIndex];

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className="object-contain object-center"
      draggable={false}
      onError={() => {
        if (extIndex < sources.length - 1) {
          setExtIndex((i) => i + 1);
        } else {
          onUnavailable();
        }
      }}
    />
  );
}

type TetGiftProductImageProps = {
  slug: string;
  name: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  gallery?: boolean;
};

function Placeholder({ name, className }: { name: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center bg-gradient-to-b from-tea-ivory to-tea-cream px-6 text-center",
        className,
      )}
      aria-label={name}
    >
      <div className="h-px w-12 bg-tea-gold/60" />
      <p className="mt-4 font-display text-lg font-semibold tracking-wide text-tea-deep-brown">
        {name}
      </p>
      <p className="mt-2 max-w-[14rem] text-xs uppercase tracking-[0.2em] text-tea-muted">
        {TRA_QUAN_COLLECTION_NAME} · Nam Dương Tea
      </p>
      <div className="mt-4 h-px w-12 bg-tea-gold/60" />
    </div>
  );
}

function dotIndexFromTrackPosition(position: number, slideCount: number) {
  if (slideCount <= 1) return 0;
  if (position <= 0) return slideCount - 1;
  if (position >= slideCount + 1) return 0;
  return position - 1;
}

/**
 * Infinite gallery: edge clones + instant reposition after wrap (no visible jump).
 */
export function TetGiftProductImage({
  slug,
  name,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  gallery = true,
}: TetGiftProductImageProps) {
  const slides = useMemo(() => {
    return tetGiftSlideSuffixes(slug, gallery).map((suffix, index) => ({
      key: suffix === "-2" ? "secondary" : "primary",
      sources: slideSources(slug, suffix),
      alt: index === 0 ? `${name} — ảnh 1` : `${name} — ảnh 2`,
    }));
  }, [slug, name, gallery]);

  const [availableKeys, setAvailableKeys] = useState<Set<string>>(
    () => new Set(slides.map((s) => s.key)),
  );

  const visibleSlides = slides.filter((s) => availableKeys.has(s.key));
  const slideCount = visibleSlides.length;

  const [trackPosition, setTrackPosition] = useState(1);
  const [slideTransition, setSlideTransition] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(1);
  const isJumpingRef = useRef(false);
  const pointerStartX = useRef<number | null>(null);

  const trackSlides = useMemo(() => {
    if (slideCount <= 1) return visibleSlides;
    const first = visibleSlides[0]!;
    const last = visibleSlides[slideCount - 1]!;
    return [last, ...visibleSlides, first];
  }, [visibleSlides, slideCount]);

  const activeDotIndex = dotIndexFromTrackPosition(trackPosition, slideCount);
  const useInfiniteTrack = slideCount > 1;

  const moveTo = useCallback((pos: number, animate: boolean) => {
    positionRef.current = pos;
    setSlideTransition(animate);
    setTrackPosition(pos);
  }, []);

  const jumpToPosition = useCallback((pos: number) => {
    if (isJumpingRef.current) return;
    isJumpingRef.current = true;
    positionRef.current = pos;
    setSlideTransition(false);
    setTrackPosition(pos);
    void trackRef.current?.offsetHeight;
    requestAnimationFrame(() => {
      isJumpingRef.current = false;
    });
  }, []);

  useEffect(() => {
    setAvailableKeys(new Set(slides.map((s) => s.key)));
    const startPos = slides.length > 1 ? 1 : 0;
    moveTo(startPos, false);
  }, [slug, gallery, slides, moveTo]);

  const markUnavailable = useCallback(
    (key: string) => {
      setAvailableKeys((prev) => {
        if (!prev.has(key)) return prev;
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
      jumpToPosition(1);
    },
    [jumpToPosition],
  );

  const onTrackTransitionEnd = useCallback(
    (e: TransitionEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      if (e.propertyName !== "transform") return;
      if (isJumpingRef.current) return;

      const pos = positionRef.current;
      if (slideCount <= 1) return;

      if (pos === slideCount + 1) {
        jumpToPosition(1);
      } else if (pos === 0) {
        jumpToPosition(slideCount);
      }
    },
    [jumpToPosition, slideCount],
  );

  const goNext = useCallback(() => {
    if (slideCount <= 1 || isJumpingRef.current) return;
    moveTo(positionRef.current + 1, true);
  }, [slideCount, moveTo]);

  const goPrev = useCallback(() => {
    if (slideCount <= 1 || isJumpingRef.current) return;
    moveTo(positionRef.current - 1, true);
  }, [slideCount, moveTo]);

  const goToDot = useCallback(
    (dotIndex: number) => {
      if (slideCount <= 1 || isJumpingRef.current) return;
      const target = dotIndex + 1;
      const current = positionRef.current;
      if (target === current) return;
      moveTo(target, true);
    },
    [slideCount, moveTo],
  );

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (slideCount <= 1) return;
    pointerStartX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current == null || slideCount <= 1) return;
    const delta = e.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    if (delta < 0) goNext();
    else goPrev();
  };

  const onPointerCancel = () => {
    pointerStartX.current = null;
  };

  if (slideCount === 0) {
    return <Placeholder name={name} className={className} />;
  }

  const showControls = gallery && slideCount > 1;

  return (
    <div
      className={cn("group relative bg-black", className)}
      role={showControls ? "region" : undefined}
      aria-roledescription={showControls ? "carousel" : undefined}
      aria-label={showControls ? `Ảnh sản phẩm ${name}` : undefined}
      onKeyDown={
        showControls
          ? (e) => {
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                goPrev();
              }
              if (e.key === "ArrowRight") {
                e.preventDefault();
                goNext();
              }
            }
          : undefined
      }
      tabIndex={showControls ? 0 : undefined}
    >
      <div
        className={cn(
          "relative h-full w-full overflow-hidden",
          showControls && "cursor-grab active:cursor-grabbing",
        )}
        style={{ touchAction: showControls ? "none" : undefined }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <div
          ref={trackRef}
          className="flex h-full will-change-transform"
          style={{
            transform: `translateX(-${(useInfiniteTrack ? trackPosition : 0) * 100}%)`,
            transition: slideTransition
              ? `transform ${SLIDE_MS}ms ease-out`
              : "none",
          }}
          onTransitionEnd={onTrackTransitionEnd}
        >
          {(useInfiniteTrack ? trackSlides : visibleSlides).map((slide, index) => {
            const isActive = useInfiniteTrack
              ? index === trackPosition
              : index === activeDotIndex;

            return (
              <div
                key={useInfiniteTrack ? `${slide.key}-${index}` : slide.key}
                className="relative h-full min-w-full shrink-0 bg-black"
                aria-hidden={!isActive}
              >
                <SlideImage
                  sources={slide.sources}
                  alt={slide.alt}
                  priority={priority && activeDotIndex === 0 && isActive}
                  sizes={sizes}
                  onUnavailable={() => markUnavailable(slide.key)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {showControls ? (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-tea-gold/30 bg-white/90 text-tea-deep-brown shadow-sm opacity-80 transition-opacity hover:bg-white hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tea-gold/50 md:left-3 md:h-9 md:w-9 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-tea-gold/30 bg-white/90 text-tea-deep-brown shadow-sm opacity-80 transition-opacity hover:bg-white hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tea-gold/50 md:right-3 md:h-9 md:w-9 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
            aria-label="Ảnh sau"
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
          </button>

          <div
            className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5"
            role="tablist"
            aria-label="Chọn ảnh"
          >
            {visibleSlides.map((slide, index) => (
              <button
                key={slide.key}
                type="button"
                role="tab"
                aria-selected={index === activeDotIndex}
                aria-label={`Ảnh ${index + 1}`}
                onClick={() => goToDot(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  index === activeDotIndex
                    ? "w-5 bg-tea-gold"
                    : "w-1.5 bg-white/35 hover:bg-white/55",
                )}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
