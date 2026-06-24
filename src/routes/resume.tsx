import ogImage from "@/assets/selfie0_crop.jpeg";
import { AboutSection } from "@/features/resume/sections/AboutSection";
import { CertificationSection } from "@/features/resume/sections/CertificationSection";
import { EducationSection } from "@/features/resume/sections/EducationSection";
import { ExperienceSection } from "@/features/resume/sections/ExperienceSection";
import { ExtraSection } from "@/features/resume/sections/ExtraSection";
import { ProjectsSection } from "@/features/resume/sections/ProjectsSection";
import { Button } from "@/shared/components/ui/button";
import { useToggle } from "@/shared/hooks/use-toggle";
import { cn } from "@/shared/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeftToLineIcon,
  ArrowRightIcon,
  ArrowUpToLineIcon,
  ChevronDownIcon,
  FilePlusIcon,
  GraduationCapIcon,
  IdCardIcon,
  InfoIcon,
  LaptopIcon,
  LightbulbIcon,
  MoonIcon,
  SunIcon,
  SunMoonIcon,
} from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";

type Theme = "light" | "dark" | "system";

const navItems = [
  {
    name: "ABOUT",
    icon: <InfoIcon className="size-5" />,
  },
  {
    name: "EDUCATION",
    icon: <GraduationCapIcon className="size-5" />,
  },
  {
    name: "CERTIFICATION",
    icon: <IdCardIcon className="size-5" />,
  },
  {
    name: "EXPERIENCE",
    icon: <LaptopIcon className="size-5" />,
  },
  {
    name: "PROJECTS",
    icon: <LightbulbIcon className="size-5" />,
  },
  {
    name: "EXTRA",
    icon: <FilePlusIcon className="size-5" />,
  },
];

const nextThemeMapper: Record<Theme, Theme> = {
  light: "dark",
  dark: "system",
  system: "light",
};

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
      { property: "og:image", content: ogImage },
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
      { property: "twitter:image", content: ogImage },
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
          image: ogImage,
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
  const navbar = useToggle(true, "isOpen");
  const topNavbar = useToggle(false, "isOpen");
  const { theme, setTheme } = useTheme();
  const currentTheme = (theme ?? "system") as Theme;
  const isReducedMotion = useReducedMotion();

  const changeTheme = () => {
    setTheme(nextThemeMapper[currentTheme]);
  };

  const scrollToById = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="flex h-screen">
        <nav
          className={cn(
            "flex md:w-72 flex-col overflow-y-scroll bg-sidebar-primary motion-safe:duration-1000 w-0 scrollbar-hide",
            {
              "md:w-17": !navbar.isOpen,
            },
          )}
          style={{
            transitionDelay: !navbar.isOpen && !isReducedMotion ? `${(navItems.length - 3) * 100}ms` : "0ms",
          }}
        >
          <ul className="flex-1 p-2">
            {navItems.map((item, index) => (
              <li key={item.name}>
                <Button
                  variant="ghost"
                  className="h-12 w-full justify-start text-2xl"
                  role="link"
                  onClick={() => scrollToById(item.name.toLowerCase())}
                >
                  <div className="flex items-center">
                    {item.icon}
                    <span
                      className={cn("ml-4 motion-safe:duration-700", {
                        "ml-20 opacity-0": !navbar.isOpen,
                      })}
                      style={{
                        transitionDelay: !isReducedMotion ? `${index * 100}ms` : "0ms",
                      }}
                    >
                      {item.name}
                    </span>
                  </div>
                </Button>
              </li>
            ))}
          </ul>
          <ul className="p-2">
            <li className="list-disc">
              <Button variant="ghost" className="w-full justify-start" onClick={() => changeTheme()}>
                <div className="flex items-center">
                  {currentTheme === "light" ? <SunIcon className="size-5" /> : null}
                  {currentTheme === "dark" ? <MoonIcon className="size-5" /> : null}
                  {currentTheme === "system" ? <SunMoonIcon className="size-5" /> : null}
                  <span
                    className={cn("ml-3 motion-safe:duration-700", {
                      "ml-20 opacity-0": !navbar.isOpen,
                    })}
                  >
                    {currentTheme.toUpperCase()} <ArrowRightIcon className="inline size-4" />{" "}
                    {nextThemeMapper[currentTheme].toUpperCase()}
                  </span>
                </div>
              </Button>
            </li>
            <li className="list-disc">
              <Button variant="ghost" className="w-full justify-start" onClick={() => navbar.toggle()}>
                <div className="flex items-center">
                  <ArrowLeftToLineIcon
                    className={cn("size-5 motion-safe:duration-700", {
                      "rotate-180": !navbar.isOpen,
                    })}
                  />
                  <span
                    className={cn("ml-3 motion-safe:duration-700", {
                      "ml-20 opacity-0": !navbar.isOpen,
                    })}
                  >
                    CLOSE
                  </span>
                </div>
              </Button>
            </li>
          </ul>
        </nav>

        <nav
          className={cn(
            "fixed w-full md:h-0 bg-sidebar-primary motion-safe:duration-1000 h-104 overflow-hidden z-20 max-md:pt-6",
            {
              "max-md:h-10": !topNavbar.isOpen,
            },
          )}
          style={{
            transitionDelay: !topNavbar.isOpen && !isReducedMotion ? `${(navItems.length - 3) * 100}ms` : "0ms",
          }}
        >
          <ul className="p-2">
            {navItems.map((item, index) => (
              <li key={item.name}>
                <Button
                  variant="ghost"
                  className="h-12 w-full justify-start text-2xl"
                  onClick={() => {
                    scrollToById(item.name.toLowerCase());
                    topNavbar.setFalse();
                  }}
                >
                  <div className="flex items-center">
                    {item.icon}
                    <span
                      className={cn("ml-4 motion-safe:duration-700", {
                        "ml-20 opacity-0": !topNavbar.isOpen,
                      })}
                      style={{
                        transitionDelay: !isReducedMotion ? `${index * 100}ms` : "0ms",
                      }}
                    >
                      {item.name}
                    </span>
                  </div>
                </Button>
              </li>
            ))}
          </ul>
          <ul className="p-2">
            <li>
              <Button variant="ghost" className="w-full justify-start" onClick={() => changeTheme()}>
                <div className="flex items-center">
                  {currentTheme === "light" ? <SunIcon className="size-5" /> : null}
                  {currentTheme === "dark" ? <MoonIcon className="size-5" /> : null}
                  {currentTheme === "system" ? <SunMoonIcon className="size-5" /> : null}
                  <span
                    className={cn("ml-4 motion-safe:duration-700", {
                      "ml-20 opacity-0": !topNavbar.isOpen,
                    })}
                    style={{
                      transitionDelay: !isReducedMotion ? `${navItems.length * 100}ms` : "0ms",
                    }}
                  >
                    {currentTheme.toUpperCase()} <ArrowRightIcon className="inline size-4" />{" "}
                    {nextThemeMapper[currentTheme].toUpperCase()}
                  </span>
                </div>
              </Button>
            </li>
          </ul>

          <Button
            variant="ghost"
            className="absolute bottom-0 left-0 right-0 h-10 rounded-none"
            onClick={() => topNavbar.toggle()}
          >
            <ChevronDownIcon
              className={cn("size-10 motion-safe:duration-700 motion-safe:animate-[bounce_2s_linear_infinite] mt-3", {
                "rotate-180 mt-0": topNavbar.isOpen,
              })}
              style={{
                transitionDelay: !topNavbar.isOpen && !isReducedMotion ? `${(navItems.length - 3) * 100}ms` : "0ms",
              }}
            />
            <span className="sr-only">toggle expand or shrink top navigation section</span>
          </Button>
        </nav>

        <div className="mt-10 flex-1 overflow-y-auto md:mt-0">
          <AboutSection />
          <EducationSection />
          <CertificationSection />
          <ExperienceSection />
          <ProjectsSection />
          <ExtraSection />
        </div>
      </div>
      <div className="group fixed right-0 bottom-0">
        <Button
          variant="outline"
          className="mr-8 mb-8 size-10 motion-safe:duration-500 group-hover:size-20"
          onClick={() => scrollToById("about")}
        >
          <ArrowUpToLineIcon className="size-6 motion-safe:duration-300 group-hover:size-10" />
          <span className="sr-only">scroll to top</span>
        </Button>
      </div>
    </>
  );
}
