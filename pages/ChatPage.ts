import { Locator, Page } from "@playwright/test";

export class ChatPage {
  readonly page: Page;
  readonly userMessage: Locator;
  readonly botMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userMessage = page.locator("#user-message-1");
    this.botMessage = page.locator("#bot-message-1");
  }

  //Wait for the elements to render in the page
  async waitForChattoRender() {
    await this.userMessage.waitFor({ state: "visible" });
    await this.botMessage.waitFor({ state: "visible" });
  }

  //Checks the value of the User message for debugging
  async getUserMessage() {
    console.log(await this.userMessage.textContent());
  }

  //Checks the value of the Bot message for debugging
  async getBotMessage() {
    console.log(await this.botMessage.textContent());
  }

  //Returns the value of Bot message
  returnBotMessage(): Locator{
    return this.botMessage;
  }
}