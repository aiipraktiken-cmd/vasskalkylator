import { useState } from 'react'
import { Sun, Snowflake, Sprout, Droplets, Info, Scale, Copy, Check, Leaf } from 'lucide-react'

type Season = 'summer' | 'winter'
type Copied = 'nitrogen' | 'phosphorus' | null

// Näring per hektar (kg/ha)
const SUMMER_P = 10
const SUMMER_N = 100
const WINTER_P = 2
const WINTER_N = 20

// Skörd (ton torrvikt/ha)
const TS_MIN = 5
const TS_MAX = 10

// Vattenhalt
const WATER_SUMMER = 0.50
const WATER_WINTER = 0.15  // medel av 10–20%

export default function App() {
  const [hectares, setHectares] = useState<number | ''>(1)
  const [season, setSeason] = useState<Season>('summer')
  const [showInfo, setShowInfo] = useState(false)
  const [showNaringsInfo, setShowNaringsInfo] = useState(false)
  const [copied, setCopied] = useState<Copied>(null)

  function copy(value: number, which: Copied) {
    navigator.clipboard.writeText(String(value))
    setCopied(which)
    setTimeout(() => setCopied(null), 1800)
  }

  const isSummer = season === 'summer'
  const ha = hectares === '' ? 0 : hectares

  // Näring (kg)
  const nitrogen = ha * (isSummer ? SUMMER_N : WINTER_N)
  const phosphorus = ha * (isSummer ? SUMMER_P : WINTER_P)

  // Vikter: Torrvikt / (1 - Vattenhalt)
  const waterContent = isSummer ? WATER_SUMMER : WATER_WINTER
  const wetWeightMin = (ha * TS_MIN) / (1 - waterContent)
  const wetWeightMax = (ha * TS_MAX) / (1 - waterContent)

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
          <h1
            className="text-6xl sm:text-8xl font-black tracking-tight mb-3 leading-none"
            style={{ WebkitTextStroke: '2px #4A5D4E', color: 'transparent' }}
          >
            Vass
            <br />
            kalkylatorn
          </h1>
          <p className="text-[#6B7268] font-light text-sm sm:text-base mt-4">
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
                <button
                  onClick={() => copy(nitrogen, 'nitrogen')}
                  className="mt-3 flex items-center gap-1.5 text-xs text-[#A9BBAE] hover:text-white transition-colors duration-200 cursor-pointer"
                  aria-label="Kopiera kväve-värde"
                >
                  {copied === 'nitrogen'
                    ? <><Check className="w-3.5 h-3.5" />Kopierat</>
                    : <><Copy className="w-3.5 h-3.5" />Kopiera</>
                  }
                </button>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-light tracking-tight">
                    {phosphorus.toLocaleString('sv-SE')}
                  </span>
                  <span className="text-lg text-[#A9BBAE]">kg</span>
                </div>
                <p className="text-sm mt-2 font-medium">Fosfor (elementärt P)</p>
                <button
                  onClick={() => copy(phosphorus, 'phosphorus')}
                  className="mt-3 flex items-center gap-1.5 text-xs text-[#A9BBAE] hover:text-white transition-colors duration-200 cursor-pointer"
                  aria-label="Kopiera fosfor-värde"
                >
                  {copied === 'phosphorus'
                    ? <><Check className="w-3.5 h-3.5" />Kopierat</>
                    : <><Copy className="w-3.5 h-3.5" />Kopiera</>
                  }
                </button>
              </div>
            </div>
          </div>

          {/* Om beräkningarna */}
          <div className="mt-5">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="flex items-center gap-2 text-sm text-[#8E948C] hover:text-[#4A5D4E] transition-colors mx-auto"
            >
              <Info className="w-4 h-4" />
              <span>Om beräkningarna</span>
            </button>
            {showInfo && (
              <div className="mt-4 bg-[#EAECE9] p-5 rounded-2xl text-sm text-[#4A5D4E] leading-relaxed space-y-4">
                <p>
                  Beräkningarna baseras på mätningar och rapporter (bl.a. finska ELY-centralen och BalticReed).
                  Alla värden avser <strong>elementärt fosfor (P)</strong> och totalkväve (N) — inte fosfat eller nitrat.
                  N och P redovisas separat utan kombinerad viktning.
                </p>
                <div>
                  <p className="font-medium mb-2">Ingångsantaganden</p>
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="text-[#6B7268]">
                        <th className="text-left pb-1 font-medium">Parameter</th>
                        <th className="text-right pb-1 font-medium">Sommar</th>
                        <th className="text-right pb-1 font-medium">Vinter</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D8DDD7]">
                      <tr>
                        <td className="py-1.5">Fosfor (elementärt P)</td>
                        <td className="text-right">10 kg/ha</td>
                        <td className="text-right">2 kg/ha</td>
                      </tr>
                      <tr>
                        <td className="py-1.5">Kväve (total-N)</td>
                        <td className="text-right">100 kg/ha</td>
                        <td className="text-right">20 kg/ha</td>
                      </tr>
                      <tr>
                        <td className="py-1.5">Torrvikt (TS)</td>
                        <td className="text-right" colSpan={2}>5–10 ton/ha</td>
                      </tr>
                      <tr>
                        <td className="py-1.5">Vattenhalt</td>
                        <td className="text-right">~ 50 %</td>
                        <td className="text-right">~ 10–20 %</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-[#6B7268]">
                  Våtvikt beräknas som: Torrvikt ÷ (1 − Vattenhalt).
                  Vid {isSummer ? 'sommar' : 'vinter'} används {isSummer ? '50' : '15'} % vattenhalt som medelvärde.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Näringsnyttan */}
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.02)] p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <Leaf className="w-4 h-4 text-[#4A5D4E]" strokeWidth={1.5} />
            <h3 className="text-sm font-medium text-[#6B7268] uppercase tracking-wider">Näringsnyttan</h3>
          </div>
          <div className="divide-y divide-[#F0F0EC]">
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-[#6B7268]">Mängd fosfor bortförd (elementärt P)</span>
              <span className="font-medium text-[#2C312E]">{phosphorus.toLocaleString('sv-SE')} kg</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-[#6B7268]">Mängd kväve bortförd</span>
              <span className="font-medium text-[#2C312E]">{nitrogen.toLocaleString('sv-SE')} kg</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2 text-[#6B7268]">
                <Scale className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">Beräknad biomassa (våtvikt)</span>
              </div>
              <span className="font-medium text-[#2C312E]">
                {wetWeightMin.toLocaleString('sv-SE', { maximumFractionDigits: 1 })}–{wetWeightMax.toLocaleString('sv-SE', { maximumFractionDigits: 1 })} ton
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2 text-[#6B7268]">
                <Droplets className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">Vattenhalt</span>
              </div>
              <span className="font-medium text-[#2C312E]">{isSummer ? '~ 50%' : '~ 10–20%'}</span>
            </div>
          </div>

          {/* Om näringsnyttan */}
          <div className="mt-5">
            <button
              onClick={() => setShowNaringsInfo(!showNaringsInfo)}
              className="flex items-center gap-2 text-sm text-[#8E948C] hover:text-[#4A5D4E] transition-colors mx-auto"
            >
              <Info className="w-4 h-4" />
              <span>Om näringsnyttan</span>
            </button>
            {showNaringsInfo && (
              <div className="mt-4 bg-[#EAECE9] p-5 rounded-2xl text-sm text-[#4A5D4E] leading-relaxed">
                <p className="mb-2">
                  Näringsnyttan visar hur mycket fosfor och kväve som faktiskt lyfts ut ur vattenekosystemet
                  vid en vasskörd — och hur stor biomassa det motsvarar.
                </p>
                <p>
                  Våtvikten beräknas utifrån torrvikt (5–10 ton/ha) och vassens vattenhalt:
                  ca 50 % på sommaren och 10–20 % på vintern.
                  Formeln: <em>Torrvikt ÷ (1 − Vattenhalt)</em>.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
