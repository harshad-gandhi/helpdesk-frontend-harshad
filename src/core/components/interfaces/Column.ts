/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Column<T> {
  id: keyof T;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: any) => string;
}
