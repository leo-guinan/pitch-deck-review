import React, { useState, useRef, useEffect } from 'react';
import { AlertCircle, Paperclip, SmilePlus, Mic, Send, Star, Share2, RefreshCw, Check, Upload } from 'lucide-react';
import TypingEffect from './TypingEffect';
import TypingIndicator from './TypingIndicator';
import { generateResponse } from '../lib/gemini';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'ai';
  isTyping?: boolean;
  isLastQuestion?: boolean;
}

interface ChatPanelProps {
  uploadSuccess?: boolean;
  pdfContent?: string;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ uploadSuccess, pdfContent }) => {
  const [messages, setMessages] = useState<Message[]>([{
    id: '0',
    content: "👋 Hi there! I'm Sarah's AI assistant. Upload your pitch deck to get started!",
    type: 'ai',
    isTyping: true
  }]);
  const [input, setInput] = useState('');
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [rating, setRating] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleTypingComplete = async (messageId: string) => {
    const updatedMessages = messages.map(msg =>
      msg.id === messageId ? { ...msg, isTyping: false } : msg
    );
    setMessages(updatedMessages);

    console.log('Completed message:', updatedMessages.find(msg => msg.id === messageId));
    console.log('Is last question?', updatedMessages.find(msg => msg.id === messageId)?.isLastQuestion);
    
    if (updatedMessages.find(msg => msg.id === messageId)?.isLastQuestion) {
      setTimeout(() => {
        setShowRatingModal(true);
      }, 1000);
    }
  };

  const addMessage = async (content: string, type: 'user' | 'ai') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      type,
      isTyping: type === 'ai'
    };

    setMessages(prev => [...prev, newMessage]);
    scrollToBottom();

    if (type === 'user') {
      setIsWaitingForResponse(true);
      const response = await generateResponse(content, pdfContent);
      console.log('Generated response:', response);
      setIsWaitingForResponse(false);
      
      if (response.text) {
        const aiMessage: Message = {
          id: Date.now().toString(),
          content: response.text,
          type: 'ai',
          isTyping: true,
          isLastQuestion: response.isLastQuestion
        };
        setMessages(prev => [...prev, aiMessage]);
      } else if (response.isLastQuestion) {
        setTimeout(() => {
          setShowRatingModal(true);
        }, 1000);
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isWaitingForResponse || !uploadSuccess) return;

    const trimmedInput = input.trim();
    setInput('');
    await addMessage(trimmedInput, 'user');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRatingSubmit = () => {
    setShowRatingModal(false);
    setShowThankYouModal(true);
  };

  const handleShareProfile = () => {
    window.location.href = '#share';
  };

  const handleViewAnotherInvestor = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (uploadSuccess) {
      const startConversation = async () => {
        const response = await generateResponse('start_conversation', pdfContent);
        await addMessage(response.text, 'ai');
      };
      startConversation();
    }
  }, [uploadSuccess]);

  return (
    <div className="relative flex flex-col h-full bg-gray-950">
      <div className="absolute inset-0 flex flex-col">
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto scrollbar-chat p-4 space-y-4"
          style={{ 
            height: 'calc(100% - 80px)',
            overflowY: 'auto',
            overflowX: 'hidden'
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'ai' 
                    ? 'bg-indigo-500 text-white' 
                    : 'bg-gray-800 text-white'
                }`}>
                  {message.type === 'ai' ? 'AI' : 'U'}
                </div>

                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.type === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-gray-800 text-gray-100 rounded-tl-none'
                  }`}
                >
                  {message.isTyping ? (
                    <TypingEffect text={message.content} onComplete={() => handleTypingComplete(message.id)} />
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isWaitingForResponse && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center flex-shrink-0">
                AI
              </div>
              <div className="rounded-2xl px-4 py-2 bg-gray-800 text-gray-100">
                <TypingIndicator />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex-shrink-0 border-t border-gray-800 p-4 bg-gray-950">
          <div className="flex items-center gap-2">
            <div className={`flex-1 bg-gray-900 rounded-lg flex items-center gap-2 px-4 py-2 ${!uploadSuccess && 'opacity-50'}`}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={uploadSuccess ? "Type a message..." : "Please upload your pitch deck first"}
                disabled={!uploadSuccess}
                className="flex-1 bg-transparent text-gray-100 placeholder-gray-500 outline-none text-sm disabled:cursor-not-allowed"
              />
              {!uploadSuccess && (
                <Upload className="w-5 h-5 text-gray-500" />
              )}
              {uploadSuccess && (
                <>
                  <button className="text-gray-400 hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed" disabled={!uploadSuccess}>
                    <SmilePlus className="w-5 h-5" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed" disabled={!uploadSuccess}>
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed" disabled={!uploadSuccess}>
                    <Mic className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isWaitingForResponse || !uploadSuccess}
              className={`p-2 rounded-lg ${
                !input.trim() || isWaitingForResponse || !uploadSuccess
                  ? 'bg-gray-800 text-gray-600'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              } transition-colors`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {showRatingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-gray-800/90 rounded-xl p-6 max-w-md w-full animate-slideUp backdrop-blur-lg border border-gray-700/50">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Rate Your Experience</h3>
            <p className="text-gray-300 mb-6 text-center">How was your application experience?</p>
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                    rating >= star ? 'text-yellow-400' : 'text-gray-600'
                  }`}
                >
                  <Star className="w-8 h-8" fill={rating >= star ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>
            <button
              onClick={handleRatingSubmit}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!rating}
            >
              Submit Rating
            </button>
          </div>
        </div>
      )}

      {showThankYouModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-gray-800/90 rounded-xl p-6 max-w-md w-full animate-slideUp backdrop-blur-lg border border-gray-700/50">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Application Submitted!</h3>
              <p className="text-gray-300">Thank you for sharing your startup journey with Sarah.</p>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleShareProfile}
                className="w-full group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-200" />
                <div className="relative w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <Share2 className="w-5 h-5" />
                  <span>Share Sarah's Profile</span>
                </div>
              </button>
              <button
                onClick={handleViewAnotherInvestor}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                <span>View Another Investor</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPanel;