'use client'

import React, { useEffect, useRef, useState } from 'react'
import AIMessage from './AIMessage'
import ClientMessage from './ClientMessage'
import TypingLoader from '../loaders/TypingLoader'
import TextMessageBox from '../chat-input-boxes/TextMessageBox'
import { rumpkeai_assistant_use_case } from './rumpkeai-assistant-use-case'
import AIButton from './AIButton'
import { useAIChat } from '@/context/AIChatContext'


export default function AIChat() {



  const { visible, toggleChat, messages, setMessages } = useAIChat();


  const [isLoading, setIsLoading] = useState(false)

  const listRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    const el = listRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior })
  }

  useEffect(() => {
    scrollToBottom('auto')
  }, [])

  useEffect(() => {
    scrollToBottom('smooth')
  }, [messages, isLoading])

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

  return (
    <>
      <div
        ref={containerRef}
        className="
      w-[400px] h-[650px] fixed md:right-10 bottom-0 2xl:right-56 z-10
      flex flex-col
      bg-light-100 dark:bg-dark-300 duration-500
      shadow-ai-l dark:shadow-ai-d
      rounded-xl
      "
      >
        <header className='w-full bg-mint-600 py-6 text-center text-white font-medium text-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.10)] dark:shadow-[0px_4px_12px_0px_rgba(0,255,180,0.10)] rounded-t-xl'>
          <span>Unser KI-Assistent hilft!</span>
        </header>
        <div
          ref={listRef}
          className="
          flex-1 overflow-y-auto overscroll-contain
          px-4 pt-4 pb-3
        "
        >
          <div className='absolute top-1 right-1'>
            <AIButton
              visible={visible}
              toggleChat={toggleChat}
            />
          </div>
          <div className="grid grid-cols-2 gap-y-2">
            <AIMessage text="Hi, ich bin hier um dir zu helfen &#128519;" />
            {messages.map((m, i) =>
              m.role === "assistant" ? (
                <AIMessage key={i} text={m.text} />
              ) : (
                <ClientMessage key={i} text={m.text} />
              )
            )}

            {isLoading && (
              <div className="col-start-1 col-end-12">
                <TypingLoader />
              </div>
            )}
          </div>
        </div>


        <div
          className="
          duration-500
          border-t border-black/10 dark:border-white/10
          bg-light-100 dark:bg-dark-300
          supports-[backdrop-filter]:backdrop-blur-md
          px-4 py-3
          pb-[env(safe-area-inset-bottom)]

        "
        >
          <TextMessageBox onSend={handlePost} />
        </div>
      </div>
    </>
  )
}
