import React, { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold max-w-fit',
          {
            'bg-slate-100 text-slate-800': variant === 'default',
            'bg-emerald-100 text-emerald-800': variant === 'success',
            'bg-amber-100 text-amber-800': variant === 'warning',
            'bg-rose-100 text-rose-800': variant === 'error',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge };
