'use client'
import { useEffect, useState } from 'react'
import type { SwiperModule } from 'swiper/types';

export default function useSwiperGlModule(
  modulePath: string = '@/lib/uii/shaders/swiper-gl.esm.js'
) {
  const [mods, setMods] = useState<SwiperModule[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let alive = true
      ; (async () => {
        try {
          let m;
          switch (modulePath) {
            case '@/lib/uii/shaders/swiper-gl.esm.js':
              m = await import('@/lib/uii/shaders/swiper-gl.esm.js');
              break;
            // Si necesitas más módulos, agrega más casos aquí
            default:
              throw new Error('Módulo no soportado');
          }
          const GL = (m as { default?: SwiperModule }).default ?? m
          if (alive) {
            setMods([GL as SwiperModule])
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
