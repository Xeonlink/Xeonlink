import { Article, ArticleHeader, ArticleTitle } from "@/components/article";
import { Section } from "@/components/section";
import { Strong } from "@/components/strong";

export function ExtraSection() {
  return (
    <Section id="extra" title="기타">
      <Article>
        <ArticleHeader>
          <ArticleTitle as="h2" href="https://github.com/Xeonlink/kaptch">
            Kaptch
          </ArticleTitle>
          <p>
            Kaptch는 한국 모바일인증 서비스의 <Strong>캡챠를 자동으로 인식</Strong>하는 AI모델을 만들기 위한{" "}
            <Strong>CLI도구</Strong> 입니다. <br />
            Kaptcha는 데이터를 수집에서 모델을 만드는 과정까지 필요한 명령어를 CLI에서 조작할 수 있도록 합니다.
          </p>
        </ArticleHeader>
      </Article>
      <Article>
        <ArticleHeader>
          <ArticleTitle as="h2" href="https://github.com/Xeonlink/LoanService">
            LoanService
          </ArticleTitle>
          <p>
            LoanService는 인터넷이 되지 않는 환경에서도 작동하는 <Strong>도서 관리 프로그램</Strong> 입니다. <br />
            일반적으로 사용되는 도서 대출·반납 시스템의 기능들을 사용할 수 있습니다.
          </p>
        </ArticleHeader>
      </Article>
    </Section>
  );
}
