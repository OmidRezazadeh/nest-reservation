import { WebSocketGateway, WebSocketServer, SubscribeMessage, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'event' }) // WebSocket namespace /events
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chat')  
  handleChat(client: Socket, data: any) {


    // ✅ Emit response back to the same client
    return  data.data;
  }
  @SubscribeMessage('clientEvent')
  handleClientEvent(@ConnectedSocket() client:Socket, payload:any ){
    console.log('Received from client:', payload);  // Logs the data sent by the client

    setTimeout(() => {
    client.emit('firstResponse', {data: payload});
  }, 2000);
  setTimeout(() => {
    client.emit('secondResponse', { message: 'Second response from server',data: payload });
  }, 3000);
    this.server.emit('broadcastResponse', { message: 'Broadcast to all clients' });
  return payload;
  }
  


}
