import { motion } from "framer-motion";
import { textVariant } from "../utils";

interface IHeader {
  useMotion: boolean;
  p: string;
  h2: string;
}

export const Header = ({ useMotion, p, h2 }: IHeader) => {
  const Content = () => (
    <>
      <p className="section-sub-text">{p}</p>
      <h2 className="section-head-text">{h2}</h2>
    </>
  );

  return useMotion === true ? (
    <motion.div variants={textVariant()}>
      <Content />
    </motion.div>
  ) : (
    <Content />
  );
};
