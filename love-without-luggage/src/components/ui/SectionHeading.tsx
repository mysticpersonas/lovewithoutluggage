type SectionHeadingProps = {
  children?: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return <h2>{children ?? "SectionHeading"}</h2>;
}
