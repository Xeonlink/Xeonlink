import { Section } from "../components/section";
import { LinkIcon } from "lucide-react";
import tempImage from "@/assets/selfie0_crop2.jpeg";
import 정보처리기사자격증Image from "@/assets/정보처리기사자격증.jpeg";

export function CertificationSection() {
  return (
    <Section id="certification">
      <h1 className="text-5xl font-bold">기술 자격증</h1>
      <article className="flex flex-wrap justify-between gap-4">
        <div>
          <a
            href="https://www.q-net.or.kr/crf005.do?id=crf00503&jmCd=1320"
            className="text-4xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="inline border-b border-transparent hover:border-white">
              정보 처리 <span className="text-red-400">기사</span>
            </h2>
            &nbsp;
            <LinkIcon className="inline size-5" />
          </a>
          <p className="mt-1">
            <span className="text-xl">한국산업인력공단</span>
            <br />
            February 2026
          </p>
        </div>
        <img src={정보처리기사자격증Image} alt="정보처리기사자격증" className="size-32 rounded-3xl object-cover" />
      </article>
      <article className="flex flex-wrap justify-between gap-4">
        <div>
          <a
            href="https://www.dataq.or.kr/www/sub/a_04.do"
            className="text-4xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="inline border-b border-transparent hover:border-white">
              SQL <span className="text-red-400">개발자</span> (SQLD)
            </h2>
            &nbsp;
            <LinkIcon className="inline size-5" />
          </a>
          <p className="mt-1">
            <span className="text-xl">한국데이터산업진흥원</span>
            <br />
            February 2026
          </p>
        </div>
        <img src={tempImage} alt="SQLD 자격증" className="size-32 rounded-3xl object-cover" />
      </article>
    </Section>
  );
}
