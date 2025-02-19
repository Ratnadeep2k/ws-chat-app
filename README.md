# ws-chat-app

This is a basic chat application built with a WebSocket server and a React client.

## Project Structure
```
ws-chat-app/
├── README.md
├── ws-client/
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── ws-server/
│   ├── .gitignore
│   ├── package.json
│   ├── src/
│   │   └── index.ts
│   ├── tsconfig.json
│   └── tsconfig.tsbuildinfo
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

```sh
git clone https://github.com/your-username/ws-chat-app.git
cd ws-chat-app
```

2. Install dependencies for the client:

```sh
cd ws-client
npm install
```

3. Install dependencies for the server:

```sh
cd ../ws-server
npm install
```

### Running the Application

Start the WebSocket server:

```sh
cd ws-server
npm run dev
```

Start the React client:

```sh
cd ws-client
npm run dev
```



## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


