import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/")({
  head: () => ({
    meta: [{ title: "Tech Blog - 오지민" }],
  }),
  component: Page,
});

const posts = [
  {
    title: "Prettier의 이상한 구조",
    description: "parser와 printer, findLast override — Prettier 플러그인이 마지막 하나만 살아남는 이유",
    date: "2025년 9월",
    slug: "/posts/prettier-architecture",
  },
  {
    title: "JSX as State",
    description: "콜백·비동기에서도 모달을 띄우는 새로운 패턴, 외부 스토어 기반의 jsx-jump-modal 소개",
    date: "2023년 1월",
    slug: "/posts/jsx-as-state",
  },
];

function Page() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <section>
        <ul className="space-y-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={post.slug} className="block hover:bg-muted rounded-lg p-4 transition-colors">
                <div className="text-muted-foreground text-sm mb-1">{post.date}</div>
                <div className="text-2xl font-semibold mb-2">{post.title}</div>
                <div className="text-muted-foreground">{post.description}</div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
