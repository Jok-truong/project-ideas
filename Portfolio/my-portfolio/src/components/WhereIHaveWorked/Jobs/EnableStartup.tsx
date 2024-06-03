import { getTasksTextWithHighlightedKeyword } from "../../../utils";
import ArrowIcon from "../../Icons/ArrowIcon";

const tasks = [
  {
    text: "Learning and building projects with Reactjs, NodeJS",
    keywords: ["Reactjs", "NodeJS"],
  },
  {
    text: "Improve teamwork skills",
    keywords: ["teamwork"],
  },
];
export default function EnableStartup() {
  return (
    <>
      <div className="flex flex-col space-y-5 max-w-xl px-4 md:px-0">
        <div className="flex flex-col spacey-y-2">
          <span className="text-gray-100 sm:text-2xl text-sm font-Arimo tracking-wide">
            Intern Developer <span className="text-AAsecondary">@ WebApp</span>
          </span>
          <span className="font-mono text-xl text-gray-500">
            03/2021 - 06/2021
          </span>
          <span
            className="font-mono text-lg text-AAsecondary hover:cursor-pointer"
            onClick={() => window.open("https://enablestartup.com/", "_blank")}
          >
            enablestartup.com
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
