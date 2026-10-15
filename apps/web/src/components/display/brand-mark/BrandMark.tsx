import { useId } from "react";
import type { ReactElement } from "react";
import clsx from "clsx";

export interface BrandMarkProps {
  className?: string;
}

/**
 * The Song Print mark: a lyric sheet with a chord pill and a beamed note.
 * Drawn inline in its own brand colours; mirrors packages/ui/src/Branding/assets/song-print-512x512.svg.
 */
export function BrandMark({ className }: BrandMarkProps): ReactElement {
  const id = useId();
  const gradientId = `${id}-bg`;
  const noteId = `${id}-note`;

  return (
    <svg viewBox="0 0 512 512" role="presentation" aria-hidden="true" className={clsx("size-6", className)}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2e95ff" />
          <stop offset="1" stopColor="#0474e6" />
        </linearGradient>
        <g id={noteId}>
          <path d="M62 176V22L194 0V156H174V51.33L82 66.67V176Z" />
          <ellipse cx="40" cy="176" rx="44" ry="34" transform="rotate(-20 40 176)" />
          <ellipse cx="152" cy="156" rx="44" ry="34" transform="rotate(-20 152 156)" />
        </g>
      </defs>
      <rect width="512" height="512" rx="112" fill={`url(#${gradientId})`} />
      <rect
        x="120"
        y="72"
        width="272"
        height="368"
        rx="32"
        fill="#ffffff"
        fillOpacity="0.3"
        transform="rotate(8 256 256)"
      />
      <g transform="rotate(-4 256 256)">
        <path
          fill="#0358b8"
          fillOpacity="0.35"
          d="M152 88H320L392 160V424A32 32 0 0 1 360 456H152A32 32 0 0 1 120 424V120A32 32 0 0 1 152 88Z"
        />
        <path
          fill="#ffffff"
          d="M152 72H320L392 144V408A32 32 0 0 1 360 440H152A32 32 0 0 1 120 408V104A32 32 0 0 1 152 72Z"
        />
        <path fill="#cfe2fb" d="M320 72V124A20 20 0 0 0 340 144H392Z" />
        <rect x="152" y="160" width="104" height="52" rx="26" fill="#0485f7" />
        <rect x="152" y="240" width="176" height="28" rx="14" fill="#18181b" />
        <rect x="152" y="296" width="120" height="28" rx="14" fill="#18181b" />
      </g>
      <g transform="translate(272 262) scale(0.95)" strokeLinejoin="round">
        <use href={`#${noteId}`} fill="#ffffff" stroke="#ffffff" strokeWidth="32" />
        <use href={`#${noteId}`} fill="#18181b" stroke="#18181b" strokeWidth="8" />
      </g>
    </svg>
  );
}
