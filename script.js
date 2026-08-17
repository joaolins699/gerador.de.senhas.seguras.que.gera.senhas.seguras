// ===== ESCAPE ROOM JS: GERADOR DE SENHAS COMPLETO =====

// 1. SELEÇÃO DE ELEMENTOS E VARIÁVEIS INICIAIS
const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';

const campoSenha = document.querySelector('#campo-senha');
// Ajustado para pegar os inputs corretos de dentro da classe do HTML
const checkboxes = document.querySelectorAll('.parametro-senha-checkbox input');
const botoes = document.querySelectorAll('.parametro-senha__botao');
const forcaSenha = document.querySelector('.forca');

// 2. CONTROLE DE TAMANHO DA SENHA
// CORREÇÃO: Adicionado os índices [0] e [1] para identificar qual botão é qual
botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

// Vincula o evento de mudança em cada checkbox para atualizar a senha na hora
checkboxes.forEach(checkbox => {
    checkbox.onchange = geraSenha;
});

// 3. GERAÇÃO DA SENHA ALEATÓRIA
function geraSenha() {
    let alfabeto = '';
    
    // CORREÇÃO: Adicionado os índices, [1], [2], [3] para ler cada caixa individualmente
    if (checkboxes[0].checked) { alfabeto += letrasMaiusculas; }
    if (checkboxes[1].checked) { alfabeto += letrasMinusculas; }
    if (checkboxes[2].checked) { alfabeto += numeros; }
    if (checkboxes[3].checked) { alfabeto += simbolos; }

    // Segurança: se nenhuma caixa estiver marcada, avisa o usuário e para a execução
    if (alfabeto.length === 0) {
        campoSenha.value = "Selecione uma opção";
        classificaSenha(0);
        return;
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[numeroAleatorio];
    }
    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}

// 4. CÁLCULO DE ENTROPIA E CLASSIFICAÇÃO DA FORÇA
function classificaSenha(tamanhoAlfabeto) {
    if (tamanhoAlfabeto === 0) {
        forcaSenha.className = 'forca';
        return;
    }

    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    forcaSenha.className = 'forca'; // Limpa as classes de cor anteriores

    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35) {
        forcaSenha.classList.add('media');
    } else {
        forcaSenha.classList.add('fraca');
    }
}

// Inicializa a primeira geração de senha assim que a página abre
geraSenha();
