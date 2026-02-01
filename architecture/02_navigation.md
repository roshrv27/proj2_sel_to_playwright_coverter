# SOP 02: Navigation & Workflow Management

## Objective
Manage the end-to-end workflow from user input in the UI to the processed output and local file creation.

## Workflow Steps

### 1. Data Ingestion (Navigation Layer)
- UI (React) accepts a string of Selenium Java code.
- A request is sent to the backend (or bridge) to trigger the conversion.
- The input is saved to `.tmp/input.java` for audit/debugging.

### 2. Execution Routing
- The Navigator calls `tools/converter.py` with the input data.
- It specifies the target language (JS/TS) based on user selection.
- If multiple files are involved, the Navigator maintains a mapping of Java classes to their corresponding Playwright JS/TS counterparts.

### 3. Transformation Lifecycle
- **Step A: Parsing** - Extracting class name, package, and method structures.
- **Step B: Translation** - Invoking Ollama (CodeLlama) for block-level conversion.
- **Step C: Post-Processing** - Merging blocks into a coherent file and applying boilerplate (imports, exports).

### 4. Output Delivery
- The converted code is returned to the UI for immediate display.
- Simultaneously, the code is written to `converted_output/` with appropriate file extensions.
- Success or failure is logged in `progress.md`.

## Decision Logic
- **If Class is a Page Object**: Route to `converter.py` with `pattern=POM`.
- **If Class is a Test**: Route to `converter.py` with `pattern=TEST`.
- **Failure Recovery**: If CodeLlama returns gibberish, the Navigator retries once with a "fix-up" prompt or logs a manual intervention requirement.
