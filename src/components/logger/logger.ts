import { consume, ContextRoot } from "@lit/context";
import { LitElement } from "lit";
import { property } from "lit/decorators.js";

export interface ILogger {
  log: (message: string) => void;
}

export const rootContext = new ContextRoot();
rootContext.attach(document.body);

export class LoggerImplementation extends LitElement {
  @consume({ context: rootContext, subscribe: true })
  @property({ attribute: false })
  public logger?: ILogger;

  protected doThing(): void {
    this.logger?.log("Hello, world!");
  }
}
