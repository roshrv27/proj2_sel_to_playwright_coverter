# SOP 01: Conversion Logic Flow

## Objective
Convert Selenium Java (TestNG) code into idiomatic Playwright JS/TS code while prioritizing readability.

## Inputs
- Raw Java source code (String).
- Target Language (JS or TS).

## Logical Priority
1. **File Type Identification**:
    - If the code contains `@Test`, it is a **Test Class**.
    - If the code contains `@FindBy` or locator definitions but no `@Test`, it is a **Page Object**.
2. **Annotation Mapping**:
    - `@BeforeMethod` -> `test.beforeEach`
    - `@AfterMethod` -> `test.afterEach`
    - `@DataProvider` -> Multi-test generation logic (loop through data array).
3. **Locator Transformation**:
    - Convert `By.id("...")` to `page.locator("#...")`.
    - Convert `By.xpath("...")` to `page.locator("xpath=...")`.
    - Preference: Use `page.getByRole` or `page.getByText` if the context allows for more readable code.
4. **Action Transformation**:
    - Every Java command must be prepended with `await` in Playwright.
    - `driver.get(url)` -> `await page.goto(url)`.
    - `element.sendKeys(text)` -> `await locator.fill(text)`.

## Transformation Strategy (A.N.T. Layer 2)
The Navigator will:
1. Extract classes and methods from the Java source.
2. Direct the `translator.py` tool to map individual lines.
3. Use an LLM refactoring pass to ensure the final code uses modern JS/TS patterns (e.g., destructuring `{ page }` in tests).

## Edge Cases
- **Complex Waits**: Explicit `WebDriverWait` should be mapped to `locator.waitFor()` or `page.waitForFunction()`.
- **System Properties**: Map `System.getProperty` to `process.env`.
