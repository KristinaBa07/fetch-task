## Installation

Follow these steps to get started:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. **Install the dependencies:**
   ```bash
   npm i
   ```

## Usage

After installing the dependencies, you can build and run the project using the following commands:

- **Build the project:**
  ```bash
  npm run build
  ```
- **Start the project:**
  ```bash
  npm run start
  ```

## Architecture

This is a small project designed for simplicity. The project uses a basic **MVC (Model-View-Controller)** architecture to separate the concerns of data, presentation, and control logic. Additionally, [Webpack](https://webpack.js.org/) is used for bundling and running the project.

- **Model:** Manages the data and business logic.
- **View:** Renders the user interface.
- **Controller:** Handles user inputs and updates both the Model and View accordingly.
