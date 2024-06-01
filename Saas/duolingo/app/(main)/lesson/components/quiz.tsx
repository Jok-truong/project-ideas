"use client";

import { challengeOptions, challenges, userSubscription } from "@/db/schema";
import { useState, useTransition } from "react";
import Header from "./header";
import QuestionBubble from "./questionBubble";
import Challenge from "./challenge";
import Footer from "./footer";
import { useAudio } from "react-use";
import {
  reduceHearts,
  upsertChallengeProgress,
} from "@/actions/challenge-progress";
import { toast } from "sonner";
import { useHeartsModal } from "@/store/useHeartsModal";

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

  const [pending, startTransition] = useTransition();

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
    return <>end</>;
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
