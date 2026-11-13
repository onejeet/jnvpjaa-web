import Image from 'next/image';

// A versioned public asset can be cached indefinitely and replaced with a new URL.
export default function AlumniArtwork() {
  return (
    <Image
      src="/images/auth/alumni-pencil-doodle-v1.png"
      alt="Pencil contour doodle of alumni reconnecting, with a small school doorway behind them"
      width={1752}
      height={897}
      sizes="(max-width: 899px) 0px, 360px"
      style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 4 }}
    />
  );
}
