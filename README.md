# Candidate Management Application

A full-stack application for managing candidate information, built with Angular 18 and NestJS.

## Project Structure

- `fe-challenge-test`: Frontend (Angular)
- `be-challenge-test`: Backend (NestJS)

## Features

- Load and process candidate information
- Handle Excel file uploads
- Display candidate data in a table

## Technologies

- Frontend: Angular 18, Angular Material, Reactive Forms
- Backend: NestJS

## Setup

### Backend

```bash
cd apps/be-challenge-test
yarn install
yarn run start:prod
```

### Frontend

```bash
cd apps/fe-challenge-test
yarn install
npx @angular/cli serve fe-challenge-test
```

## Usage

1. Open the Angular app in your browser
2. Input candidate information:
   - Name
   - Surname
   - Upload Excel file (Seniority, Years of experience, Availability)
3. Submit the form
4. View processed data in the table

## API Endpoints

- POST `/candidates`: Submit candidate info
- GET `/candidates`: Retrieve all candidates

## Development

- Uses reactive forms and standalone components
- Implements functional and reactive programming

## Testing

Run tests for backend:

```bash
yarn test
```

## Deployment

Configured for deployment on Render.com using `render.yaml` in the root directory.

## License

MIT License
