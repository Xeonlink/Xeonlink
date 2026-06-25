import { Button } from "@/shared/components/ui/button";
import { useModal } from "@/shared/lib/modal";
import { ModalCloser } from "@/shared/lib/modal-closer";
import { ModalTrigger } from "@/shared/lib/modal-trigger";
import { createFileRoute } from "@tanstack/react-router";

const MODAL_TSX = `import type { PropsWithChildren } from "react";
import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
} from "react";

type ModalEntry = {
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
};

// ------------------------------------------------------------

const ModalContext = createContext<{
  key: string;
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

function ModalContextProvider(props: PropsWithChildren<{ modalKey: string }>) {
  const { children, modalKey } = props;
  const [open, setOpen] = useState(true);

  return (
    <ModalContext.Provider value={{ key: modalKey, open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const modalCtx = useContext(ModalContext);

  const close = (key: string) => {
    modalStore.publish((modals) => modals.filter((modal) => modal.key !== key));
  };

  const createKey = () => {
    return crypto.randomUUID();
  };

  const openWithKey = (key: string, element: React.ReactElement) => {
    modalStore.publish((modals) => [...modals, { key, element }]);
    return () => close(key);
  };

  const open = (element: React.ReactElement) => {
    const key = createKey();
    return openWithKey(key, element);
  };

  const closeSelf = () => {
    if (!modalCtx) {
      throw new Error("Context key is not exist");
    }
    close(modalCtx.key);
  };

  const startClose = () => {
    if (!modalCtx) {
      throw new Error("Context key is not exist");
    }
    modalCtx.setOpen(false);
  };

  return {
    isOpen: !!modalCtx?.open,
    open,
    createKey,
    openWithKey,
    close,
    closeSelf,
    startClose,
    length: () => modalStore.getSnapshot().length,
  };
}

export function ModalContainer() {
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

const MODAL_TRIGGER_TSX = `import type { ComponentProps, ReactElement, MouseEvent } from "react";
import { useModal } from "./modal";
import * as Slot from "@radix-ui/react-slot";

interface ModalTriggerProps extends ComponentProps<"button"> {
  asChild?: boolean;
  render: ReactElement;
}

export function ModalTrigger(props: ModalTriggerProps) {
  const { children, render, asChild = false, onClick, ...rest } = props;
  const modal = useModal();
  const Comp = asChild ? Slot.Root : "button";

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    modal.open(render);
  };

  return (
    <Comp onClick={handleClick} {...rest}>
      {children}
    </Comp>
  );
}`;

const MODAL_CLOSER_TSX = `import type { ComponentProps } from "react";
import { useModal } from "./modal";
import * as Slot from "@radix-ui/react-slot";

interface ModalCloserProps extends ComponentProps<"button"> {
  asChild?: boolean;
}

export function ModalCloser(props: ModalCloserProps) {
  const { asChild, ...rest } = props;
  const modal = useModal();
  const Comp = asChild ? Slot.Root : "button";

  return <Comp onClick={modal.closeSelf} {...rest} />;
}`;

const USAGE_EXAMPLE = `import { ModalContainer } from "jsx-jump-modal";

function RootPage() {
  return (
    <>
      <ModalContainer />
    </>
  );
}

import { useModal } from "jsx-jump-modal";

function Page() {
  const modal = useModal();

  const open = () => {
    modal.open(<DoSomethingModal />);
  };

  return (
    <>
      ...
      <button onClick={open}>열기</button>
      ...
    </>
  );
}

import { useModal } from "jsx-jump-modal";

function DoSomethingModal() {
  const modal = useModal();

  const close = () => {
    modal.closeSelf();
  };

  return (
    <>
      ...
      <button onClick={close}>닫기</button>
      ...
    </>
  );
}`;

const CODE_BLOCK_CLASS = "overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm leading-relaxed";

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
  const modal = useModal();

  return (
    <main className="mx-auto max-w-4xl space-y-12 px-6 py-20">
      <header className="space-y-4">
        <p className="text-muted-foreground text-sm">2026년 6월</p>
        <h1 className="text-4xl leading-tight font-bold md:text-5xl">JSX as State</h1>
        <p className="text-muted-foreground text-xl leading-relaxed">
          콜백과 이벤트 핸들러에서도 모달을 열 수 있게, JSX를 state로 다루는 방법
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">선언형 모달의 한계</h2>
        <p className="text-muted-foreground leading-relaxed">
          React에서 모달은 보통 <code className="text-foreground">isOpen</code> state와 함께 선언형으로 관리합니다.
          버튼을 누르면 <code className="text-foreground">setIsOpen(true)</code>, 닫으면{" "}
          <code className="text-foreground">false</code> — 익숙한 패턴입니다.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          하지만 모달을 열어야 하는 시점이 컴포넌트 트리 깊숙한 콜백 안에 있거나, API 응답 핸들러·타이머·전역 이벤트
          리스너처럼 JSX 밖의 맥락에 있을 때는 곧바로 어려워집니다. state를 들고 있는 컴포넌트까지 prop을 내리거나,
          context를 새로 만들거나, ref로 명령형 API를 노출해야 합니다.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          모달마다 <code className="text-foreground">isDeleteOpen</code>,{" "}
          <code className="text-foreground">isEditOpen</code> 같은 boolean이 늘어나면 조합이 기하급수적으로 늘고, “이
          버튼이 어떤 모달을 여는지”를 JSX만 보고 따라가기도 힘들어집니다.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">핵심 아이디어: JSX를 state로</h2>
        <p className="text-muted-foreground leading-relaxed">
          <a
            href="https://github.com/Xeonlink/Xeonlink/tree/main%23modal"
            className="text-accent hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            jsx-jump-modal
          </a>
          은 boolean 대신 <strong className="text-foreground">렌더할 JSX 자체</strong>를 외부 스토어에 넣습니다.{" "}
          <code className="text-foreground">modal.open(&lt;MyModal /&gt;)</code>처럼 호출하는 순간, 그 element가
          스토어에 쌓이고 전역 <code className="text-foreground">ModalContainer</code>가 구독하여 화면에 그립니다.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          state가 “열림/닫힘”이 아니라 “지금 어떤 UI를 띄울지”를 담게 되므로, 호출 지점에서는 명령형에 가깝고 렌더
          결과는 여전히 선언형 JSX입니다.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">동작 방식</h2>
        <ol className="text-muted-foreground list-decimal space-y-2 pl-6 leading-relaxed">
          <li>콜백이나 버튼 클릭에서 `modal.open(JSX)` 호출</li>
          <li>
            React 트리 밖 모듈 스코프 스토어에 <code className="text-foreground">{`{ key, element }`}</code> 추가
          </li>
          <li>`ModalContainer`가 `useSyncExternalStore`로 스토어 구독</li>
          <li>각 항목을 `ModalContextProvider`로 감싸 렌더 — 모달 안에서 `useModal()` 사용 가능</li>
        </ol>
        <p className="text-muted-foreground leading-relaxed">
          스토어가 컴포넌트 트리 밖에 있기 때문에, 어떤 깊이의 핸들러에서도 동일한 `open` API를 쓸 수 있습니다. 중첩
          모달도 스택처럼 쌓이며, 각 모달은 자신의 context key로 `closeSelf`를 호출합니다.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">구현: modal.tsx</h2>
        <p className="text-muted-foreground leading-relaxed">
          스토어는 모듈 레벨 변수와 listener Set으로 구현합니다. `useSyncExternalStore`는 React 18+에서 외부 store를
          안전하게 구독하는 공식 API입니다.
        </p>
        <pre className={CODE_BLOCK_CLASS}>
          <code>{MODAL_TSX}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">구현: ModalTrigger · ModalCloser</h2>
        <p className="text-muted-foreground leading-relaxed">
          트리거는 클릭 시 `render` prop으로 받은 JSX를 그대로 `open`에 넘깁니다. Closer는 모달 context 안에서
          `closeSelf`를 호출하는 얇은 버튼 래퍼입니다.
        </p>
        <h3 className="text-lg font-medium">modal-trigger.tsx</h3>
        <pre className={CODE_BLOCK_CLASS}>
          <code>{MODAL_TRIGGER_TSX}</code>
        </pre>
        <h3 className="text-lg font-medium">modal-closer.tsx</h3>
        <pre className={CODE_BLOCK_CLASS}>
          <code>{MODAL_CLOSER_TSX}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API 요약</h2>
        <dl className="text-muted-foreground space-y-3 leading-relaxed">
          <div>
            <dt className="text-foreground font-medium">open(element)</dt>
            <dd>새 key를 생성해 JSX를 스토어에 추가합니다. 닫기 함수를 반환합니다.</dd>
          </div>
          <div>
            <dt className="text-foreground font-medium">openWithKey(key, element)</dt>
            <dd>key를 직접 지정해 열 때 사용합니다. 여러 진입점이 같은 모달을 제어할 때 유용합니다.</dd>
          </div>
          <div>
            <dt className="text-foreground font-medium">close(key)</dt>
            <dd>지정한 key의 모달을 스토어에서 제거합니다.</dd>
          </div>
          <div>
            <dt className="text-foreground font-medium">closeSelf()</dt>
            <dd>모달 context 안에서 자신만 닫습니다. context 밖에서 호출하면 에러입니다.</dd>
          </div>
          <div>
            <dt className="text-foreground font-medium">startClose()</dt>
            <dd>즉시 제거하지 않고 `open` state를 false로 — 닫기 애니메이션 후 `closeSelf`와 조합할 때 씁니다.</dd>
          </div>
          <div>
            <dt className="text-foreground font-medium">length()</dt>
            <dd>현재 스토어에 쌓인 모달 개수를 반환합니다. 중첩 스택 확인용입니다.</dd>
          </div>
          <div>
            <dt className="text-foreground font-medium">isOpen</dt>
            <dd>현재 context 모달의 열림 상태입니다. `startClose`와 함께 쓰입니다.</dd>
          </div>
        </dl>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">사용 예시</h2>
        <p className="text-muted-foreground leading-relaxed">
          앱 루트에 `ModalContainer`를 한 번 마운트하고, 페이지·모달 컴포넌트 어디서든 `useModal`을 import해 씁니다.
        </p>
        <pre className={CODE_BLOCK_CLASS}>
          <code>{USAGE_EXAMPLE}</code>
        </pre>
      </section>

      <section className="border-border bg-card space-y-6 rounded-2xl border p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">라이브 데모</h2>
        <p className="text-muted-foreground leading-relaxed">
          아래 버튼으로 1차 모달을 연 뒤, 모달 안에서 중첩 모달을 열 수 있습니다. 각 모달은 독립적으로 닫을 수 있고,
          “스택 확인”을 누르면 그 시점의 `modal.length()`를 볼 수 있습니다.
        </p>
        <ModalTrigger
          asChild
          render={
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-layer-1-title"
                className="border-border bg-card w-full max-w-md space-y-4 rounded-xl border p-6 shadow-lg"
              >
                <h3 id="modal-layer-1-title" className="text-lg font-semibold">
                  1차 모달
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  바깥 페이지의 <code className="text-foreground">useModal()</code> 클로저로 중첩 모달을 열 수 있습니다.
                  별도의 데모 컴포넌트를 정의하지 않아도 됩니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      modal.open(
                        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
                          <div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-layer-2-title"
                            className="border-border bg-card w-full max-w-sm space-y-4 rounded-xl border p-6 shadow-lg"
                          >
                            <h3 id="modal-layer-2-title" className="text-lg font-semibold">
                              2차 모달 (중첩)
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              스토어에 모달이 두 겹 쌓인 상태입니다. 이 모달만 닫아도 1차 모달은 유지됩니다.
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => alert(`현재 스택: ${modal.length()}개`)}
                              >
                                스택 확인
                              </Button>
                              <ModalCloser asChild>
                                <Button type="button" variant="default" size="sm">
                                  닫기
                                </Button>
                              </ModalCloser>
                            </div>
                          </div>
                        </div>,
                      )
                    }
                  >
                    중첩 모달 열기
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => alert(`현재 스택: ${modal.length()}개`)}
                  >
                    스택 확인
                  </Button>
                  <ModalCloser asChild>
                    <Button type="button" variant="default" size="sm">
                      닫기
                    </Button>
                  </ModalCloser>
                </div>
              </div>
            </div>
          }
        >
          <Button type="button">모달 열기</Button>
        </ModalTrigger>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">언제 쓰면 좋을까</h2>
        <ul className="text-muted-foreground list-disc space-y-2 pl-6 leading-relaxed">
          <li>콜백·비동기 흐름 안에서 확인/에러 모달을 띄워야 할 때</li>
          <li>boolean prop 조합 없이 모달 variant를 JSX로 명시하고 싶을 때</li>
          <li>중첩 모달·위자드처럼 스택이 자연스럽게 쌓여야 할 때</li>
          <li>라이브러리 API는 명령형, 화면은 여전히 React 트리로 표현하고 싶을 때</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed">
          전체 구현과 README는{" "}
          <a
            href="https://github.com/Xeonlink/Xeonlink/tree/main%23modal"
            className="text-accent hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            jsx-jump-modal GitHub 저장소
          </a>
          에서 확인할 수 있습니다.
        </p>
      </section>
    </main>
  );
}
