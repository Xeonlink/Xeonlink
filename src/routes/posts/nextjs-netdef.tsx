import { post } from "@/features/post/components";
import { code } from "@/shared/components/code";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownIcon, LinkIcon } from "lucide-react";

export const Route = createFileRoute("/posts/nextjs-netdef")({
  head: () => ({
    meta: [
      { title: "netdef — Server Action과 Route Handler를 하나로" },
      {
        name: "description",
        content:
          "next-safe-action에서 출발한 typesafe middleware layer. action과 route handler의 auth·validation 중복을 callBaseBuilder 하나로 통합.",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <post.main>
      <post.header>
        <post.writedate>2026년 2월</post.writedate>
        <post.h1>netdef — Server Action과 Route Handler를 하나로</post.h1>
        <post.subtitle>
          next-safe-action에서 출발해, middleware와 Standard Schema로
          action·route를 통합한 typesafe net layer
        </post.subtitle>
      </post.header>

      <post.section>
        <post.h2>middleware가 두 번 작성된다</post.h2>
        <post.p>
          Next.js에서는 같은 비즈니스 로직을 Server Action과 Route Handler
          양쪽에 두어야 하는 경우가 있습니다. 폼 제출은 action으로, REST
          클라이언트는 route handler로 처리하는 식입니다. 그런데 auth 확인, role
          검사, 입력 검증 같은 cross-cutting concern은 어느 쪽을 쓰든 똑같이
          필요합니다.
        </post.p>
        <div className="flex flex-col items-center gap-4 py-6">
          <div className="flex items-center gap-2 max-md:flex-col">
            <div className="flex items-center gap-2 md:flex-col">
              <div className="bg-muted rounded-md border p-2">form action</div>
              <div className="bg-muted rounded-md border p-2">fetch</div>
            </div>
            <ArrowDownIcon className="h-4 w-4 md:-rotate-90" />
            <div className="flex items-center gap-2 md:flex-col">
              <div className="bg-muted rounded-md border p-2">
                Server Action
              </div>
              <div className="bg-muted rounded-md border p-2">
                Route Handler
              </div>
            </div>
            <ArrowDownIcon className="h-4 w-4 md:-rotate-90" />
            <div className="rounded-md border border-blue-400 bg-blue-50 p-2 text-center font-medium text-blue-600 dark:border-blue-300 dark:bg-blue-900/20 dark:text-blue-300">
              Cross-cutting Concern
              <span className="text-muted-foreground mt-1 block text-xs font-normal">
                (Auth, Role, Validation 등)
              </span>
            </div>
            <ArrowDownIcon className="h-4 w-4 md:-rotate-90" />
            <div className="bg-muted rounded-md border p-2 text-center">
              Business Logic
            </div>
          </div>
          <span className="text-muted-foreground text-center text-sm">
            <span className="font-medium text-blue-600 dark:text-blue-300">
              Cross-cutting Concern
            </span>{" "}
            이 중복 작성된다
          </span>
        </div>

        <post.p>
          Server Action만 사용한다면{" "}
          <a
            className="text-foreground underline underline-offset-4"
            href="https://next-safe-action.dev/"
            rel="noreferrer"
            target="_blank"
          >
            next-safe-action
          </a>{" "}
          이라는 이미 잘 만들어진 라이브러리가 존재합니다. 하지만 route
          handler에 대해서는 공통 로직을 사용할 수 없습니다.
        </post.p>
        <post.p>
          저는 이 중복을 없애고, action이든 route든 같은 타입 규칙으로 handler를
          정의할 수 있는 단일 레이어가 필요했습니다. 그 결과물이{" "}
          <post.strong>nextjs-netdef</post.strong> 입니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>모든 요청의 시작점 - callBaseBuilder</post.h2>
        <post.p>
          netdef의 시작은{" "}
          <code.tsx variant="inline">callBaseBuilder()</code.tsx>
          입니다. middleware를 여기서 한 번만 정의하고, 끝에서{" "}
          <code.tsx variant="inline">actionClient()</code.tsx> 와{" "}
          <code.tsx variant="inline">routeClient()</code.tsx> 로 갈라집니다.
        </post.p>
        <Tabs defaultValue="callBaseBuilder">
          <TabsList className="w-full">
            <TabsTrigger value="callBaseBuilder">callBaseBuilder</TabsTrigger>
            <TabsTrigger value="client">client</TabsTrigger>
          </TabsList>
          <TabsContent value="callBaseBuilder">
            <code.tsx>{CALL_BASE_SNIPPET}</code.tsx>
          </TabsContent>
          <TabsContent value="client">
            <code.tsx>{ACTION_CLIENT_SNIPPET}</code.tsx>
          </TabsContent>
        </Tabs>
        <post.p>
          middleware는 <code.tsx variant="inline">metadataSchema</code.tsx> 로
          호출 시 옵션을 받고, <code.tsx variant="inline">next.call()</code.tsx>{" "}
          로 다음 단계로 넘깁니다.{" "}
          <code.tsx variant="inline">next.withCtx()</code.tsx> 를 사용하면 다음
          middleware로 ctx를 전달 할 수 있습니다. 그런데 어떻게 파라미터로 넘긴
          타입이, 다음 middleware의 ctx로 넘어갈 수 있을까요?
        </post.p>
        <code.ts>{MIDDLEWARE_MARKER}</code.ts>
        <post.p>
          비결은 바로 Symbol <code.ts variant="inline">type Marker</code.ts>{" "}
          입니다. <code.tsx variant="inline">next.withCtx()</code.tsx>는
          타입정의상 파라미터를 <code.ts variant="inline">type Marker</code.ts>{" "}
          와 함께 반환합니다. 반환된 타입은 내부적으로{" "}
          <code.ts variant="inline">type Marker</code.ts> 를 제거한 후, generic{" "}
          <code.ts variant="inline">type MO</code.ts>로 다음 middleware로
          전달되어, 체인을 이어갑니다.
        </post.p>
        <div className="flex justify-center">
          <iframe
            className="rounded-lg"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/i21l5MSZ3wQ?si=0hdETxm74w1XQGU6"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <post.p>
          <code.ts variant="inline">type Marker</code.ts> 대한 자세한 설명은 위
          영상에서 보고 응용했습니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>런타임 데이터와 타입의 흐름</post.h2>
        <post.p>
          action과 route는 동일한 middleware 체인을 사용하게 됩니다.{" "}
          middleware는 정의된 순서대로 실행되고, 각종 validation은 middleware가
          완료된 후에 실행됩니다.
        </post.p>
        <div className="flex items-center justify-center gap-2 py-4 max-md:flex-col">
          <div className="rounded-md border p-2">Request</div>

          <ArrowDownIcon className="h-4 w-4 md:-rotate-90" />
          <div className="rounded-md border p-2">
            MW (<span className="text-blue-600 dark:text-blue-300">auth</span>)
          </div>
          <ArrowDownIcon className="h-4 w-4 md:-rotate-90" />
          <div className="rounded-md border p-2">
            MW (<span className="text-blue-600 dark:text-blue-300">role</span>)
          </div>
          <ArrowDownIcon className="h-4 w-4 md:-rotate-90" />
          <div className="rounded-md border p-2">validation</div>
          <ArrowDownIcon className="h-4 w-4 md:-rotate-90" />
          <div className="rounded-md border p-2">handler</div>
          <ArrowDownIcon className="h-4 w-4 md:-rotate-90" />
          <div className="rounded-md border p-2">Result</div>
        </div>
        <Tabs defaultValue="route">
          <TabsList className="w-full">
            <TabsTrigger value="route">route</TabsTrigger>
            <TabsTrigger value="action">action</TabsTrigger>
          </TabsList>
          <TabsContent value="route">
            <code.ts>{ROUTE_EXAMPLE}</code.ts>
          </TabsContent>
          <TabsContent value="action">
            <code.ts>{ACTION_EXAMPLE}</code.ts>
          </TabsContent>
        </Tabs>
        <post.p>
          <post.strong>route handler</post.strong> 는{" "}
          <code.tsx variant="inline">
            .route(&quot;/api/coupons/[id]&quot;)
          </code.tsx>{" "}
          처럼{" "}
          <a
            className="text-foreground underline underline-offset-4"
            href="https://nextjs.org/docs/app/api-reference/config/next-config-js/typedRoutes"
            rel="noreferrer"
            target="_blank"
          >
            Next.js typed routes
          </a>
          (<code.ts variant="inline">type AppRouteHandlerRoutes</code.ts>)에
          맞춰 path를 좁힙니다. 검증 실패 시{" "}
          <code.json variant="inline">"INVALID_PARAMS"</code.json>,{" "}
          <code.json variant="inline">"INVALID_BODY"</code.json> 코드로
          응답합니다. <post.strong>server action</post.strong> 은 검증 실패 시{" "}
          <code.json variant="inline">"INVALID_INPUT"</code.json> 코드로
          응답합니다.
        </post.p>
        <post.p>
          action client와 route client는 둘다{" "}
          <a
            className="text-foreground underline underline-offset-4"
            href="https://ohjimin.com/posts/once-method-builder"
            rel="noreferrer"
            target="_blank"
          >
            일회용 Method 빌더패턴
          </a>{" "}
          을 사용하기 때문에, input · search parameter · body schema를 설정하는
          builder method는 한번만 사용할 수 있습니다.
        </post.p>
        {/* TODO: 컴포넌트화 */}
        <div className="border-border border-l-accent rounded-md border border-l-4 p-8 shadow-md">
          <a
            className="text-primary mb-4 block text-xl font-bold"
            href="https://nextjs.org/docs/app/api-reference/config/next-config-js/typedRoutes"
            rel="noreferrer"
            target="_blank"
          >
            <LinkIcon className="inline-block size-5" />{" "}
            <span className="cursor-pointer transition-colors hover:underline hover:underline-offset-6">
              NextJS Typed Routes
            </span>
          </a>
          <post.p>
            NextJS 16에서 stable 된 route 기능입니다. /app 에 정의된 page들의
            route가{" "}
            <code.ts variant="inline">type AppRouteHandlerRoutes</code.ts> 으로
            자동 정의되며, Link 컴포넌트의 href prop도 강제됩니다. dead page를
            정리하거나 page path가 바뀐 경우에 타입에러가 발생하기 때문에 매우
            편리합니다.
          </post.p>
        </div>
      </post.section>

      <post.section>
        <post.h2>Standard Schema 지원</post.h2>
        <post.p>
          middleware metadata와 route handler의 param, body 그리고 action의
          input은 Standard Schema로 검증합니다.
        </post.p>
        <Tabs defaultValue="route">
          <TabsList className="w-full">
            <TabsTrigger value="route">route</TabsTrigger>
            <TabsTrigger value="action">action</TabsTrigger>
          </TabsList>
          <TabsContent value="route">
            <code.ts>{ROUTE_CLIENT_CODE}</code.ts>
          </TabsContent>
          <TabsContent value="action">
            <code.ts>{ACTION_CLIENT_CODE}</code.ts>
          </TabsContent>
        </Tabs>
        <post.p>
          예시에서는 zod를 사용했지만 Standard Schema를 지원함으로써{" "}
          <post.strong>zod · Valibot · ArkType · Effect Schema 등</post.strong>{" "}
          validator-agnostic하게 검증 로직을 작성할 수 있습니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>정리</post.h2>
        <post.p>
          next-safe-action에서 출발했지만, netdef는 action과 route handler를
          하나의 middleware 스택으로 묶는 데 초점을 맞췄습니다. 그 과정에서
          최대한 많은 type이 단순히 소모되어 끝나는 것이 아니라 끝까지 흐르도록
          설계하였습니다.
        </post.p>
        <post.p>
          구현은 단일 파일로 두어 프로젝트에 복사해 쓸 수 있게 했습니다. 전체
          소스는 아래에서 확인할 수 있습니다.
        </post.p>
        <post.p>
          <a
            className="text-foreground underline underline-offset-4"
            href="https://github.com/Xeonlink/Xeonlink/blob/main%23next-netdef/src/index.ts"
            rel="noreferrer"
            target="_blank"
          >
            Xeonlink/next-netdef — src/index.ts
          </a>
        </post.p>
      </post.section>
    </post.main>
  );
}

const CALL_BASE_SNIPPET = `const callBase = callBaseBuilder()
  .use({
    metadataSchema: z.object({
      requireLogin: z.boolean().default(true),
    }),
    handle: async ({ metadata, next }) => {
      if (metadata.requireLogin) {
        const result = await requireAuthSafe();
        if (!result.success) {
          return result;
        }
      }
      return await next.withCtx({ user: "test" });
      // 다음 미들웨어가 사용할 ctx ->  ^^^^^^^^^^^
    },
  })
  .use({
    metadataSchema: z.object({
      requireRole: z.array(z.enum(["admin", "user", "guest", "*"])).default(["admin"]),
    }),
    handle: async ({ metadata, next, ctx }) => {
      console.log(ctx.user); // <- "user" 가 추론됨.
      if (metadata.requireRole.length > 0) {
        const result = await requireRoleSafe(...metadata.requireRole);
        if (!result.success) {
          return result;
        }
      }
      return await next.call();
    },
  });`;

const ACTION_CLIENT_SNIPPET = `export const actionClient = callBase.actionClient();
export const routeClient = callBase.routeClient();`;

const MIDDLEWARE_MARKER = `declare const __marker: unique symbol;
type Marker = { [__marker]: "Marker" };
type NotEmpty<T> = keyof T extends never ? never : T;

type Middleware<MO, MI, R, C> = { // <- 4. 반환된 CO 타입이 다음 middelware의 MO로 입력된다.
  metadataSchema?: StandardSchemaV1<MI, MO>;
  handle: (param: {
    metadata: MO;
    next: {
      call: () => Promise<void & Marker>;
      withCtx: <CO extends AnyRecord>( // <- 2. 파라미터 타입이 추론된다.
        ctxOut: NotEmpty<CO>, // <- 1. 코드에서 파라미터를 넘긴다.
      ) => Promise<CO & Marker>; // <- 3. 추론된 CO 타입이 Maker와 함께 반환된다.
    };
    ctx: Readonly<C>;
  }) => Promise<R>;
};`;

const ACTION_EXAMPLE = `export const createCoupon = actionClient
  .input(couponFormSchema)
  .action(async (input) => {
    const result = await couponService.createCoupon(input);
    if (!result.success) return result;
    revalidatePath("/admin/coupons");
    return Ok("OK");
  });`;

const ROUTE_EXAMPLE = `const base = routeClient.route("/api/coupons/[id]").params(
  z.object({ id: z.coerce.number().int().min(1) }),
);

export const GET = base.handler(async (_, ctx) => {
  const coupon = await couponService.getCoupon(ctx.params.id);
  if (!coupon.success) return coupon;
  return Ok(pick(coupon.data, ["name", "memo", "enabled"]));
});`;

const ROUTE_CLIENT_CODE = `function actionBuilder<...>(
    def: ActionDef<IIn, IOut, C>, 
    omits: OM[] = []
) {
  const builder = {         
    input: <_I, _O>(schema: StandardSchemaV1<_I, _O>) => {
                        //  ^^^^^^^^^^^^^^^^
      return actionBuilder<R, M, C, _I, _O, OM | "input">(
        { ...def, inputSchema: schema },
        [...omits, "input"],
      );
    },
    ...
  };
  ...
}`;

const ACTION_CLIENT_CODE = `function routeBuilder<...>(
    def: RouteDef<SP, P, B, C>, 
    omits: OM[] = []
) {
  const builder = {
    searchParams: <_SP>(schema: StandardSchemaV1<AnyRecord, _SP>) => {
                            //  ^^^^^^^^^^^^^^^^
      return routeBuilder<...>(
        { ...def, searchParamsSchema: schema },
        [...omits, "searchParams"],
      );
    },
    ...
  };
  ...
}`;
