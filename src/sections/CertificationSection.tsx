import SQLD자격증Image from "@/assets/SQLD자격증.png";
import 정보처리기사자격증Image from "@/assets/정보처리기사자격증.jpeg";
import { Article, ArticleHeader, ArticleImage, ArticleTitle } from "@/components/article";
import { Section } from "@/components/section";
import { Strong } from "@/components/strong";

export function CertificationSection() {
  return (
    <Section id="certification" title="기술 자격증">
      <Article>
        <ArticleHeader
          image={<ArticleImage src={정보처리기사자격증Image} alt="정보처리기사자격증" className="object-cover" />}
        >
          <ArticleTitle label="June 2025" href="https://www.q-net.or.kr/crf005.do?id=crf00503&jmCd=1320">
            정보 처리 <Strong>기사</Strong>
          </ArticleTitle>
          <p>
            <span className="text-xl">한국산업인력공단</span>
          </p>
        </ArticleHeader>
      </Article>
      <Article>
        <ArticleHeader image={<ArticleImage src={SQLD자격증Image} alt="SQLD 자격증" className="object-cover" />}>
          <ArticleTitle label="Sep 2025" href="https://www.dataq.or.kr/www/sub/a_04.do">
            SQL <Strong>개발자</Strong> (SQLD)
          </ArticleTitle>
          <p>
            <span className="text-xl">한국데이터산업진흥원</span>
          </p>
        </ArticleHeader>
      </Article>
    </Section>
  );
}
