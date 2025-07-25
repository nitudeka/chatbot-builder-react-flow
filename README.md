# Chatbot Builder

A visual, drag-and-drop tool for building chatbot conversation flows.

## Demo
Click [here](https://chatbot.iamnitudeka.xyz) to view the demo site.

## Features

- **Visual Flow Editor:** Build chatbot logic using a node-based interface powered by [React Flow](https://reactflow.dev/).
- **Drag-and-Drop Nodes:** Add nodes from the sidebar and place them anywhere on the canvas.
- **Node Configuration:** Click a node to configure its properties (e.g., message text).
- **Connect Nodes:** Draw connections to define the flow of conversation.
- **Flow Validation:** Prevents saving flows with disconnected nodes.
- **Save & Restore:** Save your chatbot flow to local storage and restore it automatically.

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (build tool)
- [React Flow](https://reactflow.dev/) (visual flow editor)
- [TailwindCSS](https://tailwindcss.com/) (utility-first CSS)
- [React Hook Form](https://react-hook-form.com/) (form management)
- [React Toastify](https://fkhadra.github.io/react-toastify/) (notifications)
- [Tabler Icons](https://tabler.io/icons) (icons)
- [UUID](https://www.npmjs.com/package/uuid) (unique IDs)

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- Yarn or npm

### Installation

```bash
git clone https://github.com/nitudeka/chatbot-builder-react-flow.git
cd chatbot-builder
yarn install # or npm install
```

### Development

```bash
yarn dev # or npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

### Build for Production

```bash
yarn build # or npm run build
```

## Usage

1. **Add Nodes:** Click "Add Node" to open the sidebar, then drag a node (e.g., Message) onto the canvas.
2. **Connect Nodes:** Drag from the handle at the bottom of one node to the top of another to create a connection.
3. **Configure Nodes:** Click a node to open its configuration sidebar. For message nodes, enter the message text and save.
4. **Save Flow:** Click "Save Flow" to store your chatbot design in local storage. Flows are restored automatically on reload.

## Folder Structure

```
chatbot-builder/
├── src/
│   ├── components/
│   │   └── builder/         # Main builder logic, nodes, sidebars, DnD context
│   │   └── button/          # Reusable button component
│   │   └── sideDrawer/      # Sidebar/Drawer UI
│   ├── constants/           # App constants
│   ├── assets/              # Static assets
│   ├── App.tsx              # App entry point
│   └── main.tsx             # React root
├── public/                  # Static public assets
├── index.html               # HTML template
├── package.json             # Project metadata & dependencies
└── README.md                # Project documentation
```
