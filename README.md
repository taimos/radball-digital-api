# Radball Digital API

A shared API library for the Radball Digital platform, providing data models and API client libraries for managing cycle-ball (Radball) leagues, teams, and competitions.

## About Radball Digital

Radball Digital is a comprehensive platform for managing cycle-ball associations, clubs, teams, players, and competitions. This API library serves as the shared interface between the backend services and frontend applications.

### Features

- **Association Management**: Manage associations and their seasons
- **Club & Team Management**: Handle clubs and their associated teams
- **Competition Structure**: Organize leagues and league groups
- **Personnel Management**: Track players and other personnel
- **Event Scheduling**: Manage match days and games
- **Venue Management**: Handle gym and venue information

## Technology Stack

- **Language**: TypeScript
- **API Types**: GraphQL and REST
- **Code Generation**: AWS CDK Serverless tooling
- **Build System**: projen for project management

## Installation

```bash
npm install @taimos/radball-digital-api
```

## Usage

### Data Models

The library provides TypeScript interfaces for all data models:

```typescript
import { Association, Club, Team, Player, Game } from '@taimos/radball-digital-api';
```

## API Documentation

### GraphQL Schema

The GraphQL schema is available at `schema.graphql` and provides comprehensive type definitions for all queries, mutations, and subscriptions.

### REST API

The REST API specification is defined in `rest.yaml` following the OpenAPI 3.0 specification.

## Development

### Prerequisites

- Node.js (v20+)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/taimos/radball-digital-api.git
cd radball-digital-api

# Install dependencies
npm install

# Build the project
npm run build
```

### Available Scripts

- `npm run build` - Build the TypeScript project
- `npm run test` - Run unit tests
- `npm run lint` - Run linting
- `npm run generate:graphql` - Generate GraphQL client code
- `npm run generate:rest` - Generate REST client code
- `npx projen` - Regenerate project configuration

### Project Structure

```
radball-digital-api/
├── src/
│   ├── generated/            # Generated client code
│   ├── index.ts             # Main entry point
│   └── validation.ts        # Validation utilities
├── test/                    # Test files
├── schema.graphql          # GraphQL schema definition
├── rest.yaml              # REST API specification
└── package.json
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Coding Standards

- Follow TypeScript best practices
- Write comprehensive tests for new features
- Update type definitions when modifying the API
- Use conventional commits for commit messages
- Ensure all generated code is up to date

## License

Proprietary - All rights reserved

## Contact

Project maintained by [Taimos GmbH](https://www.taimos.de)