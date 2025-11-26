import { Locator, Page } from "@playwright/test";

export class TranscriptPage { 
  readonly page: Page;
  readonly transcriptResultBody: Locator;

  constructor(page: Page){
    this.page = page;
    this.transcriptResultBody = page.locator(".transcript-content");
  }

  async waitForTranscriptResult() {
    await this.transcriptResultBody.waitFor({ state: "visible" });
    //This console.log is for debugging purposes only
    //console.log(await this.transcriptResultBody.textContent());
  }

  returnTranscriptResponseBody(): Locator{
    return this.transcriptResultBody;
  }
}