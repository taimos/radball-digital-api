# Pagination Implementation Guide

## Overview
This document describes the pagination implementation for the Radball Digital API to handle large datasets (>1000 records) and avoid DynamoDB's 1MB response limit.

## Implementation Details

### GraphQL Schema Changes

#### Connection Types
Three connection types have been added to support pagination:

```graphql
type PersonConnection @aws_cognito_user_pools {
  items: [Person]!
  nextToken: String
}

type GymConnection @aws_cognito_user_pools {
  items: [Gym]!
  nextToken: String
}

type ClubConnection @aws_cognito_user_pools {
  items: [Club]!
  nextToken: String
}
```

#### Query Updates
The following queries have been updated to support pagination:

1. **getListOfPeople**
   - Old: `getListOfPeople(clubId: ID): [Person]`
   - New: `getListOfPeople(clubId: ID, limit: Int, nextToken: String): PersonConnection`

2. **getListOfGyms**
   - Old: `getListOfGyms(clubId: ID): [Gym]`
   - New: `getListOfGyms(clubId: ID, limit: Int, nextToken: String): GymConnection`

3. **getListOfClubs**
   - Old: `getListOfClubs: [Club]`
   - New: `getListOfClubs(limit: Int, nextToken: String): ClubConnection`

### Resolver Implementation Requirements

When implementing the resolvers (in src/js-resolver/), follow these guidelines:

#### Request Handling
```typescript
// Extract pagination parameters from arguments
const limit = args.limit || 100; // Default limit
const nextToken = args.nextToken;

// Build DynamoDB query with pagination
const params = {
  TableName: 'YourTable',
  Limit: limit,
  ...(nextToken && { ExclusiveStartKey: JSON.parse(Buffer.from(nextToken, 'base64').toString()) })
};
```

#### Response Format
```typescript
// Return Connection type response
return {
  items: results.Items,
  nextToken: results.LastEvaluatedKey 
    ? Buffer.from(JSON.stringify(results.LastEvaluatedKey)).toString('base64')
    : null
};
```

### Usage Examples

#### Initial Query
```graphql
query GetPeople {
  getListOfPeople(limit: 100) {
    items {
      id
      firstName
      lastName
      club {
        name
      }
    }
    nextToken
  }
}
```

#### Subsequent Pages
```graphql
query GetMorePeople {
  getListOfPeople(limit: 100, nextToken: "eyJpZCI6IjEyMzQ1In0=") {
    items {
      id
      firstName
      lastName
    }
    nextToken
  }
}
```

### Client Implementation

#### JavaScript/TypeScript Example
```typescript
async function getAllPeople(clubId?: string): Promise<Person[]> {
  const allPeople: Person[] = [];
  let nextToken: string | null = null;
  
  do {
    const response = await client.query({
      query: GET_LIST_OF_PEOPLE,
      variables: {
        clubId,
        limit: 100,
        nextToken
      }
    });
    
    allPeople.push(...response.data.getListOfPeople.items);
    nextToken = response.data.getListOfPeople.nextToken;
  } while (nextToken);
  
  return allPeople;
}
```

### Testing Checklist

- [ ] Pagination works with default limit (100)
- [ ] Pagination works with custom limit values
- [ ] nextToken correctly continues from previous page
- [ ] No data loss when iterating through all pages
- [ ] Performance remains acceptable with large datasets
- [ ] Empty result sets handled correctly
- [ ] Optional filters (clubId, associationId) work with pagination
- [ ] Error handling for invalid nextToken values

### Migration Notes

1. **Breaking Change**: The response format has changed from arrays to Connection objects
2. **Client Updates Required**: Existing clients need to access `.items` property
3. **Backwards Compatibility**: Consider maintaining deprecated non-paginated endpoints during transition

### Performance Considerations

1. **Default Limit**: Set to 100 to balance between response size and number of requests
2. **Maximum Limit**: Consider setting a maximum limit (e.g., 500) to prevent excessive memory usage
3. **Caching**: NextToken values can be cached client-side for navigation
4. **Parallel Requests**: Avoid parallel pagination requests to prevent rate limiting

## Related Tickets

- Pagination für getListOfPeople implementieren (Task ID: 1211203180258305)
- Pagination für getListOfGyms implementieren (Task ID: 1211202929097046)
- Pagination für getListOfClubs implementieren (Task ID: 1211203188404283)