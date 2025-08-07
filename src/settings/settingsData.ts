export interface DoingSettings {
  notDoingText: string;
  lengthDoingText: string;
  filenamePath: string;
  workingOnLastTask: boolean;
}

export const DEFAULT_SETTINGS: DoingSettings = {
  notDoingText: "",
  lengthDoingText: "",
  filenamePath: "doing.md",
  workingOnLastTask: false,
};
