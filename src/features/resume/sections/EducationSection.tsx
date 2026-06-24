import namjuFrontSymbolImage from "@/features/resume/assets/namju_front_symbol.png";
import ssuImage from "@/features/resume/assets/ssu.jpg";
import { Article, ArticleImage } from "@/shared/components/article";
import { ExternalLink, LinkIcon } from "@/shared/components/external-link";
import { Section } from "@/shared/components/section";

export function EducationSection() {
  return (
    <Section id="education" title="학력사항">
      <Article>
        <ArticleImage
          src={ssuImage}
          alt="숭실대학교 상징마크, 대동강의 물결과 한강의 물결을 상징하는 구부러지고 곧은 물결무늬 로고"
          className="bg-white"
        />
        <div className="flex flex-col">
          <span>March 2020 - February 2026</span>
          <ExternalLink href="https://cse.ssu.ac.kr/">
            <h2 className="text-3xl inline-block border-underline">
              SOONGSIL <span className="text-accent">UNIV</span>ERSITY
            </h2>
            &nbsp;
            <LinkIcon />
          </ExternalLink>
          <span className="text-2xl">
            <span className="text-accent">컴퓨터</span> 학부 학사
          </span>
          <span>졸업 예정</span>
        </div>
      </Article>
      <Article>
        <ArticleImage
          src={namjuFrontSymbolImage}
          alt="남주고등학교 상징마크, 하늘을 향해 있는 3개의 펜촉 모양"
          className="bg-white"
        />
        <div className="flex flex-col">
          <span>March 2017 - February 2020</span>
          <ExternalLink href="https://school.jje.go.kr/namju-h/main.do">
            <h2 className="text-3xl inline-block border-underline">
              NAMJU <span className="text-accent">HIGH</span> SCHOOL
            </h2>
            &nbsp;
            <LinkIcon />
          </ExternalLink>
          <span className="text-2xl">
            인문계열 <span className="text-accent">이과</span>
          </span>
          <span>졸업</span>
        </div>
      </Article>
    </Section>
  );
}
