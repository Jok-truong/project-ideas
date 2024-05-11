"use client";

import { useRouter } from "next/compat/router";
import GithubIcon from "../Icons/GithubIconForSomethingIveBuild";
import Img from "../SmallComp/Image/Img";
import ArrowIcon from "../Icons/ArrowIcon";
import Link from "next/link";
import { getTasksTextWithHighlightedKeyword } from "@/app/utils";

const SomethingIveBuilt = () => {
  const router = useRouter();

  const content = {
    text: "I'm excited to share with you some of my personal projects hosted on GitHub. GitHub serves as a platform where I showcase my creative endeavors, experiments, and contributions to the world of technology.\nWithin my repository, you'll find a diverse range of projects spanning various interests and skills. From web development to data analysis, and perhaps even some forays into machine learning, each project reflects my passion for learning and innovation.\nFeel free to explore my GitHub profile to discover more about my work and the journey of continuous growth and exploration that I embark upon. Whether you're a fellow developer, enthusiast, or simply curious about what I've been up to.\nThank you for your interest, and I look forward to sharing more of my projects with you!",
    keywords: [
      "personal projects",
      "GitHub serves",
      "repository",
      "projects spanning various interests and skills",
      "web development to data analysis, and perhaps even some forays into machine learning, each project reflects my passion for learning and innovation",
      "GitHub profile",
      "GitHub",
      "Thank you for your interest, and I look forward to sharing more of my projects with you!",
    ],
  };

  return (
    <div
      id="SomethingIveBuiltSection"
      className=" flex flex-col xl:space-y-28 space-y-12 bg-transparent w-full  
     2xl:px-72 lg:px-24 md:px-16 sm:px-16 py-32 px-4"
    >
      <div className=" flex flex-row  items-center md:px-0  mb-10">
        <ArrowIcon
          className={
            "flex-none h-5 md:h-6 w-5 md:w-5 translate-y-[2px] text-AAsecondary"
          }
        />
        <div className="flex-none flex-row space-x-2 items-center pr-2">
          <span className="text-AAsecondary font-sans text-sm  sm:text-xl">
            {" "}
            03.
          </span>
          <span className=" font-bold tracking-wider text-gray-200 text-lg md:text-2xl w-44 md:w-56 opacity-85">
            {" "}
            Some Things I&apos;ve Built
          </span>
        </div>
        <div className="bg-gray-400 h-[0.2px] w-full xl:w-1/3 md:w-1/2"></div>
      </div>

      <div className="flex flex-col   xl:space-y-36 space-y-8 md:space-y-28">
        <div className="relative md:grid md:grid-cols-12 w-full md:h-96 ">
          <div
            className="hidden bg-AAprimary z-10  py-4 
          absolute md:grid grid-cols-12 w-full h-full  content-center"
          >
            <div className="relative rounded w-full h-full col-span-7 ">
              <a
                href="https://smartos.space"
                target={"_blank"}
                rel="noreferrer"
              >
                <div
                  className="absolute w-full h-full rounded bg-AAprimary 
           transition-opacity opacity-30 hover:opacity-0 hover:cursor-pointer duration-300"
                ></div>
              </a>

              <Img
                src={"/smartos.jpg"}
                alt={"Project Screen shot"}
                className={`w-full rounded h-full `}
              />
            </div>
          </div>

          <div className=" md:absolute py-4  md:grid md:grid-cols-12 w-full h-full  content-center ">
            <div className="absolute w-full h-full bg-opacity-70 z-0">
              <div className="relative w-full h-full">
                <div className="absolute w-full h-full bg-AAsecondary opacity-10 z-10"></div>
                <div className="absolute w-full h-full bg-AAprimary opacity-80 z-10"></div>
                <Img
                  src={"/smartos.jpg"}
                  alt={"Project Screen shot"}
                  className={`w-full h-full `}
                />
              </div>
            </div>

            <div
              className="px-8 pt-8 sm:pt-12 md:py-0 xl:col-span-6 xl:col-start-7 col-start-5 
            col-span-8 flex flex-col items-start md:items-end space-y-3"
            >
              <div className="flex flex-col space-y-1 md:items-end z-10">
                <span className="text-AAsecondary text-base">Smartos</span>
                <a
                  href="https://smartos.space"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className=" md:text-gray-200 text-AAsecondary font-bold text-xl hover:cursor-pointer">
                    SmartOs Platforms
                  </span>
                </a>
              </div>
              <div className="w-full md:bg-AAtertiary rounded-md py-6 md:p-6  z-10">
                <p className="text-gray-300 md:text-gray-400 text-left md:text-right ">
                  <span className="text-AAsecondary">Smartos</span> is a{" "}
                  <span className="text-AAsecondary">
                    Proptech SaaS product
                  </span>
                  , providing a comprehensive digital transformation solution in
                  Real Estate management through{" "}
                  <span className="text-AAsecondary">
                    SmartosPMS (Property Management System)
                  </span>{" "}
                  , <span className="text-AAsecondary">Smartos</span>{" "}
                  Marketplace application and White Label platform
                </p>
              </div>
              <ul
                className="flex flex-wrap w-full text-gray-300 md:text-gray-400
               text-sm font-Text2 md:justify-end"
              >
                <span className="pr-4 z-10">Vite</span>
                <span className="pr-4 z-10">NextJs</span>
                <span className="pr-4 z-10">Tailwind CSS</span>
                <span className="pr-4 z-10">TypeScript</span>
              </ul>
            </div>
          </div>
        </div>

        <div className="relative md:grid md:grid-cols-12 w-full md:h-96  ">
          <div
            className="hidden bg-AAprimary z-10  py-4 
          absolute md:grid grid-cols-12 w-full h-full  content-center "
          >
            <div className="relative rounded w-full h-full col-start-6 col-span-7 ">
              <a
                href={"https://nhatrovanminh.com/"}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className="absolute w-full h-full rounded bg-AAprimary 
           transition-opacity opacity-50 hover:opacity-0 hover:cursor-pointer duration-300"
                ></div>
              </a>
              <Img
                src={"/img/YPredict-v1.jpg"}
                alt={"Project Screen shot"}
                className={`w-full rounded h-full `}
              />
            </div>
          </div>

          <div className="@@ md:absolute py-4  md:grid md:grid-cols-12 w-full h-full  content-center ">
            <div className="absolute w-full h-full bg-opacity-70 z-0 md:order-2">
              <div className="relative w-full h-full">
                <div className="absolute w-full h-full bg-AAsecondary opacity-10 z-10"></div>
                <div className="absolute w-full h-full bg-AAprimary opacity-80 z-10"></div>
                <Img
                  src={"/hackme.jpg"}
                  alt={"Project Screen shot"}
                  className={`w-full h-full`}
                />
              </div>
            </div>

            <div
              className="px-8 pt-8 sm:pt-12 md:py-0 xl:col-span-6   
            col-span-8 flex flex-col items-start  space-y-3 md:order-1"
            >
              <div className="flex flex-col space-y-1  z-10">
                <span className="text-AAsecondary text-base">
                  Recent Project
                </span>
                <a
                  href="https://nhatrovanminh.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className=" md:text-gray-200 text-AAsecondary font-bold text-xl hover:cursor-pointer">
                    nhatrovanminh
                  </span>
                </a>
              </div>
              <div className="w-full md:bg-AAtertiary rounded-md py-6 md:p-6  z-10">
                <p className="text-gray-300 md:text-gray-400 text-left ">
                  A <span className="text-AAsecondary text-base">webapp</span>{" "}
                  project providing room rental management services
                </p>
              </div>
              <ul
                className="flex flex-wrap w-full text-gray-300 md:text-gray-400
               text-sm font-Text2 md:justify-start"
              >
                <span className="pr-4 z-10">Token</span>
                <span className="pr-4 z-10">ERC20</span>
                <span className="pr-4 z-10">Nextjs</span>
                <span className="pr-4 z-10">Smart contract</span>
                <span className="pr-4 z-10">Blockchain</span>
              </ul>
            </div>
          </div>
        </div>
        <div className="relative md:grid md:grid-cols-12 w-full md:h-96 ">
          <div
            className="hidden bg-AAprimary z-10  py-4 
          absolute md:grid grid-cols-12 w-full h-full  content-center"
          >
            <div className="relative rounded w-full h-full col-span-7 ">
              <Link
                href={"https://github.com/o1Ikey/project-ideas"}
                target="_blank"
              >
                <div
                  className="absolute w-full h-full rounded bg-AAsecondary 
           transition-opacity opacity-10 hover:opacity-0 hover:cursor-pointer duration-300"
                ></div>
              </Link>

              <Img
                src={"/github-cover.jpg"}
                alt={"Project Screen shot"}
                className={`w-full rounded h-full `}
              />
            </div>
          </div>

          <div className=" md:absolute py-4  md:grid md:grid-cols-12 w-full h-full  content-center ">
            <div className="absolute w-full h-full bg-opacity-70 z-0">
              <div className="relative w-full h-full">
                <div className="absolute w-full h-full bg-AAsecondary opacity-10 z-10"></div>
                <div className="absolute w-full h-full bg-AAprimary opacity-80 z-10"></div>
                <Img
                  src={"/github-cover.jpg"}
                  alt={"Project Screen shot"}
                  className={`w-full h-full `}
                />
              </div>
            </div>

            <div
              className="px-8 pt-8 sm:pt-12 md:py-0 xl:col-span-6 xl:col-start-7 col-start-5 
            col-span-8 flex flex-col items-start md:items-end space-y-3"
            >
              <div className="flex flex-col space-y-1 md:items-end z-10">
                <span className="text-AAsecondary text-base">
                  Recent Project
                </span>
                <Link href={"/typing"}>
                  <span className=" md:text-gray-200 text-AAsecondary font-bold text-xl hover:cursor-pointer">
                    Personal Projects
                  </span>
                </Link>
              </div>
              <div className="w-full md:bg-AAtertiary rounded-md py-6 md:p-6  z-10">
                <p
                  className="text-gray-300 md:text-gray-400 text-left "
                  dangerouslySetInnerHTML={{
                    __html: getTasksTextWithHighlightedKeyword(
                      content.text,
                      content.keywords
                    ),
                  }}
                ></p>
              </div>
              <div className="z-10 flex fle-row space-x-5 ">
                <GithubIcon link="https://github.com/o1Ikey/project-ideas" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SomethingIveBuilt;
