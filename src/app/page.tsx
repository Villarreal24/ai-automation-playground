'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { WorkflowPanel } from '@/components/workflow/WorkflowPanel';
import { useChat } from '@/hooks/useChat';
import { useWorkflowEvents } from '@/hooks/useWorkflowEvents';
import { SCENARIOS } from '@/data/scenarios';

export default function App() {
  const [activeScenarioId, setActiveScenarioId] = useState('clinic');
  const activeScenario = SCENARIOS[activeScenarioId];

  const { workflowSteps, simulateWorkflow, clearSimulation } = useWorkflowEvents();
  const {
    messages,
    inputValue,
    isTyping,
    setInputValue,
    handleSendMessage,
    resetChat
  } = useChat(activeScenarioId, simulateWorkflow, clearSimulation);

  // Handle changing scenarios
  const handleScenarioChange = (id: string) => {
    setActiveScenarioId(id);
    // Note: useChat automatically triggers resetChat via useEffect when activeScenarioId changes
  };

  return (
    <div className="h-full flex flex-col">
      <Header 
        activeScenarioId={activeScenarioId} 
        onScenarioChange={handleScenarioChange} 
      />

      {/* Main Content Area — flex-1 + min-h-0 ensures it fills remaining viewport height
          without overflowing the body, keeping scroll contained inside each panel */}
      <main className="flex-1 min-h-0 w-full max-w-[1400px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 self-stretch">
        
        {/* LEFT PANEL: CHAT INTERFACE */}
        <div className="w-full lg:w-1/2 flex flex-col min-h-0 lg:min-h-0 min-h-[500px] overflow-hidden">
          <ChatPanel 
            activeScenario={activeScenario}
            messages={messages}
            isTyping={isTyping}
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSendMessage={handleSendMessage}
          />
        </div>

        {/* RIGHT PANEL: WORKFLOW VISUALIZATION */}
        <div className="w-full lg:w-1/2 flex flex-col min-h-0 lg:min-h-0 min-h-[500px] overflow-hidden">
          <WorkflowPanel 
            scenarioId={activeScenarioId}
            steps={workflowSteps}
          />
        </div>
      </main>
    </div>
  );
}
