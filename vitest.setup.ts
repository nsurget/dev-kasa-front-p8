import "@testing-library/jest-dom";
import React from "react";
import { vi } from "vitest";

// Mock next/image using React.createElement to avoid JSX compilation issues in non-TSX files
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    return React.createElement("img", { ...props });
  },
}));
