import { BRAND_ACCENT } from "@/lib/brand";

export const AccentWord = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: BRAND_ACCENT, fontWeight: 600 }}>{children}</span>
);
