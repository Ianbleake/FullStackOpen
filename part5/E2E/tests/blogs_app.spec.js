const { test, expect, beforeEach, describe } = require('@playwright/test')
const { Login, CreateBlog } = require('./helper')

describe('Blog App',()=>{

  beforeEach(async ({page, request}) => {
    await request.post('http://localhost:3001/api/testing/reset')
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
      Login(page, 'TestingUser', 'Arviluki.123')
      await expect(page.getByText('Welcome IanTest')).toBeVisible()
    })

    test('USer cant log with wrong credentials', async ({page})=>{
      Login(page, 'TestinUser', 'Arviluk')
      await expect(page.getByText('Usuario y/o contraseña erroneos')).toBeVisible()
    })

  })

  describe('blogs', async ()=>{

    const data = {
      title: 'Test Article',
      author: 'IanBleake',
      url: 'www.blog.com',
    }

    beforeEach(async ({page})=>{
      Login(page, 'TestingUser', 'Arviluki.123')
    })

    test('Creating a new blog', async ({ page })=>{
      await CreateBlog(page,data)
      await expect(page.getByText(data.title)).toBeVisible()
    })

    

    describe('Modify blogs', async ()=>{
      beforeEach(async ({page})=>{
        await CreateBlog(page,data)
      })

      test('Expanding a blog', async ({ page })=>{
        await expect(page.getByText(data.title)).toBeVisible()
        await page.locator('label div').first().click()
        await expect(page.getByText(data.author)).toBeVisible()
      })

      test('Add a like to the blog', async ({ page }) => {
        await expect(page.getByText(data.title)).toBeVisible()
        await page.locator('label div').first().click()
        await expect(page.getByText(data.author)).toBeVisible()

      } )


    })

  })

})