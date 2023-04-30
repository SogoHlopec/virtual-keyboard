import * as data from "./data";
import { createKeyboard } from "./createKeyboard";

const events = () => {
  const keyboard = document.querySelector(".keyboard");
  let capsLockActive = false;
  const arr = [];
  const pressedKeys = new Set();

  document.addEventListener("keydown", (event) => {
    try {
      arr.push(event.key);
      console.log(arr);
      pressedKeys.add(event.key);

      if (pressedKeys.has("Alt") && pressedKeys.has("Control")) {
        if (localStorage.getItem("language") === "En") {
          localStorage.setItem("language", "Ru");
          keyboard.innerHTML = "";
          createKeyboard(keyboard, data.codes, data.keysRu);
        } else if (localStorage.getItem("language") === "Ru") {
          localStorage.setItem("language", "En");
          keyboard.innerHTML = "";
          createKeyboard(keyboard, data.codes, data.keysEn);
        }
      }

      if (event.code === "Tab" || event.key === "Alt") {
        event.preventDefault();
      }
      if (capsLockActive) {
        capsLockActive = false;
      } else if (event.code === "CapsLock") {
        capsLockActive = true;
      }
      keyboard
        .querySelector(`.${event.code}`)
        .classList.add("keyboard__key_active");
    } catch (error) {
      return;
    }
  });

  document.addEventListener("keyup", (event) => {
    try {
      pressedKeys.delete(event.key);
      if (capsLockActive) return;
      keyboard
        .querySelector(`.${event.code}`)
        .classList.remove("keyboard__key_active");
    } catch (error) {
      return;
    }
  });
};

export { events };
