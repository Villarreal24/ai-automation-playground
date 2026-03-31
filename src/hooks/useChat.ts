import { useState, useCallback, useEffect, Dispatch, SetStateAction } from 'react';
import { Message, WorkflowStep } from '@/types';
import { SCENARIOS } from '@/data/scenarios';
import { streamChatResponse } from '@/lib/n8n-client';

function getOrCreateSessionId(scenarioId: string): string {
  const storageKey = `session_${scenarioId}`;
  const existing = sessionStorage.getItem(storageKey);
  if (existing) return existing;

  const newId = `${scenarioId}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  sessionStorage.setItem(storageKey, newId);
  return newId;
}

export function useChat(
  activeScenarioId: string,
  simulateWorkflow: (scenarioId: string) => void,
  clearSimulation: () => void
) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const activeScenario = SCENARIOS[activeScenarioId];

  const resetChat = useCallback(() => {
    // Generate a fresh sessionId for this scenario
    const storageKey = `session_${activeScenarioId}`;
    const newId = `${activeScenarioId}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem(storageKey, newId);

    setMessages([
      { id: Date.now().toString(), role: 'agent', text: SCENARIOS[activeScenarioId].greeting }
    ]);
    setInputValue('');
    setIsTyping(false);
    clearSimulation();
  }, [activeScenarioId, clearSimulation]);

  // Automatically reset the chat whenever the scenario changes
  useEffect(() => {
    resetChat();
  }, [resetChat]);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: userText };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);
    simulateWorkflow(activeScenarioId);

    // Create an empty agent message that we'll fill via streaming
    const agentMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: agentMsgId, role: 'agent', text: '' }]);

    const sessionId = getOrCreateSessionId(activeScenarioId);

    await streamChatResponse(
      activeScenarioId,
      userText,
      sessionId,
      // onChunk: append each text chunk to the agent's message
      (chunk: string) => {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === agentMsgId
              ? { ...msg, text: msg.text + chunk }
              : msg
          )
        );
      },
      // onError: show error in the agent message
      (error: Error) => {
        console.error('Stream error:', error);
        setMessages(prev =>
          prev.map(msg =>
            msg.id === agentMsgId
              ? { ...msg, text: `Error: ${error.message}. Please try again.` }
              : msg
          )
        );
      }
    );

    setIsTyping(false);
  }, [inputValue, isTyping, activeScenarioId, simulateWorkflow]);

  return {
    messages,
    inputValue,
    isTyping,
    setInputValue,
    handleSendMessage,
    resetChat,
    setIsTyping,
    setMessages
  };
}
