import { motion } from "framer-motion";
import EarthCanvas from "./canvas/EarthCanvas";
import { slideIn } from "../utils";

type MyNameProps = {
  finishedLoading: boolean;
};

export default function MyName({ finishedLoading }: MyNameProps) {
  return (
    <div
      className="h-full flex justify-center
      px-8 2xl:px-72 xl:px-56 lg:px-32 md:px-28 sm:px-8 py-32 sm:py-52 z-10 md:flex-col-reverse sm:flex-col-reverse md:items-center lg:flex-row"
    >
      <div>
        <motion.span
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            opacity: {
              delay: finishedLoading ? 0 : 10.4,
              duration: finishedLoading ? 0 : 0.2,
            },
            y: {
              delay: finishedLoading ? 0 : 10.4,
              duration: finishedLoading ? 0 : 0.2,
            },
          }}
          className="text-AAsecondary font-mono text-lg"
        >
          Hi, my name is
        </motion.span>
        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            opacity: {
              delay: finishedLoading ? 0 : 10.5,
              duration: finishedLoading ? 0 : 0.2,
            },
            y: {
              delay: finishedLoading ? 0 : 10.5,
              duration: finishedLoading ? 0 : 0.2,
            },
          }}
          className="text-gray-300 font-bold text-3xl lg:text-7xl sm:text-5xl md:text-6xl mt-4"
        >
          Truong Le Huy.
        </motion.h1>

        <motion.h3
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            opacity: {
              delay: finishedLoading ? 0 : 10.7,
              duration: finishedLoading ? 0 : 0.2,
            },
            y: {
              delay: finishedLoading ? 0 : 10.7,
              duration: finishedLoading ? 0 : 0.2,
            },
          }}
          className="text-gray-400 font-Header text-sm md:text-lg sm:text-md mt-10 tracking-wider"
        >
          I&apos;m a experienced{" "}
          <span className="text-AAsecondary">Front-End Developer</span>{" "}
          dedicated to continuous learning and growth, actively seeking out new
          technologies and methodologies to enhance the quality and efficiency
          of my work, driven by a relentless passion for innovation and
          excellence.
        </motion.h3>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            opacity: {
              delay: finishedLoading ? 0 : 10.8,
              duration: finishedLoading ? 0 : 0.2,
            },
            y: {
              delay: finishedLoading ? 0 : 10.8,
              duration: finishedLoading ? 0 : 0.2,
            },
          }}
          className="mt-12"
        >
          <a href={"/resume.pdf"} target={"_blank"} rel="noreferrer">
            <button className="bg-transparent text-AAsecondary border rounded px-4 sm:px-8 py-3 sm:py-4 border-AAsecondary">
              Check out my resume!
            </button>
          </a>
        </motion.div>
      </div>
      {finishedLoading && (
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="h-[350px] md:h-[550px]  md:w-[25rem] lg:w-[40rem] px-3"
        >
          <EarthCanvas />
        </motion.div>
      )}
    </div>
  );
}
