// src/pages/api/test.js
import { WebSocketServer } from 'ws';

let wss;

// Инициализируем WebSocket сервер, если он еще не создан
if (!wss) {
  wss = new WebSocketServer({ noServer: true });

  wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket');

    // Отправляем приветственное сообщение
    ws.send('Welcome to the WebSocket server!');

    ws.on('message', (message) => {
      console.log(`Received message: ${message}`);
      // Отправляем ответ клиенту
      ws.send(`Server received: ${message}`);
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });

    ws.on('error', (err) => {
      console.error('WebSocket error:', err);
    });
  });
}

export async function GET({ request }) {
  // Проверяем, является ли запрос WebSocket
  if (request.headers.get('upgrade') !== 'websocket') {
    return new Response('Expected WebSocket', { status: 426 });
  }

  const { socket, response } = Deno.upgradeWebSocket(request);

  // Обрабатываем события WebSocket
  wss.handleUpgrade(request, socket, request.headers, (ws) => {
    wss.emit('connection', ws, request);
  });

  return response; // Возвращаем ответ
}
