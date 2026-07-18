# Security Specification: Arrdublu Portfolio & Admin Security

## 1. Data Invariants & Access Controls

Our Zero-Trust architecture establishes the following strict invariants across all Firestore collections:

| Collection | Path | Create | Read (Get/List) | Update | Delete |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Contacts** | `/contacts/{id}` | Public (Valid Schema) | Denied (All) | Denied (All) | Denied (All) |
| **Users** | `/users/{uid}` | Owner (`uid == auth.uid`) | Owner \| Admin | Owner \| Admin | Denied (All) |
| **Orders** | `/orders/{id}` | Public (Valid Schema) | Owner \| Admin | Owner \| Admin | Denied (All) |
| **Discounts** | `/discounts/{id}` | Admin | Public (List/Get) | Admin | Admin |
| **Search Logs** | `/search_logs/{id}` | Public (Valid Schema) | Admin | Denied (All) | Denied (All) |
| **Settings** | `/settings/{id}` | Admin | Public (Get) | Admin | Admin |
| **Portfolio** | `/portfolio/{id}` | Admin | Public (List/Get) | Admin | Admin |
| **Client Logos** | `/client-logos/{id}` | Admin | Public (List/Get) | Admin | Admin |
| **Case Studies** | `/case_studies/{id}` | Admin | Public (List/Get) | Admin | Admin |
| **Hero Slides** | `/hero_slides/{id}` | Admin | Public (List/Get) | Admin | Admin |
| **Prints** | `/prints/{id}` | Admin | Public (List/Get) | Admin | Admin |

---

## 2. The "Dirty Dozen" Hostile Payloads

Below are twelve high-risk payloads designed to test and breach our Identity, Integrity, and State rules:

### Payload 1: Privilege Escalation via User Profile Registration
- **Target Path**: `/users/attacker_uid`
- **Intended Breach**: Regular client registers and self-assigns `role: "admin"`.
- **Expected Outcome**: `PERMISSION_DENIED`

### Payload 2: Contact Form PII Leakage / Infiltration
- **Target Path**: `/contacts/malicious_contact`
- **Intended Breach**: Spammer attempts to send a contact form containing massive 1MB string or missing fields.
- **Expected Outcome**: `PERMISSION_DENIED`

### Payload 3: Timestamp Spoofing on Contact Creation
- **Target Path**: `/contacts/spoofed_contact`
- **Intended Breach**: Attacker submits a client-side timestamp in the past instead of `request.time`.
- **Expected Outcome**: `PERMISSION_DENIED`

### Payload 4: Invalid Order Construction (Price Manipulation)
- **Target Path**: `/orders/cheap_order`
- **Intended Breach**: Attacker submits an order where totalAmount is a negative number or is missing required fields.
- **Expected Outcome**: `PERMISSION_DENIED`

### Payload 5: Unauthorized Global Settings Manipulation
- **Target Path**: `/settings/admin`
- **Intended Breach**: Unauthenticated user attempts to enable inline edit mode.
- **Expected Outcome**: `PERMISSION_DENIED`

### Payload 6: Rogue Discount Creation
- **Target Path**: `/discounts/fake_discount`
- **Intended Breach**: Normal visitor attempts to create a discount code `FREE100` with value `100`.
- **Expected Outcome**: `PERMISSION_DENIED`

### Payload 7: Case Study Vandals
- **Target Path**: `/case_studies/global-rebrand`
- **Intended Breach**: Anonymous visitor attempts to overwrite or modify case study content.
- **Expected Outcome**: `PERMISSION_DENIED`

### Payload 8: Cross-Tenant Order Inspection
- **Target Path**: `/orders/victim_order_id`
- **Intended Breach**: Attacker attempts to read another user's order details.
- **Expected Outcome**: `PERMISSION_DENIED`

### Payload 9: Unauthorized Deletion of Core Portfolio Assets
- **Target Path**: `/portfolio/viral-post`
- **Intended Breach**: Attacker attempts to delete a core portfolio item.
- **Expected Outcome**: `PERMISSION_DENIED`

### Payload 10: Infiltration of Client Logos
- **Target Path**: `/client-logos/malicious_logo`
- **Intended Breach**: Attacker attempts to add a fake client logo linking to malware.
- **Expected Outcome**: `PERMISSION_DENIED`

### Payload 11: Wildcard Contact Scraping
- **Target Path**: `/contacts`
- **Intended Breach**: Public user tries to list all submitted contact forms to steal user emails.
- **Expected Outcome**: `PERMISSION_DENIED`

### Payload 12: Injection of Malicious Search Logs
- **Target Path**: `/search_logs/poison_log`
- **Intended Breach**: Attacker injects giant text query strings to trigger Denial of Wallet.
- **Expected Outcome**: `PERMISSION_DENIED`

---

## 3. Test Runner Specification (`firestore.rules.test.ts`)

A simulated test suite verifying the above 12 payloads is outlined below:

```typescript
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';

// Verification tests mapped directly to our "Dirty Dozen" payloads
describe('Zero-Trust Security Verification', () => {
  let testEnv: any;

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: 'arrdublu-d1c06',
    });
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  it('Payload 1: Should block regular user self-assigning admin role', async () => {
    const context = testEnv.authenticatedContext('attacker', { email: 'attacker@gmail.com', email_verified: true });
    const db = context.firestore();
    await assertFails(
      db.collection('users').doc('attacker').set({
        email: 'attacker@gmail.com',
        role: 'admin',
      })
    );
  });

  it('Payload 2: Should block contact with missing fields', async () => {
    const context = testEnv.unauthenticatedContext();
    const db = context.firestore();
    await assertFails(
      db.collection('contacts').add({
        name: 'Attacker',
        email: 'attacker@gmail.com',
        // missing subject, message, and createdAt
      })
    );
  });

  it('Payload 3: Should block contact with spoofed timestamp', async () => {
    const context = testEnv.unauthenticatedContext();
    const db = context.firestore();
    await assertFails(
      db.collection('contacts').add({
        name: 'Attacker',
        email: 'attacker@gmail.com',
        subject: 'Inquiry',
        message: 'This is a long test message.',
        createdAt: new Date('2020-01-01'), // spoofed
      })
    );
  });
});
```
