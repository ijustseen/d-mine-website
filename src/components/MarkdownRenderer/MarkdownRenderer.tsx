"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Image from "next/image";
import styles from "./MarkdownRenderer.module.scss";

interface MarkdownRendererProps {
  content: string;
  enableHeadingLinks?: boolean;
}

export default function MarkdownRenderer({
  content,
  enableHeadingLinks = true,
}: MarkdownRendererProps) {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkUnwrapImages]}
        rehypePlugins={
          enableHeadingLinks
            ? [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]]
            : [rehypeSlug]
        }
        components={{
          img: ({ src, alt }) => (
            <div className={styles.imageContainer}>
              <Image
                src={typeof src === "string" ? src : ""}
                alt={alt || ""}
                width={800}
                height={400}
                className={styles.image}
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          ),
          h1: ({ children, ...props }) => (
            <h1 className={styles.h1} {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className={styles.h2} {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className={styles.h3} {...props}>
              {children}
            </h3>
          ),
          p: ({ children, ...props }) => (
            <p className={styles.paragraph} {...props}>
              {children}
            </p>
          ),
          ul: ({ children, ...props }) => (
            <ul className={styles.list} {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className={styles.orderedList} {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className={styles.listItem} {...props}>
              {children}
            </li>
          ),
          a: ({ children, href, ...props }) => (
            <a href={href} className={styles.link} {...props}>
              {children}
            </a>
          ),
          code: ({ children, className, ...props }) => {
            const isInline = !className;
            return isInline ? (
              <code className={styles.inlineCode} {...props}>
                {children}
              </code>
            ) : (
              <pre className={styles.codeBlock}>
                <code {...props}>{children}</code>
              </pre>
            );
          },
          strong: ({ children, ...props }) => (
            <strong className={styles.bold} {...props}>
              {children}
            </strong>
          ),
          em: ({ children, ...props }) => (
            <em className={styles.italic} {...props}>
              {children}
            </em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
