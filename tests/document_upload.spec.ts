import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { DocumentPage } from "../pages/DocumentPage";

test.describe('Document Upload with Chats Module', () => {

    test.beforeEach('Navigate to Salina App', async ({ page }) =>{
        const loginPage = new LoginPage(page);

        //Login to the Salina App
        await loginPage.navigateToTheApp();
        await loginPage.validLogin("21savageous@gmail.com","Test@12345");
    })

    test("Upload a Valid Document File", async ({ page }) =>{
        const homePage = new HomePage(page);

        //Upload Document file and assert if redirected to the "chats/document" page
        await homePage.uploadValidDocument();
        await expect(page).toHaveURL(/\/chats\/document/);
    })

    test("Ask Salina to give a Summary of the document", async ({ page }) => {
        const homePage = new HomePage(page);
        const documentPage = new DocumentPage(page);

        //Upload Document file
        await homePage.uploadValidDocument();
        await documentPage.getDocumentBotMessage();
        
        //Do an Ai prompt and assert if the Ai responds
        await documentPage.askDocumentContent("Can you provide me a summary of this document");
        await expect(documentPage.botReplyMessage).toBeVisible();
    })

    test("Verify the DOC and PDF Side panel", async ({ page }) => {
        const homePage = new HomePage(page);
        const documentPage = new DocumentPage(page);

        //Upload Document file and assert if the DOC and PDF in the side panel is visible
        await homePage.uploadValidDocument();
        const isPDFVisible = await documentPage.checkPDFFormat();
        const isDOCVisible = await documentPage.checkDocumentFormat();

        await expect(isPDFVisible).toBe(true);
        await expect(isDOCVisible).toBe(true);
        
    })

})