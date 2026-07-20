import gobundalFaviconImage from "@/assets/gobundal_favicon.png";
import gobundalModalDemoGif from "@/assets/gobundal_modal_demo.gif";
import {
  ExternalLink,
  LinkIcon,
} from "@/features/resume/components/external-link";
import { Button } from "@/shared/components/ui/button";
import {
  SiChartdotjs,
  SiCheerio,
  SiDocker,
  SiNextdotjs,
  SiTanstack,
} from "@icons-pack/react-simple-icons";
import { Link } from "@tanstack/react-router";
import { ArrowDownIcon, ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";

export function GobundalSection() {
  return (
    <section className="flex flex-col space-y-16 border-dotted py-16 transition-all not-last:border-b-2 md:px-8">
      <div className="flex items-center max-md:flex-col md:justify-center">
        <img
          className="mb-2 h-32"
          src={gobundalFaviconImage}
          alt="곱은달 농장 로고"
        />
        <div className="mx-8">
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
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring" }}
            >
              <Button
                className="text-muted-foreground rounded-full"
                variant="outline"
                asChild
              >
                <ExternalLink href="https://gobundal.ohjimin.com/">
                  <LinkIcon className="size-4" />
                </ExternalLink>
              </Button>
            </motion.li>
          </ul>
        </div>
      </div>

      <div className="text-muted-foreground mx-auto grid grid-cols-1 gap-4 transition-all md:gap-8 lg:grid-cols-2">
        <div className="bg-muted space-y-4 rounded-2xl p-6 sm:p-8">
          <h3 className="text-2xl font-bold">Draggable Window 구현</h3>
          <p>
            여러 정보를 동시에 보면서, <span className="text-accent">비교</span>{" "}
            · <span className="text-accent">검증</span>할 수 있어야한다는
            요구사항을 만족시켜야 했음. <br />
            전통적인 page 및 tab 구조로는 만족시키기 어렵다고 판단
          </p>
          <div className="my-2 flex w-180 max-w-full flex-col items-center space-y-2 overflow-hidden text-center">
            <div className="h-56 overflow-hidden rounded-xl">
              <img
                className="max-w-full"
                src={gobundalModalDemoGif}
                alt="드래그 가능한 모달을 여러 개 띄우는 데모"
                loading="lazy"
              />
            </div>
            <span className="text-foreground/70">구현 결과</span>
          </div>
          <ul className="ml-4 space-y-2">
            <li className="list-disc">
              페이지 <span className="text-accent">독립성</span>과 z-index
              관리를 위해,{" "}
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <Link to="/posts/jsx-as-state">
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

        <div className="bg-muted space-y-4 rounded-2xl p-6 sm:p-8">
          <h3 className="text-2xl font-bold">Middleware 시스템 · DAL 도입</h3>
          <p>
            <span className="text-accent">CVE</span>{" "}
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring" }}
            >
              <Button className="rounded-full" variant="outline" asChild>
                <ExternalLink href="https://nextjs.org/blog/security-update-2025-12-11">
                  <span className="">React2Shell</span>
                  <LinkIcon className="size-4" />
                </ExternalLink>
              </Button>
            </motion.div>{" "}
            이후에 시작한 프로젝트라 input · role 검증등 Server Action이
            비대해진 상태에서 <br />
            Draggable Modal (client component) 을 위해 Route Handler까지
            추가되자 <span className="text-accent">중복된 로직</span> 이 급격히
            증가
          </p>
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="flex items-center gap-2 max-md:flex-col">
              <div className="flex items-center gap-2 md:flex-col">
                <div className="bg-muted rounded-md border p-2 text-center">
                  form action
                </div>
                <div className="bg-muted rounded-md border p-2 text-center">
                  fetch
                </div>
              </div>
              <ArrowDownIcon className="h-4 w-4 md:-rotate-90" />
              <div className="flex items-center gap-2 md:flex-col">
                <div className="bg-muted rounded-md border p-2 text-center">
                  Server Action
                </div>
                <div className="bg-muted rounded-md border p-2 text-center">
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
          <ul className="ml-4 space-y-2">
            <li className="list-disc">
              <span className="text-blue-600 dark:text-blue-300">
                Cross cutting concerns
              </span>{" "}
              문제를 해결하기 위해,{" "}
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <Link to="/posts/nextjs-netdef">
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

        <div className="bg-muted space-y-4 rounded-2xl p-6 sm:p-8">
          <h3 className="text-2xl font-bold">기타 연동 및 기여</h3>
          <ul className="ml-4 space-y-2">
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

        <div className="bg-muted space-y-4 rounded-2xl p-6 sm:p-8">
          <h3 className="text-2xl font-bold">기술스택</h3>
          <ul className="space-y-2">
            <li className="flex gap-2 max-sm:flex-col sm:items-center">
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <ExternalLink href="https://nextjs.org/">
                    <SiNextdotjs />
                    Next.js
                  </ExternalLink>
                </Button>
              </motion.span>{" "}
              <span>
                SSR과 API Route를 하나의 코드베이스에서 관리하기 위해 사용
              </span>
            </li>
            <li className="flex gap-2 max-sm:flex-col sm:items-center">
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <ExternalLink href="https://cheerio.js.org/">
                    <SiCheerio />
                    Cheerio
                  </ExternalLink>
                </Button>
              </motion.span>{" "}
              <span>공식 API가 없는 어드민 페이지를 파싱하기 위해 사용</span>
            </li>
            <li className="flex gap-2 max-sm:flex-col sm:items-center">
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <ExternalLink href="https://www.chartjs.org/">
                    <SiChartdotjs />
                    Chart.js
                  </ExternalLink>
                </Button>
              </motion.span>{" "}
              <span>판매 · 배송 통계를 시각화하기 위해 사용</span>
            </li>
            <li className="flex gap-2 max-sm:flex-col sm:items-center">
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <ExternalLink href="https://tanstack.com/table/latest/docs/framework/react/overview">
                    <SiTanstack />
                    TanStack Table
                  </ExternalLink>
                </Button>
              </motion.span>{" "}
              <span>
                사용자 요구사항에 맞는 interactable한 표를 구현하기 위해 사용
              </span>
            </li>
            <li className="flex gap-2 max-sm:flex-col sm:items-center">
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <ExternalLink href="https://www.docker.com/">
                    <SiDocker />
                    Docker
                  </ExternalLink>
                </Button>
              </motion.span>{" "}
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
