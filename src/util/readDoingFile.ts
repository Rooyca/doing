import { ButtonComponent } from "obsidian";
import DoingPlugin from "src/plugin/main";

export let taskPaused = false;
export const filename = 'doing.md';

export async function readDoingFile(file: TFile) {
  if (!file) return;
  const fileContents = await this.app.vault.read(file);
  const lastLineMatch = fileContents.match(/- \[( |PAUSED)\] .*$/m);
  return lastLineMatch;
}

export async function updateTaskStatus(pauseButton: ButtonComponent, file: TFile, taskPaused: boolean) {
  const lastLineMatch = await readDoingFile(file);
  pauseButton.setIcon("pause").setTooltip("Pause task");
        
  if (lastLineMatch && lastLineMatch[0].includes("[PAUSED]")) {
    taskPaused = true;
    pauseButton.setIcon("play").setTooltip("Resume task");
  } else if (lastLineMatch && lastLineMatch[0].includes("[ ]")) {
    taskPaused = false;
  }
}

export async function createDoing(file: TFile, doingName: string) {
  const now = new Date();
  const time = now.toLocaleTimeString();
  const fileCont = `- [ ] ${doingName} (${time})\n`;
  if (!file) {
    this.app.vault.create(filename, fileCont);
  } else this.app.vault.append(file!, fileCont);
}

export function setTaskPaused(value: boolean) {
  taskPaused = value;
}

export async function updateTitleBar(Tfile: TFile, titleBar: string) {
  try {
    const lastLine = await readDoingFile(Tfile);
    const str = lastLine[0]
    const regex = /- \[ \] (.*?) \((.*)\)/;
    const match = str.match(regex);
          
    if (match) {
      titleBar = match[1];
      //lengthDoingText
      const maxLen = parseInt(DoingPlugin.instance.settings.lengthDoingText) || 10;
      if (titleBar.length > maxLen) titleBar = titleBar.substring(0, maxLen) + "...";
    }
  } catch (e) {
    console.error(e);
    titleBar = DoingPlugin.instance.settings.notDoingText || "Doing(?)";
  }
  return titleBar;
}