import React, { useEffect, useRef } from 'react';
import { Activity } from 'lucide-react';
import { StepTimeline } from './StepTimeline';
import { WorkflowStep } from '@/types';

export interface WorkflowPanelProps {
  scenarioId: string;
  steps: WorkflowStep[];
}

export function WorkflowPanel({ scenarioId, steps }: WorkflowPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the timeline when steps change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [steps]);

  return (
    <div className="flex flex-col bg-slate-900 rounded-2xl shadow-lg border border-slate-800 flex-1 overflow-hidden relative text-slate-200 h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm flex items-center justify-between sticky top-0 z-10 shrink-0">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-400" />
          <h2 className="font-semibold text-white">Workflow Execution</h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded">
          Webhook: /api/webhook/{scenarioId}
        </div>
      </div>

      {/* Content Area */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto px-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950 font-mono text-sm relative scroll-smooth"
      >
        {/* Grid background effect */}
        <div className="absolute inset-0 bg-grid-slate-pattern opacity-20 pointer-events-none"></div>

        <StepTimeline steps={steps} />
      </div>
    </div>
  );
}
