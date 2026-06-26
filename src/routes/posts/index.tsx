import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/")({
  head: () => ({
    meta: [{ title: "Tech Blog - 오지민" }],
  }),
  component: Page,
});

const posts = [
  {
    title: "JSX as State",
    description: "콜백·비동기에서도 모달을 띄우는 새로운 패턴, 외부 스토어 기반의 jsx-jump-modal 소개",
    date: "2026년 6월",
  },
  // 아래에 포스트가 추가될 수 있습니다.
];

function Page() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <section>
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.title} className="border border-border pb-8 last:border-0 last:pb-0">
              <Link to="/posts/jsx-as-state" className="block hover:bg-muted rounded-lg p-4 transition-colors">
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
