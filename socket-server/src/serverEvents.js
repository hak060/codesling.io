/**
 *
 *  Server emissions
 *
 */
export const serverInitialState = ({ client, room }) => {
  console.log('this is the client id ',client.id)
  console.log('this is the client ', client)
  console.log('handshake???????? ', client.handshake.query)
  client.emit('server.initialState', {
    id: client.id,
    text: room.get('text'),
  });
};

export const serverChanged = ({ io, room }) => {
  const roomId = room.get('id');
  const text = room.get('text');
  io
    .in(roomId)
    .emit('server.changed', { text });
};

export const serverLeave = ({ io, room }) => {
  io
    .in(room.get('id'))
    .emit('server.leave');
};

export const serverRun = ({ io, room }, stdout) => {
  io
    .in(room.get('id'))
    .emit('server.run', { stdout });
};

export const serverMessage = ({ io, room }, message) => {
  io
    .in(room.get('id'))
    .emit('server.message', message);
};

export const serverEmail = ({ io, room }, message) => {
  io
    .in(room.get('id'))
    .emit('server.message', message);
    console.log('Button was clicked - socket server ROOM: ', room);
    console.log('Button was clicked - socket server ROOM.text: ', room.get('text'));
};

export const sendFinalEmail = ({ io, room }, message) => {
  io
    .in(room.get('id'))
    //.emit('server.message', message);

};