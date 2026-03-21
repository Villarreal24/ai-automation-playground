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

  const { workflowSteps, setWorkflowSteps } = useWorkflowEvents();
  const {
    messages,
    inputValue,
    isTyping,
    setInputValue,
    handleSendMessage,
    resetChat
  } = useChat(activeScenarioId, setWorkflowSteps);

  // Handle changing scenarios
  const handleScenarioChange = (id: string) => {
    setActiveScenarioId(id);
    // Note: useChat automatically triggers resetChat via useEffect when activeScenarioId changes
  };

  return (
    <>
      <Header 
        activeScenarioId={activeScenarioId} 
        onScenarioChange={handleScenarioChange} 
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 h-[calc(100vh-88px)]">
        
        {/* LEFT PANEL: CHAT INTERFACE */}
        <div className="w-full lg:w-1/2 min-h-[500px]">
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
        <div className="w-full lg:w-1/2 min-h-[500px]">
          <WorkflowPanel 
            scenarioId={activeScenarioId}
            steps={workflowSteps}
          />
        </div>
      </main>
    </>
  );
}
