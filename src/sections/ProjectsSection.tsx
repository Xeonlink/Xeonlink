import afterPageLocatorImage from "@/assets/after_page_loactor.png";
import allcaseImage from "@/assets/allcase.png";
import allcaseImage3 from "@/assets/allcase3.png";
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
  ArticleMain,
  ArticleTitle,
} from "@/components/article";
import { Link } from "@/components/link";
import { ArrowRightIcon } from "lucide-react";
import { Section } from "../components/section";

export function ProjectsSection() {
  return (
    <Section id="projects" className="space-y-10" title="PROJECTS">
      {/* ReFolder */}
      <Article
        imageSrc={refolderImage}
        imageAlt="파란색 배경에 흰색의 두꺼운 선으로 폴더 아이콘 우상단에 기어 아이콘이 있는 형상"
      >
        <ArticleHeader>
          {/* TODO: 날짜 변경 */}
          <div>2022.12 - 2023.04</div>
          <ArticleTitle href="https://github.com/Xeonlink/re-folder">ReFolder</ArticleTitle>
          <ArticleBadgeList>
            <ArticleBadge
              src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"
              alt="react badge"
            />
            <ArticleBadge
              src="https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white"
              alt="electron badge"
            />
            <ArticleBadge
              src="https://img.shields.io/badge/React%20Query-%23FF4154.svg?style=for-the-badge&logo=react%20query&logoColor=white"
              alt="react-query badge"
            />
            <ArticleBadge
              src="https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white"
              alt="sqlite badge"
            />
            <ArticleBadge
              src="https://img.shields.io/badge/drizzle-%23C5F74F.svg?style=for-the-badge&logo=drizzle&logoColor=black"
              alt="drizzle orm badge"
              href="https://orm.drizzle.team/"
            />
          </ArticleBadgeList>
          <p>
            ReFolder는 사용자가 설정한 규칙에 따라서 정리되지 않은 폴더의 파일을 정리해주는 프로그램입니다. <br />
            다운로드 폴더에 항상 파일이 쌓이는 분, 바탕화면이 지저분한 것을 참지 못하는 분들을 위해 만들었습니다. <br />
            자세한 기능은&nbsp;
            <Link href="https://github.com/Xeonlink/re-folder">
              <span className="font-bold text-red-400">여기</span>
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
                className="w-96 rounded-xl"
              />
            </div>
            <p>
              - 업데이트할 때, <span className="text-red-400">DB를 유연하게 변경</span> 필요 <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- db schema 변경보다 프로그램 버전 변경이 더 빠름 <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 매번 버전에 맞는 조건문 필요&nbsp;
              <ArrowRightIcon className="inline size-4" /> <span className="text-red-400">schema 변경</span>에만 집중
              가능
            </p>
            <div className="group relative flex w-fit flex-wrap items-center">
              <img
                src={createApiSelectorImage}
                alt="ipc정의타입을 받아서, renderer에 노출할 ipc를 true/false로 선택"
                className="h-36 rounded-xl transition-all duration-700 group-hover:opacity-0 group-hover:blur-md"
              />
              {/* <ArrowRightIcon className="inline size-8" /> */}
              <img
                src={createApiSelectorImage2}
                alt="ipc정의타입을 받아서, renderer에 노출할 ipc를 true/false로 선택. 어떤 ipc가 있는지 타입추론되는 이미지"
                className="absolute h-36 rounded-xl opacity-0 blur-md transition-all duration-700 group-hover:opacity-100 group-hover:blur-none"
              />
            </div>

            <p>
              - ipc 통신을 더 쉽고, 실수없이 정의하고 싶음 <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 채널 이름을 기억하기 어려움&nbsp;
              <ArrowRightIcon className="inline size-4" /> 채널이름을 key로 하여&nbsp;
              <span className="text-red-400">typescript를 통해 추론</span> <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- handle함수에 맞는&nbsp;
              <span className="text-red-400">invoke 함수</span>를 자동 생성&nbsp; <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- main의 에러가 renderer로 전달 안됨&nbsp;
              <ArrowRightIcon className="inline size-4" /> <span className="text-red-400">Error 직렬화/역직렬화</span>로
              전달&nbsp;
            </p>
          </ArticleContent>
        </ArticleMain>
      </Article>
      {/* 한국인증채우기 */}
      <Article imageSrc={koreaAuthFillerImage} imageAlt="원형 태극무늬 형상">
        <ArticleHeader>
          {/* TODO: 날짜 변경 */}
          <div>2022.12 - 2023.04</div>
          <ArticleTitle href="https://github.com/Xeonlink/korea-auth-filler">한국인증채우기</ArticleTitle>
          <ArticleBadgeList>
            <ArticleBadge
              src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"
              alt="react badge"
            />
            <ArticleBadge
              src="https://img.shields.io/badge/wxt-%2300DC82.svg?style=for-the-badge&logo=wxt&logoColor=white"
              alt="wxt badge"
            />
            <ArticleBadge
              src="https://img.shields.io/badge/onnx-%23005CED.svg?style=for-the-badge&logo=onnx&logoColor=white"
              alt="onnx badge"
            />
            <ArticleBadge
              src="https://img.shields.io/badge/playwright-%232EAD33.svg?style=for-the-badge&logo=playwright&logoColor=white"
              alt="playwright badge"
            />
            <ArticleBadge
              src="https://img.shields.io/badge/browser%20extension%20api-%23FF6B35.svg?style=for-the-badge&logo=googlechrome&logoColor=white"
              alt="browser extension api badge"
            />
          </ArticleBadgeList>
          <p>
            한국에서 사용되는 모바일 본인인증, 휴대폰 인증, 민간인증서 인증 등을 사용할 때 <br />
            필요한 정보를 자동으로 채워주는 브라우저 확장프로그램 입니다. <br />
            간단한 캡챠이미지는 <span className="text-red-400">비전 AI</span>를 통해 자동으로 채워넣습니다. 자세한
            기능은&nbsp;
            <Link href="https://github.com/Xeonlink/korea-auth-filler">
              <span className="font-bold text-red-400">여기</span>
            </Link>
            를 참고바랍니다.
          </p>
        </ArticleHeader>
        <ArticleMain>
          <ArticleContentTitle className="mb-1">도전 과제</ArticleContentTitle>
          <ArticleContent>
            <div className="group relative flex w-fit flex-wrap items-center">
              <img
                src={prePageLocatorImage}
                alt="document.querySelector로 요소를 찾고, 요소가 있는지 없는지 if문으로 확인하고 로직을 실행하는 블럭이 2개 있음"
                className="h-56 rounded-xl transition-all duration-700 group-hover:opacity-0 group-hover:blur-md"
              />
              {/* <ArrowRightIcon className="inline size-8" /> */}
              <img
                src={afterPageLocatorImage}
                alt="page input visibie fill 함수가 체이닝되어 있고, await를 사용하고 있는 구문이 여럿 있음"
                className="absolute h-36 rounded-xl opacity-0 blur-md transition-all duration-700 group-hover:opacity-100 group-hover:blur-none"
              />
            </div>
            <p>
              - 확장프로그램이 너무 빨라서 DOM에서 <span className="text-red-400">요소를 못찾음</span> <br />
              -&nbsp;
              <span className="text-red-400">hydration</span>
              이 끝나기 전에 버튼을 클릭하는 경우 발생 <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- playwright에서 영감을 얻어&nbsp;
              <Link href="https://github.com/Xeonlink/korea-auth-filler/blob/main/src/utils/Page.ts">
                <span className="font-bold text-red-400">Page</span>
              </Link>
              와&nbsp;
              <Link href="https://github.com/Xeonlink/korea-auth-filler/blob/main/src/utils/Locator.ts">
                <span className="font-bold text-red-400">Locator</span>
              </Link>
              구현 <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span className="text-red-400">retry</span>와&nbsp;
              <span className="text-red-400">sleep</span>을 통해 더 안정적으로 채워넣기 <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 인터넷 느리면 채우기 실패&nbsp;
              <ArrowRightIcon className="inline size-4" /> 안정적 채우기 가능
            </p>
            <div className="group relative flex w-96 flex-wrap items-center">
              <img
                src={allcaseImage3}
                alt="allcase2 함수에서 나온 testcase변수에 regist함수를 호출하여 테스트를 등록하는 코드. 정의한 타입이 자동으로 추론됨"
                className="w-72 rounded-xl transition-all duration-700 group-hover:opacity-0 group-hover:blur-md"
              />
              {/* <ArrowRightIcon className="inline size-8" /> */}
              <img
                src={allcaseImage}
                alt="테스트 커버리지에 맞는 타입이 정의되어있고, allcase2 함수에 타입을 제네릭으로 넣어주고 있음"
                className="absolute h-42 rounded-xl opacity-0 blur-md transition-all duration-700 group-hover:opacity-100 group-hover:blur-none"
              />
            </div>
            <p>
              - e2e 테스트 차원을 늘릴 때마다 test.describe와 test가 중복 <ArrowRightIcon className="inline size-4" />
              &nbsp; 규격화 곤란 <br />
              -&nbsp;
              <Link href="https://github.com/Xeonlink/korea-auth-filler/blob/main/tests/utils/testcase.ts">
                <span className="font-bold text-red-400">allcase</span>
              </Link>
              &nbsp;함수 정의 <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- regist함수에서 파라미터 추가만으로 테스트 커버리지
              확장&nbsp;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- test.describe 자동 등록, variables의 통한 타입 추론
            </p>
          </ArticleContent>
        </ArticleMain>
      </Article>
    </Section>
  );
}
