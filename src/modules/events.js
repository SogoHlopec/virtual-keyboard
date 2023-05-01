import * as data from "./data";
import { createKeyboard } from "./createKeyboard";
let capsLockActive = false;
let shiftActive = false;

const events = () => {
  const keyboard = document.querySelector(".keyboard");
  const textarea = document.querySelector(".textarea");
  // const arr = [];
  const pressedKeys = new Set();

  const changeLanguage = () => {
    if (localStorage.getItem("language") === "En") {
      localStorage.setItem("language", "Ru");
      keyboard.innerHTML = "";
      createKeyboard(keyboard, data.codes, data.keysRu);
      keyboard
        .querySelector(".ControlLeft")
        .classList.add("keyboard__key_active");
      keyboard.querySelector(".AltLeft").classList.add("keyboard__key_active");
    } else if (localStorage.getItem("language") === "Ru") {
      localStorage.setItem("language", "En");
      keyboard.innerHTML = "";
      createKeyboard(keyboard, data.codes, data.keysEn);
      keyboard
        .querySelector(".ControlLeft")
        .classList.add("keyboard__key_active");
      keyboard.querySelector(".AltLeft").classList.add("keyboard__key_active");
    }
  };

  const capsOff = () => {
    keyboard.querySelectorAll(".keyboard__key").forEach((element) => {
      if (
        (localStorage.getItem("language") === "En"
          ? data.capsKeysEn
          : data.capsKeysRu
        ).includes(element.textContent.toUpperCase())
      ) {
        element.textContent = element.textContent.toLowerCase();
      }
    });
  };

  const capsOn = () => {
    keyboard.querySelectorAll(".keyboard__key").forEach((element) => {
      if (
        (localStorage.getItem("language") === "En"
          ? data.capsKeysEn
          : data.capsKeysRu
        ).includes(element.textContent.toUpperCase())
      ) {
        element.textContent = element.textContent.toUpperCase();
      }
    });
  };

  const changeTextarea = (event) => {
    if (
      !data.notSymbols.includes(event.code) &&
      document.activeElement !== textarea &&
      capsLockActive
    ) {
      textarea.value += keyboard
        .querySelector(`.${event.code}`)
        .textContent.toUpperCase();
    } else if (
      !data.notSymbols.includes(event.code) &&
      document.activeElement !== textarea
    ) {
      textarea.value += keyboard.querySelector(`.${event.code}`).textContent;
    } else if (
      event.code === "Backspace" &&
      document.activeElement !== textarea
    ) {
      textarea.value = textarea.value.slice(0, textarea.value.length - 1);
    } else if (event.code === "Tab") {
      textarea.value += "    ";
    } else if (event.code === "Enter" && document.activeElement !== textarea) {
      textarea.value += "\n";
    }
  };

  document.addEventListener("keydown", (event) => {
    try {
      // arr.push(event.key);
      // console.log(arr);

      pressedKeys.add(event.code);

      if (pressedKeys.has("AltLeft") && pressedKeys.has("ControlLeft")) {
        changeLanguage();
      }

      if (event.code === "Tab" || event.key === "Alt") {
        event.preventDefault();
      }
      if (event.code === "CapsLock" && capsLockActive) {
        capsLockActive = false;
        capsOff();
      } else if (event.code === "CapsLock") {
        capsLockActive = true;
        capsOn();
      }
      if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
        shiftActive = true;
        keyboard.innerHTML = "";
        createKeyboard(
          keyboard,
          data.codes,
          localStorage.getItem("language") === "En"
            ? data.shiftKeysEn
            : data.shiftKeysRu
        );
      }

      changeTextarea(event);

      keyboard
        .querySelector(`.${event.code}`)
        .classList.add("keyboard__key_active");
    } catch (error) {
      return;
    }
  });

  document.addEventListener("keyup", (event) => {
    try {
      pressedKeys.delete(event.code);
      if (capsLockActive && event.code !== "CapsLock") {
        keyboard
          .querySelector(`.${event.code}`)
          .classList.remove("keyboard__key_active");
      } else if (event.code === "CapsLock" && !capsLockActive) {
        keyboard
          .querySelector(`.${event.code}`)
          .classList.remove("keyboard__key_active");
      } else if (event.code !== "CapsLock") {
        keyboard
          .querySelector(`.${event.code}`)
          .classList.remove("keyboard__key_active");
      }
      if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
        shiftActive = false;
        keyboard.innerHTML = "";
        createKeyboard(
          keyboard,
          data.codes,
          localStorage.getItem("language") === "En" ? data.keysEn : data.keysRu
        );
      }
    } catch (error) {
      return;
    }
  });

  keyboard.addEventListener("click", (event) => {
    if (event.target.classList.contains("keyboard__key")) {
      if (!data.notSymbols.includes(event.target.textContent)) {
        textarea.value += event.target.textContent;
      } else if (event.target.textContent === "Backspace") {
        textarea.value = textarea.value.slice(0, textarea.value.length - 1);
      } else if (event.target.textContent === "Tab") {
        textarea.value += "    ";
      } else if (event.target.textContent === "Enter") {
        textarea.value += "\n";
      } else if (event.target.textContent === "CapsLock") {
        if (capsLockActive) {
          capsLockActive = false;
          event.target.classList.remove("keyboard__key_active");
        } else {
          capsLockActive = true;
          event.target.classList.add("keyboard__key_active");
        }
      }
    }
  });

  keyboard.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("keyboard__key")) {
      if (
        event.target.classList.contains("ShiftLeft") ||
        event.target.classList.contains("ShiftRight")
      ) {
        shiftActive = true;
        event.target.classList.add("keyboard__key_active");
        keyboard.innerHTML = "";
        createKeyboard(
          keyboard,
          data.codes,
          localStorage.getItem("language") === "En"
            ? data.shiftKeysEn
            : data.shiftKeysRu
        );
      }
    }
  });

  keyboard.addEventListener("mouseup", (event) => {
    if (event.target.classList.contains("keyboard__key")) {
      if (
        event.target.classList.contains("ShiftLeft") ||
        event.target.classList.contains("ShiftRight")
      ) {
        shiftActive = false;
        event.target.classList.remove("keyboard__key_active");
        keyboard.innerHTML = "";
        createKeyboard(
          keyboard,
          data.codes,
          localStorage.getItem("language") === "En" ? data.keysEn : data.keysRu
        );
      }
    }
  });
};

export { events };
