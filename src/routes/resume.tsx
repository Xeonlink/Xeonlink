import { ResumeLayout } from "@/features/resume/components/resume-layout";
import { AboutSection } from "@/features/resume/sections/AboutSection";
import { CertificationSection } from "@/features/resume/sections/CertificationSection";
import { EducationSection } from "@/features/resume/sections/EducationSection";
import { ExperienceSection } from "@/features/resume/sections/ExperienceSection";
import { ExtraSection } from "@/features/resume/sections/ExtraSection";
import { ProjectsSection } from "@/features/resume/sections/ProjectsSection";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "오지민 - 개발자 이력서" },
      {
        name: "description",
        content:
          "개발자 오지민의 포트폴리오입니다. 웹 개발, API 개발, 데이터베이스 설계 등 다양한 프로젝트 경험을 보여줍니다.",
      },
      {
        name: "keywords",
        content: "개발자, 포트폴리오, 웹개발, React, TypeScript, Node.js, 데이터베이스, API",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://portfolio.ohjimin.com/resume" },
      { property: "og:title", content: "오지민 - 개발자" },
      {
        property: "og:description",
        content: "개발자 오지민 입니다. 웹 개발, API 개발, 데이터베이스 설계 등 다양한 프로젝트 경험을 보여줍니다.",
      },
      { property: "og:image", content: "/selfie0_crop.jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "오지민 개발자 프로필 이미지" },
      { property: "twitter:card", content: "summary_large_image" },
      { property: "twitter:url", content: "https://portfolio.ohjimin.com/resume" },
      { property: "twitter:title", content: "오지민 - 개발자" },
      {
        property: "twitter:description",
        content:
          "개발자 오지민의 포트폴리오입니다. 웹 개발, API 개발, 데이터베이스 설계 등 다양한 프로젝트 경험을 보여줍니다.",
      },
      { property: "twitter:image", content: "/selfie0_crop.jpeg" },
      { property: "twitter:image:alt", content: "오지민 개발자 프로필 이미지" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "오지민",
          jobTitle: "개발자",
          description: "개발자",
          url: "https://portfolio.ohjimin.com/resume",
          image: "/selfie0_crop.jpeg",
          sameAs: ["https://github.com/Xeonlink"],
          worksFor: {
            "@type": "Organization",
            name: "개발자",
          },
        }),
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ResumeLayout>
      <AboutSection />
      <EducationSection />
      <CertificationSection />
      <ExperienceSection />
      <ProjectsSection />
      <ExtraSection />
    </ResumeLayout>
  );
}
