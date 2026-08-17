// ===== GERADOR DE SENHAS OTIMIZADO =====

// 1. DICIONÁRIOS DE CARACTERES
const CARACTERES = {
    maiusculas: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    minusculas: 'abcdefghijklmnopqrstuvwxyz',
    numeros: '0123456789',
    simbolos: '!@%*?'
};

// 2. SELEÇÃO DE ELEMENTOS E CONFIGURAÇÃO INICIAL
const numeroSenha = document.querySelector('.parametro-senha__texto');
const campoSenha = document.querySelector('#campo-senha');
const forcaSenha = document.querySelector('.forca');
const checkboxes = document.querySelectorAll('.checkbox');
const [botaoDiminuir, botaoAumentar] = document.querySelectorAll('.parametro-senha__botao');

let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

// 3. GERAÇÃO DA SENHA ALEATÓRIA
function geraSenha() {
    let alfabeto = '';
    
    // Verifica cada checkbox pelo seu índice correto na NodeList
    if (checkboxes[0] && checkboxes[0].checked) alfabeto += CARACTERES.maiusculas;
    if (checkboxes[1] && checkboxes[1].checked) alfabeto += CARACTERES.minusculas;
    if (checkboxes[2] && checkboxes[2].checked) alfabeto += CARACTERES.numeros;
    if (checkboxes[3] && checkboxes[3].checked) alfabeto += CARACTERES.simbolos;

    // Se nenhum estiver marcado, interrompe e avisa o usuário
    if (!alfabeto) {
        campoSenha.value = 'Selecione ao menos uma opção';
        if (forcaSenha) forcaSenha.className = 'forca'; 
        return;
    }

    let senha = '';
    // Uso da API Crypto do navegador para gerar números aleatórios altamente seguros
    const valoresAleatorios = new Uint32Array(tamanhoSenha);
    window.crypto.getRandomValues(valoresAleatorios);

    for (let i = 0; i < tamanhoSenha; i++) {
        senha += alfabeto[valoresAleatorios[i] % alfabeto.length];
    }

    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}

// 4. CÁLCULO DE ENTROPIA E CLASSIFICAÇÃO DA FORÇA
function classificaSenha(tamanhoAlfabeto) {
    if (!forcaSenha) return;
    
    const entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    
    // Reseta todas as classes de força anteriores, mantendo apenas a classe base
    forcaSenha.className = 'forca'; 

    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35) {
        forcaSenha.classList.add('media');
    } else {
        forcaSenha.classList.add('fraca');
    }
}

// 5. CONTROLE DE TAMANHO (LISTENERS)
function atualizarTamanho(novoTamanho) {
    if (novoTamanho >= 1 && novoTamanho <= 20) {
        tamanhoSenha = novoTamanho;
        numeroSenha.textContent = tamanhoSenha;
        geraSenha();
    }
}

if (botaoDiminuir) botaoDiminuir.onclick = () => atualizarTamanho(tamanhoSenha - 1);
if (botaoAumentar) botaoAumentar.onclick = () => atualizarTamanho(tamanhoSenha + 1);

// 6. EVENTOS DOS CHECKBOXES E INICIALIZAÇÃO
checkboxes.forEach(item => item.onchange = geraSenha);

// Inicialização automática ao carregar a página
geraSenha();
