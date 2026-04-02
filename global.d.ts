/**
 * it's dummy type for nextjs routes
 */
declare module ".next/types/routes" {
  export type AppRouteHandlerRoutes = "test1" | "test2" | "test3" | "/api/v1/teams/[id]";
}

/**
 * it's dummy type for nextjs request
 */
declare module "next/server" {
  export type NextRequest = {
    nextUrl: {
      searchParams: URLSearchParams;
    };
    json: () => Promise<unknown>;
  }

  class NextResponse {
    static json(body: unknown): NextResponse
  }
}

/**
 * it's dummy type for nextjs route context
 */
type RouteContext<T extends AppRouteHandlerRoutes> = any;