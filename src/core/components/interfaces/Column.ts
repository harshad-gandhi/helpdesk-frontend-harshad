/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from "react";

export interface Column<T> {
  id: keyof T | "actions";
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
  render?: (row: T) => ReactNode;
}
