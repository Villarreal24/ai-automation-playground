import React from 'react';
import { cn } from '@/lib/utils';

export interface StatusDotProps {
  status?: 'online' | 'offline' | 'busy';
  className?: string;
}

export function StatusDot({ status = 'online', className }: StatusDotProps) {
  return (
    <div className={cn('flex items-center gap-1.5 text-xs font-medium', className, {
      'text-emerald-600': status === 'online',
      'text-slate-500': status === 'offline',
      'text-amber-500': status === 'busy',
    })}>
      <span className="relative flex h-2 w-2">
        {status === 'online' && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        )}
        <span
          className={cn('relative inline-flex rounded-full h-2 w-2', {
            'bg-emerald-500': status === 'online',
            'bg-slate-400': status === 'offline',
            'bg-amber-500': status === 'busy',
          })}
        ></span>
      </span>
      {status === 'online' && 'Agent Online'}
      {status === 'offline' && 'Offline'}
      {status === 'busy' && 'Busy'}
    </div>
  );
}
