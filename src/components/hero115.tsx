import { Wifi, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LazyMotion, domAnimation, m } from "framer-motion";

interface Hero115Props {
  icon?: React.ReactNode;
  heading: string;
  description: string;
  button: {
    text: string;
    icon?: React.ReactNode;
    url: string;
  };
  trustText?: string;
  imageSrc?: string;
  imageAlt?: string;
}

const Hero115 = ({
  icon = <Wifi className="size-6" />,
  heading = "Blocks built with Shadcn & Tailwind",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  button = {
    text: "Discover Features",
    icon: <Zap className="ml-2 size-4" />,
    url: "https://www.shadcnblocks.com",
  },
  trustText = undefined,
  imageSrc = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  imageAlt = "placeholder",
}: Hero115Props) => {
  return (
    <section className="overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex flex-col gap-6">
          {/* Video/cover first */}
          <div id="reel" className="relative mb-8 md:mb-12 scroll-mt-[var(--top-nav-height,64px)] rounded-lg overflow-hidden border border-foreground/10 bg-background/5">
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/25 to-transparent" />
            <img src={imageSrc} alt={imageAlt} className="w-full aspect-[16/9] object-cover" />
            <div className="absolute top-2 left-2 text-xs text-foreground/75 px-2 py-1 rounded-sm border border-foreground/15 bg-background/40">Selected work</div>
          </div>

          {/* Copy block below in a split layout */}
          <div className="relative grid items-start gap-6 md:grid-cols-[1fr_minmax(320px,420px)] md:gap-10">
            {/* subtle radial lines backdrop (kept but lighter impact)*/}
            <div
              style={{ transform: "translate(-50%, -50%)" }}
              className="pointer-events-none absolute top-1/2 left-1/2 -z-10 hidden size-[800px] rounded-full border md:block [mask-image:linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] p-16 md:size-[1100px] md:p-24"
            >
              <div className="size-full rounded-full border p-12 md:p-20">
                <div className="size-full rounded-full border" />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {icon && (
                <span className="flex size-12 items-center justify-center rounded-full border md:size-16">
                  {icon}
                </span>
              )}
              <LazyMotion features={domAnimation}>
                <m.h2
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="max-w-3xl text-left text-4xl md:text-5xl leading-tight tracking-[-0.02em] font-medium text-balance"
                >
                  {heading}
                </m.h2>
              </LazyMotion>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-base md:text-[17px] leading-relaxed text-muted-foreground max-w-[65ch]">
                {description}
              </p>
              <div className="flex items-center gap-3">
                <Button
                  asChild
                  className="rounded-full bg-white text-black px-4 py-2 text-sm md:text-[15px] font-medium hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <a href={button.url}>
                    {button.text}
                  </a>
                </Button>
              </div>
              {trustText && (
                <div className="text-xs text-muted-foreground">{trustText}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero115 };
