import { useState, useEffect, useRef } from 'react'
import {
  Sun,
  Snowflake,
  Sprout,
  Droplets,
  Info,
  Scale,
  Copy,
  Check,
  Leaf,
  Zap,
  Wind,
  Car,
  Flame,
  House,
  Wheat,
  CalendarDays,
} from 'lucide-react'
import { trackVisit, trackCalculation } from './supabase'
import { type Lang, translations } from './i18n'

type Season = 'summer' | 'winter'
type Copied = 'naring' | 'naringsnytta' | 'energi' | 'all' | null

// Näring per hektar (kg/ha)
const SUMMER_P = 10
const SUMMER_N = 100
const WINTER_P = 2
const WINTER_N = 20

// Skörd (ton torrvikt/ha) — schablon
const TS_SCHABLON = 5

// Vattenhalt
const WATER_SUMMER = 0.5
const WATER_WINTER = 0.15 // medel av 10–20%

const LANG_LABEL: Record<Lang, string> = { sv: 'Svenska', en: 'English', fi: 'Suomi' }

// Minimal flat flag icons — clean fills, no gradients
function FlagSV() {
  return (
    <svg viewBox="0 0 20 13" width="20" height="13" aria-hidden="true">
      <rect width="20" height="13" fill="#006AA7" rx="1.5" />
      <rect x="6" y="0" width="2.5" height="13" fill="#FECC02" />
      <rect x="0" y="5.25" width="20" height="2.5" fill="#FECC02" />
    </svg>
  )
}

function FlagEN() {
  return (
    <svg viewBox="0 0 20 13" width="20" height="13" aria-hidden="true">
      <rect width="20" height="13" fill="#012169" rx="1.5" />
      <path d="M0,0 L20,13 M20,0 L0,13" stroke="white" strokeWidth="3" strokeLinecap="square" fill="none" />
      <path d="M0,0 L20,13 M20,0 L0,13" stroke="#C8102E" strokeWidth="1.4" strokeLinecap="square" fill="none" />
      <rect x="8" y="0" width="4" height="13" fill="white" />
      <rect x="0" y="5" width="20" height="3" fill="white" />
      <rect x="9" y="0" width="2" height="13" fill="#C8102E" />
      <rect x="0" y="5.5" width="20" height="2" fill="#C8102E" />
    </svg>
  )
}

function FlagFI() {
  return (
    <svg viewBox="0 0 20 13" width="20" height="13" aria-hidden="true">
      <rect width="20" height="13" fill="#F5F5F5" rx="1.5" />
      <rect x="5" y="0" width="2.5" height="13" fill="#003580" />
      <rect x="0" y="5.25" width="20" height="2.5" fill="#003580" />
    </svg>
  )
}

const FLAG_COMPONENT: Record<Lang, () => React.JSX.Element> = {
  sv: FlagSV,
  en: FlagEN,
  fi: FlagFI,
}

export default function App() {
  const [hectares, setHectares] = useState<number | ''>('')
  const [season, setSeason] = useState<Season>('summer')
  const [showInfo, setShowInfo] = useState(false)
  const [showNaringsInfo, setShowNaringsInfo] = useState(false)
  const [showEnergiInfo, setShowEnergiInfo] = useState(false)
  const [copied, setCopied] = useState<Copied>(null)
  const [lang, setLang] = useState<Lang>('sv')
  const calcTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const visitTracked = useRef(false)

  const t = translations[lang]
  const locale = lang === 'sv' ? 'sv-SE' : lang === 'en' ? 'en-GB' : 'fi-FI'

  useEffect(() => {
    if (visitTracked.current) return
    visitTracked.current = true
    trackVisit()
  }, [])

  function scheduleCalcTracking(ha: number) {
    if (ha === 0) return
    if (calcTimerRef.current) clearTimeout(calcTimerRef.current)
    calcTimerRef.current = setTimeout(() => {
      trackCalculation(ha)
    }, 1500)
  }

  function copy(text: string, which: Copied) {
    navigator.clipboard.writeText(text + '\n\nFrån strandkant till mätbar nytta. Vasseffekt.se')
    setCopied(which)
    setTimeout(() => setCopied(null), 1800)
  }

  const isSummer = season === 'summer'
  const ha = hectares === '' ? 0 : hectares

  // Näring (kg)
  const nitrogen = ha * (isSummer ? SUMMER_N : WINTER_N)
  const phosphorus = ha * (isSummer ? SUMMER_P : WINTER_P)

  // Vikter
  const waterContent = isSummer ? WATER_SUMMER : WATER_WINTER
  const dryWeight = ha * TS_SCHABLON
  const wetWeight = dryWeight / (1 - waterContent)

  // Energi & Klimat
  const energyMWh = dryWeight * 4.8
  const co2BoundTon = dryWeight * 1.83
  const housesEquiv = Math.round((energyMWh * 1000) / 5000)
  const evKm = Math.round((energyMWh * 1000) / 1.6) * 10

  const fmt = (n: number, opts?: Intl.NumberFormatOptions) => n.toLocaleString(locale, opts)
  const fmtDec = (n: number) => fmt(n, { maximumFractionDigits: 1 })

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
      {/* Reed background */}
      <img
        src="/raws-reeds.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-multiply grayscale opacity-30"
      />

      <div className="relative z-10 max-w-[712px] w-full">
        {/* Header */}
        <div className="mb-8 text-center flex flex-col items-center">
          <a href="https://raws.se" target="_blank" rel="noopener noreferrer">
            <img
              src="/raws-logo/raws-logo-green@2x.png"
              alt="Raws"
              className="h-10 mb-12 opacity-90 hover:opacity-100 transition-opacity duration-200"
            />
          </a>
          <h1 className="font-display text-[40px] sm:text-[64px] font-extrabold text-[#1A1A1A] leading-none tracking-tight">
            {t.title}
          </h1>
          <p className="font-heading text-[#808080] text-base mt-6 leading-relaxed">
            <strong className="text-[#1A1A1A]">{t.intro}</strong> {t.subtitle}
          </p>
        </div>

        {/* Language switcher — right-aligned, outside and above the card, over the season column */}
        <div className="flex items-center justify-end gap-2 mb-2 pr-1">
          {(['sv', 'en', 'fi'] as Lang[]).map((l) => {
            const Flag = FLAG_COMPONENT[l]
            return (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-label={LANG_LABEL[l]}
                title={LANG_LABEL[l]}
                className={`flex items-center justify-center p-1.5 rounded transition-all duration-200 cursor-pointer min-h-[44px] min-w-[44px]
                  ${lang === l ? 'opacity-100 ring-1 ring-[#29463430] ring-offset-1' : 'opacity-35 hover:opacity-70'}`}
              >
                <Flag />
              </button>
            )
          })}
        </div>

        {/* Main Card */}
        <div className="bg-white border border-[#80808020] rounded-md p-8 sm:p-10 mb-4">

          {/* Hektar + Season */}
          <div className="flex flex-col sm:flex-row gap-6 sm:items-start mb-10">
            {/* Hektar Input */}
            <div className="flex-1 min-w-0">
              <label
                htmlFor="hectares-input"
                className="flex items-center gap-1.5 text-xs font-heading font-medium text-[#808080] mb-4 uppercase tracking-widest"
              >
                <Wheat className="w-3.5 h-3.5" strokeWidth={1.5} />
                {t.inputLabel}
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
                {t.seasonLabel}
              </label>
              <div className="flex gap-2 justify-center sm:justify-start">
                <button
                  onClick={() => {
                    setSeason('summer')
                    scheduleCalcTracking(ha)
                  }}
                  className={`flex flex-col items-center justify-center py-2 px-4 rounded-md border transition-all duration-200 min-h-[56px] min-w-[72px] cursor-pointer ${
                    isSummer
                      ? 'border-[#294634] bg-[#294634] text-white'
                      : 'border-[#80808025] bg-white text-[#808080] hover:border-[#294634] hover:text-[#294634]'
                  }`}
                >
                  <Sun className="w-4 h-4 mb-1" strokeWidth={1.5} />
                  <span className="font-heading font-medium text-xs">{t.summer}</span>
                </button>
                <button
                  onClick={() => {
                    setSeason('winter')
                    scheduleCalcTracking(ha)
                  }}
                  className={`flex flex-col items-center justify-center py-2 px-4 rounded-md border transition-all duration-200 min-h-[56px] min-w-[72px] cursor-pointer ${
                    !isSummer
                      ? 'border-[#294634] bg-[#294634] text-white'
                      : 'border-[#80808025] bg-white text-[#808080] hover:border-[#294634] hover:text-[#294634]'
                  }`}
                >
                  <Snowflake className="w-4 h-4 mb-1" strokeWidth={1.5} />
                  <span className="font-heading font-medium text-xs">{t.winter}</span>
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
              {t.nutrientTitle}
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:gap-8 relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-5xl font-display font-light tracking-tight break-all">
                    {fmt(nitrogen)}
                  </span>
                  <span className="text-sm text-[#eddaa1] font-body">kg</span>
                </div>
                <p className="text-sm mt-2 font-heading font-medium">{t.nitrogen}</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-5xl font-display font-light tracking-tight break-all">
                    {fmt(phosphorus)}
                  </span>
                  <span className="text-sm text-[#eddaa1] font-body">kg</span>
                </div>
                <p className="text-sm mt-2 font-heading font-medium">{t.phosphorus}</p>
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
              <span>{t.aboutCalc}</span>
            </button>
            {showInfo && (
              <div className="mt-4 bg-[#F9F9F9] border border-[#80808015] rounded-md p-6 text-sm font-body text-[#1A1A1A] leading-relaxed space-y-4">
                <p>{t.calcInfo}</p>
                <div>
                  <p className="font-heading font-medium mb-3">{t.assumptions}</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse min-w-[300px]">
                      <thead>
                        <tr className="text-[#808080]">
                          <th className="text-left pb-2 font-heading font-medium">{t.tblParam}</th>
                          <th className="text-right pb-2 font-heading font-medium">{t.tblSummer}</th>
                          <th className="text-right pb-2 font-heading font-medium">{t.tblWinter}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#80808015]">
                        <tr>
                          <td className="py-2">{t.tblPhosphorus}</td>
                          <td className="text-right">10 kg/ha</td>
                          <td className="text-right">2 kg/ha</td>
                        </tr>
                        <tr>
                          <td className="py-2">{t.tblNitrogen}</td>
                          <td className="text-right">100 kg/ha</td>
                          <td className="text-right">20 kg/ha</td>
                        </tr>
                        <tr>
                          <td className="py-2">{t.tblDryWeight}</td>
                          <td className="text-right" colSpan={2}>
                            5 ton/ha
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2">{t.tblMoisture}</td>
                          <td className="text-right">50–80 %</td>
                          <td className="text-right">10–30 %</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="text-xs text-[#808080]">{t.calcFootnote(isSummer)}</p>
                {!isSummer && (
                  <p className="text-xs text-[#808080] border-l-2 border-[#80808030] pl-3">
                    <strong>{t.winterWarningBold}</strong> {t.winterWarning}
                  </p>
                )}
              </div>
            )}
          </div>
          <button
            onClick={() =>
              copy(
                t.copyNutrientText(fmt(nitrogen), fmt(phosphorus)),
                'naring',
              )
            }
            className="mt-2 flex items-center gap-1.5 text-xs text-[#808080] hover:text-[#294634] transition-colors cursor-pointer min-h-[44px]"
            aria-label={t.ariaкопирайNutrient}
          >
            {copied === 'naring' ? (
              <>
                <Check className="w-3.5 h-3.5" />
                {t.copied}
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                {t.copy}
              </>
            )}
          </button>
        </div>

        {/* Näringsnyttan */}
        <div className="bg-white border border-[#80808020] rounded-md p-8 mb-4">
          <div className="flex items-center gap-2.5 mb-6">
            <Leaf className="w-4 h-4 text-[#294634]" strokeWidth={1.5} />
            <h3 className="text-xs font-heading font-medium text-[#1A1A1A] uppercase tracking-widest">
              {t.nutrientBenefitTitle}
            </h3>
          </div>
          <div className="divide-y divide-[#80808012]">
            <div className="flex items-center justify-between py-3.5">
              <span className="text-sm font-body text-[#808080]">{t.pRemoved}</span>
              <span className="font-heading font-medium text-[#1A1A1A]">{fmt(phosphorus)} kg</span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <span className="text-sm font-body text-[#808080]">{t.nRemoved}</span>
              <span className="font-heading font-medium text-[#1A1A1A]">{fmt(nitrogen)} kg</span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <div className="flex items-center gap-2 text-[#808080]">
                <Scale className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-body">{t.dryWeight}</span>
              </div>
              <span className="font-heading font-medium text-[#1A1A1A]">{fmtDec(dryWeight)} ton</span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <div className="flex items-center gap-2 text-[#808080]">
                <Scale className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-body">{t.wetWeight}</span>
              </div>
              <span className="font-heading font-medium text-[#1A1A1A]">{fmtDec(wetWeight)} ton</span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <div className="flex items-center gap-2 text-[#808080]">
                <Droplets className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-body">{t.moisture}</span>
              </div>
              <span className="font-heading font-medium text-[#1A1A1A]">
                {isSummer ? '~ 50–80%' : '~ 10–30%'}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => setShowNaringsInfo(!showNaringsInfo)}
              className="flex items-center gap-2 text-sm font-body text-[#808080] hover:text-[#294634] transition-colors mx-auto min-h-[44px] cursor-pointer"
            >
              <Info className="w-4 h-4" />
              <span>{t.aboutNutrient}</span>
            </button>
            {showNaringsInfo && (
              <div className="mt-4 bg-[#F9F9F9] border border-[#80808015] rounded-md p-6 text-sm font-body text-[#1A1A1A] leading-relaxed">
                <p className="mb-3">{t.nutrientInfo1}</p>
                <p>{t.nutrientInfo2}</p>
              </div>
            )}
          </div>
          <button
            onClick={() =>
              copy(
                t.copyBenefitText(
                  fmt(phosphorus),
                  fmt(nitrogen),
                  fmtDec(dryWeight),
                  fmtDec(wetWeight),
                ),
                'naringsnytta',
              )
            }
            className="mt-2 flex items-center gap-1.5 text-xs text-[#808080] hover:text-[#294634] transition-colors cursor-pointer min-h-[44px]"
            aria-label={t.ariaCopyBenefit}
          >
            {copied === 'naringsnytta' ? (
              <>
                <Check className="w-3.5 h-3.5" />
                {t.copied}
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                {t.copy}
              </>
            )}
          </button>
        </div>

        {/* Energi & Klimat */}
        <div className="bg-white border border-[#80808020] rounded-md p-8 mb-12">
          <div className="flex items-center gap-2.5 mb-6">
            <Zap className="w-4 h-4 text-[#294634]" strokeWidth={1.5} />
            <h3 className="text-xs font-heading font-medium text-[#1A1A1A] uppercase tracking-widest">
              {t.energyTitle}
            </h3>
          </div>
          <div className="divide-y divide-[#80808012]">
            <div className="flex items-center justify-between py-3.5">
              <div className="flex items-center gap-2 text-[#808080]">
                <Flame className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-body">{t.energyPotential}</span>
              </div>
              <span className="font-heading font-medium text-[#1A1A1A]">{fmtDec(energyMWh)} MWh</span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <div className="flex items-center gap-2 text-[#808080]">
                <Wind className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-body">{t.co2Bound}</span>
              </div>
              <span className="font-heading font-medium text-[#1A1A1A]">{fmtDec(co2BoundTon)} ton</span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <div className="flex items-center gap-2 text-[#808080]">
                <House className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-body">{t.householdEquiv}</span>
              </div>
              <span className="font-heading font-medium text-[#1A1A1A]">
                {fmt(housesEquiv)} {t.villasPerYear}
              </span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <div className="flex items-center gap-2 text-[#808080]">
                <Car className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-body">{t.evRange}</span>
              </div>
              <span className="font-heading font-medium text-[#1A1A1A]">{fmt(evKm)} km</span>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={() => setShowEnergiInfo(!showEnergiInfo)}
              className="flex items-center gap-2 text-sm font-body text-[#808080] hover:text-[#294634] transition-colors mx-auto min-h-[44px] cursor-pointer"
            >
              <Info className="w-4 h-4" />
              <span>{t.aboutEnergy}</span>
            </button>
            <button
              onClick={() =>
                copy(
                  t.copyEnergyText(
                    fmtDec(energyMWh),
                    fmtDec(co2BoundTon),
                    fmt(housesEquiv),
                    fmt(evKm),
                  ),
                  'energi',
                )
              }
              className="flex items-center gap-1.5 text-xs text-[#808080] hover:text-[#294634] transition-colors cursor-pointer min-h-[44px]"
              aria-label={t.ariaCopyEnergy}
            >
              {copied === 'energi' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  {t.copied}
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  {t.copy}
                </>
              )}
            </button>
            {showEnergiInfo && (
              <div className="mt-4 bg-[#F9F9F9] border border-[#80808015] rounded-md p-6 text-sm font-body text-[#1A1A1A] leading-relaxed">
                <p>{t.energyInfo}</p>
              </div>
            )}
          </div>
        </div>

        {/* Copy all */}
        <div className="flex justify-center pb-2">
          <button
            onClick={() =>
              copy(
                t.copyAllText(
                  fmt(nitrogen), fmt(phosphorus),
                  fmt(phosphorus), fmt(nitrogen), fmtDec(dryWeight), fmtDec(wetWeight),
                  fmtDec(energyMWh), fmtDec(co2BoundTon), fmt(housesEquiv), fmt(evKm),
                ),
                'all',
              )
            }
            className="flex items-center gap-2 px-6 py-3 bg-[#294634] text-[#eddaa1] text-xs font-heading font-medium uppercase tracking-widest rounded-md hover:bg-[#1e3328] transition-colors cursor-pointer min-h-[44px]"
            aria-label={t.ariaCopyAll}
          >
            {copied === 'all' ? (
              <>
                <Check className="w-3.5 h-3.5" />
                {t.copied}
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                {t.copyAllLabel}
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center gap-3 pt-4 pb-2">
          <a href="https://raws.se" target="_blank" rel="noopener noreferrer">
            <img src="/raws-logo/raws-logo-green@2x.png" alt="Raws" className="h-8" />
          </a>
          <p className="text-xs font-body text-[#808080] tracking-wide">{t.tagline}</p>
        </div>
      </div>
    </div>
  )
}
