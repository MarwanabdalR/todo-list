# Kanban Board

A task management board built with **Next.js**, **MUI**, and **React Query**. Tasks live across four columns — To Do, In Progress, In Review, and Done — and you can drag them between columns, search across all of them, and paginate within each one.

---

## What you'll need

- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node)

---

## First-time setup

```bash
# 1. Install dependencies
npm install

# 2. Install json-server globally (the mock API)
npm install -g json-server
```

---

## Running the app

You need **two terminals** — one for the API, one for the app.

**Terminal 1 — start the mock API:**

```bash
json-server --watch ./DB/db.json --port 4000
```

**Terminal 2 — start the dev server:**

```bash
npm run dev
```

Then open **http://localhost:3000** in your browser.

> The app talks to `http://localhost:4000/tasks`. If that port isn't running, you'll see an error banner on the board.

---

## Features

| Feature | How to use it |
|---|---|
| **Create a task** | Click **+ Add task** at the bottom of any column |
| **Edit a task** | Hover a card → click ✏️ |
| **Delete a task** | Hover a card → click 🗑️ → confirm |
| **Move a task** | Drag a card and drop it into another column |
| **Search** | Type in the search bar — filters all columns live |
| **Load more** | Each column shows 5 tasks; click **Load more** to see the rest |

---

## Project structure

```
src/
├── app/                   # Next.js app router (layout, page, global CSS)
├── components/
│   ├── MainPage/          # KanbanBoard + KanbanColumn
│   ├── TaskCard/          # Individual task card
│   ├── TaskModal/         # Create / edit dialog
│   └── nav/               # Navbar + search input
├── context/
│   └── SearchContext.js   # Global search state
└── hooks/
    └── useTasks.js        # React Query hooks (fetch, create, update, delete)

DB/
└── db.json                # json-server data file
```

---

## Other commands

```bash
npm run build    # production build
npm run lint     # run ESLint
```
