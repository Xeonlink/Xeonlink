import z from "zod";
import { callBaseBuilder } from "./index";
import { Ok } from "./example.util";

/**
 * 인증 체크 함수 (mock)
 * @returns Ok(user)
 */
const requireAuthSafe = async () => {
  return Ok({
    user: {
      id: "123",
      name: "John Doe",
    },
  });
};

/**
 * 역할 체크 함수 (mock)
 * @param roles 필요한 역할 목록
 * @returns Ok(user)
 */
const requireRoleSafe = async (...roles: string[]) => {
  return Ok({
      user: {
        id: "123",
        name: "John Doe",
      },
    });
};

/**
 * 모든 요청이 거쳐가는 미들웨어를 통과 순서에 따라서 정의
 */
const callBase = callBaseBuilder()
  .use({
    metadataSchema: z.object({
      requireLogin: z.boolean().default(true),
    }),
    handle: async ({ ctx, metadata, next }) => {
      if (metadata.requireLogin) {
        const result = await requireAuthSafe();
        if (!result.success) {
          return result;
        }

        return await next.withCtx({
          test10: false,
        });
      }
      return await next.withCtx({
        test2: false,
      });
    },
  })
  .use({
    metadataSchema: z.object({
      requireRole: z
        .array(z.enum(["admin", "user", "guest", "*"]))
        .default(["admin", "user"]),
    }),
    handle: async ({ ctx, metadata, next }) => {
      if (metadata.requireRole.length > 0) {
        const result = await requireRoleSafe(...metadata.requireRole);
        if (!result.success) {
          return result;
        }
      }
      return await next.call();
    },
  });

export const actionClient = callBase.actionClient();
export const routeClient = callBase.routeClient();


/**
 * 서버액션 정의 예시
 */
export const serverAction = actionClient.input(z.object({
    id: z.string(),
})).action(async (input, ctx) => {
  return Ok(input.id);
});

/**
 * route.ts 파일별 route 정의 예시
 */
const route = routeClient.route("/api/v1/teams/[id]").params(z.object({
    id: z.string(),
}))

/**
 * route.ts 파일별 route handler 정의 예시
 */
export const GET = route
  .searchParams(
    z.object({
      test: z.string(),
      test2: z.number(),
    })
  )
  .handler(async (req, ctx) => {
    console.log(req)
    return Ok(ctx.searchParams.test);
  });