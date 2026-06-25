import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/")({
  head: () => ({
    meta: [{ title: "Tech Blog - 오지민" }],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-4xl font-bold">Posts</h1>
      <p className="text-muted-foreground mt-4 text-lg">곧 공개됩니다.</p>
    </main>
  );
}
