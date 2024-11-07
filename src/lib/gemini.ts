import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('Missing Gemini API key');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const questions = [
  "Thanks for uploading your pitch deck. When did you launch your startup and what inspired you to launch?",
  "How did you and your co-founders meet, and what brought you together to work on this problem?",
  "What makes this problem particularly meaningful to you and your team?",
  "Could you share your current fundraising progress? How much have you raised or had committed so far?",
  "What's your current monthly or annual revenue?",
  "What would you say is your team's unfair advantage or moat in this space?",
  "Could you tell me about each founder's background and domain expertise?"
];

let currentQuestionIndex = 0;

export async function generateResponse(prompt: string, context?: string): Promise<{ text: string; isLastQuestion: boolean }> {
  try {
    console.log('Current question index:', currentQuestionIndex);
    
    // Initial question after PDF upload
    if (prompt === 'start_conversation') {
      currentQuestionIndex = 0;
      console.log('Starting conversation, isLastQuestion:', false);
      return { text: questions[currentQuestionIndex], isLastQuestion: false };
    }

    // If we're at the last question and receiving an answer
    if (currentQuestionIndex === questions.length - 1) {
      console.log('Processing final answer, sending empty message to trigger modal');
      currentQuestionIndex = 0; // Reset for next session
      return { 
        text: "", // Empty message since we'll show the modal instead
        isLastQuestion: true 
      };
    }

    // Move to next question
    currentQuestionIndex++;
    console.log('Moving to next question, index:', currentQuestionIndex);
    console.log('Is last question?', currentQuestionIndex === questions.length - 1);
    
    return { 
      text: questions[currentQuestionIndex], 
      isLastQuestion: false
    };

  } catch (error) {
    console.error('Error generating response:', error);
    return { 
      text: "I apologize, but I'm having trouble processing your request at the moment. Please try again.",
      isLastQuestion: false 
    };
  }
}