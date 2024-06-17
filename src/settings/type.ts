import { Menu, MenuItem } from "obsidian";

export type EnhancedMenu = Menu & {
  dom: HTMLElement;
  items: EnhancedMenuItem[];
  setUseNativeMenu: Function;
};

export type EnhancedMenuItem = MenuItem & {
  dom: HTMLElement;
  handleEvent(event: Event): void;
  disabled: boolean;
};
