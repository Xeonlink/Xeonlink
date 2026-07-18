import { post } from "@/features/post/components";
import { code } from "@/shared/components/code";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_blog/posts/modules-without-export")({
  head: () => ({
    meta: [
      { title: "export 없이 모듈 사용하기" },
      {
        name: "description",
        content: "모듈의 구성 요소를 export없이 외부로 노출하는 기발한 방식",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <post.main>
      <post.header>
        <post.writedate>2025년 3월</post.writedate>
        <post.h1>export 없이 모듈 사용하기</post.h1>
        <post.subtitle>
          모듈의 구성 요소를 export없이 외부로 노출하는 방법 - feat. python
        </post.subtitle>
      </post.header>

      <post.section>
        <post.h2>경계에 의한 복잡성</post.h2>
        <post.p>
          프로젝트를 진행하다보면, 모듈의 구성요소를 외부로 노출하고 싶어지는
          때가 생깁니다. 우리는 그럴 때마다 export 키워드를 사용합니다. 하지만
          아래와 같은 경우라면 어떨까요?
        </post.p>
        <Tabs defaultValue="a_handlers">
          <TabsList className="w-full">
            <TabsTrigger value="a_handlers">a_handlers.ts</TabsTrigger>
            <TabsTrigger value="b_handlers">b_handlers.ts</TabsTrigger>
            <TabsTrigger value="handlers">handlers.ts</TabsTrigger>
          </TabsList>
          <TabsContent value="a_handlers">
            <code.tsx>{A_HANDLER}</code.tsx>
          </TabsContent>
          <TabsContent value="b_handlers">
            <code.tsx>{B_HANDLER}</code.tsx>
          </TabsContent>
          <TabsContent value="handlers">
            <code.tsx>{HANDLERS}</code.tsx>
          </TabsContent>
        </Tabs>
        <post.p>
          a와 b가 독립적이라면 이와 같이 나누는 것은 아키텍쳐 관점에서 흔합니다.
          하지만 이런 편의를 위해서 c · d 등의 파일을 추가한다면, handlers.ts에
          boilerplate 코드가 쌓이게 됩니다.
        </post.p>
        <post.p>
          또한 named export를 사용하면, 모든 handler의 이름을 다르게
          정해야하므로 관리부담이 늘어나게 됩니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>Python의 register 패턴</post.h2>
        <post.p>
          문제를 해결하기 위해, 파이썬의 독특한 register Decorator 패턴을
          참고했습니다.
        </post.p>
        <Tabs defaultValue="decorator">
          <TabsList className="w-full">
            <TabsTrigger value="decorator">regist Decorator</TabsTrigger>
            <TabsTrigger value="registers">handlers.py</TabsTrigger>
          </TabsList>
          <TabsContent value="decorator">
            <code.python>{REGIST_DECORATOR}</code.python>
          </TabsContent>
          <TabsContent value="registers">
            <code.python>{HANDLERS_PY}</code.python>
          </TabsContent>
        </Tabs>
        <post.p>
          파이썬에서는 위와 같이 register Decorator를 정의해서, 함수에 붙이는
          것으로 registry에 해당 함수를 등록할 수 있도록하는 패턴이 있습니다. 이
          패턴은 등록해야하는 함수가 매우 많거나, 서로 멀리 떨어져 있는 경우에
          유용하게 쓰일 수 있습니다.
        </post.p>
        <code.tsx>{REGISTER_TS}</code.tsx>
        <post.p>
          하지만 typescript에서 decorator는 python과 동일하게 작동하지 않기
          때문에, HOF(High Order Function)을 사용하는 방법으로 구현할 수
          있습니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>Tree Shaking 방지</post.h2>
        <post.p>
          export 할 필요도 import 할 필요도 사라졌습니다. 하지만 현대의
          bundler는 export import하지 않은 대상은 Tree Shaking 하여 bundle에서
          제거해버리기 때문에 nodejs에서 사용하면 registry에 아무것도 등록되지
          않는 문제가 발생합니다.
        </post.p>
        <Tabs defaultValue="register">
          <TabsList className="w-full">
            <TabsTrigger value="register">register</TabsTrigger>
            <TabsTrigger value="handler">handlers.ts</TabsTrigger>
          </TabsList>
          <TabsContent value="register">
            <code.tsx>{REGISTER_TS_NOT}</code.tsx>
          </TabsContent>
          <TabsContent value="handler">
            <code.tsx>{HANDLER_TS}</code.tsx>
          </TabsContent>
        </Tabs>
        <post.p>
          이 문제는 dynamic import를 사용하여 해결할 수 있습니다. bundler는
          dynamic import하는 대상은 Tree Shaking 하지 않으므로, 안전하게 모든
          내용을 가져올 수 있습니다.
        </post.p>
        <code.tsx>{DYNAMIC_IMPORT_TS}</code.tsx>
        <post.p>
          이제 <code.tsx variant="inline">await loadHandlers()</code.tsx>를
          사용하여 export 없이 모듈을 가져오고 등록된 registry를 가져오도록
          보장받을 수 있습니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>마무리</post.h2>
        <post.p>
          초기에 생각했던 모든 문제점을 해결하지는 못했습니다. 특히 관리부담이
          handler 각각에서 dynamic import로 옮겨간 점은, 이 방법이 완벽한
          해결책이 될 수 없다는 점을 알 수 있습니다.
        </post.p>
        <post.p>
          하지만 이 방법은 named export의 필요성을 줄이고, file의 존재여부를
          통한 code gen 가능성을 높이는 긍정적인 면도 있습니다. 가능하다면
          나중에는 bundler의 플러그인을 통해 자동으로{" "}
          <code.tsx variant="inline">async function loadHandlers()</code.tsx>를
          생성할 수 있다면 나쁘지 않은 디자인 패턴이 될 수 있을 것 같습니다.
        </post.p>
      </post.section>
    </post.main>
  );
}

const A_HANDLER = `export const handler0 = defineHandler("handler0", {
  match: () => { ... },
  handle: () => { ... }
});

export const handler1 = defineHandler("handler1", {
  match: () => { ... },
  handle: () => { ... }
});

export const handler2 = defineHandler("handler2", {
  match: () => { ... },
  handle: () => { ... }
});`;

const B_HANDLER = `export const handler3 = defineHandler("handler3", {
  match: () => { ... },
  handle: () => { ... }
});

export const handler4 = defineHandler("handler4", {
  match: () => { ... },
  handle: () => { ... }
});

export const handler5 = defineHandler("handler5", {
  match: () => { ... },
  handle: () => { ... }
});`;

const HANDLERS = `import { handler0, handler1, handler2 } from "./a_handlers";
import { handler3, handler4, handler5 } from "./b_handlers";

export const handlers = [
  handler0,
  handler1,
  handler2,
  handler3,
  handler4,
  handler5,
];`;

const REGIST_DECORATOR = `from typing import Callable

registry = dict[str, Callable]()

def register(fn: Callable):
    registry[fn.__name__] = fn
    return fn
`;

const HANDLERS_PY = `@register
def handler0(data: Data):
    return data

@register
def handler1(data: Data):
    return data

@register
def handler2(data: Data):
    return data
`;

const REGISTER_TS = `const registry = new Map<string, any>();

export const register = (name: string, fn: any) => {
    registry.set(name, fn);
    return fn;
};`;
const REGISTER_TS_NOT = `
const registry = new Map<string, any>();
   // ^^^^^^^^ 아무 것도 들어있지 않음

export const register = (name: string, fn: any) => {
    registry.set(name, fn);
    return fn;
};`;

const HANDLER_TS = `register("handler0", (data: any) => {
    return data;
});

register("handler1", (data: any) => {
    return data;
});

register("handler2", (data: any) => {
    return data;
});`;

const DYNAMIC_IMPORT_TS = `async function loadHandlers() {
  await import("./a_handlers");
  await import("./b_handlers");
  await import("./c_handlers");
  await import("./d_handlers");
  ...

  return registry;
}`;
