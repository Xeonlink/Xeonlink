import { useTheme } from "@/shared/hooks/use-theme";
import RednerMermaid from "react-x-mermaid";

type Props = {
  code: string;
};

export function Mermaid(props: Props) {
  const { code } = props;
  const { theme } = useTheme();

  const mermaidTheme = theme === "dark" ? "dark" : "default";

  return (
    <div>
      <RednerMermaid
        mermaidCode={code}
        mermaidConfig={{ theme: mermaidTheme }}
      />
    </div>
  );
}
