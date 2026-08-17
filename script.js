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
