import afterPageLocatorImage from "@/assets/after_page_loactor.png";
import captchaBreakImage from "@/assets/captcha-break.gif";
import captchaSolveCodeImage from "@/assets/captcha_solve_code.png";
import createApiSelectorImage from "@/assets/create_api_selector.png";
import createApiSelectorImage2 from "@/assets/create_api_selector2.png";
import koreaAuthFillerImage from "@/assets/korea_auth_filler_image.png";
import prePageLocatorImage from "@/assets/per_page_locator.png";
import refolderImage from "@/assets/refolder_icon.png";
import versionRangeMapImage from "@/assets/version_range_map.png";
import {
  Article,
  ArticleBadge,
  ArticleBadgeList,
  ArticleContent,
  ArticleContentTitle,
  ArticleHeader,
  ArticleImage,
  ArticleMain,
  ArticleTitle,
} from "@/components/article";
import { ImageSwap } from "@/components/image-swap";
import { Link } from "@/components/link";
import { Li, Ul } from "@/components/list";
import { Section } from "@/components/section";
import { Strong } from "@/components/strong";
import { ArrowRightIcon } from "lucide-react";
// import allcaseImage from "@/assets/allcase.png";
// import allcaseImage3 from "@/assets/allcase3.png";

export function ProjectsSection() {
  return (
    <Section id="projects" className="space-y-10" title="PROJECTS">
      {/* ReFolder */}
      <Article>
        <ArticleHeader
          image={
            <ArticleImage
              src={refolderImage}
              alt="파란색 배경에 흰색의 두꺼운 선으로 폴더 아이콘 우상단에 기어 아이콘이 있는 형상"
            />
          }
        >
          <ArticleTitle label="2024.10.18 - 2025.01.22" href="https://github.com/Xeonlink/re-folder">
            ReFolder
          </ArticleTitle>
          <ArticleBadgeList>
            <ArticleBadge message="react" color="20232a" logo={{ slug: "react", color: "61DAFB" }} />
            <ArticleBadge message="electron" color="191970" logo={{ slug: "electron", color: "white" }} />
            <ArticleBadge message="react query" color="FF4154" logo={{ slug: "reactquery", color: "white" }} />
            <ArticleBadge message="sqlite" color="07405e" logo={{ slug: "sqlite", color: "white" }} />
            <ArticleBadge
              message="drizzle"
              color="C5F74F"
              logo={{ slug: "drizzle", color: "black" }}
              href="https://orm.drizzle.team/"
            />
          </ArticleBadgeList>
          <p>
            ReFolder는 사용자가 설정한 규칙에 따라서 정리되지 않은 폴더의 파일을 정리해주는 프로그램입니다. <br />
            다운로드 폴더에 항상 파일이 쌓이는 분, 바탕화면이 지저분한 것을 참지 못하는 분들을 위해 만들었습니다. <br />
            자세한 기능은{" "}
            <Link href="https://github.com/Xeonlink/re-folder">
              <Strong variant="bold">레포지토리</Strong>
            </Link>
            를 참고바랍니다.
          </p>
        </ArticleHeader>

        <ArticleMain>
          <ArticleContentTitle className="mb-1">도전 과제</ArticleContentTitle>
          <ArticleContent>
            <div className="flex flex-wrap items-center gap-2">
              <img
                src={versionRangeMapImage}
                alt="key로 버전의 범위를 받고, value로 db schema를 받는 VersionRangeMap클래스의 인스턴스를 생성"
                className="w-120 rounded-xl"
              />
            </div>
            <Ul>
              <Li>
                업데이트할 때, <Strong>DB를 유연하게 변경</Strong> 필요
                <Ul>
                  <Li>db schema 변경보다 프로그램 버전 변경이 더 빠름</Li>
                  <Li>
                    매번 버전에 맞는 조건문 필요 <ArrowRightIcon className="inline size-4" />{" "}
                    <Strong>schema 변경</Strong>에만 집중 가능
                  </Li>
                </Ul>
              </Li>
            </Ul>
            <ImageSwap className="w-120">
              <img src={createApiSelectorImage} alt="ipc정의타입을 받아서, renderer에 노출할 ipc를 true/false로 선택" />
              <img src={createApiSelectorImage2} alt="어떤 ipc가 있는지 타입추론되는 이미지" />
            </ImageSwap>
            <Ul>
              <Li>
                ipc 통신을 더 쉽고, 실수없이 정의하고 싶음
                <Ul>
                  <Li>
                    채널 이름을 기억하기 어려움 <ArrowRightIcon className="inline size-4" /> 채널이름을 key로 하여{" "}
                    <Strong>typescript를 통해 추론</Strong>
                  </Li>
                  <Li>
                    handle함수에 맞는 <Strong>invoke 함수</Strong>를 자동 생성
                  </Li>
                  <Li>
                    main의 에러가 renderer로 전달 안됨 <ArrowRightIcon className="inline size-4" />{" "}
                    <Strong>Error 직렬화/역직렬화</Strong>로 전달
                  </Li>
                </Ul>
              </Li>
            </Ul>
          </ArticleContent>
        </ArticleMain>
      </Article>
      {/* 한국인증채우기 */}
      <Article>
        <ArticleHeader image={<ArticleImage src={koreaAuthFillerImage} alt="원형 태극무늬 형상" />}>
          <ArticleTitle label="2025.01.13 - 2025.03.06" href="https://github.com/Xeonlink/korea-auth-filler">
            한국인증채우기
          </ArticleTitle>
          <ArticleBadgeList>
            <ArticleBadge message="react" color="20232a" logo={{ slug: "react", color: "61DAFB" }} />
            <ArticleBadge message="wxt" color="00DC82" logo={{ slug: "wxt", color: "white" }} href="https://wxt.dev/" />
            <ArticleBadge
              message="onnx"
              color="005CED"
              logo={{ slug: "onnx", color: "white" }}
              href="https://github.com/onnx/onnx"
            />
            <ArticleBadge message="playwright" color="2EAD33" href="https://github.com/microsoft/playwright" />
            <ArticleBadge
              message="browser extension api"
              color="FF6B35"
              logo={{ slug: "googlechrome", color: "white" }}
            />
          </ArticleBadgeList>

          <p>
            한국에서 사용되는 모바일 본인인증, 휴대폰 인증, 민간인증서 인증 등을 사용할 때 <br />
            필요한 정보를 자동으로 채워주는 브라우저 확장프로그램 입니다. <br />
            간단한 캡챠이미지는 <Strong>비전 AI</Strong>를 통해 자동으로 채워넣습니다. 자세한 기능은{" "}
            <Link href="https://github.com/Xeonlink/korea-auth-filler">
              <Strong variant="bold">레포지토리</Strong>
            </Link>
            를 참고바랍니다.
          </p>
        </ArticleHeader>
        <ArticleMain>
          <ArticleContentTitle className="mb-1">도전 과제</ArticleContentTitle>
          <ArticleContent>
            <ImageSwap className="w-120">
              <img
                src={prePageLocatorImage}
                alt="document.querySelector로 요소를 찾고, 요소가 있는지 없는지 if문으로 확인하고 로직을 실행하는 블럭이 2개 있음"
              />
              <img
                src={afterPageLocatorImage}
                alt="page input visibie fill 함수가 체이닝되어 있고, await를 사용하고 있는 구문이 여럿 있음"
              />
            </ImageSwap>
            <Ul>
              <Li>
                확장프로그램이 너무 빨라서 DOM에서 <Strong>요소를 못찾음</Strong>
              </Li>
              <Li>
                <Strong>hydration</Strong>이 끝나기 전에 버튼을 클릭하는 경우 발생
                <Ul>
                  <Li>
                    playwright에서 영감을 얻어{" "}
                    <Link href="https://github.com/Xeonlink/korea-auth-filler/blob/main/src/utils/Page.ts">
                      <Strong variant="bold">Page</Strong>
                    </Link>
                    와{" "}
                    <Link href="https://github.com/Xeonlink/korea-auth-filler/blob/main/src/utils/Locator.ts">
                      <Strong variant="bold">Locator</Strong>
                    </Link>
                    구현
                  </Li>
                  <Li>
                    <Strong>retry</Strong>와 <Strong>sleep</Strong>을 통해 더 안정적으로 채워넣기
                  </Li>
                  <Li>
                    인터넷 느리면 채우기 실패 <ArrowRightIcon className="inline size-4" /> 안정적 채우기 가능
                  </Li>
                </Ul>
              </Li>
            </Ul>
            {/* <ImageSwap className="w-120">
              <img
                src={allcaseImage3}
                alt="allcase2 함수에서 나온 testcase변수에 regist함수를 호출하여 테스트를 등록하는 코드. 정의한 타입이 자동으로 추론됨"
              />
              <img
                src={allcaseImage}
                alt="테스트 커버리지에 맞는 타입이 정의되어있고, allcase2 함수에 타입을 제네릭으로 넣어주고 있음"
              />
            </ImageSwap>
            <Ul>
              <Li>
                e2e 테스트 차원을 늘릴 때마다 test.describe와 test가 중복 <ArrowRightIcon className="inline size-4" />{" "}
                규격화 곤란
              </Li>
              <Li>
                <Link href="https://github.com/Xeonlink/korea-auth-filler/blob/main/tests/utils/testcase.ts">
                  <Strong variant="bold">allcase</Strong>
                </Link>{" "}
                함수 정의
                <Ul>
                  <Li>regist함수에서 파라미터 추가만으로 테스트 커버리지 확장</Li>
                  <Li>test.describe 자동 등록, variables의 통한 타입 추론</Li>
                </Ul>
              </Li>
            </Ul> */}
            <ImageSwap className="w-120">
              <img
                src={captchaBreakImage}
                alt="자동으로 캡챠이미지를 리로드하고, 캡챠풀기를 반복하는 움직이는 이미지"
              />
              <img
                src={captchaSolveCodeImage}
                alt="캡챠를 풀기 위한 captchaSolve 함수를 호출하고, 그 결과를 화면에 표시하는 코드"
              />
            </ImageSwap>
            <Ul>
              <Li>
                초기에 tesseract.js를 테스트 <ArrowRightIcon className="inline size-4" />{" "}
                <Strong>실패(정확도 부족)</Strong>
              </Li>
              <Li>
                캡챠 풀기의 정확도를 높이기 위해 인식모델을{" "}
                <Link href="https://github.com/Xeonlink/kaptch">
                  <Strong variant="bold">적접개발</Strong>
                </Link>
                <Ul>
                  <Li>
                    <Strong>CRNN</Strong> 구조로 설계, <Strong>ONNXRUNTIME</Strong>으로 실행
                  </Li>
                  <Li>
                    인증벤더마다 모델을 개발 <ArrowRightIcon className="inline size-4" /> 정확도 향상 & 모델 경량화
                  </Li>
                  <Li>
                    기존에 캡챠를 풀기위해 사용자의 집중을 요구 <ArrowRightIcon className="inline size-4" />{" "}
                    <Strong>딸깍으로 가능</Strong>
                  </Li>
                </Ul>
              </Li>
            </Ul>
          </ArticleContent>
        </ArticleMain>
      </Article>
    </Section>
  );
}
