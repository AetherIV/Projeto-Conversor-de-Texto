const convertUpperCase = document.getElementById("convertUpperCase");
const convertLowerCase = document.getElementById("convertLowerCase");
const clearSpaces = document.getElementById("clearSpaces");
const clearSymbols = document.getElementById("clearSymbols");
const outputText = document.getElementById("outputText");

let input;

function convert(){
    if(convertUpperCase.checked){
       input = document.getElementById("textInput").value;
        outputText.textContent = input.toUpperCase();
    }
    else if(convertLowerCase.checked){
        input = document.getElementById("textInput").value;
        outputText.textContent = input.toLowerCase();
    }
    else if(clearSpaces.checked){
        input = document.getElementById("textInput").value;
        outputText.textContent = input.replace(/\s/g, "");
    }
    else if(clearSymbols.checked){
        input = document.getElementById("textInput").value;
        outputText.textContent = input.replace(/[^a-zA-Z0-9]/g, "");
    }
}

function copyText(){

    const outputText = document.getElementById('outputText').textContent;
    navigator.clipboard.writeText(outputText);
    const result = document.getElementById("result");
    result.textContent = "Texto Copiado!";

}


  