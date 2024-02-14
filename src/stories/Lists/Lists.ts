import { html } from "lit";
import { ListProps } from "../../components/inline-list";
import "../../components/inline-list";

export const MyList = (props: ListProps) => {
  return html`<my-list .name=${props.name} .items=${props.items}></my-list>`;
};
