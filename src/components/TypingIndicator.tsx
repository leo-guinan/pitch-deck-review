import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 rounded-full bg-indigo-400 animate-[bounce_1s_infinite_0ms]"></div>
      <div className="w-2 h-2 rounded-full bg-indigo-400 animate-[bounce_1s_infinite_200ms]"></div>
      <div className="w-2 h-2 rounded-full bg-indigo-400 animate-[bounce_1s_infinite_400ms]"></div>
    </div>
  );
}