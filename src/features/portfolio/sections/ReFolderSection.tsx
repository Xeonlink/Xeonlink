import createApiSelectorImage from "@/assets/create_api_selector.png";
import createApiSelectorImage2 from "@/assets/create_api_selector2.png";
import refolderImage from "@/assets/refolder_icon.png";
import { ExternalLink } from "@/features/resume/components/external-link";
import { ImageSwap } from "@/features/resume/components/image-swap";
import { Button } from "@/shared/components/ui/button";
import {
  SiDrizzle,
  SiElectron,
  SiGithub,
  SiReact,
  SiReactquery,
  SiSqlite,
} from "@icons-pack/react-simple-icons";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";

export function ReFolderSection() {
  return (
    <section className="flex flex-col space-y-16 border-dotted py-16 not-last:border-b-2 md:px-8">
      <div className="flex items-center max-md:flex-col md:justify-center">
        <img
          className="mb-2 h-32"
          src={refolderImage}
          alt="파란색 배경에 흰색의 두꺼운 선으로 폴더 아이콘 우상단에 기어 아이콘이 있는 형상"
        />
        <div className="mx-8">
          <span>2024.10 - 2025.01</span>
          <h2 className="text-4xl font-bold">
            <span className="text-accent">Re</span>Folder
          </h2>
          <p className="mt-2 break-keep">
            사용자가 설정한 규칙에 따라 정리되지 않은 폴더의 파일을 자동으로
            분류 · 정리해주는 데스크탑 앱. <br />
            Node.js watch 기능으로 폴더가 더러워지는 것을 미연에 방지
          </p>
          <ul className="mt-2 flex gap-2">
            <motion.li
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring" }}
            >
              <Button
                className="text-muted-foreground rounded-full"
                variant="outline"
                asChild
              >
                <ExternalLink href="https://github.com/Xeonlink/re-folder">
                  <SiGithub className="size-4" />
                  <span>GitHub</span>
                </ExternalLink>
              </Button>
            </motion.li>
          </ul>
        </div>
      </div>

      <div className="text-muted-foreground mx-auto grid grid-cols-1 gap-4 transition-all md:gap-8 lg:grid-cols-2">
        <div className="bg-muted space-y-4 rounded-2xl p-8">
          <h3 className="text-2xl font-bold">Typesafe IPC 설계</h3>
          <p>
            Electron의 IPC 통신은 channel name(string)을{" "}
            <span className="text-accent">기억하고 사용</span>해야 함. <br />
            channel 이름에 오타가 발생하여 없는 채널로 요청을 보내는{" "}
            <span className="text-accent">실수</span>
            가 종종 발생하고, <br />
            main process의 에러가 renderer process로 전달되지 않는 문제도 있었음
          </p>
          <ImageSwap className="my-2 max-w-150">
            <img
              src={createApiSelectorImage}
              alt="ipc정의타입을 받아서, renderer에 노출할 ipc를 true/false로 선택"
              loading="lazy"
            />
            <img
              src={createApiSelectorImage2}
              alt="어떤 ipc가 있는지 타입추론되는 이미지"
              loading="lazy"
            />
          </ImageSwap>
          <ul className="ml-4 space-y-2">
            <li className="list-disc">
              Electron의 invoke, handle 함수를 감싸서 channel name이{" "}
              <span className="text-accent">자동으로 생성</span>되도록 설계
            </li>
            <li className="list-disc">
              <span className="text-accent">Error를 직렬화 / 역직렬화</span>
              하여, main process 에러를 renderer까지 전파
            </li>
            <li className="list-disc">
              preload script에{" "}
              <span className="text-accent">ipc 정의만 전달</span>하여, invoke
              함수가 런타임에 생성되도록 함
            </li>
          </ul>
        </div>

        <div className="bg-muted space-y-4 rounded-2xl p-8 max-lg:hidden">
          <h3 className="text-2xl font-bold">Trouble Shooting</h3>
        </div>

        <div className="bg-muted space-y-4 rounded-2xl p-8">
          <h3 className="text-2xl font-bold">기타 구현 및 기여</h3>
          <ul className="ml-4 space-y-2">
            <li className="list-disc">
              폴더 감시 <ArrowRightIcon className="inline size-4" /> Node.js{" "}
              <span className="text-accent">watch</span> 기반으로 파일 생성을
              감지하고 규칙에 따라 자동 분류
            </li>
            <li className="list-disc">
              규칙 관리 UI <ArrowRightIcon className="inline size-4" /> React와{" "}
              <span className="text-accent">React Query</span>로 규칙 CRUD 구현
            </li>
            <li className="list-disc">
              로컬 데이터 저장 <ArrowRightIcon className="inline size-4" />{" "}
              <span className="text-accent">SQLite</span>와{" "}
              <span className="text-accent">Drizzle ORM</span>으로 규칙과 설정을
              관리
            </li>
          </ul>
        </div>

        <div className="bg-muted space-y-4 rounded-2xl p-8">
          <h3 className="text-2xl font-bold">기술스택</h3>
          <ul className="space-y-2">
            <li className="flex gap-2 max-sm:flex-col sm:items-center">
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <ExternalLink href="https://react.dev/">
                    <SiReact />
                    React
                  </ExternalLink>
                </Button>
              </motion.span>
              <span>데스크탑 앱의 UI를 구현하기 위해 사용</span>
            </li>
            <li className="flex gap-2 max-sm:flex-col sm:items-center">
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <ExternalLink href="https://www.electronjs.org/">
                    <SiElectron />
                    Electron
                  </ExternalLink>
                </Button>
              </motion.span>
              <span>
                웹 기술로 크로스 플랫폼 데스크탑 앱을 만들기 위해 사용
              </span>
            </li>
            <li className="flex gap-2 max-sm:flex-col sm:items-center">
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <ExternalLink href="https://tanstack.com/query/latest">
                    <SiReactquery />
                    React Query
                  </ExternalLink>
                </Button>
              </motion.span>
              <span>IPC 호출 결과의 캐싱과 상태 관리를 위해 사용</span>
            </li>
            <li className="flex gap-2 max-sm:flex-col sm:items-center">
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <ExternalLink href="https://www.sqlite.org/">
                    <SiSqlite />
                    SQLite
                  </ExternalLink>
                </Button>
              </motion.span>
              <span>서버 없이 로컬에 규칙과 설정을 저장하기 위해 사용</span>
            </li>
            <li className="flex gap-2 max-sm:flex-col sm:items-center">
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <ExternalLink href="https://orm.drizzle.team/">
                    <SiDrizzle />
                    Drizzle
                  </ExternalLink>
                </Button>
              </motion.span>
              <span>typesafe하게 SQLite 스키마와 쿼리를 다루기 위해 사용</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
