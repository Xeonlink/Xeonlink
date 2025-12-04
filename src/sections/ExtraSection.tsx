import { Article } from "@/components/article";
import { Link, LinkIcon } from "@/components/link";
import { Section } from "@/components/section";

export function ExtraSection() {
  return (
    <Section id="extra" title="기타">
      <Article>
        <div className="flex flex-col space-y-8 md:space-y-10">
          <div>
            <h3 className="text-3xl">
              <Link href="https://github.com/Xeonlink/kaptch" className="border-underline">
                Kaptch
              </Link>
              &nbsp;
              <LinkIcon />
            </h3>
            <p className="mt-1 max-w-140 break-keep">
              Kaptch는 한국 모바일인증 서비스의 <span className="text-accent font-bold">캡챠를 자동으로 인식</span>
              하는
              <span className="text-accent font-bold">CLI도구</span> 입니다. Kaptcha는 데이터를 수집에서 모델을 만드는
              과정까지 필요한 명령어를 필요한 명령어를 CLI에서 조작할 수 있도록 합니다.
            </p>
          </div>
        </div>
      </Article>
      <Article>
        <div className="flex flex-col space-y-8 md:space-y-10">
          <div>
            <h3 className="text-3xl">
              <Link href="https://github.com/Xeonlink/LoanService" className="border-underline">
                LoanService
              </Link>
              &nbsp;
              <LinkIcon />
            </h3>
            <p className="mt-1 max-w-140 break-keep">
              LoanService는 인터넷이 되지 않는 환경에서도 작동하는{" "}
              <span className="text-accent font-bold">도서 관리 프로그램</span> 입니다. 일반적으로 사용되는 도서
              대출·반납 시스템의 기능들을 사용할 수 있습니다.
            </p>
          </div>
        </div>
      </Article>
    </Section>
  );
}
