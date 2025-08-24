
'use client'


import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/header/Header';




export default function Home() {
  return (

    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-stone-900 text-black dark:text-white transition-colors">
        <Header />
      </div>
    </ThemeProvider>
  );
}
