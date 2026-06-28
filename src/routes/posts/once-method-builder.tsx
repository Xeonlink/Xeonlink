import { post } from "@/features/post/components";
import { code } from "@/shared/components/code";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/once-method-builder")({
  head: () => ({
    meta: [
      { title: "일회용 Method 빌더패턴" },
      {
        name: "description",
        content:
          "Closure와 es-toolkit omit으로 빌드타임에 method 중복 호출을 막는 일회용 builder 패턴.",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <post.main>
      <post.header>
        <post.writedate>2026년 2월</post.writedate>
        <post.h1>일회용 Method 빌더패턴</post.h1>
        <post.subtitle>
          Closure와 omit으로 빌드타임에 method 중복 호출을 막는 방법
        </post.subtitle>
      </post.header>

      <post.section>
        <post.h2>빌더 패턴 다시 생각하기</post.h2>
        <post.p>
          Builder 패턴은 복잡한 객체를 단계적으로 조립할 때 자주 씁니다.
          햄버거를 예로 들면, 번·패티·치즈·야채·소스를 하나씩 설정한 뒤{" "}
          <code.tsx variant="inline">build()</code.tsx> 로 완성품을 만듭니다.
          전통적인 class builder는 method마다{" "}
          <code.tsx variant="inline">return this</code.tsx> 로 체인을
          이어갑니다.
        </post.p>
        <Tabs defaultValue="usage">
          <TabsList className="w-full">
            <TabsTrigger value="hamburger">Hamburger</TabsTrigger>
            <TabsTrigger value="builder">HamburgerBuilder</TabsTrigger>
            <TabsTrigger value="usage">사용 예</TabsTrigger>
          </TabsList>
          <TabsContent value="hamburger">
            <code.tsx>{HAMBURGER}</code.tsx>
          </TabsContent>
          <TabsContent value="builder">
            <code.tsx>{HAMBURGER_BUILDER}</code.tsx>
          </TabsContent>
          <TabsContent value="usage">
            <code.tsx>{CLASS_USAGE}</code.tsx>
          </TabsContent>
        </Tabs>
        <post.p>
          전통적인 Builder 패턴에서{" "}
          <code.tsx variant="inline">setBun()</code.tsx>,{" "}
          <code.tsx variant="inline">setPatty()</code.tsx>,{" "}
          <code.tsx variant="inline">setSauce()</code.tsx> 는 여러 번 호출할 수
          있습니다. 마지막에 호출한 값만 남고, 이전 값은 덮어씌워집니다.
        </post.p>
        <post.p>
          저는 이런 구조가 불안하다고 느꼈습니다. 잘못 사용하면 builder가 여러
          함수를 넘어다니면서 side effect를 일으킬 수 있어 보였습니다. 번·패티·
          소스를 <strong className="text-foreground font-medium">1번만</strong>{" "}
          선택하게 강제할 수 있을까요? 강제할 수 있다면 빌드타임에 막을 수
          있을까요?
        </post.p>
      </post.section>

      <post.section>
        <post.h2>아이디어 1 — Builder를 두 요소로 나누기</post.h2>
        <post.p>
          문제를 해결하기 위해서 떠오른 첫번째 생각은{" "}
          {`'method를 사용할 때마다,
          builder의 정의가 새롭게 작성되도록 만드면 되겠다.'`}{" "}
          였습니다. 사용한 method를 뺀 새로운 builder를 다시 만들어 사용하면 될
          것 같았습니다.
        </post.p>
        <post.p>
          그래서 일단 builder를 data 객체와 method 객체로 나누어 보았습니다.
          왜냐하면 builder의 data 부분은 원래 buidler가 data를 처리하는 방식으로
          흘러야하지만, method 부분은 사용한 뒤에 다시 만들어져야하기
          때문입니다.
        </post.p>
        <Tabs defaultValue="data">
          <TabsList className="w-full">
            <TabsTrigger value="data">data 객체</TabsTrigger>
            <TabsTrigger value="method">method 객체</TabsTrigger>
          </TabsList>
          <TabsContent value="data">
            <code.tsx>{DATA_OBJ}</code.tsx>
          </TabsContent>
          <TabsContent value="method">
            <code.tsx>{METHOD_OBJ}</code.tsx>
          </TabsContent>
        </Tabs>
        <post.p>
          이제 method 객체를 함수로 감싸서, method를 호출할 때마다 method 객체를
          새로 만들어 만들어 반환하도록 합니다. 이제 method를 사용할 때마다,
          builder의 type을 바꿀 수 있는 기반이 마련되었습니다.
        </post.p>
        <post.p>
          추가적으로 class 형식의 builder 패턴과 같이, method와 같이 data가
          흐르도록 파라미터를 수정합니다.
        </post.p>
        <Tabs defaultValue="wrapped method">
          <TabsList className="w-full">
            <TabsTrigger value="wrapped method">감싸진 method 객체</TabsTrigger>
            <TabsTrigger value="+data flow">+ data 흐름</TabsTrigger>
            <TabsTrigger value="example">사용 예</TabsTrigger>
          </TabsList>
          <TabsContent value="wrapped method">
            <code.tsx>{CREATE_METHOD_OBJ_FN}</code.tsx>
          </TabsContent>
          <TabsContent value="+data flow">
            <code.tsx>{PLUS_DATA_FLOW}</code.tsx>
          </TabsContent>
          <TabsContent value="example">
            <code.tsx>{PLUS_DATA_FLOW_EXAMPLE}</code.tsx>
          </TabsContent>
        </Tabs>
      </post.section>

      <post.section>
        <post.h2>아이디어 2 — 호출된 method 제거하기</post.h2>
        <post.p>
          한번 호출된 method는 계속 호출할 수 없어야합니다. 이를 위해서는 어떤
          method가 제거되었는지 정보가 필요합니다. createBuilder 함수에{" "}
          <code.ts variant="inline">omits</code.ts> 배열을 추가하여, data와 함께
          흐르도록 했습니다.
        </post.p>
        <Tabs>
          <TabsList className="w-full" defaultValue="createBuilder">
            <TabsTrigger value="createBuilder">createBuilder</TabsTrigger>
            <TabsTrigger value="omit">omit</TabsTrigger>
          </TabsList>
          <TabsContent value="createBuilder">
            <code.tsx>{CREATE_BUILDER}</code.tsx>
          </TabsContent>
          <TabsContent value="omit">
            <code.tsx>{OMIT_FN}</code.tsx>
          </TabsContent>
        </Tabs>
        <post.p>
          <code.ts variant="inline">setBun()</code.ts> 은 한번만 호출할 수
          있도록 강제하기 위해, <code.ts variant="inline">omits</code.ts>에
          자신의 이름을 넘겨줍니다. 반면에{" "}
          <code.ts variant="inline">addCheese()</code.ts>는 여러 번 호출할 수
          있기 때문에 기존 <code.ts variant="inline">omits</code.ts>를 그대로
          넘겨줍니다. 이렇게하면 제외된 함수가 누적되어 전달되기 때문에, 한번
          호출한 method는 계속 호출할 수 없게 됩니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>타입 추론과 method 가용성</post.h2>
        <post.p>
          체인이 진행될수록 <code.tsx variant="inline">omits</code.tsx> 가
          쌓이고, builder 타입에서 해당 method가 사라집니다. 각 단계에 대응하는
          체인 코드는 탭으로 전환해 확인할 수 있습니다.
        </post.p>
        <Tabs defaultValue="initial">
          <TabsList className="w-full">
            <TabsTrigger value="initial">Initial</TabsTrigger>
            <TabsTrigger value="setBun">setBun</TabsTrigger>
            <TabsTrigger value="setPatty">setPatty</TabsTrigger>
            <TabsTrigger value="setSauce">setSauce</TabsTrigger>
            <TabsTrigger value="build">build</TabsTrigger>
          </TabsList>
          <TabsContent value="initial">
            <code.tsx>{CLOSURE_STEP_INITIAL}</code.tsx>
          </TabsContent>
          <TabsContent value="setBun">
            <code.tsx>{CLOSURE_STEP_SET_BUN}</code.tsx>
          </TabsContent>
          <TabsContent value="setPatty">
            <code.tsx>{CLOSURE_STEP_SET_PATTY}</code.tsx>
          </TabsContent>
          <TabsContent value="setSauce">
            <code.tsx>{CLOSURE_STEP_SET_SAUCE}</code.tsx>
          </TabsContent>
          <TabsContent value="build">
            <code.tsx>{CLOSURE_USAGE}</code.tsx>
          </TabsContent>
        </Tabs>
      </post.section>

      <post.section>
        <post.h2>Class builder는 가능하지만 비추천</post.h2>
        <post.p>
          Closure 없이 class로도 비슷한 제약을 줄 수 있습니다. 관례대로{" "}
          <code.tsx variant="inline">return this</code.tsx> 대신{" "}
          <code.tsx variant="inline">return this as ...</code.tsx> 로 반환
          타입을 강제합니다. 하지만 method마다{" "}
          <code.tsx variant="inline">as</code.tsx> 타입이 달라지고, generic{" "}
          <code.tsx variant="inline">O</code.tsx> 를 누적해야 해서 정의가 금방
          복잡해집니다.
        </post.p>
        <Tabs defaultValue="class-impl">
          <TabsList className="w-full">
            <TabsTrigger value="class-impl">Class 구현</TabsTrigger>
            <TabsTrigger value="class-usage">사용 예</TabsTrigger>
          </TabsList>
          <TabsContent value="class-impl">
            <code.tsx>{CLASS_ONCE_BUILDER}</code.tsx>
          </TabsContent>
          <TabsContent value="class-usage">
            <code.tsx>{CLASS_ONCE_USAGE}</code.tsx>
          </TabsContent>
        </Tabs>
        <post.p>
          type은 재호출을 막지만, 런타임에는 동일한 instance가 돌아갑니다.{" "}
          <code.tsx variant="inline">as</code.tsx> 는 타입 검사만 우회할 뿐 실제
          동작을 바꾸지 않으므로, 타입을 무시하고 호출하면 여전히 덮어쓰기가
          일어납니다.
        </post.p>
        <post.p>
          Closure + <code.tsx variant="inline">omit</code.tsx> 방식은 호출마다
          새 builder 객체를 만들고 key를 제거하므로, 이런 문제가 발생하지
          않습니다.
        </post.p>
      </post.section>

      <post.section>
        <post.h2>한계점</post.h2>
        <post.p>
          <strong className="text-foreground font-medium">
            createBuilder 정의부 타입이 매우 복잡합니다.
          </strong>{" "}
          IDE에서 hover하면 중첩된{" "}
          <code.tsx variant="inline">Omit&lt;...&gt;</code.tsx> 트리가
          이어집니다. 타입이 복잡해서, typescript LSP의 동작이 오래걸릴 수
          있습니다. 즉, 대규모 코드베이스에서는 적합하지 않은 방식일 수
          있습니다.
        </post.p>
        <code.tsx>{COMPLEX_TYPE}</code.tsx>
        <post.p>
          <strong className="text-foreground font-medium">
            메모리 overhead가 있습니다.
          </strong>{" "}
          Class builder는 하나의 reference를 유지하지만, closure builder는
          method 호출마다 새 객체를 생성합니다. 비슷한 객체를 쉽게 만들기 위한
          가벼운 wrapper를 제공하는 것이 builder의 본래 목적이라고 한다면, 이
          방식은 메모리 관점에서 불리할 수 있습니다.
        </post.p>
      </post.section>
    </post.main>
  );
}

const HAMBURGER = `class Hamburger {
  constructor(
    private bun: string,
    private patty: string,
    private cheese: boolean,
    private vegetables: string[],
    private sauce: string,
  ) {}

  public describe(): void {
    console.log(
      [
        \`Bun: \${this.bun}\`,
        \`Patty: \${this.patty}\`,
        \`Cheese: \${this.cheese}\`,
        \`Vegetables: \${this.vegetables.join(", ")}\`,
        \`Sauce: \${this.sauce}\`,
      ].join("\\n"),
    );
  }
}`;

const HAMBURGER_BUILDER = `class HamburgerBuilder {
  public bun: string = "plain";
  public patty: string = "beef";
  public cheese: boolean = false;
  public vegetables: string[] = [];
  public sauce: string = "none";

  setBun(bun: string): HamburgerBuilder {
    this.bun = bun;
    return this;
  }

  setPatty(patty: string): HamburgerBuilder {
    this.patty = patty;
    return this;
  }

  addCheese(): HamburgerBuilder {
    this.cheese = true;
    return this;
  }

  addVegetable(vege: string): HamburgerBuilder {
    this.vegetables.push(vege);
    return this;
  }

  setSauce(sauce: string): HamburgerBuilder {
    this.sauce = sauce;
    return this;
  }

  build(): Hamburger {
    return new Hamburger(
      this.bun,
      this.patty,
      this.cheese,
      this.vegetables,
      this.sauce,
    );
  }
}`;

const CLASS_USAGE = `// setBun을 두 번 호출해도 타입 오류 없음 — 마지막 값만 남음
const overwritten = new HamburgerBuilder()
  .setBun("sesame")
  .setBun("brioche")
  .build();

overwritten.describe();
// Bun: brioche
// ...`;

const DATA_OBJ = `type Data = {
  bun: string;
  patty: string;
  cheese: boolean;
  vegetables: string[];
  sauce: string;
};

const _data = {
  bun: "plain",
  patty: "beef",
  cheese: false,
  vegetables: [],
  sauce: "none",
};`;

const METHOD_OBJ = `const method = {
  setBun: (bun: string) => {
    _data.bun = bun;
    return this;
  },
  setPatty: (patty: string) => {
    _data.patty = patty;
    return this;
  },
  addCheese: () => {
    _data.cheese = true;
    return this;
  },
  addVegetable(vege: string) {
    _data.vegetables.push(vege);
    return this;
  },
  setSauce(sauce: string) {
    _data.sauce = sauce;
    return this;
  },
  build() { ... },
};`;

const CREATE_METHOD_OBJ_FN = `function createBuilder() {
  const method = {
    setBun: (bun: string) => {
      _data.bun = bun;
      return createBuilder();
    },
    setPatty: (patty: string) => {
      _data.patty = patty;
      return createBuilder();
    },
    addCheese: () => {
      _data.cheese = true;
      return createBuilder();
    },
    addVegetable(vege: string) {
      _data.vegetables.push(vege);
      return createBuilder();
    },
    setSauce(sauce: string) {
      _data.sauce = sauce;
      return createBuilder();
    },
    build() { ... },
  };

  return method;
}`;

const PLUS_DATA_FLOW = `function createBuilder(data: Data = _data) {
  const method = {
    setBun: (bun: string) => {
      return createBuilder({ ...data, bun });
    },
    setPatty: (patty: string) => {
      return createBuilder({ ...data, patty });
    },
    addCheese: () => {
      return createBuilder({ ...data, cheese: true });
    },
    addVegetable(vege: string) {
      return createBuilder({ ...data, vegetables: [...data.vegetables, vege] });
    },
    setSauce(sauce: string) {
      return createBuilder({ ...data, sauce });
    },
    build() { ... },
  };

  return method;
}`;

const PLUS_DATA_FLOW_EXAMPLE = `const builder = createBuilder()
  .setBun("brioche")
  .setBun("plain") // <- 여전히 여러번 호출할 수 있음.
  .setPatty("test")
  .setSauce("bbq")
  .build();`;

const CREATE_BUILDER = `function createBuilder<O extends keyof typeof builder = never>(
  data: Data = _data,
  omits: O[] = [],
) {
  const method = {
    setBun: (bun: string) => {
      return createBuilder({ ...data, bun }, [...omits, "setBun"]);
    },
    ...,
    addCheese: () => {
      return createBuilder({ ...data, cheese: true }, omits);
    },
    ...,
    build() { ... },
  };

  return omit(method, omits);
}`;

const OMIT_FN = `function omit<
  T extends Record<string, unknown>,
  K extends keyof T,
>(
  obj: T,
  keys: readonly K[],
) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as K)),
  ) as Omit<T, K>;
}
`;

const CLOSURE_USAGE = `const myBurger = createBuilder()
  .setBun("brioche")
  .setPatty("test")
  .setSauce("bbq")
  .build();

myBurger.describe();
// Bun: brioche
// Patty: test
// Sauce: bbq
// ...
`;

const CLOSURE_STEP_INITIAL = `const builder = createBuilder();
// 사용 가능: setBun, setPatty, addCheese, addVegetable, setSauce, build`;

const CLOSURE_STEP_SET_BUN = `const builder = createBuilder()
  .setBun("brioche");
// 사용 가능: setPatty, addCheese, addVegetable, setSauce, build
// omit됨: setBun`;

const CLOSURE_STEP_SET_PATTY = `const builder = createBuilder()
  .setBun("brioche")
  .setPatty("test");
// 사용 가능: addCheese, addVegetable, setSauce, build
// omit됨: setBun, setPatty`;

const CLOSURE_STEP_SET_SAUCE = `const builder = createBuilder()
  .setBun("brioche")
  .setPatty("test")
  .setSauce("bbq");
// 사용 가능: addCheese, addVegetable, build
// omit됨: setBun, setPatty, setSauce`;

const CLASS_ONCE_BUILDER = `type OnceMethod =
  | "setBun"
  | "setPatty"
  | "addCheese"
  | "addVegetable"
  | "setSauce"
  | "build";

class OnceHamburgerBuilder<O extends OnceMethod = never> {
  private bun = "plain";
  private patty = "beef";
  private cheese = false;
  private vegetables: string[] = [];
  private sauce = "none";

  setBun(bun: string) {
    this.bun = bun;
    return this as Omit<
      OnceHamburgerBuilder<O | "setBun">,
      "setBun"
    >;
  }

  setPatty(patty: string) {
    this.patty = patty;
    return this as Omit<
      OnceHamburgerBuilder<O | "setPatty">,
      "setPatty"
    >;
  }

  addCheese() {
    this.cheese = true;
    return this as OnceHamburgerBuilder<O>;
  }

  addVegetable(vege: string) {
    this.vegetables.push(vege);
    return this as OnceHamburgerBuilder<O>;
  }

  setSauce(sauce: string) {
    this.sauce = sauce;
    return this as Omit<
      OnceHamburgerBuilder<O | "setSauce">,
      "setSauce"
    >;
  }

  build() {
    return new Hamburger(
      this.bun,
      this.patty,
      this.cheese,
      this.vegetables,
      this.sauce,
    );
  }
}`;

const CLASS_ONCE_USAGE = `const burger = new OnceHamburgerBuilder()
  .setBun("brioche")
  .setBun("plain") // <- 타입 오류: setBun은 이미 omit됨
  // .setPatty("test")
  // .setSauce("bbq")
  // .build();`;

const COMPLEX_TYPE = `function createBuilder<
  O extends
    | "setBun"
    | "setPatty"
    | "addCheese"
    | "addVegetable"
    | "setSauce"
    | "build" = never,
>(
  data?: Data,
  omits?: O[],
): Omit<{
  setBun: (bun: string) => Omit<{
    setBun: (bun: string) => Omit<..., O | "setBun">;
    setPatty: (patty: string) => Omit<{
      setBun: (bun: string) => Omit<..., O | "setBun" | "setPatty">;
      setPatty: (patty: string) => Omit<..., O | "setBun" | "setPatty">;
      addCheese: () => Omit<..., O | "setBun" | "setPatty">;
      addVegetable(vege: string): Omit<..., O | "setBun" | "setPatty">;
      setSauce(sauce: string): Omit<...>;
      build(): Hamburger;
    }, O | ... 1 more ... | "setPatty">;
    addCheese: () => Omit<...>;
    addVegetable(vege: string): Omit<...>;
    setSauce(sauce: string): Omit<...>;
    build(): Hamburger;
  }, O | "setBun">;
  ... 4 more ...;
  build(): Hamburger;
}, O>`;
