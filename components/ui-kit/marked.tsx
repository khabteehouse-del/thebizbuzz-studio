/*
  Renders a heading with one phrase picked out by the highlighter swipe.
  If the phrase is not found, the text is shown plainly, never lost.
*/

type Props = {
  text: string;
  mark: string;
  /* "block" is for dark backgrounds */
  tone?: "swipe" | "block";
};

export function Marked({ text, mark, tone = "swipe" }: Props) {
  const index = mark ? text.indexOf(mark) : -1;
  if (index < 0) return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <span className={tone === "block" ? "mark-block" : "mark"}>{mark}</span>
      {text.slice(index + mark.length)}
    </>
  );
}
