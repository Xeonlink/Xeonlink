import { post } from "@/features/post/components";
import { code } from "@/shared/components/code";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownIcon } from "lucide-react";

export const Route = createFileRoute("/posts/prettier-architecture")({
  head: () => ({
    meta: [
      { title: "Prettier Plugin Architecture — parser와 printer" },
      {
        name: "description",
        content:
          "Prettier 플러그인 아키텍처 분석. findLast override, parser/printer 선택, astFormat 연결, 포맷 파이프라인.",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <post.main>
      <post.header>
        <post.writedate>2025년 9월</post.writedate>
        <post.h1>Prettier의 이상한 구조</post.h1>
        <post.subtitle>parser와 printer, 그리고 마지막 플러그인만 남는 구조</post.subtitle>
      </post.header>

      <post.section>
        <post.h2>마지막 플러그인만 적용된다</post.h2>
        <post.p>
          Prettier에 플러그인을 여러개 적용시키면 가끔 앞쪽 플러그인이 무시되는 현상이 발생합니다. 때문에 몇몇
          플러그인은 플러그인을 적용할 때, 가장 마지막에 놓아달라고 요청하는 경우도 있습니다. 예를 들어{" "}
          <code.json variant="inline">{`"prettier-plugin-tailwindcss"`}</code.json> 의 경우에는 .prettierrc 파일에
          아래와 같이 설정하라고 안내하고 있습니다.
        </post.p>
        <code.json>{TAILWINDCSS_PLUGIN_INSTRUCTION}</code.json>
        <post.p>
          Prettier 에서 플러그인이 어떻게 동작하길레 이런 현상이 발생하는 것일까요? 그것은 prettier가 어떻게 plugin을
          다루는지 그리고 plugin이 parser와 printer를 선택하는지를 보면 알 수 있습니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>모든 것은 플러그인</post.h2>
        <post.p>
          Prettier는 처음부터 플러그인없이는 동작하지 않도록 설계되어 있습니다. 즉, 모든 것의 시작은 모든 플러그인을
          불러와 배열에 담는 것부터 시작한다고 할 수 있습니다. 이를 prettier 코드에서 살펴보면 withPlugins 함수가 그
          역할을 수행합니다.
        </post.p>
        <code.js>{WITH_PLUGINS}</code.js>
        <post.p>
          각 함수의 이름에서도 알 수 있듯이 내장 플러그인과 사용자가 정의한 플러그인을 불러와서 하나의 배열에 합치고
          있습니다. 내장 기능과 사용자 정의 플러그인을 위한 설계를 분리하지 않고 한꺼번에 처리하는 방식은 format을 위한
          로직을 중복해서 만들 필요가 없었을 것입니다. 또한 core는 플러그인의 동작을 보조하는 것에 집중할 수 있고,
          plugin은 언어별로 format을 위한 로직에 집중할 수 있었을 것으로 예상됩니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>플러그인 인터페이스와 동작</post.h2>
        <post.p>
          Prettier의 플러그인은 크게 3개의 부분, language 와 parser 그리고 printer로 나누어져 있습니다. language까지
          하면 설명이 길어지므로 parser와 printer에만 집중하겠습니다. parser는 raw file을 AST(Abstract Syntax Tree)로
          변환하고, printer는 AST를 formatted string으로 변환합니다.
        </post.p>
        <div className="flex items-center gap-2 justify-center py-4 max-md:flex-col">
          <div className="rounded-md border p-2">source code (file)</div>
          <ArrowDownIcon className="w-4 h-4 md:-rotate-90" />
          <div className="rounded-md border border-accent p-2">parser</div>
          <ArrowDownIcon className="w-4 h-4 md:-rotate-90" />
          <div className="flex md:flex-col gap-2 text-center">
            <div className="rounded-md border p-2">AST</div>
            <div className="rounded-md border p-2">astFormat</div>
          </div>
          <ArrowDownIcon className="w-4 h-4 md:-rotate-90" />
          <div className="rounded-md border border-accent p-2">printer</div>
          <ArrowDownIcon className="w-4 h-4 md:-rotate-90" />
          <div className="rounded-md border p-2">formatted string</div>
        </div>
        <post.p>
          plugin이 하나만 있다면, 이 작동방식은 굉장히 합리적입니다. 파일은 parser를 지나서 AST로 변환되고, printer를
          지나서 얻은 formatted string을 파일에 씁니다. 모든 파일에 대해서 동일한 작업을 수행하면, 포맷팅 작업을 완료할
          수 있을 것입니다.
        </post.p>
        <post.p>
          하지만 하나의 parser로는 모든 파일을 포맷할 수는 없습니다. 가령 어떤 프로젝트는 python과 nodejs를 동시에
          사용할 수도 있고, vue나 svelte처럼 html parser와 estree(js) parser를 동시에 사용해야하는 경우도 있습니다.
          이러한 경우에 우리는 여러개의 parser와 여러개의 printer가 필요해집니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>Parser - 모든 문제의 시작</post.h2>
        <post.p>
          플러그인이 여러개라면, 위에서 설명한 플러그인 배열은 다음과 같이 나타낼 수 있습니다. 간단하게 나타내기 위해
          다음의 3개의 플러그인만 있다고 가정하겠습니다.
        </post.p>
        <div className="w-full overflow-x-auto p-4 bg-background">
          <div className="justify-center flex items-center gap-2 py-4 min-w-max">
            <span className="text-6xl">[</span>
            <div className="flex flex-col gap-2 justify-center">
              <div className="rounded-md border p-2 dark:text-blue-300 text-blue-600">html parser</div>
              <div className="rounded-md border p-2 dark:text-green-300 text-green-600">html printer</div>
            </div>
            <span className="text-6xl">, </span>
            <div className="flex flex-col gap-2 justify-center">
              <div className="rounded-md border p-2 dark:text-blue-300 text-blue-600">css parser</div>
              <div className="rounded-md border p-2 dark:text-green-300 text-green-600">css printer</div>
            </div>
            <span className="text-6xl">, </span>
            <div className="flex flex-col gap-2 justify-center">
              <div className="rounded-md border p-2 dark:text-blue-300 text-blue-600">estree parser</div>
              <div className="rounded-md border p-2 dark:text-green-300 text-green-600">estree printer</div>
            </div>
            <span className="text-6xl">]</span>
          </div>
        </div>
        <post.p>
          Prettier core는 어떤 방식으로 parser를 고를까요? 그것은 이전 단에서 건너뛰었던 language 를 참고하여
          결정합니다. 아래는 language 의 핵심 부분만 추려봤습니다.
        </post.p>
        <code.tsx>{PLUGIN_LANGUAGE}</code.tsx>
        <post.p>
          Prettier는 language를 사용해서 파일 이름이 동일한지 확인하고, 확장자가 동일한지 확인하고, name이 shebang(#!)과
          동일한지 확인합니다. 하나라도 걸리면 해당 language에 정의된 parser 이름을 사용합니다.
        </post.p>
        <div className="w-full overflow-x-auto p-4 bg-background">
          <div className="justify-center flex items-center gap-2 py-4 min-w-max">
            <span className="text-6xl">[</span>
            <div className="flex flex-col gap-2 justify-center">
              <div className="rounded-md border p-2 dark:text-blue-300 text-blue-600">html parser</div>
              <div className="rounded-md border p-2 dark:text-green-300 text-green-600">html printer</div>
            </div>
            <span className="text-6xl">, </span>
            <div className="flex flex-col gap-2 justify-center">
              <div className="rounded-md border p-2 dark:text-blue-300 text-blue-600 border-white">css parser</div>
              <div className="rounded-md border p-2 dark:text-green-300 text-green-600">css printer</div>
            </div>
            <span className="text-6xl">, </span>
            <div className="flex flex-col gap-2 justify-center">
              <div className="rounded-md border p-2 dark:text-blue-300 text-blue-600">estree parser</div>
              <div className="rounded-md border p-2 dark:text-green-300 text-green-600">estree printer</div>
            </div>
            <span className="text-6xl">]</span>
            <span className="text-3xl">
              .findLast(<span className="dark:text-blue-300 text-blue-600">css parser</span>)
            </span>
          </div>
        </div>
        <post.p>
          위의 예시와 같이 모든 parser의 이름이 다르다면 매우 명확하게 1개의 parser가 선택됩니다. 하지만 만약 동일한
          이름의 parser가 있다면 어떻게 될까요?
        </post.p>
        <div className="w-full overflow-x-auto p-4 bg-background">
          <div className="justify-center flex items-center gap-2 py-4 min-w-max">
            <span className="text-6xl">[</span>
            <div className="flex flex-col gap-2 justify-center">
              <div className="rounded-md border p-2 dark:text-blue-300 text-blue-600">html parser</div>
              <div className="rounded-md border p-2 dark:text-green-300 text-green-600">html printer</div>
            </div>
            <span className="text-6xl">, </span>
            <div className="flex flex-col gap-2 justify-center">
              <div className="rounded-md border p-2 dark:text-blue-300 text-blue-600 dark:border-red-300 border-red-600">
                estree parser
              </div>
              <div className="rounded-md border p-2 dark:text-green-300 text-green-600">estree printer</div>
            </div>
            <span className="text-6xl">, </span>
            <div className="flex flex-col gap-2 justify-center">
              <div className="rounded-md border p-2 dark:text-blue-300 text-blue-600 border-white">estree parser</div>
              <div className="rounded-md border p-2 dark:text-green-300 text-green-600">estree printer</div>
            </div>
            <span className="text-6xl">]</span>
            <span className="text-3xl">
              .findLast(<span className="dark:text-blue-300 text-blue-600">estree parser</span>)
            </span>
          </div>
        </div>
        <post.p>
          Prettier는 <code.tsx variant="inline">Array.findLast()</code.tsx> 를 사용하기 때문에 가장 마지막 parser가
          선택됩니다. 이름이 같은 다른 parser는 무시됩니다. 그런데 이런 질문이 있을 수 있습니다.{" "}
          {`"하나의 언어를 처리하는 parser는 1개만 있어야하는게 정상 아닌가요?"`} 매우 맞는 말입니다. Prettier를 만든
          개발자분도 사용자들이 그렇게 사용하는 것을 염두해두신 것이 아닌가 싶습니다. 하지만 실제 사용에서는 다음과 같은
          문제가 있습니다.
        </post.p>
        <code.json>{PRETTIER_PLUGINS_EXAMPLE}</code.json>
        <post.p>
          세 플러그인은 하는일은 다르지만 전부 estree parser를 사용합니다. 하지만 parser의 이름만 같을 뿐, 출력되는
          AST의 형식이 모두 다릅니다.{" "}
          <code.json variant="inline">{`"@xeonlink/prettier-plugin-organize-attributes"`}</code.json> 의 parser만
          실행되고, 그에 맞는 AST가 생성될 뿐입니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>Printer — 이것도 똑같다.</post.h2>
        <post.p>
          parser가 만든 <code className="text-foreground">astFormat</code> 문자열로 printer 를 찾습니다. parser 이름이
          아니라 AST 형식 이름(astFormat)이 키입니다. 마치 language 에서 parser 이름을 찾는 것과 같이 astFormat을
          이용해서 printer를 찾습니다. printer도 마찬가지로 <code.ts variant="inline">Array.findLast()</code.ts> 를
          사용해서 가장 마지막 printer가 선택됩니다.
        </post.p>
        <div className="w-full overflow-x-auto p-4 bg-background">
          <div className="justify-center flex items-center gap-2 py-4 min-w-max">
            <span className="text-6xl">[</span>
            <div className="flex flex-col gap-2 justify-center">
              <div className="rounded-md border p-2 dark:text-blue-300 text-blue-600">html parser</div>
              <div className="rounded-md border p-2 dark:text-green-300 text-green-600">html printer</div>
            </div>
            <span className="text-6xl">, </span>
            <div className="flex flex-col gap-2 justify-center border rounded-xl p-2">
              <div className="rounded-md border p-2 dark:text-blue-300 text-blue-600 dark:border-blue-300 border-blue-600">
                estree parser
              </div>
              <div className="rounded-md border p-2 dark:text-green-300 text-green-600">estree printer</div>
            </div>
            <span className="text-6xl">, </span>
            <div className="flex flex-col gap-2 justify-center">
              <div className="rounded-md border p-2 dark:text-blue-300 text-blue-600">jsx parser</div>
              <div className="rounded-md border p-2 dark:text-green-300 text-green-600 border-white">
                estree printer
              </div>
            </div>
            <span className="text-6xl">]</span>
            <span className="text-3xl">
              .findLast(<span className="dark:text-green-300 text-green-600">estree</span>)
            </span>
          </div>
        </div>
        <post.p>
          하지만 여기서도 주의해야할 점이 있습니다. 바로 선택된 parser와 printer가 같은 플러그인 정의에 있지 않을 수
          있습니다. 위의 예시를 보면 parse는 estree parser이지만, printer는 jsx parser와 엮인 estree printer 가 선택될
          수 있습니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>코드를 분석하면서</post.h2>
        <post.p>
          Prettier 코드를 분석하니, 왜 <code.json variant="inline">{`"prettier-plugin-tailwindcss"`}</code.json> 가
          마지막에 와야하는 이유를 알 수 있었습니다. language와 parser, parser와 printer 사이의 연결을 위한 parser name,
          astFormat 값을 두는 것은 하나의 큰 모듈을 두지 않고 목적에 따라 코드를 분리하여 복잡도를 높이지 않기 위한
          선택이었을지도 모릅니다.
        </post.p>
        <post.p>
          구조가 이해가 안되는 것은 아닙니다. prettier가 만들어질 때, lint 기능과 별도로 formatting 만을 위한 기능을
          만을 위해서 만들어졌기 때문입니다. 그렇게 생각하면 왜 하나의 파일에는 하나의 parser와 printer가 사용되야하는지
          이해가 됩니다. 언어에 맞는 포맷규칙은 1개만 있는 것이 합리적이기 때문입니다.
        </post.p>
        <post.p>
          그러나 그것과 별개로 확장성에서는 문제가 있습니다. 작은 포맷 옵션들을 쪼개서 사용할 수 없고, 필요한 모든
          기능을 담은 customer parser와 printer가 1개만 존재해야하기 때문입니다.
        </post.p>
      </post.section>
    </post.main>
  );
}
const WITH_PLUGINS = `// src/index.js — withPlugins()
function withPlugins(fn, optionsArgumentIndex = 1) {
  return async (...args) => {
    const options = args[optionsArgumentIndex] ?? {};
    const { plugins = [] } = options;

    args[optionsArgumentIndex] = {
      ...options,
      plugins: (
        await Promise.all([
          loadBuiltinPlugins(),   // 내장 언어 플러그인 (앞)
          loadPlugins(plugins),   // 사용자 플러그인 (뒤)
        ])
      ).flat(),
    };

    return fn(...args);
  };
}`;

const TAILWINDCSS_PLUGIN_INSTRUCTION = `// .prettierrc
{
  // ..
  "plugins": [
    "prettier-plugin-svelte",
    "prettier-plugin-organize-imports",
    "prettier-plugin-tailwindcss" // MUST come last
  ]
}`;

const PLUGIN_LANGUAGE = `{
  languages: Array<{
    name: string;           // 언어의 이름
    parsers: string[];      // 사용 가능한 parser 이름들
    ...
    extensions?: string[];  // 파일 확장자가 같은지 확인
    filenames?: string[];   // 파일 이름이 같은지 확인
    ...
  }>;
}`;

const PRETTIER_PLUGINS_EXAMPLE = `// .prettierrc
{
  "trailingComma": "all",
  "plugins": [
    // import 정렬 -> estree parser 사용
    "@trivago/prettier-plugin-sort-imports",
    // 중괄호 위치 및 존재여부 조정 -> estree parser 사용
    "prettier-plugin-curly",
    // jsx 속성 정렬 -> estree parser 사용
    "@xeonlink/prettier-plugin-organize-attributes"
  ]
}
`;
