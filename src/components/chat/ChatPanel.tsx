import { useEffect, useRef } from 'react';
import { ChatBubble } from './ChatBubble';
import { TypingIndicator } from './TypingIndicator';
import { ChatInput } from './ChatInput';
import { StatusDot } from '@/components/ui/StatusDot';
import { Message, Scenario } from '@/types';

export interface ChatPanelProps {
  activeScenario: Scenario;
  messages: Message[];
  isTyping: boolean;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
}

export function ChatPanel({
  activeScenario,
  messages,
  isTyping,
  inputValue,
  onInputChange,
  onSendMessage
}: ChatPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 flex-1 overflow-hidden h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg text-white ${activeScenario.color}`}>
            {activeScenario.icon}
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">{activeScenario.name}</h2>
            <StatusDot status="online" />
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
        {messages.map((msg) => (
          <ChatBubble 
            key={msg.id}
            role={msg.role}
            text={msg.text}
            agentColor={activeScenario.color}
            agentIcon={activeScenario.icon}
          />
        ))}
        
        {isTyping && (
          <TypingIndicator 
            agentColor={activeScenario.color} 
            agentIcon={activeScenario.icon} 
          />
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 shrink-0">
        <ChatInput 
          value={inputValue}
          onChange={onInputChange}
          onSubmit={onSendMessage}
          disabled={isTyping}
        />
      </div>
    </div>
  );
}
