import captchaBreakImage from "@/assets/captcha-break.gif";
import captchaSolveCodeImage from "@/assets/captcha_solve_code.png";
import koreaAuthFillerImage from "@/assets/korea_auth_filler_image.png";
import { Article, ArticleImage } from "@/features/resume/components/article";
import { Badge } from "@/features/resume/components/badge";
import { ExternalLink } from "@/features/resume/components/external-link";
import { ImageSwap } from "@/features/resume/components/image-swap";
import { Button } from "@/shared/components/ui/button";
import {
  SiChromewebstore,
  SiFirefox,
  SiGithub,
} from "@icons-pack/react-simple-icons";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";

export function KoreaAuthFillerSection() {
  return (
    <section className="space-y-8 border-dotted p-8 py-16 not-last:border-b-2">
      <Article>
        <ArticleImage
          className="mb-2"
          src={koreaAuthFillerImage}
          alt="원형 태극무늬 형상"
        />
        <div>
          <span>2025.01 - 2025.03</span>
          <h2 className="text-4xl font-bold">
            한국<span className="text-accent">인증</span>채우기
          </h2>
          <p className="mt-2 break-keep">
            모바일 본인인증, 휴대폰 인증 등에 필요한 정보를 자동으로 채워주는
            브라우저 확장프로그램. <br />
            간단한 캡챠는 <span className="text-accent">비전 AI</span> 가
            자동으로 인식
          </p>
          <ul className="mt-2 flex gap-2">
            <motion.li
              whileHover={{ scale: 1.3 }}
              transition={{ type: "spring" }}
            >
              <Button className="rounded-full" variant="outline" asChild>
                <ExternalLink href="https://chromewebstore.google.com/detail/한국인증채우기/eonnjagalbjlklfjnfpgdeaajkghpnjc">
                  <SiChromewebstore className="size-4" />
                  <span>Web Store</span>
                </ExternalLink>
              </Button>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.3 }}
              transition={{ type: "spring" }}
            >
              <Button className="rounded-full" variant="outline" asChild>
                <ExternalLink href="https://addons.mozilla.org/en-US/firefox/addon/korea-auth-filler/">
                  <SiFirefox className="size-4" />
                  <span>Add-ons</span>
                </ExternalLink>
              </Button>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.3 }}
              transition={{ type: "spring" }}
            >
              <Button className="rounded-full" variant="outline" asChild>
                <ExternalLink href="https://github.com/Xeonlink/korea-auth-filler">
                  <SiGithub className="size-4" />
                  <span>GitHub</span>
                </ExternalLink>
              </Button>
            </motion.li>
          </ul>
        </div>
      </Article>
      <div className="space-y-16">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">
            캡챠 자동 인식 (Captcha Breaking)
          </h3>
          <p>
            기존에는 사용자가 캡챠를 <span className="text-accent">직접</span>{" "}
            풀어야 했음. <br />
            범용 OCR인 tesseract.js로 자동인식을 시도했으나{" "}
            <span className="text-accent">정확도 30% 미만</span>으로 만족스럽지
            못함
          </p>
          <ImageSwap className="my-2 max-w-150">
            <img
              src={captchaBreakImage}
              alt="자동으로 캡챠 이미지를 리로드하고, 캡챠 풀기를 반복하는 움직이는 이미지"
              loading="lazy"
            />
            <img
              src={captchaSolveCodeImage}
              alt="캡챠를 풀기 위한 captchaSolve 함수를 호출하고, 그 결과를 화면에 표시하는 코드"
              loading="lazy"
            />
          </ImageSwap>
          <ul className="ml-8 space-y-2">
            <li className="list-disc">
              <span className="text-accent">CRNN</span> 구조의 인식 모델을 직접
              학습하고, <span className="text-accent">ONNX Runtime</span>
              으로 브라우저에서 실행
            </li>
            <li className="list-disc">
              인증벤더 별 <span className="text-accent">전용 모델</span>을
              분리하여 정확도 99.9% 이상 달성{" "}
            </li>
            <li className="list-disc">
              벤더 별 모델을 찍어내기 위해{" "}
              <span className="text-accent">cli 도구</span>{" "}
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <ExternalLink
                    className="border-underline"
                    href="https://github.com/Xeonlink/kaptch"
                  >
                    <SiGithub className="size-4" />
                    <span>Kaptch</span>
                  </ExternalLink>
                </Button>
              </motion.div>{" "}
              제작
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold">기타 구현 및 기여</h3>
          <ul className="ml-8 space-y-2">
            <li className="list-disc">
              인증 폼 자동 입력 <ArrowRightIcon className="inline size-4" />{" "}
              content script에서 DOM의{" "}
              <span className="text-accent">input tag</span>를 탐색해 이름 ·
              전화번호 등을 자동으로 채움
            </li>
            <li className="list-disc">
              인증벤더별 파서 <ArrowRightIcon className="inline size-4" />{" "}
              벤더마다 다른 <span className="text-accent">html tag</span> 구조를
              어댑터 패턴으로 추상화
            </li>
            <li className="list-disc">
              사용자 정보 저장 <ArrowRightIcon className="inline size-4" />{" "}
              <span className="text-accent">chrome.storage</span>(localStorage
              대응) 기반 프로필 관리
            </li>
            <li className="list-disc">
              E2E 테스트 <ArrowRightIcon className="inline size-4" />{" "}
              <span className="text-accent">Playwright</span>로 실제 인증 페이지
              시나리오 검증
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold">기술스택</h3>
          <ul className="ml-8 space-y-2">
            <li className="flex flex-wrap items-center gap-2">
              <Badge color="20232a" logo={{ slug: "react", color: "61DAFB" }}>
                react
              </Badge>
              <span>확장프로그램 팝업 UI를 구현하기 위해 사용</span>
            </li>
            <li className="flex flex-wrap items-center gap-2">
              <Badge color="00DC82" logo={{ slug: "wxt", color: "white" }}>
                wxt
              </Badge>
              <span>크로스 브라우저 확장프로그램 빌드를 위해 사용</span>
            </li>
            <li className="flex flex-wrap items-center gap-2">
              <Badge color="005CED" logo={{ slug: "onnx", color: "white" }}>
                onnx
              </Badge>
              <span>
                서버 없이 브라우저에서 캡챠 인식 모델을 추론하기 위해 사용
              </span>
            </li>
            <li className="flex flex-wrap items-center gap-2">
              <Badge color="2EAD33">playwright</Badge>
              <span>
                실제 인증 페이지에서 E2E 시나리오를 검증하기 위해 사용
              </span>
            </li>
            <li className="flex flex-wrap items-center gap-2">
              <Badge
                color="FF6B35"
                logo={{ slug: "googlechrome", color: "white" }}
              >
                browser extension api
              </Badge>
              <span>content script 주입과 storage 접근을 위해 사용</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
