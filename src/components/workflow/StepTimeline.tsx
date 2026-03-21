import { StepNode } from './StepNode';
import { WorkflowStep } from '@/types';
import { Sparkles } from 'lucide-react';

export interface StepTimelineProps {
  steps: WorkflowStep[];
}

export function StepTimeline({ steps }: StepTimelineProps) {
  if (steps.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4 relative z-10 p-8">
        <Sparkles className="w-12 h-12 text-slate-700 mb-2" />
        <p>Waiting for user input...</p>
        <p className="text-xs text-slate-600 text-center max-w-xs font-sans">
          Send a message in the chat to see how the AI agent processes it in real time.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-0 relative z-10 pl-4 py-8">
      {steps.map((step, index) => (
        <StepNode 
          key={`${step.text}-${index}`} 
          step={step} 
          isLast={index === steps.length - 1} 
        />
      ))}
    </div>
  );
}
