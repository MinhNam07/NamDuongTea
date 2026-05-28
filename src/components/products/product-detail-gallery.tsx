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

import { cn } from "@/lib/utils";

export type ProductDetailGalleryImage = {
  src: string;
  alt: string;
};

const SWIPE_THRESHOLD_PX = 48;
const SLIDE_MS = 300;

function dotIndexFromTrackPosition(position: number, slideCount: number) {
  if (slideCount <= 1) return 0;
  if (position <= 0) return slideCount - 1;
  if (position >= slideCount + 1) return 0;
  return position - 1;
}

export function ProductDetailGallery({
  images,
  className,
}: {
  images: ProductDetailGalleryImage[];
  className?: string;
}) {
  const safeImages = useMemo(
    () => images.filter((i) => Boolean(i.src)),
    [images],
  );
  const slideCount = safeImages.length;
  const useInfiniteTrack = slideCount > 1;

  const trackSlides = useMemo(() => {
    if (slideCount <= 1) return safeImages;
    const first = safeImages[0]!;
    const last = safeImages[slideCount - 1]!;
    return [last, ...safeImages, first];
  }, [safeImages, slideCount]);

  const [trackPosition, setTrackPosition] = useState(1);
  const [slideTransition, setSlideTransition] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(1);
  const isJumpingRef = useRef(false);
  const pointerStartX = useRef<number | null>(null);

  const activeIndex = useInfiniteTrack
    ? dotIndexFromTrackPosition(trackPosition, slideCount)
    : 0;

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
    const startPos = slideCount > 1 ? 1 : 0;
    moveTo(startPos, false);
  }, [safeImages, slideCount, moveTo]);

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

  const goToIndex = useCallback(
    (index: number) => {
      if (slideCount <= 1 || isJumpingRef.current) return;
      const target = index + 1;
      if (target === positionRef.current) return;
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

  if (safeImages.length === 0) {
    return (
      <div
        className={cn(
          "w-full rounded-2xl bg-muted text-muted-foreground",
          "flex h-[420px] items-center justify-center",
          className,
        )}
      >
        Không có hình ảnh
      </div>
    );
  }

  const showControls = slideCount > 1;

  return (
    <div
      className={cn("group flex flex-col gap-4", className)}
      role={showControls ? "region" : undefined}
      aria-roledescription={showControls ? "carousel" : undefined}
      aria-label={showControls ? "Ảnh sản phẩm" : undefined}
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
          "relative w-full overflow-hidden rounded-2xl glass-panel",
          "h-[420px] md:h-[560px]",
          "shadow-[0_8px_32px_0_rgba(37,74,12,0.10)]",
        )}
      >
        <div
          ref={trackRef}
          className={cn(
            "flex h-full will-change-transform",
            showControls && "cursor-grab active:cursor-grabbing",
          )}
          style={{
            transform: `translateX(-${(useInfiniteTrack ? trackPosition : 0) * 100}%)`,
            transition: slideTransition
              ? `transform ${SLIDE_MS}ms ease-out`
              : "none",
            touchAction: showControls ? "none" : undefined,
          }}
          onTransitionEnd={onTrackTransitionEnd}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
        >
          {(useInfiniteTrack ? trackSlides : safeImages).map((img, index) => {
            const isActive = useInfiniteTrack
              ? index === trackPosition
              : index === activeIndex;

            return (
              <div
                key={`${img.src}-${index}`}
                className="relative h-full min-w-full shrink-0"
                aria-hidden={!isActive}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={index === (useInfiniteTrack ? 1 : 0)}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>

        {showControls ? (
          <>
            <button
              type="button"
              onClick={() => goPrev()}
              className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-tea-gold/30 bg-white/90 text-tea-deep-brown shadow-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tea-gold/50"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => goNext()}
              className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-tea-gold/30 bg-white/90 text-tea-deep-brown shadow-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tea-gold/50"
              aria-label="Ảnh sau"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>

            <div
              className="pointer-events-none absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-1.5"
              role="tablist"
              aria-label="Chọn ảnh"
            >
              {safeImages.map((img, index) => (
                <button
                  key={img.src}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Ảnh ${index + 1}`}
                  onClick={() => goToIndex(index)}
                  className={cn(
                    "pointer-events-auto h-1.5 rounded-full transition-all",
                    index === activeIndex
                      ? "w-5 bg-tea-gold"
                      : "w-1.5 bg-white/50 hover:bg-white/70",
                  )}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>

      {showControls ? (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {safeImages.map((img, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={img.src}
                type="button"
                onClick={() => goToIndex(idx)}
                className={cn(
                  "relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
                  isActive
                    ? "border-ring/70"
                    : "border-transparent opacity-70 hover:opacity-100 hover:border-border",
                )}
                aria-label={`Xem ảnh ${idx + 1}`}
                aria-current={isActive ? "true" : undefined}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
