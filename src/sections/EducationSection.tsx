import { Section } from "../components/section";
import { LinkIcon } from "lucide-react";
import ssuImage from "@/assets/ssu.jpg";

export function EducationSection() {
  return (
    <Section id="education">
      <h1 className="text-5xl font-bold">학력사항</h1>
      <article className="flex flex-wrap justify-between gap-4">
        <div>
          <a href="https://cse.ssu.ac.kr/" className="text-4xl">
            <h2 className="inline border-b border-transparent transition-all duration-200 hover:border-white">
              SOONGSIL <span className="text-red-400">UNIV</span>ERSITY
            </h2>
            &nbsp;
            <LinkIcon className="inline size-5" />
          </a>
          <p className="mt-1">
            <span className="text-2xl">
              <span className="text-red-400">컴퓨터</span>학부 학사
            </span>
            <br />
            March 2020 - February 2026 <br />
            <span>졸업 예정</span>
          </p>
        </div>
        <img
          src={ssuImage}
          alt="숭실대학교 상징마크, 대동강의 물결과 한강의 물결을 상징하는 구부러지고 곧은 물결무늬 로고"
          className="size-32 origin-right rounded-3xl bg-white object-contain"
        />
      </article>
      <article className="flex flex-wrap justify-between gap-4">
        <div>
          <a
            href="https://school.jje.go.kr/namju-h/main.do"
            className="text-4xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="inline border-b border-transparent hover:border-white">
              NAMJU <span className="text-red-400">HIGH</span>&nbsp;SCHOOL
            </h2>
            &nbsp;
            <LinkIcon className="inline size-5" />
          </a>
          <p className="mt-1">
            <span className="text-2xl">
              인문계열 <span className="text-red-400">이과</span>
            </span>
            <br />
            March 2017 - February 2020 <br />
            <span>졸업</span>
          </p>
        </div>
        <img
          src="https://school.jje.go.kr/images/web/namju-h/sub/symbol_02.png"
          alt="남주고등학교 상징마크, 하늘을 향해 있는 3개의 펜촉 모양"
          className="size-32 origin-right rounded-3xl bg-white object-contain"
        />
      </article>
    </Section>
  );
}
