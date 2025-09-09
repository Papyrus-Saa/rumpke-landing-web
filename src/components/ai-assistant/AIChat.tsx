'use client'

import React, { useEffect, useRef, useState } from 'react'
import AIMessage from './AIMessage'
import ClientMessage from './ClientMessage'
import TypingLoader from '../loaders/TypingLoader'
import TextMessageBox from '../chat-input-boxes/TextMessageBox'
import { rumpkeai_assistant_use_case } from './rumpkeai-assistant-use-case'
import ThemeSwitch from '../ThemeSwitch'

type Message = { text: string; isGPT: boolean }

export default function AIChat() {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
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
    setMessages(prev => [...prev, { text: message, isGPT: false }])

    try {
      const data = await rumpkeai_assistant_use_case(message)
      if (!data) {
        setMessages(prev => [...prev, { text: 'Ohne Antwort vom Server', isGPT: true }])
      } else {
        setMessages(prev => [...prev, { text: data.message.content, isGPT: true }])
      }
    } catch {
      setMessages(prev => [...prev, { text: 'Fehler beim Senden.', isGPT: true }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      ref={containerRef}
      className="
        fixed left-0 right-0 top-0 z-40 mx-auto
        h-[100dvh] min-h-[100dvh]
        flex flex-col
        bg-light-200 dark:bg-dark-200 py-2
      "
    >
      <div
        ref={listRef}
        className="
          flex-1 overflow-y-auto overscroll-contain
          px-4 pt-4 pb-3 xl:px-40  xl:pt-20
        "
      >

        <div className='absolute top-1 right-1'>
          <ThemeSwitch/>
        </div>
        <div className="grid grid-cols-12 gap-y-2">
          <AIMessage text="Hi, ich bin hier um dir zu helfen &#128519;" />
          {messages.map((m, i) =>
            m.isGPT ? (
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
          border-t border-black/10 dark:border-white/10
          bg-light-200/90 dark:bg-dark-200/90
          supports-[backdrop-filter]:backdrop-blur-md
          px-4 py-3
          pb-[env(safe-area-inset-bottom)]
        "
      >
        <TextMessageBox onSend={handlePost} />
      </div>
    </div>
  )
}
