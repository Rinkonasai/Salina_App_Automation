import { Locator, Page } from "@playwright/test";
import path from "path";

export class HomePage {
  readonly page: Page;
  readonly uploadVideo: Locator;
  readonly uploadDocument: Locator;
  readonly askMeAnything: Locator;
  readonly submitButton: Locator;
  readonly uploadFileInVideo: Locator;
  readonly uploadButton: Locator;
  readonly transcribeButton: Locator;
  readonly uploadFileInDocument: Locator;
  readonly documentSubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Uploading File Tab Element
    this.uploadVideo = page.getByTestId("first-block");
    this.uploadDocument = page.getByTestId("second-block");

    // Chat Box Element
    this.askMeAnything = page.locator("#query-bar-textarea-home");
    this.submitButton = page.locator("#send-button-home");

    // Uploading Video Element
    this.uploadFileInVideo = page.locator("input[name='file']");
    this.uploadButton = page.locator("#video-upload-btn-video-file");
    this.transcribeButton = page.getByRole("button", { name: "Transcribe" });

    // Uploading Document Element
    this.uploadFileInDocument = page.locator("input[name='file']");
    this.documentSubmitButton = page.locator("#video-upload-btn-video-file");
  }

  // Upload Video
  async uploadValidFile() {
    await this.uploadVideo.click();

    //Need to edit file path for new Video/Audio
    const filepath = path.join(process.cwd(), "test-data","Four Sisters and a Wedding Official Trailer  Bea, Angel, Toni, Shaina,  Four Sisters and a Wedding.mp3");
    await this.uploadFileInVideo.setInputFiles(filepath);

    await this.uploadButton.waitFor({ state: "visible" });
    await this.uploadButton.click();

    await this.transcribeButton.waitFor({ state: "visible" });
    await this.transcribeButton.click();

    await this.page.waitForURL(/\/transcriptions\/transcription\?/);
  }

  // Upload Document
  async uploadValidDocument() {
    await this.uploadDocument.click();

    //Need to edit file path for new document
    const filepath = path.join(process.cwd(), "test-data", "The Big One Earthquake in the Philippines V1.pdf");
    await this.uploadFileInDocument.setInputFiles(filepath);

    await this.documentSubmitButton.waitFor({ state: "visible" });
    await this.documentSubmitButton.click();
  }

  // Chat Prompt
  async resultChatBox(prompt: string) {
    await this.askMeAnything.fill(prompt);
    await this.submitButton.click();
  }
}