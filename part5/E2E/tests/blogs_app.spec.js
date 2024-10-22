const { test, expect, beforeEach, describe } = require('@playwright/test')
const { Login, CreateBlog } = require('./helper')
const { create } = require('domain')

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

    describe('Deleting Blogs',async ()=>{

      beforeEach(async ({ page })=>{
        await CreateBlog(page,data)
      })

      test('Deleting a blog',async ({ page }) => {
        await expect(page.getByText(data.title)).toBeVisible()
        await page.locator('label div').first().click()
        await page.getByTestId('delete').click()
        await page.getByText('yes').click()
        await expect(page.getByText(data.title)).not.toBeVisible()
      })

      test('Only the creator can delete blogs',async ({ page, request })=>{

        await request.post('/api/users', {
          data: {
          name: 'IanTest2',
          username: 'OtherUSer',
          password: 'Arviluki.123'
          }
         })
        await page.getByRole('button', { name: 'LogOut' }).click()
        await expect(page.getByPlaceholder('Username')).toBeVisible()
        await Login(page, 'OtherUSer', 'Arviluki.123')
        await CreateBlog(page,{ title: 'Other',author: 'IanBleake', url: 'www.blog.com'})
        await expect(page.getByText(data.title)).toBeVisible()
        await page.locator('label div').first().click()
        await expect(page.getByTestId('delete')).not.toBeVisible()
        await expect(page.getByText('Other')).toBeVisible()
        await page.locator('div:nth-child(2) > .ctas > .label > .toggle').click()
        await expect(page.getByTestId('delete')).toBeVisible()
      })

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
        await page.getByTestId('like').click()
        await expect(page.getByTestId('likescount')).toContainText('1')
      })

      test('Order by likes', async ({ page })=>{
        await CreateBlog(page,{ title: 'Second Blog',author: 'IanBleake', url: 'www.blog.com'})
        await CreateBlog(page,{ title: 'Third Blog',author: 'IanBleake', url: 'www.blog.com'})
        await expect(page.getByText('Second Blog')).toBeVisible()
        await expect(page.getByText('Third Blog')).toBeVisible()
        await expect(page.getByText(data.title)).toBeVisible()
        await page.locator('div:nth-child(3) > .ctas > .label > .toggle').click()
        await page.getByRole('button', { name: 'Like' }).click()
        await page.getByRole('button', { name: 'Like' }).click()
        await page.getByRole('button', { name: 'Like' }).click()
        await page.locator('div:nth-child(3) > .ctas > .label > .toggle').click()
        

        
      })


    })

  })

})