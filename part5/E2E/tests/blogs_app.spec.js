const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog App',()=>{

  beforeEach(async ({page}) => {
    await page.goto('http://localhost:5173')
  })

  test('LoginForm is Show',async ({ page }) => {
    const LogButton = await page.getByRole('button', { name: 'Login' })
    const loginTitle = await page.locator('div').filter({ hasText: /^Login$/ })
    await expect(LogButton).toBeVisible()
    await expect(loginTitle).toBeVisible() 
  })

})