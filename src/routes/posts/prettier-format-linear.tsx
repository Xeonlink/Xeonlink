import { post } from "@/features/post/components";
import { code } from "@/shared/components/code";
import { ScrollArea, ScrollBar } from "@/shared/components/ui/scroll-area";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRightIcon, CircleIcon, XIcon } from "lucide-react";

export const Route = createFileRoute("/posts/prettier-format-linear")({
  head: () => ({
    meta: [
      { title: "format-linear — findLast를 우회하는 선형 Prettier 플러그인" },
      {
        name: "description",
        content:
          "Proxy로 parser 선택을 가로채고 nested format()으로 Prettier 플러그인을 순서대로 실행하는 format-linear.mjs 설계.",
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
        <post.h1>Prettier - 모든 플러그인 통과시키기</post.h1>
        <post.subtitle>
          Proxy로 parser 선택을 가로채고, nested format()으로 플러그인을 모두
          적용시키는 방법
        </post.subtitle>
      </post.header>

      <post.section>
        <post.h2>문제 재확인</post.h2>
        <post.p>
          <Link
            className="text-foreground underline underline-offset-4"
            to="/posts/prettier-architecture"
          >
            Prettier의 이상한 구조
          </Link>
          에서 다룬 것처럼, Prettier는 parser를 고를 때{" "}
          <code.tsx variant="inline">Array.findLast()</code.tsx> 를 사용합니다.
          동일한 parser 이름을 쓰는 플러그인이 여러 개면 마지막 하나만 실행되고,
          앞쪽 플러그인은 무시됩니다.
        </post.p>
        <post.p>
          실제로 import 정렬, Tailwind class 정렬, JSX attribute 정렬처럼 estree
          parser를 공유하는 플러그인을 함께 쓰면, 배열 순서와 관계없이 마지막
          플러그인만 살아남습니다.{" "}
          <code.json variant="inline">{`"prettier-plugin-tailwindcss"`}</code.json>{" "}
          은 아예 &quot;MUST come last&quot;라고 문서에 적혀 있습니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>제작 목적</post.h2>
        <post.p>
          저는 prettier 플러그인을 여러 개 쓰면서, 각각의 변환을{" "}
          <strong className="text-foreground font-medium">순서대로 모두</strong>{" "}
          적용하고 싶었습니다. sort-imports → organize-imports → tailwindcss →
          organize-attributes처럼, 배열에 적은 순서가 곧 실행 순서가 되길
          원했습니다.
        </post.p>
        <post.p>
          Prettier core를 포크하거나 플러그인을 하나로 합치는 대신, 플러그인
          시스템 안에서 해결할 방법을 찾았습니다. 그 결과물이{" "}
          <code.json variant="inline">{`"format-linear.mjs"`}</code.json>{" "}
          입니다. .prettierrc.mjs에서는 항상 plugins 배열의{" "}
          <strong className="text-foreground font-medium">마지막</strong>에
          둡니다.
        </post.p>
        <code.js>{PRETTIERRC_EXAMPLE}</code.js>
      </post.section>

      <post.section>
        <post.h2>Prettier의 관문</post.h2>
        <post.p>
          format-linear가 파고든 지점은{" "}
          <a
            className="text-foreground underline underline-offset-4"
            href="https://github.com/prettier/prettier/blob/main/src/main/parser-and-printer.js"
            rel="noreferrer"
            target="_blank"
          >
            parser-and-printer.js
          </a>
          의{" "}
          <code.js variant="inline">
            function getParserPluginByParserName(...)
          </code.js>{" "}
          입니다. parser 이름으로 소스코드를 AST로 파싱할 수 있는 플러그인을
          찾습니다. 역순으로 plugins를 훑으며 플러그인이 parser 이름에 대응하는
          parser를 가지고 있는지 확인하고 선택합니다.
        </post.p>
        <code.js>{RESOLVE_PARSER}</code.js>
        <post.p>
          저는 특히 <code.js variant="inline">Object.hasOwn(...)</code.js> 의
          동작에 주목했습니다. Proxy를 사용하면 프로퍼티 조회 시 항상 true를
          반환하도록 만들 수 있을 것 같았습니다. format-linear 플러그인을
          plugins 배열에 마지막에 두는 것을 상정하긴 했지만, 어떤 parser 이름이
          들어오든 항상 선택될 수 있는 좋은 방법이 될 것 같았습니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>createAlwaysHasProxy — parser 가로채기</post.h2>
        <post.p>
          format-linear의 parsers 객체는 일반 객체가 아니라 Proxy입니다.{" "}
          <code.js variant="inline">Object.hasOwn(...)</code.js> 가 내부적으로
          사용하는 trap을 조작해, 어떤 parser 이름으로 조회해도 format-linear가
          해당 parser를 가진 것처럼 보이게 만들었습니다.
        </post.p>
        <code.js>{CREATE_ALWAYS_HAS_PROXY}</code.js>
        <post.p>
          <code.js variant="inline">has()</code.js> 가 항상 true를 반환하므로{" "}
          <code.js variant="inline">Object.hasOwn(...)</code.js> 는
          format-linear에 대해 항상 true입니다.{" "}
          <code.js variant="inline">babel</code.js>,{" "}
          <code.js variant="inline">typescript</code.js> 등 다른 이름도
          마찬가지입니다. findLast는 배열 끝에서부터 탐색하므로, plugins
          마지막에 둔 format-linear가 모든 parser 요청을 가로채어 처리하게
          됩니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>선형 파이프라인</post.h2>
        <post.p>
          format-linear의 parse 함수는 AST를 만들지 않습니다. 대신{" "}
          <code.js variant="inline">format()</code.js> 를 중첩 호출해
          .prettierrc 에 적힌 플러그인을 순차 실행합니다.
        </post.p>
        <code.js>{PARSE_LOOP}</code.js>
        <post.p>
          루프 변수 <code.js variant="inline">i</code.js> 가{" "}
          <code.js variant="inline">-pluginsLength + 1</code.js> 부터{" "}
          <code.js variant="inline">-1</code.js> 까지 증가하면서,{" "}
          <code.js variant="inline">slice(-pluginsLength, i)</code.js> 로 user
          plugins의 누적 prefix를 만듭니다. 예를 들어 plugin이{" "}
          <code.js variant="inline">[A, B, C, D, E, "format-linear"]</code.js>{" "}
          6개라면
        </post.p>
        <div className="border-border w-full overflow-x-scroll rounded-md border">
          <div className="grid w-110 min-w-full grid-cols-[--spacing(10)_auto_auto_1fr] gap-x-4 gap-y-2 px-4 py-3 text-lg">
            <div className="text-muted-foreground w-10 text-center">i</div>
            <div>
              <code.js variant="inline">slice(...)</code.js>
            </div>
            <div>
              <code.js variant="inline">[...]</code.js>
            </div>
            <div>
              <code.js variant="inline">findLast(...)</code.js>
            </div>
            <div className="border-border w-full border-b"></div>
            <div className="border-border w-full border-b"></div>
            <div className="border-border w-full border-b"></div>
            <div className="border-border w-full border-b"></div>

            <div className="text-muted-foreground w-10 text-center">-5</div>
            <div>
              <code.js variant="inline">slice(-6, -5)</code.js>
            </div>
            <div>
              <code.js variant="inline">[A]</code.js>
            </div>
            <div>
              <code.js variant="inline">A</code.js>
            </div>
            <div className="text-muted-foreground w-10 text-center">-4</div>
            <div>
              <code.js variant="inline">slice(-6, -4)</code.js>
            </div>
            <div>
              <code.js variant="inline">[A, B]</code.js>
            </div>
            <div>
              <code.js variant="inline">B</code.js>
            </div>
            <div className="text-muted-foreground w-10 text-center">-3</div>
            <div>
              <code.js variant="inline">slice(-6, -3)</code.js>
            </div>
            <div>
              <code.js variant="inline">[A, B, C]</code.js>
            </div>
            <div>
              <code.js variant="inline">C</code.js>
            </div>
            <div className="text-muted-foreground w-10 text-center">-2</div>
            <div>
              <code.js variant="inline">slice(-6, -2)</code.js>
            </div>
            <div>
              <code.js variant="inline">[A, B, C, D]</code.js>
            </div>
            <div>
              <code.js variant="inline">D</code.js>
            </div>
            <div className="text-muted-foreground w-10 text-center">-1</div>
            <div>
              <code.js variant="inline">slice(-6, -1)</code.js>
            </div>
            <div>
              <code.js variant="inline">[A, B, C, D, E]</code.js>
            </div>
            <div>
              <code.js variant="inline">E</code.js>
            </div>
          </div>
        </div>
        <post.p>위와 같은 순서대로 순차 포맷됩니다.</post.p>
      </post.section>

      <post.section>
        <post.h2>하위 parser에 의존하는 플러그인</post.h2>
        <post.p>
          그러면 여기서 의문이 생길 수 있습니다. 왜 A → B → C → D → E 순서대로
          실행하지 않고, 누적해서 실행해야할까요?
        </post.p>
        <ScrollArea>
          <div className="w-120 space-y-4 py-4">
            <div className="flex items-center gap-2">
              <div>
                ( <XIcon className="text-accent inline-block size-4" /> )
              </div>
              <div className="rounded-md border p-2">A</div>
              <ArrowRightIcon className="h-4 w-4" />
              <div className="rounded-md border p-2">B</div>
              <ArrowRightIcon className="h-4 w-4" />
              <div className="rounded-md border p-2">C</div>
              <ArrowRightIcon className="h-4 w-4" />
              <div className="rounded-md border p-2">D</div>
              <ArrowRightIcon className="h-4 w-4" />
              <div className="rounded-md border p-2">E</div>
            </div>
            <div className="flex items-center gap-2">
              <div>
                ( <CircleIcon className="inline-block size-4 text-green-400" />{" "}
                )
              </div>
              <div className="rounded-md border p-2">A</div>
              <ArrowRightIcon className="h-4 w-4" />
              <div className="rounded-md border p-2">A B</div>
              <ArrowRightIcon className="h-4 w-4" />
              <div className="rounded-md border p-2">A B C</div>
              <ArrowRightIcon className="h-4 w-4" />
              <div className="rounded-md border p-2">A B C D</div>
              <ArrowRightIcon className="h-4 w-4" />
              <div className="rounded-md border p-2">A B C D E</div>
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <post.p>
          그 이유는 몇몇 플러그인들이 하위 플러그인의 parser에 의존하기
          때문입니다. 예를 들어{" "}
          <code.json variant="inline">{`"@xeonlink/prettier-plugin-organize-attributes"`}</code.json>{" "}
          는 svelte 에서 동작하게 하려면 하위에{" "}
          <code.json variant="inline">{`"prettier-plugin-svelte"`}</code.json>{" "}
          가 있어야 합니다. 스스로 parser를 가지지 않고 하위 플러그인의 parser를
          사용해서 svelte를 사용하는 환경임을 확신하려는 설계의도가 담겨있기
          때문입니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>Printer - 그대로 통과</post.h2>
        <post.p>
          parser에서 AST를 만들지 않고, 포맷된 문자열을 바로 만들기 때문에
          printer는 그대로 통과시킵니다.
        </post.p>
        <code.js>{IDENTITY_PRINTER}</code.js>
      </post.section>

      <post.section>
        <post.h2>한계점</post.h2>
        <post.p>
          format-linear는 Prettier 내부 동작에 깊이 coupling되어 있습니다.{" "}
          <code.js variant="inline">Object.hasOwn(...)</code.js> + Proxy trap,
          findLast 역순 탐색, resolveConfig 캐시 — 이 중 하나라도 Prettier가
          바뀌면 깨질 수 있습니다.
        </post.p>
        <post.p>
          플러그인 N개에 대해 최대 N-1번 format()을 중첩 호출하므로, 플러그인이
          많을수록 느려집니다. vscode의 format on save로 prettier를 사용할 때는,
          하나의 파일만 변경되니까 크게 문제가 없으나,{" "}
          <code.json variant="inline">{`"prettier --write ."`}</code.json> 처럼
          batch format에는 눈에 띄게 느려집니다.
        </post.p>
      </post.section>
    </post.main>
  );
}

const PRETTIERRC_EXAMPLE = `// .prettierrc.mjs
const config = {
  trailingComma: "all",
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-organize-imports",
    "prettier-plugin-tailwindcss-canonical-classes",
    "prettier-plugin-tailwindcss",
    "@xeonlink/prettier-plugin-organize-attributes",
    await import("./scripts/format-linear.mjs").then(
      (module) => module.default,
    ), // 항상 마지막
  ],
};

export default config;`;

const RESOLVE_PARSER = `// prettier/src/main/parser-and-printer.js
function getParserPluginByParserName(plugins, parserName) {
  const plugin = plugins.findLast(
    (plugin) => plugin.parsers && Object.hasOwn(plugin.parsers, parserName),
  );
  if (plugin) {
    return plugin;
  }
  throw new ConfigError(\`Couldn't resolve parser "\${parserName}".\`);
}`;

const CREATE_ALWAYS_HAS_PROXY = `function createAlwaysHasProxy(fieldValue) {
  return new Proxy(
    {},
    {
      get() {
        return fieldValue;
      },
      has() {
        return true; // Object.hasOwn(parsers, "estree") → 항상 true
      },
      getOwnPropertyDescriptor() {
        return {
          value: fieldValue,
          configurable: true,
          enumerable: true,
          writable: true,
        };
      },
    },
  );
}`;

const PARSE_LOOP = `parse: async (text, options) => {
  const config = await resolveConfig(options.filepath);
  const pluginsLength = config?.plugins?.length ?? 0;

  let mergedText = text;

  for (let i = -pluginsLength + 1; i < 0; i++) {
    await clearConfigCache();
    const config = await resolveConfig(options.filepath);
    if (!config) {
      return mergedText;
    }

    config.plugins = options.plugins?.slice(-pluginsLength, i) ?? [];
    config.filepath = options.filepath;

    mergedText = await format(mergedText, config);
  }

  return mergedText;
},`;

const IDENTITY_PRINTER = `// printer — AST 대신 문자열을 그대로 통과
printers: {
  merge: {
    print: (astPath) => astPath.node,
  },
},`;
