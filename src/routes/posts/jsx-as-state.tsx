import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/jsx-as-state")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/posts/jsx-as-state"!</div>;
}
