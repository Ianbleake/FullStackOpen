const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')


describe('Note app', () => {

  beforeEach(async ({ page, request }) => {
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

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
  })

  test('login form can be opened', async ({ page }) => {
    await loginWith(page, 'TestingUser', 'Arviluki.123')
    await expect(page.getByText('Welcome IanTest')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'TestingUser', 'oijidjeijdj')
    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('Wrong credentials')
  })

  describe('when logged in', () => {

    beforeEach(async ({ page }) => {
      await loginWith(page, 'TestingUser', 'Arviluki.123')
    })

    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'a note created by playwright', true)
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })

    describe('and a note exists', () => {

      beforeEach(async ({ page }) => {
        await createNote(page, 'first note', true)
        await createNote(page, 'second note', true)
        await createNote(page, 'third note', true)
      })

      test('third note has created', async ({page})=>{
        const noteElement = await page.getByText('third note')
        await expect(noteElement).toBeVisible()
      })
  
      test('importance can be changed', async ({ page }) => {
        await page.pause()
        const secondNoteElement = await page.getByText('second note').locator('..')
        await secondNoteElement.getByRole('button', { name: 'make not important' }).click()
        await expect(secondNoteElement.getByText('make important')).toBeVisible()
      })

    })

  }) 

})