import LogoSVG from "@/public/logo.svg";

type Props = {
  question: string;
};

const QuestionBubble = ({ question }: Props) => {
  return (
    <div
      className="flex items-center gap-x-4 mb-6
    focus-visible group
    "
    >
      <LogoSVG className="hidden lg:block w-[4.5em] group-hover:animate-bounce" />
      <LogoSVG className="block lg:hidden w-[2.5em] group-hover:animate-bounce" />
      <div className="relative py-2 px-4 border-2 rounded-xl text-sm lg:text-base">
        {question}
        <div className="absolute -left-3 top-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-y-1/2 rotate-90" />
      </div>
    </div>
  );
};

export default QuestionBubble;
