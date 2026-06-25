import ogImage from "@/assets/selfie0_crop.jpeg";
import { Button } from "@/shared/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpenIcon, FileTextIcon, SkullIcon } from "lucide-react";

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
    <main className="mx-auto max-w-4xl space-y-12 px-6 py-20">
      <section className="space-y-6">
        <p className="text-3xl font-bold">
          <span className="text-accent">OH</span> JIMIN
        </p>
        <h1 className="text-5xl leading-tight font-bold md:text-6xl">
          도구를 만들고,
          <br />
          기록하고,
          <br />
          증명합니다.
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
          반복을 줄이고 더 가치 있는 일에 집중할 수 있는 도구를 만듭니다. <br />
          사소한 아이디어가 더 큰 아이디어를 위한 기틀이 되어, 보이지 않는 곳에서 영향을 끼치는 <br />
          <span className="font-bold">개발자를 위한 개발자</span>
        </p>
      </section>

      <section className="grid gap-4 max-md:tex t-center md:grid-cols-3">
        <article className="border-border bg-card space-y-4 rounded-2xl border p-6 shadow-sm">
          <FileTextIcon className="text-accent inline-block size-8" />
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Resume</h2>
            <p className="text-muted-foreground leading-relaxed">
              경력, 프로젝트, 자격증을 담은 이력서. 열심히 했다는 기록
            </p>
          </div>
          <Button asChild variant="outline" className="w-full" size="lg">
            <Link to="/resume">바로가기</Link>
          </Button>
        </article>

        <article className="border-border bg-card space-y-4 rounded-2xl border p-6 shadow-sm">
          <BookOpenIcon className="text-accent inline-block size-8" />
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Blog Posts</h2>
            <p className="text-muted-foreground leading-relaxed">
              개발 경험과 학습, 생각을 기록하는 블로그. 내 생각의 이력
            </p>
          </div>
          <Button asChild variant="outline" className="w-full" size="lg">
            <Link to="/posts">바로가기</Link>
          </Button>
        </article>

        <article className="border-border bg-card space-y-4 rounded-2xl border p-6 shadow-sm">
          <SkullIcon className="text-accent inline-block size-8" />
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">명예의 실패</h2>
            <p className="text-muted-foreground leading-relaxed">실패했지만 끝까지 달린 POC와 실험. 시도했다는 증거</p>
          </div>
          <Button variant="outline" className="w-full" disabled size="lg">
            Coming soon
          </Button>
        </article>
      </section>
    </main>
  );
}
