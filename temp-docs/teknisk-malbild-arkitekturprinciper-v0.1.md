Teknisk målbild och arkitekturprinciper v0.1  
Bykänsla Arbetspaket 4

Digital lokal plattform

# Inledning

Detta avsnitt beskriver en inledande teknisk målbild för Bykänslas digitala plattform inom ramen för AP4. Syftet är att skapa en gemensam förståelse för vilka tekniska principer, vägval och förutsättningar som bör styra utvecklingen av plattformen under projektets gång och inför senare beslut om drift, förvaltning och vidareutveckling.

Den tekniska målbilden ska fungera som ett stöd för fortsatt arbete i AP4 och som ett underlag i dialogen mellan projektparter, utvecklingsresurser och framtida värdar eller förvaltare av plattformen.

Detta är inte en slutlig teknisk specifikation. Det är en version 0.1 som samlar inriktningar, principer och öppna frågor som behöver prövas och förfinas genom användartester, piloter och fortsatt analys. Det ligger också i linje med projektets övergripande upplägg, där AP4 ska omsätta insikter från AP2 och AP3 till en digital och fysisk lokal plattform samt bidra till en långsiktig plan för drift och utveckling.

# Utgångspunkter

Den tekniska målbilden utgår från några grundläggande projektmässiga principer:

- Plattformen ska stödja Bykänslas idé om en digital allmänning.
- Plattformen ska vara möjlig att använda i olika lokala sammanhang utan att behöva byggas om från grunden.
- Lösningen bör så långt som möjligt bygga på öppen källkod, öppna standarder och låg grad av leverantörslåsning.
- Plattformen ska vara möjlig att vidareutveckla, överlämna och förvalta även efter projektets slut.
- Teknisk robusthet, tillgänglighet och begriplighet ska väga tyngre än avancerad teknisk komplexitet.
- Lösningen ska stödja pilotering, lärande och stegvis utveckling snarare än att försöka lösa alla behov från start.

# Vad den tekniska målbilden ska möjliggöra

Den tekniska målbilden ska ge stöd för att plattformen kan:

- testas och användas i minst en stadsdel och en by under projektets pilotfas,
- vidareutvecklas stegvis utifrån lärdomar från AP2 och AP3,
- återanvändas eller anpassas i andra lokala sammanhang utan att kärnan behöver skrivas om,
- driftsättas och förvaltas även av annan part än det ursprungliga utvecklingsteamet,
- dokumenteras och lämnas över på ett sätt som möjliggör långsiktig användning och nationell uppskalning.

Målbilden ska därför inte bara beskriva hur plattformen byggs, utan också hur den hålls ihop, går att förvalta och kan leva vidare efter projekttidens slut.

# Övergripande arkitektur

Den inledande målbilden är att plattformen bör byggas som en modulär webbplattform med tydlig separation mellan användargränssnitt, intern affärslogik och externa datakällor.

En lämplig utgångspunkt är en arkitektur med tre huvudsakliga lager:

**Frontend**  
Frontend ansvarar för presentation, navigering och användarinteraktion. Den bör utformas så att olika moduler och innehållstyper kan presenteras på ett enhetligt och tillgängligt sätt.

**Backend-mellanlager**  
Ett internt backendlager bör vara den enda kontaktpunkten mellan frontend och externa datakällor. Detta lager ansvarar för säkerhet, normalisering av data, konfiguration, fallback-beteenden och versionshantering av interna API:er.

**Modulbaserade tjänster och integrationer**  
Varje extern källa eller funktion bör implementeras som en tydligt avgränsad modul eller adapter. Det kan exempelvis handla om lokal information, öppna data, kartfunktioner, väder, trafik, krisinformation eller andra externa tjänster.

Denna arkitekturriktning stödjer målet om en gemensam kärna med lokala variationer och ligger också nära hypotesen i ägandeskapsunderlaget om att samma grund bör kunna användas i flera sammanhang utan att allt får ändras fritt.

**Amöba**

Som ett kompletterande exempel finns även en testmiljö för API- och integrationsarbete: [Amöban - API-tester](https://bykansla-api-tester-vquqt.ondigitalocean.app/)

# Plattformens huvudlager

För en mer visuell beskrivning av hur plattformen kan förstås som system, med relationen mellan gemensam kärna, drift, lokalt värdskap och lokal användning, se även den kompletterande översikten ["Bykänsla - system och organisering"](https://itresurs.github.io/-gget-och-Byk-nslan/bykansla_index.html). Där beskrivs både systemets olika lager och hur dessa kan kombineras med olika modeller för drift och ansvar.

Den tekniska målbilden utgår från att plattformen består av följande huvudlager:

**Lager 1 - Gemensam kärna**

Den gemensamma kärnan omfattar kodbas, arkitektur, dokumentation, designprinciper, API-principer och gemensamma regler för hur plattformen byggs och vidareutvecklas. Detta är den del som bör vara så stabil, tydlig och återanvändbar som möjligt.

**Lager 2 - Drift**

Driftlagret omfattar servermiljö, hosting, säkerhet, övervakning, uppdateringar, backup och incidenthantering. Drift behöver behandlas som ett eget lager, skilt från både kodutveckling och lokal användning.

**Lager 3 - Lokalt värdskap**

Det lokala värdskapet omfattar administration, moderering, lokala rutiner, innehållsansvar och daglig hantering. Detta lager är avgörande för att plattformen ska fungera i praktiken och inte bara vara tekniskt korrekt.

**Lager 4 - Lokal användning**

Det yttersta lagret är den faktiska användningen i byn eller stadsdelen, där invånare, civilsamhälle, företag och offentliga aktörer möts. Plattformen behöver därför utformas så att den fungerar i verklig lokal användning, inte bara som teknisk struktur.

# Vägledande design- och arkitekturprinciper

## Modularitet och utbytbarhet

Plattformen bör byggas upp av fristående moduler som kan läggas till, bytas ut eller avaktiveras utan att övriga delar av systemet påverkas mer än nödvändigt. Detta gör det möjligt att testa funktioner i liten skala, att möta lokala behov och att minska teknisk låsning över tid.

## Gemensam kärna med kontrollerade lokala variationer

En gemensam teknisk kärna bör definieras för sådant som struktur, API-principer, designmönster, konfiguration, dokumentation och grundläggande datamodeller. Lokala variationer bör i första hand ske genom konfiguration, innehåll, aktiverade moduler och eventuella lokala integrationer.

Detta minskar risken för fragmentering och ligger väl i linje med tidigare hypotes om att öppet nog för återanvändning, men tillräckligt styrt för att hålla ihop, är mer realistiskt än helt fria lokala versioner.

## Decoupling mellan gränssnitt och externa datakällor

Frontend bör inte anropa externa API:er direkt. All extern datakommunikation bör gå via backend-mellanlagret. Detta minskar sårbarhet, förenklar säkerhetshantering och gör det lättare att ändra externa integrationer utan att påverka användargränssnittet.

## Konfigurerbarhet och feature toggles

Funktioner, moduler och lokala variationer bör kunna styras via konfiguration i stället för kodändringar där det är möjligt. Det gör pilotering enklare och minskar kostnaden för test, justering och avgränsning.

## Robusthet och begriplighet före teknisk komplexitet

Teknikval bör i första hand stödja förvaltningsbarhet, tydlighet och låg beroendekänslighet. Avancerade lösningar bör bara införas där de ger tydlig nytta för projektets mål.

## Öppenhet och överlämningsbarhet

Kärnplattformen bör så långt som möjligt kunna dokumenteras, delas och återanvändas öppet. Det gäller särskilt kodbas, installationsanvisningar, integrationsprinciper och övergripande arkitektur. Detta stärker möjligheten till uppskalning och minskar leverantörslåsning. Samtidigt bör det vara tydligt att öppen kod inte innebär otydligt ansvar för drift eller governance.

# Förvaltningsbarhet som tekniskt krav

Förvaltning behöver ses som en del av målbilden redan i designfasen, inte som något som läggs på i efterhand.

Plattformen bör därför utformas så att den är:

- enkel att sätta upp i ny miljö,
- tydligt dokumenterad på system-, API- och driftnivå,
- möjlig att övervaka och felsöka,
- möjlig att vidareutveckla modulvis,
- möjlig att lämna över till annan leverantör eller organisatorisk värd.

# Drift och miljöer

En viktig utgångspunkt är att drift inte är samma sak som ägarskap. Den tekniska målbilden bör därför stödja flera tänkbara driftsformer över tid: drift under projektet, pilotdrift efter projektet och eventuell framtida drift i andra kommuner eller lokala sammanhang.

För att möjliggöra detta bör plattformen utformas så att den kan deployas och förvaltas i olika typer av miljöer med reproducerbar konfiguration och tydlig teknisk dokumentation. En viktig princip är att lösningen inte ska vara beroende av en enskild leverantör för att kunna sättas upp, drivas eller vidareutvecklas.

Målbilden innebär därför i första hand att plattformen ska vara förberedd för drift och förvaltning, snarare än att alla driftrelaterade funktioner finns tillhandahålls av samma aktör.

Detta innebär att plattformen bör dokumenteras och struktureras på ett sätt som gör det möjligt för en annan part att ansvara för exempelvis:

- applikation, databas och mellanlager,
- loggning och övervakning,
- backup och återställning,
- uppdateringsrutiner och versionshantering,
- grundläggande incidenthantering.

Fokus ligger därmed främst på att skapa en teknisk grund som är tydlig, portabel och överlämningsbar, samt att ta fram det underlag som en aktör behöver för att ansvara för egen drift.

Driftmiljö definieras som ett eget lager med ansvar för server, molnleverantör, databaser, övervakning, backup, säkerhet och incidenthantering.

# Tillgänglighet, säkerhet och dataminimering

Tillgänglighet bör vara ett arkitekturkrav från början och inte enbart en senare kvalitetskontroll. Plattformens komponenter, innehållsstrukturer och användarflöden bör därför utformas så att de stödjer tillgänglig användning även när funktionalitet och innehåll varierar mellan platser och målgrupper.

Säkerhet bör hanteras proportionerligt men tydligt. Plattformen bör i grunden bygga på dataminimering och undvika onödig insamling av personuppgifter. Om vissa funktioner senare kräver inloggning, roller eller identitetshantering bör detta införas selektivt och först när nyttan är tydlig.

Från omvärldsbevakningen framgår det att konton, social interaktion och identitetshantering snabbt ökar både teknisk och juridisk komplexitet. Lärdomen därifrån är att tydligt syfte, återhållsamhet och låg processkomplexitet är viktigare än att tidigt bygga omfattande community- eller konto-funktioner.

FRÅGA TILL NÄSTA SKEDE: Form av kontofunktion bland annant för att hantering av personliga inställningar och statistik för att motivera plattformen/delfunktioner.

# Integrationsprinciper

Alla externa integrationer bör följa några gemensamma principer:

- varje integration ska gå via ett definierat mellanlager eller adapter,
- varje integration ska ha ett tydligt syfte och en dokumenterad datamodell,
- varje integration ska kunna övervakas och felsökas separat,
- varje integration ska ha definierat fallback-beteende,
- en extern integration ska kunna stängas av utan att hela plattformen blir obrukbar.

Detta är viktigt för att behålla en stabil kärna även om externa källor förändras, blir otillgängliga eller byts ut.

# Innehåll, roller och lokal användning

Den tekniska målbilden bör utgå från att plattformen inte bara är kod, utan också innehåll, publiceringsrutiner, lokal användning och ansvar i vardagen. Det är därför viktigt att skilja på tekniskt ansvar och innehållsansvar.

Plattformen bör på sikt kunna stödja:

- olika typer av innehåll,
- enkel publicering och avpublicering,
- grundläggande roller för redaktionellt ansvar,
- lokala anpassningar utan att kärnstrukturen bryts,
- lättviktig moderering där sådan behövs.

Samtidigt bör målbilden vara försiktig med att bygga för fri social interaktion från start. Omvärldsbevakningen visar att öppna community-funktioner snabbt skapar behov av moderering, konflikthantering, personuppgiftsansvar och missbruksskydd.

# Uppföljning, mätning och lärande

Eftersom AP4 bygger på pilotering och iterativ utveckling bör plattformen vara möjlig att följa upp både tekniskt och användningsmässigt.

Det bör därför finnas stöd för:

- loggning av fel och integrationstillstånd,
- health checks på system- eller modulnivå,
- uppföljning av vilka moduler eller funktioner som används,
- enkel analys av bortfall, tekniska problem och återkommande hinder,
- dokumentation av lärdomar som kan användas i vidareutveckling och uppskalning.

Målet är inte att bygga ett tungt analyslager från start, utan att säkerställa att piloterna går att utvärdera på ett sätt som stödjer faktiska beslut.

FRÅGA TILL NÄSTA SKEDE: Vilken statistik behöver vi kunna ta ut från systemet?

# Äggkartongsanalogin

Under framtagandet av teknisk målbild och arkitekturprinciper har vi tagit fram en äggkartongsanalogi för att hitta en pedagogisk modell för att förklara systemmodellstänk och teknik för breddad förståelse för vilka delar som behövs för att kedjan ska fungera. Klipp nedan samt länk till github:[Bykänsla - system och organisering](https://itresurs.github.io/-gget-och-Byk-nslan/bykansla_index.html)

<https://itresurs.github.io/-gget-och-Byk-nslan/bykansla_index.html>