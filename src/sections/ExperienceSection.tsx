import {
  Article,
  ArticleBadge,
  ArticleBadgeList,
  ArticleContentTitle,
  ArticleHeader,
  ArticleImage,
  ArticleMain,
  ArticleTitle,
} from "@/components/article";
import { Section, SubSectionTitle } from "@/components/section";
import { Strong } from "@/components/strong";
import { ArrowRight } from "lucide-react";

export function ExperienceSection() {
  return (
    <Section id="experience" className="space-y-10" title="경력사항">
      <SubSectionTitle href="https://www.cublick.com/">큐브릭 디지털</SubSectionTitle>
      <Article>
        <ArticleHeader
          image={
            <ArticleImage src="https://www.cublick.com/wp-content/uploads/2021/04/cloud_logo.png" alt="큐브릭 로고" />
          }
        >
          <div>2022.03 - 2022.04</div>
          <ArticleTitle href="https://www.cublick.com/%ec%86%94%eb%a3%a8%ec%85%98/%ed%81%90%eb%b8%8c%eb%a6%ad%ec%84%9c%eb%b9%84%ec%8a%a4/">
            큐브릭 <Strong>클라우드 사인</Strong> 고도화
          </ArticleTitle>
          <ArticleBadgeList>
            <ArticleBadge
              src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"
              alt="react badge"
            />
            <ArticleBadge
              src="https://img.shields.io/badge/fabric.js-%23ff6b6b.svg?style=for-the-badge&logo=javascript&logoColor=white"
              alt="fabric.js badge"
              href="https://fabricjs.com/"
            />
            <ArticleBadge
              src="https://img.shields.io/badge/React%20Query-%23FF4154.svg?style=for-the-badge&logo=react%20query&logoColor=white"
              alt="react-query badge"
            />
            <ArticleBadge
              src="https://img.shields.io/badge/Redux%20Toolkit-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white"
              alt="redux-toolkit badge"
            />
          </ArticleBadgeList>
        </ArticleHeader>
        <ArticleMain>
          <div>
            <ArticleContentTitle>수행 업무</ArticleContentTitle>
            <ul className="ml-8">
              <li className="list-disc">디자인 캔버스 기능 재설계 (fabric.js)</li>
              <li>
                <ul className="ml-8">
                  <li className="list-disc">
                    절차지향 <ArrowRight className="inline size-4" /> 선언적 OOP
                  </li>
                  <li className="list-disc">undo redo 스냅샷 기능 개발</li>
                </ul>
              </li>
              <li className="list-disc">디자인 관련 api 연동</li>
              <li>
                <ul className="ml-8">
                  <li className="list-disc">기존 관리도구에서 사용되던 디자인 CRUD api 연동</li>
                  <li className="list-disc">디자인 프레젠테이션 api 연동</li>
                </ul>
              </li>
              <li className="list-disc">기존 UI에 시맨틱 태그 및 flex, grid 기반 반응형 디자인 적용</li>
            </ul>
          </div>
          <div>
            <ArticleContentTitle>주요 성과</ArticleContentTitle>
            <ul className="ml-8">
              <li className="list-disc">캔버스에서 undo redo할 때, 컴포넌트에 관계없이 serdes 가능</li>
              <li className="list-disc">
                WeekMap을 통해 image 컴포넌트 캐싱 <ArrowRight className="inline size-4" /> undo redo 속도 향상
              </li>
              <li className="list-disc">
                api 호출 함수와 react-query hook을 다른 레이어로 분리 <ArrowRight className="inline size-4" /> api
                변경에 유연하게 대처가능
              </li>
            </ul>
          </div>
        </ArticleMain>
      </Article>
      <Article>
        <ArticleHeader
          image={
            <ArticleImage
              src="https://www.cublick.com/wp-content/uploads/2021/04/standalone_logo.png"
              alt="큐브릭 로고"
            />
          }
        >
          <div>2022.03 - 2022.04</div>
          <ArticleTitle href="https://www.cublick.com/%ec%86%94%eb%a3%a8%ec%85%98/%ed%81%90%eb%b8%8c%eb%a6%ad%ec%84%9c%eb%b9%84%ec%8a%a4/">
            큐브릭 <Strong>사인</Strong> DX 개선
          </ArticleTitle>
          <ArticleBadgeList>
            <ArticleBadge
              src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"
              alt="react badge"
            />
            <ArticleBadge
              src="https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white"
              alt="electron badge"
              href="https://www.electronjs.org/"
            />
            <ArticleBadge
              src="https://img.shields.io/badge/Redux%20Toolkit-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white"
              alt="redux-toolkit badge"
            />
            <ArticleBadge
              src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101"
              alt="socket.io badge"
              href="https://github.com/socketio/socket.io"
            />
            <ArticleBadge
              src="https://img.shields.io/badge/nedb-%23213939.svg?style=for-the-badge&logo=nedb&logoColor=white"
              alt="nedb badge"
              href="https://github.com/louischatriot/nedb"
            />
          </ArticleBadgeList>
        </ArticleHeader>
        <ArticleMain>
          <div>
            <ArticleContentTitle>수행 업무</ArticleContentTitle>
            <ul className="ml-8">
              <li className="list-disc">빌드 시나리오 문서화</li>
              <li className="list-disc">
                React 컴포넌트 마이그레이션 (class <ArrowRight className="inline size-4" /> func)
              </li>
              <li className="list-disc">통합 모달처리 react hook(useModal) 개발 및 적용</li>
            </ul>
          </div>
          <div>
            <ArticleContentTitle>주요 성과</ArticleContentTitle>
            <ul className="ml-8">
              <li className="list-disc">os 및 버전별 빌드 시나리오를 readme에 정리, 빌드실패로 인한 소통비용 감소</li>
              <li className="list-disc">
                300개 이상의 컴포넌트를 함수 컴포넌트로 다시 작성 <ArrowRight className="inline size-4" /> 기존 컴포넌트
                확장성 재고 및 통폐합
              </li>
              <li className="list-disc">
                hook을 통한 모달처리 일관성 제공 <ArrowRight className="inline size-4" /> css z-index 의존도 감소
              </li>
            </ul>
          </div>
        </ArticleMain>
      </Article>
    </Section>
  );
}
