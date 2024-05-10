let input;

function checkExclusivity(checkedBox, otherBoxId) {
    if (checkedBox.checked) {
        document.getElementById(otherBoxId).checked = false;
    }
}

function convert() {
    const input = document.getElementById("textInput").value;
    const result = document.getElementById("result");

    if (!input.trim()) {
        result.textContent = "Favor digitar algo na caixa de texto";
        showNotification();
        return;
    }

    const toggleUpperCase = document.getElementById("toggleUpperCase").checked;
    const toggleLowerCase = document.getElementById("toggleLowerCase").checked;
    const toggleRemoveSpaces = document.getElementById("toggleRemoveSpaces").checked;
    const toggleRemoveSymbols = document.getElementById("toggleRemoveSymbols").checked;
    const toggleLineBreak = document.getElementById("toggleLineBreak").checked;

    if (!toggleUpperCase && !toggleLowerCase && !toggleRemoveSpaces && !toggleRemoveSymbols && !toggleLineBreak) {
        result.textContent = "Favor selecione pelo menos 1 tipo de conversão";
        showNotification();
        return;
    }

    let modifiedText = input;

    if (toggleUpperCase) {
        modifiedText = modifiedText.toUpperCase();
    } else if (toggleLowerCase) {
        modifiedText = modifiedText.toLowerCase();
    }
    if (toggleRemoveSpaces) {
        modifiedText = modifiedText.replace(/\s/g, "");
    }
    if (toggleRemoveSymbols) {
        modifiedText = modifiedText.replace(/[@#$\/|.,`'"&¨%+=_´+\\-]/g, "");
    }    
    if(toggleLineBreak){
        modifiedText = modifiedText.replace(/\n/g, " ");
    }

    document.getElementById("outputText").textContent = modifiedText;
}

function showNotification() {
    const result = document.getElementById("result");
    result.style.opacity = 1;

    setTimeout(() => {
        result.style.opacity = 0;
        setTimeout(() => {
            result.textContent = "";
        }, 500);
    }, 3000);
}


function copyText() {
    const textInput = document.getElementById("textInput");
    const outputText = document.getElementById('outputText');
    const result = document.getElementById("result");
    
    if(outputText.textContent == ""){
        result.textContent = "Sem texto para copiar";
        result.style.opacity = 1;
        return 0;
    }

    else{
        navigator.clipboard.writeText(outputText);
        result.textContent = "Texto Copiado!";
        result.style.opacity = 1;
    }
    
    setTimeout(() => {
        result.style.opacity = 0;
        setTimeout(() => {
            result.textContent = "";
        }, 500);
    }, 3000);
}

document.getElementById('theme-switch').addEventListener('change', function() {
    document.body.classList.toggle('dark-theme');
});

document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');

    const adjustHeight = () => {
        textInput.style.height = 'auto';

        textInput.style.height = textInput.scrollHeight + 'px';
    };

    textInput.addEventListener('input', adjustHeight);

    adjustHeight();
});

function clearText(){
    const textInput = document.getElementById("textInput");
    const outputText = document.getElementById("outputText");
    const toggleUpperCase = document.getElementById("toggleUpperCase");
    const toggleLowerCase = document.getElementById("toggleLowerCase");
    const toggleRemoveSpaces = document.getElementById("toggleRemoveSpaces");
    const toggleRemoveSymbols = document.getElementById("toggleRemoveSymbols");

    if (textInput) textInput.value = "";
    if (outputText) outputText.textContent = "";
    if (toggleUpperCase) toggleUpperCase.checked = false;
    if (toggleLowerCase) toggleLowerCase.checked = false;
    if (toggleRemoveSpaces) toggleRemoveSpaces.checked = false;
    if (toggleRemoveSymbols) toggleRemoveSymbols.checked = false;
    if (toggleLineBreak) toggleLineBreak.checked = false;
}
