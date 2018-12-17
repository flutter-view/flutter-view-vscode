# flutter-view-vscode

![Flutter view in VSCode animation](https://raw.githubusercontent.com/flutter-view/website/master/images/flutter-view-demo-anim.gif)

VS Code support for **[flutter-view](https://flutter-view.io)**. Flutter-view allows you to lay out your Flutter apps faster, using Pug/HTML and Sass/CSS.

This extension allows you to inspect pug files and see the generated dart code behind it, as well as navigate to it. This makes navigating between Pug source and generated Dart code quicker and more pleasant.

## Features

- Mouse hover over a Pug tag with the command key pressed to see a hover window with the generated Dart code.
- Mouse click an a Pug tag with command key pressed to navigate to that point in the generated Dart code.
- Rightclick a Pug tag and select **Peek Definition** to open an in-editor area with the generated Dart code you can see and edit.

## Requirements

No requirements besides having a working project with **flutter-view** generated code.

Use this extension in combination with the [Project Links extension](https://marketplace.visualstudio.com/items?itemName=KyleDavidE.vscode-project-links) to make working with **flutter-view** a lot more comfortable in VSCode.

## Known Issues

Not all Pug elements will be linking to code, because not all elements are translated into Dart code.

## Release Notes

### 1.0.0

Initial release
