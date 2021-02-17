//DOM elements
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const tournamentQuantity = document.getElementById('quantity');
const form = document.getElementById('form');
const inputsToVerify = document.querySelectorAll('input');
const locationSelector = document.getElementsByName("location");
const errorCityText = document.getElementById('errorCity');
const checkboxConditions = document.getElementById('checkbox1');
const errorConditions = document.getElementById('errorConditionsText');
const cities = document.getElementById('cities');
const conditions = document.getElementById('conditions');

// fonctions validations
function birthdateOK() {
   if (birthdate.value < birthdate.min || birthdate.value > birthdate.max) {
      return false;
   } else {
      return true;
   }
};

function tournamentsOK() {
   if (tournamentQuantity.value < tournamentQuantity.min || tournamentQuantity.value > tournamentQuantity.max) {
      return false;
   } else {
      return true;
   }
};

// FONCTION VERIFYINPUT avec switch(inputType)
let valide = false; // la façon que j'ai trouvé pour que la fonction me retourne un bool si tout les cases sont valides, change en fonction de test.

function verifyInput (input) {
    const inputType = input.getAttribute('type');
    const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]{2,}/;
    const emailRegex = /\S+@\S+\.\S{2,}/;
    let test;
    
 
 switch(inputType) {
     case "text" :
         test = nameRegex.test(input.value);
         break;
     case "email":
         test = emailRegex.test(input.value);
         break;
     case "date":
         test = birthdateOK();
         break;
      case "number":
         test = tournamentsOK();
         break;
 }    
    if (test) {
        input.style.border = '2px solid green';
        input.nextElementSibling.style.display = "none";
        valide = true 
     } 
     else {
        input.style.border = '2px solid red';
        input.nextElementSibling.style.display = "block";
        valide = false
     }

     console.log(valide);
}

inputsToVerify.forEach( input => {
   input.addEventListener('change', () => {
      verifyInput(input)
   });
});

// FONCTIONS + AddEventListener pour les checkbox.

function cityOk(){
   let check1 = false;
   for(i=0; i<locationSelector.length; i++) { // On observe les inputs pour savoir s'il y en a un de checked
       if (locationSelector[i].checked) {
          check1 = true; // si une check alors check1 = true
       }
     }
       if (check1 == false) { // si check1 est = false alors le message d'erreur s'affiche
            errorCityText.style.display = "block"
            return false;
       }else {
            errorCityText.style.display = "none"
            return true;
       }
}

cities.addEventListener('change', () => {
   cityOk()
});

function conditionsOk() {
   if (!checkboxConditions.checked) {
       errorConditionsText.style.display = 'block';
       return false;
   } else {
       errorConditionsText.style.display = 'none';
       return true;
   }
}

conditions.addEventListener('change', () => {
   conditionsOk()
});

 form.addEventListener('submit', (e) => { // Donc si Valide est true tout est ok sinon pas ok. 
   //Sauf que si un seul champ est valide et les autres ne sont pas remplis, ou le dernier champ rempli est valide l'alert OK s'affiche.
        e.preventDefault();
        if (valide === true) {
         alert("OKAY")
        } else {
         alert("NOT OKAY")
        };

 })

