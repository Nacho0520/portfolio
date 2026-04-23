"use client";

import {
  SiPython,
  SiJavascript,
  SiReact,
  SiPhp,
  SiHtml5,
  SiCss,
  SiMysql,
  SiGooglebigquery,
  SiR,
  SiN8N,
  SiMake,
  SiMicrostrategy,
} from "react-icons/si";
import { Brain, Sparkles, Workflow, LineChart, BarChart3 } from "lucide-react";
import type { ComponentType } from "react";

type IconProps = { className?: string; "aria-hidden"?: boolean };

const registry: Record<string, ComponentType<IconProps>> = {
  SiPython: (p) => <SiPython {...p} />,
  SiJavascript: (p) => <SiJavascript {...p} />,
  SiReact: (p) => <SiReact {...p} />,
  SiPhp: (p) => <SiPhp {...p} />,
  SiHtml5: (p) => <SiHtml5 {...p} />,
  SiCss: (p) => <SiCss {...p} />,
  SiMysql: (p) => <SiMysql {...p} />,
  SiGooglebigquery: (p) => <SiGooglebigquery {...p} />,
  SiR: (p) => <SiR {...p} />,
  SiMicrostrategy: (p) => <SiMicrostrategy {...p} />,
  n8n: (p) => <SiN8N {...p} />,
  make: (p) => <SiMake {...p} />,
  flowise: (p) => <Workflow {...p} />,
  brain: (p) => <Brain {...p} />,
  sparkles: (p) => <Sparkles {...p} />,
  workflow: (p) => <Workflow {...p} />,
  "line-chart": (p) => <LineChart {...p} />,
  "bar-chart": (p) => <BarChart3 {...p} />,
};

export function SkillIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = registry[name] ?? registry.sparkles;
  return <Cmp className={className} aria-hidden />;
}
