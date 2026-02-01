import React, { useState, useEffect, useRef } from 'react';
import { Zap, Copy, Check, Terminal, FileCode } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';

const App: React.FC = () => {
  const [inputCode, setInputCode] = useState<string>(
    `@Test
public void loginTest() {
    driver.get("https://example.com/login");
    driver.findElement(By.id("username")).sendKeys("admin");
    driver.findElement(By.id("password")).sendKeys("password123");
    driver.findElement(By.id("login-btn")).click();
    Assert.assertEquals(driver.getTitle(), "Dashboard");
}`);
  const [outputCode, setOutputCode] = useState<string>('');
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    Prism.highlightAll();
  }, [inputCode, outputCode, isConverting]);

  const handleConvert = async () => {
    if (!inputCode.trim()) return;
    setIsConverting(true);
    try {
      const response = await fetch('http://localhost:3001/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: inputCode, language: 'typescript' }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setOutputCode(data.result);
    } catch (error) {
      console.error('Conversion failed', error);
      setOutputCode('// Error: Conversion failed. Make sure the backend bridge and Ollama are running.');
    } finally {
      setIsConverting(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const syncScroll = (e: React.UIEvent<HTMLTextAreaElement>, type: 'input' | 'output') => {
    const overlay = document.getElementById(`${type}-overlay`);
    if (overlay) {
      overlay.scrollTop = e.currentTarget.scrollTop;
      overlay.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  return (
    <div className="app-container">
      <header>
        <div className="logo">
          <Zap size={28} />
          <span>Selenium (Java) to Playwright (JS/TS) Converter</span>
        </div>
        <div className="status-bar">
          <div className="tag">Local LLM: CodeLlama</div>
          <div className="tag">Target: Playwright TS</div>
        </div>
      </header>

      <main className="main-grid">
        <section className="pane">
          <div className="pane-header">
            <div className="flex items-center gap-2">
              <FileCode size={16} />
              <span>Selenium Java (TestNG)</span>
            </div>
            <span className="text-xs opacity-50">Input Source</span>
          </div>
          <div className="editor-wrapper text-area-highlighter">
            <div id="input-overlay" className="highlighter-overlay">
              <pre className="language-java">
                <code className="language-java">{inputCode}</code>
              </pre>
            </div>
            <textarea
              ref={inputRef}
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              onScroll={(e) => syncScroll(e, 'input')}
              placeholder="Paste your Selenium Java code here..."
              spellCheck={false}
            />
          </div>
        </section>

        <div className="convert-button-container">
          <button
            className="convert-button"
            onClick={handleConvert}
            disabled={isConverting}
          >
            {isConverting ? (
              <div className="spinner" />
            ) : (
              <Zap size={32} fill="currentColor" />
            )}
          </button>
        </div>

        <section className="pane">
          <div className="pane-header">
            <div className="flex items-center gap-2">
              <Terminal size={16} />
              <span>Playwright JS/TS</span>
            </div>
            <button
              className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
              onClick={handleCopy}
              disabled={!outputCode}
            >
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              <span className="text-xs">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          <div className="editor-wrapper text-area-highlighter">
            {isConverting && (
              <div className="loading-overlay">
                <div className="spinner" />
                <p className="mt-4 text-sm opacity-70">CodeLlama is thinking...</p>
              </div>
            )}
            <div id="output-overlay" className="highlighter-overlay">
              <pre className="language-typescript">
                <code className="language-typescript">{outputCode}</code>
              </pre>
            </div>
            <textarea
              ref={outputRef}
              value={outputCode}
              readOnly
              onScroll={(e) => syncScroll(e, 'output')}
              placeholder="Converted code will appear here..."
              spellCheck={false}
            />
          </div>
        </section>
      </main>

      <footer className="flex justify-center opacity-30 text-xs">
        <p>&copy; 2026 Selenium (Java) to Playwright (JS/TS) Converter | Powered by Ollama & CodeLlama</p>
      </footer>
    </div>
  );
};

export default App;
