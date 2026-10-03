import type { RichText } from "@/lib/types";

type RichProps = {
  value: RichText;
  emClassName: string;
  /** Optional: render something extra right before an emphasised run (e.g. faces before names). */
  beforeEm?: (text: string) => React.ReactNode;
};

// Renders a RichText run; emphasised words get the passed className.
export default function Rich({ value, emClassName, beforeEm }: RichProps) {
  return (
    <>
      {value.map((part, i) =>
        part.em ? (
          <span key={i}>
            {beforeEm?.(part.text)}
            <em className={emClassName}>{part.text}</em>
          </span>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  );
}
