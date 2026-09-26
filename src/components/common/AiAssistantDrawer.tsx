import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PrototypeBadge } from './PrototypeBadge';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ShieldCheck,
  HelpCircle,
  Flame,
  ArrowRight,
  Database,
  Trash2
} from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  'Why is Ghaziabad currently flagged?',
  'What is the probable source of the Noida hotspot?',
  'Which area has the highest PM2.5?',
  'What evidence supports the Ghaziabad attribution?',
  'What complaints are still unresolved?'
];

export const AiAssistantDrawer: React.FC = () => {
  const {
    isAiAssistantOpen,
    setIsAiAssistantOpen,
    chatMessages,
    sendChatMessage
  } = useApp();

  const [inputQuestion, setInputQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAiAssistantOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isAiAssistantOpen]);

  if (!isAiAssistantOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || inputQuestion;
    if (!q.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setInputQuestion('');
    await sendChatMessage(q.trim());
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#0f172a] border-l border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm text-white">AirWatch Assistant</h3>
                <PrototypeBadge variant="ai" label="GROUNDED AI" />
              </div>
              <p className="text-[10px] text-slate-400">Answers strictly grounded in live NCR telemetry</p>
            </div>
          </div>
          <button
            onClick={() => setIsAiAssistantOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Suggested Quick Prompt Chips */}
        <div className="p-3 bg-slate-900/60 border-b border-slate-800 space-y-1.5">
          <div className="text-[10px] font-mono uppercase font-bold text-slate-400 flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-cyan-400" />
            <span>Suggested Investigation Queries</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 text-left transition flex items-center gap-1"
              >
                <span>{q}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Message Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
          {chatMessages.map(msg => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-6 h-6 rounded-lg bg-teal-600/30 border border-teal-500/50 flex items-center justify-center shrink-0 text-teal-300 mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 space-y-1.5 ${
                    isUser
                      ? 'bg-teal-600 text-white rounded-br-xs shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-xs shadow-sm'
                  }`}
                >
                  <div className="text-[11px] leading-relaxed whitespace-pre-line">
                    {msg.text}
                  </div>

                  {msg.groundedSources && msg.groundedSources.length > 0 && (
                    <div className="pt-2 border-t border-slate-800/80 mt-2 space-y-1">
                      <span className="text-[9px] font-mono text-cyan-400 block uppercase font-bold">
                        Grounded Sources:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {msg.groundedSources.map((source, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                          >
                            {source}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-[9px] text-right opacity-60 font-mono">
                    {msg.timestamp}
                  </div>
                </div>

                {isUser && (
                  <div className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-slate-300 mt-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/90">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about hotspots, sources, complaints..."
              value={inputQuestion}
              onChange={e => setInputQuestion(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
            <button
              type="submit"
              disabled={!inputQuestion.trim() || isSubmitting}
              className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask</span>
            </button>
          </form>
          <div className="text-[10px] text-slate-500 mt-1 text-center font-mono">
            Grounding guarantee: Answers strictly bounded by in-memory sensor records.
          </div>
        </div>
      </div>
    </div>
  );
};
