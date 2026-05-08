Ägandeskap & förvaltning v 0.2

Digital lokal plattform

I FAS 1 arbetar vi i följande leveranser

- Omvärldsbevakning
- **Ägandeskap & förvaltning**

**2026-03-31 genomgång inför ställningstagande 2 april, då vi väljer ett av alternativen för varje del att utgå ifrån i vårt prototypbygge i FAS 2.**

- Teknisk målbild & arkitekturprinciper
- API test för öppen data
- Frontend-miljö för att testa mot målgrupp i samskapande möten.

# Syfte med dokumentet

Syftet med detta dokument är att formulera tidiga hypoteser och öppna frågor kring ägarskap, drift, ansvarsfördelning och organisatorisk hemvist för Bykänslas digitala plattform. Dokumentet ska fungera som ett första ramverk för fortsatt analys och beslut i senare faser av projektet.

Detta är **inte ett beslutsdokument**, utan

- version 0.1 samlar möjliga inriktningar, vägval och frågor som behöver följas upp i AP3 och AP4.
- Version 0.2 visar projektets val av inriktningar vid dags datum, för test och vidare uppföljning.

# Utgångspunkter

Arbetet med ägarskap och förvaltning utgår från följande projektmässiga principer:

- Plattformen ska stödja Bykänslas idé om en **digital allmänning**.
- Plattformen bör vara **öppen, långsiktig och möjlig att vidareutveckla** över tid.
- Lösningen bör så långt som möjligt bygga på **öppen källkod, öppna standarder och samverkan**.
- Plattformen ska inte vara onödigt beroende av en enskild leverantör eller en sluten teknisk miljö.
- Samtidigt krävs en **tydlig organisatorisk värd** för sådant som drift, moderering, förvaltning och vidareutveckling.

Ägarskap behöver därför delas upp i flera dimensioner: **juridiskt, tekniskt, operativt och innehållsmässigt ägarskap**.

# Avgränsningar

Denna version fokuserar på att identifiera:

- tänkbara modeller för ägarskap och förvaltning
- preliminära hypoteser
- centrala vägval
- öppna frågor som behöver besvaras senare

Version 0.1 tar inte slutlig ställning till:

- juridisk organisationsform
- slutlig driftsmodell
- upphandlingsmodell efter projekttid
- exakt ansvarsfördelning mellan parter efter projektets slut

# Vad menar vi med plattform?

En viktig tidig iakttagelse är att ordet **plattform** behöver delas upp, eftersom olika delar kan ha olika ägare och olika förvaltningslogik.

## 4.1 Plattformens olika lager

Vi ser i nuläget minst fyra lager:

### Domän och varumärkesbärare

Exempel: namn, webbadress, grafisk identitet, offentlig ingång.

Fundering: Namn: (ex Bykänsla/ Veberöd jämför (Dcidim/Barcelona

### Mjukvara / kodbas

Exempel: frontend, backend, API:er, integrationslager, adminfunktioner och dokumentation.

### Driftmiljö / hosting

Exempel: server, molnleverantör, databaser, övervakning, backup, säkerhet och incidenthantering.

### Innehåll och lokal användning

Exempel: information, lokala initiativ, moderering, publiceringsrutiner, lokala anpassningar och ansvar för daglig användning.

# Inledande hypoteser om ägarskap

## Hypotes 1: Plattformen bör inte ägas ensidigt av en part
Eftersom projektet uttryckligen beskriver den digitala plattformen som en digital allmänning som varken ska ägas av offentlig sektor eller det privata fullt ut, är en rimlig hypotes att **ingen enskild part bör ha full kontroll över helheten**. Det betyder dock inte att plattformen kan vara "ägd av alla" utan struktur. Det behövs sannolikt en modell där:

- vissa delar är gemensamma
- vissa delar har tydliga ansvariga
- vissa delar kan vara lokalt anpassade

## Hypotes 2: Kodbasen bör kunna vara öppen och återanvändbar

En stark inriktning i materialet är att plattformen ska bygga på öppen källkod och öppna standarder. Därför är en rimlig hypotes att:

- kärnplattformen publiceras i öppet repo
- dokumentation för installation, vidareutveckling och integration delas öppet
- externa aktörer i teorin ska kunna återanvända lösningen i andra kommuner eller lokala sammanhang

Detta stärker skalbarhet och minskar leverantörslåsning, vilket också ligger nära AP4:s ansvar kring tekniska val och långsiktig hållbarhet. För We Know IT:s del är detta en viktig avgränsning: vi kan ta ansvar för att designa en **modulär och förvaltningsbar teknisk grund**, men inte för att långsiktigt bära hela ekosystemet om inte det beslutas och finansieras separat.

## Hypotes 3: Drift kräver en tydlig organisatorisk värd

Även om kodbasen är öppen kan inte drift vara helt diffus. Någon behöver ansvara för:

- hosting
- säkerhetsuppdateringar
- övervakning
- backup
- incidenthantering
- versionshantering i produktion

Den inledande hypotesen är därför att **drift måste ha en namngiven ansvarsbärare**, även om plattformen i idé och struktur är gemensam.

## Hypotes 4: Innehållsansvar och tekniskt ansvar bör skiljas åt

Det verkar klokt att skilja på:

- ansvar för den tekniska plattformen
- ansvar för innehåll, moderering och lokal användning
- ansvar för utvecklingsprioriteringar över tid

Det minskar risken att teknisk förvaltning, communityfrågor och lokal verksamhetsutveckling blandas ihop.

## Hypotes 5: En gemensam kärna med lokala variationer är mer realistisk än helt fria lokala versioner

Anteckningarna pekar mot en modell där "grunden är samma", men där byar eller stadsdelar kan ha olika tekniska lösningar eller lokala anpassningar.

En rimlig hypotes är därför:

- en **gemensam kärna** bör definieras. För att detta ska fungera med öppen källkod behövs tydliga riktlinjer definieras för hur koden får användas
- lokala installationer eller konfigurationer kan variera
- inte allt ska få ändras fritt, annars riskeras fragmentering, hög förvaltningskostnad och tappad kompatibilitet

Med andra ord: öppet nog för återanvändning, men tillräckligt styrt för att hålla ihop.

Kommunens kommentar: Håller med om samtliga hypoteser.

# Möjliga ägarskapsmodeller att utforska vidare

## Modell A - Kommunen som organisatorisk värd

Lunds kommun tar en formell roll som värd för drift eller förvaltningsstruktur, samtidigt som kod och ramverk hålls öppna.

**Styrkor**

- tydlig ansvarsbärare
- hög legitimitet i offentlig kontext
- lättare att säkra stabil drift och kontinuitet

### Utmaningar

- kan krocka med ambitionen att plattformen inte ska upplevas som kommunägd
- risk för att civilsamhälle och andra aktörer känner mindre ägarskap
- svårare att bära nationell spridning om modellen blir för Lundspecifik
- kommuner har vanligtvis högre krav på exempelvis tillgänglighet som kan leda till mer komplexitet

Kommunens kommentar:

- ej önskvärd modell

## Modell B - Fristående organisation eller mellanform

En förening, stiftelse, idéburen organisation eller annan fristående struktur tar rollen som långsiktig värd.

### Styrkor

- ligger nära idén om neutral arena
- kan bättre spegla att plattformen är en gemensam resurs
- kan underlätta nationell uppskalning

### Utmaningar

- kräver uppbyggnad av ny organisation eller nytt mandat
- finansiering och bemanning behöver lösas
- juridik, ansvar och governance blir mer komplexa

Kommunens kommentar:

Vilka kommunalövergripande stiftelser finns?

Sambruk?

Forskningsinstitutidéer i Veberöd

Stiftelse som ligger i linje.

## Modell C - Distribuerad modell med öppen kod och lokal drift

Kärnan görs öppen och flera aktörer kan sätta upp egna installationer, med stöd av dokumentation och gemensamma principer.

### Styrkor

- hög frihet och hög skalbarhet
- låg central låsning
- möjliggör spridning till andra kommuner och lokala sammanhang

### Utmaningar

- svårt att säkerställa kvalitet, kompatibilitet och kontinuitet
- risk för många versioner och splittrad utveckling
- kräver tydlig governance för vad som är "kärna" och vad som är lokalt

Kommunens kommentar:

- Tydlighet kring hur "kärna" fungerar för fortsatt drift, att kunna luta sig mot.
- Kärna enkel och bra. Lokalt kan vara komplicerat och svårt..

## Modell D - Hybridmodell

En gemensam kärna förvaltas samlat, medan drift och innehåll kan ligga hos olika lokala värdar.

### Styrkor

- kombinerar stabilitet och lokal frihet
- passar väl med en modulär API-baserad plattform
- samma grund men olika lokala lösningar

### Utmaningar

- kräver tydlig rollfördelning
- kräver beslut om vem som äger kärnan
- kräver process för ändringar, bidrag och prioritering

Kommunens kommentar: Ägarformat stiftelse är intressant att utforska vidare.

**KOMMUNEN FÖRESPRÅKAR: MODELL D**

# Inledande hypoteser om drift

## Drift är inte samma sak som ägarskap

Det är viktigt att tydliggöra att den som driftar plattformen inte automatiskt behöver "äga" plattformen i idé, riktning eller kod.

## Tre tänkbara driftsnivåer

### A. Drift under projektet

We Know IT eller upphandlad teknisk part ansvarar för utvecklings- och testmiljö samt eventuell pilotdrift inom projektets ramar.

### B. Drift efter projektet - lokal pilotdrift

En namngiven aktör ansvarar för produktion, support, säkerhetsuppdateringar och incidenthantering för Lunds produktionsmiljö.

### C. Drift i uppskalning

Andra kommuner eller lokala värdar ska kunna drifta egna installationer, antingen själva eller via extern part.

**KOMMUNEN FÖRESPRÅKAR: ALTERNATIV C**

# Inledande hypoteser om ansvarsfördelning

## Ansvar behöver delas upp i olika kategorier

För att undvika otydlighet kan ansvar beskrivas i följande kategorier:

- strategiskt ansvar
- juridiskt ansvar
- tekniskt ansvar
- operativt driftansvar
- innehållsansvar
- modereringsansvar
- utvecklingsansvar
- finansieringsansvar

## Preliminär ansvarsuppdelning

### Lunds kommun

Kan ha en central roll i att:

- initiera, samordna och legitimera arbetet
- sätta ramar för pilot och lokal tillämpning
- bidra till organisatorisk hemvist eller värdskap, men inte nödvändigtvis vara ensam ägare

### We Know IT

Kan ha en central roll i att:

- definiera teknisk grundarkitektur
- utveckla modulär plattform och API-struktur
- säkerställa att lösningen är möjlig att överlämna, vidareutveckla och skala
- dokumentera tekniska vägval och förvaltningsförutsättningar

Detta är viktigt ur AP4-perspektiv: We Know IT bör bidra med underlag för **hur plattformen kan förvaltas**, men inte automatiskt förutsättas bära framtida drift, community governance eller innehållsförvaltning utan särskilt beslut, finansiering och mandat.

### Civilsamhälle / lokala aktörer

Kan över tid ha en roll i:

- innehåll
- initiativ
- lokal mobilisering
- medskapande
- viss förvaltningsmedverkan

Men det bör inte byggas en modell som förutsätter att frivilliga krafter ensam bär samhällskritisk drift eller grundläggande förvaltning.

### Extern värd / fristående organisation

Kan vara relevant att utreda för:

- neutralitet
- långsiktig samförvaltning
- nationell spridning
- gemensam governance

**KOMMUNEN LYFTER VIKT AV: EXTERN VÄRD**

# Regelverk och styrande principer att utreda

Det finns flera områden där ett gemensamt ramverk sannolikt behövs.

- **Hypotes:** Plattformen behöver ett tydligt regelverk för hur den får användas, av vem och till vad.
- **Hypotes:** Om plattformen innehåller användargenererat eller halvöppet innehåll krävs modereringsprinciper, även om modereringen sker lättviktigt.
- **Hypotes:** Alla funktioner kräver inte full inloggning, men vissa roller och handlingar kommer sannolikt att kräva tydlig identitet och behörighet.
- **Hypotes:** Projektet behöver tidigt bestämma vilken data som faktiskt ska samlas in, varför, hur länge och av vem den får användas.
- **Hypotes:** Kärnplattformen bör i grunden vara öppen, men det kan finnas integrationer eller lokala kopplingar som inte delas fullt ut.
- **Hypotes:** Kommersiella inslag bör hanteras mycket försiktigt för att inte underminera plattformens neutralitet och tillit.

# Kritiska vägval att följa upp i senare faser

Följande frågor bedöms som särskilt viktiga att arbeta vidare med:

- Vem ska vara juridisk värd för plattformen efter projektets slut?
- Vem ansvarar för produktionsdrift, säkerhet och support?
- Vilka delar av plattformen ska vara öppna respektive lokalt kontrollerade?
- Hur ska förändringar i kodbasen styras och godkännas?
- Hur ska innehållsansvar och moderering organiseras?
- Hur undviker vi att lösningen blir beroende av frivilliga krafter för kritisk funktion?
- Hur säkerställs finansiering för drift och vidareutveckling efter projektet?
- Hur möjliggör vi nationell spridning utan att tappa lokal relevans?
- Hur undviker vi leverantörslåsning men behåller tillräcklig stabilitet?
- Vilken organisatorisk modell bäst stödjer idén om en digital allmänning över tid?

_Summerande kommentar från kommunen 2 april 2026:_

## 6\. Ägarskap och förvaltning KOMMUNEN FÖRESPRÅKAR: MODELL D

## 6.4Modell D - Hybridmodell

En gemensam kärna förvaltas samlat, medan drift och innehåll kan ligga hos olika lokala värdar.

### Styrkor

- kombinerar stabilitet och lokal frihet
- passar väl med en modulär API-baserad plattform
- samma grund men olika lokala lösningar

### Utmaningar

- kräver tydlig rollfördelning
- kräver beslut om vem som äger kärnan
- kräver process för ändringar, bidrag och prioritering

Kommunens kommentar: Ägarformat stiftelse är intressant att utforska vidare.

**7\. Drift: KOMMUNEN FÖRESPRÅKAR: ALTERNATIV C**

### C. Drift i uppskalning

Andra kommuner eller lokala värdar ska kunna drifta egna installationer, antingen själva eller via extern part.

**8\. Ansvarsfördelning: KOMMUNEN LYFTER VIKT AV: EXTERN VÄRD**

Extern värd / fristående organisation

Kan vara relevant att utreda för:

- neutralitet
- långsiktig samförvaltning
- nationell spridning
- gemensam governance

TEXT ATT LYFTAS UT TILL PROJEKTPLAN FAS 2

**Två case för framdrift i AP4 fas 2, för att testa våra val och tydliggöra vidare frågor att ta ställning till för ägandeskap och förvaltning samt teknisk arkitektur:**

**April**

**1\. "Lineroligt" ett fiktivt case, där geografin är Linero där Benny på samhällsbyggnadsförvaltningen är "kocken".**

**Maj**

**2\. Veberöd där Smarta byar är kocken som får testa om vårt upplägg håller, att vem som helst kan starta en lokal plattform med utgångspunkt i vår bas.**

**Båda casen utgår från konceptet om en gemensam kärna som WeKnowIT utvecklar via Github med öppen källkod.**

**För att Veberöd ska kvala in som case behöver vi skapa en avsiktsförklaring /ett manifest som Smarta byar är med på, signerar. (April, Adrian är kommunens part)**

**\------------------------------------------------------------------------------------------------------------------------**

**Berättelsen om Omeletten, en analogi för förståelse för den icke-tekniskt insatte.**

**Alla delar ska kunna vara separata, dvs fungera med olika aktörer.**

**Gemensam kärna**

- Utveckling /Bonden We Know IT
- Kodbas /repo Äggkartong Github erbjudas till vem som helst!

(Fork)

- Mjukvara utveckla applikation flera Ägg Bykänsla appen (We Know IT skapar kärnan)

**Drift o teknisk förvaltning**

**Ex Veberöd**

**Ex Fiktiv by "Lineroligt"**

4\. Driftmiljö, Kök **Amazon** (om Github har server på amazon) "kontaineriserat", kan flyttas ex till källare)

Server "Bennys källare"

5\. Tekniskt drift, Kocken Smarta byar Jan / Jans konsult

Benny

**Lokal verksamhet**

6\. Lokal administration, Servitören, Smarta byar Henrietta (hur det ska se ut på sidan)

Benny + Linnéa Norman för grafisk kommunikation

7\. Lokal användning, Matsalen med folk Byn/ stadsdelen Veberöd och veberödsborna

Kärnteam Bykänsla