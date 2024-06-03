"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { useState, useTransition } from "react";
import Header from "./header";
import QuestionBubble from "./questionBubble";
import Challenge from "./challenge";
import Footer from "./footer";
import { useAudio, useWindowSize } from "react-use";
import {
  reduceHearts,
  upsertChallengeProgress,
} from "@/actions/challenge-progress";
import { toast } from "sonner";
import { useHeartsModal } from "@/store/useHeartsModal";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ResultCard } from "./resultCard";
import Confetti from "react-confetti";

type Props = {
  initialLessonId: number;
  initialPercentage?: any;
  initialHearts: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
};

const Quiz = ({
  initialPercentage,
  initialLessonId,
  initialHearts,
  initialLessonChallenges,
}: Props) => {
  const { open: openHeartsModal } = useHeartsModal();
  const { width, height } = useWindowSize();
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  const [lessonId] = useState(initialLessonId);
  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");
  const [hearts, setHearts] = useState(initialHearts);
  const [challenges] = useState(initialLessonChallenges);
  const [percentage, setPercentage] = useState<number>(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const [finishAudio] = useAudio({
    src: "/audio/finish.mp3",
    autoPlay: true,
  });

  const [correctAudio, _, correctControls] = useAudio({
    src: "/audio/correct.wav",
  });

  const [incorrectAudio, __, incorrectControls] = useAudio({
    src: "/audio/incorrect.wav",
  });
  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  const title =
    challenge?.type === "ASSIST"
      ? "Select the correct meaning"
      : challenge?.question;

  const onSelect = (id: number) => {
    setSelectedOption(id);
  };

  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const onContinue = () => {
    if (!selectedOption) return;

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options.find((option) => option.correct);

    if (!correctOption) {
      return;
    }

    if (correctOption && correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartsModal();
              return;
            }

            correctControls.play();
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);

            // this is a practice
            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch((error) => {
            console.log(error, "error");
            toast.error("Something went wrong.");
          });
      });
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartsModal();
              return;
            }

            incorrectControls.play();
            setStatus("wrong");

            if (!response?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch((error) => {
            console.log(error, "error");
            toast.error("Something went wrong.");
          });
      });
    }
  };

  if (!challenge) {
    return (
      <div className="flex flex-col w-full h-full">
        {finishAudio}
        <Confetti
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10_000}
          width={width}
          height={height}
        />
        <div className="mx-auto flex h-full max-w-lg flex-col items-center justify-center gap-y-4 text-center lg:gap-y-8">
          <Image
            src="/img/finish.svg"
            alt="Finish"
            className="hidden lg:block"
            height={100}
            width={100}
          />

          <Image
            src="/img/finish.svg"
            alt="Finish"
            className="block lg:hidden"
            height={100}
            width={100}
          />

          <h1 className="text-lg font-bold text-neutral-700 lg:text-3xl">
            Great job! <br /> You&apos;ve completed the lesson.
          </h1>

          <div className="flex w-full items-center gap-x-4">
            <ResultCard variant="points" value={challenges.length * 10} />
            <ResultCard variant="hearts" />
          </div>
        </div>

        <Footer
          lessonId={lessonId}
          status="completed"
          onCheck={() => router.push("/learn")}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full">
      {incorrectAudio}
      {correctAudio}
      <Header hearts={hearts} percentage={percentage} />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold  ">
              {title}
            </h1>
            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                type={challenge.type}
                selectedOption={selectedOption}
                onSelect={onSelect}
                status={status}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </div>
  );
};

export default Quiz;
