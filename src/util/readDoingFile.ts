import { ButtonComponent, TFile, Vault } from "obsidian";
import DoingPlugin from "src/plugin/main";

export let taskPaused = false;

export async function readDoingFile(file: TFile) {
  if (!file) return;
  const workingOnLastTask = DoingPlugin.instance.settings.workingOnLastTask;
  const fileContents = await this.app.vault.read(file).then((data: string) => data.trim());
  let lastTask;
  let regex = /- \[( |PAUSED)\] (.*)$/m;

  if (workingOnLastTask) {
    const pausedRegex = /- \[PAUSED\] (.*)$/gm;
    const uncompletedRegex = /- \[ \] (.*)$/gm;

    const pausedMatch = [...fileContents.matchAll(pausedRegex)].pop();
    const uncompletedMatch = [...fileContents.matchAll(uncompletedRegex)].pop();

    if (pausedMatch) {
      lastTask = pausedMatch[0];
      regex = /- \[PAUSED\] (.*)$/m;
    } else if (uncompletedMatch) {
      lastTask = uncompletedMatch[0];
      regex = /- \[ \] (.*)$/m;
    }
  } else {
    const match = fileContents.match(regex);
    if (match) {
      lastTask = match[0];
    }
  }
  return lastTask;
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
  const date = now.toLocaleDateString();
  const format = DoingPlugin.instance.settings.taskFormat || "- [ ] {{task}} ({{time}})";

  // Replace placeholders
  const fileCont = "\n" + format
    .replace("{{task}}", doingName)
    .replace("{{time}}", time)
    .replace("{{date}}", date);

  if (!file) {
    await this.app.vault.create(DoingPlugin.instance.settings.filename, fileCont);
  } else {
    await this.app.vault.append(file, fileCont);
  }
}

export function setTaskPaused(value: boolean) {
  taskPaused = value;
}

export async function updateTitleBar(Tfile: TFile, titleBar: string) {
  try {
    const lastLine = await readDoingFile(Tfile);
    const regex = /- \[ \] (.*?) \((.*)\)/;
    const match = lastLine.match(regex);
          
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