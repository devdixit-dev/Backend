# Backend (core)

## 1. Authentication
**Statefull**
- Statefull - manage state(condition) with some additional info like... unique id: 1 represents user1 with @gmail.com

- Client(User) -> username&password -> Server
Server (checks according to database)
Server -> session uid(unique id) -> Client(User)

How to transfer uid ?
- Server side rendering - Cookies
- REST API's - Headers