import { useState } from 'react';
import { WorkflowStep } from '@/types';

export function useWorkflowEvents() {
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([]);

  return {
    workflowSteps,
    setWorkflowSteps,
  };
}
