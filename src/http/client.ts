import io from 'socket.io-client';
import { feathers } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import authentication from '@feathersjs/authentication-client';
import { Messages } from 'mentally-server';

const socket = io('http://localhost:3030');
export const client = feathers();

client.configure(socketio(socket));
client.configure(authentication());

export const messageService = client.service('message');
