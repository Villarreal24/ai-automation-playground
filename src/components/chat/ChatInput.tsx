import React, { FormEvent } from 'react';
import { Send } from 'lucide-react';

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ 
  value, 
  onChange, 
  onSubmit, 
  disabled = false,
  placeholder = "Type your message here..."
}: ChatInputProps) {
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!disabled && value.trim()) {
      onSubmit();
    }
  };

  const isSubmitDisabled = disabled || !value.trim();

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl pl-5 pr-14 py-4 text-slate-700 outline-none transition-all shadow-inner disabled:opacity-70 disabled:cursor-not-allowed"
      />
      <button 
        type="submit" 
        disabled={isSubmitDisabled}
        className="absolute right-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors shadow-sm"
      >
        <Send className="w-5 h-5 ml-0.5" />
      </button>
    </form>
  );
}
