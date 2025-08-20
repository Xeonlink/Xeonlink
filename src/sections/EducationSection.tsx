import ssuImage from "@/assets/ssu.jpg";
import { Article, ArticleHeader, ArticleImage, ArticleTitle } from "@/components/article";
import { Section } from "../components/section";

export function EducationSection() {
  return (
    <Section id="education" title="학력사항">
      <Article>
        <ArticleHeader
          image={
            <ArticleImage
              src={ssuImage}
              alt="숭실대학교 상징마크, 대동강의 물결과 한강의 물결을 상징하는 구부러지고 곧은 물결무늬 로고"
              className="bg-white"
            />
          }
        >
          <div>March 2020 - February 2026</div>
          <ArticleTitle href="https://cse.ssu.ac.kr/">
            SOONGSIL <span className="text-accent">UNIV</span>ERSITY
          </ArticleTitle>
          <p>
            <span className="text-2xl">
              <span className="text-accent">컴퓨터</span>학부 학사
            </span>
            <br />
            <span>졸업 예정</span>
          </p>
        </ArticleHeader>
      </Article>
      <Article>
        <ArticleHeader
          image={
            <ArticleImage
              src="https://school.jje.go.kr/images/web/namju-h/sub/symbol_02.png"
              alt="남주고등학교 상징마크, 하늘을 향해 있는 3개의 펜촉 모양"
              className="bg-white"
            />
          }
        >
          <div>March 2017 - February 2020</div>
          <ArticleTitle href="https://school.jje.go.kr/namju-h/main.do">
            NAMJU <span className="text-accent">HIGH</span>&nbsp;SCHOOL
          </ArticleTitle>
          <p>
            <span className="text-2xl">
              인문계열 <span className="text-accent">이과</span>
            </span>
            <br />
            <span>졸업</span>
          </p>
        </ArticleHeader>
      </Article>
    </Section>
  );
}
