    sequenceDiagram
    participant browser
    participant server

    browser->>server: POST: https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: 302 Redirection: /exampleapp/notes

    deactivate server

    browser->>server: GET: https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML Code
    deactivate server

    browser->>server: GET: https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: text/css

    deactivate server

    browser->>server: GET: https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: application/javascript
    deactivate server

    browser->>server: GET: https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: application/json
    deactivate server