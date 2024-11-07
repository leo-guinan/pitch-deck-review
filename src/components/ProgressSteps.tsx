import React from 'react';
import { Upload, MessageSquare, BookOpen, Share2, CheckCircle2 } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  icon: React.ReactNode;
  completed: boolean;
  current: boolean;
}

interface ProgressStepsProps {
  currentStep: number;
}

export default function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const steps: Step[] = [
    {
      id: 1,
      title: "Upload Pitch Deck",
      icon: <Upload className="w-5 h-5" />,
      completed: currentStep > 1,
      current: currentStep === 1
    },
    {
      id: 2,
      title: "Answer Questions",
      icon: <MessageSquare className="w-5 h-5" />,
      completed: currentStep > 2,
      current: currentStep === 2
    },
    {
      id: 3,
      title: "Generate Story",
      icon: <BookOpen className="w-5 h-5" />,
      completed: currentStep > 3,
      current: currentStep === 3
    },
    {
      id: 4,
      title: "Share Journey",
      icon: <Share2 className="w-5 h-5" />,
      completed: currentStep > 4,
      current: currentStep === 4
    }
  ];

  return (
    <div className="p-6 border-b border-gray-800">
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl font-bold text-white">Welcome to Sarah's Submind!</h1>
        <p className="text-gray-400">Send your Pitch Deck directly to Sarah with a compelling Founder Story.</p>
      </div>

      <div className="relative">
        {/* Progress Bar */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-800" />
        <div 
          className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-indigo-500 to-violet-500 transition-all duration-500"
          style={{ height: `${(currentStep - 1) * 33.33}%` }}
        />

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step) => (
            <div key={step.id} className="relative flex items-start pl-16">
              <div 
                className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                  ${step.completed 
                    ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white' 
                    : step.current
                      ? 'bg-gray-800 text-indigo-400 ring-2 ring-indigo-500 ring-offset-2 ring-offset-gray-900'
                      : 'bg-gray-800 text-gray-500'
                  }`}
              >
                {step.completed ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
              </div>
              <div>
                <h3 className={`font-medium mb-1 ${
                  step.completed 
                    ? 'text-indigo-400' 
                    : step.current
                      ? 'text-white'
                      : 'text-gray-500'
                }`}>
                  {step.title}
                </h3>
                {step.current && (
                  <p className="text-sm text-gray-400">
                    {step.id === 1 && "Upload your deck to get started"}
                    {step.id === 2 && "Tell Sarah about your vision"}
                    {step.id === 3 && "Review your founder story"}
                    {step.id === 4 && "Share with founder friends"}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}