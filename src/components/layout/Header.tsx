import { Activity } from 'lucide-react';
import { ScenarioSelector } from './ScenarioSelector';

export interface HeaderProps {
  activeScenarioId: string;
  onScenarioChange: (id: string) => void;
}

export function Header({ activeScenarioId, onScenarioChange }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3 mb-4 md:mb-0 w-full md:w-auto">
        <div className="bg-indigo-600 p-2 rounded-lg shrink-0">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight">AI Automation Playground</h1>
          <p className="text-sm text-slate-500">Live Agent Demonstration</p>
        </div>
      </div>

      <ScenarioSelector 
        activeScenarioId={activeScenarioId} 
        onScenarioChange={onScenarioChange} 
      />
    </header>
  );
}
