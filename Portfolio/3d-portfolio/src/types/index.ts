export type TCommonProps = {
  title?: string;
  name?: string;
  icon?: string;
};

export type TMotion = {
  direction: "up" | "down" | "left" | "right" | "";
  type: "tween" | "spring" | "just" | "";
  delay: number;
  duration: number;
};
