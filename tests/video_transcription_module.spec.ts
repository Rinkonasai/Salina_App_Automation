import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { TranscriptPage } from "../pages/TranscriptPage";


test.describe('Video Upload & Transcription Module', () => {
    
    test.beforeEach('Navigate to the Salina App',async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToTheApp();
        await loginPage.validLogin("21savageous@gmail.com","Test@12345");
    })

    test('Upload a Video file', async ({ page }) =>{
        const homePage = new HomePage (page);
        const transcriptPage = new TranscriptPage (page);
        
        //Upload file
        await homePage.uploadValidFile();
        await transcriptPage.waitForTranscriptResult();
        await expect(page).toHaveURL(/\/transcriptions\/transcription\?/);
    })

    test('Verify if a transcription page contains a response body', async ({ page }) =>{
        const homePage = new HomePage (page);
        const transcriptPage = new TranscriptPage (page);

        await homePage.uploadValidFile();
        await transcriptPage.waitForTranscriptResult();
        await expect(transcriptPage.returnTranscriptResponseBody()).toBeVisible();
    } )
})