export interface DoingSettings {
  notDoingText: string;
  lengthDoingText: string;
  workingOnLastTask: boolean;
  filename: string;
  taskFormat: string;
}

export const DEFAULT_SETTINGS: DoingSettings = {
  notDoingText: "",
  lengthDoingText: "",
  workingOnLastTask: false,
  filename: "doing.md",
  taskFormat: "- [ ] {{task}} ({{time}})",
};
