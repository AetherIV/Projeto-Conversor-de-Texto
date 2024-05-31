document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');

    const adjustHeight = () => {
        textInput.style.height = 'auto';
        textInput.style.height = textInput.scrollHeight + 'px';
    };

    textInput.addEventListener('input', adjustHeight);
    adjustHeight();

    // Add validation for conflicting checkboxes
    const uppercaseToggle = document.getElementById('uppercaseToggle');
    const lowercaseToggle = document.getElementById('lowercaseToggle');
    const formatCNPJToggle = document.getElementById('formatCNPJ');
    const formatCPFToggle = document.getElementById('formatCPF');

    uppercaseToggle.addEventListener('change', function() {
        if (this.checked) {
            lowercaseToggle.checked = false;
        }
    });

    lowercaseToggle.addEventListener('change', function() {
        if (this.checked) {
            uppercaseToggle.checked = false;
        }
    });

    formatCNPJToggle.addEventListener('change', function() {
        if (this.checked) {
            formatCPFToggle.checked = false;
        }
    });

    formatCPFToggle.addEventListener('change', function() {
        if (this.checked) {
            formatCNPJToggle.checked = false;
        }
    });
});

function convert() {
    const input = document.getElementById("textInput").value;

    if (!input.trim()) {
        showNotification("Favor digitar algo na caixa de texto");
        return;
    }

    const toggleUpperCase = document.getElementById("uppercaseToggle").checked;
    const toggleLowerCase = document.getElementById("lowercaseToggle").checked;
    const toggleRemoveSpaces = document.getElementById("removeSpaceToggle").checked;
    const toggleRemoveSymbols = document.getElementById("removeSymbolsToggle").checked;
    const toggleLineBreak = document.getElementById("removeLineBreakToggle").checked;
    const formatCNPJ = document.getElementById("formatCNPJ").checked;
    const formatCPF = document.getElementById("formatCPF").checked;

    if (!toggleUpperCase && !toggleLowerCase && !toggleRemoveSpaces && !toggleRemoveSymbols && !toggleLineBreak && !formatCNPJ && !formatCPF) {
        showNotification("Favor selecione pelo menos 1 tipo de conversão");
        return;
    }

    let modifiedText = input;

    if (toggleUpperCase) {
        modifiedText = modifiedText.toUpperCase();
    }
    if (toggleLowerCase) {
        modifiedText = modifiedText.toLowerCase();
    }
    if (toggleRemoveSpaces) {
        modifiedText = modifiedText.replace(/\s/g, "");
    }
    if (toggleRemoveSymbols) {
        modifiedText = modifiedText.replace(/[@#$\/|.,`'"&¨%+=_´+*\\-]/g, "");
    }
    if (toggleLineBreak) {
        modifiedText = modifiedText.replace(/\n/g, " ");
    }
    if (formatCNPJ){
        modifiedText = modifiedText.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5");
    }
    if (formatCPF){
        modifiedText = modifiedText.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
    }

    document.getElementById("convertedText").innerText = modifiedText;
    showNotification("Texto convertido!");
}

function copyText() {
    const outputText = document.getElementById('convertedText').textContent.trim();

    if (outputText === "") {
        showNotification("Sem texto para copiar");
        return;
    } else {
        navigator.clipboard.writeText(outputText).then(() => {
            showNotification("Texto copiado!");
        }, err => {
            console.error('Failed to copy text: ', err);
            showNotification("Erro ao copiar texto!");
        });
    }
}

function createNotification(message) {
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    container.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            container.removeChild(notification);
        }, 500); // Time for fade-out transition
    }, 3000); // Display time
}

function showNotification(message) {
    createNotification(message);
}

function clearText() {
    const textInput = document.getElementById("textInput");
    const convertedText = document.getElementById("convertedText");

    if (textInput) textInput.value = "";
    if (convertedText) convertedText.textContent = "";
}