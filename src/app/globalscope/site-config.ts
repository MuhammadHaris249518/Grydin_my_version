export const SITE = {
  name: "GrydIn",
  legalName: "GrydIn",
  tagline: "We bridge the gaps in your business.",
  email: "hello@grydin.co",
  phoneDisplay: "+92 329 6637320",
  phoneTel: "+923296637320",
  locationLine: "Pakistan – working globally",
  locationDisplay: "Islamabad, Pakistan – working globally",
  city: "Islamabad",
  linkedin: "https://www.linkedin.com/company/grydin",
  whatsappUrl:
    "https://wa.me/923296637320?text=Hi%20GrydIn%2C%20I%20came%20across%20your%20website%20and%20I%20think%20there%27s%20a%20gap%20in%20my%20business%20you%20might%20be%20able%20to%20close.%20I%27d%20like%20to%20discuss%20it.",
} as const;

export const SITEMAP_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
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
