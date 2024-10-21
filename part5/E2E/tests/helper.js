const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.locator('#login').click()
}

const createNote = async (page, content) => {
  await page.getByRole('button', { name: 'Add note' }).click()
  await page.getByRole('textbox').fill(content)
  await page.getByRole('button', { name: 'save' }).click()
  await page.getByText(content).waitFor()
}

const Login = async (page,username,password) => {
  await page.getByPlaceholder('Username').fill(username)
  await page.getByPlaceholder('Password').fill(password)
  await page.getByRole('button',{ name: 'Login'}).click()
}

const CreateBlog = async (page,content) => {
  await page.getByRole('button',{name: '+'}).click()
  await page.getByTestId('title').fill(content.title)
  await page.getByTestId('autor').fill(content.author)
  await page.getByTestId('url').fill(content.url)
  await page.getByTestId('create').click()
}

export { loginWith, createNote, Login, CreateBlog }

