# GebApp

This project was generated using Angular CLI version 19.0.7.

## Development Server

To start a local development server, run:

bash

```
npm i
ng serve

```

# About the Project

1.  **Angular Framework**: The project is built using the latest available stable version of Angular at the time of writing (v19).
2.  **NgRx for State Management**: The project utilizes NgRx, a state management library for Angular applications, to handle the application's state. This includes actions, reducers, and selectors to manage state changes in a predictable manner.
3.  **Authentication**: The project includes mocked authentication functionality, featuring actions and reducers for login, logout, and session restoration. The `AuthGuard` is employed to protect routes and ensure that only authenticated users can access certain parts of the application.
4.  **Component Structure**: The project follows a standalone component-based structure, adhering to atomic design principles (atoms, molecules, organisms, and templates) for ease of reusability. These components are responsible for rendering the UI and handling user interactions. Custom UI components, such as `geb-header`, `geb-sidebar`, and `geb-footer`, are used to construct the application's layout. For prototyping purposes, all components use inline styles and templates. However, these can be modified to use separate templates and styles if needed for scalability or maintainability.
5.  **Internationalization (i18n)**: The project employs Angular Translate for internationalization, allowing support for multiple languages. The `en.json` and `ma.json` files contain translation strings, with placeholders for dynamic content. Untranslated strings fall back to `en.json`.
6.  **Styling**: The project uses SCSS for styling.
7.  **Routing**: The project leverages Angular's Router module for navigation between different views. The `router-outlet` directive is used within the `PrivateComponent` to render routed components in the "logged in" or "private" section.
8.  **Services**: The project includes services such as `UserService` to handle HTTP requests and interact with the backend API. The `UserService` includes methods for fetching and manipulating user data. `InMemoryDbService` is used for demonstration and prototyping purposes.
9.  **Security**: Authentication is modeled in a stateless manner, generating a mocked session token and storing it in localStorage. In a real-world solution, signed JWT tokens, SSL, and a real API should be used.
10. **Bootstrap**: Bootstrap CSS is included globally in the main `index.html` to assist with prototyping and expedite development. However, no Bootstrap or global styles are used in the `PieChartComponent` as it is encapsulated using **ShadowDom**.

11. **Real-time Application Simulation**: The `RealtimeDatabaseSimulatorService` simulates a real-time database by pushing data at customizable intervals using `setInterval` and `Observable`. In a real-world scenario, Firebase Realtime Database, WebSockets, or long-polling strategies should be used. This real-time data simulator service is created for prototyping purposes only.

12. **Real-time Data Handling**: Real-time data is managed using Observables in some cases and Ng Signals in others. This mixed approach demonstrates the usage of both methods and provides more readable and manageable code in certain components.

(Refer to code comments for more information)

# How Do I Login?

The application includes mocked users. Refer to the `InMemoryDataService.users` object.
