import React, { useEffect, useState } from 'react';
import Barcode from 'react-barcode';

const App: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const ws = new WebSocket('ws://54.85.62.96:8000/ws');

    ws.onopen = () => {
      console.log('Connection Established!');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const data = event.data;
      console.log("Message from server: ", data);
      setMessages((prev) => [...prev, data]);
    };

    ws.onclose = () => {
      console.log('Connection Closed!');
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error: ', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>WebSocket Data</h1>
        <div>
          <h2>Connection Status: {isConnected ? 'Connected' : 'Disconnected'}</h2>
        </div>
        <div>
          <h2>Messages</h2>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
        <Barcode value={messages.length > 0 ? messages[messages.length - 1] : ''} />
      </header>
    </div>
  );
};

export default App;
