# Space Traffic Coordination Office

## One-sentence benefit
Helps satellite operators and public authorities coordinate conjunction risks and accountable safety actions.

## Live demo
Run the Java service and React application locally to use the complete experience.

## Screenshots
![space traffic coordination workspace](docs/screenshot.png)

## Main features
Search and sort coordination cases, add validated actions, move work through approval, and see live priorities and progress.

## Technology used
React, TypeScript, TanStack Query, Wouter, Vite, Spring Boot and Java.

## Installation instructions
Start the backend with `cd backend && mvn spring-boot:run`. In another terminal run `npm install && npm run dev`.

## Commercial licensing/contact
Commercial licensing and implementation support are available through the repository owner.

## Business problem and users
Satellite operators, space-safety teams and regulators need a shared view of conjunction alerts, response ownership and approval status.

## Key workflows
Teams can find a review, create an action, validate required details, and advance it from draft to review and approval.

## React framework highlights
The interface uses focused components, controlled forms, route-based pages, query caching and mutation-driven API updates.

## Java backend highlights
The Spring Boot service provides real list, search, create and update endpoints, validation, clear errors, health reporting and tests.

## Architecture and state flow
React reads server state through TanStack Query. Successful mutations invalidate the shared list so the latest backend record is shown.

## Accessibility and responsive behaviour
Semantic regions, explicit labels, visible focus, status text, strong contrast and compact mobile layouts support keyboard and small-screen use.

## Verification commands
Use `npm test`, `npm run lint`, `npm run build`, and `cd backend && mvn test package`.

## Structure
`src` contains the React experience, `backend` contains the Java service, and `docs` contains verified media.

## Tradeoffs
The demonstration keeps records in memory for a fast local start; production use would add persistent storage, identity and audit retention.

## Roadmap
Add orbital-data feeds, alert thresholds, operator authentication, multilingual guidance and durable audit storage.
