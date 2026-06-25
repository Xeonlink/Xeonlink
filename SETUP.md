# Repository 구성

이 Repository는 main#* 패턴을 만족하는 여러개의 orphan branch로 구성되어 있다. 각 브랜치는 최초 커밋(뿌리)부터 다른 orphan branch이다.

각각의 orphan branch는 서로 다른 실험적 레포지토리를 격리하고 추적하며, 개발을 하면서 유용하게 활용했던 유틸리티 성격의 파일들을 유지보수하고 아카이브하는 역할을 한다.

## Orphan Banch와 Untracted status

orphan branch는 하나의 레포지토리안에서 브랜치를 사용하여 프로젝트를 격리하는 아주 좋은 도구이지만, 한계점도 명확하다. 그 중 치명적인 문제점 중 하나는 Untracted file의 처리이다. 예를 들어 아래와 같은 orphan branch A와 B가 있다고 해보자.

```
orphan-branch-A/
├── .gitignore   # node_modules 포함
├── ...
└── node_modules/  (git에서 무시됨)

orphan-branch-B/
├── .gitignore   # node_modules 미포함
├── ...
└── node_modules/  (untracked로 남음)
```

브랜치 A의 .gitignore에는 node_modules가 포함되어있고, B의 .gitignore에는 node_modules가 포함되어있지 않다. 즉, A 브랜치는 node_modules를 추적하지 않고, B 브랜치는 node_modules를 추적한다.

이때 브랜치 A에서 npm install을 하여 node_modules를 생성한 다음, 브랜치 B로 switch를 하면 node_modules는 .gitignore에 없으므로, untracted로 간주되어 새로운 폴더가 레포지토리에 추가된 것으로 판단된다.

하지만 이러한 동작은 우리가 의도와는 다르다. orphan branch를 이용하여 하나의 레포지토리안에서 프로젝트를 격리시키려는 목적과 맞지 않다. 그렇다면 이 문제를 어떻게 해결할 수 있을까?

### 해결방법

정말 다행히도 git에는 clean 명령어가 있어. untracted 상태인 대상을 제거하는 명령어가 있다.

```bash
git clean -fdx
# 또는
git clean -nfdx
```

- -f (force): 강제로 제거한다.
- -d (directory): 폴더인 경우에도 대상에 포함한다.
- -x (exclude): .gitignore에 명시된 파일도 제거한다.
- -n (dry run): 제거하기 전, 제거될 대상을 확인한다.

하지만 매번 switch할 때마다, clean 명령어를 사용하는 것은 매우 귀찮은 일이다. git의 command alias 기능을 사용해보자.

```bash
# global scope 에서 사용하고 싶을 때
git config --global alias.clean-switch '!f() { git clean -fdX && git switch "$@"; }; f'
```
```bash
# local scope (scope를 명시하여)
git config --local alias.clean-switch '!f() { git clean -fdX && git switch "$@"; }; f'
```

```bash
# local scope (scope를 명시하지 않아도됨)
git config alias.clean-switch '!f() { git clean -fdX && git switch "$@"; }; f'
```

위 명령어를 등록하여 switch를 할 때는 git clean-switch {branch_name} 으로 switch를 하도록 한다. 명령어를 보면 알 수 있듯이, clean을 사용하여 .gitignore에 명시된 폴더나 파일을 전부 제거한 이후에 switch를 한다.

global scope로 설정하여, 다른 레포지토리에서도 해당 alias를 사용할 수 있고 local scope로 저장하면 이 레포지토리의 범위안에서만 사용할 수 있다.