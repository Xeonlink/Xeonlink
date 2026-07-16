import { createOnigurumaEngine } from "@shikijs/engine-oniguruma";
import langBash from "@shikijs/langs/bash";
import langJs from "@shikijs/langs/javascript";
import langJson from "@shikijs/langs/json";
import langJsx from "@shikijs/langs/jsx";
import langPython from "@shikijs/langs/python";
import langTsx from "@shikijs/langs/tsx";
import langTs from "@shikijs/langs/typescript";
import themeDarkPlus from "@shikijs/themes/dark-plus";
import themeLightPlus from "@shikijs/themes/light-plus";
import { createHighlighterCore } from "shiki/core";
import wasm from "shiki/wasm";

export const highlighter = await createHighlighterCore({
  engine: createOnigurumaEngine(wasm),
  themes: [themeLightPlus, themeDarkPlus],
  langs: [langTs, langJs, langJsx, langTsx, langBash, langJson, langPython],
});
