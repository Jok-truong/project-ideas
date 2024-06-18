"use client";

import { Badge, BadgeProps } from "@/components/ui/badge";
import { languages } from "./Languages";
import { useScroll, motion, useTransform, useSpring } from "framer-motion";
import { PropsWithChildren, useRef } from "react";
import Image from "next/image";

export type BadgeVariant = BadgeProps["variant"];
const variants: NonNullable<BadgeVariant>[] = [
  "secondary",
  "highlightOutline",
  "secondaryOutline",
  "primary",
  "highlight",
  "default",
  "primaryOutline",
];
type LanguagePillProps = {
  title: string;
  word: string;
  flag: string;
  tilt?: -1 | 0 | 1;
  variant?: BadgeVariant;
  className?: string;
};

function LanguageBadge({
  title,
  word,
  flag,
  tilt = 0,
  variant = "primary",
}: PropsWithChildren<LanguagePillProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", `end start`],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 25 });

  const opacity = useTransform(progress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0, 0.2, 0.9, 1], [0.5, 1, 1, 0.75]);
  const rotate = useTransform(progress, [0.2, 0.4], [0, 3 * tilt]);
  const skewX = useTransform(progress, [0.2, 0.4], [0, -3 * tilt]);
  const x = useTransform(progress, [0.2, 0.4], ["0%", `${-50 * tilt}%`]);
  const left = useTransform(progress, [0.2, 0.4], ["0%", `${50 * tilt}%`]);

  return (
    <motion.div
      ref={ref}
      className="relative"
      style={{ opacity, scale, rotate, skewX, x, left }}
    >
      <Badge
        variant={variant}
        className="gap-4 px-4 text-[7vw] shadow-2xl sm:pl-8 sm:text-[5vw] lg:text-[min(4vw,4rem)]"
      >
        <span className="capitalize">{word}</span>
        <span className="rounded-full bg-white p-[0.15em] shadow-md">
          <span className="relative block size-[1.1em] overflow-hidden rounded-inherit">
            <Image
              src={`/img/flags/${flag}.svg`}
              alt={`${title} flag`}
              fill
              className="object-cover"
            />
          </span>
        </span>
      </Badge>
    </motion.div>
  );
}

export function Fluency() {
  return (
    <ul className="flex flex-col gap-8 px-[5%] lg:px-0">
      {languages.map(({ flag, title, word }, index) => (
        <li key={title} className="flex justify-center">
          <LanguageBadge
            title={title}
            word={word}
            flag={flag}
            tilt={index % 2 === 0 ? -1 : 1}
            variant={variants[index % variants.length]}
          />
        </li>
      ))}
    </ul>
  );
}
