const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog App',()=>{

  beforeEach(async ({page, request}) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
      name: 'IanTest',
      username: 'TestingUser',
      password: 'Arviluki.123'
      }
     })
    await page.goto('/')
  })

  test('LoginForm is Show',async ({ page }) => {
    const LogButton = await page.getByRole('button', { name: 'Login' })
    const loginTitle = await page.locator('div').filter({ hasText: /^Login$/ })
    await expect(LogButton).toBeVisible()
    await expect(loginTitle).toBeVisible() 
  })

  describe('Testing Login',async ()=>{

    test('User can log with correct credentials', async ({page})=>{
      await page.getByPlaceholder('Username').fill('TestingUser')
      await page.getByPlaceholder('Password').fill('Arviluki.123')
      await page.getByRole('button',{ name: 'Login'}).click()
      await expect(page.getByText('Welcome IanTest')).toBeVisible()
    })

    test('USer cant log with wrong credentials', async ({page})=>{
      await page.getByPlaceholder('Username').fill('TestingUser')
      await page.getByPlaceholder('Password').fill('Arviluki.23')
      await page.getByRole('button',{ name: 'Login'}).click()
      await expect(page.getByText('Usuario y/o contraseña erroneos')).toBeVisible()
    })

  })

})