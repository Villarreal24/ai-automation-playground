import React from 'react';
import { Stethoscope, Home, HeadphonesIcon } from 'lucide-react';
import { Scenario } from '@/types';

export const SCENARIOS: Record<string, Scenario> = {
  clinic: {
    id: 'clinic',
    name: 'Clinic Assistant',
    icon: React.createElement(Stethoscope, { className: "w-5 h-5" }),
    description: 'Manages appointments, answers patient queries, and checks calendar availability.',
    color: 'bg-blue-500',
    greeting: "Hello! I'm the Clinic Assistant. How can I help you with your appointment today?",
  },
  real_estate: {
    id: 'real_estate',
    name: 'Real Estate Agent',
    icon: React.createElement(Home, { className: "w-5 h-5" }),
    description: 'Qualifies leads, captures preferences (budget, location), and schedules viewings.',
    color: 'bg-emerald-500',
    greeting: "Hi there! I'm your Real Estate Assistant. Are you looking to buy, rent, or sell a property?",
  },
  support: {
    id: 'support',
    name: 'Customer Support',
    icon: React.createElement(HeadphonesIcon, { className: "w-5 h-5" }),
    description: 'Handles order status inquiries, FAQs, and escalations to human agents.',
    color: 'bg-purple-500',
    greeting: "Welcome to Customer Support. How can I assist you with your order today?",
  }
};

export const VALID_SCENARIOS = ['clinic', 'real_estate', 'support'] as const;
export type ScenarioId = typeof VALID_SCENARIOS[number];
