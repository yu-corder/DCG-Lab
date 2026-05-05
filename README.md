# DCG-Lab

DCG-Lab is a browser-based simulator for digital card games, specifically designed to evaluate and test card performance before official releases. This project allows users to simulate gameplay mechanics, combo stability, and deck archetypes in a sandbox environment.

## Project Structure

This is a monorepo managed with **Bun**, featuring a shared type system between the frontend and backend.

- `frontend/`: React application built with Vite and TypeScript.
- `backend/`: API server built with Hono and TypeScript.
- `shared/`: Common TypeScript types and game logic used by both parts.

## Tech Stack

- **Runtime:** Bun
- **Frontend:** React, Vite, TypeScript
- **Backend:** Hono
- **State Management:** TypeScript-driven game state

## Getting Started

### Prerequisites

You need to have [Bun](https://bun.sh/) installed on your machine.

### Installation

Install dependencies for the entire project:

```bash
bun install