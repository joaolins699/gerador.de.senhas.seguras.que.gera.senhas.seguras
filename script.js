// ===== GERADOR DE SENHAS COMPLETO (CORRIGIDO) =====

// 1. SELEÇÃO DE ELEMENTOS E VARIÁVEIS INICIAIS
const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // <- ordem corrigida (estava ...TUVXYWZ)
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz'; // <- ordem corrigida
const numeros = '0123456789';
const simbolos = '!@%*?';

const campoSenha = document.querySelector('#campo-senha');

// CORREÇÃO PRINCIPAL:
// No HTML os checkboxes têm class="checkbox" (e não "parametro-senha__checkbox").
// Por isso o seletor original retornava uma lista vazia e o script quebrava
// assim que tentava ler checkbox[0].checked.
const checkbox = document.querySelectorAll('.checkbox');

const botoes = document.querySelectorAll('.parametro-senha__botao');
const forcaSenha = document.querySelector('.forca');

// 2. CONTROLE DE TAMANHO DA SENHA
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

// 3. GERAÇÃO DA SENHA ALEATÓRIA
function geraSenha() {
    let alfabeto = '';
    if (checkbox[0].checked) { alfabeto += letrasMaiusculas; }
    if (checkbox[1].checked) { alfabeto += letrasMinusculas; }
    if (checkbox[2].checked) { alfabeto += numeros; }
    if (checkbox[3].checked) { alfabeto += simbolos; }

    // CORREÇÃO EXTRA: se nenhum checkbox estiver marcado, o alfabeto fica
    // vazio e a senha antiga virava "undefinedundefined...".
    // Agora avisamos o usuário e paramos a função antes de gerar algo errado.
    if (alfabeto === '') {
        campoSenha.value = 'Selecione ao menos uma opção';
        forcaSenha.classList.remove('fraca', 'media', 'forte');
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
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    forcaSenha.classList.remove('fraca', 'media', 'forte');

    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35) {
        forcaSenha.classList.add('media');
    } else {
        forcaSenha.classList.add('fraca');
    }
}

// 5. LISTENERS NOS CHECKBOXES
// Adicionei isso: antes, marcar/desmarcar uma checkbox não gerava uma nova
// senha automaticamente. Agora, toda vez que o usuário mudar uma opção,
// a senha é recalculada na hora.
checkbox.forEach(function (item) {
    item.onchange = geraSenha;
});

// Inicializa a primeira geração de senha
geraSenha();
