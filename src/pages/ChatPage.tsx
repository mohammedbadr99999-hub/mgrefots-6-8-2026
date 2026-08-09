import React from 'react';
import { ExpertChat } from '../components/ExpertChat';
import { Language } from '../types';

interface ChatPageProps {
  lang: Language;
  onSendChatMessage: (message: string) => Promise<string>;
}

export const ChatPage: React.FC<ChatPageProps> = ({ lang, onSendChatMessage }) => {
  return (
    <div className="animate-fade-in">
      <ExpertChat
        lang={lang}
        onSendChatMessage={onSendChatMessage}
      />
    </div>
  );
};
