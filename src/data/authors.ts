export interface Author {
  name: string;
  role: string;
  avatar?: string;
  linkedin?: string;
  bio?: string;
}

export const AUTHORS: Record<string, Author> = {
  "grydin-team": {
    name: "GrydIn Team",
    role: "Engineering & Strategy",
    avatar: "/brand/logo-white-bg.png",
    linkedin: "https://www.linkedin.com/company/grydin",
    bio: "Engineers and automation strategists designing fixed-scope, reliable software systems at GrydIn.",
  },
};

export function getAuthor(id: string): Author {
  return AUTHORS[id] || AUTHORS["grydin-team"];
}
