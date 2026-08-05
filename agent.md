
## Data Schema & Security Constraints
- **Collection Key**: `marketing_copy`
- **Document Payload Interface**:
  - `prompt`: `string` (The baseline user campaign context input)
  - `format`: `string` (The distribution platform layout target destination)
  - `content`: `string` (The exact text payload response served from the AI route)
  - `createdAt`: `serverTimestamp` (Immutable Firestore cloud ingestion marker)
- **Access Rule Constraints**: Historical data is append-only. Modification or deletion queries executed inside mutations must be flatly blocked on the client interface side, as enforced by `firestore.rules`.

## Data Schema & Security Constraints
- **Collection Key**: `marketing_copy`
- **Document Payload Interface**:
  - `prompt`: `string` (The baseline user campaign context input)
  - `format`: `string` (The distribution platform layout target destination)
  - `content`: `string` (The exact text payload response served from the AI route)
  - `createdAt`: `serverTimestamp` (Immutable Firestore cloud ingestion marker)
- **Access Rule Constraints**: Historical data is append-only. Modification or deletion queries executed inside mutations must be flatly blocked on the client interface side, as enforced by `firestore.rules`.
