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