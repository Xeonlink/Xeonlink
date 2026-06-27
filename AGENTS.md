# AGENTS

## Assets

정적 이미지·아이콘·미디어는 **`src/assets/`** 에만 둔다.

- feature·route·shared 아래 `assets/` 폴더를 만들지 않는다.
- `public/`에는 `robots.txt`처럼 고정 URL이 필요한 비미디어 파일만 둔다.
- 참조는 Vite import만 사용한다: `@/assets/<filename>`
- `"/image.png"` 같은 `public/` 절대 경로는 쓰지 않는다.
- OG image, favicon, JSON-LD도 import한 URL을 사용한다.

```tsx
import profileImage from "@/assets/selfie0_crop2.jpeg";
import ogImage from "@/assets/selfie0_crop.jpeg";
```

파일명은 `snake_case` 또는 `kebab-case`를 유지한다. 사용하지 않는 에셋은 참조를 제거한 뒤 삭제한다.
