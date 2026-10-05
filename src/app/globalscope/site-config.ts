export const SITE = {
  name: "GrydIn",
  legalName: "GrydIn",
  tagline: "We bridge the gaps in your business.",
  email: "hello@grydin.co",
  /** Opens default mail app with To, subject, and body prefilled. */
  contactMailtoHref: (() => {
    const subject = "Inquiry for GrydIn";
    const body =
      "Hi GrydIn team,\n\nI'd like to discuss:\n\n[Your message here]\n\nBest regards,\n[Your name]";
    return `mailto:hello@grydin.co?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  })(),
  phoneDisplay: "+92 329 6637320",
  phoneTel: "+923296637320",
  linkedin: "https://www.linkedin.com/company/grydin",
  whatsappUrl:
    "https://wa.me/923296637320?text=Hi%20GrydIn%2C%20I%27d%20like%20to",
  office: {
    lines: [
      "Office # 26",
      "The Box Software Technology Park",
      "F-11 Markaz, Islamabad",
      "44000",
    ],
    streetAddress: "Office # 26, The Box Software Technology Park, F-11 Markaz",
    locality: "Islamabad",
    postalCode: "44000",
    country: "PK",
    mapsUrl: "https://maps.app.goo.gl/3kzXdkA1Dr6gbXYv5",
    lat: 33.6838634,
    lng: 72.9892686,
    directionsUrl:
      "https://www.google.com/maps/dir//Office+%23+26,+3rd+Floor,+GrydIn,+The+Box+Software+Technology+Park,+F-11+Markaz+F+11+Markaz+F-11,+Islamabad,+44000,+Pakistan/@33.6838634,72.9892686,17z/data=!4m16!1m7!3m6!1s0x38dfbd96dfa1f27f:0x844d50455d33433!2sGrydIn!8m2!3d33.6838634!4d72.9892686!16s%2Fg%2F11zyvkz0m9!4m7!1m0!1m5!1m1!1s0x38dfbd96dfa1f27f:0x844d50455d33433!2m2!1d72.9892686!2d33.6838634?entry=ttu",
    /** Full line as on Google Maps place listing (share preview). */
    mapsInfoAddress:
      "Office # 26, 3rd Floor, The Box Software Technology Park, F-11 Markaz, Islamabad, 44000, Pakistan",
    /** Map-only embed — z=12 slightly closer on F-11 / GrydIn. */
    mapsEmbedSrc:
      "https://maps.google.com/maps?q=GrydIn+F-11+Markaz+Islamabad+Pakistan&hl=en&z=12&output=embed",
  },
} as const;

export const SITEMAP_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const SERVICE_LINKS = [
  { label: "AI Agents", href: "/services" },
  { label: "Workflow Automation", href: "/services" },
  { label: "AI Integration", href: "/services" },
  { label: "Custom Software", href: "/services" },
  { label: "System Integration", href: "/services" },
  { label: "Full-Stack Development", href: "/services" },
] as const;

export const BLOG_LINKS = [
  { label: "Insights", href: "/blog/category/blog" },
  { label: "News", href: "/blog/category/news" },
  { label: "Announcements", href: "/blog/category/announcements" },
] as const;
