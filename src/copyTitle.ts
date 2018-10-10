const copyToClipboard = (copyTarget: HTMLTextAreaElement) => {
  copyTarget.select();
  document.execCommand("copy");
};

export { copyToClipboard };
