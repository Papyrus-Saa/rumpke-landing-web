'use client'
import { useEffect, useState } from 'react'


export default function useSwiperGlModule(
  modulePath: string = '@/lib/uii/shaders/swiper-gl.esm.js'
) {
  const [mods, setMods] = useState<any[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const m = await import(modulePath)
        const GL = (m as any).default ?? m
        if (alive) {
          setMods([GL])
          setReady(true)
        }
      } catch {
        if (alive) setReady(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [modulePath])

  return { mods, ready }
}
