import captchaBreakImage from "@/assets/captcha-break.gif";
import captchaSolveCodeImage from "@/assets/captcha_solve_code.png";
import createApiSelectorImage from "@/assets/create_api_selector.png";
import createApiSelectorImage2 from "@/assets/create_api_selector2.png";
import koreaAuthFillerImage from "@/assets/korea_auth_filler_image.png";
import prettierPluginOrganizeAttributesImage from "@/assets/prettier_plugin_organize_attributes.png";
import refolderImage from "@/assets/refolder_icon.png";
import syncronClockSkewImage from "@/assets/syncron_clockskew.jpeg";
import syncronClockSkewCalculationImage from "@/assets/syncron_clockskew_calc.png";
import syncronClockSkewCalculatorImage from "@/assets/syncron_clockskew_calculator.png";
import syncronFaviconImage from "@/assets/syncron_favicon.svg";
import { Article, ArticleImage } from "@/features/resume/components/article";
import { Badge } from "@/features/resume/components/badge";
import { ExternalLink, LinkIcon } from "@/features/resume/components/external-link";
import { ImageSwap } from "@/features/resume/components/image-swap";
import { Section } from "@/features/resume/components/section";
import { Button } from "@/shared/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/components/ui/collapsible";
import { ArrowRightIcon } from "lucide-react";

export function ProjectsSection() {
  return (
    <Section id="projects" className="space-y-10" title="PROJECTS">
      {/* ReFolder */}
      <Article className="w-full">
        <ArticleImage
          src={refolderImage}
          alt="파란색 배경에 흰색의 두꺼운 선으로 폴더 아이콘 우상단에 기어 아이콘이 있는 형상"
        />
        <div className="flex flex-col">
          <div>
            <span>2024.10.18 - 2025.01.22</span>
            <h3 className="text-3xl">
              <ExternalLink href="https://github.com/Xeonlink/re-folder" className="border-underline">
                ReFolder
              </ExternalLink>
              &nbsp;
              <LinkIcon />
            </h3>
            <div className="flex flex-wrap mt-1">
              <Badge color="20232a" logo={{ slug: "react", color: "61DAFB" }}>
                react
              </Badge>
              <Badge color="191970" logo={{ slug: "electron", color: "white" }}>
                electron
              </Badge>
              <Badge color="FF4154" logo={{ slug: "reactquery", color: "white" }}>
                react query
              </Badge>
              <Badge color="07405e" logo={{ slug: "sqlite", color: "white" }}>
                sqlite
              </Badge>
              <ExternalLink href="https://orm.drizzle.team/" className="border-underline">
                <Badge color="C5F74F" logo={{ slug: "drizzle", color: "black" }}>
                  Drizzle
                </Badge>
              </ExternalLink>
            </div>
            <p className="mt-1 max-w-150 break-keep">
              ReFolder는 사용자가 설정한 규칙에 따라서 정리되지 않은 폴더의 파일을 정리해주는 프로그램입니다. nodejs
              watch 기능을 사용하여, 폴더가 더러워지는 것을 미연에 방지합니다. 자세한 기능은{" "}
              <ExternalLink href="https://github.com/Xeonlink/re-folder">
                <span className="text-accent font-bold">레포지토리</span>
              </ExternalLink>
              를 참고바랍니다.
            </p>
          </div>
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="justify-start mt-2 text-lg" size="lg">
                도전 과제 및 해결 방법
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-8 md:mt-10 space-y-8 md:space-y-10">
              <div>
                <h4 className="text-xl font-bold">도전 과제</h4>
                <ul className="ml-8">
                  <li className="list-disc">
                    electron의 ipc통신은 channel name(string)을 <span className="text-accent">기억하고 사용</span>
                    해야함.
                  </li>
                  <li className="list-disc">
                    channel 이름에 오타가 발생하여,{" "}
                    <span className="text-accent">없는 채널로 요청을 보내는 Human Error</span>가 종종 발생.
                  </li>
                  <li className="list-disc">
                    main process에서의 <span className="text-accent">에러</span>가 renderer process로 전달되지 않음.
                    (예기치 못한 시점에 main process가 죽음)
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold">해결 방법</h4>
                <ImageSwap className="my-2 max-w-150">
                  <img
                    src={createApiSelectorImage}
                    alt="ipc정의타입을 받아서, renderer에 노출할 ipc를 true/false로 선택"
                  />
                  <img src={createApiSelectorImage2} alt="어떤 ipc가 있는지 타입추론되는 이미지" />
                </ImageSwap>
                <ul className="ml-8">
                  <li className="list-disc">
                    electron의 invoke, handle 함수를 감싸서 channel name이{" "}
                    <span className="text-accent">자동으로 생성</span>되도록 설계.
                  </li>
                  <li className="list-disc">
                    <span className="text-accent">Error를 직렬화 / 역직렬화</span>하여, main process 에러를 renderer까지
                    전파
                  </li>
                  <li className="list-disc">
                    preload script에 <span className="text-accent">ipc정의만 전달</span>하여, invoke 함수가 런타임에
                    생성되도록 함.
                  </li>
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </Article>
      {/* 한국인증채우기 */}
      <Article>
        <ArticleImage src={koreaAuthFillerImage} alt="원형 태극무늬 형상" />
        <div className="flex flex-col">
          <div>
            <span>2025.01.13 - 2025.03.06</span>
            <h3 className="text-3xl">
              <ExternalLink
                href="https://chromewebstore.google.com/detail/%ED%95%9C%EA%B5%AD%EC%9D%B8%EC%A6%9D%EC%B1%84%EC%9A%B0%EA%B8%B0/eonnjagalbjlklfjnfpgdeaajkghpnjc?authuser=0&hl=ko"
                className="border-underline"
              >
                한국인증채우기
              </ExternalLink>
              &nbsp;
              <LinkIcon />
            </h3>
            <div className="flex flex-wrap mt-1">
              <Badge color="20232a" logo={{ slug: "react", color: "61DAFB" }}>
                react
              </Badge>
              <Badge color="00DC82" logo={{ slug: "wxt", color: "white" }}>
                wxt
              </Badge>
              <ExternalLink href="https://wxt.dev/">
                <Badge color="005CED" logo={{ slug: "onnx", color: "white" }}>
                  onnx
                </Badge>
              </ExternalLink>
              <Badge color="2EAD33">playwright</Badge>
              <ExternalLink href="https://github.com/microsoft/playwright">
                <Badge color="FF6B35" logo={{ slug: "googlechrome", color: "white" }}>
                  browser extension api
                </Badge>
              </ExternalLink>
            </div>
            <p className="mt-1 max-w-150 break-keep">
              한국에서 사용되는 모바일 본인인증, 휴대폰 인증, 민간인증서 인증 등을 사용할 때 필요한 정보를 자동으로
              채워주는 브라우저 확장프로그램 입니다. 간단한 캡챠이미지는 <span className="text-accent">비전 AI</span>를
              통해 자동으로 채워넣습니다. 자세한 기능은{" "}
              <ExternalLink href="https://github.com/Xeonlink/korea-auth-filler" className="border-underline">
                <span className="text-accent font-bold">레포지토리</span>
              </ExternalLink>
              를 참고바랍니다.
            </p>
          </div>
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="justify-start mt-2 text-lg" size="lg">
                도전 과제 및 해결 방법
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-8 md:mt-10 space-y-8 md:space-y-10">
              <div>
                <h4 className="text-xl font-bold">도전 과제</h4>
                <ul className="ml-8">
                  <li className="list-disc">기존에는 사용자가 의도적으로 캡챠를 풀어야했음.</li>
                  <li className="list-disc">
                    초기에 tesseract.js를 사용해서 captcha breaking 시도 <ArrowRightIcon className="inline size-4" />{" "}
                    <span className="text-accent">실패 (정확도 30% 미만)</span>
                  </li>
                  <li className="list-disc">
                    모델을 만들더라도 인증밴더가 캡챠를 바꾸면 다시 제작해야하는 문제가 있음.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold">해결 방법</h4>
                <ImageSwap className="my-2 ml-4 max-w-150">
                  <img
                    src={captchaBreakImage}
                    alt="자동으로 캡챠이미지를 리로드하고, 캡챠풀기를 반복하는 움직이는 이미지"
                    loading="lazy"
                  />
                  <img
                    src={captchaSolveCodeImage}
                    alt="캡챠를 풀기 위한 captchaSolve 함수를 호출하고, 그 결과를 화면에 표시하는 코드"
                    loading="lazy"
                  />
                </ImageSwap>
                <ul className="ml-8">
                  <li className="list-disc">
                    캡챠 풀기의 정확도를 높이기 위해 인식모델을{" "}
                    <ExternalLink href="https://github.com/Xeonlink/kaptch" className="border-underline">
                      <span className="text-accent font-bold">직접개발</span>
                    </ExternalLink>
                  </li>
                  <li className="list-disc">
                    <span className="text-accent">CRNN</span> 구조로 설계,{" "}
                    <span className="text-accent">ONNXRUNTIME</span>
                    으로 실행
                  </li>
                  <li className="list-disc">
                    인증벤더마다 전용 모델을 개발하여, <span className="text-accent">정확도 99.9% 이상</span> 달성
                  </li>
                  <li className="list-disc">특정 인증벤더의 캡챠가 바뀌더라도 모델 전체를 재학습시키지 않아도 됨</li>
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </Article>
      {/* syncron */}
      <Article>
        <ArticleImage src={syncronFaviconImage} alt="prettier-plugin-organize-attributes 플러그인 소개 이미지" />
        <div className="flex flex-col">
          <div>
            <span>2026.04.23 - 2026.05.13</span>
            <h3 className="text-3xl">
              <ExternalLink href="https://syncron.ohjimin.com/" className="border-underline">
                Syncron - Web Metronome
              </ExternalLink>
              &nbsp;
              <LinkIcon />
            </h3>
            <div className="flex flex-wrap mt-1">
              <ExternalLink href="https://elysiajs.com/">
                <Badge color="5E5E5E">ElysiaJS - websocket</Badge>
              </ExternalLink>
              <Badge color="B87915" logo={{ slug: "daisyui", color: "white" }}>
                DaisyUI
              </Badge>
              <Badge color="FFAA3C">zustand</Badge>
              <Badge color="2496ED" logo={{ slug: "docker", color: "white" }}>
                Docker
              </Badge>
            </div>
            <p className="mt-1 max-w-150 break-keep">
              Sync Metronome은 브라우저에서 동작하는 <span className="text-accent font-bold">실시간 동기화</span>{" "}
              메트로놈입니다. 호스트의 BPM·박자·재생 상태를 공유하여 연습할 수 있습니다. 자세한 기능은{" "}
              <ExternalLink href="https://github.com/phanzi/WebMetrome" className="border-underline">
                <span className="text-accent font-bold">레포지토리</span>
              </ExternalLink>
              를 참고바랍니다.
            </p>
          </div>
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="justify-start mt-2 text-lg" size="lg">
                도전 과제 및 해결 방법
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-8 md:mt-10 space-y-8 md:space-y-10">
              <div>
                <h4 className="text-xl font-bold">도전 과제</h4>
                <img
                  src={syncronClockSkewImage}
                  alt="자동으로 캡챠이미지를 리로드하고, 캡챠풀기를 반복하는 움직이는 이미지"
                  loading="lazy"
                  className="my-2 ml-4 max-w-150 rounded-xl h-52"
                />
                <ul className="ml-8">
                  <li className="list-disc">
                    통신 지연이 수 ms 임에도, <span className="text-accent">수십 ms</span> 동기화 오차가 발생함.
                  </li>
                  <li className="list-disc">기기마다 타임라인의 오차가 있거나, 브라우저 API의 한계일 것으로 추정함.</li>
                  <li className="list-disc">
                    WebSocket 서버대비 얼마나 시간이 빠르게 흐르고 있는지 확인하고 보정해야함.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold">해결 방법</h4>
                <ImageSwap className="my-2 ml-4 max-w-150">
                  <img
                    src={syncronClockSkewCalculatorImage}
                    alt="자동으로 캡챠이미지를 리로드하고, 캡챠풀기를 반복하는 움직이는 이미지"
                    loading="lazy"
                  />
                  <img
                    src={syncronClockSkewCalculationImage}
                    alt="캡챠를 풀기 위한 captchaSolve 함수를 호출하고, 그 결과를 화면에 표시하는 코드"
                    loading="lazy"
                  />
                </ImageSwap>
                <ul className="ml-8">
                  <li className="list-disc">
                    <span className="text-accent">네트워크 지연을 고려</span>하여 clock skew를 계산하기 위한 방식을
                    고안하고, 구현
                  </li>
                  <li className="list-disc">
                    네트워크 및 clock skew 지연을 수십 ms <ArrowRightIcon className="inline size-4" />{" "}
                    <span className="text-accent">3 ms 이하</span> 로 줄임.
                  </li>
                  <li className="list-disc">
                    <span className="text-accent">NTP 없이</span> 도, clock skew를 계산하고 보정할 수 있도록 설계.
                  </li>
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </Article>
      {/* prettier-plugin-organize-attributes */}
      <Article>
        <ArticleImage
          src={prettierPluginOrganizeAttributesImage}
          alt="prettier-plugin-organize-attributes 플러그인 소개 이미지"
        />
        <div className="flex flex-col space-y-8 md:space-y-10">
          <div>
            <span>2025.08.21 - 2025.09.25</span>
            <h3 className="text-3xl">
              <ExternalLink
                href="https://www.npmjs.com/package/@xeonlink/prettier-plugin-organize-attributes"
                className="border-underline"
              >
                prettier-plugin-organize-attributes
              </ExternalLink>
              &nbsp;
              <LinkIcon />
            </h3>
            <div className="flex flex-wrap mt-1">
              <Badge color="1C2B34" logo={{ slug: "prettier" }}>
                prettier
              </Badge>
              <Badge color="20232a" logo={{ slug: "typescript" }}>
                tsup
              </Badge>
              <Badge color="20232a" logo={{ slug: "vitest" }}>
                vitest
              </Badge>
              <Badge color="DF1538">angular html parser</Badge>
              <Badge color="F1DC56">estree parser</Badge>
            </div>
            <p className="mt-1 max-w-150 break-keep">
              prettier-plugin-organize-attributes는 prettier 플러그인으로, html like한 코드에서 attributes를 재배치하여
              코드를 보기 좋게 만들어주는 플러그인입니다. 자세한 기능은{" "}
              <ExternalLink
                href="https://github.com/Xeonlink/prettier-plugin-organize-attributes"
                className="border-underline"
              >
                <span className="text-accent font-bold">레포지토리</span>
              </ExternalLink>
              를 참고바랍니다.
            </p>
          </div>
        </div>
      </Article>
    </Section>
  );
}
