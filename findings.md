# Findings - Selenium Java to Playwright JS/TS Converter

## Research & Discoveries
- [2026-02-01] Project initialized based on B.L.A.S.T. protocol.

## Constraints
- Conversion target: Selenium (Java) -> Playwright (JS/TS).

## Technical Observations

### Selenium Java -> Playwright JS/TS Mapping Table

| Category | Selenium (Java/TestNG) | Playwright (JS/TS) |
| :--- | :--- | :--- |
| **Annotations** | `@Test` | `test('name', async ({ page }) => { ... })` |
| | `@BeforeMethod` | `beforeEach(async ({ page }) => { ... })` |
| | `@AfterMethod` | `afterEach(async ({ page }) => { ... })` |
| | `@BeforeClass` | `beforeAll(() => { ... })` |
| | `@DataProvider` | Iterating over arrays or custom fixtures |
| **Locators** | `By.id("id")` | `page.locator('#id')` or `page.getByTestId('id')` |
| | `By.xpath("//xpath")` | `page.locator('xpath=//xpath')` |
| | `By.cssSelector(".class")`| `page.locator('.class')` |
| | `By.linkText("Text")` | `page.getByRole('link', { name: 'Text' })` |
| **Actions** | `driver.get(url)` | `await page.goto(url)` |
| | `element.click()` | `await locator.click()` |
| | `element.sendKeys(text)` | `await locator.fill(text)` |
| | `element.getText()` | `await locator.innerText()` |
| | `WebDriverWait` | Auto-waiting or `locator.waitFor()` |

### Identified Challenges
1. **Dynamic DataProviders:** Converting TestNG `@DataProvider` logic to Playwright's array-based test generation requires structural changes.
2. **Page Object Model (POM):** Selenium Java POM involves `@FindBy` annotations. Playwright POM is class-based with locators in the constructor or methods.
3. **Synchronous vs. Asynchronous:** Java is blocking; JS/TS is `async/await`. Every action in Playwright needs `await`.
