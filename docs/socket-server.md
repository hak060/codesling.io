# Codesling Realtime Socket Server Developer Documentation

**Note:** If you want to run all backend services along with the clientside development server, check out the main `README.md` [instructions](README.md#getting-started)

To begin developing on the realtime websocket server, run the following from the `socket-server` folder:

```bash
yarn
yarn start
```

Documentation Table of Contents:

* [Client Events API](#client-events) (Client Emitters)
* [Server Events API](#server-events) (Server Emitters)

# API

## Client Events:

* [client.ready](#clientready)
* [client.update](#clientupdate)
* [client.disconnect](#clientdisconnect)
* [client.message](#clientmessage)

#### client.ready

Emit to the server when component has loaded and is ready to receive updates

```plaintext
payload: {}
```

#### client.update

Emit to the server when user has changed the state of the code editor

```plaintext
payload: {
  text: STRING
}
```

#### client.run

Emit to the server when a user wants to run the code in the code editor

```plaintext
payload: {}
```

#### client.disconnect

Emit to the server when the code editor component unmounts (user navigates away from the editor page)

```plaintext
payload: {}
```

#### client.message

Emit to the server when the user sends a message via chat

```plaintext
payload: {
  message: STRING,
  username: STRING
}
```

## Server Events:

* [server.initialState](#serverinitialstate)
* [server.changed](#serverchanged)
* [server.leave](#serverleave)
* [server.message](#serverMessage)

#### server.initialState

Emitted initially (once) by the server after client has verified that it is ready to begin rendering code editor text updates

```plaintext
payload: {
  text: STRING
}
```

#### server.changed

Emitted by the server when the state of the code editor is altered by another client

```plaintext
payload: {
  text: STRING
}
```

#### server.run

Emitted by the server when the stdout from the code editor has been evaluated

```plaintext
payload: {
  stdout: STRING
}
```

#### server.leave

Emitted by the server when another client leaves the code editing session

```plaintext
payload: {}
```

#### server.message

Emitted by the server when another client sends a message via chat

```plaintext
payload: {
  message: STRING,
  username: STRING
}
```
