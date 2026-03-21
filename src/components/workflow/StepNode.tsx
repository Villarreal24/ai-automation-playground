import { CheckCircle2, ChevronRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WorkflowStep } from '@/types';
import { motion } from 'framer-motion';

export interface StepNodeProps {
  step: WorkflowStep;
  isLast: boolean;
}

export function StepNode({ step, isLast }: StepNodeProps) {
  const isActive = step.status === 'active';
  const isCompleted = step.status === 'completed';
  const isPending = step.status === 'pending';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative pl-10 pb-10 last:pb-0"
    >
      {/* Timeline Line */}
      {!isLast && (
        <div className={cn(
          'absolute left-[11px] top-6 bottom-[-24px] w-[2px] transition-colors duration-500', 
          isCompleted ? 'bg-indigo-500' : 'bg-slate-700'
        )} />
      )}

      {/* Timeline Dot */}
      <div className={cn(
        'absolute left-0 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-slate-900 transition-all duration-300',
        isCompleted ? 'border-indigo-500 text-indigo-500' : 
        isActive ? 'border-emerald-400 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]' : 
        'border-slate-700 text-transparent'
      )}>
        {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
        {isActive && <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />}
      </div>

      {/* Content Box */}
      <div className={cn(
        'rounded-lg p-4 border transition-all duration-300',
        isCompleted ? 'bg-slate-800/50 border-slate-700 text-slate-300' : '',
        isActive ? 'bg-indigo-900/20 border-indigo-500/50 text-white transform scale-[1.02]' : '',
        isPending ? 'bg-slate-900/50 border-slate-800 text-slate-600' : ''
      )}>
        <div className="flex items-center gap-2">
          {isActive && <ChevronRight className="w-4 h-4 text-emerald-400 animate-pulse" />}
          <span className="font-semibold tracking-wide">
            {step.text}
          </span>
        </div>
        {isActive && (
          <div className="mt-3 flex items-center gap-2 text-xs text-indigo-300">
            <Clock className="w-3 h-3 animate-spin" style={{ animationDuration: '3s' }}/>
            Processing node...
          </div>
        )}
      </div>
    </motion.div>
  );
}
