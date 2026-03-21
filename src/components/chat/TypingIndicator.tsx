import { ReactNode } from 'react';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TypingIndicatorProps {
  agentColor?: string;
  agentIcon?: ReactNode;
}

export function TypingIndicator({ agentColor = 'bg-indigo-500', agentIcon }: TypingIndicatorProps) {
  return (
    <div className="flex gap-4 justify-start">
      <div 
        className={cn(
          'w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white shadow-sm mt-1', 
          agentColor
        )}
      >
        {agentIcon || <Bot className="w-4 h-4" />}
      </div>
      <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }}></span>
        <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }}></span>
        <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }}></span>
      </div>
    </div>
  );
}
