import type DoingPlugin from "src/plugin/main";
import { App, Setting, PluginSettingTab, TextComponent } from "obsidian";

export class DoingSettingTab extends PluginSettingTab {
  plugin: DoingPlugin;
  appendMethod: string;

  constructor(app: App, plugin: DoingPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

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
  }
}
