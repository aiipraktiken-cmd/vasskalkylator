import { useState } from 'react'
import { Sun, Snowflake, Sprout, Droplets, Info, Scale } from 'lucide-react'

type Season = 'summer' | 'winter'

export default function App() {
  const [hectares, setHectares] = useState<number | ''>(1)
  const [season, setSeason] = useState<Season>('summer')
  const [showInfo, setShowInfo] = useState(false)

  const isSummer = season === 'summer'
  const ha = hectares === '' ? 0 : hectares

  // Näring (kg)
  const nitrogen = ha * (isSummer ? 100 : 20)
  const phosphorus = ha * (isSummer ? 10 : 2)

  // Vikter (ton)
  const wetWeightMin = isSummer ? ha * 10 : ha * 5.5
  const wetWeightMax = isSummer ? ha * 20 : ha * 12

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    if (val === '') {
      setHectares('')
    } else {
      const num = parseFloat(val)
      if (!isNaN(num) && num >= 0) setHectares(num)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#2C312E] font-sans flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-xl w-full">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight mb-3">
            Vasskalkylatorn
          </h1>
          <p className="text-[#6B7268] font-light text-sm sm:text-base">
            Beräkna reduktion av kväve och fosfor vid vasskörd
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-6 sm:p-10 mb-6 transition-all duration-300">

          {/* Hektar Input */}
          <div className="mb-10">
            <label className="block text-sm font-medium text-[#6B7268] mb-3 uppercase tracking-wider">
              Skördad yta (Hektar)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="0.1"
                value={hectares}
                onChange={handleInput}
                className="w-full text-4xl sm:text-5xl font-light bg-transparent border-b-2 border-[#E5E5E0] focus:border-[#4A5D4E] outline-none py-2 transition-colors duration-300 placeholder-[#D1D1CB]"
                placeholder="0"
              />
              <span className="absolute right-0 bottom-4 text-xl text-[#8E948C] font-light">
                ha
              </span>
            </div>
          </div>

          {/* Season Selector */}
          <div className="mb-12">
            <label className="block text-sm font-medium text-[#6B7268] mb-3 uppercase tracking-wider">
              Skördesäsong
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSeason('summer')}
                className={`flex flex-col items-center justify-center py-6 px-4 rounded-2xl border transition-all duration-300 ${
                  isSummer
                    ? 'border-[#4A5D4E] bg-[#F0F4F1] text-[#4A5D4E] shadow-sm'
                    : 'border-[#E5E5E0] bg-white text-[#8E948C] hover:border-[#C4C4BE]'
                }`}
              >
                <Sun className="w-8 h-8 mb-2" strokeWidth={1.5} />
                <span className="font-medium">Sommar</span>
                <span className="text-xs mt-1 opacity-70">Juli – Sep</span>
              </button>

              <button
                onClick={() => setSeason('winter')}
                className={`flex flex-col items-center justify-center py-6 px-4 rounded-2xl border transition-all duration-300 ${
                  !isSummer
                    ? 'border-[#4A5D4E] bg-[#F0F4F1] text-[#4A5D4E] shadow-sm'
                    : 'border-[#E5E5E0] bg-white text-[#8E948C] hover:border-[#C4C4BE]'
                }`}
              >
                <Snowflake className="w-8 h-8 mb-2" strokeWidth={1.5} />
                <span className="font-medium">Vinter</span>
                <span className="text-xs mt-1 opacity-70">Okt – Mar</span>
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="bg-[#4A5D4E] rounded-[1.5rem] p-8 text-white relative overflow-hidden">
            <Sprout
              className="absolute -right-6 -bottom-6 w-48 h-48 text-white opacity-5"
              strokeWidth={1}
            />
            <h3 className="text-sm font-medium text-[#A9BBAE] mb-6 uppercase tracking-wider">
              Bortförd näring
            </h3>
            <div className="grid grid-cols-2 gap-8 relative z-10">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-light tracking-tight">
                    {nitrogen.toLocaleString('sv-SE')}
                  </span>
                  <span className="text-lg text-[#A9BBAE]">kg</span>
                </div>
                <p className="text-sm mt-2 font-medium">Kväve (N)</p>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-light tracking-tight">
                    {phosphorus.toLocaleString('sv-SE')}
                  </span>
                  <span className="text-lg text-[#A9BBAE]">kg</span>
                </div>
                <p className="text-sm mt-2 font-medium">Fosfor (P)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weights & Info */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            <div className="flex items-center gap-3 text-[#6B7268]">
              <Scale className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-wider">Estimerad skörd (våtvikt)</p>
                <p className="font-medium text-[#2C312E]">
                  {wetWeightMin.toLocaleString('sv-SE')} – {wetWeightMax.toLocaleString('sv-SE')} ton
                </p>
              </div>
            </div>
            <div className="h-px sm:h-8 w-full sm:w-px bg-[#E5E5E0] flex-shrink-0" />
            <div className="flex items-center gap-3 text-[#6B7268]">
              <Droplets className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-wider">Vattenhalt</p>
                <p className="font-medium text-[#2C312E]">{isSummer ? '~ 50%' : '~ 10–20%'}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowInfo(!showInfo)}
            className="flex items-center gap-2 text-sm text-[#8E948C] hover:text-[#4A5D4E] transition-colors mx-auto mt-6"
          >
            <Info className="w-4 h-4" />
            <span>Om beräkningarna</span>
          </button>

          {showInfo && (
            <div className="bg-[#EAECE9] p-5 rounded-2xl text-sm text-[#4A5D4E] leading-relaxed">
              <p className="mb-2">
                Beräkningarna baseras på mätningar och rapporter (bl.a. finska ELY-centralen och BalticReed).
                Generellt ger en hektar 5–10 ton torrvikt (TS) vass.
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  <strong>Sommar:</strong> 10 kg fosfor &amp; 100 kg kväve per hektar. Näringshalten når sin peak i mitten av augusti.
                </li>
                <li>
                  <strong>Vinter:</strong> 2 kg fosfor &amp; 20 kg kväve per hektar.
                </li>
              </ul>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
