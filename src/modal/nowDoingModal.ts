import {
  Modal,
  Setting,
  TextComponent,
  ButtonComponent,
  Notice,
} from "obsidian";
import { getFilename, createDoing, updateTitleBar } from "src/util/readDoingFile";
import DoingPlugin from "src/plugin/main";

export default class NowDoingModal extends Modal {
  path: string;
  doingEl: HTMLDivElement;

  constructor() {
    super(app);
    this.onOpen = () => this.display(true);
  }

  private async display(focus?: boolean) {
    const { contentEl } = this;

    contentEl.empty();
    contentEl.setAttribute("style", "margin-top: 0px");

    const title = document.createElement("h1");
    title.setText("✍🏼 What are you doing?");
    contentEl.appendChild(title);

    const doingTitleSetting = new Setting(contentEl);
    const doingTitleValue = new TextComponent(doingTitleSetting.controlEl);
    doingTitleSetting
      .setName("I'm...")

    doingTitleValue.inputEl.onkeydown = (e) => {
      if (e.key === "Enter") doAdd();
    };

    const doAdd = async () => {
      let doingName = doingTitleValue.getValue();
      if (doingName) {
          new Notice("Your task has been created!");
          const Tfile = this.app.vault.getFileByPath(getFilename());
          await createDoing(Tfile, doingName);
          doingName = await updateTitleBar(Tfile, doingName);
          DoingPlugin.instance.updateStatusBar(doingName);
          doingTitleValue.setValue("");
      } else new Notice("Missing task title!");
    };
    const saveButton = new ButtonComponent(contentEl)
      .setButtonText("Create")
      .onClick(doAdd);
    saveButton.buttonEl.addClass("wg-button");
    doingTitleValue.inputEl.focus();
  }

  onClose(): void {
    const { contentEl } = this;
    contentEl.empty();
  }
}
