# League Order API Implementation

This document outlines the API-related changes implemented for the league ordering feature as specified in the ticket. The focus is only on the API-relevant changes as requested.

## Overview

The league ordering feature allows managing the display order of leagues within a season through both GraphQL mutations and REST API endpoints. The order is determined by the position of league IDs in an array stored on the Season model.

## Changes Made

### 1. GraphQL Schema Changes (`schema.graphql`)

#### Season Type Extension
- **Added field**: `leagueOrder: [ID!]` to the `Season` type
- This field stores an array of league IDs in the desired display order

```graphql
type Season @aws_cognito_user_pools {
  id: ID!
  name: String!
  startDate: AWSDate!
  endDate: AWSDate!
  registrationStart: AWSDate
  registrationEnd: AWSDate!
  association: Association!
  leagues: [League]
  leagueOrder: [ID!]  # <-- NEW FIELD
}
```

#### New Input Type
- **Added**: `UpdateLeagueOrderInput` for updating league order

```graphql
input UpdateLeagueOrderInput {
  seasonId: ID!
  leagueOrder: [ID!]!
}
```

#### New Mutation
- **Added**: `updateLeagueOrder` mutation to the `Mutation` type

```graphql
updateLeagueOrder (input: UpdateLeagueOrderInput!): Season @aws_cognito_user_pools
```

### 2. REST API Changes (`rest.yaml`)

#### New Endpoint
- **Added**: `PUT /seasons/{seasonId}/league-order`
- **Purpose**: Update the order of leagues within a season
- **Security**: Requires Cognito authentication
- **Request Body**: JSON object with `leagueOrder` array
- **Path Parameter**: `seasonId` (required)

**Example Request:**
```json
{
  "leagueOrder": [
    "league-1-bundesliga",
    "league-2-bundesliga", 
    "league-regionalliga-1",
    "league-regionalliga-2"
  ]
}
```

**Response Types:**
- `200`: League order updated successfully
- `400`: Bad request - validation error
- `401`: Unauthorized
- `404`: Season not found

### 3. Validation (`src/validation.ts`)

#### New Functions
- **Added**: `checkUpdateLeagueOrder(input: UpdateLeagueOrderInput)`
- **Added**: `validateUpdateLeagueOrder(input: UpdateLeagueOrderInput)`

#### Validation Rules
1. **Season ID**: Must be provided and non-empty
2. **League Order Array**: Must not be empty
3. **Unique League IDs**: No duplicate league IDs
4. **Valid League IDs**: No empty or whitespace-only league IDs

**Error Messages (German):**
- `"Saison-ID ist erforderlich"` - Season ID required
- `"Liga-Reihenfolge darf nicht leer sein"` - League order cannot be empty
- `"Liga-Reihenfolge darf keine doppelten Liga-IDs enthalten"` - No duplicate league IDs
- `"Liga-Reihenfolge darf keine leeren Liga-IDs enthalten"` - No empty league IDs

### 4. Generated Types

#### GraphQL Types (`src/generated/graphql.model.generated.ts`)
- **UpdateLeagueOrderInput**: Type-safe input type
- **MutationUpdateLeagueOrderArgs**: Mutation arguments type
- **Season.leagueOrder**: Added to Season type as optional field

#### REST API Types (`src/generated/rest.model.generated.ts`)
- **updateLeagueOrder operation**: Complete type definitions for the REST endpoint
- **Path parameters**: `seasonId` type definition
- **Request/Response types**: Type-safe request and response schemas

### 5. Comprehensive Tests (`test/validation.test.ts`)

#### Test Coverage
- **Happy path scenarios**: Valid inputs with various configurations
- **Season ID validation**: Empty and whitespace-only values
- **League order validation**: 
  - Empty arrays
  - Duplicate league IDs
  - Empty/whitespace league IDs
  - Multiple validation errors
- **Edge cases**: 
  - Very long league IDs
  - Special characters in league IDs
  - Numerical league IDs

#### Test Statistics
- **Total new tests**: 15 comprehensive test cases
- **Categories covered**: Successful validation, seasonId validation, leagueOrder validation, edge cases
- **All tests passing**: ✅ 98/98 tests pass

## API Usage Examples

### GraphQL Mutation
```graphql
mutation UpdateLeagueOrder($input: UpdateLeagueOrderInput!) {
  updateLeagueOrder(input: $input) {
    id
    name
    leagueOrder
  }
}
```

**Variables:**
```json
{
  "input": {
    "seasonId": "season-2024-25",
    "leagueOrder": [
      "league-1-bundesliga",
      "league-2-bundesliga",
      "league-regionalliga-1"
    ]
  }
}
```

### REST API Call
```bash
curl -X PUT \
  /seasons/season-2024-25/league-order \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "leagueOrder": [
      "league-1-bundesliga",
      "league-2-bundesliga",
      "league-regionalliga-1"
    ]
  }'
```

## Business Logic Requirements (For Backend Implementation)

The API implementation defines the contract, but the backend must implement these business rules:

1. **Validation**: All league IDs in the `leagueOrder` array must belong to the specified season
2. **Default Behavior**: When new leagues are added to a season, they should be appended to the end of the existing order
3. **Consistency**: The league order should be used consistently across all views and APIs
4. **Migration**: Existing seasons should have their league IDs auto-populated in the `leagueOrder` field

## Technical Notes

- **Type Safety**: All inputs and outputs are fully type-safe with generated TypeScript types
- **Validation**: Client-side validation available through the exported validation functions
- **Error Handling**: Comprehensive error messages in German as per application standards
- **Testing**: High test coverage with edge cases and error scenarios
- **Code Generation**: Types are automatically generated from schema changes

## Integration Points

### Frontend Integration
- Use the `UpdateLeagueOrderInput` type for form validation
- Import `validateUpdateLeagueOrder` for client-side validation
- Handle the defined error codes (400, 401, 404) appropriately

### Backend Integration
- Implement the `updateLeagueOrder` mutation resolver
- Implement the REST endpoint handler
- Add database migration for the new `leagueOrder` field
- Ensure business logic validation (league IDs belong to season)

This implementation provides a complete API foundation for the league ordering feature while maintaining type safety, comprehensive validation, and thorough testing.