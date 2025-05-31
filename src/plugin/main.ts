import { Plugin, setIcon, setTooltip } from "obsidian";
import doingMenu from "src/ui/doingMenu";
import { DoingSettingTab } from "src/settings/settingsTab";
import { DoingSettings, DEFAULT_SETTINGS } from "src/settings/settingsData";
import NowDoingModal from "src/modal/nowDoingModal";
import { updateTitleBar } from "src/util/readDoingFile";

export default class DoingPlugin extends Plugin {
  static instance: DoingPlugin;
  settings: DoingSettings;
  statusBarIcon: HTMLElement;
  statusBarText: HTMLElement;

  async onload() {
    console.log(`Doing v${this.manifest.version} loaded`);

    DoingPlugin.instance = this;

    await this.loadSettings();

    this.addSettingTab(new DoingSettingTab(this.app, this));
    this.app.workspace.onLayoutReady(() => {
      setTimeout( async () => {
        await this.setupSnippetsStatusBarIcon();
      });
    });
  }

  async setupSnippetsStatusBarIcon() {
    this.statusBarIcon = this.addStatusBarItem();
    this.statusBarIcon.addClass("mod-clickable");

    setTooltip(this.statusBarIcon, 'Doing');
    this.statusBarIcon.setAttribute("data-tooltip-position", "top");

    setIcon(this.statusBarIcon, "panel-bottom-close");

    let titleBar = "Doing(?)";
    const file = this.app.vault.getFileByPath(this.settings.filename);
    titleBar = await updateTitleBar(file, titleBar);

    this.statusBarText = this.statusBarIcon.createEl("span", { text: titleBar, cls: "status-bar-text" });

    this.statusBarIcon.addEventListener("click", () => {
      doingMenu();
    });

    this.addCommand({
      id: `open-doing-create`,
      name: `Create new task`,
      callback: async () => {
        new NowDoingModal().open();
      },
    });
  }

  updateStatusBar(text: string) {
    if (this.statusBarText) {
      this.statusBarText.setText(text);
    }
  }

  onunload() {
    console.log("Doing unloaded");
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}