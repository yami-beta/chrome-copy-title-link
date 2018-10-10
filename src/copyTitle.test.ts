import { copyToClipboard } from "./copyTitle";

describe("copyToClipboard()", () => {
  const mockExecCommand = jest.fn();

  beforeAll(() => {
    Object.defineProperty(document, "execCommand", {
      value: mockExecCommand
    });
  });

  test("It should select textarea and call `document.execCommand`", async () => {
    const targetElement = document.createElement("textarea");
    const targetElementText = "test text";
    targetElement.innerHTML = targetElementText;
    copyToClipboard(targetElement);
    expect(targetElement.selectionStart).toBe(0);
    expect(targetElement.selectionEnd).toBe(targetElementText.length);
    expect(mockExecCommand).toBeCalledWith("copy");
  });
});
