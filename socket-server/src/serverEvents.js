/**
 *
 *  Server emissions
 *
 */
// const nodemailer = require('nodemailer');
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
    console.log('STDOUT: ', stdout)
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
    // console.log('Button was clicked - ROOM: ', room);
    // console.log('Button was clicked - TEXT: ', room.get('text'));

  ////SEND EMAIL FUNCTION////
  const nodemailer = require('nodemailer');
  console.log('nodemailer: ', nodemailer);
  var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // hostname
      // secure: false, // use SSL
      secureConnection: true,  
      // port: 25, // port for secure SMTP
      port: 465, // port for secure SMTP
      auth: {
        user: 'codeslingbot@gmail.com',
        pass: 'codeslingbot'
      },
      tls: {
          rejectUnauthorized: false
      }
  });
  // console.log('transporter: ', transporter)
  // var ourMessage = 'This is the Socket Servers email message';
  var ourMessage = room.get('text');
  console.log('Button was clicked - socket server TEXT: ', ourMessage);
  var mailOptions = {
    from: 'codeslingbot@gmail.com',
    to: 'codeslingbot@gmail.com',
    subject: 'Codesling Sending Email using Node.js',
    text: ourMessage
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('Your CodeslingEmail Error: ', error);
    } else {
      console.log('CodeSling Email sent: ' + info.response);
    }
  });
  console.log('IN END of /send event');
  };

export const sendFinalEmail = ({ io, room }, message) => {
  io
    .in(room.get('id'))
    //.emit('server.message', message);

};