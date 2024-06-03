"use client";
import {
  AnimatedNumber,
  AnimatedNumberProps,
} from "@/components/motion/Number";
import { AnimatedTitle } from "@/components/motion/Title";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { PropsWithChildren, useRef } from "react";

import FaceOneSVG from "@/public/img/face-1.svg";
import FaceTwoSVG from "@/public/img/face-2.svg";
import FaceThreeSVG from "@/public/img/face-3.svg";
import FaceFourSVG from "@/public/img/face-4.svg";
import { cn } from "@/lib/utils";

type MetricsItemProps = {
  description: string;
  progress: MotionValue<number>;
  last?: boolean;
  offset?: number;
  className?: string;
};

export function MetricsItem({
  description,
  offset = 0,
  suffix = "+",
  last,
  progress,
  children,
  className,
  ...rest
}: PropsWithChildren<MetricsItemProps & AnimatedNumberProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", `start ${offset}%`],
  });
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.5, 1, 1, 0.85]),
    {
      stiffness: 25,
    }
  );
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const exitOpacity = useTransform(
    progress,
    [last ? 0.38 : 0.34, 0.38],
    [1, last ? 1 : 0]
  );
  const exitScale = useTransform(
    progress,
    last ? [0.42, 0.55] : [0.34, 0.425],
    [1, 0.65]
  );

  const originTop = last && { className: "lg:origin-top" };
  return (
    <motion.div ref={ref} {...originTop} style={{ scale, opacity }}>
      <motion.div
        {...originTop}
        style={{ scale: exitScale, opacity: exitOpacity }}
      >
        <AspectRatio
          ratio={1}
          className={cn(
            "flex flex-col items-center justify-center overflow-hidden rounded-full bg-muted p-4 text-center dark:text-background",
            className
          )}
        >
          <span className="absolute top-[5%] w-1/2">{children}</span>
          <span className="z-1 pt-[40%] text-[1vw] leading-none sm:text-[0.65vw] lg:text-[min(0.5vw,0.5rem)]">
            <span className="block text-[10em] font-bold">
              <AnimatedNumber suffix={suffix} once={false} {...rest} />
            </span>
            <span className="block max-w-52 text-balance text-[6em]">
              {description}
            </span>
          </span>
        </AspectRatio>
      </motion.div>
    </motion.div>
  );
}

function Metrics({ children }: PropsWithChildren) {
  const ref = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", `end 0.7`],
  });

  const opacity = useSpring(
    useTransform(scrollYProgress, [0.34, 0.425, 0.98, 1], [0, 1, 1, 0])
  );

  return (
    <section className="pb-8 pt-16 md:py-20">
      <AnimatedTitle>
        <h2 className="heading-section">
          <span className="text-primary">HLingo</span> by the{" "}
          <span className="text-secondary underline decoration-wavy underline-offset-4 md:underline-offset-8">
            numbers
          </span>
        </h2>
      </AnimatedTitle>
      <ul
        ref={ref}
        className="relative mt-24 grid grid-cols-12 pb-40 sm:grid-cols-9 lg:px-[15%]"
      >
        <li className="sticky top-[20%] col-start-2 col-end-12 pb-8 sm:col-start-3 sm:col-end-8 sm:pb-16 lg:top-[5%] lg:pb-40">
          <MetricsItem
            className="bg-primary-light"
            number={1000}
            description="hours of fun content"
            offset={20}
            progress={scrollYProgress}
          >
            <FaceTwoSVG />
          </MetricsItem>
        </li>
        <li className="sticky top-[22.5%] col-start-2 col-end-12 pb-8 sm:col-start-1 sm:col-end-5 sm:pb-16 lg:pb-40">
          <MetricsItem
            className="bg-secondary"
            number={23}
            description="language courses"
            offset={22.5}
            progress={scrollYProgress}
          >
            <FaceFourSVG />
          </MetricsItem>
        </li>
        <li className="sticky top-[25%] col-start-2 col-end-12 pb-8 sm:col-start-6 sm:col-end-10 sm:pb-16 lg:pb-40">
          <MetricsItem
            className="bg-highlight"
            number={6}
            prefix="~"
            suffix="M"
            description="users globally"
            offset={25}
            progress={scrollYProgress}
          >
            <FaceOneSVG />
          </MetricsItem>
        </li>
        <li className="sticky top-[20%] col-start-1 col-end-13 pb-8 sm:col-start-2 sm:col-end-9 sm:pb-16 lg:top-[5%] lg:pb-40">
          <MetricsItem
            className="bg-gradient-to-b from-primary to-primary-depth to-80%"
            number={93}
            suffix="%"
            description="fluency in two months"
            offset={20}
            progress={scrollYProgress}
            last
          >
            <FaceThreeSVG />
          </MetricsItem>
        </li>
        <li className="z-1 col-start-1 col-end-13 sm:col-end-10">
          <div className="">{children}</div>
        </li>
      </ul>
      <motion.div className="fixed inset-0 -z-1" style={{ opacity }} />
    </section>
  );
}

export default Metrics;
