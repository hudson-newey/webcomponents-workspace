import { ContextRoot } from "@lit/context";

export interface Logger {
  log: (message: string) => void;
}

export const root = new ContextRoot();
root.attach(document.body);
