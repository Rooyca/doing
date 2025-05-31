import { ButtonComponent, TFile, Vault } from "obsidian";
import dayjs from "dayjs";
import DoingPlugin from "src/plugin/main";

export let taskPaused = false;

export async function readDoingFile(file: TFile) {
  if (!file) return;
  const workingOnLastTask = DoingPlugin.instance.settings.workingOnLastTask;
  const fileContents = await this.app.vault.read(file).then((data: string) => data.trim());
  let lastTask;
  const pausedMarker = DoingPlugin.instance.settings.pausedMarker || "PAUSED";
  let regex = new RegExp(`- \\[( |${pausedMarker})\\] (.*)$`, "m");

  if (workingOnLastTask) {
    const pausedRegex = new RegExp(`- \\[${pausedMarker}\\] (.*)$`, "gm");
    const uncompletedRegex = /- \[ \] (.*)$/gm;

    const pausedMatch = [...fileContents.matchAll(pausedRegex)].pop();
    const uncompletedMatch = [...fileContents.matchAll(uncompletedRegex)].pop();

    if (pausedMatch) {
      lastTask = pausedMatch[0];
      regex = new RegExp(`- \\[${pausedMarker}\\] (.*)$`, "m");
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
  const pausedMarker = DoingPlugin.instance.settings.pausedMarker || "PAUSED";
  pauseButton.setIcon("pause").setTooltip("Pause task");
        
  if (lastLineMatch && lastLineMatch[0].includes(`[${pausedMarker}]`)) {
    taskPaused = true;
    pauseButton.setIcon("play").setTooltip("Resume task");
  } else if (lastLineMatch && lastLineMatch[0].includes("[ ]")) {
    taskPaused = false;
  }
}

export async function createDoing(file: TFile, doingName: string) {
  const now = dayjs();
  const dateFormat = DoingPlugin.instance.settings.dateFormat || "YYYY-MM-DD";
  const timeFormat = DoingPlugin.instance.settings.timeFormat || "HH:mm:ss";

  const formattedDate = now.format(dateFormat);
  const formattedTime = now.format(timeFormat);
  const format = DoingPlugin.instance.settings.taskFormat || "- [ ] {{task}} {{time}})";

  // Replace placeholders
  const fileCont = "\n" + format
    .replace("{{task}}", doingName)
    .replace("{{date}}", formattedDate)
    .replace("{{time}}", formattedTime);

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