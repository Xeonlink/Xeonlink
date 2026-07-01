import cleanSwitchGif from "@/assets/clean_switch.gif";
import remainUntractedGif from "@/assets/remain_untracted.gif";
import { post } from "@/features/post/components";
import { Mermaid } from "@/features/post/components/mermaid";
import { code } from "@/shared/components/code";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ExpandIcon, MoveHorizontalIcon, MoveVerticalIcon } from "lucide-react";

export const Route = createFileRoute("/posts/orphan-branch-isolation")({
  head: () => ({
    meta: [
      { title: "Orphan Branch로 프로젝트 격리하기" },
      {
        name: "description",
        content:
          "하나의 레포지토리 안에서 orphan branch와 clean-switch alias로 언어별 프로젝트를 격리하는 방법.",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <post.main>
      <post.header>
        <post.writedate>2026년 3월</post.writedate>
        <post.h1>모노레포 짭 - Orphan Branch</post.h1>
        <post.subtitle>
          하나의 레포지토리 안에서 orphan branch와 clean-switch alias로
          프로젝트를 격리하는 방법
        </post.subtitle>
      </post.header>

      <post.section>
        <post.h2>모노레포 딜레마?</post.h2>
        <post.p>
          지금까지{" "}
          <Link
            className="text-foreground underline underline-offset-4"
            to="/posts/jsx-as-state"
          >
            modal
          </Link>
          ,{" "}
          <Link
            className="text-foreground underline underline-offset-4"
            to="/posts/prettier-format-linear"
          >
            prettier-format-linear
          </Link>
          ,{" "}
          <Link
            className="text-foreground underline underline-offset-4"
            to="/posts/nextjs-netdef"
          >
            nextjs-netdef
          </Link>{" "}
          같은 싱글파일 유틸리티를 만들면서 &apos;이거 파일 몇개 없는데, repo를
          따로따로 만들어서 유지해야하나?&apos; 라는 생각이 들었습니다.
        </post.p>
        <post.p>
          가장 먼저 떠오른 생각은 모노레포를 적용해보는 것이었습니다. 관리
          용이성 · 코드 공유 · 일관된 개발 환경 · 의존성 관리 · 대규모 리팩터링
          등 장점이 많아 보였습니다.
        </post.p>
        <div className="flex items-center justify-center gap-4 pt-8 pb-6 md:gap-10">
          <div className="space-y-2">
            <div className="space-y-4 rounded-md border border-blue-600 p-4 text-center dark:border-blue-300">
              <ul className="grid grid-cols-3 place-content-center place-items-center gap-y-3">
                <li className="w-12 rounded-md border p-2">app</li>
                <MoveHorizontalIcon className="size-4" />
                <li className="w-12 rounded-md border p-2">web</li>
                <MoveVerticalIcon className="size-4" />
                <ExpandIcon className="size-4" />
                <MoveVerticalIcon className="size-4" />
                <li className="w-12 rounded-md border p-2">UI</li>
                <MoveHorizontalIcon className="size-4" />
                <li className="w-12 rounded-md border p-2">Test</li>
              </ul>
            </div>
            <div className="text-muted-foreground text-center text-sm">
              Mono Repo
            </div>
          </div>
          <div className="space-y-2">
            <ul className="grid grid-cols-2 gap-4 text-center">
              <li className="border-border w-fit rounded-md border p-2 px-4">
                app Repo
              </li>
              <li className="border-border rounded-md border p-2 px-4">
                web Repo
              </li>
              <li className="border-border rounded-md border p-2 px-4">
                UI Repo
              </li>
              <li className="border-border rounded-md border p-2 px-4">
                Test Repo
              </li>
            </ul>
            <div className="text-muted-foreground text-center text-sm">
              Poly Repo
            </div>
          </div>
        </div>
        <post.p>
          하지만 저의 상황에서는 오히려 &apos;over engineering이 아닌가?&apos;
          하는 생각이 들었습니다. 여러 언어를 넘나들어야하고, 그러다 보니 일관된
          개발환경은 불가능하고, 서로 의존성을 관리할 필요도 없으며, 서로가
          의존하지 않으니 대규모 리펙터링도 일어나지 않을 터 였습니다.
        </post.p>
        <post.p>
          뭔가 하나의 레포지토리에 여러 프로젝트를 격리할 수 있는 쉬운 방법이
          없나 찾아보다가, 언젠가 들어봤던 Orphan Branch라는 것이 번뜩
          떠올랐습니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>Git Orphan Branch</post.h2>
        <post.p>
          git을 사용하다보면 init 커밋에서 시작해 branch들이 가지를 뻗어가다가,
          하나로 합쳐지는 모양을 반복하며, 하나의 git tree를 형성합니다.
        </post.p>
        <Mermaid code={GIT_BRANCH_MERGE_GRAPH} />
        <post.p>
          <code.bash variant="inline">git branch &lt;name&gt;</code.bash>로
          branch를 생성할 때도, head가 가리키는 commit을 가리키는 branch가
          생성되어, 최초의 main branch가 만드는 git tree를 벗어날 수 없습니다.
        </post.p>
        <post.p>
          하지만 orphan branch는 기존 브랜치와 완전히 분리된 새로운 트리를
          시작할 수 있게 합니다.
        </post.p>
        <code.bash>{GIT_SWITCH_ORPHAN}</code.bash>
        <code.bash>{GIT_SWITCH_ORPHAN_EXAMPLE}</code.bash>
        <post.p>
          orphan branch가 만들어지고,{" "}
          <code.bash variant="inline">git log</code.bash> 를 사용하면 아직
          아무런 커밋도 하지 않았으므로, 에러가 발생합니다.
        </post.p>
        <Mermaid code={ORPHAN_BRANCH_GRAPH} />
        <post.p>
          커밋을 하고, <code.bash variant="inline">git log</code.bash> 를
          사용하면 커밋이 추가된 것을 확인할 수 있고,{" "}
          <code.bash variant="inline">git switch</code.bash> 로 독립된
          코드베이스와 git tree를 넘나들 수 있습니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>Untracked 파일이 남는 문제</post.h2>
        <post.p>
          이제 생성된 orphan branch와 기존의 main branch를 넘나들며, 독립된
          프로젝트를 운용할 수 있습니다. 하지만 두 branch를 넘나들다보면 이전
          branch에서 몇몇 파일들이 남아 Untracked 상태를 가지게 됩니다.
        </post.p>
        <div className="flex flex-col items-center gap-2 py-4">
          <img
            className="inline-block w-64 max-w-full rounded-lg"
            src={remainUntractedGif}
            alt="Untracked Diagram"
          />
          <span className="text-muted-foreground text-sm">
            ignore 된 파일이 untracted로 남는 문제
          </span>
        </div>
        <post.p>
          원인은 .gitignore에 등록된 파일은 switch를 해도 바뀌지 않지만,
          switch를 하면 .gitignore의 내용이 바뀌기 때문에, 제외된 파일이
          untracked로 표시되는 것입니다.
        </post.p>
        <post.p>
          정말 다행히도 git에는 clean 명령어가 있어, 제외된 파일이나 폴더만
          제거할 수 있습니다.
        </post.p>
        <code.bash>{GIT_CLEAN}</code.bash>
        <ul className="text-muted-foreground list-disc space-y-2 pl-6 leading-relaxed">
          <li>
            <post.strong>-f (force)</post.strong>: 강제로 제거한다.
          </li>
          <li>
            <post.strong>-d (directory)</post.strong>: 폴더인 경우에도 대상에
            포함한다.
          </li>
          <li>
            <post.strong>-x (exclude)</post.strong>: .gitignore에 명시된 파일도
            제거한다.
          </li>
          <li>
            <post.strong>-n (dry run)</post.strong>: 제거하기 전, 제거될 대상을
            확인한다.
          </li>
        </ul>
      </post.section>

      <post.section>
        <post.h2>clean + switch = clean-switch</post.h2>
        <post.p>
          매번 switch할 때마다, clean 명령어를 사용하는 것은 매우 귀찮은
          일입니다. git의 command alias 기능을 사용해서 하나의 명령어로 정의해서
          사용할 수 있습니다.
        </post.p>
        <code.bash>{GIT_CLEAN_SWITCH_ALIAS}</code.bash>
        <post.p>
          위 명령어중 하나를 선택하여 적용합니다.{" "}
          <code.bash variant="inline">--global</code.bash> scope로 설정하여,
          다른 레포지토리에서도 해당 alias를 사용할 수 있고{" "}
          <code.bash variant="inline">--local</code.bash> scope로 저장하면 이
          레포지토리의 범위안에서만 사용할 수 있습니다.{" "}
          <code.bash variant="inline">--local</code.bash> 은 생략할 수 있습니다.
        </post.p>
        <div className="flex flex-col items-center gap-2 py-4">
          <img
            className="inline-block w-64 max-w-full rounded-lg"
            src={cleanSwitchGif}
            alt="Untracked Diagram"
          />
          <span className="text-muted-foreground text-sm">
            clean-switch demo
          </span>
        </div>
        <post.p>
          이제 orphan branch로 switch할 때는{" "}
          <code.bash variant="inline">
            git clean-switch &lt;branch&gt;
          </code.bash>{" "}
          를 사용하면 clean 명령어가 실행된 후에 switch 됩니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>한계점</post.h2>
        <post.p>
          이 방식은 프로젝트를 완전 독립된 환경에서 작동시키면서도, 하나의
          레포지토리에서 관리할 수 있게 해줍니다. 하지만 한계점이 없는 것은
          아닙니다.
        </post.p>
        <ul className="text-muted-foreground list-disc space-y-4 pl-6 leading-relaxed">
          <li>
            <post.strong>dependency folder가 제거됨</post.strong>
            <p className="mt-2">
              nodejs라면 <code.bash variant="inline">node_modules</code.bash>,
              python이라면 <code.bash variant="inline">venv</code.bash> 폴더가
              제거됩니다. 이는 여러 orphan branch를 자주 전환하면 불편요소가
              되며, 매번 dependency를 다시 설치해야합니다.
            </p>
          </li>
          <li>
            <post.strong>.env 제거</post.strong>
            <p className="mt-2">
              .env는 중요한 secret을 담고있는 경우가 있기 때문에 주로
              .gitignore에 등록되어 ignore 상태로 관리합니다. 때문에
              clean-switch를 사용하면 secret이 계속 제거되어, 다시 파일을 만들고
              입력해야하는 번거로움이 생깁니다.
            </p>
          </li>
          <li>
            <post.strong>clean-switch 암기</post.strong>
            <p className="mt-2">
              clean-switch는 alias로 등록한 명령어이기 때문에, 자주 사용하지
              않으면 잊어버리기 쉽습니다. switch를 한 이후에{" "}
              <code.bash variant="inline">git clean -fdx</code.bash>를 호출할
              수도 있지만, 매우 번거로운 일이 됩니다.
            </p>
          </li>
        </ul>
      </post.section>

      <post.section>
        <post.h2>정리</post.h2>
        <post.p>
          위의 단점에도 불구하고 저는 이 방식을 저의 github profile repo에서
          사용하고 있습니다. dependency가 적고, 단편적인 유틸리티 파일을 언어에
          관계없이 관리할 수 있다는 점이 큰 장점으로 다가왔기 때문입니다.
        </post.p>
        <post.p>
          의존성 폴더가 제거되긴 하지만, orphan branch 끼리 의존하지 않고, .env
          없는 단일파일 유틸리티와 테스트코드로만 이루어진 저의 orphan branch
          사용패턴에서는 매우 효과적인 정리방법이었습니다.
        </post.p>
        <post.p>실제로 적용한 결과는 아래에서 확인하실 수 있습니다.</post.p>
        <post.p>
          <a
            className="text-foreground underline underline-offset-4"
            href="https://github.com/Xeonlink/Xeonlink"
            rel="noreferrer"
            target="_blank"
          >
            Xeonlink/Xeonlink
          </a>
        </post.p>
      </post.section>
    </post.main>
  );
}

const GIT_BRANCH_MERGE_GRAPH = `
graph LR
    A[init] --> B --> C1 --> D[merge commit]
    B --> C2
    C2 --> C2' --> D`;

const ORPHAN_BRANCH_GRAPH = `
graph LR
    A[init] --> B --> C --> D(기존 트리)
    E[init] --> F --> G(orphan tree)`;

const GIT_SWITCH_ORPHAN = `git switch --orphan <branch이름>`;

const GIT_SWITCH_ORPHAN_EXAMPLE = `# Example
git switch --orphan test1
# Switched to a new branch 'test1'
git log
# fatal: your current branch 'test1' does not have any commits yet
`;

const GIT_CLEAN = `git clean -fdx
# 또는
git clean -nfdx`;

const GIT_CLEAN_SWITCH_ALIAS = `# global scope 에서 사용하고 싶을 때
git config --global alias.clean-switch '!f() { git clean -fdX && git switch "$@"; }; f'

# local scope (scope를 명시하여)
git config --local alias.clean-switch '!f() { git clean -fdX && git switch "$@"; }; f'

# local scope (scope를 명시하지 않아도됨)
git config alias.clean-switch '!f() { git clean -fdX && git switch "$@"; }; f'`;
