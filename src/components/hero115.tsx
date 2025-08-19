import { Wifi, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";

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
          <div id="reel" className="relative scroll-mt-[var(--top-nav-height,64px)]">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-full max-h-[524px] w-full rounded-2xl object-cover"
            />
          </div>

          {/* Copy block below in a split layout */}
          <div className="relative grid items-start gap-6 md:grid-cols-2">
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
              <h2 className="max-w-3xl text-left text-4xl font-medium text-balance md:text-6xl">
                {heading}
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              <p className="max-w-xl text-left text-muted-foreground md:text-lg">
                {description}
              </p>
              <div className="flex items-center gap-3">
                <Button size="lg" asChild>
                  <a href={button.url}>
                    {button.text} {button.icon}
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
