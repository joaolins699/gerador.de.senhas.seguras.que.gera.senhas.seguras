// ... (continuação do seu código)

function aumentaTamanho() {
    if (tamanhoSenha < 20) { // Limite máximo seguro opcional
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

// 3. LÓGICA DE GERAÇÃO DA SENHA
// Atribui o evento de clique para todos os checkboxes atualizarem a senha em tempo real
checkbox.forEach(box => box.onclick = geraSenha);

function geraSenha() {
    let alfabeto = '';
    
    // Verifica quais grupos de caracteres estão marcados
    // [0] Maiúsculas, [1] Minúsculas, [2] Números, [3] Símbolos
    if (checkbox[0].checked) alfabeto += letrasMaiusculas;
    if (checkbox[1].checked) alfabeto += letrasMinusculas;
    if (checkbox[2].checked) alfabeto += numeros;
    if (checkbox[3].checked) alfabeto += simbolos;

    let senhaGerada = '';
    
    // Se nenhum checkbox estiver marcado, limpa o campo e a força
    if (alfabeto === '') {
        campoSenha.value = '';
        classificaForca(0);
        return;
    }

    // Monta a senha sorteando caracteres do alfabeto construído
    for (let i = 0; i < tamanhoSenha; i++) {
        const indiceAleatorio = Math.floor(Math.random() * alfabeto.length);
        senhaGerada += alfabeto[indiceAleatorio];
    }

    campoSenha.value = senhaGerada;
    calculaForca();
}

// 4. CÁLCULO DE FORÇA DA SENHA
function calculaForca() {
    let tiposSelecionados = 0;
    
    checkbox.forEach(box => {
        if (box.checked) tiposSelecionados++;
    });

    // Entropia básica baseada no tamanho e variedade
    const pontuacao = tamanhoSenha * tiposSelecionados;

    // Define os limites para classificação (Fraca, Média, Forte)
    if (pontuacao < 15) {
        classificaForca('fraca');
    } else if (pontuacao >= 15 && pontuacao < 35) {
        classificaForca('media');
    } else {
        classificaForca('forte');
    }
}

function classificaForca(nivel) {
    // Remove classes anteriores para não acumular estilos no HTML
    forcaSenha.classList.remove('fraca', 'media', 'forte');
    
    if (nivel) {
        forcaSenha.classList.add(nivel);
        forcaSenha.textContent = nivel.toUpperCase();
    } else {
        forcaSenha.textContent = 'SEM SELEÇÃO';
    }
}

// Gera uma senha inicial assim que a página carrega
geraSenha();
