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

// test('when guessed Word is correct, user wins', async() => {
//     const electronApp = await electron.launch({args:['main.js']}); 

//     const mainWindow = await electronApp.firstWindow(); 

//     const gameLink = await mainWindow.waitForSelector('a[href*="game.html"]'); 
//     await gameLink.click(); 
//     await mainWindow.waitForLoadState('domcontentloaded'); 
    
//     // guessedWord = correct 
//    const expectedWord = {
//     word:'neko',
//     hint: "Japanese for 'cat'."
//    }

//    await mainWindow.evaluate((wordObj)=> {
//     window.mockWordObj = wordObj; 

//    }, expectedWord); 

//    await mainWindow.waitForSelector('.word-display'); 
//    await mainWindow.waitForTimeout(500); 

//     const currentWord = await mainWindow.evaluate(() => window.mockWordObj);
//     console.log('Current word:', currentWord); // Debug log
//     expect(currentWord).toEqual(expectedWord);

//    const letters = ['n', 'e', 'k', 'o']; 
//    for (const letter of letters) {
//         const button = await mainWindow.waitForSelector(`button:text("${letter}")`); 
//         await button.click(); 
//         await mainWindow.waitForTimeout(200); 
//    }


//     // game won page 
//     await mainWindow.waitForURL(/gameWon\.html/); 
//     const gameWonUrl = await mainWindow.url(); 
//     expect(gameWonUrl).toContain('gameWon.html'); 



//     // app quits 
//     await electronApp.close(); 

// });