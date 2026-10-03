import type { Person } from "@/lib/types";

/*
  Overlapping headshots. Used inline in a sentence (right before the names
  they belong to) and on calendar session cards (who's in the room).
  Images are 128px crops (~10KB each), so they stay sharp up to ~64px.
*/

const FACES: Record<Person, { src: string; alt: string }> = {
  travis: { src: "/images/travis-headshot.jpg", alt: "Dr. Travis Fox" },
  michelle: { src: "/images/michelle-headshot.jpg", alt: "Michelle Fox" },
};

type FacePileProps = {
  people?: Person[];
  /** "inline" sits inside a line of text without making it taller */
  variant?: "inline" | "card";
};

export default function FacePile({ people = ["travis", "michelle"], variant = "inline" }: FacePileProps) {
  const size = variant === "inline" ? "h-[26px] w-[26px] sm:h-[30px] sm:w-[30px]" : "h-8 w-8";
  return (
    <span
      className={
        variant === "inline"
          ? "-my-2 mr-1.5 inline-flex items-center align-middle" // negative margin: line height stays even
          : "inline-flex items-center"
      }
    >
      {people.map((person, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={person}
          src={FACES[person].src}
          alt={FACES[person].alt}
          width={32}
          height={32}
          loading="lazy"
          className={`${size} rounded-full object-cover ring-2 ring-ground-deep shadow-[0_0_0_3px_rgba(230,200,156,0.35)] ${
            i > 0 ? "-ml-2" : ""
          }`}
        />
      ))}
    </span>
  );
}
