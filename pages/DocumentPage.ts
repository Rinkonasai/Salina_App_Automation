import { FrameLocator, Locator, Page } from "@playwright/test";

export class DocumentPage {
  readonly page: Page;
  readonly botInitialMessage: Locator;
  readonly botReplyMessage: Locator;
  readonly chatTextArea: Locator;
  readonly sendMessageButton: Locator;
  readonly pdfViewerButton: Locator;
  readonly pdfSidePanel: FrameLocator;
  readonly docViewerButton: Locator;
  readonly documentSidePanel: Locator;

  constructor(page: Page) {
    this.page = page;

    // Chat Panel Element
    this.botInitialMessage = page.locator("#bot-message-1");
    this.botReplyMessage = page.locator("#bot-message-2");
    this.chatTextArea = page.locator("#query-bar-textarea-chat");
    this.sendMessageButton = page.locator("#send-button-chat");

    // PDF Side Panel Element
    this.pdfViewerButton = page.locator("#pdf-tab-pdfviewer");
    this.pdfSidePanel = page.frameLocator('iframe[title="PDF Viewer"]');

    // Document Side Panel Element
    this.docViewerButton = page.locator("#document-tab-pdfviewer");
    this.documentSidePanel = page.locator("#markdown-block-container");
  }

  // Get Bot Message
  async getDocumentBotMessage() {
    await this.botInitialMessage.waitFor({ state: "visible" });
  }

  // Checking if PDF Side Panel is Available
  async checkPDFFormat() {
    await this.pdfViewerButton.waitFor({ state: "visible" });
    await this.pdfViewerButton.click();

    await this.page
      .locator('iframe[title="PDF Viewer"]')
      .waitFor({ state: "visible" });

    const isVisible = await this.pdfSidePanel.locator("html").isVisible();
    return isVisible;
  }

  // Checking if Document Side Panel is Available
  async checkDocumentFormat() {
    await this.docViewerButton.waitFor({ state: "visible" });
    const isVisible = await this.docViewerButton.isVisible();
    await this.docViewerButton.click();
    return isVisible;
}

  // Asking document summary through chat bot
  async askDocumentContent(prompt: string) {
    await this.page
      .locator('iframe[title="PDF Viewer"]')
      .waitFor({ state: "visible" });
    await this.botInitialMessage.waitFor({ state: "visible" });
    await this.chatTextArea.fill(prompt);
    await this.sendMessageButton.click();
    await this.botReplyMessage.waitFor({ state: "visible" });
  }
}