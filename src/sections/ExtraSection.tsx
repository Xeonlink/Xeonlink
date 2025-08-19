import { LinkIcon } from "lucide-react";
import { Section } from "../components/section";

export function ExtraSection() {
  return (
    <Section id="extra">
      <h1 className="text-5xl font-bold">기타</h1>
      <article className="flex flex-wrap justify-between gap-4">
        <div>
          <a href="https://github.com/Xeonlink/kaptch" className="text-4xl">
            <h2 className="border-underline inline">Kaptch</h2>
            &nbsp;
            <LinkIcon className="inline size-5" />
          </a>
          <p className="mt-1">
            Kaptch는 한국 모바일인증 서비스의 <span className="text-accent">캡챠를 자동으로 인식</span>하는 AI모델을
            만들기 위한 <span className="text-accent">CLI도구</span> 입니다. <br />
            Kaptcha는 데이터를 수집에서 모델을 만드는 과정까지 필요한 명령어를 CLI에서 조작할 수 있도록 합니다.
          </p>
        </div>
      </article>
      <article className="flex flex-wrap justify-between gap-4">
        <div>
          <a href="https://github.com/Xeonlink/LoanService" className="text-4xl">
            <h2 className="border-underline inline">LoanService</h2>
            &nbsp;
            <LinkIcon className="inline size-5" />
          </a>
          <p className="mt-1">
            LoanService는 인터넷이 되지 않는 환경에서도 작동하는&nbsp;
            <span className="text-accent">도서 관리 프로그램</span> 입니다. <br />
            일반적으로 사용되는 도서 대출·반납 시스템의 기능들을 사용할 수 있습니다.
          </p>
        </div>
      </article>
    </Section>
  );
}
