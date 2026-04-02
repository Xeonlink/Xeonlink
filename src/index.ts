/**
 * @TODO nextjs에서는 build를 해야 .next/types/routes가 생성된다. 빌드를 해도 타입이 생성되지 않는다면, 아래의 example을 시도해라.
 * 
 * @example
 * 
 * ```ts
 * // next.config.ts
 * 
 * const nextConfig: NextConfig = {
 *   ...
 *   typedRoute: true
 * }
 * 
 * export default nextConfig;
 */
import type { AppRouteHandlerRoutes } from ".next/types/routes";
/**
 * form more information about standard schema
 * 
 * @see https://github.com/standard-schema/spec
 */
import type { StandardSchemaV1 } from "@standard-schema/spec";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const FAIL_CODES = [
  /**
   * action handler에서 input 데이터의 검증이 실패했을 경우
   */
  "INVALID_INPUT",
  /**
   * route handler에서 search param 데이터의 검증이 실패했을 경우
   */
  "INVALID_SEARCH_PARAMS",
  /**
   * route handler에서 route param 데이터의 검증이 실패했을 경우
   */
  "INVALID_ROUTE_PARAMS",
  /**
   * route handler에서 body 데이터의 검증이 실패했을 경우
   */
  "INVALID_BODY",
] as const;

/**
 * 얕은 레벨에서 주어진 key들을 제거한 새 객체를 반환하는 함수입니다.
 * 
 * @param obj 원본 객체
 * @param keys 생략(제외)할 키 목록
 * @returns 지정한 키가 제외된 새로운 객체
 */
function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: readonly K[]
): Omit<T, K> {
  const ret = {} as Omit<T, K>;
  const keySet = new Set(keys);
  for (const key in obj) {
    if (!keySet.has(key as unknown as K)) {
      (ret as any)[key] = obj[key];
    }
  }
  return ret;
}

/**
 * action/route handler를 정의할 때, query param이나 search param, body 등의 데이터의 검증이 실패했을 경우 리턴값을 생성하는 함수
 * 
 * @param code 실패 코드
 * @param message 메시지
 * @returns Record 형태의 직렬화 가능한 객체
 */
function Fail<const CODE extends typeof FAIL_CODES[number], const MSG extends string>(code: CODE, message: MSG)  {
  return {
    success: false,
    code,
    message,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type unsafe_any = any;
type AnyRecord = Record<string, unknown>;
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

/**
 * undefined를 제외한 객체 타입
 */
type OmitUndefined<T extends object> = {
  [K in keyof T as T[K] extends undefined ? never : K]: T[K];
};

/**
 * marker type
 */
declare const __marker: unique symbol;
type Marker = { [__marker]: "Marker" };
type OmitMarker<T> = T extends Marker ? never : T;
type CutMarker<T> = T extends infer U & Marker ? U : never;
type NotEmpty<T> = keyof T extends never ? never : T;

/**
 * 미들웨어 정의
 * 
 * @type {MO} metadata 타입의 output type
 * @type {MI} metadata 타입의 input type
 * @type {R} handler 함수의 return type
 * @type {C} 이전 미들웨어로 부터 넘겨받은 context 타입
 */
type Middleware<MO, MI, R, C> = {
  metadataSchema?: StandardSchemaV1<MI, MO>;
  handle: (param: {
    metadata: MO;
    next: {
      call: () => Promise<void & Marker>;
      withCtx: <CO extends AnyRecord>(
        ctxOut: NotEmpty<CO>,
      ) => Promise<CO & Marker>;
    };
    ctx: Readonly<C>;
  }) => Promise<R>;
};

type WithMiddleware<C> = (
  baseCtx: C,
  fn: (ctx: C) => unknown,
) => () => Promise<unknown>;

function withMiddleware<C, MO = unknown, MI = unknown, R = unknown>(
  middlewares: Middleware<MO, MI, R, C>[],
  metadata: MI,
): WithMiddleware<C> {
  const parsedMiddlewares = middlewares.map((middleware) => {
    const schema = middleware.metadataSchema;
    if (!schema) {
      return {
        metadata: undefined,
        handle: middleware.handle,
      };
    }

    const validated = schema["~standard"].validate(metadata);
    if ("then" in validated) {
      return validated.then((result) => {
        if (result.issues) {
          throw new Error("Invalid metadata");
        }

        return {
          metadata: result.value,
          handle: middleware.handle,
        };
      });
    }

    if (validated.issues) {
      throw new Error("Invalid metadata");
    }

    return {
      metadata: validated.value,
      handle: middleware.handle,
    };
  });

  return (baseCtx, fn) => {
    const result = parsedMiddlewares.reduceRight(
      (next, parsed) => async (ctx: C) => {
        const _middleware = await parsed;

        return await _middleware.handle({
          metadata: _middleware.metadata ?? ({} as MO),
          next: {
            call: async (): Promise<void & Marker> => {
              await next(ctx);
            },
            withCtx: async <CO extends AnyRecord>(ctxOut: NotEmpty<CO>) => {
              const r = await next({ ...ctx, ...ctxOut });
              return r as CO & Marker;
            },
          },
          ctx: Object.freeze(ctx),
        });
      },
      async (ctx: C) => fn(Object.freeze(ctx)),
    );

    return () => result(baseCtx);
  };
}

function tryOrUndefined<T>(fn: () => T): T | undefined {
  try {
    return fn();
  } catch {
    return undefined;
  }
}

type CallBase = {
  middlewares: Middleware<unknown, unknown, unknown, unknown>[];
};

export function callBaseBuilder<
  M extends AnyRecord,
  R = Marker,
  C = { [K in never]: never },
>(base: CallBase = { middlewares: [] }) {
  return {
    use: <_MO extends AnyRecord, _MI extends AnyRecord, _R>(
      middleware: Middleware<_MO, _MI, _R, C>,
    ) => {
      const newBase = {
        ...base,
        middlewares: [...base.middlewares, middleware],
      } as CallBase;
      return callBaseBuilder<
        M & _MI,
        OmitMarker<R | _R>,
        Prettify<C & CutMarker<_R>>
      >(newBase);
    },
    actionClient: () => {
      return actionBuilder<R, M, C>({
        middlewares: base.middlewares,
      });
    },
    routeClient: () => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        route: <T extends AppRouteHandlerRoutes>(_?: T) => {
          return routeBuilder<R, T, M, C>({
            middlewares: base.middlewares,
          });
        },
      };
    },
    test: () => {
      return null as unknown as C;
    },
  };
}

type ActionDef<IIn, IOut, C> = {
  inputSchema?: StandardSchemaV1<IIn, IOut>;
  middlewares: Middleware<unknown, unknown, unknown, unknown>[];
  withMiddleware?: WithMiddleware<C>;
};

function actionBuilder<R, M, C, IIn = undefined, IOut = undefined>(
  def: ActionDef<IIn, IOut, C>,
) {
  return {
    input: <_I, _O>(schema: StandardSchemaV1<_I, _O>) => {
      const b = actionBuilder<R, M, C, _I, _O>({
        ...def,
        inputSchema: schema,
      });
      return omit(b, ["input"]);
    },
    metadata: (metadata: M) => {
      const b = actionBuilder<R, M, C, IIn, IOut>({
        ...def,
        withMiddleware: withMiddleware<C>(def.middlewares, metadata),
      });
      return omit(b, ["metadata"]);
    },
    action: <_R>(handler: (input: IOut, ctx: C) => Promise<_R>) => {
      const _withMiddleware =
        def.withMiddleware ??
        tryOrUndefined(() => withMiddleware<C>(def.middlewares, {})) ??
        ((ctx, fn) => () => fn(ctx as C));

      return async (raw: IIn) => {
        const input = await def.inputSchema?.["~standard"].validate(raw);
        if (input && input.issues) {
          return Fail("INVALID_INPUT", "Invalid input data");
        }

        const baseCtx = {} as C;

        const process = _withMiddleware(baseCtx, (ctx) =>
          handler(input?.value as IOut, ctx),
        );

        const result = await process();
        return result as OmitMarker<R | _R>;
      };
    },
  };
}

type RouteDef<SP, P, B, C> = {
  searchParamsSchema?: StandardSchemaV1<unknown, SP>;
  paramsSchema?: StandardSchemaV1<unknown, P>;
  bodySchema?: StandardSchemaV1<unknown, B>;
  middlewares: Middleware<unknown, unknown, unknown, unknown>[];
  withMiddleware?: WithMiddleware<C>;
};

function routeBuilder<
  R,
  T extends AppRouteHandlerRoutes,
  M extends AnyRecord,
  C,
  SP = undefined,
  P = undefined,
  B = undefined,
>(def: RouteDef<SP, P, B, C>) {
  return {
    searchParams: <_SP>(schema: StandardSchemaV1<AnyRecord, _SP>) => {
      const b = routeBuilder<R, T, M, C, _SP, P, B>({
        ...def,
        searchParamsSchema: schema,
      });
      return omit(b, ["searchParams"]);
    },
    params: <
      _P extends Record<keyof Awaited<RouteContext<T>["params"]>, unsafe_any>,
    >(
      schema: StandardSchemaV1<AnyRecord, _P>,
    ) => {
      const b = routeBuilder<R, T, M, C, SP, _P, B>({
        ...def,
        paramsSchema: schema,
      });
      return omit(b, ["params"]);
    },
    body: <_B>(schema: StandardSchemaV1<AnyRecord, _B>) => {
      const b = routeBuilder<R, T, M, C, SP, P, _B>({
        ...def,
        bodySchema: schema,
      });
      return omit(b, ["body"]);
    },
    metadata: (metadata: M) => {
      const b = routeBuilder<R, T, M, C, SP, P, B>({
        ...def,
        withMiddleware: withMiddleware<C>(def.middlewares, metadata),
      });
      return omit(b, ["metadata"]);
    },
    handler<_R>(
      handler: (
        req: NextRequest,
        ctx: Prettify<
          OmitUndefined<{
            searchParams: SP;
            params: P;
            body: B;
            [key: string]: unsafe_any;
          }> &
            C
        >,
      ) => Promise<_R> | _R,
    ) {
      const _withMiddleware =
        def.withMiddleware ??
        tryOrUndefined(() => withMiddleware<C>(def.middlewares, {})) ??
        ((ctx, fn) => () => fn(ctx as C));

      return async (req: NextRequest, routeCtx: RouteContext<T>) => {
        const baseCtx = {} as unsafe_any;

        if (def.searchParamsSchema) {
          const rawSP = Object.fromEntries(req.nextUrl.searchParams.entries());
          const sp = await def.searchParamsSchema["~standard"].validate(rawSP);
          if (sp.issues) {
            return NextResponse.json(
              Fail("INVALID_INPUT", "Invalid search parameters"),
            );
          }
          baseCtx.searchParams = sp.value;
        }

        if (def.paramsSchema) {
          const rawParams = await routeCtx.params;
          const params =
            await def.paramsSchema["~standard"].validate(rawParams);
          if (params.issues) {
            return NextResponse.json(
              Fail("INVALID_ROUTE_PARAMS", "Invalid parameters"),
            );
          }
          baseCtx.params = params.value;
        }

        if (def.bodySchema) {
          const rawBody = await req.json();
          const body = await def.bodySchema["~standard"].validate(rawBody);
          if (body.issues) {
            return NextResponse.json(Fail("INVALID_BODY", "Invalid body"));
          }
          baseCtx.body = body.value;
        }

        const process = _withMiddleware({} as C, (ctx) => {
          return handler(req, {
            ...baseCtx,
            ...ctx,
          });
        });

        const result = await process();
        return NextResponse.json(result as OmitMarker<R | _R>);
      };
    },
  };
}
