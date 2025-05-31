export interface DoingSettings {
  notDoingText: string;
  lengthDoingText: string;
  workingOnLastTask: boolean;
  filename: string;
}

export const DEFAULT_SETTINGS: DoingSettings = {
  notDoingText: "",
  lengthDoingText: "",
  workingOnLastTask: false,
  filename: "doing.md",
};
