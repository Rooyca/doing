# 📋 Doing

## 🎉 Introduction

This is an updated version of the original Doing plugin made by [Rooyca](https://github.com/rooyca/doing)

Welcome to **Doing**, an Obsidian plugin designed to help you keep track of what task you were doing. This plugin is perfect for users who often find themselves switching contexts and need a quick reminder of their current task.

## 🚀 Features

- 📌 **Task Display**: Shows the current task in the status bar for easy reference.
- 📝 **Task Logging**: Stores all tasks in a custom location for future reference. (By Default it stores under the root directory as `doing.md`)

## 🛠️ Installation

1. **Download**: Get the latest version from the [GitHub releases page](https://github.com/Jack-Chronicle/doing/releases).
2. **Install**: Copy the plugin folder to your Obsidian plugins directory (`<vault>/.obsidian/plugins/`).
3. **Enable**: Open Obsidian, go to `Settings > Community Plugins`, and enable the plugin.

## 📖 Usage

1. **Add a Task**: To add a task, use the command palette (Ctrl/Cmd+P) and search for "doing: Add Task". Enter your task description and hit Enter.
2. **View Current Task**: Your current task will be displayed in the status bar at the bottom of Obsidian.
3. **Complete a Task**: Once you've completed a task. The task will be logged in the file with a timestamp.
4. **View Task History**: Open the task file to see a history of all your tasks.

## Customization

- **Max Length Status-bar**: How many character to display in status bar (By Default: 10 characters)
- **Status-bar text to display when not 'doing' anything**: Change what it says when there are no current tasks (By Default: Doing(?))
- **Pause Marker**: You can change how the tasks look when paused! (By Default: - [PAUSED])
- **File Location**: Change where the `doing.md` file is located, and what the filename is! Please put in the full path including filename and extension
- **Task Format**: You can customize how the Task is formatted when it's made (By Default: - [ ] {{task}} {{time}})
- **Time/Date Format**: Customize how the time and date wildcards are printed! (By Default: Date = YYYY-MM-DD, Time = HH:mm:ss)
  - *Note*: This only changes how they appear in source mode. If you have a different format for read mode, this will not change that and should follow the format expected by any other task plugins for source mode (i.e. Keep it as `YYYY-MM-DD` for most other plugins)

## 🌟 Contributing

We welcome contributions! If you have ideas for new features or improvements, feel free to open an issue or submit a pull request on our [GitHub repository](https://github.com/Jack-Chronicle/doing).

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub or reach out via our [support page](https://github.com/Jack-Chronicle/doing/issues).

## 📝 License

This plugin is licensed under the MIT License. See the [LICENSE](https://github.com/Jack-Chronicle/doing/blob/main/LICENSE) file for more details.