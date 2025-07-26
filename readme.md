## IslaNblr

### A Template for Web Applications with Deno and Svelte using Vite

This template enables the rapid creation of web applications using Deno, Svelte, and Vite. It provides a foundational structure and configuration to facilitate
a swift start. Even though it is a hotch-potch of various technologies, it is designed to be easy to use and extend.

### Technologies Used

- **Deno**: A secure runtime for JavaScript and TypeScript.
- **Svelte**: A modern JavaScript framework for building user interfaces.
- **Vite**: A fast build tool that provides a development server and optimises the build process.
- **Concurrently**: Enables multiple commands to be run concurrently, which is useful for development tasks.

### Folder Structure

```
├── app/                  # HTML files and top-level components, organised according to the structure of the web application.
│   ├── index.html        # Entry HTML file for the SPA/MPA
│   ├── index.svelte      # Root Svelte component for the WebApp
│   └── sub1/             # Subdirectory for additional level pages/subsystem (e.g., sub1/index.html)
├── applib/               # Application as a library (Svelte components)
│   ├── assets/           # Static assets such as images (e.g., svelte.svg)
│   ├── components/       # Reusable Svelte components
│   ├── lib/              # Svelte components for SPA pages (e.g., Home, Counter)
│   └── util/             # Utility functions for the front-end
├── lib/                  # Isomorphic library (TypeScript code shared between client and server)
├── server/               # Back-end server code (Deno + Hono)
│   ├── route/            # API route definitions (e.g., api.ts)
│   ├── main.ts           # Server entry point
│   └── static.ts         # Logic for serving static files
├── static/               # Static files served by the server (e.g., favicon.ico)
├── static_app/           # (Generated) Output directory for the production build of the MPA application.
├── webcomponents/        # (Generated) Output directory for the Web Components build
├── .gitignore
├── deno.json             # Deno configuration: tasks, imports, and so on.
├── svelte.config.js      # Svelte configuration
├── tsconfig.*.json       # TypeScript configurations
├── vite.config.ts        # Vite configuration for the main application
└── vite.config.components.ts # Vite configuration for building Web Components
```

### Deno Tasks

| Task               | Description                                                                                                                                             |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `dev`              | Starts the development environment. Both the Vite development server for the front-end and the Deno server for the back-end are run with hot reloading. |
| `dev:client`       | Starts only the Vite development server for the front-end.                                                                                              |
| `dev:server`       | Starts only the Deno back-end server in watch mode. The client will be built once before `dev:server` is started.                                       |
| `run`              | Builds the client application, then runs the production server. This command should be used for production deployment.                                  |
| `run:server`       | Runs the production server without building the client. It is assumed that `static_app` already contains the build artefacts.                           |
| `build:client`     | Builds the Svelte MPA for production. The output is placed in the `static_app/` directory.                                                              |
| `build:components` | Builds specified Svelte components as stand-alone Web Components. The output is placed in the `webcomponents/` directory.                               |

### Licence

This project is licensed under the Apache Licence 2.0. See the [LICENSE](LICENSE) file for details.
