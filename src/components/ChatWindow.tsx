"use client";

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, UIMessage } from 'ai';
import { X, Send, Bot, User, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState, useMemo, FormEvent } from 'react';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const [input, setInput] = useState('');

  const transport = useMemo(
    () => new DefaultChatTransport({ api: '/api/chat' }),
    []
  );

  const { messages, sendMessage, status, error } = useChat({
    transport,
    messages: [
      {
        id: 'welcome',
        role: 'assistant',
        parts: [{ type: 'text', text: 'مرحباً بك في شركة كفاءة! 🌟 كيف يمكنني مساعدتك اليوم؟' }],
      } as UIMessage,
    ],
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isLoading = status === 'submitted' || status === 'streaming';

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput('');
  };

  if (!isOpen) return null;

  // Helper to extract text from a UIMessage
  const getMessageText = (message: UIMessage): string => {
    return message.parts
      ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map(p => p.text)
      .join('') || '';
  };

  const hasToolParts = (message: UIMessage): boolean => {
    return message.parts?.some(p => p.type === 'tool-invocation') || false;
  };

  return (
    <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[400px] h-[500px] max-h-[80vh] bg-navy-card/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[60] font-[family-name:var(--font-arabic)]" dir="rtl">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 text-gold shadow-[0_0_10px_rgba(212,175,55,0.1)]">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white">المساعد الذكي</h3>
            <p className="text-xs text-silver/70">فريق مبيعات كفاءة</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 text-silver/70 hover:text-white hover:bg-white/5 rounded-full transition-colors"
          aria-label="Close Chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {messages.map((message: UIMessage) => {
          const text = getMessageText(message);
          const isToolCall = hasToolParts(message);
          
          return (
            <div 
              key={message.id} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start max-w-[85%] gap-2 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.role === 'user' ? 'bg-gold text-navy' : 'bg-white/5 border border-white/10 text-silver'}`}>
                  {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                
                <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                  message.role === 'user' 
                    ? 'bg-gold text-navy rounded-tl-sm' 
                    : 'bg-white/5 text-silver border border-white/5 rounded-tr-sm'
                }`}>
                  {isToolCall && !text ? (
                    <div className="flex items-center gap-2 text-gold">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>جاري معالجة البيانات...</span>
                    </div>
                  ) : (
                    <span className="whitespace-pre-wrap">{text}</span>
                  )}
                </div>
                
              </div>
            </div>
          );
        })}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-silver">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-2xl text-sm bg-white/5 text-silver border border-white/5 rounded-tr-sm">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-gold" />
                  <span>يكتب...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="text-center text-red-400 text-xs mt-2 bg-red-400/10 p-2 rounded-lg border border-red-400/20">
            حدث خطأ أثناء الاتصال. يرجى المحاولة مرة أخرى.
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/5 bg-navy-dark/50">
        <form onSubmit={handleFormSubmit} className="flex gap-2 relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder-silver/50 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all pr-12"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-gold text-navy flex items-center justify-center hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 -ml-0.5" />}
          </button>
        </form>
      </div>

    </div>
  );
}
