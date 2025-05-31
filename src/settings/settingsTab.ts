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

      // Custom Task Paused Marker
      new Setting(containerEl)
        .setName("Paused Task Marker")
        .setDesc("Customize the tag/text that marks a task as paused (e.g., PAUSED, ZZZ, ON HOLD, '/', etc.)")
        .addText(text => 
          text
            .setValue(this.plugin.settings.pausedMarker)
            .onChange(async (value) => {
              this.plugin.settings.pausedMarker = value || "PAUSED";
              await this.plugin.saveSettings();
            })
        );

      // Date & Time Format Options
      new Setting(containerEl)
        .setName("Date Format")
        .setDesc("Customize the date format (e.g., YYYY-MM-DD). See dayjs docs for tokens.")
        .addText(text => text
          .setValue(this.plugin.settings.dateFormat)
          .onChange(async (value) => {
            this.plugin.settings.dateFormat = value;
            await this.plugin.saveSettings();
          }));

      new Setting(containerEl)
        .setName("Time Format")
        .setDesc("Customize the time format (e.g., HH:mm:ss). See dayjs docs for tokens.")
        .addText(text => text
          .setValue(this.plugin.settings.timeFormat)
          .onChange(async (value) => {
            this.plugin.settings.timeFormat = value;
            await this.plugin.saveSettings();
          }));

    // Task File Location
    new Setting(containerEl)
      .setName("Task File Location")
      .setDesc("Path to your task file (e.g., Example/Tasks/doing.md).")
      .addText(text => text
        .setPlaceholder("Enter file path here")
        .setValue(this.plugin.settings.filename)
        .onChange(async (value) => {
          this.plugin.settings.filename = value;
          await this.plugin.saveSettings();
        })
      );

      // Task Format
      new Setting(containerEl)
        .setName("Task Format")
        .setDesc("Customize how your tasks are formatted. Available Options are: {{task}} {{time}} and {{date}}")
        .addText((text: TextComponent) =>
          text
            .setValue(this.plugin.settings.taskFormat)
            .onChange(async (value: string) => {
              this.plugin.settings.taskFormat = value;
              await this.plugin.saveSettings();
            })
        );

  }
}
