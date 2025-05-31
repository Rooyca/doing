export interface DoingSettings {
  notDoingText: string;
  lengthDoingText: string;
  workingOnLastTask: boolean;
  filename: string;
  taskFormat: string;
  dateFormat: string;
  timeFormat: string;
  pausedMarker: string;
}

export const DEFAULT_SETTINGS: DoingSettings = {
  notDoingText: "",
  lengthDoingText: "",
  workingOnLastTask: false,
  pausedMarker: "PAUSED",
  filename: "doing.md",
  dateFormat: "YYYY-MM-DD",
  timeFormat: "HH:mm:ss",
  taskFormat: "- [ ] {{task}} ({{time}})",
};
