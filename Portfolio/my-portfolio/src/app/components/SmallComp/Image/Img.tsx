"use client";

export default function Img(props: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={props.src} alt={props.alt} className={props.className} />
  );
}
