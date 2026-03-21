import React from 'react';
import { SCENARIOS } from '@/data/scenarios';
import { cn } from '@/lib/utils';

export interface ScenarioSelectorProps {
  activeScenarioId: string;
  onScenarioChange: (id: string) => void;
}

export function ScenarioSelector({ activeScenarioId, onScenarioChange }: ScenarioSelectorProps) {
  return (
    <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto no-scrollbar">
      {Object.values(SCENARIOS).map((scenario) => {
        const isActive = activeScenarioId === scenario.id;
        
        return (
          <button
            key={scenario.id}
            onClick={() => onScenarioChange(scenario.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap',
              isActive 
                ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/50' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
            )}
          >
            {scenario.icon}
            <span className="hidden md:inline">{scenario.name}</span>
          </button>
        );
      })}
    </div>
  );
}
