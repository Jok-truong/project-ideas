import { AnimatedList, AnimatedListItem } from "@/components/motion/List";
import { AnimatedTitle } from "@/components/motion/Title";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Variants } from "framer-motion";
import Image from "next/image";

export const languages = [
  {
    title: "English",
    flag: "gb",
    word: "Hello",
  },
  {
    title: "Spanish",
    flag: "es",
    word: "Hola",
  },
  {
    title: "French",
    flag: "fr",
    word: "Bonjour",
  },
  {
    title: "Korean",
    flag: "kr",
    word: "Annyeong",
  },
  {
    title: "Japanese",
    flag: "jp",
    word: "Konnichiwa",
  },
  {
    title: "Mandarin",
    flag: "cn",
    word: "Nǐ hǎo",
  },
  {
    title: "Italian",
    flag: "it",
    word: "Ciao",
  },
  {
    title: "Russian",
    flag: "ru",
    word: "Привет",
  },
  {
    title: "German",
    flag: "de",
    word: "Hallo",
  },
];

const list = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  hidden: { opacity: 0 },
} satisfies Variants;

const item = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  hidden: { opacity: 0, scale: 0.4 },
} satisfies Variants;

function Languages() {
  return (
    <section className="space-y-20 px-4 py-8 sm:px-[10%] md:py-20">
      <AnimatedTitle>
        <h2 className="heading-section">
          I want to <span className="text-highlight-depth">learn ...</span>
        </h2>
      </AnimatedTitle>
      <div className="mx-auto max-w-screen-lg">
        <AnimatedList
          className="flex flex-wrap justify-center gap-2 text-center lg:gap-4"
          variants={list}
        >
          {languages.map(({ flag, title }) => (
            <AnimatedListItem
              key={title}
              className="basis-28 md:basis-40"
              variants={item}
            >
              <Button
                variant="ghost"
                size="lg"
                className="size-full flex-wrap bg-secondary/10 px-0 pb-4 transition active:scale-95 lg:text-base"
              >
                <AspectRatio
                  ratio={3 / 2}
                  className="!top-1/2 mx-auto h-1/2 w-1/2 -translate-y-1/2"
                >
                  <Image
                    src={`/img/flags/${flag}.svg`}
                    alt={`${title} flag`}
                    fill
                    className="rounded-md object-cover"
                  />
                </AspectRatio>
                <span>{title}</span>
              </Button>
            </AnimatedListItem>
          ))}
        </AnimatedList>
      </div>
    </section>
  );
}

export default Languages;
