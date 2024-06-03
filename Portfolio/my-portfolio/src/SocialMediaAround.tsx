import { motion } from "framer-motion";
import GithubIcon from "./components/Icons/GithubIcon";
import LinkedinIcon from "./components/Icons/LinkedinIcon";

type SocialMediaAroundProps = {
  finishedLoading: boolean;
};

const IconClickableWithAnimation = (props: {
  href: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: (value: any) => JSX.Element;
}) => {
  return (
    <motion.div
      whileHover={{
        y: -3,
        transition: { duration: 0.1 },
      }}
      className=""
    >
      <a href={props.href} className="" target={"_blank"} rel="noreferrer">
        <props.Icon
          className={
            "w-6 h-6 text-gray-400 hover:text-AAsecondary fill-current hover:cursor-pointer"
          }
        />
      </a>
    </motion.div>
  );
};

const SocialMediaAround = ({ finishedLoading }: SocialMediaAroundProps) => {
  return (
    <>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{
          y: {
            delay: finishedLoading ? 0 : 11,
            duration: finishedLoading ? 0 : 0.5,
          },
        }}
        className="z-10 fixed bottom-0 left-0  lg:flex flex-row px-12 items-center justify-between  "
      >
        <div className="flex flex-col space-y-8 justify-center items-center">
          <div className="flex flex-col justify-center items-center space-y-5">
            {/* Github Icon */}
            <IconClickableWithAnimation
              Icon={GithubIcon}
              href={"https://github.com/o1Ikey"}
            />
            {/* Linkedin icon */}
            <IconClickableWithAnimation
              Icon={LinkedinIcon}
              href={
                "https://www.linkedin.com/in/huy-tr%C6%B0%C6%A1ng-08b7b3293/"
              }
            />
          </div>
          <div className="h-28 w-0.5 bg-gray-400"></div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: "170%" }}
        animate={{ y: "0%" }}
        transition={{
          y: {
            delay: finishedLoading ? 0 : 11,
            duration: finishedLoading ? 0 : 0.5,
          },
        }}
        className="z-10 fixed bottom-0 -right-10 hidden lg:flex flex-row items-center justify-between"
      >
        <div className="flex flex-col space-y-24 justify-center items-center">
          <motion.div
            initial={{ rotate: 90 }}
            whileHover={{
              y: -3,
              transition: { y: { duration: 0.1 }, rotate: { duration: 0 } },
            }}
            className=""
          >
            <a
              href="mailto:lh222k@gmail.com"
              target={"_blank"}
              rel="noreferrer"
            >
              <span className=" font-Header tracking-wider text-gray-400 hover:text-AAsecondary hover:cursor-pointer">
                lh222k<span className="text-AAsecondary">@</span>
                gmail.com
                <span className="text-AAsecondary">.</span>com
              </span>
            </a>
          </motion.div>

          <div className="h-24 w-0.5 bg-gray-400"></div>
        </div>
      </motion.div>
    </>
  );
};

export default SocialMediaAround;
