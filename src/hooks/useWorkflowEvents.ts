import { useState, useCallback, useRef, useEffect } from 'react';
import { WorkflowStep } from '@/types';

export function useWorkflowEvents() {
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([]);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, []);

  const simulateWorkflow = useCallback((scenarioId: string) => {
    // Clear any existing timeouts to reset the simulation cleanly
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];

    const scenarios: Record<string, { id: number; label: string }[]> = {
      clinic: [
        { id: 1, label: "Receiving user message..." },
        { id: 2, label: "Analyzing request with AI..." },
        { id: 3, label: "Checking calendar availability..." },
        { id: 4, label: "Preparing response..." }
      ],
      real_estate: [
        { id: 1, label: "Receiving user message..." },
        { id: 2, label: "Analyzing property requirements..." },
        { id: 3, label: "Searching CRM for matches..." },
        { id: 4, label: "Preparing property recommendations..." }
      ],
      support: [
        { id: 1, label: "Receiving user message..." },
        { id: 2, label: "Analyzing customer intent..." },
        { id: 3, label: "Checking order database..." },
        { id: 4, label: "Preparing support resolution..." }
      ]
    };

    const stepsToRun = scenarios[scenarioId] || scenarios['clinic'];
    
    // Initialize all as pending
    setWorkflowSteps(stepsToRun.map(s => ({ text: s.label, status: 'pending' as const })));

    let currentStepIndex = 0;

    const runNextStep = () => {
      setWorkflowSteps(prev => 
        prev.map((step, index) => {
          if (index < currentStepIndex) return { ...step, status: 'completed' as const };
          if (index === currentStepIndex) return { ...step, status: 'active' as const };
          return { ...step, status: 'pending' as const };
        })
      );

      if (currentStepIndex < stepsToRun.length) {
        currentStepIndex++;
        const timeout = setTimeout(runNextStep, 800 + Math.random() * 400); // randomize slightly for realism
        timeoutRefs.current.push(timeout);
      } else {
        // Mark the last step as completed after a delay
        const finalTimeout = setTimeout(() => {
          setWorkflowSteps(prev => 
            prev.map(step => ({ ...step, status: 'completed' as const }))
          );
        }, 500);
        timeoutRefs.current.push(finalTimeout);
      }
    };

    // Start simulation
    const initialTimeout = setTimeout(runNextStep, 300);
    timeoutRefs.current.push(initialTimeout);
  }, []);

  const clearSimulation = useCallback(() => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
    setWorkflowSteps([]);
  }, []);

  return {
    workflowSteps,
    setWorkflowSteps,
    simulateWorkflow,
    clearSimulation
  };
}
