import React from "react";

type Props = {
    tags?: string[];
  };
  
  export function PostFooter({ tags }: Props) {
    if (!tags || tags.length === 0) return null;
  
    return (
        <div className="flex flex-wrap gap-2 py-4 justify-end">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] text-sm px-2 py-1 rounded-[var(--radius)]">
              #{tag}
            </span>
          ))}
        </div>
    );
  }
  