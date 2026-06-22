import { createElement, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return createElement(
    Tag,
    { className: cn("container-page", className) },
    children,
  );
}
