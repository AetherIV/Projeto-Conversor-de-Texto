let input;

function checkExclusivity(checkedBox, otherBoxId) {
    if (checkedBox.checked) {
        document.getElementById(otherBoxId).checked = false;
    }
}

function convert() {
    const input = document.getElementById("textInput").value;
    const result = document.getElementById("result");

    // Verifica se o campo de entrada está vazio
    if (!input.trim()) {
        result.textContent = "Favor digitar algo na caixa de texto";
        showNotification();
        return;
    }

    const toggleUpperCase = document.getElementById("toggleUpperCase").checked;
    const toggleLowerCase = document.getElementById("toggleLowerCase").checked;
    const toggleRemoveSpaces = document.getElementById("toggleRemoveSpaces").checked;
    const toggleRemoveSymbols = document.getElementById("toggleRemoveSymbols").checked;

    // Verifica se nenhum tipo de conversão foi selecionado
    if (!toggleUpperCase && !toggleLowerCase && !toggleRemoveSpaces && !toggleRemoveSymbols) {
        result.textContent = "Favor selecione pelo menos 1 tipo de conversão";
        showNotification();
        return;
    }

    let modifiedText = input;

    // Aplicar transformações conforme selecionado
    if (toggleUpperCase) {
        modifiedText = modifiedText.toUpperCase();
    } else if (toggleLowerCase) {
        modifiedText = modifiedText.toLowerCase();
    }
    if (toggleRemoveSpaces) {
        modifiedText = modifiedText.replace(/\s/g, "");
    }
    if (toggleRemoveSymbols) {
        modifiedText = modifiedText.replace(/[^a-zA-Z0-9\s]/g, "");
    }

    document.getElementById("outputText").textContent = modifiedText;
}

// Função para mostrar a notificação flutuante
function showNotification() {
    const result = document.getElementById("result");
    result.style.opacity = 1; // Torna a notificação visível

    setTimeout(() => {
        result.style.opacity = 0; // Começa o fade out
        setTimeout(() => {
            result.textContent = ""; // Limpa o texto após o fade out
        }, 500); // Espera o fade out terminar
    }, 3000); // 3000 milissegundos = 3 segundos antes de começar o fade out
}


function copyText() {
    const outputText = document.getElementById('outputText').textContent;
    navigator.clipboard.writeText(outputText);
    const result = document.getElementById("result");
    result.textContent = "Texto Copiado!";
    result.style.opacity = 1; // Torna a notificação visível

    setTimeout(() => {
        result.style.opacity = 0; // Começa o fade out
        setTimeout(() => {
            result.textContent = ""; // Limpa o texto após o fade out
        }, 500); // Espera o fade out terminar
    }, 3000); // 3000 milissegundos = 3 segundos antes de começar o fade out
}

document.getElementById('theme-switch').addEventListener('change', function() {
    document.body.classList.toggle('dark-theme');
});