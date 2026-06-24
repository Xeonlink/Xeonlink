import 정보처리기사자격증Image from "@/assets/engineer_information_processing_cert.jpeg";
import SQLD자격증Image from "@/assets/sqld_cert.png";
import { Article, ArticleImage } from "@/features/resume/components/article";
import { ExternalLink, LinkIcon } from "@/features/resume/components/external-link";
import { Section } from "@/features/resume/components/section";

export function CertificationSection() {
  return (
    <Section id="certification" title="기술 자격증">
      <Article>
        <ArticleImage src={정보처리기사자격증Image} alt="정보처리기사자격증" className="object-cover" />
        <div className="flex flex-col">
          <span>June 2025</span>
          <ExternalLink href="https://www.q-net.or.kr/crf005.do?id=crf00503&jmCd=1320">
            <h2 className="text-3xl inline-block border-underline">
              정보 처리 <span className="text-accent font-bold">기사</span>
            </h2>
            &nbsp;
            <LinkIcon />
          </ExternalLink>
          <span className="text-xl">한국산업인력공단</span>
        </div>
      </Article>

      <Article>
        <ArticleImage src={SQLD자격증Image} alt="SQLD 자격증" className="object-cover" />
        <div className="flex flex-col">
          <span>Sep 2025</span>
          <ExternalLink href="https://www.dataq.or.kr/www/sub/a_04.do">
            <h2 className="text-3xl inline-block border-underline">
              SQL <span className="text-accent font-bold">개발자</span> (SQLD)
            </h2>
            &nbsp;
            <LinkIcon />
          </ExternalLink>
          <span className="text-xl">한국데이터산업진흥원</span>
        </div>
      </Article>
    </Section>
  );
}
