"use client";

import { useState } from "react";

const STORAGE_KEY = "sidebar-pinned";

export function useSidebarState() {
  const [isPinned, setIsPinned] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEY) === "true";
  });

  const [isHovered, setIsHovered] = useState(false);

  const togglePin = () => {
    setIsPinned((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  };

  const isExpanded = isPinned || isHovered;

  return {
    isPinned,
    isExpanded,
    togglePin,
    setIsHovered,
  };
}
