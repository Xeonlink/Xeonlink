import gobundalFaviconImage from "@/assets/gobundal_favicon.png";
import gobundalModalDemoGif from "@/assets/gobundal_modal_demo.gif";
import { Article, ArticleImage } from "@/features/resume/components/article";
import { Badge } from "@/features/resume/components/badge";
import {
  ExternalLink,
  LinkIcon,
} from "@/features/resume/components/external-link";
import { code } from "@/shared/components/code";
import { Button } from "@/shared/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";

export function GobundalSection() {
  return (
    <section className="space-y-8 border-dotted p-8 py-16 not-last:border-b-2">
      <Article>
        <ArticleImage
          className="mb-2"
          src={gobundalFaviconImage}
          alt="곱은달 농장 로고"
        />
        <div>
          <span>2026.01 - 2026.03</span>
          <h2 className="text-4xl font-bold">
            곱은달 농장 <span className="text-accent">배송</span>
            {" · "}
            <span className="text-accent">고객</span> 관리
          </h2>
          <p className="mt-2 break-keep">
            배송 정보 자동 연동부터 고객 문자발송, Excel 내보내기까지 농장
            운영에 필요한 반복 작업 자동화
          </p>
          <ul className="mt-2 flex">
            <motion.li
              whileHover={{ scale: 1.3 }}
              transition={{ type: "spring" }}
            >
              <Button className="rounded-full" variant="outline" asChild>
                <ExternalLink href="https://gobundal.ohjimin.com/">
                  <LinkIcon className="size-full scale-125" />
                </ExternalLink>
              </Button>
            </motion.li>
          </ul>
        </div>
      </Article>
      <div className="space-y-16">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Draggable Window 구현</h3>
          <p>
            여러 정보를 동시에 보면서, <span className="text-accent">비교</span>{" "}
            · <span className="text-accent">검증</span>할 수 있어야한다는
            요구사항을 만족시켜야 했음. <br />
            전통적인 page 및 tab 구조로는 만족시키기 어렵다고 판단
          </p>
          <div className="my-2 flex h-64 w-180 max-w-full flex-col items-center space-y-2 overflow-hidden rounded-xl text-center">
            <img
              className="max-w-full"
              src={gobundalModalDemoGif}
              alt="드래그 가능한 모달을 여러 개 띄우는 데모"
              loading="lazy"
            />
            <span className="text-foreground/70">
              페이지와 독립된 Draggable Modal 구현
            </span>
          </div>
          <ul className="ml-8 space-y-2">
            <li className="list-disc">
              페이지 <span className="text-accent">독립성</span>과 z-index
              관리를 위해,{" "}
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <Link className="border-underline" to="/posts/jsx-as-state">
                    <span className="">JAX as State</span>
                    <LinkIcon className="size-4" />
                  </Link>
                </Button>
              </motion.div>{" "}
              패턴을 활용
            </li>
            <li className="list-disc">
              react-draggable 라이브러리를 사용하여 drag 기능 구현
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Middleware 시스템 · DAL 도입</h3>
          <p>
            <span className="text-accent">CVE</span>{" "}
            <motion.span
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring" }}
            >
              <Button className="rounded-full" variant="outline" asChild>
                <ExternalLink
                  className="border-underline"
                  href="https://nextjs.org/blog/security-update-2025-12-11"
                >
                  <span className="">React2Shell</span>
                  <LinkIcon className="size-4" />
                </ExternalLink>
              </Button>
            </motion.span>{" "}
            이후에 시작한 프로젝트라 input · role 검증등 Server Action이
            비대해진 상태에서 <br /> Draggable Modal (client component) 대응을
            위해 Route Handler까지 추가되자{" "}
            <span className="text-accent">중복된 로직</span> 이 급격히 증가
          </p>
          <Tabs className="max-w-200" defaultValue="before">
            <TabsList className="w-full">
              <TabsTrigger value="before">Before</TabsTrigger>
              <TabsTrigger value="after">After</TabsTrigger>
            </TabsList>
            <TabsContent value="before">
              <code.tsx className="max-h-96 overflow-y-auto">
                {BEFORE_MIDDLEWARE_SYSTEM}
              </code.tsx>
            </TabsContent>
            <TabsContent value="after">
              <code.tsx className="max-h-96 overflow-y-auto">
                {AFTER_MIDDLEWARE_SYSTEM}
              </code.tsx>
            </TabsContent>
          </Tabs>
          <ul className="ml-8 space-y-2">
            <li className="list-disc">
              <span className="text-accent">Cross cutting concerns</span> 문제를
              해결하기 위해,{" "}
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <Link className="border-underline" to="/posts/nextjs-netdef">
                    <span className="">Next netdef</span>
                    <LinkIcon className="size-4" />
                  </Link>
                </Button>
              </motion.div>{" "}
              유틸리티를 설계 · 구현 · 도입
            </li>
            <li className="list-disc">
              <span className="text-accent">DAL</span> 을 추가하여 데이터 조회
              로직 분리
            </li>
            <li className="list-disc">
              Server Action 과 Route Handler는 Controller 로 만 사용{" "}
              <ArrowRightIcon className="inline size-4" /> Business Logic은
              service 객체에 구현
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold">기타 연동 및 기여</h3>
          <ul className="ml-8 space-y-2">
            <li className="list-disc">
              Sever side에서 농장{" "}
              <ExternalLink
                className="border-underline"
                href="https://www.ejejumoon.com/"
              >
                <span className="text-accent">홈페이지</span>
              </ExternalLink>{" "}
              Admin 페이지 <span className="text-accent">크롤링</span>{" "}
              <ArrowRightIcon className="inline size-4" /> Cheerio 라이브러리를
              사용하여 <span className="text-accent">데이터 추출</span>
            </li>
            <li className="list-disc">
              <ExternalLink
                className="border-underline"
                href="https://www.okmunja.co.kr/main/main.php"
              >
                <span className="text-accent">OK 문자</span>
              </ExternalLink>
              의 <span className="text-accent">API</span>를 연동{" "}
              <ArrowRightIcon className="inline size-4" /> API 문서에 따라,
              form-url-encoded로 변형 후 전송
            </li>
            <li className="list-disc">
              다목적 Excel Exporter <ArrowRightIcon className="inline size-4" />{" "}
              <span className="text-accent">JSON</span> 변환 규칙 템플릿을
              정의하면 배송사별 포맷으로 확장 가능
            </li>
            <li className="list-disc">
              권한 관리 시스템 <ArrowRightIcon className="inline size-4" />{" "}
              <span className="text-accent">RBAC</span> 기반으로 미들웨어에서
              역할별 접근 제어
            </li>
            <li className="list-disc">
              통계 대시보드 <ArrowRightIcon className="inline size-4" />{" "}
              <span className="text-accent">Recharts</span>와{" "}
              <span className="text-accent">TanStack Table</span>로
              interactable한 표와 차트 제공
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold">기술스택</h3>
          <ul className="ml-8 space-y-2">
            <li className="flex flex-wrap items-center gap-2">
              <Badge color="20232a" logo={{ slug: "nextdotjs" }}>
                next.js
              </Badge>
              <span>
                SSR과 API Route를 하나의 코드베이스에서 관리하기 위해 사용
              </span>
            </li>
            <li className="flex flex-wrap items-center gap-2">
              <Badge color="E78D1E">cheerio</Badge>
              <span>공식 API가 없는 어드민 페이지를 파싱하기 위해 사용</span>
            </li>
            <li className="flex flex-wrap items-center gap-2">
              <Badge color="54B0B7">recharts</Badge>
              <span>판매 · 배송 통계를 시각화하기 위해 사용</span>
            </li>
            <li className="flex flex-wrap items-center gap-2">
              <Badge color="0081F2">tanstack table</Badge>
              <span>
                사용자 요구사항에 맞는 interactable한 표를 구현하기 위해 사용
              </span>
            </li>
            <li className="flex flex-wrap items-center gap-2">
              <Badge color="2496ED" logo={{ slug: "docker", color: "white" }}>
                docker
              </Badge>
              <span>
                Vercel 이 비싸서, On-Premise 환경에 배포하기 위해 사용
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

const BEFORE_MIDDLEWARE_SYSTEM = `import { requireRoleSafe } from "@/lib/auth-guard";
import { db } from "@/lib/db";
import { Fail, Ok, safeTryAsync } from "@/lib/result";
import { orders } from "@/models";
import { desc, eq } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import z from "zod";

const spSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/customers/[id]/orders">,
) {
  const permitted = await requireRoleSafe("admin", "user");
  if (!permitted.success) {
    return NextResponse.json(
      Fail("UNAUTHORIZED", "User has no permission to get customers"),
    );
  }

  const rawSP = Object.fromEntries(req.nextUrl.searchParams.entries());
  const sp = spSchema.safeParse(rawSP);
  if (!sp.success) {
    return NextResponse.json(
      Fail("INVALID_INPUT", "Invalid search parameters"),
    );
  }

  const { id } = await ctx.params;

  const result = await safeTryAsync(() =>
    db.query.orders.findMany({
      where: eq(orders.customerId, id),
      with: {
        orderItems: true,
      },
      columns: {
        id: true,
        orderedAt: true,
        receiverAddress: true,
        receiverAddressDetail: true,
      },
      limit: sp.data.limit,
      orderBy: desc(orders.orderedAt),
    }),
  );
  if (!result.success) {
    return NextResponse.json(
      Fail("INTERNAL_SERVER_ERROR", "Internal server error"),
    );
  }

  return NextResponse.json(Ok(result.data));
}`;

const AFTER_MIDDLEWARE_SYSTEM = `import { orderService } from "@/features/orders/service";
import { routeClient } from "@/shared/lib/net-call-client";
import { Ok, safeTryAsync } from "@/shared/lib/result";
import z from "zod";

const base = routeClient.route("/api/customers/[id]/orders").params(
  z.object({
    id: z.string(),
  }),
);

export const GET = base
  .searchParams(
    z.object({
      limit: z.coerce.number().int().min(1).max(100).default(10),
    }),
  )
  .handler(async (_, ctx) => {
    const result = await safeTryAsync(() =>
      orderService.getOrdersByCustomerId(ctx.params.id, ctx.searchParams),
    );
    if (!result.success) {
      return result;
    }

    return Ok(result.data);
  });`;
