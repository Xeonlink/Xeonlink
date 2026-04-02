# Repository 구성

이 Repository는 main* 패턴을 만족하는 여러개의 orphan branch로 구성되어 있다. 각 브랜치는 최초 커밋(뿌리)부터 다르며 일반적인 방법으로 orphan branch끼리는 merge할 수 없다. 

각각의 orphan branch는 서로 다른 실험적 레포지토리를 나타내며, 개발을 하면서 유용하게 활용했던 유틸리티 성격의 파일들을 유지보수하고 아카이브하는 역할을 한다.

## Orphan Banch와 Untracted status

orphan branch는 하나의 레포지토리안에서 브랜치를 사용하여 프로젝트를 격리하는 아주 좋은 도구이지만, 한계점도 명확하다. 그 중 개인적으로 가장 치명적이라고 느껴졌던 것은 Untracted file이었다.

- Orphan Branch A (.gitignore includes node_modules)
- Orphan Branch B (.gitignore not includes node_modules)

위와 같이 한쪽에 .gitignore에만 특정 규칙이 표함되어 있다면, switch를 했을 때 사라지지 않고 폴더에 남아 깔끔하게 브랜치가 바뀌지 않는다.

### 해결방법

```bash
git config --global alias.clean-switch '!f() { git clean -fdX && git switch "$@"; }; f'
```

위 명령어를 등록하여 switch를 할 때는 git clean-switch {branch_name} 으로 switch를 하도록 한다. 

```bash
git clean -fdx
```

위 명령어는 .gitignore에 적힌 패턴을 만족하는 모든 파일을 제거한다.