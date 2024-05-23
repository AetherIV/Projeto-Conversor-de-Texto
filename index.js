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
    const toggleCNPJ = document.getElementById("toggleCNPJ").checked;
    const toggleCPF = document.getElementById("toggleCPF").checked;

    if (!toggleUpperCase && !toggleLowerCase && !toggleRemoveSpaces && !toggleRemoveSymbols && !toggleLineBreak && !toggleCNPJ && !toggleCPF) {
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
        modifiedText = modifiedText.replace(/[@#$\/|.,`'"&¨%+=_´+*\\-]/g, "");
    }    
    if(toggleLineBreak){
        modifiedText = modifiedText.replace(/\n/g, " ");
    }
    if (toggleCNPJ) {
        modifiedText = modifiedText.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5");
    }else if (toggleCPF) {
        modifiedText = modifiedText.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
    }

    
    document.getElementById(`outputText`).innerText = modifiedText; //Template literal to help with placeholders

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

    const outputText = document.getElementById('outputText').textContent.trim();
    const copyResult = document.getElementById("copyResult");

    if(outputText === ""){
        copyResult.textContent = "Sem texto para copiar";
        copyResult.style.opacity = 1;

        setTimeout(() => {
            copyResult.style.opacity = 0;
            setTimeout(() => {
                copyResult.textContent = "";
            }, 500);
        }, 3000);
        
        return 0;
    }
    else {
        navigator.clipboard.writeText(outputText).then(() => {
            copyResult.textContent = "Texto Copiado!";
            copyResult.style.opacity = 1;

            setTimeout(() => {
                copyResult.style.opacity = 0;
                setTimeout(() => {
                    copyResult.textContent = "";
                }, 500);
            }, 3000);
        }, err => {
            console.error('Failed to copy text: ', err);
            copyResult.textContent = "Erro ao copiar texto!";
            copyResult.style.opacity = 1;

            setTimeout(() => {
                copyResult.style.opacity = 0;
                setTimeout(() => {
                    copyResult.textContent = "";
                }, 500);
            }, 3000);
        });
    }
}

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

    if (textInput) textInput.value = null;
    if (outputText) outputText.textContent = "";
}
