/*
  A heading with one phrase picked out in the brand gradient (the same
  "buzz-word" treatment BizBuzz uses on its own name). If the phrase is not
  found the text is shown plainly, never lost.
*/

export function Headline({ text, mark }: { text: string; mark: string }) {
  const index = mark ? text.indexOf(mark) : -1;
  if (index < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <span className="buzz-word">{mark}</span>
      {text.slice(index + mark.length)}
    </>
  );
}
