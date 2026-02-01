# 📖 Project Constitution: Selenium to Playwright Converter

## Project Metadata
- **Project Name:** Selenium Java to Playwright JS/TS Converter
- **Protocol:** B.L.A.S.T.
- **Architecture:** A.N.T. (Architecture, Navigation, Tools)

## 📊 Data Schema
- **Input:** 
    - Source: UI Textbox / File Upload (Selenium Java / TestNG Code)
    - Format: Raw Java string or `.java` files
- **Output:** 
    - Destination: Local directory + UI Code Viewer
    - Format: Playwright Javascript or Typescript (`.js`, `.ts`, `.spec.js`, `.spec.ts`)
    - Structure: Page Objects mapping, Test files mapping

## 📜 Behavioral Rules
1. **Readable > Literal:** Prioritize clean, idiomatic Playwright/JS/TS code over a strict 1:1 mapping of Java logic.
2. **Deterministic Logic:** Code conversion must follow strictly defined SOPs in `architecture/`.
3. **Self-Healing:** Failed conversion attempts should be logged and analyzed to update SOPs.
4. **Comprehensive:** Attempt to convert all Selenium/TestNG features (annotations, waits, locators, assertions).
5. **UI Integration:** Input must be accepted via a UI, and output displayed visually.

## 🏗️ Architectural Invariants
### Conversion Strategy
1. **Asynchronous First:** All generated Playwright code must use `async/await`.
2. **Page Object Pattern:** If `@FindBy` is detected in Java, generate a matching Playwright Class.
3. **TestNG Hooks:** Map `@Before...` and `@After...` to Playwright `test.beforeEach`, `test.afterEach`, etc.
4. **Error Resilience:** Wrap conversion logic in blocks that log failures to `progress.md` instead of crashing.

### Folder Structure
- `architecture/` contains conversion SOPs.
- `tools/` contains Python scripts:
    - `parser.py`: Tokenizes Java input.
    - `translator.py`: Maps Java tokens to JS/TS using the Mapping Table.
    - `formatter.py`: Applies Prettier-like formatting to the output.
- `.tmp/` is used for all intermediate processing.
- `.env` stores environment secrets.

## 📝 Maintenance Log
- **2026-02-01:** Project structure initialized.
- **2026-02-01:** Completed A.N.T. 3-layer build.
    - **Layer 1 (Architecture):** Defined SOPs for Java -> Playwright transformation.
    - **Layer 2 (Navigation):** Implemented Express bridge for UI-to-CodeLlama communication.
    - **Layer 3 (Tools):** Created `converter.py` using local Ollama/CodeLlama as the engine.
- **2026-02-01:** Final UI refinement with PrismJS highlighting and synchronized scroll. 
- **System Status:** **LIVE** (Frontend: 8080, Backend Bridge: 3001, LLM: Ollama/CodeLlama).
