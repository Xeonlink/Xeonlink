import ogImage from "@/assets/selfie0_crop.jpeg";
import { Button } from "@/shared/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpenIcon, FileTextIcon, SparklesIcon } from "lucide-react";

const features = [
  {
    title: "Resume",
    description: "경력, 프로젝트, 자격증을 담은 이력서",
    href: "/resume",
    icon: FileTextIcon,
    available: true,
  },
  {
    title: "Tech Blog",
    description: "개발 경험과 학습을 기록하는 블로그",
    href: "#",
    icon: BookOpenIcon,
    available: false,
  },
  {
    title: "Proof of Work",
    description: "능력과 경험을 증명하는 작업물 모음",
    href: "#",
    icon: SparklesIcon,
    available: false,
  },
] as const;

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
      { property: "og:image", content: ogImage },
      { property: "og:site_name", content: "오지민 포트폴리오" },
      { property: "og:locale", content: "ko_KR" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center gap-12 px-6 py-16">
      <section className="space-y-6">
        <p className="text-accent text-sm font-medium tracking-widest uppercase">OH JIMIN</p>
        <h1 className="text-5xl leading-tight font-bold md:text-6xl">
          도구를 만들고,
          <br />
          기록하고,
          <br />
          증명합니다.
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
          반복을 줄이고 더 가치 있는 일에 집중할 수 있는 도구를 만듭니다. 이 사이트는 tech blog, resume, 그리고 경력과
          능력을 증명하는 작업물을 한곳에 모으는 허브입니다.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/resume">이력서 보기</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <article key={feature.title} className="border-border bg-card space-y-4 rounded-2xl border p-6 shadow-sm">
              <Icon className="text-accent size-8" />
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">{feature.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
              {feature.available ? (
                <Button asChild variant="outline" className="w-full">
                  <Link to={feature.href}>바로가기</Link>
                </Button>
              ) : (
                <Button variant="outline" className="w-full" disabled>
                  Coming soon
                </Button>
              )}
            </article>
          );
        })}
      </section>
    </main>
  );
}
