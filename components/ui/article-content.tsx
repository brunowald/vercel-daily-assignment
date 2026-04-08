import Image from "next/image";
import Markdown, { type Components } from "react-markdown";
import type { ContentBlock } from "@/lib/api";

interface ArticleContentProps {
  blocks: ContentBlock[];
}

const inlineComponents: Components = {
  p: ({ children }) => <>{children}</>,
};

function BlockMd({ text }: { text: string }) {
  return <Markdown>{text}</Markdown>;
}

function InlineMd({ text }: { text: string }) {
  return <Markdown components={inlineComponents}>{text}</Markdown>;
}

const blockRenderers: Record<
  ContentBlock["type"],
  (block: ContentBlock, index: number) => React.ReactNode
> = {
  paragraph: (block, i) => {
    const { text } = block as Extract<ContentBlock, { type: "paragraph" }>;
    return <BlockMd key={i} text={text} />;
  },
  heading: (block, i) => {
    const b = block as Extract<ContentBlock, { type: "heading" }>;
    const HeadingComponent = b.level === 2 ? "h2" : "h3";

    return (
      <HeadingComponent key={i}>
        <InlineMd text={b.text} />
      </HeadingComponent>
    );
  },
  blockquote: (block, i) => (
    <blockquote key={i}>
      <InlineMd
        text={(block as Extract<ContentBlock, { type: "blockquote" }>).text}
      />
    </blockquote>
  ),
  "unordered-list": (block, i) => (
    <ul key={i}>
      {(block as Extract<ContentBlock, { type: "unordered-list" }>).items.map(
        (item, j) => (
          <li key={j}>
            <InlineMd text={item} />
          </li>
        ),
      )}
    </ul>
  ),
  "ordered-list": (block, i) => (
    <ol key={i}>
      {(block as Extract<ContentBlock, { type: "ordered-list" }>).items.map(
        (item, j) => (
          <li key={j}>
            <InlineMd text={item} />
          </li>
        ),
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
        {b.caption && (
          <figcaption>
            <InlineMd text={b.caption} />
          </figcaption>
        )}
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
