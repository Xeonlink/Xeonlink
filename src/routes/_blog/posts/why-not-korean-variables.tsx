import { post } from "@/features/post/components";
import { code } from "@/shared/components/code";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_blog/posts/why-not-korean-variables")({
  head: () => ({
    meta: [
      { title: "왜 한글 변수를 사용하지 않는가?" },
      {
        name: "description",
        content:
          "어순·합성어·한영전환 피로라는 3가지 장벽, 그리고 AI 시대에 한글 식별자를 쓰는 기준",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <post.main>
      <post.header>
        <post.writedate>2026년 4월</post.writedate>
        <post.h1>왜 한글 변수를 사용하지 않는가?</post.h1>
        <post.subtitle>
          어순·합성어·한영전환 피로라는 3가지 장벽, 그리고 AI 시대에 한글
          식별자를 쓰는 기준
        </post.subtitle>
      </post.header>

      <post.section>
        <post.p>
          AI가 발전하면서 이제는 SW개발의 장벽이 많이 낮아졌다는 것을 느낍니다.
          디자이너가 웹UI를 바로 만들고, 기획자가 기획서가 아니라 프로토타입이나
          심지어는 MVP를 회의에 가져오는 일이 일어나고 있습니다. 또한 바이브
          코딩이 확산하면서, 간단한 자동화나 도구는 스스로 만들어 소비하는 일
          까지도 일어나고 있습니다.
        </post.p>
        <post.p>
          제 친구 중에도 하고 싶은 것, 만들고 싶은 것은 많지만 항상 시간이
          부족하다고 말하는 녀석이 있습니다. 얘는 바이브 코딩을 만나더니
          그럴싸한 시스템을 만들고 저에게 검토를 요청하면서 AI만든 읽을 수 없는
          코드를 들이밀기 시작했습니다.
        </post.p>
        <post.p>
          저는 어떻게하면 이 친구가 코드를 읽게할 수 있을지를 고민했고, 어쩌면
          한글 변수와 함수를 만들면 이 친구가 코드를 읽는데 도움이 될 것
          같았습니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>한글 변수를 사용한다는 것</post.h2>
        <post.p>
          사실 저는 이미 한글 변수와 함수를 시도해 본적이 있습니다. 개인
          프로젝트를 할 때도 시도해보았고, 팀 프로젝트를 할 때도 도입하려고
          했었습니다. 하지만 한글 변수와 함수가 가진 3가지 장벽에 막혀 끝까지
          사용한 적은 없었습니다.
        </post.p>
        <ul className="text-muted-foreground list-disc space-y-2 pl-6 leading-relaxed">
          <li>영어와의 혼용에서 오는 어순 문제</li>
          <li>합성어 띄어쓰기 규칙의 모호함</li>
          <li>잦은 한영전환에 의한 타이핑 피로감</li>
        </ul>
      </post.section>

      <post.section>
        <post.h2>영어와의 혼용에서 오는 어순 문제</post.h2>
        <post.p>
          프로그래밍 언어들은 대부분 영어로 되어있습니다. 때문에 영어로
          변수이름을 작성하는 것은 어찌보면 자연스러운 일입니다. 그렇기 때문에
          체계적으로 잘 짜여진 코드라면 영어를 읽을 수 있는 사람에게 자연스러운
          어순으로 보입니다.
        </post.p>
        <code.python>{IF_EXAMPLES}</code.python>
        <post.p>
          위와 같은 코드라면 각각 “내 이름이 없다면”, “내 이름이 다른 이름과
          같다면”으로 자연스럽게 읽힐 것입니다. 하지만 직독직해하면 “만약 내
          이름이 없다”, “만약 내 이름 있다 목록에”으로 어순이 이상해질 것입니다.
        </post.p>
        <post.p>
          이 것은 코드베이스에 한글을 점진적으로 적용할 때 치명적이며, 해석의
          방향이 일관되지 않아 읽기 힘든 코드를 만듭니다.
        </post.p>
        <code.python>{GET_MONEY}</code.python>
        <post.p>
          예시에서 보면{" "}
          <code.python variant="inline">def get_money()</code.python>에 경우
          왼쪽에서 오른쪽으로 읽었을 때, 함수의 목적(get)을 파악하기 쉽지만,{" "}
          <code.python variant="inline">def 돈_가져오기()</code.python>에
          경우에는 오른쪽부터 읽어야 함수의 목적(가져오기)을 파악하기 쉽습니다.
          즉, "한국어는 끝까지 들어봐야해!" 원칙이 오히려 방해가 되는 것입니다.
        </post.p>
        <post.p>
          사소한 차이지만 코드베이스에 점진적으로 한글을 적용함에 있어서 함수의
          핵심 카테고리를 찾는 과정에서 단계가 추가되어 피로가 쌓인다는 단점이
          있습니다.
        </post.p>
        <post.p>
          물론 동사는 영어로 쓰고 단어에서만 한글을 허용하는 방법으로 단점을
          보완할 수 있습니다.
        </post.p>
        <code.python>{GET_DON}</code.python>
        <post.p>
          동사와 형용사는 영어의 어순을 따르고, 동사는 영어를 사용하여 어순을
          보장하는 방법입니다. 이는 함수의 convention을 최대한 지키면서 목적어를
          한글로 바꿀 수 있어 괜찮은 접근법이 될 수 있습니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>합성어 띄어쓰기의 모호함과 글자 밀도</post.h2>
        <post.p>
          하지만 어순 문제만 해결한다고 모든 문제가 해결된 것은 아닙니다. 어순
          다음에는 합성어를 어떻게 보이게 할 것인가를 고민해보아야합니다.
          영어라면 아래와 같은 convention으로 합성어를 처리할 수 있습니다.
        </post.p>
        <code.python>{CASE_CONVENTIONS}</code.python>
        <post.p>
          하지만 한글은 대소문자 개념이 없으므로, 구분을 위해서는 snake case로
          작성될 수 밖에 없고, 그마저도 어디까지를 합성어로 볼 것인지에 대한
          의견차이 때문에, 일관된 규칙을 만들기 어렵습니다.
        </post.p>
        <code.python>{HANGUL_COMPOUND}</code.python>
        <post.p>
          만약 일관된 규칙을 위해 snake case를 쓰지 않고 전부 붙여쓴다면
          쌍자음이 많이 사용되는 경우에, 글자의 밀도가 높아져 쉽게 끊어읽지
          못하게 됩니다. 이는 부분적으로 가독성이 나빠지게하고 함수의 기능보다
          어떻게 끊어 읽어야할지 집중해야하는 인지의 병목이 됩니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>잦은 한영전환에 의한 타이핑 피로감</post.h2>
        <post.p>
          한글 이름들을 사용하면서 겪은 가장 큰 문제는 전환 피로감입니다.
          타이핑을 하면서 하나의 이름을 쓰더라도 키워드는 영어로, 변수는 한글로
          쓰다보면 한영키를 누르기 위해 키보드에서 손이 움직이는 범위가
          넓어집니다.
        </post.p>
        <code.python>{TYPING_FATIGUE}</code.python>
        <post.p>
          예시와 같은 경우라면 한영키를 3번이나 눌러야합니다. 한영키는
          윈도우라면 스페이스바 오른쪽, 맥이라면 CapsLock 자리에 있기 때문에
          쉽게 전환하기 어려워 일종의 병목지점처럼 작동하게 됩니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>AI 시대에 한글 변수, 함수</post.h2>
        <post.p>
          하지만 3가지 단점에도 불구하고 저는 친구의 코드베이스에 한글 변수
          skill을 만들어 활용하도록 하고 있습니다. 어순 문제는 단어만을 한글로
          작성하여 해결하도록 하고, snake case를 기본으로하여, 합성어 규칙을
          skill에 명시해 두었기 때문에 가능했습니다. 특히 타이핑 피로감은 AI가
          코드의 대부분을 만들었기에 가능했습니다.
        </post.p>
        <post.p>
          그렇다고 아무 곳에서나 한글을 사용하는 것은 아닙니다. 특히 skill을
          통해 주로 한글로 바꿨을 때, 글자의 시각적 길이가 크게 줄어드는
          곳에서만 사용하고 있습니다.
        </post.p>
        <code.python>{LENGTH_COMPARE}</code.python>
        <post.p>
          위의 예시는 실제로 코드베이스에 적용된 한글 함수를 가져온 것입니다.{" "}
          <code.python variant="inline">def _resolve_판매이유()</code.python> 나{" "}
          <code.python variant="inline">def _calc_목표수량()</code.python>을
          보면 영어로 작성한 것보다 한글로 작성한 것이 길이를 효과적으로 줄일 수
          있는 것을 볼 수 있습니다. 특히 한자어를 주로 사용할 수록 더 많이 줄일
          수 있습니다.
        </post.p>
        <code.python>{SHOULD_TAKE_PROFIT}</code.python>
        <post.p>
          하지만 이런 경우라면 어떨까요? 이 함수에서는 “should_take”에 “실현할
          것인지 말것인지 결정”이라는 많은 의미가 내포되어 있어 한글을 함수에
          도입하면, 딱 잘라서 동사와 단어를 나누기가 애매해집니다. 특히
          “should”에 한다 안한다의 두 의미가 모두 포함되어 있기 때문에, 한글로
          옮겼을 때 오히려 가독성이 나빠집니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>중요한 것은</post.h2>
        <post.p>
          여러번 한글 변수와 함수를 도입하면서, 결국 가장 중요한 것은 코드가 잘
          읽히는지 아닌지 였습니다. 언제나 상황과 목적에 맞는 적절한 단어가
          있고, 그 적절한 단어는 영어와 한글 어느쪽을 취사선택해서는 온전히 얻기
          어려웠습니다.
        </post.p>
        <post.p>
          코드의 비용이 엄청나게 줄어든 AI 시대에, 사람의 인지적 장벽이 새로운
          병목이 되고 있는 이 시대에, 한글 변수, 함수를 도입해 보는 것은
          어떨까요?
        </post.p>
      </post.section>
    </post.main>
  );
}

const IF_EXAMPLES = `my_name = "오지민"
if my_name is None: 
  pass
  
names: list[str] = ["오지민", "오오지민"]
if my_name in names:
  pass`;

const GET_MONEY = `def get_money(): 
  pass

def 돈_가져오기(): 
  pass`;

const GET_DON = `def get_money(): 
  pass

def get_돈(): 
  pass`;

const CASE_CONVENTIONS = `
def get_sell_reason_resolver(): 
  """snake case"""
  pass

def GetSellReasonResolver(): 
  """pascal case"""
  pass

def getSellReasonResolver(): 
  """camel case"""
  pass`;

const HANGUL_COMPOUND = `def get판매이유감지기(): 
  """글자의 밀도가 높아 읽기 어려움"""
  pass

def get_판매_이유_감지기(): 
  """구분할 수는 있지만, 길이가 길어짐"""
  pass

def get_판매이유_감지기(): 
  """적절하게 붙일 수 있지만, 합성어 견해차이가 발생할 수 있음"""
  pass`;

const TYPING_FATIGUE = `def get값Or기본값(): 
  """한영키를 3번 누르게 됨"""
  pass

def getValueOrDefault(): 
  """한영키를 누르지 않아도 됨"""
  pass`;

const LENGTH_COMPARE = `def _resolve_판매이유(...): 
  pass

def _resolve_sell_reason(...): 
  pass

def _calc_목표수량(...): 
  pass

def _calc_target_amount(...): 
  pass`;

const SHOULD_TAKE_PROFIT = `def _should_take_profit(...) -> bool:
    """어떤 주식 종목에서 수익을 실현할 것인지 말것인지 결정"""
    pass

def _수익_실현_또는_미실현_여부_결정(...) -> bool:
    pass`;
