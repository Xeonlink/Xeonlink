import ogImage from "@/assets/selfie0_crop.jpeg";
import { GobundalSection } from "@/features/portfolio/sections/GobundalSection";
import { KoreaAuthFillerSection } from "@/features/portfolio/sections/KoreaAuthFillerSection";
import { Button } from "@/shared/components/ui/button";
import { useTheme } from "@/shared/hooks/use-theme";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpToLineIcon,
  MoonIcon,
  SunIcon,
  SunMoonIcon,
} from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "오지민 - 포트폴리오" },
      {
        name: "description",
        content:
          "개발자 오지민의 포트폴리오입니다. 곱은달 농장 배송·고객 관리 시스템과 한국인증채우기 프로젝트를 소개합니다.",
      },
      {
        name: "keywords",
        content:
          "개발자, 포트폴리오, 웹개발, React, Next.js, TypeScript, 브라우저 확장프로그램",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ohjimin.com/portfolio" },
      { property: "og:title", content: "오지민 - 포트폴리오" },
      {
        property: "og:description",
        content:
          "개발자 오지민의 포트폴리오입니다. 곱은달 농장 배송·고객 관리 시스템과 한국인증채우기 프로젝트를 소개합니다.",
      },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "오지민 개발자 프로필 이미지" },
      { property: "twitter:card", content: "summary_large_image" },
      { property: "twitter:url", content: "https://ohjimin.com/portfolio" },
      { property: "twitter:title", content: "오지민 - 포트폴리오" },
      {
        property: "twitter:description",
        content:
          "개발자 오지민의 포트폴리오입니다. 곱은달 농장 배송·고객 관리 시스템과 한국인증채우기 프로젝트를 소개합니다.",
      },
      { property: "twitter:image", content: ogImage },
      { property: "twitter:image:alt", content: "오지민 개발자 프로필 이미지" },
    ],
  }),
  component: Page,
});

function Page() {
  const { theme, gotoNextTheme } = useTheme();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="group fixed top-0 right-0">
        <Button
          className="mt-8 mr-8 size-10 group-hover:size-20 motion-safe:duration-500"
          variant="outline"
          onClick={() => gotoNextTheme()}
        >
          {theme === "light" ? <SunIcon className="size-5" /> : null}
          {theme === "dark" ? <MoonIcon className="size-5" /> : null}
          {theme === "system" ? <SunMoonIcon className="size-5" /> : null}
        </Button>
      </div>
      <main className="mx-auto max-w-5xl">
        <GobundalSection />
        <KoreaAuthFillerSection />
      </main>
      <div className="group fixed right-0 bottom-0">
        <Button
          className="mr-8 mb-8 size-10 group-hover:size-20 motion-safe:duration-500"
          variant="outline"
          onClick={scrollToTop}
        >
          <ArrowUpToLineIcon className="size-6 group-hover:size-10 motion-safe:duration-300" />
          <span className="sr-only">scroll to top</span>
        </Button>
      </div>
    </>
  );
}
