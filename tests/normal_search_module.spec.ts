import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ChatPage } from "../pages/ChatPage";

test.describe("HomePage Tests", () => {
  test.beforeEach("Navigate to the Salina App", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToTheApp();
    await loginPage.validLogin("21savageous@gmail.com","Test@12345");
  });

  test("Verify normal search", async ({ page }) => {
    const homePage = new HomePage(page);
    
    //Chat prompt
    await homePage.resultChatBox("What does testing mean?");
    await expect(page).toHaveURL(/\/chats\/chat/);
  })

  test("Verify if Salina response message is visible", async ({ page }) =>{
    const homePage = new HomePage(page);
    const chatPage = new ChatPage(page);

    //Chat prompt
    await homePage.resultChatBox("Can you give me some important QA Methodologies");
    await chatPage.waitForChattoRender();
    await expect(chatPage.returnBotMessage()).toBeVisible();
  })
  
});