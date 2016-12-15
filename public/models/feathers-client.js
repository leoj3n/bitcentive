import feathers from 'feathers/client';
import io from '../../lib/steal-socket.io/io';
import socketio from 'feathers-socketio/client';
import auth from 'feathers-authentication-client';
import hooks from 'feathers-hooks';

var socket = io({
  transports: ['websocket']
});
const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(hooks())
  .configure(auth());

export default feathersClient;
