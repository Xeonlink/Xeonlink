import {
  ArrowLeftToLineIcon,
  ArrowRightIcon,
  ArrowUpToLineIcon,
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
import type { Theme } from "./components/theme-provider";
import { Button } from "./components/ui/button";
import { ScrollArea } from "./components/ui/scroll-area";
import { useTheme } from "./hooks/use-theme";
import { useToggle } from "./hooks/use-toggle";
import { cn } from "./lib/utils";
import { AboutSection } from "./sections/AboutSection";
import { CertificationSection } from "./sections/CertificationSection";
import { EducationSection } from "./sections/EducationSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { ExtraSection } from "./sections/ExtraSection";
import { ProjectsSection } from "./sections/ProjectsSection";

type NavItem = {
  name: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
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
  // {
  //   name: "SKILLS",
  //   icon: <WrenchIcon className="size-5" />,
  // },
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

export function App() {
  const navbar = useToggle(true, "isOpen");
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    setTheme(nextThemeMapper[theme]);
  };

  const scrollToById = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <nav
        className={cn(
          "flex w-72 flex-col overflow-y-scroll bg-sidebar-primary transition-all duration-1000 max-md:w-0",
          {
            "w-17": !navbar.isOpen,
          },
        )}
        style={{
          transitionDelay: !navbar.isOpen ? `${(navItems.length - 3) * 100}ms` : "0ms",
        }}
      >
        {/* 네비게이션 메뉴 */}
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
                    className={cn("ml-4 transition-all duration-700", {
                      "ml-20 opacity-0": !navbar.isOpen,
                    })}
                    style={{
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    {item.name}
                  </span>
                </div>
              </Button>
            </li>
          ))}
        </ul>
        {/* 각종 조작버튼 */}
        <ul className="p-2">
          <li>
            <Button variant="ghost" className="w-full justify-start" onClick={() => changeTheme()}>
              <div className="flex items-center">
                {theme === "light" ? <SunIcon className="size-5" /> : null}
                {theme === "dark" ? <MoonIcon className="size-5" /> : null}
                {theme === "system" ? <SunMoonIcon className="size-5" /> : null}
                <span
                  className={cn("ml-3 transition-all duration-700", {
                    "ml-20 opacity-0": !navbar.isOpen,
                  })}
                >
                  {theme.toUpperCase()}
                  &nbsp;
                  <ArrowRightIcon className="inline size-4" />
                  &nbsp;
                  {nextThemeMapper[theme].toUpperCase()}
                </span>
              </div>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navbar.toggle()}>
              <div className="flex items-center">
                <ArrowLeftToLineIcon
                  className={cn("size-5 transition-all duration-700", {
                    "rotate-180": !navbar.isOpen,
                  })}
                />
                <span
                  className={cn("ml-3 transition-all duration-700", {
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

      <ScrollArea className="flex-1">
        <AboutSection />
        <EducationSection />
        <CertificationSection />
        <ExperienceSection />
        <ProjectsSection />
        <ExtraSection />
      </ScrollArea>

      <div className="group absolute right-0 bottom-0">
        <Button
          variant="outline"
          className="mr-8 mb-8 size-10 duration-500 group-hover:size-20"
          onClick={() => scrollToById("about")}
        >
          <ArrowUpToLineIcon className="size-6 transition-all duration-300 group-hover:size-10" />
        </Button>
      </div>
    </div>
  );
}
