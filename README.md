# jsx-jump-modal

JSX를 state로 활용해, 콜백이나 이벤트 핸들러에서도 모달을 열 수 있게 하는 React 컴포넌트 라이브러리입니다.

일반적인 선언형 모달은 `isOpen` state를 상위 컴포넌트에서 관리해야 하지만, 이 라이브러리는 `modal.open(<MyModal />)`처럼 JSX를 직접 전달해 어디서든 모달을 띄울 수 있습니다.

## 동작 방식

모달 목록은 React 컴포넌트 트리 밖의 외부 스토어에 `{ key, element }` 형태로 보관됩니다. `ModalContainer`가 `useSyncExternalStore`로 이 스토어를 구독하고, 열린 모달 JSX를 렌더링합니다.

1. [콜백 / 버튼 클릭]
2. `modal.open(<Modal />)` 호출
3. 외부 스토어에 JSX 추가
4. `ModalContainer`가 스토어를 구독
5. 렌더링

```tsx
import { ModalContainer } from "jsx-jump-modal";

function RootPage() {
  return (
    <>
      <ModalContainer />
    </>
  );
}
```

```tsx
import { useModal } from "jsx-jump-modal";

function Page() {
  const modal = useModal();

  const open = () => {
    modal.open(<DoSometingModal />);
  };

  return (
    <>
      ...
      <button onClick={open}>열기</button>
      ...
    </>
  );
}
```

위 예시처럼, 함수나 콜백 내부에서 원하는 시점에 `modal.open(<MyModal />)` 호출로 모달을 띄울 수 있습니다. 호출된 컴포넌트는 ModalContainer 내부에서 랜더링됩니다.

```tsx
import { useModal } from "jsx-jump-modal";

function DoSometingModal() {
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
}
```

생성된 modal안에서 useModal을 사용할 수 있고, modal에서 새로운 modal을 open하거나, 자기자신을 닫을 수 있습니다.
