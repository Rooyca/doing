import type DoingPlugin from "src/plugin/main";
import { App, Setting, PluginSettingTab, TextComponent, ToggleComponent } from "obsidian";

export class DoingSettingTab extends PluginSettingTab {
  plugin: DoingPlugin;
  appendMethod: string;

  constructor(app: App, plugin: DoingPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    const legthDoingTextSetting = new Setting(containerEl);
    legthDoingTextSetting
      .setName("Max length status-bar")
      .setDesc(
        "Set the maximum number of characters to display in the status bar (10 by default)."
      );

    const legthDoingTextContent = new TextComponent(
      legthDoingTextSetting.controlEl
    );
    legthDoingTextContent
      .setValue(this.plugin.settings.lengthDoingText)
      .onChange(async (value) => {
        this.plugin.settings.lengthDoingText = value;
        this.plugin.saveSettings();
      });

    const textNotDoingSetting = new Setting(containerEl);
    textNotDoingSetting
      .setName("Status-bar text when not doing anything")
      .setDesc(
        "Set the text to display in the status-bar when no task is active. ('Doing(?)' by default)"
      );

    const textNotDoingContent = new TextComponent(
      textNotDoingSetting.controlEl
    );
    textNotDoingContent
      .setValue(this.plugin.settings.notDoingText)
      .onChange(async (value) => {
        this.plugin.settings.notDoingText = value;
        this.plugin.saveSettings();
      });

    const filenamePathSetting = new Setting(containerEl);
    filenamePathSetting
      .setName("Path to the 'doing' file")
      .setDesc(
        "Set the path to the file where tasks are stored. ('doing.md' by default)"
      );

    const filenamePathContent = new TextComponent(
      filenamePathSetting.controlEl
    );
    filenamePathContent
      .setValue(this.plugin.settings.filenamePath)
      .onChange(async (value) => {
        this.plugin.settings.filenamePath = value;
        this.plugin.saveSettings();
      });

    const workingOnLastTask = new Setting(containerEl);
    workingOnLastTask
      .setName("Working on last task")
      .setDesc(
        "If enabled, the most recent task will be display in the status bar."
      );

    const workingOnLastTaskContent = new ToggleComponent(workingOnLastTask.controlEl)
    workingOnLastTaskContent
      .setValue(this.plugin.settings.workingOnLastTask)
      .onChange(async (value) => {
        this.plugin.settings.workingOnLastTask = value;
        this.plugin.saveSettings();
      });
  }
}
