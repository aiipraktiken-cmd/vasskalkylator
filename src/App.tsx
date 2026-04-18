import { useState } from 'react'
import { Sun, Snowflake, Sprout, Droplets, Info, Scale, Copy, Check, Leaf, Zap, Wind } from 'lucide-react'

type Season = 'summer' | 'winter'
type Copied = 'nitrogen' | 'phosphorus' | null

// Näring per hektar (kg/ha)
const SUMMER_P = 10
const SUMMER_N = 100
const WINTER_P = 2
const WINTER_N = 20

// Skörd (ton torrvikt/ha) — schablon
const TS_SCHABLON = 5

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
  const dryWeight = ha * TS_SCHABLON
  const wetWeight = dryWeight / (1 - waterContent)

  // Energi & Klimat
  const energyMWh = dryWeight * 4.8
  const co2BoundTon = dryWeight * 1.83
  const housesEquiv = Math.round(energyMWh * 1000 / 5000)

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
    <div className="min-h-screen bg-[#F9F9F9] text-[#1A1A1A] font-body flex items-center justify-center p-6 sm:p-12">
      <div className="max-w-xl w-full">

        {/* Header */}
        <div className="mb-16">
          <img
            src="/raws-logo/raws-logo-green@2x.png"
            alt="Raws"
            className="h-7 mb-12 opacity-90"
          />
          <h1 className="font-display text-[72px] sm:text-[96px] font-extrabold text-[#294634] leading-[0.9] tracking-tight">
            Vass<br />kalkyl.
          </h1>
          <p className="font-body text-[#808080] text-sm mt-6 leading-relaxed">
            Beräkna reduktion av kväve och fosfor vid vasskörd
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-[#80808020] rounded-md p-8 sm:p-10 mb-4">

          {/* Hektar Input */}
          <div className="mb-10">
            <label className="block text-xs font-heading font-medium text-[#808080] mb-4 uppercase tracking-widest">
              Skördad yta (Hektar)
            </label>
            <div className="relative border-b-2 border-[#80808025] focus-within:border-[#294634] transition-colors duration-200">
              <input
                type="number"
                min="0"
                step="0.1"
                value={hectares}
                onChange={handleInput}
                className="w-full text-5xl font-display font-light bg-transparent outline-none py-3 text-[#1A1A1A] placeholder-[#80808040]"
                placeholder="0"
              />
              <span className="absolute right-0 bottom-4 text-xl text-[#808080] font-light font-body">
                ha
              </span>
            </div>
          </div>

          {/* Season Selector */}
          <div className="mb-10">
            <label className="block text-xs font-heading font-medium text-[#808080] mb-4 uppercase tracking-widest">
              Skördesäsong
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSeason('summer')}
                className={`flex flex-col items-center justify-center py-5 px-4 rounded-md border transition-all duration-200 min-h-[88px] ${
                  isSummer
                    ? 'border-[#294634] bg-[#294634] text-white'
                    : 'border-[#80808025] bg-white text-[#808080] hover:border-[#294634] hover:text-[#294634]'
                }`}
              >
                <Sun className="w-6 h-6 mb-2" strokeWidth={1.5} />
                <span className="font-heading font-medium text-sm">Sommar</span>
                <span className="text-xs mt-0.5 opacity-60">Juli – Sep</span>
              </button>

              <button
                onClick={() => setSeason('winter')}
                className={`flex flex-col items-center justify-center py-5 px-4 rounded-md border transition-all duration-200 min-h-[88px] ${
                  !isSummer
                    ? 'border-[#294634] bg-[#294634] text-white'
                    : 'border-[#80808025] bg-white text-[#808080] hover:border-[#294634] hover:text-[#294634]'
                }`}
              >
                <Snowflake className="w-6 h-6 mb-2" strokeWidth={1.5} />
                <span className="font-heading font-medium text-sm">Vinter</span>
                <span className="text-xs mt-0.5 opacity-60">Okt – Mar</span>
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="bg-[#294634] rounded-md p-8 text-white relative overflow-hidden">
            <Sprout
              className="absolute -right-6 -bottom-6 w-44 h-44 text-white opacity-5"
              strokeWidth={1}
            />
            <h3 className="text-xs font-heading font-medium text-[#eddaa1] mb-8 uppercase tracking-widest">
              Bortförd näring
            </h3>
            <div className="grid grid-cols-2 gap-8 relative z-10">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-5xl font-display font-light tracking-tight">
                    {nitrogen.toLocaleString('sv-SE')}
                  </span>
                  <span className="text-base text-[#eddaa1] font-body">kg</span>
                </div>
                <p className="text-sm mt-2 font-heading font-medium">Kväve (N)</p>
                <button
                  onClick={() => copy(nitrogen, 'nitrogen')}
                  className="mt-3 flex items-center gap-1.5 text-xs text-[#eddaa1] hover:text-white transition-colors duration-200 cursor-pointer min-h-[44px]"
                  aria-label="Kopiera kväve-värde"
                >
                  {copied === 'nitrogen'
                    ? <><Check className="w-3.5 h-3.5" />Kopierat</>
                    : <><Copy className="w-3.5 h-3.5" />Kopiera</>
                  }
                </button>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-5xl font-display font-light tracking-tight">
                    {phosphorus.toLocaleString('sv-SE')}
                  </span>
                  <span className="text-base text-[#eddaa1] font-body">kg</span>
                </div>
                <p className="text-sm mt-2 font-heading font-medium">Fosfor (elementärt P)</p>
                <button
                  onClick={() => copy(phosphorus, 'phosphorus')}
                  className="mt-3 flex items-center gap-1.5 text-xs text-[#eddaa1] hover:text-white transition-colors duration-200 cursor-pointer min-h-[44px]"
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
          <div className="mt-6">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="flex items-center gap-2 text-sm font-body text-[#808080] hover:text-[#294634] transition-colors mx-auto min-h-[44px]"
            >
              <Info className="w-4 h-4" />
              <span>Om beräkningarna</span>
            </button>
            {showInfo && (
              <div className="mt-4 bg-[#F9F9F9] border border-[#80808015] rounded-md p-6 text-sm font-body text-[#1A1A1A] leading-relaxed space-y-4">
                <p>
                  Beräkningarna baseras på mätningar och rapporter (bl.a. finska ELY-centralen och BalticReed).
                  Alla värden avser <strong>elementärt fosfor (P)</strong> och totalkväve (N) — inte fosfat eller nitrat.
                  N och P redovisas separat utan kombinerad viktning.
                </p>
                <div>
                  <p className="font-heading font-medium mb-3">Ingångsantaganden</p>
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="text-[#808080]">
                        <th className="text-left pb-2 font-heading font-medium">Parameter</th>
                        <th className="text-right pb-2 font-heading font-medium">Sommar</th>
                        <th className="text-right pb-2 font-heading font-medium">Vinter</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#80808015]">
                      <tr>
                        <td className="py-2">Fosfor (elementärt P)</td>
                        <td className="text-right">10 kg/ha</td>
                        <td className="text-right">2 kg/ha</td>
                      </tr>
                      <tr>
                        <td className="py-2">Kväve (total-N)</td>
                        <td className="text-right">100 kg/ha</td>
                        <td className="text-right">20 kg/ha</td>
                      </tr>
                      <tr>
                        <td className="py-2">Torrvikt (TS, schablon)</td>
                        <td className="text-right" colSpan={2}>5 ton/ha</td>
                      </tr>
                      <tr>
                        <td className="py-2">Vattenhalt</td>
                        <td className="text-right">~ 50 %</td>
                        <td className="text-right">~ 10–20 %</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-[#808080]">
                  Torrvikt beräknas med schablon 5 ton TS/ha. Våtvikt = Torrvikt ÷ (1 − Vattenhalt).
                  Vid {isSummer ? 'sommar' : 'vinter'} används {isSummer ? '50' : '15'} % vattenhalt som medelvärde.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Näringsnyttan */}
        <div className="bg-white border border-[#80808020] rounded-md p-8 mb-4">
          <div className="flex items-center gap-2.5 mb-6">
            <Leaf className="w-4 h-4 text-[#294634]" strokeWidth={1.5} />
            <h3 className="text-xs font-heading font-medium text-[#808080] uppercase tracking-widest">Näringsnyttan</h3>
          </div>
          <div className="divide-y divide-[#80808012]">
            <div className="flex items-center justify-between py-3.5">
              <span className="text-sm font-body text-[#808080]">Mängd fosfor bortförd (elementärt P)</span>
              <span className="font-heading font-medium text-[#1A1A1A]">{phosphorus.toLocaleString('sv-SE')} kg</span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <span className="text-sm font-body text-[#808080]">Mängd kväve bortförd</span>
              <span className="font-heading font-medium text-[#1A1A1A]">{nitrogen.toLocaleString('sv-SE')} kg</span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <div className="flex items-center gap-2 text-[#808080]">
                <Scale className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-body">Torrvikt (TS)</span>
              </div>
              <span className="font-heading font-medium text-[#1A1A1A]">
                {dryWeight.toLocaleString('sv-SE', { maximumFractionDigits: 1 })} ton
              </span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <div className="flex items-center gap-2 text-[#808080]">
                <Scale className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-body">Beräknad biomassa (våtvikt)</span>
              </div>
              <span className="font-heading font-medium text-[#1A1A1A]">
                {wetWeight.toLocaleString('sv-SE', { maximumFractionDigits: 1 })} ton
              </span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <div className="flex items-center gap-2 text-[#808080]">
                <Droplets className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-body">Vattenhalt</span>
              </div>
              <span className="font-heading font-medium text-[#1A1A1A]">{isSummer ? '~ 50%' : '~ 10–20%'}</span>
            </div>
          </div>

          {/* Om näringsnyttan */}
          <div className="mt-6">
            <button
              onClick={() => setShowNaringsInfo(!showNaringsInfo)}
              className="flex items-center gap-2 text-sm font-body text-[#808080] hover:text-[#294634] transition-colors mx-auto min-h-[44px]"
            >
              <Info className="w-4 h-4" />
              <span>Om näringsnyttan</span>
            </button>
            {showNaringsInfo && (
              <div className="mt-4 bg-[#F9F9F9] border border-[#80808015] rounded-md p-6 text-sm font-body text-[#1A1A1A] leading-relaxed">
                <p className="mb-3">
                  Näringsnyttan visar hur mycket fosfor och kväve som faktiskt lyfts ut ur vattenekosystemet
                  vid en vasskörd — och hur stor biomassa det motsvarar.
                </p>
                <p>
                  Torrvikten beräknas med schablonvärdet <strong>5 ton TS/ha</strong>. Våtvikten räknas fram med formeln{' '}
                  <em>Torrvikt ÷ (1 − Vattenhalt)</em>: ca 50 % på sommaren och 15 % på vintern.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Energi & Klimat */}
        <div className="bg-white border border-[#80808020] rounded-md p-8 mb-12">
          <div className="flex items-center gap-2.5 mb-6">
            <Zap className="w-4 h-4 text-[#294634]" strokeWidth={1.5} />
            <h3 className="text-xs font-heading font-medium text-[#808080] uppercase tracking-widest">Energi &amp; Klimat</h3>
          </div>
          <div className="divide-y divide-[#80808012]">
            <div className="flex items-center justify-between py-3.5">
              <span className="text-sm font-body text-[#808080]">Energipotential (4,8 MWh/ton TS)</span>
              <span className="font-heading font-medium text-[#1A1A1A]">
                {energyMWh.toLocaleString('sv-SE', { maximumFractionDigits: 1 })} MWh
              </span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <div className="flex items-center gap-2 text-[#808080]">
                <Wind className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-body">Bundet biogent kol (CO₂)</span>
              </div>
              <span className="font-heading font-medium text-[#1A1A1A]">
                {co2BoundTon.toLocaleString('sv-SE', { maximumFractionDigits: 1 })} ton
              </span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <span className="text-sm font-body text-[#808080]">Motsvarar hushållsel för</span>
              <span className="font-heading font-medium text-[#1A1A1A]">{housesEquiv.toLocaleString('sv-SE')} villor/år</span>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-xs font-body text-[#808080] leading-relaxed">
              Vass är ett snabbväxande biobränsle. Varje ton torr vass innehåller ca 4,8 MWh energi.
              Vassen binder koldioxid under sin tillväxt — genom att använda vassen som energi eller
              jordförbättring cirkulerar vi detta kol istället för att tillföra nytt fossilt kol till atmosfären.
              Jämförelsen utgår från 5 000 kWh/år i hushållsel per villa.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center pb-6">
          <img
            src="/raws-logo/raws-logo-green@2x.png"
            alt="Raws"
            className="h-5 opacity-30"
          />
        </div>

      </div>
    </div>
  )
}
