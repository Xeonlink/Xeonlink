# next-netdef

Next.js App Router용 **타입 안전 서버 액션·라우트 핸들러** 빌더입니다.

[Standard Schema](https://github.com/standard-schema/spec) 기반으로 input, searchParams, params, body를 검증하고, 미들웨어 체인으로 인증·권한 같은 공통 로직을 조합할 수 있습니다. Next.js `AppRouteHandlerRoutes`와 연동해 라우트 경로와 params 타입을 추론합니다.

## 특징

- **빌더 패턴 API** — `callBaseBuilder()`로 미들웨어를 쌓고, `actionClient` / `routeClient`로 핸들러를 정의합니다.
- **Standard Schema 검증** — Zod 등 Standard Schema 호환 라이브러리로 요청 데이터를 검증합니다.
- **미들웨어 체인** — metadata 스키마 검증과 context 전달을 지원합니다.
- **타입 추론** — 스키마·미들웨어·라우트 경로에서 타입이 누적되어 핸들러까지 전달됩니다.

## 예시

```ts
import z from "zod";
import { callBaseBuilder } from "next-netdef";

const callBase = callBaseBuilder()
  .use({
    metadataSchema: z.object({
      requireLogin: z.boolean().default(true),
    }),
    handle: async ({ metadata, next }) => {
      if (metadata.requireLogin) {
        return await next.withCtx({ user: { id: "123" } });
      }
      return await next.call();
    },
  })
  .use({
    metadataSchema: z.object({
      requireRole: z.array(z.enum(["admin", "user"])).default(["admin"]),
    }),
    handle: async ({ metadata, next }) => {
      // ...
      return await next.call();
    },
  });

const actionClient = callBase.actionClient();
const routeClient = callBase.routeClient();

// 서버 액션
export const serverAction = actionClient
  .input(z.object({ id: z.string() }))
  .action(async (input, ctx) => {
    return input.id;
  });

// 라우트 핸들러
const route = routeClient
  .route("/api/v1/teams/[id]")
  .params(z.object({ id: z.string() }));

export const GET = route
  .searchParams(z.object({ test: z.string() }))
  .handler(async (req, ctx) => {
    return ctx.searchParams.test;
  });
```

## 타입 추론

### 미들웨어 (`.use()`)

| 위치 | 추론되는 타입 | 설명 |
|------|--------------|------|
| `metadataSchema` | `metadata` | 스키마 output 타입. 예: `z.object({ requireLogin: z.boolean() })` → `{ requireLogin: boolean }` |
| `handle`의 `ctx` | 이전 미들웨어의 context | 앞선 미들웨어가 `next.withCtx()`로 추가한 필드가 누적됩니다 |
| `next.withCtx({ ... })` | 이후 핸들러의 `ctx` | 추가한 객체 필드가 action/route handler의 `ctx` 타입에 합쳐집니다 |
| `.use()` 체인 | `metadata()` 인자 | 각 미들웨어의 `metadataSchema` input 타입이 교차(`&`)되어 `metadata()` 호출 시 검증됩니다 |

### 서버 액션 (`actionClient`)

| 위치 | 추론되는 타입 | 설명 |
|------|--------------|------|
| `.input(schema)` | `action`의 `input` | 스키마 output 타입. 예: `z.object({ id: z.string() })` → `{ id: string }` |
| `.input(schema)` | 액션 호출 인자 | 스키마 input 타입 |
| `.action(handler)` | `ctx` | 미들웨어 체인에서 `next.withCtx()`로 누적된 context |
| `.action(handler)` | 반환 타입 | handler 반환값과 미들웨어 반환값의 합집합 |

### 라우트 핸들러 (`routeClient`)

| 위치 | 추론되는 타입 | 설명 |
|------|--------------|------|
| `.route(path)` | 경로 리터럴 | Next.js `AppRouteHandlerRoutes`에 등록된 경로만 허용됩니다 |
| `.params(schema)` | 스키마 키 | `.route()`로 고정된 경로의 params 키와 일치해야 합니다 |
| `.params(schema)` | `handler`의 `ctx.params` | 스키마 output 타입 |
| `.searchParams(schema)` | `handler`의 `ctx.searchParams` | 스키마 output 타입 |
| `.body(schema)` | `handler`의 `ctx.body` | 스키마 output 타입 |
| `.handler(handler)` | `ctx` | 위 params/searchParams/body와 미들웨어 context가 합쳐진 타입 |

`.searchParams`, `.params`, `.body`를 연결하지 않은 항목은 `ctx`에 포함되지 않습니다.
