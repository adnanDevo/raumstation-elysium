const systeme = [
    {
        name: "Sauerstoffversorgung",
        status: "kritisch",
        energieverbrauch: 80,
        reparaturkosten: 1200
    },
    {
        name: "Kantine",
        status: "normal",
        energieverbrauch: 30,
        reparaturkosten: 100
    },
    {
        name: "Antrieb",
        status: "kritisch",
        energieverbrauch: 95,
        reparaturkosten: 5000
    },
    {
        name: "Kommunikation",
        status: "gestört",
        energieverbrauch: 40,
        reparaturkosten: 800
    },
    {
        name: "Lebenserhaltung",
        status: "gestört",
        energieverbrauch: 70,
        reparaturkosten: 2500
    },
    {
        name: "Navigation",
        status: "normal",
        energieverbrauch: 55,
        reparaturkosten: 900
    },
    {
        name: "Schutzschild",
        status: "kritisch",
        energieverbrauch: 90,
        reparaturkosten: 3500
    }]
let budget = 6000
let liste = document.querySelector("#liste")
let budgetAnzeige = document.querySelector("#budgetAnzeige")
let listeKritisch = document.querySelector("#div2")
let buttonKritisch = document.querySelector("#div1")
let reparaturKosten = document.querySelector("#div3")
let reparaturSumme = document.querySelector("#div4")
let energiVerbrauch = document.querySelector("#div5")
let energiBericht = document.querySelector("#div6")
let statistik = document.querySelector("#div9")
let tabellee = document.querySelector("#div10")
function listeAufbauen() {
    liste.innerHTML = ""
    for (const zeil of systeme) {
        let li = document.createElement("li")
        li.textContent = "- Name: " + zeil.name + "   / Status:  " + zeil.status + "   / Kosten: " + zeil.reparaturkosten
        if (zeil.status == "kritisch") {
            li.style.backgroundColor = "red"
        } else if (zeil.status == "gestört") {
            li.style.backgroundColor = "orange"
        }
        let knopf = document.createElement("button")
        knopf.textContent = "reparieren"
        knopf.addEventListener("click", function () {
            if (zeil.status == "normal") {
                budgetAnzeige.textContent = "Dieses System ist schon in Ordnung. Budget: " + budget + " $"
            } else if (budget >= zeil.reparaturkosten) {
                budget = budget - zeil.reparaturkosten
                zeil.status = "normal"
                listeAufbauen()
                if (listeKritisch.children.length > 0) {
                    kritisch()
                }
                if (tabellee.children.length > 0) {
                    statistikZeigen()
                }
            } else {
                budgetAnzeige.textContent = "Budget reicht nicht aus! Budget: " + budget + " $"
            }
        })
        li.append(knopf)
        liste.append(li)
    }
    budgetAnzeige.textContent = "Budget: " + budget + " $"
}
listeAufbauen()
buttonKritisch.addEventListener("click", kritisch)
function kritisch() {
    listeKritisch.innerHTML = ""
    const kritischeSysteme = systeme.filter(zeile => zeile.status == "kritisch")
    for (const system of kritischeSysteme) {
        let li = document.createElement("li")
        li.textContent = "- Name: " + system.name + " / Status: " + system.status
        listeKritisch.append(li)
    }
}

reparaturKosten.addEventListener("click", kostenBerechnen)
function kostenBerechnen() {
    let kosten = []
    for (const system of systeme) {
        kosten.push(system.reparaturkosten)
    }
    reparaturSumme.textContent = "$ " + kosten.reduce((summe, z) => summe + z, 0)
}

energiVerbrauch.addEventListener("click", energiZeigen)
function energiZeigen() {
    energiBericht.innerHTML = ""
    const ergebnisse = systeme.map((eintrag) => eintrag.name + " : " + eintrag.energieverbrauch)
    for (const ergebnis of ergebnisse) {
        let lil = document.createElement("li")
        lil.textContent = ergebnis
        energiBericht.append(lil)
    }
}

statistik.addEventListener("click", statistikZeigen)
function statistikZeigen() {
    let kritischS = 0
    let gestörtS = 0
    let normalS = 0
    for (const eintrag of systeme) {

        if (eintrag.status == "kritisch") {
            kritischS += 1

        } else if (eintrag.status == "gestört") {
            gestörtS += 1

        } else if (eintrag.status == "normal") {
            normalS += 1

        }
    }
    let tabelle = document.createElement("table")
    let zeileh = document.createElement("tr")
    let tabelleh1 = document.createElement("th")
    tabelleh1.textContent = "Status"
    let tabelleh2 = document.createElement("th")
    tabelleh2.textContent = "Wie Viel"
    let zeilek = document.createElement("tr")
    let zeileg = document.createElement("tr")
    let zeilen = document.createElement("tr")
    let zelleNamek = document.createElement("td")
    zelleNamek.textContent = "Kritisch"
    let zelleZahlk = document.createElement("td")
    zelleZahlk.textContent = kritischS
    let zelleNameg = document.createElement("td")
    zelleNameg.textContent = "Gestört"
    let zelleZahlg = document.createElement("td")
    zelleZahlg.textContent = gestörtS
    let zelleNamen = document.createElement("td")
    zelleNamen.textContent = "Normal"
    let zelleZahln = document.createElement("td")
    zelleZahln.textContent = normalS
    zeileh.append(tabelleh1, tabelleh2)
    zeilek.append(zelleNamek, zelleZahlk)
    zeileg.append(zelleNameg, zelleZahlg)
    zeilen.append(zelleNamen, zelleZahln)
    tabelle.append(zeileh)
    tabelle.append(zeilek)
    tabelle.append(zeileg)
    tabelle.append(zeilen)
    tabellee.innerHTML = ""
    tabellee.append(tabelle)
}
