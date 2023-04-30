import { createElement } from "./createElement";
import { createKeyboard } from "./createKeyboard";

class App {
  constructor(body) {
    this.body = body;
  }

  render() {
    const header = createElement("header", "header");
    this.body.append(header);

    const title = createElement("h1", "title");
    title.textContent = "Virtual keyboard";
    header.append(title);

    const main = createElement("main", "main");
    this.body.append(main);

    const textArea = createElement("textarea", "textarea");
    textArea.setAttribute("rows", 5);
    textArea.setAttribute("cols", 50);
    main.append(textArea);

    const keyboard = createElement("div", "keyboard");
    main.append(keyboard);

    const textOS = createElement("p", "text");
    textOS.textContent =
      "The keyboard was created in the Windows operating system.";
    main.append(textOS);

    const textSwitchLanguage = createElement("p", "text");
    textSwitchLanguage.textContent =
      "To switch the language combination: left Ctrl + left Alt.";

    main.append(textSwitchLanguage);

    createKeyboard(keyboard);
    console.log("render!");
  }
}

export { App };
