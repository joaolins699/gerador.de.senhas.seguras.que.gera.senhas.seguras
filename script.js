// ===== GERADOR DE SENHAS — TEMA RETROPUNK =====

// 1. SELEÇÃO DE ELEMENTOS E VARIÁVEIS INICIAIS
const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@%*?';

// NOVIDADE: emojis não são "um caractere" no sentido tradicional.
// Muitos emojis (como 🔥 ou 🚀) ocupam 2 "unidades" internas do
// JavaScript (são compostos por um par substituto / surrogate pair),
// e alguns (como 👨‍💻) são vários emojis unidos por um caractere invisível
// (zero-width joiner). Por isso NÃO colocamos os emojis numa string comum
// como as outras categorias — usamos um array, onde cada emoji já vem
// "inteiro" como um item só, sem risco de ser cortado ao meio.
const emojis = ['🔥', '⚡', '👾', '🤖', '💀', '🛰️', '🔒', '🚀', '👁️', '🌐', '💾', '🧠'];

const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const botaoMenos = document.querySelector('#botao-menos');
const botaoMais = document.querySelector('#botao-mais');
const botaoGerar = document.querySelector('#botao-gerar');
const botaoCopiar = document.querySelector('#botao-copiar');
const forcaSenha = document.querySelector('.forca');
const entropiaTexto = document.querySelector('.entropia');

// 2. CONTROLE DE TAMANHO DA SENHA
botaoMenos.onclick = diminuiTamanho;
botaoMais.onclick = aumentaTamanho;
botaoGerar.onclick = geraSenha;

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
    // MUDANÇA IMPORTANTE: "alfabeto" agora é um ARRAY de tokens, não mais
    // uma string. Cada token pode ser 1 letra ('A'), 1 número ('7') ou
    // 1 emoji inteiro ('🔥'). Antes usávamos `alfabeto += texto`, que
    // funciona bem para strings simples, mas se fizéssemos isso com a
    // string de emojis eles se misturariam com os outros caracteres
    // caractere-a-caractere e quebrariam ao serem sorteados. Usando um
    // array com .push(), cada emoji continua "inteiro" como 1 item.
    let alfabeto = [];
    if (checkbox[0].checked) { alfabeto.push(...letrasMaiusculas); }
    if (checkbox[1].checked) { alfabeto.push(...letrasMinusculas); }
    if (checkbox[2].checked) { alfabeto.push(...numeros); }
    if (checkbox[3].checked) { alfabeto.push(...simbolos); }
    if (checkbox[4].checked) { alfabeto.push(...emojis); }

    if (alfabeto.length === 0) {
        campoSenha.value = 'ERRO: selecione ao menos uma opção';
        forcaSenha.classList.remove('fraca', 'media', 'forte');
        entropiaTexto.textContent = '';
        return;
    }

    // A senha também vira um array de tokens (não uma string concatenada
    // direto), assim cada emoji sorteado entra inteiro na posição certa.
    let senha = [];
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
        senha.push(alfabeto[numeroAleatorio]);
    }

    // NOVIDADE: em vez de só jogar a senha pronta no campo, rodamos um
    // efeito de "decodificação" estilo hacker de filme — por um instante
    // cada posição pisca com tokens aleatórios antes de assentar no
    // valor final. Reforça a temática retropunk/terminal.
    efeitoDecodificacao(senha, alfabeto);

    classificaSenha(alfabeto.length);
}

// NOVIDADE: efeito visual de "decodificando senha"
// Recebe agora ARRAYS de tokens (senhaFinal e alfabeto) em vez de strings,
// para que emojis multi-byte não sejam quebrados ao montar o texto parcial.
function efeitoDecodificacao(senhaFinal, alfabeto) {
    const totalFrames = 8; // quantas vezes cada posição "pisca" antes de fixar
    let frameAtual = 0;

    const intervalo = setInterval(function () {
        let tokensParciais = [];
        for (let i = 0; i < senhaFinal.length; i++) {
            // As posições já "resolvidas" (conforme o frame avança da
            // esquerda pra direita) mostram o token final; o resto
            // mostra ruído aleatório do próprio alfabeto selecionado.
            const posicaoResolvida = i < (frameAtual / totalFrames) * senhaFinal.length;
            if (posicaoResolvida) {
                tokensParciais.push(senhaFinal[i]);
            } else {
                tokensParciais.push(alfabeto[Math.floor(Math.random() * alfabeto.length)]);
            }
        }
        // .join('') junta o array de tokens numa string só, sem risco de
        // cortar emojis ao meio (diferente de concatenar caractere a
        // caractere numa string tradicional).
        campoSenha.value = tokensParciais.join('');
        frameAtual++;

        if (frameAtual > totalFrames) {
            clearInterval(intervalo);
            campoSenha.value = senhaFinal.join(''); // garante o valor exato no final
        }
    }, 35);
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

    // NOVIDADE: mostra o valor numérico da entropia em bits, no estilo
    // "leitura de painel técnico" — reforça a estética de terminal.
    entropiaTexto.textContent = 'ENTROPIA: ' + entropia.toFixed(1) + ' bits';
}

// 5. LISTENERS NOS CHECKBOXES
checkbox.forEach(function (item) {
    item.onchange = geraSenha;
});

// 6. NOVIDADE: BOTÃO DE COPIAR
// Copia a senha para a área de transferência e dá um feedback visual
// temporário no próprio botão (texto e cor mudam por 1.5s).
botaoCopiar.onclick = function () {
    if (!campoSenha.value || campoSenha.value.startsWith('ERRO')) {
        return;
    }

    navigator.clipboard.writeText(campoSenha.value).then(function () {
        const textoOriginal = botaoCopiar.textContent;
        botaoCopiar.textContent = 'COPIADO!';
        botaoCopiar.classList.add('copiado');

        setTimeout(function () {
            botaoCopiar.textContent = textoOriginal;
            botaoCopiar.classList.remove('copiado');
        }, 1500);
    });
};

// Inicializa a primeira geração de senha
geraSenha();
