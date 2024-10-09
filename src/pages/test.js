export async function GET({ request }) {
    // Получаем оригинальные объекты Node.js из запроса
    const { socket: nodeSocket, headers } = request;
  
    // Проверяем заголовки для обработки WebSocket соединения
    if (headers.get('upgrade') !== 'websocket') {
      return new Response('Expected WebSocket', { status: 426 });
    }
  
    // Получаем объект Node.js socket и используем его для обновления соединения до WebSocket
    const { socket, response } = Deno.upgradeWebSocket(request);
  
    // Обработка событий WebSocket
    socket.onopen = () => {
      console.log('Client connected to WebSocket');
    };
  
    socket.onmessage = (event) => {
      console.log(`Received message: ${event.data}`);
      // Отправляем ответ клиенту
      socket.send(`Server received: ${event.data}`);
    };
  
    socket.onclose = () => {
      console.log('Client disconnected');
    };
  
    socket.onerror = (err) => {
      console.error('WebSocket error:', err);
    };
  
    // Возвращаем обновленный ответ
    return response;
  }