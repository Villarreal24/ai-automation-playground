import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

export interface ChatBubbleProps {
  role: 'user' | 'agent';
  text: string;
  agentColor?: string;
  agentIcon?: ReactNode;
}

export function ChatBubble({ role, text, agentColor = 'bg-indigo-500', agentIcon }: ChatBubbleProps) {
  const isUser = role === 'user';

  return (
    <div className={cn('flex gap-4', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div 
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white shadow-sm mt-1', 
            agentColor
          )}
        >
          {agentIcon || <Bot className="w-4 h-4" />}
        </div>
      )}
      <div 
        className={cn(
          'max-w-[80%] px-5 py-3.5 shadow-sm text-[15px] leading-relaxed',
          isUser 
            ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-sm' 
            : 'bg-white border border-slate-100 text-slate-700 rounded-2xl rounded-tl-sm'
        )}
      >
        {text}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white bg-slate-400 shadow-sm mt-1">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}
