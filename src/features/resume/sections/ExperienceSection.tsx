import cublickCloudImage from "@/features/resume/assets/cublick_cloud_logo.png";
import cublikStandaloneImage from "@/features/resume/assets/cublick_standalone_logo.png";
import { Article, ArticleImage } from "@/shared/components/article";
import { Badge } from "@/shared/components/badge";
import { ExternalLink, LinkIcon } from "@/shared/components/external-link";
import { Section } from "@/shared/components/section";
import { Button } from "@/shared/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/components/ui/collapsible";
import { ArrowRight, ArrowRightIcon } from "lucide-react";

export function ExperienceSection() {
  return (
    <Section id="experience" title="경력사항">
      <div className="flex flex-col">
        <span>2022.12 - 2023.04</span>
        <h2 className="text-4xl font-bold">
          <ExternalLink href="https://www.cublick.com/" className="border-underline">
            큐브릭 디지털
          </ExternalLink>
          &nbsp;
          <LinkIcon />
        </h2>
      </div>
      <Article>
        <ArticleImage src={cublickCloudImage} alt="큐브릭 로고" />
        <div className="flex flex-col">
          <div>
            <span>2022.03 - 2022.04</span>
            <h3 className="text-3xl">
              <ExternalLink href="https://www.cublick.com/솔루션/큐브릭서비스/" className="border-underline">
                큐브릭 <span className="text-accent">클라우드 사인</span> 고도화
              </ExternalLink>
              &nbsp;
              <LinkIcon />
            </h3>
            <div className="flex flex-wrap mt-1">
              <Badge color="20232a" logo={{ slug: "react", color: "61DAFB" }}>
                react
              </Badge>
              <ExternalLink href="https://fabricjs.com/" className="border-underline">
                <Badge color="ff6b6b" logo={{ slug: "javascript", color: "white" }}>
                  fabric.js
                </Badge>
              </ExternalLink>
              <Badge color="FF4154" logo={{ slug: "reactquery", color: "white" }}>
                react query
              </Badge>
              <Badge color="593d88" logo={{ slug: "redux", color: "white" }}>
                redux toolkit
              </Badge>
            </div>
          </div>
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="justify-start mt-2 text-lg" size="lg">
                수행 업무 및 성과
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-8 md:mt-10 space-y-8 md:space-y-10">
              <div>
                <h4 className="text-xl font-bold">수행 업무</h4>
                <ul className="ml-8">
                  <li className="list-disc">
                    디자인 캔버스 기능 재설계 (fabric.js)
                    <ul className="ml-8">
                      <li className="list-disc">
                        사용자 action 중심, 절차지향 방식 <ArrowRightIcon className="inline size-4" /> 디자인 element
                        중심, 선언적 OOP 방식
                      </li>
                      <li className="list-disc">undo redo 기능 refactor</li>
                    </ul>
                  </li>
                  <li className="list-disc">
                    디자인 관련 api 연동
                    <ul className="ml-8">
                      <li className="list-disc">기존 관리도구에서 사용되던 디자인 CRUD api 연동</li>
                      <li className="list-disc">디자인 프레젠테이션 api 연동</li>
                    </ul>
                  </li>
                  <li className="list-disc">기존 UI에 시맨틱 태그 및 flex, grid 기반 반응형 디자인 적용</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold">주요 성과</h4>
                <ul className="ml-8">
                  <li className="list-disc">캔버스에서 undo redo할 때, 컴포넌트에 관계없이 serdes 가능</li>
                  <li className="list-disc">
                    WeekMap을 통해 image 컴포넌트 캐싱 <ArrowRight className="inline size-4" /> undo redo 속도 향상
                  </li>
                  <li className="list-disc">
                    api 호출 함수와 react-query hook을 decouple <ArrowRight className="inline size-4" /> api 변경에
                    유연하게 대처가능
                  </li>
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </Article>
      <Article>
        <ArticleImage src={cublikStandaloneImage} alt="큐브릭 로고" />
        <div className="flex flex-col">
          <div>
            <span>2022.12 - 2023.02</span>
            <h3 className="text-3xl">
              <ExternalLink href="https://www.cublick.com/솔루션/큐브릭서비스/" className="border-underline">
                큐브릭 <span className="text-accent">사인</span> DX 개선
              </ExternalLink>
              &nbsp;
              <LinkIcon />
            </h3>
            <div className="flex flex-wrap mt-1">
              <Badge color="20232a" logo={{ slug: "react", color: "61DAFB" }}>
                react
              </Badge>
              <ExternalLink href="https://www.electronjs.org/" className="border-underline">
                <Badge color="191970" logo={{ slug: "electron", color: "white" }}>
                  electron
                </Badge>
              </ExternalLink>
              <Badge color="593d88" logo={{ slug: "redux", color: "white" }}>
                redux toolkit
              </Badge>
              <ExternalLink href="https://github.com/socketio/socket.io" className="border-underline">
                <Badge color="black" logo={{ slug: "socketdotio", color: "white" }}>
                  socket.io
                </Badge>
              </ExternalLink>
              <ExternalLink href="https://github.com/louischatriot/nedb" className="border-underline">
                <Badge color="213939">nedb</Badge>
              </ExternalLink>
            </div>
          </div>
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="justify-start mt-2 text-lg" size="lg">
                수행 업무 및 성과
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-8 md:mt-10 space-y-8 md:space-y-10">
              <div>
                <h4 className="text-xl font-bold">수행 업무</h4>
                <ul className="ml-8">
                  <li className="list-disc">빌드 시나리오 문서화</li>
                  <li className="list-disc">
                    React 컴포넌트 마이그레이션 (class <ArrowRight className="inline size-4" /> func)
                  </li>
                  <li className="list-disc">통합 모달처리 react hook(useModal) 개발 및 적용</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold">주요 성과</h4>
                <ul className="ml-8">
                  <li className="list-disc">
                    os 및 버전별 빌드 시나리오를 readme에 정리, 빌드실패로 인한 소통비용 감소
                  </li>
                  <li className="list-disc">
                    300개 이상의 컴포넌트를 함수 컴포넌트로 다시 작성 <ArrowRight className="inline size-4" /> 기존
                    컴포넌트 확장성 재고 및 통폐합
                  </li>
                  <li className="list-disc">
                    hook을 통한 모달처리 일관성 제공 <ArrowRight className="inline size-4" /> css z-index 의존 제거
                  </li>
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </Article>
    </Section>
  );
}
