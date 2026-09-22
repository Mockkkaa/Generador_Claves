import { useState, useCallback, useEffect } from 'react'
import './App.css'
import './index.css'
import { Copy, Check, Lock, Settings, Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

function App() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(16)
  const [includeLetters, setIncludeLetters] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [copied, setCopied] = useState(false)
  const [isDark, setIsDark] = useState(false)

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    document.body.classList.toggle('dark')
    document.documentElement.classList.toggle('dark')
  }

  const generatePassword = useCallback(() => {
    let characters = ""
    if (includeLetters) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (includeNumbers) characters += "0123456789"
    if (includeSymbols) characters += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    if (!characters) {
      characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    }

    let result = ""
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      result += characters[randomIndex]
    }

    setPassword(result)
    setCopied(false)
  }, [length, includeLetters, includeNumbers, includeSymbols])

  // Initial password generation on load
  useEffect(() => {
    generatePassword()
  }, [generatePassword])

  const copyToClipboard = () => {
    if (!password) return
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2500)
  }

  // Calculate Security Level
  const getSecurityLevel = () => {
    let score = 0
    if (length >= 12) score += 1
    if (length >= 18) score += 1
    if (includeLetters) score += 1
    if (includeNumbers) score += 1
    if (includeSymbols) score += 1

    if (score <= 2) return { text: 'Débil', color: 'bg-red-500', width: '33%', textColor: 'text-red-600 dark:text-red-400' }
    if (score <= 4) return { text: 'Media', color: 'bg-amber-500', width: '66%', textColor: 'text-amber-600 dark:text-amber-400' }
    return { text: 'Fuerte', color: 'bg-emerald-500', width: '100%', textColor: 'text-emerald-600 dark:text-emerald-400' }
  }

  const security = getSecurityLevel()

  return (
    <div className="w-full min-h-screen tech-bg flex flex-col items-center justify-center m-0 p-4 md:p-8 font-sans text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* Header with Title and Dark Mode Toggle */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-8 px-2">
        <div className="flex-1 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white drop-shadow-sm">
            Laboratorio de Claves
          </h1>
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-2.5 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Cambiar tema"
        >
          {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
        </button>
      </div>

      {/* Main Card Mockup */}
      <div className="w-full max-w-2xl lab-card overflow-hidden shadow-2xl relative">
        
        {/* Top Controls Grid */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Left Column: Password Length Slider */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700 dark:text-slate-200 text-base">
                Longitud de Clave
              </span>
              <span className="bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 font-bold px-3 py-1 rounded-xl text-sm shadow-inner min-w-[42px] text-center">
                {length}
              </span>
            </div>

            <div className="relative pt-2">
              <input
                type="range"
                min="8"
                max="32"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-3 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium px-1">
                <span>8</span>
                <span>16</span>
                <span>32</span>
              </div>
            </div>
          </div>

          {/* Right Column: Character Switches */}
          <div className="flex flex-col gap-3.5 bg-slate-100/50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            
            {/* Letras */}
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
                Incluir Letras (Aa)
              </span>
              <input
                type="checkbox"
                checked={includeLetters}
                onChange={(e) => setIncludeLetters(e.target.checked)}
                className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
              />
            </label>

            {/* Números */}
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
                Incluir Números (0-9)
              </span>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
              />
            </label>

            {/* Símbolos */}
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
                Incluir Símbolos (@!)
              </span>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
              />
            </label>

          </div>
        </div>

        {/* Center Prominent Button */}
        <div className="flex justify-center -mb-6 relative z-10">
          <button
            onClick={generatePassword}
            className="btn-blue-3d text-white font-extrabold tracking-wider text-base py-3.5 px-8 rounded-2xl flex items-center gap-2.5 cursor-pointer uppercase shadow-xl"
          >
            <Settings className="w-5 h-5 animate-spin-slow" />
            <span>Generar Clave</span>
          </button>
        </div>

        {/* Bottom Metallic Panel */}
        <div className="metallic-panel pt-10 pb-8 px-6 md:px-8 mt-2 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Password Input Display */}
          <div className="inset-input flex-1 w-full flex items-center gap-3 px-4 py-3 rounded-xl">
            <Lock className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              readOnly
              value={password}
              className="bg-transparent border-none outline-none w-full font-mono text-lg font-bold tracking-wider text-slate-800 dark:text-slate-100 select-all"
              placeholder="Haz clic en Generar"
            />
          </div>

          {/* Copy Button */}
          <button
            onClick={copyToClipboard}
            className="btn-copy-metallic w-full md:w-auto px-5 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-300">¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Clave</span>
              </>
            )}
          </button>

        </div>
      </div>

      {/* Floating Security Level Meter Badge */}
      <div className="mt-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-3 shadow-xl flex items-center gap-4 min-w-[280px]">
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-slate-500 dark:text-slate-400">Nivel de Seguridad:</span>
            <span className={`font-bold ${security.textColor}`}>{security.text}</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${security.color}`}
              style={{ width: security.width }}
            />
          </div>
        </div>
      </div>

      {/* Animated Copied Toast Notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="fixed bottom-6 bg-emerald-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-2xl flex items-center gap-2 z-50"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            Clave copiada al portapapeles
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default App
