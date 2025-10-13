
import React, { useEffect, useRef, useState } from 'react'
import { FiX, FiInfo } from 'react-icons/fi';
import AIMessage from './AIMessage'
import ClientMessage from './ClientMessage'
import TypingLoader from '../loaders/TypingLoader'
import TextMessageBox from '../chat-input-boxes/TextMessageBox'
import { rumpkeai_assistant_use_case } from './rumpkeai-assistant-use-case'
import { useAIChat } from '@/context/AIChatContext'


export default function AIChatMobile() {
  const { visible, toggleChat, messages, setMessages, clearConversation } = useAIChat();
  const [isLoading, setIsLoading] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    const el = listRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior })
  }
  useEffect(() => { scrollToBottom('auto') }, [])
  useEffect(() => { scrollToBottom('smooth') }, [messages, isLoading])
  useEffect(() => {
    const onFocusIn = () => setTimeout(() => scrollToBottom('auto'), 0)
    const onResize = () => setTimeout(() => scrollToBottom('auto'), 0)
    const node = containerRef.current || document
    node.addEventListener('focusin', onFocusIn)
    window.addEventListener('resize', onResize)
    return () => {
      node.removeEventListener('focusin', onFocusIn)
      window.removeEventListener('resize', onResize)
    }
  }, [])
  const handlePost = async (message: string) => {
    setIsLoading(true)
    setMessages(prev => [...prev, { text: message, role: "user" }])
    try {
      const data = await rumpkeai_assistant_use_case(message)
      if (!data) {
        setMessages(prev => [...prev, { text: 'Ohne Antwort vom Server', role: "assistant" }])
      } else {
        setMessages(prev => [...prev, { text: data.message.content, role: "assistant" }])
      }
    } catch {
      setMessages(prev => [...prev, { text: 'Fehler beim Senden.', role: "assistant" }])
    } finally {
      setIsLoading(false)
    }
  }
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  return (
    <>
      <div ref={containerRef} className="w-full h-screen fixed top-0 right-0 z-[600] flex flex-col bg-light-100 dark:bg-dark-300 shadow-ai-l dark:shadow-ai-d">
        <header
          className="w-full py-1 text-center text-white font-medium text-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.10)] dark:shadow-[0px_4px_12px_0px_rgba(0,255,180,0.10)] fixed top-0 left-0 right-0 z-20 animate-gradient-move bg-light-100 dark:bg-dark-300"
          style={{
            background: 'linear-gradient(90deg, var(--color-mint-600), var(--color-mint-700), var(--color-mint-600))',
            backgroundSize: '200% 200%',
            transition: 'background 0.3s',
          }}
        >
          <div className="flex items-center justify-between px-4 mb-2">
            <button
              className="w-6 h-6 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition-colors"
              onClick={() => setShowDisclaimer(true)}
              title="Rechtlicher Hinweis"
            >
              <FiInfo size={16} className="drop-shadow" />
            </button>
            <div className="absolute left-1/2 top-2 -translate-x-1/2">
              <span className="inline-block animate-ai-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="8" width="16" height="16" rx="4" fill="#fff" fillOpacity="0.12" stroke="#fff" strokeWidth="2" />
                  <rect x="13" y="13" width="6" height="6" rx="2" fill="#fff" fillOpacity="0.5" />
                  <rect x="10" y="10" width="12" height="12" rx="3" stroke="#fff" strokeWidth="1" fill="none" />
                  <line x1="16" y1="2" x2="16" y2="8" stroke="#fff" strokeWidth="2" />
                  <line x1="16" y1="24" x2="16" y2="30" stroke="#fff" strokeWidth="2" />
                  <line x1="2" y1="16" x2="8" y2="16" stroke="#fff" strokeWidth="2" />
                  <line x1="24" y1="16" x2="30" y2="16" stroke="#fff" strokeWidth="2" />
                  <circle cx="16" cy="16" r="1.5" fill="#fff" />
                </svg>
              </span>
            </div>
            <button
              onClick={toggleChat}
              title="Close chat"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition-colors"
            >
              <FiX size={16} className="drop-shadow" />
            </button>
          </div>

          <div className="relative min-h-[40px] flex items-center justify-center">
            <span className="drop-shadow-lg text-base font-semibold text-center">Dein Assistent für Einfachheit</span>
          </div>
          <style>{`
            @keyframes gradient-move {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .animate-gradient-move {
              animation: gradient-move 3s ease-in-out infinite;
            }
            @keyframes ai-icon {
              0% { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 0 #fff); }
              20% { transform: scale(1.1) rotate(8deg); filter: drop-shadow(0 0 6px #fff); }
              50% { transform: scale(1.15) rotate(-8deg); filter: drop-shadow(0 0 12px #fff); }
              80% { transform: scale(1.1) rotate(8deg); filter: drop-shadow(0 0 6px #fff); }
              100% { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 0 #fff); }
            }
            .animate-ai-icon {
              animation: ai-icon 2.2s cubic-bezier(.4,0,.2,1) infinite;
            }
          `}</style>
        </header>
        <div ref={listRef} className="flex-1 overflow-y-auto overscroll-contain px-4 pb-24 xl:px-40 mt-[100px]">
          <span className='bg-gradient-orange-yellow px-3 py-1 rounded-2xl text-white text-xs absolute right-4 top-[90px]'>Beta</span>
          <div className="grid grid-cols-12 gap-y-2">
            <AIMessage text="Hi, ich bin hier um dir zu helfen &#128519;" />
            {messages.map((m, i) =>
              m.role === "assistant"
                ? <AIMessage key={i} text={m.text} />
                : <ClientMessage key={i} text={m.text} />
            )}
            {isLoading && (
              <div className="col-start-1 col-end-12">
                <TypingLoader />
              </div>
            )}
          </div>
        </div>

        {showDisclaimer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 mb-6">
            <div className="bg-light-100 dark:bg-dark-300 rounded-xl shadow-lg max-w-lg w-full mx-4 p-6 relative">
              <h2 className="text-lg font-semibold mb-2 text-mint-600">Hinweis zur Nutzung des Chatbots / Rechtlicher Disclaimer</h2>
              <div className="text-sm text-black dark:text-white/80 mb-14 space-y-2">
                <p>Die Antworten dieses Chatbots dienen ausschließlich allgemeinen Informationszwecken und basieren auf einem vorab definierten Wissenspool. Sie berücksichtigen nicht den konkreten Einzelfall und ersetzen keine individuelle Beratung durch einen qualifizierten Experten.</p>
                <p>Die vom Chatbot bereitgestellten Informationen stellen keine Rechtsberatung im Sinne des § 2 Abs. 1 RDG dar. Für verbindliche Auskünfte oder rechtliche Bewertungen wenden Sie sich bitte an eine entsprechend befugte Stelle.</p>
                <p>Die rechtlichen Rahmenbedingungen können sich ändern und sind stets vom jeweiligen Einzelfall abhängig. Es wird empfohlen, bei Unsicherheiten professionelle Beratung in Anspruch zu nehmen.</p>
                <p>Dieser Chatbot wird von einer Künstlichen Intelligenz (KI) betrieben. Die Eingabe personenbezogener Daten ist nicht erforderlich. Weitere Hinweise zur Verarbeitung etwaiger personenbezogener Daten finden Sie in unserer Datenschutzerklärung.</p>
              </div>
              <button
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-mint-600 hover:bg-mint-700 text-white font-medium px-6 py-2 rounded-full transition-colors shadow-lg"
                onClick={() => setShowDisclaimer(false)}
                aria-label="Schließen"
              >
                Schließen
              </button>
            </div>
          </div>
        )}

        <div className="w-full fixed bottom-0 left-0 right-0">
          <div className="bg-light-200/90 dark:bg-dark-200/90 supports-[backdrop-filter]:backdrop-blur-md">
            <div className="relative mb-2">
              {messages.length > 0 && (
                <button
                  onClick={clearConversation}
                  className="absolute right-4 -top-7 w-6 h-6 flex items-center justify-center rounded-full bg-mint-600 hover:bg-mint-700 text-white transition-colors duration-200 cursor-pointer shadow-md"
                  title="Unterhaltung löschen"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </div>
            <div className="border-t border-black/10 dark:border-white/10 px-4 py-3">
              <TextMessageBox onSend={handlePost} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
