const { test, expect, _electron: electron } = require('@playwright/test'); 


test('App launches and quits', async() => {
    const electronApp = await electron.launch({args:['main.js'] }); 

    // wait for the first BroserWindow to open 
    const window = await electronApp.firstWindow(); 

    await electronApp.close(); 


}); 

test('START link goes to game page', async() => {
    const electronApp = await electron.launch({args:['main.js'] }); 

    const mainWindow = await electronApp.firstWindow(); 

    const gameLink = await mainWindow.waitForSelector('a[href*="game.html"]'); 

    await mainWindow.waitForLoadState('domcontentloaded'); 

    await gameLink.click(); 
    
    await electronApp.close(); 
}); 

test('when lives go down to 0, game lost page appears', async() => {
    const electronApp = await electron.launch({args:['main.js']}); 

    const mainWindow = await electronApp.firstWindow(); 

    const gameLink = await mainWindow.waitForSelector('a[href*="game.html"]'); 

    await gameLink.click(); 
    await mainWindow.waitForLoadState('domcontentloaded'); 


    // lives = 0 
    for (let i= 0; i<9; i++) {
        const wrongButton = await mainWindow.waitForSelector('button:text("z")'); 
        await wrongButton.click();  
        await mainWindow.waitForTimeout(300); 
    }


    // user redirected to game lost page 
    await mainWindow.waitForURL(/gameLost\.html/); 
    const gameLostUrl = await mainWindow.url(); 
    expect(gameLostUrl).toContain('gameLost.html'); 

    // app quits 
    await electronApp.close(); 


}); 

