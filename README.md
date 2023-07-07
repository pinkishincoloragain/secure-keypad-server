# secure-keyboard-server

## Install
Install
```bash
$ yarn install
```

Build
```bash
$ yarn build
```

Start
```bash
$ yarn start
```

## ALL USERS

### Request

#### Authentication Header
```text
Authentication: Bearer secret
```

#### Request
```HTTP
GET /api/users
```

```HTTP
GET /slow-api/users
```

### Response

```json
[
  {
    "userId": 1,
    "password": "1234a",
    "name": "정대규",
    "bankName": "국민",
    "bankAccount": "123456789012",
    "phoneNumber": "010-1529-1582"
  },
  {
    "userId": 2,
    "password": "5678b",
    "name": "김동규",
    "bankName": "신한",
    "bankAccount": "234567890123",
    "phoneNumber": "010-1234-5678"
  }
]
```

## SINGLE User

### Request

```HTTP
GET /api/users/:id
```

```HTTP
GET /slow-api/user/:id
```

### Response

```json
  {
  "userId": 1,
  "password": "1234a",
  "name": "정대규",
  "bankName": "국민",
  "bankAccount": "123456789012",
  "phoneNumber": "010-1529-1582"
}
```

# Types

### User

```typescript
export type UserId = number;
export type Password = string;
export type Name = string;
export type BankName = string;
export type BankAccount = string;
export type PhoneNumber = string;

export interface User {
    userId: UserId;
    password: Password;
    name: Name;
    bankName: BankName;
    bankAccount: BankAccount;
    phoneNumber: PhoneNumber;
};
```
