export interface Group {
  id: string;
  name: string;
  nameEn: string;
  contact: string;
  responsible: string;
  chat: string;
  flink: string;
  category: string;
  categoryEn: string;
  logo: string;
}

const translations: Record<string, string> = {
  "60PlusMinus": "60PlusMinus",
  "Balkonsolar": "Balcony Solar",
  "Basimilch (Mu)": "Basimilch (Mu)",
  "Bergsolawi": "Mountain CSA",
  "Betriebsgruppe Treffpunkt": "Meeting Point Ops",
  "Chile bi de Lüüt": "Church among the People",
  "Comedor": "Comedor",
  "Coworking": "Coworking",
  "Dachterrasse G13": "Roof Terrace G13",
  "E-Mobilität": "E-Mobility",
  "Foodsharing": "Foodsharing",
  "Frau*Hunziker": "Women*Hunziker",
  "Fundgrube": "Thrift Store",
  "Gemeinschaftsgärten": "Community Gardens",
  "Gesellschaftsspiele": "Board Games",
  "Hitzeminderung": "Heat Mitigation",
  "Hunziboulder": "Hunzi Boulder",
  "Hunzi-Dance": "Hunzi Dance",
  "Hunzikerfest": "Hunziker Festival",
  "Hunzikertrommel": "Hunziker Drums",
  "Iisziit": "Ice Time",
  "Kreativraum": "Creative Space",
  "Kultur": "Culture",
  "Kunst und Kultur im Wurzelwerk": "Art & Culture in Wurzelwerk",
  "Mann oh Mann": "Men's Group",
  "meh als gmües": "More than Vegetables",
  "Mehr als Russisch": "More than Russian",
  "Mehr als Werkstatt": "More than Workshop",
  "Modellbahn 9-99": "Model Railway 9-99",
  "Musik": "Music",
  "Nähen und Flicken": "Sewing & Mending",
  "Nahtour": "Nature Tour",
  "Ortsmuseum": "Local Museum",
  "Ping Pong": "Ping Pong",
  "Powerfrauen": "Power Women",
  "Raum der Stille & Mini-Gym": "Room of Silence & Mini-Gym",
  "ReuseReduceRecycling": "Reuse Reduce Recycling",
  "Sauna": "Sauna",
  "Sonntagscafè": "Sunday Cafe",
  "Speichär": "Storage",
  "Tanz auf dem Dach": "Dance on the Roof",
  "U9": "U9",
  "Vegan im Hunzi": "Vegan in Hunzi",
  "Volleyball": "Volleyball",
  "Vollmondbar": "Full Moon Bar",
  "Willkommen": "Welcome"
};

const categoryTranslations: Record<string, string> = {
  "Soziales": "Social",
  "Ökologie": "Ecology",
  "Infrastruktur": "Infrastructure",
  "Hobby": "Hobby",
  "Sport": "Sport",
  "Kultur": "Culture",
  "Andere": "Other"
};

const getLogoPath = (name: string) => {
  if (name === 'Basimilch (Mu)') return '/logos/Basimilch.png';
  if (name === 'Frau*Hunziker') return '/logos/FrauHunziker.jpeg';
  if (['Bergsolawi', 'Comedor', 'Coworking', 'Gesellschaftsspiele', 'Iisziit', 'meh als gmües', 'Modellbahn 9-99'].includes(name)) {
    return `/logos/${name}.png`;
  }
  return `/logos/${name}.jpeg`;
};

export const rawData = `Quartiergruppe,Ansprechperson QG,Verantwortlich AK,Webseite / Chat,Flink,Kategorie
60PlusMinus,Edeltraud Kühner,Michi,https://signal.group/#CjQKIOeIV3Rx1MZfFGg7JF1imq391sUIpo0VeKBCT28_3_KmEhBqKMGKoiL8eF76fsNh7izU,https://maw.flink.coop/group/10,Soziales
Balkonsolar,Robert Strietzel,Uschi,https://signal.group/#CjQKIE4DkJN79XUyhi9PK2Irhx86y30kMdsi9NC3p0g2ZKsQEhAMdquICcNEHAcqtXt9we1N,https://maw.flink.coop/group/99,Ökologie
Basimilch (Mu),Jens Schmidt,Cecilia,https://signal.group/#CjQKIAfgJEmolYh1owRG9lE0ry_zhON6zJ5d3WYqekmsZgRrEhBfEAS3P3sWmHKmItQ-hfZ0,https://maw.flink.coop/group/93,Ökologie
Bergsolawi,Andreas Geiger,Cecilia,https://signal.group/#CjQKIKnZtpe4KZaGzh-n4MEjKlV655llSKGGWoM5Tb8-VPAOEhC1FbpyzeSiadZLO3c83KA1,https://maw.flink.coop/group/100,Ökologie
Betriebsgruppe Treffpunkt,Albert Jörimann,Philipp,https://www.mehralswohnen.ch/genossenschaft/allmendkommission/,https://maw.flink.coop/group/8,Soziales
Chile bi de Lüüt,Marion Schmid,Andrea,https://signal.group/#CjQKIBI8twPPmnrRAEstm3pFOFXRjGyRnuF7mqpYmbr27vnSEhBC4DAY9lVQ9qtyq-VT-Wy3,https://maw.flink.coop/group/70,Soziales
Comedor,Lukas De ventura,Philipp,https://t.me/+I1PSSB6xF2z8Nuak,https://maw.flink.coop/group/95,Soziales
Coworking,Claudio Bacciagaluppi,Philipp,https://signal.group/#CjQKIGCSqfT70VnMbm1mBs63vNd6hAWXIHBQXiWfpGLqsVxYEhA6UTDIwH_Yd_62gOvWS1cf,https://maw.flink.coop/group/97,Infrastruktur
Dachterrasse G13,Rita Prevot,Michi,,https://maw.flink.coop/group/74,Infrastruktur
E-Mobilität,Werner Brühwiler,Michi,https://signal.group/#CjQKIMkhZajVrZtYFS8guF_CsnA2qgpQ5YnaieoMZM4m1kzbEhCwgcaz0StlGaCbtXKf829W,https://maw.flink.coop/group/83,Infrastruktur
Foodsharing,Felix Neff,Cecilia,https://signal.group/#CjQKIPqArG6SjFDC2V0q_UlTIZ8PlwJ3h_XsLFvdIJNh50MVEhC3i5cC1_ENldWniu4J_hJ9,https://maw.flink.coop/group/64,Ökologie
Frau*Hunziker,Rahel Sprecher,Cecilia,https://signal.group/#CjQKIM0n8fcdLQMPx8szSIeC0jC30aIBkK2hR3hcmRYip_TFEhAMNOAZiaoAf7kn1fctxOhz,https://maw.flink.coop/group/34,Soziales
Fundgrube,Edeltraud Kühner,Michi,https://signal.group/#CjQKIEzL8dHILsCFbiJyJC2JjHtNE_ivfs0J8_06kVohnTwWEhCQ5QTO8MLX_c3LEiohk2jl,https://maw.flink.coop/group/18,Ökologie
Gemeinschaftsgärten,Peggy Neubert,Philipp,https://signal.group/#CjQKIPvzSWOpGqMvnawFQyg6BXuwiitRHALH7qPmHOWQep0mEhCmN2-tpocl2W4egoCwMnHw,https://maw.flink.coop/group/9,Ökologie
Gesellschaftsspiele,Selina Meier,Andrea,https://signal.group/#CjQKIPDHcZJcJ5IskrnJhRgRp1utT5xYZm7xvvSKE1vf5uqjEhDlq9AdkNy9jSnwMzvVteH6,https://maw.flink.coop/group/5,Hobby
Hitzeminderung,Sandro Gähler,Uschi,https://signal.group/#CjQKIIJ47IZYpJ53Axr0PNqna1E3UTgI6dvsTIc4VpCrHsnwEhDE-GJ7tZ9vTB7hMY9ysffq,https://maw.flink.coop/group/31,Ökologie
Hunziboulder,Hanjoerg Temperli,Michi,https://signal.group/#CjQKIL4imvMk977vnu9EqnvFIs86OAcgstL7lBb8qitASp5EEhCICCNYUbgtiEsL8bpZURuy,https://maw.flink.coop/group/75,Sport
Hunzi-Dance,Lucia Salis,Uschi,https://signal.group/#CjQKIGvTBpiqDtDNGCVfj1HIFvgnQBQPzIxpTzUW36mLGQ0kEhAoJIOZKRS-sdAw9w28pZZU,https://maw.flink.coop/group/33,Sport
Hunzikerfest,Andrea Vögeli,Uschi,https://www.hunzikerfest.ch/,https://maw.flink.coop/group/7,Kultur
Hunzikertrommel,Eva Pletscher,Andrea,https://signal.group/#CjQKINSjG4c_Qpd5LGBBUhSUqGbkXy-zcGJMRePMQSgAep7ZEhDdD85n8mAYjxgX-LA7EpWL,https://maw.flink.coop/group/68,Kultur
Iisziit,Lea Hartmann,Andrea,https://signal.group/#CjQKIKOFKBAAtsm51bt2gpeRVGlcTW75uqLjUOvyQimuJ49fEhDF-8wd5lu144EVfS9Q2DpT,https://maw.flink.coop/group/87,Hobby
Kreativraum,Therese Mader,Uschi,,https://maw.flink.coop/group/66,Hobby
Kultur,Sandro Gähler,Uschi,https://signal.group/#CjQKIOAWHRw4qm8pHB1yBbAO_8J1SWKoeKFK9yHHk9Fhw5cLEhCPeaC_4Rw9iZiXM-stNWG3,https://maw.flink.coop/group/30,Kultur
Kunst und Kultur im Wurzelwerk,Marc Zürcher,Uschi,https://signal.group/#CjQKIMEQ94dWGtTzLxj4Nk3WpEyXcx5mcAw1CtlSXdoyyd2WEhDuGqS28qSqIjSuY6Vf9Rbl,https://maw.flink.coop/group/77,Kultur
Mann oh Mann,Kari Wüest,Philipp,,https://maw.flink.coop/group/112,Soziales
meh als gmües,Andreas Geiger,Cecilia,https://t.me/+V7khPQgPF2_Jgl1I,https://maw.flink.coop/group/1,Ökologie
Mehr als Russisch,Anna Dresvina,Andrea,https://signal.group/#CjQKIBsnZz5J_8QFTAMPAbLdCQiJWJz13RihD9I2tf11AtasEhDLzI1HRDE4kamFNKf4Pgqn,https://maw.flink.coop/group/82,Kultur
Mehr als Werkstatt,Felix Stephan,Michi,https://signal.group/#CjQKICJ4bQveGlu9J8-w6euux7cM08B448j7GefZSE4KM1CuEhBEXwNpGBxn5-sgrTtspH8T,https://maw.flink.coop/group/3,Hobby
Modellbahn 9-99,Werner Brühwiler,Michi,https://signal.group/#CjQKIDLxCFTWElK0YuM_qcw97pjX1Tf-UQcgYvAOHsYXKm96EhBf0zRrDgIhtuTL_AFzgAJ1,https://maw.flink.coop/group/84,Hobby
Musik,Susanna Cescato,Uschi,https://signal.group/#CjQKIEqhlcut4OAjk-LiENlyucy6efSo8RmhcGvD__yMvu7kEhCFr61-SXLF9iHgeB06z48n,https://maw.flink.coop/group/40,Kultur
Nähen und Flicken,Cemile Ivedi,Andrea,https://signal.group/#CjQKIFEvR_1fhllxCDrsQuMnHwuq19Ztu0BgbO9NideJFqLGEhD7hL-5PjW0TrxHZ5kVlmBb,https://maw.flink.coop/group/38,Hobby
Nahtour,Silvana Wölfle,Cecilia,,https://maw.flink.coop/group/61,Hobby
Ortsmuseum,Anastasia Katsidis,Uschi,https://www.ortsmuseum-hunzikerareal.ch/,https://maw.flink.coop/group/46,Kultur
Ping Pong,Anna Oetliker,Michi,https://signal.group/#CjQKIDQ_jIRutsNM2imiO3Nf7YnmteI4PH-2hAPKceIOBRrxEhCIMzveq8Y0nVNck-jggiq4,https://maw.flink.coop/group/65,Sport
Powerfrauen,Semhar Selomon,Andrea,,https://maw.flink.coop/group/76,Soziales
Raum der Stille & Mini-Gym,Lucia Salis,Uschi,https://signal.group/#CjQKIDVJd6I5GiPOWO1fPgP1b6Gcoep0s2VQoI60_UxA5HtpEhCkT2tF_PbX6ZZYq94gD7LC,https://maw.flink.coop/group/4,Sport
ReuseReduceRecycling,Andreas Geiger,Michi,https://signal.group/#CjQKIEMo8Oz2rLQloxuGWbg8eQLGPXMM3tU5N20PMtrPH_x-EhC3w6uRRkdH1pYlumdNXsQV,https://maw.flink.coop/group/17,Ökologie
Sauna,Rahel Erny,Uschi,https://signal.group/#CjQKIIM9-xliFjhVaZIaG09HSztxTqFgkyjtpogq7HeAki4lEhAZN6dwG03oWpKZsa-hX6BJ,https://maw.flink.coop/group/24,Sport
Sonntagscafè,Andreas Geiger,Cecilia,https://signal.group/#CjQKINCCFDs5ElZNCkavT1jp8Omc8siTQnPe__bF-T73Fp0jEhAr3cEw8icUfLf7ZD8ZFvJL,https://maw.flink.coop/group/41,Soziales
Speichär,Lukas De ventura,Philipp,https://signal.group/#CjQKIOVRRoVXqQAQDt63u2mRU_EhMQdnQipJnpD3YEOVZikWEhA7xVnN1UDXdKHidUw2S36b,https://maw.flink.coop/group/25,Infrastruktur
Tanz auf dem Dach,Reto Schmid,Michi,,https://maw.flink.coop/group/36,Sport
U9,Johanna Raimund,Uschi,https://signal.group/#CjQKIH-8RFIQEwr8unDexzD7FXBTRRpzcEF4lPs4Bmwk7ar3EhDMR6IvgHJFWKodArLuAx80,https://maw.flink.coop/group/67,Soziales
Vegan im Hunzi,Sonja Buchmann,Cecilia,https://signal.group/#CjQKIIbtJiZ5uHVGvzjUvfpIbrZjKsNCFW_6tRnBNJh29nm4EhARjp0sunmpGheoiYFz7ipq,https://maw.flink.coop/group/69,Ökologie
Volleyball,Martin Wenger,Philipp,https://signal.group/#CjQKIFMah48yIMCMF61jYaedoHEjnSZC8euLcXOwP9jG-hPWEhCHdrg_kKWtb9p4MFRCO8DR,https://maw.flink.coop/group/81,Sport
Vollmondbar,Eduard Fuchs,Michi,,https://maw.flink.coop/group/39,Soziales
Willkommen,Marianne Zehnder,Andrea,,https://maw.flink.coop/group/60,Soziales`;

export const parseData = (): Group[] => {
  const lines = rawData.split('\n').filter(line => line.trim() !== '');
  
  const groups: Group[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    
    const parts = line.split(',');
    const name = parts[0]?.trim();
    if (!name) continue;
    
    const responsibleRaw = parts[2]?.trim() || '';
    const responsible = responsibleRaw.split('http')[0].trim();
    
    let chat = parts[3]?.trim() || '';
    let flink = parts[4]?.trim() || '';
    
    const categoryDe = parts[5]?.trim() || 'Andere';
    
    groups.push({
      id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name,
      nameEn: translations[name] || name,
      contact: parts[1]?.trim() || '',
      responsible,
      chat,
      flink,
      category: categoryDe,
      categoryEn: categoryTranslations[categoryDe] || categoryDe,
      logo: getLogoPath(name)
    });
  }
  
  return groups;
};

export const groups = parseData();
export const categories = Array.from(new Set(groups.map(g => g.category)))
  .filter(Boolean)
  .map(cat => ({
    de: cat,
    en: categoryTranslations[cat] || cat
  }));
