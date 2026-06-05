export type Lang = 'sv' | 'en' | 'fi'

const sv = {
  title: 'Vasseffekt',
  intro: 'Från strandkant till mätbar nytta.',
  subtitle:
    'Vass absorberar fosfor och kväve under växtsäsongen. När biomassan skördas lämnar närsalterna vattensystemet permanent och råvaran kan förädlas till material, energi eller jordförbättring. Ange skördad yta och se vasseffekten i siffror.',
  inputLabel: 'Skördad yta (Hektar)',
  seasonLabel: 'Säsong',
  summer: 'Sommar',
  winter: 'Vinter',

  // Nutrient removal card
  nutrientTitle: 'Bortförd näring',
  nitrogen: 'Kväve (N)',
  phosphorus: 'Fosfor (P)',
  aboutCalc: 'Om beräkningarna',
  calcInfo:
    'Beräkningarna baseras på mätningar och rapporter (bl.a. finska ELY-centralen och BalticReed). Alla värden avser elementärt fosfor (P) och totalkväve (N) — inte fosfat eller nitrat. N och P redovisas separat utan kombinerad viktning.',
  assumptions: 'Ingångsantaganden',
  tblParam: 'Parameter',
  tblSummer: 'Sommar',
  tblWinter: 'Vinter',
  tblPhosphorus: 'Fosfor (P, elementärt)',
  tblNitrogen: 'Kväve (total-N)',
  tblDryWeight: 'Torrvikt (TS, schablon)',
  tblMoisture: 'Vattenhalt',
  calcFootnote: (isSummer: boolean) =>
    `Torrvikt beräknas med schablon 5 ton TS/ha. Våtvikt = Torrvikt ÷ (1 − Vattenhalt). Vid ${isSummer ? 'sommar' : 'vinter'} används ${isSummer ? '50–80 % (markskörd ~50 %, vattenskörd upp till 80 %)' : '10–30 %'} som vattenhalt enligt BalticReeds logistikrapport.`,
  winterWarningBold: 'OBS — estimerade schabloner:',
  winterWarning:
    'Näringsvärden för vinterskörden (N och P) baseras på växtfysiologiska antaganden — att vassen återför ca 80 % av näringen till rotsystemet inför vintern. Konkreta fältmätvärden saknas i befintliga underlag. Värdena bör betraktas som indikativa tills mätdata från exempelvis ELY-centralen finns på plats.',

  // Nutrient benefit card
  nutrientBenefitTitle: 'Näringsnyttan',
  pRemoved: 'Mängd fosfor bortförd (elementärt P)',
  nRemoved: 'Mängd kväve bortförd',
  dryWeight: 'Torrvikt (TS)',
  wetWeight: 'Beräknad biomassa (våtvikt)',
  moisture: 'Vattenhalt',
  aboutNutrient: 'Om näringsnyttan',
  nutrientInfo1:
    'Näringsnyttan visar hur mycket fosfor och kväve som faktiskt lyfts ut ur vattenekosystemet vid en vasskörd — och hur stor biomassa det motsvarar.',
  nutrientInfo2:
    'Torrvikten beräknas med schablonvärdet 5 ton TS/ha. Våtvikten räknas fram med formeln Torrvikt ÷ (1 − Vattenhalt): ca 50 % på sommaren och 15 % på vintern.',

  // Energy card
  energyTitle: 'Energi & Klimat',
  energyPotential: 'Energipotential (4,8 MWh/ton TS)',
  co2Bound: 'Bundet biogent kol (CO₂)',
  householdEquiv: 'Motsvarar hushållsel (exkl. uppvärmning) för',
  villasPerYear: 'villor/år',
  evRange: 'Räckvidd elbil (1,6 kWh/mil)',
  aboutEnergy: 'Om energi & klimat',
  energyInfo:
    'Vass är ett snabbväxande biobränsle. Varje ton torr vass innehåller ca 4,8 MWh energi. Vassen binder koldioxid under sin tillväxt — genom att använda vassen som energi eller jordförbättring cirkulerar vi detta kol istället för att tillföra nytt fossilt kol till atmosfären. Jämförelsen utgår från 5 000 kWh/år i hushållsel per villa (exklusive uppvärmning). Elbilsräckvidden beräknas med genomsnittsförbrukning 1,6 kWh/mil för en mellanstor bil.',

  // Copy
  copy: 'Kopiera',
  copied: 'Kopierat',
  ariaкопирайNutrient: 'Kopiera bortförd näring',
  ariaCopyBenefit: 'Kopiera näringsnyttan',
  ariaCopyEnergy: 'Kopiera energi & klimat',

  copyNutrientText: (n: string, p: string) => `Kväve (N): ${n} kg\nFosfor (P): ${p} kg`,
  copyBenefitText: (p: string, n: string, dry: string, wet: string) =>
    `Fosfor bortförd: ${p} kg\nKväve bortförd: ${n} kg\nTorrvikt: ${dry} ton\nVåtvikt: ${wet} ton`,
  copyEnergyText: (e: string, co2: string, h: string, ev: string) =>
    `Energipotential: ${e} MWh\nBundet CO₂: ${co2} ton\nHushållsel: ${h} villor/år\nElbilsräckvidd: ${ev} km`,
  copyAllText: (
    n: string, p: string,
    pB: string, nB: string, dry: string, wet: string,
    e: string, co2: string, h: string, ev: string,
  ) =>
    `🌿 Bortförd näring\nKväve (N): ${n} kg\nFosfor (P): ${p} kg\n\n🌱 Näringsnyttan\nFosfor bortförd: ${pB} kg\nKväve bortförd: ${nB} kg\nTorrvikt: ${dry} ton\nVåtvikt: ${wet} ton\n\n⚡ Energi & Klimat\nEnergi­potential: ${e} MWh\nBundet CO₂: ${co2} ton\nHushållsel: ${h} villor/år\nElbilsräckvidd: ${ev} km`,
  copyAllLabel: 'Kopiera alla effekter',
  ariaCopyAll: 'Kopiera alla beräknade effekter',

  // Footer
  tagline: "Nature's materials for a world beyond plastic",
}

const en: typeof sv = {
  title: 'Reed Effect',
  intro: 'From shoreline to measurable impact.',
  subtitle:
    'Reed absorbs phosphorus and nitrogen throughout the growing season. When the biomass is harvested, the nutrients leave the water system permanently — and the raw material can be refined into products, energy or soil amendment. Enter the harvested area and see the reed effect in numbers.',
  inputLabel: 'Harvested area (Hectares)',
  seasonLabel: 'Season',
  summer: 'Summer',
  winter: 'Winter',

  nutrientTitle: 'Removed nutrients',
  nitrogen: 'Nitrogen (N)',
  phosphorus: 'Phosphorus (P)',
  aboutCalc: 'About the calculations',
  calcInfo:
    'Calculations are based on measurements and reports (incl. the Finnish ELY Centre and BalticReed). All values refer to elemental phosphorus (P) and total nitrogen (N) — not phosphate or nitrate. N and P are reported separately without combined weighting.',
  assumptions: 'Input assumptions',
  tblParam: 'Parameter',
  tblSummer: 'Summer',
  tblWinter: 'Winter',
  tblPhosphorus: 'Phosphorus (P, elemental)',
  tblNitrogen: 'Nitrogen (total-N)',
  tblDryWeight: 'Dry weight (DM, standard)',
  tblMoisture: 'Moisture content',
  calcFootnote: (isSummer: boolean) =>
    `Dry weight calculated using standard 5 t DM/ha. Wet weight = Dry weight ÷ (1 − Moisture). For ${isSummer ? 'summer' : 'winter'}, ${isSummer ? '50–80% (land harvest ~50%, water harvest up to 80%)' : '10–30%'} moisture is used per the BalticReed logistics report.`,
  winterWarningBold: 'NOTE — estimated standards:',
  winterWarning:
    'Nutrient values for the winter harvest (N and P) are based on plant physiological assumptions — that the reed transfers approx. 80% of nutrients back to the root system before winter. No concrete field measurements exist in available sources. Values should be treated as indicative until measurement data from e.g. the ELY Centre is available.',

  nutrientBenefitTitle: 'Nutrient removal',
  pRemoved: 'Phosphorus removed (elemental P)',
  nRemoved: 'Nitrogen removed',
  dryWeight: 'Dry weight (DM)',
  wetWeight: 'Estimated biomass (wet weight)',
  moisture: 'Moisture content',
  aboutNutrient: 'About nutrient removal',
  nutrientInfo1:
    'Nutrient removal shows how much phosphorus and nitrogen is actually lifted out of the aquatic ecosystem during a reed harvest — and how much biomass this corresponds to.',
  nutrientInfo2:
    'Dry weight is calculated using the standard value of 5 t DM/ha. Wet weight is derived using the formula Dry weight ÷ (1 − Moisture): approx. 50% in summer and 15% in winter.',

  energyTitle: 'Energy & Climate',
  energyPotential: 'Energy potential (4.8 MWh/t DM)',
  co2Bound: 'Bound biogenic carbon (CO₂)',
  householdEquiv: 'Equivalent household electricity (excl. heating) for',
  villasPerYear: 'homes/year',
  evRange: 'EV range (1.6 kWh/10 km)',
  aboutEnergy: 'About energy & climate',
  energyInfo:
    'Reed is a fast-growing biofuel. Each tonne of dry reed contains approx. 4.8 MWh of energy. Reed binds carbon dioxide during its growth — by using reed as energy or soil amendment, we circulate this carbon instead of adding new fossil carbon to the atmosphere. The comparison is based on 5,000 kWh/year of household electricity per home (excluding heating). EV range is calculated using an average consumption of 1.6 kWh/10 km for a medium-sized car.',

  copy: 'Copy',
  copied: 'Copied',
  ariaкопирайNutrient: 'Copy removed nutrients',
  ariaCopyBenefit: 'Copy nutrient removal',
  ariaCopyEnergy: 'Copy energy & climate',

  copyNutrientText: (n: string, p: string) => `Nitrogen (N): ${n} kg\nPhosphorus (P): ${p} kg`,
  copyBenefitText: (p: string, n: string, dry: string, wet: string) =>
    `Phosphorus removed: ${p} kg\nNitrogen removed: ${n} kg\nDry weight: ${dry} t\nWet weight: ${wet} t`,
  copyEnergyText: (e: string, co2: string, h: string, ev: string) =>
    `Energy potential: ${e} MWh\nBound CO₂: ${co2} t\nHousehold electricity: ${h} homes/year\nEV range: ${ev} km`,
  copyAllText: (
    n: string, p: string,
    pB: string, nB: string, dry: string, wet: string,
    e: string, co2: string, h: string, ev: string,
  ) =>
    `🌿 Removed nutrients\nNitrogen (N): ${n} kg\nPhosphorus (P): ${p} kg\n\n🌱 Nutrient removal\nPhosphorus removed: ${pB} kg\nNitrogen removed: ${nB} kg\nDry weight: ${dry} t\nWet weight: ${wet} t\n\n⚡ Energy & Climate\nEnergy potential: ${e} MWh\nBound CO₂: ${co2} t\nHousehold electricity: ${h} homes/year\nEV range: ${ev} km`,
  copyAllLabel: 'Copy all effects',
  ariaCopyAll: 'Copy all calculated effects',

  tagline: "Nature's materials for a world beyond plastic",
}

const fi: typeof sv = {
  title: 'Ruokovaikutus',
  intro: 'Rantaviivalta mitattavaksi hyödyksi.',
  subtitle:
    'Ruoko sitoo fosforia ja typpeä koko kasvukauden ajan. Kun biomassa korjataan, ravinteet poistuvat vesistöstä pysyvästi — ja raaka-ainetta voidaan jalostaa materiaaleiksi, energiaksi tai maanparannusaineeksi. Syötä korjattu pinta-ala ja katso ruokovaikutus numeroina.',
  inputLabel: 'Korjattu pinta-ala (hehtaarit)',
  seasonLabel: 'Vuodenaika',
  summer: 'Kesä',
  winter: 'Talvi',

  nutrientTitle: 'Poistetut ravinteet',
  nitrogen: 'Typpi (N)',
  phosphorus: 'Fosfori (P)',
  aboutCalc: 'Laskelmien perusteet',
  calcInfo:
    'Laskelmat perustuvat mittauksiin ja raportteihin (mm. Suomen ELY-keskus ja BalticReed). Kaikki arvot koskevat alkuainefosforia (P) ja kokonaistyppeä (N) — ei fosfaattia tai nitraattia. N ja P ilmoitetaan erikseen ilman yhdistettyä painotusta.',
  assumptions: 'Lähtöoletukset',
  tblParam: 'Parametri',
  tblSummer: 'Kesä',
  tblWinter: 'Talvi',
  tblPhosphorus: 'Fosfori (P, alkuaine)',
  tblNitrogen: 'Typpi (kokonais-N)',
  tblDryWeight: 'Kuivapaino (TS, vakioarvo)',
  tblMoisture: 'Kosteuspitoisuus',
  calcFootnote: (isSummer: boolean) =>
    `Kuivapaino lasketaan vakioarvolla 5 t TS/ha. Märkäpaino = Kuivapaino ÷ (1 − Kosteuspitoisuus). ${isSummer ? 'Kesällä' : 'Talvella'} käytetään ${isSummer ? '50–80 % (maakorjuu ~50 %, vesikorjuu jopa 80 %)' : '10–30 %'} kosteuspitoisuutta BalticReed-logistiikkaraportin mukaan.`,
  winterWarningBold: 'HUOM — arvioidut vakioarvot:',
  winterWarning:
    'Talvisadon (N ja P) ravinnearvot perustuvat kasvifysiologisiin oletuksiin — että ruoko palauttaa noin 80 % ravinteistaan juuristoon ennen talvea. Konkreettisia kenttämittauksia ei ole saatavilla olevissa aineistoissa. Arvoja tulee pitää suuntaa-antavina, kunnes mittausdata on saatavilla esimerkiksi ELY-keskukselta.',

  nutrientBenefitTitle: 'Ravinnepoistuma',
  pRemoved: 'Poistettu fosfori (alkuaine-P)',
  nRemoved: 'Poistettu typpi',
  dryWeight: 'Kuivapaino (TS)',
  wetWeight: 'Arvioitu biomassa (märkäpaino)',
  moisture: 'Kosteuspitoisuus',
  aboutNutrient: 'Ravinnepoistumasta',
  nutrientInfo1:
    'Ravinnepoistuma osoittaa, kuinka paljon fosforia ja typpeä nostetaan vesiekosysteemistä ruokosadon yhteydessä — ja kuinka suuri biomassa tätä vastaa.',
  nutrientInfo2:
    'Kuivapaino lasketaan vakioarvolla 5 t TS/ha. Märkäpaino johdetaan kaavalla Kuivapaino ÷ (1 − Kosteuspitoisuus): noin 50 % kesällä ja 15 % talvella.',

  energyTitle: 'Energia & Ilmasto',
  energyPotential: 'Energiapotentiaali (4,8 MWh/t TS)',
  co2Bound: 'Sidottu biogeeninen hiili (CO₂)',
  householdEquiv: 'Vastaa kotitalouden sähköä (pl. lämmitys)',
  villasPerYear: 'taloa/vuosi',
  evRange: 'Sähköauton kantama (1,6 kWh/10 km)',
  aboutEnergy: 'Energiasta ja ilmastosta',
  energyInfo:
    'Ruoko on nopeakasvuinen biopolttoaine. Yksi tonni kuivaa ruokoa sisältää noin 4,8 MWh energiaa. Ruoko sitoo hiilidioksidia kasvaessaan — käyttämällä ruokoa energiana tai maanparannusaineena kierrätämme tätä hiiltä sen sijaan, että lisäisimme uutta fossiilista hiiltä ilmakehään. Vertailu perustuu 5 000 kWh/vuosi kotitalouden sähkönkulutukseen taloa kohden (pl. lämmitys). Sähköauton kantama on laskettu keskimääräisellä kulutuksella 1,6 kWh/10 km keskikokoiselle autolle.',

  copy: 'Kopioi',
  copied: 'Kopioitu',
  ariaкопирайNutrient: 'Kopioi poistetut ravinteet',
  ariaCopyBenefit: 'Kopioi ravinnepoistuma',
  ariaCopyEnergy: 'Kopioi energia & ilmasto',

  copyNutrientText: (n: string, p: string) => `Typpi (N): ${n} kg\nFosfori (P): ${p} kg`,
  copyBenefitText: (p: string, n: string, dry: string, wet: string) =>
    `Fosfori poistettu: ${p} kg\nTyppi poistettu: ${n} kg\nKuivapaino: ${dry} t\nMärkäpaino: ${wet} t`,
  copyEnergyText: (e: string, co2: string, h: string, ev: string) =>
    `Energiapotentiaali: ${e} MWh\nSidottu CO₂: ${co2} t\nKotitalouden sähkö: ${h} taloa/vuosi\nSähköauton kantama: ${ev} km`,
  copyAllText: (
    n: string, p: string,
    pB: string, nB: string, dry: string, wet: string,
    e: string, co2: string, h: string, ev: string,
  ) =>
    `🌿 Poistetut ravinteet\nTyppi (N): ${n} kg\nFosfori (P): ${p} kg\n\n🌱 Ravinnepoistuma\nFosfori poistettu: ${pB} kg\nTyppi poistettu: ${nB} kg\nKuivapaino: ${dry} t\nMärkäpaino: ${wet} t\n\n⚡ Energia & Ilmasto\nEnergiapotentiaali: ${e} MWh\nSidottu CO₂: ${co2} t\nKotitalouden sähkö: ${h} taloa/vuosi\nSähköauton kantama: ${ev} km`,
  copyAllLabel: 'Kopioi kaikki vaikutukset',
  ariaCopyAll: 'Kopioi kaikki lasketut vaikutukset',

  tagline: "Nature's materials for a world beyond plastic",
}

export const translations: Record<Lang, typeof sv> = { sv, en, fi }
