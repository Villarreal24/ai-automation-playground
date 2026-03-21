import { ReactNode } from 'react';

export interface WorkflowStep {
  text: string;
  status: 'pending' | 'active' | 'completed';
}

export interface Scenario {
  id: string;
  name: string;
  icon: ReactNode;
  description: string;
  color: string;
  greeting: string;
}

export interface Message {
  id: string;
  role: 'user' | 'agent';
  text: string;
}
