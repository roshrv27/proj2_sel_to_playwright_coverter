import sys
import os
from llm_client import call_codellama

def convert_selenium_to_playwright(java_code, language="typescript"):
    prompt = f"""
    Convert the following Selenium Java with TestNG code into Playwright {language}.
    
    ### Instructions:
    1. Prioritize readability and modern JS/TS patterns over a strict 1:1 mapping.
    2. Use async/await for all actions.
    3. Map TestNG annotations (@Test, @BeforeMethod, etc.) to Playwright hooks.
    4. Use Playwright's page.locator() and other built-in locators.
    5. If Page Objects are detected, create equivalent Playwright Page Object classes.
    6. Ensure the output is clean, well-formatted, and runnable in a Playwright environment.
    7. Return ONLY the converted code, no extra preamble or explanation unless it's in comments.

    ### Selenium Java Input:
    {java_code}

    ### Playwright {language} Output:
    """
    
    converted_code = call_codellama(prompt)
    return converted_code

if __name__ == "__main__":
    if len(sys.argv) < 2:
        # Test mode
        sample_java = """
        @Test
        public void loginTest() {
            driver.get("https://example.com/login");
            driver.findElement(By.id("username")).sendKeys("admin");
            driver.findElement(By.id("password")).sendKeys("password123");
            driver.findElement(By.id("login-btn")).click();
            Assert.assertEquals(driver.getTitle(), "Dashboard");
        }
        """
        print("Running sample conversion...")
        print(convert_selenium_to_playwright(sample_java))
    else:
        # File mode
        file_path = sys.argv[1]
        if os.path.exists(file_path):
            with open(file_path, 'r') as f:
                content = f.read()
                print(convert_selenium_to_playwright(content))
        else:
            print(f"File not found: {file_path}")
