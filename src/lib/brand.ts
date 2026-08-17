/** Default site accent — olive. Override with NEXT_PUBLIC_BRAND_ACCENT in .env.local */

// #94b55e
// #68877f
// #6e8fa3

export const BRAND_ACCENT_DEFAULT = "#8cad57";

export const BRAND_ACCENT =
  process.env.NEXT_PUBLIC_BRAND_ACCENT?.trim() || BRAND_ACCENT_DEFAULT;

function parseHex(hex: string): { r: number; g: number; b: number } | null {
  const raw = hex.replace("#", "").trim();
  if (raw.length === 3) {
    return {
      r: parseInt(raw[0] + raw[0], 16),
      g: parseInt(raw[1] + raw[1], 16),
      b: parseInt(raw[2] + raw[2], 16),
    };
  }
  if (raw.length === 6) {
    return {
      r: parseInt(raw.slice(0, 2), 16),
      g: parseInt(raw.slice(2, 4), 16),
      b: parseInt(raw.slice(4, 6), 16),
    };
  }
  return null;
}

/** rgba() from accent, e.g. brandAccentAlpha(0.85) */
export function brandAccentAlpha(alpha: number): string {
  const rgb = parseHex(BRAND_ACCENT);
  if (!rgb) return BRAND_ACCENT;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

/** Hex + alpha channel suffix, e.g. brandAccentHexAlpha(0.33) → #89914055 */
export function brandAccentHexAlpha(alpha: number): string {
  const channel = Math.round(Math.max(0, Math.min(1, alpha)) * 255)
    .toString(16)
    .padStart(2, "0");
  return `${BRAND_ACCENT}${channel}`;
}
