export interface DoingSettings {
  notDoingText: string;
  lengthDoingText: string;
  workingOnLastTask: boolean;
}

export const DEFAULT_SETTINGS: DoingSettings = {
  notDoingText: "",
  lengthDoingText: "",
  workingOnLastTask: false,
};
