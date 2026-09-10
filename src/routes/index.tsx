import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/Portfolio";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Muhammad Talal Bin Waheed | Data Scientist" },
      { name: "description", content: "Interactive portfolio of Muhammad Talal Bin Waheed: applied machine learning, NLP retrieval systems, and business intelligence." },
      { property: "og:title", content: "Muhammad Talal Bin Waheed | Data Scientist" },
      { property: "og:description", content: "Explore applied machine learning, NLP retrieval systems, and business intelligence projects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});
