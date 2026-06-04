import { useState, useEffect, useRef } from 'react'
import { Sun, Snowflake, Sprout, Droplets, Info, Scale, Copy, Check, Leaf, Zap, Wind, Car, Flame, House, Wheat, CalendarDays } from 'lucide-react'
import { fetchStats, trackVisit, trackCalculation, type Stats } from './supabase'

type Season = 'summer' | 'winter'
type Copied = 'naring' | 'naringsnytta' | 'energi' | null

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
  const [showEnergiInfo, setShowEnergiInfo] = useState(false)
  const [copied, setCopied] = useState<Copied>(null)
  const [stats, setStats] = useState<Stats | null>(null)
  const calcTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const visitTracked = useRef(false)

  useEffect(() => {
    if (visitTracked.current) return
    visitTracked.current = true
    trackVisit()
    fetchStats().then(setStats)
  }, [])

  function scheduleCalcTracking(ha: number) {
    if (ha === 0) return
    if (calcTimerRef.current) clearTimeout(calcTimerRef.current)
    calcTimerRef.current = setTimeout(async () => {
      await trackCalculation(ha)
      fetchStats().then(setStats)
    }, 1500)
  }

  function copy(text: string, which: Copied) {
    navigator.clipboard.writeText(text)
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
  const evKm = Math.round(energyMWh * 1000 / 1.6) * 10

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    if (val === '') {
      setHectares('')
    } else {
      const num = parseFloat(val)
      if (!isNaN(num) && num >= 0) {
        setHectares(num)
        scheduleCalcTracking(num)
      }
    }
  }

  return (
    <div className="relative min-h-dvh bg-[#F9F9F9] text-[#1A1A1A] font-body flex items-center justify-center p-6 sm:p-12">

      {/* Reed background illustration — RAWS brand asset, mix-blend-multiply removes white bg */}
      <img
        src="/raws-reeds.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-multiply grayscale opacity-30"
      />
      {false && <svg aria-hidden="true">
        {/* ~55 reeds, tight spacing ~22 units, wider w + higher c → overlapping like a reed bed */}
        {[
          { x: 15,   w: 6, h: 142, c: 8,   op: 0.08 },
          { x: 34,   w: 3, h: 188, c: -5,  op: 0.07 },
          { x: 52,   w: 7, h: 112, c: 6,   op: 0.09 },
          { x: 72,   w: 4, h: 198, c: -9,  op: 0.08 },
          { x: 90,   w: 5, h: 158, c: 7,   op: 0.07 },
          { x: 110,  w: 3, h: 95,  c: -6,  op: 0.06 },
          { x: 128,  w: 8, h: 175, c: 8,   op: 0.09 },
          { x: 150,  w: 4, h: 215, c: -7,  op: 0.08 },
          { x: 168,  w: 6, h: 128, c: 9,   op: 0.07 },
          { x: 188,  w: 3, h: 185, c: -5,  op: 0.08 },
          { x: 207,  w: 7, h: 102, c: 6,   op: 0.06 },
          { x: 228,  w: 5, h: 192, c: -8,  op: 0.09 },
          { x: 248,  w: 4, h: 148, c: 7,   op: 0.07 },
          { x: 265,  w: 8, h: 218, c: -9,  op: 0.08 },
          { x: 288,  w: 3, h: 118, c: 8,   op: 0.06 },
          { x: 308,  w: 6, h: 178, c: -6,  op: 0.09 },
          { x: 328,  w: 4, h: 138, c: 7,   op: 0.08 },
          { x: 348,  w: 7, h: 200, c: -8,  op: 0.07 },
          { x: 368,  w: 3, h: 155, c: 9,   op: 0.06 },
          { x: 386,  w: 5, h: 92,  c: -5,  op: 0.08 },
          { x: 408,  w: 8, h: 182, c: 6,   op: 0.09 },
          { x: 428,  w: 4, h: 125, c: -9,  op: 0.07 },
          { x: 448,  w: 6, h: 210, c: 8,   op: 0.08 },
          { x: 468,  w: 3, h: 162, c: -7,  op: 0.06 },
          { x: 488,  w: 7, h: 108, c: 9,   op: 0.09 },
          { x: 508,  w: 5, h: 195, c: -6,  op: 0.08 },
          { x: 528,  w: 4, h: 142, c: 7,   op: 0.07 },
          { x: 548,  w: 8, h: 175, c: -8,  op: 0.09 },
          { x: 568,  w: 3, h: 218, c: 6,   op: 0.06 },
          { x: 588,  w: 6, h: 132, c: -9,  op: 0.08 },
          { x: 608,  w: 4, h: 188, c: 8,   op: 0.07 },
          { x: 628,  w: 7, h: 98,  c: -5,  op: 0.09 },
          { x: 648,  w: 5, h: 165, c: 7,   op: 0.08 },
          { x: 668,  w: 3, h: 205, c: -8,  op: 0.06 },
          { x: 688,  w: 8, h: 148, c: 9,   op: 0.09 },
          { x: 708,  w: 4, h: 178, c: -6,  op: 0.07 },
          { x: 728,  w: 6, h: 115, c: 7,   op: 0.08 },
          { x: 748,  w: 3, h: 192, c: -9,  op: 0.06 },
          { x: 768,  w: 7, h: 158, c: 8,   op: 0.09 },
          { x: 788,  w: 5, h: 212, c: -5,  op: 0.08 },
          { x: 808,  w: 4, h: 128, c: 6,   op: 0.07 },
          { x: 828,  w: 8, h: 182, c: -8,  op: 0.09 },
          { x: 848,  w: 3, h: 95,  c: 9,   op: 0.06 },
          { x: 868,  w: 6, h: 172, c: -7,  op: 0.08 },
          { x: 888,  w: 4, h: 215, c: 6,   op: 0.07 },
          { x: 908,  w: 7, h: 138, c: -9,  op: 0.09 },
          { x: 928,  w: 5, h: 185, c: 8,   op: 0.08 },
          { x: 948,  w: 3, h: 108, c: -6,  op: 0.06 },
          { x: 968,  w: 8, h: 195, c: 7,   op: 0.09 },
          { x: 988,  w: 4, h: 152, c: -8,  op: 0.07 },
          { x: 1008, w: 6, h: 175, c: 9,   op: 0.08 },
          { x: 1028, w: 3, h: 222, c: -5,  op: 0.06 },
          { x: 1048, w: 7, h: 118, c: 6,   op: 0.09 },
          { x: 1068, w: 5, h: 188, c: -9,  op: 0.08 },
          { x: 1088, w: 4, h: 145, c: 8,   op: 0.07 },
          { x: 1108, w: 8, h: 205, c: -7,  op: 0.09 },
          { x: 1128, w: 3, h: 132, c: 9,   op: 0.06 },
          { x: 1148, w: 6, h: 178, c: -6,  op: 0.08 },
          { x: 1168, w: 4, h: 102, c: 7,   op: 0.07 },
          { x: 1188, w: 7, h: 192, c: -8,  op: 0.09 },
          { x: 1208, w: 5, h: 158, c: 9,   op: 0.08 },
          { x: 1228, w: 3, h: 215, c: -5,  op: 0.06 },
          { x: 1248, w: 8, h: 125, c: 6,   op: 0.09 },
          { x: 1268, w: 4, h: 182, c: -9,  op: 0.07 },
          { x: 1288, w: 6, h: 148, c: 8,   op: 0.08 },
          { x: 1308, w: 3, h: 198, c: -7,  op: 0.06 },
          { x: 1328, w: 7, h: 112, c: 9,   op: 0.09 },
          { x: 1348, w: 5, h: 172, c: -6,  op: 0.08 },
          { x: 1368, w: 4, h: 218, c: 7,   op: 0.07 },
          { x: 1388, w: 8, h: 138, c: -8,  op: 0.09 },
          { x: 1408, w: 3, h: 185, c: 9,   op: 0.06 },
          { x: 1425, w: 6, h: 155, c: -5,  op: 0.08 },
        ].map((r, i) => (
          <path
            key={i}
            d={`M${r.x - r.w / 2} 910 Q${r.x - r.w / 3 + r.c * 0.3} ${905 - r.h / 2} ${r.x + r.c} ${900 - r.h} Q${r.x + r.c + r.w / 3} ${905 - r.h / 2} ${r.x + r.w / 2} 910 Z`}
            fill="#294634"
            opacity={r.op}
          />
        ))}

        {/* Second layer — shorter, denser, slightly higher opacity for foreground depth */}
        {[
          { x: 22,   w: 8, h: 72,  c: -7,  op: 0.12 },
          { x: 44,   w: 5, h: 58,  c: 9,   op: 0.10 },
          { x: 62,   w: 9, h: 85,  c: -6,  op: 0.13 },
          { x: 85,   w: 4, h: 62,  c: 8,   op: 0.11 },
          { x: 105,  w: 7, h: 78,  c: -9,  op: 0.12 },
          { x: 135,  w: 5, h: 55,  c: 7,   op: 0.10 },
          { x: 160,  w: 9, h: 90,  c: -6,  op: 0.13 },
          { x: 195,  w: 4, h: 68,  c: 9,   op: 0.11 },
          { x: 220,  w: 8, h: 80,  c: -8,  op: 0.12 },
          { x: 258,  w: 5, h: 60,  c: 7,   op: 0.10 },
          { x: 295,  w: 7, h: 88,  c: -9,  op: 0.13 },
          { x: 332,  w: 4, h: 65,  c: 8,   op: 0.11 },
          { x: 370,  w: 9, h: 75,  c: -7,  op: 0.12 },
          { x: 418,  w: 5, h: 56,  c: 9,   op: 0.10 },
          { x: 458,  w: 8, h: 92,  c: -6,  op: 0.13 },
          { x: 498,  w: 4, h: 70,  c: 7,   op: 0.11 },
          { x: 538,  w: 7, h: 82,  c: -9,  op: 0.12 },
          { x: 578,  w: 5, h: 60,  c: 8,   op: 0.10 },
          { x: 618,  w: 9, h: 86,  c: -7,  op: 0.13 },
          { x: 658,  w: 4, h: 66,  c: 9,   op: 0.11 },
          { x: 698,  w: 8, h: 78,  c: -6,  op: 0.12 },
          { x: 738,  w: 5, h: 58,  c: 7,   op: 0.10 },
          { x: 778,  w: 7, h: 90,  c: -9,  op: 0.13 },
          { x: 818,  w: 4, h: 68,  c: 8,   op: 0.11 },
          { x: 858,  w: 9, h: 80,  c: -7,  op: 0.12 },
          { x: 898,  w: 5, h: 62,  c: 9,   op: 0.10 },
          { x: 938,  w: 8, h: 88,  c: -6,  op: 0.13 },
          { x: 978,  w: 4, h: 72,  c: 7,   op: 0.11 },
          { x: 1018, w: 7, h: 82,  c: -9,  op: 0.12 },
          { x: 1058, w: 5, h: 56,  c: 8,   op: 0.10 },
          { x: 1098, w: 9, h: 92,  c: -7,  op: 0.13 },
          { x: 1138, w: 4, h: 66,  c: 9,   op: 0.11 },
          { x: 1178, w: 8, h: 76,  c: -6,  op: 0.12 },
          { x: 1218, w: 5, h: 60,  c: 7,   op: 0.10 },
          { x: 1258, w: 7, h: 88,  c: -9,  op: 0.13 },
          { x: 1298, w: 4, h: 70,  c: 8,   op: 0.11 },
          { x: 1338, w: 9, h: 80,  c: -7,  op: 0.12 },
          { x: 1378, w: 5, h: 62,  c: 9,   op: 0.10 },
          { x: 1415, w: 8, h: 86,  c: -6,  op: 0.13 },
        ].map((r, i) => (
          <path
            key={`b${i}`}
            d={`M${r.x - r.w / 2} 910 Q${r.x - r.w / 3 + r.c * 0.3} ${905 - r.h / 2} ${r.x + r.c} ${900 - r.h} Q${r.x + r.c + r.w / 3} ${905 - r.h / 2} ${r.x + r.w / 2} 910 Z`}
            fill="#294634"
            opacity={r.op}
          />
        ))}
      </svg>}

      <div className="relative z-10 max-w-[712px] w-full">

        {/* Header */}
        <div className="mb-16 text-center flex flex-col items-center">
          <a href="https://raws.se" target="_blank" rel="noopener noreferrer">
            <img
              src="/raws-logo/raws-logo-green@2x.png"
              alt="Raws"
              className="h-10 mb-12 opacity-90 hover:opacity-100 transition-opacity duration-200"
            />
          </a>
          <h1 className="font-display text-[40px] sm:text-[64px] font-extrabold text-[#1A1A1A] leading-none tracking-tight">
            Vasskalkylatorn
          </h1>
          <p className="font-body text-[#808080] text-sm mt-6 leading-relaxed">
            Från hektar till näringsbortförsel, biomassa och energipotential. Framtidens råvara växer redan i våra vatten.
          </p>

        </div>

        {/* Main Card */}
        <div className="bg-white border border-[#80808020] rounded-md p-8 sm:p-10 mb-4">

          {/* Hektar + Season — stacked on mobile, row on sm+ */}
          <div className="flex flex-col sm:flex-row gap-6 sm:items-start mb-10">

            {/* Hektar Input */}
            <div className="flex-1 min-w-0">
              <label htmlFor="hectares-input" className="block text-xs font-heading font-medium text-[#808080] mb-4 uppercase tracking-widest">
                Skördad yta (Hektar)
              </label>
              <div className="relative border-b-2 border-[#80808025] focus-within:border-[#294634] transition-colors duration-200">
                <input
                  id="hectares-input"
                  type="number"
                  min="0"
                  step="0.1"
                  value={hectares}
                  onChange={handleInput}
                  className="w-full text-5xl font-display font-light bg-transparent outline-none py-3 text-[#1A1A1A] placeholder-[#80808040] pr-12"
                  placeholder="0"
                />
                <span className="absolute right-0 bottom-4 text-xl text-[#808080] font-light font-body">
                  ha
                </span>
              </div>
            </div>

            {/* Season Selector */}
            <div className="shrink-0">
              <label className="flex items-center gap-1.5 text-xs font-heading font-medium text-[#808080] mb-4 uppercase tracking-widest">
                <CalendarDays className="w-3.5 h-3.5" strokeWidth={1.5} />
                Säsong
              </label>
              <div className="flex gap-2 justify-center sm:justify-start">
                <button
                  onClick={() => { setSeason('summer'); scheduleCalcTracking(ha) }}
                  className={`flex flex-col items-center justify-center py-2 px-4 rounded-md border transition-all duration-200 min-h-[56px] min-w-[72px] cursor-pointer ${
                    isSummer
                      ? 'border-[#294634] bg-[#294634] text-white'
                      : 'border-[#80808025] bg-white text-[#808080] hover:border-[#294634] hover:text-[#294634]'
                  }`}
                >
                  <Sun className="w-4 h-4 mb-1" strokeWidth={1.5} />
                  <span className="font-heading font-medium text-xs">Sommar</span>
                </button>

                <button
                  onClick={() => { setSeason('winter'); scheduleCalcTracking(ha) }}
                  className={`flex flex-col items-center justify-center py-2 px-4 rounded-md border transition-all duration-200 min-h-[56px] min-w-[72px] cursor-pointer ${
                    !isSummer
                      ? 'border-[#294634] bg-[#294634] text-white'
                      : 'border-[#80808025] bg-white text-[#808080] hover:border-[#294634] hover:text-[#294634]'
                  }`}
                >
                  <Snowflake className="w-4 h-4 mb-1" strokeWidth={1.5} />
                  <span className="font-heading font-medium text-xs">Vinter</span>
                </button>
              </div>
            </div>

          </div>

          {/* Results */}
          <div className="bg-[#294634] rounded-md p-8 text-white relative overflow-hidden">
            <Sprout
              className="absolute -right-6 -bottom-6 w-44 h-44 text-white opacity-5"
              strokeWidth={1}
            />
            <h3 className="text-xs font-heading font-medium text-[#eddaa1] mb-8 uppercase tracking-widest flex items-center gap-2">
              <Wheat className="w-3.5 h-3.5" strokeWidth={1.5} />
              Bortförd näring
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:gap-8 relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-5xl font-display font-light tracking-tight break-all">
                    {nitrogen.toLocaleString('sv-SE')}
                  </span>
                  <span className="text-sm text-[#eddaa1] font-body">kg</span>
                </div>
                <p className="text-sm mt-2 font-heading font-medium">Kväve (N)</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-5xl font-display font-light tracking-tight break-all">
                    {phosphorus.toLocaleString('sv-SE')}
                  </span>
                  <span className="text-sm text-[#eddaa1] font-body">kg</span>
                </div>
                <p className="text-sm mt-2 font-heading font-medium">Fosfor (P)</p>
              </div>
            </div>
          </div>

          {/* Om beräkningarna */}
          <div className="mt-6">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="flex items-center gap-2 text-sm font-body text-[#808080] hover:text-[#294634] transition-colors mx-auto min-h-[44px] cursor-pointer"
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
                  <div className="overflow-x-auto"><table className="w-full text-xs border-collapse min-w-[300px]">
                    <thead>
                      <tr className="text-[#808080]">
                        <th className="text-left pb-2 font-heading font-medium">Parameter</th>
                        <th className="text-right pb-2 font-heading font-medium">Sommar</th>
                        <th className="text-right pb-2 font-heading font-medium">Vinter</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#80808015]">
                      <tr>
                        <td className="py-2">Fosfor (P, elementärt)</td>
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
                        <td className="text-right">50–80 %</td>
                        <td className="text-right">10–30 %</td>
                      </tr>
                    </tbody>
                  </table></div>
                </div>
                <p className="text-xs text-[#808080]">
                  Torrvikt beräknas med schablon 5 ton TS/ha. Våtvikt = Torrvikt ÷ (1 − Vattenhalt).
                  Vid {isSummer ? 'sommar' : 'vinter'} används {isSummer ? '50–80 % (markskörd ~50 %, vattenskörd upp till 80 %)' : '10–30 %'} som vattenhalt enligt BalticReeds logistikrapport.
                </p>
                {!isSummer && (
                  <p className="text-xs text-[#808080] border-l-2 border-[#80808030] pl-3">
                    <strong>OBS — estimerade schabloner:</strong> Näringsvärden för vinterskörden (N och P) baseras på växtfysiologiska antaganden — att vassen återför ca 80 % av näringen till rotsystemet inför vintern. Konkreta fältmätvärden saknas i befintliga underlag. Värdena bör betraktas som indikativa tills mätdata från exempelvis ELY-centralen finns på plats.
                  </p>
                )}
              </div>
            )}
          </div>
          <button
            onClick={() => copy(`Kväve (N): ${nitrogen.toLocaleString('sv-SE')} kg\nFosfor (P): ${phosphorus.toLocaleString('sv-SE')} kg`, 'naring')}
            className="mt-2 flex items-center gap-1.5 text-xs text-[#808080] hover:text-[#294634] transition-colors cursor-pointer min-h-[44px]"
            aria-label="Kopiera bortförd näring"
          >
            {copied === 'naring' ? <><Check className="w-3.5 h-3.5" />Kopierat</> : <><Copy className="w-3.5 h-3.5" />Kopiera</>}
          </button>
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
              <span className="font-heading font-medium text-[#1A1A1A]">{isSummer ? '~ 50–80%' : '~ 10–30%'}</span>
            </div>
          </div>

          {/* Om näringsnyttan */}
          <div className="mt-6">
            <button
              onClick={() => setShowNaringsInfo(!showNaringsInfo)}
              className="flex items-center gap-2 text-sm font-body text-[#808080] hover:text-[#294634] transition-colors mx-auto min-h-[44px] cursor-pointer"
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
          <button
            onClick={() => copy(`Fosfor bortförd: ${phosphorus.toLocaleString('sv-SE')} kg\nKväve bortförd: ${nitrogen.toLocaleString('sv-SE')} kg\nTorrvikt: ${dryWeight.toLocaleString('sv-SE', { maximumFractionDigits: 1 })} ton\nVåtvikt: ${wetWeight.toLocaleString('sv-SE', { maximumFractionDigits: 1 })} ton`, 'naringsnytta')}
            className="mt-2 flex items-center gap-1.5 text-xs text-[#808080] hover:text-[#294634] transition-colors cursor-pointer min-h-[44px]"
            aria-label="Kopiera näringsnyttan"
          >
            {copied === 'naringsnytta' ? <><Check className="w-3.5 h-3.5" />Kopierat</> : <><Copy className="w-3.5 h-3.5" />Kopiera</>}
          </button>
        </div>

        {/* Energi & Klimat */}
        <div className="bg-white border border-[#80808020] rounded-md p-8 mb-12">
          <div className="flex items-center gap-2.5 mb-6">
            <Zap className="w-4 h-4 text-[#294634]" strokeWidth={1.5} />
            <h3 className="text-xs font-heading font-medium text-[#808080] uppercase tracking-widest">Energi &amp; Klimat</h3>
          </div>
          <div className="divide-y divide-[#80808012]">
            <div className="flex items-center justify-between py-3.5">
              <div className="flex items-center gap-2 text-[#808080]">
                <Flame className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-body">Energipotential (4,8 MWh/ton TS)</span>
              </div>
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
              <div className="flex items-center gap-2 text-[#808080]">
                <House className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-body">Motsvarar hushållsel (exkl. uppvärmning) för</span>
              </div>
              <span className="font-heading font-medium text-[#1A1A1A]">{housesEquiv.toLocaleString('sv-SE')} villor/år</span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <div className="flex items-center gap-2 text-[#808080]">
                <Car className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-body">Räckvidd elbil (1,6 kWh/mil)</span>
              </div>
              <span className="font-heading font-medium text-[#1A1A1A]">
                {evKm.toLocaleString('sv-SE')} km
              </span>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={() => setShowEnergiInfo(!showEnergiInfo)}
              className="flex items-center gap-2 text-sm font-body text-[#808080] hover:text-[#294634] transition-colors mx-auto min-h-[44px] cursor-pointer"
            >
              <Info className="w-4 h-4" />
              <span>Om energi &amp; klimat</span>
            </button>
            <button
              onClick={() => copy(`Energipotential: ${energyMWh.toLocaleString('sv-SE', { maximumFractionDigits: 1 })} MWh\nBundet CO₂: ${co2BoundTon.toLocaleString('sv-SE', { maximumFractionDigits: 1 })} ton\nHushållsel: ${housesEquiv.toLocaleString('sv-SE')} villor/år\nElbilsräckvidd: ${evKm.toLocaleString('sv-SE')} km`, 'energi')}
              className="flex items-center gap-1.5 text-xs text-[#808080] hover:text-[#294634] transition-colors cursor-pointer min-h-[44px]"
              aria-label="Kopiera energi & klimat"
            >
              {copied === 'energi' ? <><Check className="w-3.5 h-3.5" />Kopierat</> : <><Copy className="w-3.5 h-3.5" />Kopiera</>}
            </button>
            {showEnergiInfo && (
              <div className="mt-4 bg-[#F9F9F9] border border-[#80808015] rounded-md p-6 text-sm font-body text-[#1A1A1A] leading-relaxed">
                <p>
                  Vass är ett snabbväxande biobränsle. Varje ton torr vass innehåller ca 4,8 MWh energi.
                  Vassen binder koldioxid under sin tillväxt — genom att använda vassen som energi eller
                  jordförbättring cirkulerar vi detta kol istället för att tillföra nytt fossilt kol till atmosfären.
                  Jämförelsen utgår från 5 000 kWh/år i hushållsel per villa (exklusive uppvärmning).
                  Elbilsräckvidden beräknas med genomsnittsförbrukning 1,6 kWh/mil för en mellanstor bil.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center gap-3 pb-8 pt-4">
          <a href="https://raws.se" target="_blank" rel="noopener noreferrer">
            <img src="/raws-logo/raws-logo-green@2x.png" alt="Raws" className="h-8" />
          </a>
          <p className="text-xs font-body text-[#808080] tracking-wide">Nature's materials for a world beyond plastic</p>
        </div>

      </div>
    </div>
  )
}
