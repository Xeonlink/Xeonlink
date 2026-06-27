import modalResultVideo from "@/assets/modal_result.mov";
import { post } from "@/features/post/components";
import { code } from "@/shared/components/code";
import { Button } from "@/shared/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { ModalCloser } from "@/shared/lib/modal-closer";
import { ModalTrigger } from "@/shared/lib/modal-trigger";
import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import ReactDraggable from "react-draggable";

export const Route = createFileRoute("/posts/jsx-as-state")({
  head: () => ({
    meta: [
      { title: "JSX as State — 콜백에서도 모달을 열다" },
      {
        name: "description",
        content:
          "JSX를 state로 두고 modal.open()으로 어디서든 모달을 띄우는 패턴. 외부 스토어와 useSyncExternalStore로 구현하는 jsx-jump-modal 소개.",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <post.main>
      <post.header>
        <post.writedate>2023년 1월</post.writedate>
        <post.h1>JSX as State</post.h1>
        <post.subtitle>
          콜백과 이벤트 핸들러에서도 모달을 열 수 있게, JSX를 state로 다루는
          방법
        </post.subtitle>
      </post.header>

      <post.section>
        <post.h2>선언형 모달의 한계</post.h2>
        <post.p>
          React에는 다이얼로그나 모달을 만들 때, 여러가지 방법이 있습니다.
          boolean state를 만들어 컴포넌트를 mount / unmount 할 수도 있고,
          Shadcn의 모달의 패턴처럼 modal의 trigger와 content를 묶어 추상화하여
          선언형으로 관리하는 패턴도 있습니다. 더 나아가서는 {"<dialog />"}{" "}
          태그를 사용해서 미리 선언하고, {"<button />"} 태그의 command /
          commandfor 속성을 사용해서 모달을 여는 패턴도 있습니다.
        </post.p>
        <Tabs defaultValue="boolean-state">
          <TabsList className="w-full">
            <TabsTrigger value="boolean-state">Boolean State</TabsTrigger>
            <TabsTrigger value="shadcn-modal">Shadcn</TabsTrigger>
            <TabsTrigger value="dialog-modal">commandfor</TabsTrigger>
          </TabsList>
          <TabsContent value="boolean-state">
            <code.tsx>{BOOLEAN_STATE_MODAL}</code.tsx>
          </TabsContent>
          <TabsContent value="shadcn-modal">
            <code.tsx>{SHADCN_MODAL}</code.tsx>
          </TabsContent>
          <TabsContent value="dialog-modal">
            <code.tsx>{DIALOG_MODAL}</code.tsx>
          </TabsContent>
        </Tabs>
        <post.p>
          하지만 세 방식은 모두 공통된 한계점을 가지고 있습니다. 모달을 열어야
          하는 시점이 컴포넌트 트리 깊숙한 콜백 안에 있거나, API 응답 핸들러
          또는 비동기의 결과로 모달을 열어야하는 경우 곧바로 복잡해집니다. 또한
          근본적으로 trigger와 content가 1:1 또는 N:1 관계를 가지고 있어
          modal이나 dialog를 여는 버튼은 여러개 일 수 있지만, 열리는 dialog는
          하나만 가져야하는 한계가 있습니다.
        </post.p>
        <Tabs defaultValue="async callback">
          <TabsList className="w-full">
            <TabsTrigger value="async callback">Async Callback</TabsTrigger>
            <TabsTrigger value="single dialog limit">
              Single Dialog Limit
            </TabsTrigger>
          </TabsList>
          <TabsContent value="async callback">
            <code.tsx>{ASYNC_CALLBACK_MODAL}</code.tsx>
          </TabsContent>
          <TabsContent value="single dialog limit">
            <code.tsx>{BOOLEAN_STATE_MODAL_WITH_STATE}</code.tsx>
          </TabsContent>
        </Tabs>
        <post.p>
          물론 위와 같이 비동기 이후에 상태를 변경하거나, dialog의 내용을
          state로 관리한다면 문제를 해결할 수도 있습니다. 하지만 비동기 과정이
          끝나서 모달을 열기전에 부모 컴포넌트가 Unmount 될 수 있고, state의
          관리부담이 커져 더욱 복잡해집니다. 뿐만 아니라 여전히 1:1, N:1 의
          관계에서 오는 한계가 있어, 하나의 trigger로 dialog를 여러개 열 수
          없습니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>JSX를 state로</post.h2>
        <post.p>
          어떻게하면 이 문제를 해결할 수 있을까요? 저는 modal의 사용패턴을
          선언형에서 명령형으로 변경하여 해결했습니다. 핵심 아이디어는 JSX
          자체를 state로 관리하는 것입니다. React의 virtual DOM이 거대한 js
          object라는 사실은 잘 알려진 사실입니다. 그렇다면 JSX를 외부 스토어에
          넣어 관리하면 어떻게 될까요? virtual DOM의 구성을 원하는 시점에 원하는
          형태로 조작할 수 있지 않을까요? 저는 이 아이디어를 바로
          실험해보았습니다.
        </post.p>
        <Tabs defaultValue="store">
          <TabsList className="w-full">
            <TabsTrigger value="store">Store</TabsTrigger>
            <TabsTrigger value="container">Container</TabsTrigger>
            <TabsTrigger value="hook">Hook</TabsTrigger>
            <TabsTrigger value="example">Example</TabsTrigger>
          </TabsList>
          <TabsContent value="store">
            <code.tsx>{STORE}</code.tsx>
          </TabsContent>
          <TabsContent value="container">
            <code.tsx>{CONTAINER}</code.tsx>
          </TabsContent>
          <TabsContent value="hook">
            <code.tsx>{HOOK}</code.tsx>
          </TabsContent>
          <TabsContent value="example">
            <code.tsx>{EXAMPLE}</code.tsx>
          </TabsContent>
        </Tabs>

        <div className="border-border bg-card space-y-4 rounded-md border p-6 shadow-sm">
          <post.h2>라이브 데모</post.h2>
          <ModalTrigger asChild render={<DraggableDemoDialog />}>
            <Button size="lg">중첩된 모달 열기</Button>
          </ModalTrigger>
        </div>
      </post.section>

      <post.section>
        <post.h2>더 나아가기</post.h2>
        <post.p>
          NextJS 에서는 SSR의 이점을 극대화하기 위해서는, hook을 사용하는
          컴포넌트를 최대한 dom tree의 leaf로 배치하는 것이 중요합니다. 때문에
          modal 을 여는 동작, 여는 동작을 컴포넌트로 추상화하여 선언형으로
          관리하는 것이 효과적입니다.
        </post.p>

        <Tabs defaultValue="trigger">
          <TabsList className="w-full">
            <TabsTrigger value="trigger">Trigger</TabsTrigger>
            <TabsTrigger value="closer">Closer</TabsTrigger>
            <TabsTrigger value="example">Demo Example</TabsTrigger>
          </TabsList>
          <TabsContent value="trigger">
            <code.tsx>{TRIGGER}</code.tsx>
          </TabsContent>
          <TabsContent value="closer">
            <code.tsx>{CLOSER}</code.tsx>
          </TabsContent>
          <TabsContent value="example">
            <code.tsx>{DEMO_EXAMPLE}</code.tsx>
          </TabsContent>
        </Tabs>
      </post.section>

      <div className="border-border mb-8 max-w-2xl overflow-hidden rounded-xl border shadow">
        <video
          className="h-auto w-full"
          src={modalResultVideo}
          controls
          playsInline
          poster=""
          autoPlay
        >
          Sorry, your browser doesn't support embedded videos.
        </video>
      </div>

      <post.section>
        <post.h2>언제 쓰면 좋을까</post.h2>
        <ul className="text-muted-foreground list-disc space-y-2 pl-6 leading-relaxed">
          <li>콜백·비동기 흐름 안에서 확인/에러 모달을 띄워야 할 때</li>
          <li>boolean prop 조합 없이 모달 variant를 JSX로 명시하고 싶을 때</li>
          <li>중첩 모달·위자드처럼 스택이 자연스럽게 쌓여야 할 때</li>
          <li>
            라이브러리 API는 명령형, 화면은 여전히 React 트리로 표현하고 싶을 때
          </li>
        </ul>
        <post.p>
          전체 구현과 README는{" "}
          <a
            className="text-accent hover:underline"
            href="https://github.com/Xeonlink/Xeonlink/tree/main%23modal"
            target="_blank"
            rel="noreferrer"
          >
            jsx-jump-modal GitHub 저장소
          </a>
          에서 확인할 수 있습니다.
        </post.p>
      </post.section>
    </post.main>
  );
}

const BOOLEAN_STATE_MODAL = `function MyModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open</button>
      {isOpen && <div aria-role="dialog">Hello</div>}
    </div>
  );
}`;

const SHADCN_MODAL = `function MyModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        ...
      </DialogContent>
    </Dialog>
  );
}`;

const DIALOG_MODAL = `function MyModal() {
  return (
    <>
      <button type="button" command="show-modal" commandfor="my-modal">
        Open
      </button>
      <dialog id="my-modal">
        ...
      </dialog>
    </>
  );
}`;

const BOOLEAN_STATE_MODAL_WITH_STATE = `function MyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("내용");

  const open1 = () => {
    setIsOpen(true);
    setContent("내용1");
  }
  const open2 = () => {
    setIsOpen(true);
    setContent("내용2");
  }

  return (
    <div>
      <button onClick={open1}>Open1</button>
      <button onClick={open2}>Open2</button>
      {isOpen && <div aria-role="dialog">{content}</div>}
    </div>
  );
}`;

const ASYNC_CALLBACK_MODAL = `function MyModal() {
  const [isOpen, setIsOpen] = useState(false);

  const somthing = async () => {
    await fetch(...);
    setIsOpen(true);
  }

  return (
    <div>
      <button onClick={somthing}>Open</button>
      {isOpen && <div aria-role="dialog">Hello</div>}
    </div>
  );
}`;

const STORE = `type ModalEntry = {
  key: string;
  element: React.ReactElement;
};

let modals: ModalEntry[] = [];
const listeners = new Set<() => void>();

const modalStore = {
  getSnapshot: () => modals,
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  publish: (mutateFn: (modals: ModalEntry[]) => ModalEntry[]) => {
    modals = mutateFn(modals);
    listeners.forEach((listener) => listener());
  },
};`;

const CONTAINER = `export function ModalContainer() {
  const modals = useSyncExternalStore(
    modalStore.subscribe,
    modalStore.getSnapshot,
    modalStore.getSnapshot,
  );

  return (
    <>
      {modals.map(({ key, element }) => (
        <ModalContextProvider key={key} modalKey={key}>
          {element}
        </ModalContextProvider>
      ))}
    </>
  );
}`;

const HOOK = `export function useModal() {
  // 여기가 핵심! ReactElement를 바로 외부 스토어에 추가
  const open = (element: React.ReactElement) => {
    const key = crypto.randomUUID();
    modalStore.publish((modals) => [...modals, { key, element }]);
    return () => close(key);
  };

  const close = (key: string) => {
    modalStore.publish((modals) => modals.filter((modal) => modal.key !== key));
  };

  return {
    open,
    close,
  };
}`;

const EXAMPLE = `function MyModal() {
  const modal = useModal();

  const openMyModal = () => {
    modal.open(<MyModal />);
  };

  return (
    <div>
      ...
      <button onClick={openMyModal}>Open</button>
    </div>
  );
}`;

const TRIGGER = `import { useModal } from "@/shared/lib/modal";
import * as Slot from "@radix-ui/react-slot";
import type { ComponentProps, MouseEvent, ReactElement } from "react";

interface ModalTriggerProps extends ComponentProps<"button"> {
  asChild?: boolean;
  render: ReactElement;
}

export function ModalTrigger(props: ModalTriggerProps) {
  const { render, asChild = false, onClick, ...rest } = props;
  const modal = useModal();
  const Comp = asChild ? Slot.Root : "button";

  return <Comp onClick={() => modal.open(render)} {...rest} />;
}`;

const CLOSER = `import { useModal } from "@/shared/lib/modal";
import * as Slot from "@radix-ui/react-slot";
import type { ComponentProps } from "react";

interface ModalCloserProps extends ComponentProps<"button"> {
  asChild?: boolean;
}

export function ModalCloser(props: ModalCloserProps) {
  const { asChild, ...rest } = props;
  const modal = useModal();
  const Comp = asChild ? Slot.Root : "button";

  return <Comp onClick={modal.closeSelf} {...rest} />;
}`;

const DEMO_EXAMPLE = `function DraggableDemoDialog() {
  return (
    <Draggable>
      <div className="fixed top-10 left-10 ...">
        <h3 className="text-lg font-semibold">드래그로 창 옮기기</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          이제 여러분이 상상하는 만큼 창을 열 수 있습니다. <br />
          드래그해서 창을 옮길 수 있습니다.
        </p>
        <div className="space-x-4">
          <ModalTrigger asChild render={<DraggableDemoDialog />}>
            <Button variant="secondary" size="lg">
              또 모달 열기
            </Button>
          </ModalTrigger>
          <ModalCloser asChild>
            <Button variant="default" size="lg">
              닫기
            </Button>
          </ModalCloser>
        </div>
      </div>
    </Draggable>
  );
}`;

function DraggableDemoDialog() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <ReactDraggable
      nodeRef={ref}
      cancel="button, input, textarea, select, option"
    >
      <div
        className="border-border bg-card fixed top-10 left-10 max-w-md space-y-4 rounded-xl border p-6 shadow-lg"
        ref={ref}
      >
        <h3 className="text-lg font-semibold">드래그로 창 옮기기</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          이제 여러분이 상상하는 만큼 창을 열 수 있습니다. <br />
          드래그해서 창을 옮길 수 있습니다.
        </p>
        <div className="space-x-4">
          <ModalTrigger asChild render={<DraggableDemoDialog />}>
            <Button variant="secondary" size="lg">
              또 모달 열기
            </Button>
          </ModalTrigger>
          <ModalCloser asChild>
            <Button variant="default" size="lg">
              닫기
            </Button>
          </ModalCloser>
        </div>
      </div>
    </ReactDraggable>
  );
}
