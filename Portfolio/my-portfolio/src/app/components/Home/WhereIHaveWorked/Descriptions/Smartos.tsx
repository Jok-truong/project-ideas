import ArrowIcon from "@/app/components/Icons/ArrowIcon";
import { getTasksTextWithHighlightedKeyword } from "@/app/utils";

export default function Smartos() {
  const tasks = [
    {
      text: "Worked on the front-end development of the website using Typescript, Ant, ReactJS, Graphql",
      keywords: ["Typescript", "Ant", "ReactJS", "Graphql"],
    },
    {
      text: "Collaborated closely with the team in regular meetings and interacted with clients",
      keywords: [""],
    },
  ];

  return (
    <>
      <div className="flex flex-col space-y-5 max-w-xl px-4 md:px-0">
        <div className="flex flex-col spacey-y-2">
          <span className="text-gray-100 sm:text-2xl text-sm font-Arimo tracking-wide">
            Front-end Developer (Junior){" "}
            <span className="text-AAsecondary">@ WebApp</span>
          </span>
          <span className="font-mono text-xl text-gray-500">
            04/2022 - 05/2023
          </span>
          <span
            className="font-mono text-lg text-AAsecondary hover:cursor-pointer"
            onClick={() => window.open("https://smartos.space/", "_blank")}
          >
            smartos.space
          </span>
        </div>
        <div className="flex flex-col space-y-4 sm:text-base text-sm">
          {tasks.map((item, index) => {
            return (
              <div key={index} className="flex flex-row space-x-1">
                <ArrowIcon className={" h-5 w-4 text-AAsecondary flex-none"} />
                <span
                  className="text-gray-500 sm:text-base text-sm"
                  dangerouslySetInnerHTML={{
                    __html: getTasksTextWithHighlightedKeyword(
                      item.text,
                      item.keywords
                    ),
                  }}
                ></span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
