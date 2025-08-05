"use client"
import { usePathname } from "next/navigation"
import React from "react"
import { useEffect, useState } from "react"

export default function ShareButtons({ title }: { title: string }) {
  const pathname = usePathname()
  const [url, setUrl] = useState("")

  useEffect(() => {
    setUrl(window.location.origin + pathname)
  }, [pathname])

  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)

  return (
    <div className="flex gap-3 items-center py-4">
      <span className="text-sm text-[var(--muted-foreground)]">Bagikan:</span>

      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full border border-[var(--border)] bg-[var(--background)]">
        <svg width={18} height={18} stroke="var(--muted)" className="hover:stroke-green-500">
          <title>Whatsapp</title>
          <use href="/icons.svg#wa" />
        </svg>
      </a>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-[var(--background)] border border-[var(--border)]">
        <svg width={18} height={18} stroke="var(--muted)" className="hover:stroke-black">
          <title>X</title>
          <use href="/icons.svg#twitter" />
        </svg>
      </a>

      <button
        onClick={() => navigator.clipboard.writeText(url)}
        className="p-2 rounded-full bg-[var(--background)] border border-[var(--border)]">
        <svg width={18} height={18} stroke="var(--muted)">
          <title>Salin</title>
          <use href="/icons.svg#copy" />
        </svg>
      </button>
    </div>
  )
}
