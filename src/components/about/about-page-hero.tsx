import Image from "next/image";

type AboutPageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
};

export function AboutPageHero({ eyebrow, title, subtitle, image }: AboutPageHeroProps) {
  return (
    <section
      className="relative flex min-h-[60svh] items-center overflow-hidden bg-tea-dark-green px-4 pb-16 pt-28 md:min-h-[70svh] md:px-6 md:pb-20 md:pt-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,27,0,0.82),rgba(7,27,0,0.45),rgba(246,252,235,0.92))] mix-blend-multiply" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/90">
          {eyebrow}
        </p>
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base md:leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
