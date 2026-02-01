import requests
import json

def call_codellama(prompt):
    url = "http://localhost:11434/api/generate"
    data = {
        "model": "codellama",
        "prompt": prompt,
        "stream": False
    }
    
    try:
        response = requests.post(url, json=data)
        response.raise_for_status()
        return response.json().get("response", "")
    except Exception as e:
        return f"Error connecting to Ollama: {str(e)}"

if __name__ == "__main__":
    test_prompt = "Convert this Selenium Java line to Playwright JS: driver.get('https://google.com');"
    print(f"Testing Codellama with prompt: {test_prompt}")
    result = call_codellama(test_prompt)
    print(f"Result: {result}")
