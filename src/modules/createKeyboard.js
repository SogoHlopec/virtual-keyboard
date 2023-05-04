import { createElement } from "./createElement";

const createKeyboard = (parent, codes, keys) => {
  for (let i = 0; i < keys.length; i++) {
    const key = createElement("div", codes[i]);
    key.textContent = keys[i];
    key.classList.add("keyboard__key");
    parent.append(key);
  }
};

export { createKeyboard };
