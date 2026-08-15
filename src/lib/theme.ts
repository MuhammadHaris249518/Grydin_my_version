/**
 * One continuous dark canvas for the full page.
 * Avoids repeating per-section gradients that cause visible banding on scroll.
 */
export const DARK_PAGE_BG =
  "linear-gradient(180deg, #000000 0%, #060606 32%, #141414 62%, #2e2e2e 88%, #4a4a4a 100%)";

/** Dark sections sit on the shared canvas — no second gradient */
export const DARK_SECTION_BG = "transparent";

/** Light page shell (services hero area uses dark section on white main) */
export const LIGHT_PAGE_BG = "#ffffff";
