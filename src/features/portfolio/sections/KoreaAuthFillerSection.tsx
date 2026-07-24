import authFillerTroubleVideo from "@/assets/auth_filler_trouble.mp4";
import authFillerTroubleShootVideo from "@/assets/auth_filler_troubleshoot.mp4";
import captchaBreakImage from "@/assets/captcha-break.gif";
import captchaSolveCodeImage from "@/assets/captcha_solve_code.png";
import koreaAuthFillerImage from "@/assets/korea_auth_filler_image.png";
import { ExternalLink } from "@/features/resume/components/external-link";
import { ImageSwap } from "@/features/resume/components/image-swap";
import { Button } from "@/shared/components/ui/button";
import {
  SiChromewebstore,
  SiFirefox,
  SiGithub,
  SiGooglechrome,
  SiNpm,
  SiOnnx,
  SiReact,
  SiWxt,
} from "@icons-pack/react-simple-icons";
import { ArrowRightIcon, InfoIcon, LinkIcon } from "lucide-react";
import { motion } from "motion/react";

export function KoreaAuthFillerSection() {
  return (
    <section className="flex flex-col space-y-16 border-dotted py-16 not-last:border-b-2 md:px-8">
      <div className="flex items-center max-md:flex-col md:justify-center">
        <img
          className="mb-2 h-32"
          src={koreaAuthFillerImage}
          alt="원형 태극무늬 형상"
        />
        <div className="mx-8">
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
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring" }}
            >
              <Button
                className="text-muted-foreground rounded-full"
                variant="outline"
                asChild
              >
                <ExternalLink href="https://chromewebstore.google.com/detail/한국인증채우기/eonnjagalbjlklfjnfpgdeaajkghpnjc">
                  <SiChromewebstore className="size-4" />
                  <span>Web Store</span>
                </ExternalLink>
              </Button>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring" }}
            >
              <Button
                className="text-muted-foreground rounded-full"
                variant="outline"
                asChild
              >
                <ExternalLink href="https://addons.mozilla.org/en-US/firefox/addon/korea-auth-filler/">
                  <SiFirefox className="size-4" />
                  <span>Add-ons</span>
                </ExternalLink>
              </Button>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring" }}
            >
              <Button
                className="text-muted-foreground rounded-full"
                variant="outline"
                asChild
              >
                <ExternalLink href="https://github.com/Xeonlink/korea-auth-filler">
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
          <ul className="ml-4 space-y-2">
            <li className="list-disc">
              <span className="text-accent">CRNN</span> 구조의 인식 모델을 직접
              학습하고,{" "}
              <motion.div className="inline-block">
                <Button className="rounded-full" variant="outline" asChild>
                  <ExternalLink href="https://www.npmjs.com/package/onnxruntime-web">
                    <SiNpm className="size-4" />
                    <span>ONNX Runtime</span>
                  </ExternalLink>
                </Button>
              </motion.div>{" "}
              을 사용하여 브라우저에서 실행
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
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <ExternalLink href="https://github.com/Xeonlink/kaptch">
                    <SiGithub className="size-4" />
                    <span>Kaptch</span>
                  </ExternalLink>
                </Button>
              </motion.div>{" "}
              제작
            </li>
          </ul>
        </div>

        <div className="bg-muted space-y-4 rounded-2xl p-8">
          <h3 className="text-2xl font-bold">Trouble Shooting</h3>
          <p>
            인증 페이지가 <span className="text-accent">CSR</span> 형식인 경우,{" "}
            <span className="text-accent">DOMContentLoaded</span> event 이후에도
            몇몇 랜더링이 끝나지 않아 "자동입력" 순서가 꼬이는 문제 발생
          </p>
          <div className="flex w-full gap-4">
            <div className="space-y-2 text-center">
              <video
                className="w-full rounded-xl"
                src={authFillerTroubleVideo}
                controls
              />
              <span>Issue</span>
            </div>
            <div className="space-y-2 text-center">
              <video
                className="w-full rounded-xl"
                src={authFillerTroubleShootVideo}
                controls
              />
              <span>Fix</span>
            </div>
          </div>
          <ul className="ml-4 space-y-2">
            <li className="list-disc">
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <ExternalLink href="https://developer.mozilla.org/ko/docs/Web/API/MutationObserver">
                    <InfoIcon className="size-4" />
                    <span>MutationObserver</span>
                  </ExternalLink>
                </Button>
              </motion.div>{" "}
              를 childList · subtree 옵션과 함께 사용하여, 짧은 시간안에 DOM
              tree 에 변화가 생기면 아직 랜더링 중이라고 판단하여 "자동입력"을
              미룸
            </li>
            <li className="list-disc">
              <span className="text-accent">debounce</span> 함수와 함께
              사용하여, 마지막 변화 이후 1초 뒤 "자동입력"을 진행하여 CSR page
              가 완전히 랜더링 되었음을 보장
            </li>
          </ul>
        </div>

        <div className="bg-muted space-y-4 rounded-2xl p-8">
          <h3 className="text-2xl font-bold">기타 구현 및 기여</h3>
          <ul className="ml-4 space-y-2">
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

        <div className="bg-muted space-y-4 rounded-2xl p-8">
          <h3 className="text-2xl font-bold">기술스택</h3>
          <ul className="space-y-2">
            <li className="flex gap-2 max-sm:flex-col sm:items-center">
              <motion.span
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <ExternalLink href="https://react.dev/">
                    <SiReact />
                    React
                  </ExternalLink>
                </Button>
              </motion.span>
              <span>확장프로그램 팝업 UI를 구현하기 위해 사용</span>
            </li>
            <li className="flex gap-2 max-sm:flex-col sm:items-center">
              <motion.span
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <ExternalLink href="https://wxt.dev/">
                    <SiWxt />
                    WXT
                  </ExternalLink>
                </Button>
              </motion.span>
              <span>크로스 브라우저 확장프로그램 빌드를 위해 사용</span>
            </li>
            <li className="flex gap-2 max-sm:flex-col sm:items-center">
              <motion.span
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <ExternalLink href="https://onnxruntime.ai/">
                    <SiOnnx />
                    ONNX
                  </ExternalLink>
                </Button>
              </motion.span>
              <span>
                서버 없이 브라우저에서 캡챠 인식 모델을 추론하기 위해 사용
              </span>
            </li>
            <li className="flex gap-2 max-sm:flex-col sm:items-center">
              <motion.span
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <ExternalLink href="https://playwright.dev/">
                    <LinkIcon className="size-4" />
                    Playwright
                  </ExternalLink>
                </Button>
              </motion.span>
              <span>
                실제 인증 페이지에서 E2E 시나리오를 검증하기 위해 사용
              </span>
            </li>
            <li className="flex gap-2 max-sm:flex-col sm:items-center">
              <motion.span
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring" }}
              >
                <Button className="rounded-full" variant="outline" asChild>
                  <ExternalLink href="https://developer.chrome.com/docs/extensions">
                    <SiGooglechrome />
                    Browser Extension API
                  </ExternalLink>
                </Button>
              </motion.span>
              <span>content script 주입과 storage 접근을 위해 사용</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
