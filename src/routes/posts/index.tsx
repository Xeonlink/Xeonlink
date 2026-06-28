import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/")({
  head: () => ({
    meta: [{ title: "Tech Blog - 오지민" }],
  }),
  component: Page,
});

type Post = {
  title: string;
  description: string;
  date: string;
  slug: string;
};

const posts: Post[] = [
  {
    title: "Prettier - 모든 플러그인 통과시키기",
    description:
      "Proxy로 parser 선택을 가로채고, nested format()으로 플러그인을 모두 적용시키는 방법",
    date: "2025년 9월",
    slug: "/posts/prettier-format-linear",
  },
  {
    title: "Prettier - 이상한 구조",
    description:
      "parser와 printer, findLast override — Prettier 플러그인이 마지막 하나만 살아남는 이유",
    date: "2025년 9월",
    slug: "/posts/prettier-architecture",
  },
  {
    title: "JSX as State",
    description:
      "콜백·비동기에서도 모달을 띄우는 새로운 패턴, 외부 스토어 기반의 jsx-jump-modal 소개",
    date: "2023년 1월",
    slug: "/posts/jsx-as-state",
  },
];

function Page() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-20">
      <h1 className="mb-8 pl-4 text-4xl font-bold">Posts</h1>
      <section>
        <ul className="space-y-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                className="hover:bg-muted block rounded-lg p-4 transition-colors"
                to={post.slug}
              >
                <div className="text-muted-foreground mb-1 text-sm">
                  {post.date}
                </div>
                <div className="mb-2 text-2xl font-semibold">{post.title}</div>
                <div className="text-muted-foreground">{post.description}</div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
