import type { MetadataRoute } from "next";

const BASE = "https://www.autoskola-pohl.cz";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                  lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/cenik`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/sluzby`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/skoleni`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/kontakt`,     lastModified: new Date(), changeFrequency: "yearly",  priority: 0.6 },
  ];
}
