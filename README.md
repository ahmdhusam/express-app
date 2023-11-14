## Node.js Test Project

## Important!

Before starting, install docker-compose to your machine and start docker containers:

```bash
$ docker-compose up
```

## Environment

- need create .env file
- example: .example.env

### [Postman collection contains all APIS](https://www.postman.com/tawapix897/workspace/node-js-test-project/documentation/31138410-3b11ff98-cb43-48d1-829d-c8cec54ebedc)

## Socket.io api

- ws://host:port/
  - auth:
    - token
  - Headers:
    - authorization
  - Events. Listen on connect.
    - error
    - room:joined
    - room:leave
    - message:sent
    - image:sent
  - Events for chat rooms:
    - Event create room:
      - room:create
    - Event join room:
      - room:join
    - Event to get list of online users in chat room:
      - room:list
  - Events for messages:
    - Event send message:
      - message:send
    - Event to get list of message in chat room by page number:
      - message:page
  - Events for images:
    - Event send image:
      - image:send

## Examples socket.io event

# All events required body of type object and callback function

"room:create":

```json
{
  "roomName": "room 1"
}
```

"room:join":

```json
{
  "roomName": "room 1"
}
```

"room:list":

```json
{
  "roomName": "room 1"
}
```

"message:send":

```json
{
  "message": "message 1 to room 1",
  "roomName": "room 1"
}
```

"message:page":

```json
{
  "roomName": "room 1",
  "pageNum": 1
}
```

"image:send":

```json
{
  "roomName": "room 1",
  "image": "binary data"
}
```
