import cublickCloudImage from "@/assets/cublick_cloud_logo.png";
import cublikStandaloneImage from "@/assets/cublick_standalone_logo.png";
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
import { Li, Ul } from "@/components/list";
import { Section, SubSectionTitle } from "@/components/section";
import { Strong } from "@/components/strong";
import { ArrowRight } from "lucide-react";

export function ExperienceSection() {
  return (
    <Section id="experience" className="space-y-10" title="경력사항">
      <SubSectionTitle href="https://www.cublick.com/">큐브릭 디지털</SubSectionTitle>
      <Article>
        <ArticleHeader image={<ArticleImage src={cublickCloudImage} alt="큐브릭 로고" />}>
          <ArticleTitle label="2022.03 - 2022.04" href="https://www.cublick.com/솔루션/큐브릭서비스/">
            큐브릭 <Strong>클라우드 사인</Strong> 고도화
          </ArticleTitle>
          <ArticleBadgeList>
            <ArticleBadge message="react" color="20232a" logo={{ slug: "react", color: "61DAFB" }} />
            <ArticleBadge
              message="fabric.js"
              color="ff6b6b"
              logo={{ slug: "javascript", color: "white" }}
              href="https://fabricjs.com/"
            />
            <ArticleBadge message="react query" color="FF4154" logo={{ slug: "reactquery", color: "white" }} />
            <ArticleBadge message="redux toolkit" color="593d88" logo={{ slug: "redux", color: "white" }} />
          </ArticleBadgeList>
        </ArticleHeader>
        <ArticleMain>
          <div>
            <ArticleContentTitle>수행 업무</ArticleContentTitle>
            <Ul>
              <Li>
                디자인 캔버스 기능 재설계 (fabric.js)
                <Ul>
                  <Li>
                    절차지향 <ArrowRight className="inline size-4" /> 선언적 OOP
                  </Li>
                  <Li>undo redo 스냅샷 기능 개발</Li>
                </Ul>
              </Li>
              <Li>
                디자인 관련 api 연동
                <Ul>
                  <Li>기존 관리도구에서 사용되던 디자인 CRUD api 연동</Li>
                  <Li>디자인 프레젠테이션 api 연동</Li>
                </Ul>
              </Li>
              <Li>기존 UI에 시맨틱 태그 및 flex, grid 기반 반응형 디자인 적용</Li>
            </Ul>
          </div>
          <div>
            <ArticleContentTitle>주요 성과</ArticleContentTitle>
            <Ul>
              <Li>캔버스에서 undo redo할 때, 컴포넌트에 관계없이 serdes 가능</Li>
              <Li>
                WeekMap을 통해 image 컴포넌트 캐싱 <ArrowRight className="inline size-4" /> undo redo 속도 향상
              </Li>
              <Li>
                api 호출 함수와 react-query hook을 다른 레이어로 분리 <ArrowRight className="inline size-4" /> api
                변경에 유연하게 대처가능
              </Li>
            </Ul>
          </div>
        </ArticleMain>
      </Article>
      <Article>
        <ArticleHeader image={<ArticleImage src={cublikStandaloneImage} alt="큐브릭 로고" />}>
          <ArticleTitle
            label="2022.03 - 2022.04"
            href="https://www.cublick.com/%ec%86%94%eb%a3%a8%ec%85%98/%ed%81%90%eb%b8%8c%eb%a6%ad%ec%84%9c%eb%b9%84%ec%8a%a4/"
          >
            큐브릭 <Strong>사인</Strong> DX 개선
          </ArticleTitle>
          <ArticleBadgeList>
            <ArticleBadge message="react" color="20232a" logo={{ slug: "react", color: "61DAFB" }} />
            <ArticleBadge
              message="electron"
              color="191970"
              logo={{ slug: "electron", color: "white" }}
              href="https://www.electronjs.org/"
            />
            <ArticleBadge message="redux toolkit" color="593d88" logo={{ slug: "redux", color: "white" }} />
            <ArticleBadge
              message="socket.io"
              color="black"
              logo={{ slug: "socketdotio", color: "white" }}
              href="https://github.com/socketio/socket.io"
            />
            <ArticleBadge message="nedb" color="213939" href="https://github.com/louischatriot/nedb" />
          </ArticleBadgeList>
        </ArticleHeader>
        <ArticleMain>
          <div>
            <ArticleContentTitle>수행 업무</ArticleContentTitle>
            <Ul>
              <Li>빌드 시나리오 문화</Li>
              <Li>
                React 컴포넌트 마이그레이션 (class <ArrowRight className="inline size-4" /> func)
              </Li>
              <Li>통합 모달처리 react hook(useModal) 개발 및 적용</Li>
            </Ul>
          </div>
          <div>
            <ArticleContentTitle>주요 성과</ArticleContentTitle>
            <Ul>
              <Li>os 및 버전별 빌드 시나리오를 readme에 정리, 빌드실패로 인한 소통비용 감소</Li>
              <Li>
                300개 이상의 컴포넌트를 함수 컴포넌트로 다시 작성 <ArrowRight className="inline size-4" /> 기존 컴포넌트
                확장성 재고 및 통폐합
              </Li>
              <Li>
                hook을 통한 모달처리 일관성 제공 <ArrowRight className="inline size-4" /> css z-index 의존도 감소
              </Li>
            </Ul>
          </div>
        </ArticleMain>
      </Article>
    </Section>
  );
}
