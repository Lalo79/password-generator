// Assignment Code
var generateBtn = document.querySelector("#generate");


// character catalog
var alphabetLow = alphabetUp = ["a",	"b",	"c",	"d",	"e",	"f",	"g",	"h",	"i",	"j",	"k",	"l",	"m",	"n",	"o",	"p",	"q",	"r",	"s",	"t",	"u",	"v",	"w",	"x",	"y",	"z"];
var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


// Variables to control flow of random selection of characters

var pass_length, selectedArray, numberFlag, upperCaseCharsFlag, lowerCaseCharsFlag,
specialCharsFlag, flagCountControl;
 


// Variables to help validate user input
var strikes = 0;
var condition_satisfied = false;



// -------------   FUNCTION DEFINITIONS   --------------- //


// Function that determines the length of the password

function getLenght () {

  var pass_length = prompt('Please indicate the number of characters Needed (Minimum 8 - Maximum 128)', 8);


  if (pass_length == null) 
  {
    alert("Request Canceled");
  } 
  else {

    strikes = 0;
    condition_satisfied =false;
    
    while (condition_satisfied == false) {
      if (pass_length < 8 || pass_length > 128) {
        strikes++;
        if (pass_length < 8) {
          pass_length = prompt('You have entered a number lower than 8 (minimum length), Please indicate number of characters needed',8)
        } else {
          pass_length = prompt('You have entered a number higher than 128 (Maximum lenght), Please indicate number of characters needed',8)
        }
      } else {
        condition_satisfied = true;
      }

      if ((pass_length < 8 || pass_length > 128) && strikes == 2) {
        alert('You have chossen a password lenght beyond system capablities, System will connsider an 8 CHARS PASSWORD ')
        pass_length = 8;
        condition_satisfied = true;
      }
    }

  }

  return pass_length;

}


// Asks the user if password requires numbers or letters

function numbersOrLetters() {

  var tipoDeCaracter = prompt('Should your password include: N = Numbers, L = Letters or B = Both?','L');

  if (tipoDeCaracter == null) {
    alert("Request Canceled");
  } else {

    tipoDeCaracter = tipoDeCaracter.substring(0,1).toUpperCase();

    strikes = 0;
    condition_satisfied = false;


    while (condition_satisfied == false) {
      
      if (tipoDeCaracter == 'N'|| tipoDeCaracter == 'L' || tipoDeCaracter == 'B') {
        condition_satisfied = true;
        
      } else {
        strikes++;
        tipoDeCaracter = prompt("You may select either: N for Number, L for Letters or B for Both, Please try Again...","L")
        tipoDeCaracter = tipoDeCaracter.substring(0,1).toUpperCase();
      }
      
      if ( !(tipoDeCaracter == 'N'|| tipoDeCaracter == 'L' || tipoDeCaracter == 'B')  && strikes == 2) {
        alert('You have not chossen the type of character you want, System will connsider LETTERS ONLY')
        tipoDeCaracter = "L";
        condition_satisfied = true;
      }

    }


    if (tipoDeCaracter == "L") {
      lowerCaseCharsFlag = 1;
    } else if (tipoDeCaracter == "N") {
      numberFlag = 1;
      selectedArray.push('numbers');
    } else if (tipoDeCaracter == "B") {
      lowerCaseCharsFlag = 1;
      numberFlag = 1;
      selectedArray.push('numbers');
    }

  }
  return tipoDeCaracter;

} 



// Function that determine if user wnast either Uppercase, Lowwercase or Both

function getLetterCap () {

  var mayusculas = prompt('Do you need: U = Uppercase, L = Lowercase or B = Both?','L');

  if (mayusculas == null) {
    alert("Request Canceled");
  } else {

    mayusculas = mayusculas.substring(0,1).toUpperCase();

    strikes = 0;
    condition_satisfied = false;


    while (condition_satisfied == false) {
      
      if (mayusculas == 'U'|| mayusculas == 'L' || mayusculas == 'B') {
        condition_satisfied = true;
        
      } else {
        strikes++;
        mayusculas = prompt("You may select either: U for Uppercase, L for Lowercase or B for Both, Please try Again...","L")
        mayusculas = mayusculas.substring(0,1).toUpperCase();
      }
      
      if ( !(mayusculas == 'U'|| mayusculas == 'L' || mayusculas == 'B')  && strikes == 2) {
        alert('You have not chossen what letter capitalization you want, System will connsider LOWERCASE LETTERS ONLY')
        mayusculas = "L";
        condition_satisfied = true;
      }

    }


    if (mayusculas == "L") {
        lowerCaseCharsFlag = 1;
        selectedArray.push('alphabetLow');
        upperCaseCharsFlag = 0;
      } else if (mayusculas == "U") {
        lowerCaseCharsFlag = 0;
        upperCaseCharsFlag = 1;
        selectedArray.push('alphabetUp');
      } else if (mayusculas == "B"){
        lowerCaseCharsFlag = 1;
        upperCaseCharsFlag = 1;
        selectedArray.push('alphabetLow' , 'alphabetUp');
    }

  }

  return mayusculas;

} 



// Determines if user wants to use special characters

function specialChars () {

  var caracterEspecial = confirm("Do you wan to include Special Chars such as: % $ # * ~");

  if (caracterEspecial == null) {
    alert("Request Canceled");
  } else {


    if (caracterEspecial == false) {
      return caracterEspecial = [];
    }

    if (caracterEspecial) {
      caracterEspecial = prompt("Plese indicate if any specific chars must be included (5 Chars Max)","");
      
      if (caracterEspecial == false) {
        caracterEspecial = [];
      }
    }

    if (caracterEspecial != "") {
      
      // Takes string from prompt, makes each letter an item of an array that is assigned to caracterEspecial varaible
      caracterEspecial = [... new Set(caracterEspecial)];

      // Determines a filter for the array in which characters that are frequently allowed are excluded
      function filtro(excluir) {
        return excluir != " " && excluir != '"' && excluir != ',' && excluir != ';' && excluir != ':' && excluir != "'" && excluir != "/" && excluir != "(" && excluir != ")";
      }
      caracterEspecial = caracterEspecial.filter(filtro);

      // If by error, the user enters some leters, the following filters any letters or numbers from caracter Especial variable
      // Function also limits number con special characters to 10

      function onlySC(idSpecChar) {
        let pattern = /[^A-Za-z0-9]/g;
        // console.log("idSpecChar  " + idSpecChar.match(pattern));
        return idSpecChar.match(pattern);

      }
      caracterEspecial = caracterEspecial.filter(onlySC).slice(0,5);
    }

    if (caracterEspecial == "" || caracterEspecial == []) {
      caracterEspecial = ["~",	"!",	"@",	"#",	"$",	"%",	"^",	"&",	"*",	"_",	"-",	"+",	"?",	".",	"<",	">"];
      specialCharsFlag = 1;
    } else {
      specialCharsFlag = caracterEspecial.length;
    }

    console.log(caracterEspecial);

    selectedArray.push('caracterEspecial');

  }

  return caracterEspecial;

}





// Create function that selects special chars

function randomFlow() {

  
  var passString = "";
  unusedChars = caracterEspecial;
  usedChars = [];
  
  flagCountControl = numberFlag + upperCaseCharsFlag + lowerCaseCharsFlag
  specialCharsFlag = Math.min(pass_length-flagCountControl, specialCharsFlag);

  flagCountControl = numberFlag + upperCaseCharsFlag + lowerCaseCharsFlag + specialCharsFlag;

  
  // console.log("Control: " + flagCountControl + ", numero: " + numberFlag + ", upperchar: " + upperCaseCharsFlag + ", lowerchar: " + lowerCaseCharsFlag + ", specialchar: " + specialCharsFlag);
  // console.log(selectedArray);

  
  while (passString.length < pass_length ) {

    flagCountControl = numberFlag + upperCaseCharsFlag + lowerCaseCharsFlag + specialCharsFlag;
    position_1 = Math.floor(Math.random()*selectedArray.length);   
    position_2 = Math.floor(Math.random()*(eval(selectedArray[position_1]).length));

    var char = eval(selectedArray[position_1])[position_2];
    console.log('caracter seleccionado: '+ char);
    

    console.log("Pass String Length: " + passString.length + " ///pass length: " + (pass_length))
    console.log("is restricted?  " + (flagCountControl == pass_length-passString.length && pass_length-passString.length > 0))
    console.log(selectedArray[position_1]);
    
    
    if (flagCountControl == pass_length-passString.length && pass_length-passString.length > 0) {
      restricted = true;
    } else {
      restricted = false;
    }



    switch (selectedArray[position_1]) {
      case 'numbers':
        
        if (restricted) {
          if(numberFlag > 0) {
            passString += char;
          }          
        } else {
          passString += char;
        }

        if( numberFlag > 0) {numberFlag--;}

        break;
    

      case 'alphabetLow':
        
        if (restricted) {
          if(lowerCaseCharsFlag > 0) {passString += char;}
        } else {
          passString += char;
        }

        if( lowerCaseCharsFlag > 0) {lowerCaseCharsFlag--;}

        break;


      case 'alphabetUp':
        
        if (restricted) {
          if(upperCaseCharsFlag > 0) {passString += char.toUpperCase();
        }
          
        } else {
          passString += char.toUpperCase();
        }

        if(upperCaseCharsFlag > 0) {upperCaseCharsFlag--;}

        break;


      case 'caracterEspecial':

        if (restricted) {
          if(specialCharsFlag > 0 && unusedChars.includes(char)) {
            passString += char;
          }
        } 
        
        else {
          passString += char;
        }
        
        if ((unusedChars.includes(char))) {
          usedChars.push(char);

          function unUsed(excluir) { return  excluir != char;}
          unusedChars = unusedChars.filter(unUsed);


          // console.log('Unusec Chars Array :' + unusedChars);
          // console.log('uSED Chars Array :' + usedChars);


          if(specialCharsFlag > 0) {specialCharsFlag--;}
        }
          
        break;


      default:
        break;

    }

    // console.log("Control: " + flagCountControl + ", numero: " + numberFlag + ", upperchar: " + upperCaseCharsFlag + ", lowerchar: " + lowerCaseCharsFlag + ", specialchar: " + specialCharsFlag);
    // console.log("//////////////////////////////////////////////");
    
  }

  return passString;

}


// -------------   MAIN FUNCTION   --------------- //


// Write password to the #password input
function writePassword() {
  
  var passwordText = document.querySelector("#password");
  passwordText.value = "";

  var password = generatePassword();
  
  function generatePassword(params) {
    
    selectedArray=[];
    numberFlag = 0;
    upperCaseCharsFlag = 0; 
    lowerCaseCharsFlag = 0;
    specialCharsFlag = 0;


    pass_length = getLenght();
    if (!(pass_length==null)) { 

      typeOfCharacter = numbersOrLetters();
      if(!(typeOfCharacter==null)) {

        if (lowerCaseCharsFlag == 1) {
          lowerOrUpper = getLetterCap();
        }

        if(!(lowerOrUpper==null)) {
      
          caracterEspecial = specialChars();

          finalPassword = randomFlow();
          return finalPassword;

        }
      }
    }
  }




  if (password == undefined) {
    password = "/// OPERATION CANCELED ///"

  } else {
    passwordText.value = password;
    // console.log(password.length)
  }
 
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
