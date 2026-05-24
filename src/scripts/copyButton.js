if (window.innerWidth > 768) {
  addCopyButtonToPreBlocks();
}

function addCopyButtonToPreBlocks() {
  document.querySelectorAll("pre").forEach((pre) => {
    const wrapper = createWrapper();
    const button = createCopyButton(pre);

    wrapPreBlock(pre, wrapper);
    appendElements(wrapper, pre, button);
  });
}

function createWrapper() {
  const wrapper = document.createElement("div");
  wrapper.className = "pre-wrapper";
  return wrapper;
}

function createCopyButton(pre) {
  const button = document.createElement("button");
  button.className = "copy-btn";
  button.textContent = "Copy";
  button.onclick = () => handleCopyButtonClick(pre, button);
  return button;
}

function handleCopyButtonClick(pre, button) {
  const code = pre.querySelector("code").textContent.trim();
  navigator.clipboard
    .writeText(code)
    .then(() => {
      button.textContent = `✅`;
      setTimeout(() => (button.textContent = "Copy"), 2000);
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}

function wrapPreBlock(pre, wrapper) {
  pre.parentNode.insertBefore(wrapper, pre);
}

function appendElements(wrapper, pre, button) {
  wrapper.appendChild(pre);
  wrapper.appendChild(button);
}
