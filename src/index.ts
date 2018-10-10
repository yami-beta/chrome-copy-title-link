import { copyToClipboard } from "./copyTitle";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  const copyButton = root.querySelector(".copyButton");
  const copyTarget: HTMLTextAreaElement = root.querySelector(".copyTarget");

  copyButton.addEventListener("click", event => {
    event.preventDefault();
    copyToClipboard(copyTarget);
  });

  chrome.tabs.getSelected(null, tab => {
    copyTarget.innerHTML = `[${tab.title}](${tab.url})`;
  });
});
