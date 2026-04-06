import Image from "next/image";
import type { ContentBlock } from "@/lib/api";

interface ArticleContentProps {
  blocks: ContentBlock[];
}

const blockRenderers: Record<
  ContentBlock["type"],
  (block: ContentBlock, index: number) => React.ReactNode
> = {
  paragraph: (block, i) => (
    <p key={i}>{(block as Extract<ContentBlock, { type: "paragraph" }>).text}</p>
  ),
  heading: (block, i) => {
    const b = block as Extract<ContentBlock, { type: "heading" }>;
    return b.level === 2 ? <h2 key={i}>{b.text}</h2> : <h3 key={i}>{b.text}</h3>;
  },
  blockquote: (block, i) => (
    <blockquote key={i}>
      {(block as Extract<ContentBlock, { type: "blockquote" }>).text}
    </blockquote>
  ),
  "unordered-list": (block, i) => (
    <ul key={i}>
      {(block as Extract<ContentBlock, { type: "unordered-list" }>).items.map(
        (item, j) => (
          <li key={j}>{item}</li>
        )
      )}
    </ul>
  ),
  "ordered-list": (block, i) => (
    <ol key={i}>
      {(block as Extract<ContentBlock, { type: "ordered-list" }>).items.map(
        (item, j) => (
          <li key={j}>{item}</li>
        )
      )}
    </ol>
  ),
  image: (block, i) => {
    const b = block as Extract<ContentBlock, { type: "image" }>;
    return (
      <figure key={i}>
        {b.src && (
          <Image
            src={b.src}
            alt={b.alt}
            width={800}
            height={450}
            className="rounded-lg"
          />
        )}
        {b.caption && <figcaption>{b.caption}</figcaption>}
      </figure>
    );
  },
};

export function ArticleContent({ blocks }: ArticleContentProps) {
  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert">
      {blocks.map((block, i) => blockRenderers[block.type]?.(block, i) ?? null)}
    </div>
  );
}
