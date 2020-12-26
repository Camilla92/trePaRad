
/*
Lagrer spillStatusen her til senere. 
Slik at vi kan bruke den til å skrive ut hvem sin tur det er. 
QuerySelector finner det første elementet i dokumentet som matcher med navnet. 
*/
const status = document.querySelector('.spillStatus');

/*
X er startspilleren. 
*/
let spiller = "X";
/*
 Her er tilstanden til brettet. Dette gjør det enkelt å sjekke hvert felt til senere. 
*/
let tilstand = ["", "", "", "", "", "", "", "", ""];
/*
spillerSinTur som vises etter hver trekk som tas. Den skal være dynamisk. 
*/
function spillerSinTur(){
    return "Det er "+ spiller+ " sin tur";
}
/*
Vi kaller på spillerSinTur sånn at brukeren vet hvem sin tur det er. 
*/
status.innerHTML = spillerSinTur();
/*
Legger til eventListeners til cellene og restart knappen.
querySelectorAll finner alle elementene i dokumentet som har id cell, legger så til en eventlistener
for hver gang det skjer et klikk på cellen.  For hver gang en celle blit klikket så skal handterKlikk kjøre. 

Velger første element hvor restart er id legger til en eventlistener når denne blir trykket. 
For hver gang det blir klikket på restart så skal restartSpill kjøre. 
*/
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handterKlikk));
document.querySelector('.restart').addEventListener('click', restartSpill);

//funksjoner

function handterKlikk(klikket) {
/*
Tar vare på cellen som er klikket på. 
*/    
    const klikketCelle = klikket.target;
/*
FInner ut hvor den klikkede cellen er i vårt rutenett.
*/
    const klikketCelleIndex = klikketCelle.getAttribute('data-cell-index');
/* 
Oppdaterer tilstanden og skriver det spilte trekket i listen. 
Oppdaterer i tillegg utskriften av klikket.
*/    
    handterSpilltCelle(klikketCelle, klikketCelleIndex);
    //Bytter spiller 
    handterNySpiller();
}

function handterSpilltCelle(klikketCelle, klikketCelleIndex) {
/*
Oppdaterer tilstanden og skriver det spilte trekket i listen. 
Oppdaterer i tillegg utskriften av klikket. 
*/
    tilstand[klikketCelleIndex] = spiller;
    klikketCelle.innerHTML = spiller;
    console.log("klikket celle "+ klikketCelle.innerHTML + " tilstanden av listen er "+ tilstand[klikketCelleIndex]);
}
function handterNySpiller() {

    //går igjennom tilstanden og sjekker om det er spiller X eller Y som  er neste. 
        
        for(var i=0; i<tilstand.length; i++){
            //hvis det var spiller X så er det O
        if(spiller==="X"){
        	spiller="O";	
        }
        else{
            //motsatt skal det bli X hvis O var forrige spiller.
        	spiller="X";
        }
    }
   
    //skriver ut hvem sin tur det er. 
    status.innerHTML = spillerSinTur();
}

//starter spillet på nytt. 
function restartSpill() {
  
    //setter startspiller
    spiller = "X";
    //nuller ut brettet
    tilstand = ["", "", "", "", "", "", "", "", ""];
    //legger inn tomme strenger i cellene. 
    status.innerHTML = spillerSinTur();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}



