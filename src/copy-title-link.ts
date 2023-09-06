import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("copy-title-link")
export class CopyTitleLink extends LitElement {
  @property({ type: String })
  title: string = "";

  @property({ type: String })
  url: string = "";

  constructor() {
    super();
    this._initialize();
  }

  render() {
    return html`
      <div class="container">
        <div class="row">
          <p>Markdown</p>
          <button @click=${this._copyAsMarkdown}>Copy</button>
        </div>

        <div class="row">
          <p>HTML</p>
          <button @click=${this._copyAsHtml}>Copy</button>
        </div>
      </div>
    `;
  }

  private async _initialize() {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);

    if (tab.title && tab.url) {
      this.title = tab.title;
      this.url = tab.url;
    }
  }

  private async _copyAsMarkdown() {
    const type = "text/plain";
    const blob = new Blob([`[${this.title}](${this.url})`], { type });
    const data = [new ClipboardItem({ [type]: blob })];
    await navigator.clipboard.write(data);
  }

  private async _copyAsHtml() {
    const type = "text/html";
    const blob = new Blob([`<a href="${this.url}">${this.title}</a>`], {
      type,
    });
    const data = [new ClipboardItem({ [type]: blob })];
    await navigator.clipboard.write(data);
  }

  static styles = css`
    .container {
      width: 100%;
    }

    .row {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 16px 0 0;

      &:first-child {
        padding: 0;
      }
    }

    p {
      margin: 0;
      padding: 0;
    }
  `;
}
