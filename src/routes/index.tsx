import { LandingPage } from "@/features/landing/landing-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "오지민 - 개발자" },
      {
        name: "description",
        content:
          "개발자 오지민의 포트폴리오 허브입니다. tech blog, resume, 경력과 능력을 증명하는 작업물을 한곳에서 만나보세요.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://portfolio.ohjimin.com" },
      { property: "og:title", content: "오지민 - 개발자" },
      {
        property: "og:description",
        content:
          "개발자 오지민의 포트폴리오 허브입니다. tech blog, resume, 경력과 능력을 증명하는 작업물을 한곳에서 만나보세요.",
      },
      { property: "og:image", content: "/selfie0_crop.jpeg" },
      { property: "og:site_name", content: "오지민 포트폴리오" },
      { property: "og:locale", content: "ko_KR" },
    ],
  }),
  component: LandingPage,
});
