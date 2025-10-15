import ssuImage from "@/assets/ssu.jpg";
import { Article, ArticleHeader, ArticleImage, ArticleTitle } from "@/components/article";
import { Section } from "@/components/section";
import { Strong } from "@/components/strong";

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
          <ArticleTitle as="h2" label="March 2020 - February 2026" href="https://cse.ssu.ac.kr/">
            SOONGSIL <Strong>UNIV</Strong>ERSITY
          </ArticleTitle>
          <p>
            <span className="text-2xl">
              <Strong>컴퓨터</Strong>학부 학사
            </span>
            <br />
            졸업 예정
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
          <ArticleTitle as="h2" label="March 2017 - February 2020" href="https://school.jje.go.kr/namju-h/main.do">
            NAMJU <Strong>HIGH</Strong> SCHOOL
          </ArticleTitle>
          <p>
            <span className="text-2xl">
              인문계열 <Strong>이과</Strong>
            </span>
            <br />
            졸업
          </p>
        </ArticleHeader>
      </Article>
    </Section>
  );
}
