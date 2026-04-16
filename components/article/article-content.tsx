import Image from "next/image";
import type { ContentBlock } from "@/lib/api/api";

interface ArticleContentProps {
  blocks: ContentBlock[];
}

// Parses inline markdown: **bold**, *italic*, [text](url)
function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[(.+?)\]\((.+?)\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[0].startsWith("**")) {
      parts.push(<strong key={match.index}>{match[2]}</strong>);
    } else if (match[0].startsWith("`")) {
      parts.push(<code key={match.index}>{match[4]}</code>);
    } else if (match[0].startsWith("*")) {
      parts.push(<em key={match.index}>{match[3]}</em>);
    } else {
      parts.push(<a key={match.index} href={match[6]}>{match[5]}</a>);
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function Inline({ text }: { text: string }) {
  return <>{parseInline(text)}</>;
}

export function ArticleContent({ blocks }: ArticleContentProps) {
  return (
    <article className="prose prose-neutral max-w-none dark:prose-invert">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return <p key={i}><Inline text={block.text} /></p>;
          case "heading":
            return block.level === 2 ? (
              <h2 key={i}><Inline text={block.text} /></h2>
            ) : (
              <h3 key={i}><Inline text={block.text} /></h3>
            );
          case "blockquote":
            return <blockquote key={i}><Inline text={block.text} /></blockquote>;
          case "unordered-list":
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}><Inline text={item} /></li>
                ))}
              </ul>
            );
          case "ordered-list":
            return (
              <ol key={i}>
                {block.items.map((item, j) => (
                  <li key={j}><Inline text={item} /></li>
                ))}
              </ol>
            );
          case "image":
            return (
              <figure key={i}>
                <Image src={block.src} alt={block.alt} width={800} height={450} className="rounded-lg" />
                {block.caption && <figcaption><Inline text={block.caption} /></figcaption>}
              </figure>
            );
        }
      })}
    </article>
  );
}
