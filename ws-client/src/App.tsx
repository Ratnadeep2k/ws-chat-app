import { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'

function App() {
  const wsRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (msg) => {
      setMessages(m => [...m, msg.data]);
    };

    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'join-room',
        payload: {
          roomId: 'Black-Belt-Dev'
        }
      }));
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (wsRef.current && inputValue.trim()) {
      wsRef.current.send(JSON.stringify({
        type: 'message',
        payload: {
          message: inputValue
        }
      }));
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col">
      <div className="flex-1 flex flex-col p-6 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-white mb-6">Black Belt Dev Chat</h1>
        
        <div className="flex-1 overflow-y-auto mb-6 bg-gray-800/50 rounded-lg p-4">
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className="bg-gray-700/50 rounded-lg p-3 text-white break-words"
              >
                {msg}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="flex gap-2">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            onClick={sendMessage}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <Send size={20} />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;