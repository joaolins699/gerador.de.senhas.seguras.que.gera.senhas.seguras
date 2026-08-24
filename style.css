@import url('https://fonts.googleapis.com/css2?family=VT323&family=Share+Tech+Mono&display=swap');

/* ===========================================================
   TOKENS: paleta retropunk (terminal de segurança dos anos 80)
   =========================================================== */
:root {
    --fundo:        #0A0014;   /* quase-preto arroxeado, "vácuo" do terminal */
    --painel:       #150726;   /* painéis/caixas */
    --painel-claro: #1F0B38;   /* campo da senha */
    --magenta:      #FF2E8A;   /* acento primário / perigo / títulos */
    --ciano:        #00F0FF;   /* acento secundário / interativo */
    --ambar:        #FFB000;   /* alertas, força média */
    --verde-term:   #00FF85;   /* força "forte", tom "sucesso" de terminal */
    --texto:        #E8E3F5;
    --texto-fraco:  #8C7FA8;

    --fonte-display: 'VT323', monospace;
    --fonte-mono:    'Share Tech Mono', monospace;
}

* {
    box-sizing: border-box;
    font-weight: 400;
}

body {
    color: var(--texto);
    background-color: var(--fundo);
    background-image:
        radial-gradient(circle at 20% 10%, rgba(255, 46, 138, 0.08), transparent 40%),
        radial-gradient(circle at 80% 90%, rgba(0, 240, 255, 0.08), transparent 40%);
    font-family: var(--fonte-mono);
    overflow-x: hidden;
    position: relative;
}

.conteudo {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px 80px;
    position: relative;
    z-index: 1;
}

/* ===========================================================
   SIGNATURE: overlay de scanlines + flicker de CRT
   Elemento que dá a "alma" retropunk: tela de monitor antigo,
   com linhas horizontais e leve trepidação de brilho.
   =========================================================== */
.crt-overlay {
    pointer-events: none;
    position: fixed;
    inset: 0;
    z-index: 50;
    background: repeating-linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.035) 0px,
        rgba(255, 255, 255, 0.035) 1px,
        transparent 1px,
        transparent 3px
    );
    mix-blend-mode: overlay;
}

.crt-flicker {
    pointer-events: none;
    position: fixed;
    inset: 0;
    z-index: 49;
    background: radial-gradient(circle at 50% 50%, transparent 60%, rgba(0,0,0,0.45) 140%);
    animation: flicker 6s infinite;
}

@keyframes flicker {
    0%, 96%, 100% { opacity: 1; }
    97% { opacity: 0.85; }
    98% { opacity: 1; }
    99% { opacity: 0.9; }
}

/* ===========================================================
   TÍTULO
   =========================================================== */
.conteudo-titulo {
    text-align: center;
    margin-top: 64px;
}

.boot-linha {
    font-family: var(--fonte-mono);
    color: var(--verde-term);
    font-size: 13px;
    letter-spacing: 2px;
    text-transform: uppercase;
    opacity: 0.8;
    margin-bottom: 8px;
}

.boot-linha::before {
    content: '● ';
    animation: piscar 1.2s infinite steps(1);
}

@keyframes piscar {
    50% { opacity: 0; }
}

.titulo-principal {
    font-family: var(--fonte-display);
    font-size: 64px;
    letter-spacing: 4px;
    color: var(--texto);
    text-shadow:
        0 0 6px var(--magenta),
        0 0 18px rgba(255, 46, 138, 0.4);
    margin: 0;
    position: relative;
    display: inline-block;
}

.glitch {
    animation: glitch-base 4s infinite;
}

.glitch::before,
.glitch::after {
    content: attr(data-texto);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    overflow: hidden;
    opacity: 0;
}

.glitch::before {
    color: var(--ciano);
    animation: glitch-1 4s infinite;
}

.glitch::after {
    color: var(--magenta);
    animation: glitch-2 4s infinite;
}

@keyframes glitch-base {
    0%, 94%, 100% { transform: translate(0, 0); }
    95% { transform: translate(-2px, 1px); }
    96% { transform: translate(2px, -1px); }
}

@keyframes glitch-1 {
    0%, 94%, 100% { opacity: 0; transform: translate(0, 0); }
    95% { opacity: 0.7; transform: translate(3px, -1px); }
    96% { opacity: 0; }
}

@keyframes glitch-2 {
    0%, 92%, 100% { opacity: 0; transform: translate(0, 0); }
    93% { opacity: 0.7; transform: translate(-3px, 1px); }
    94% { opacity: 0; }
}

.titulo-secundario {
    font-family: var(--fonte-mono);
    font-size: 16px;
    font-weight: 400;
    color: var(--texto-fraco);
    margin-top: 12px;
}

/* ===========================================================
   CAMPO DE SENHA
   =========================================================== */
.conteudo-senha {
    margin-top: 56px;
    background: var(--painel);
    border: 1px solid rgba(0, 240, 255, 0.25);
    padding: 20px 24px;
    box-shadow: 0 0 24px rgba(255, 46, 138, 0.08) inset;
}

.conteudo-senha > label {
    display: block;
    font-size: 13px;
    letter-spacing: 2px;
    color: var(--ciano);
    text-transform: uppercase;
    margin-bottom: 8px;
}

.campo-senha-linha {
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--painel-claro);
    padding: 12px 16px;
    border-bottom: 3px solid var(--magenta);
}

.prompt {
    font-family: var(--fonte-display);
    font-size: 32px;
    color: var(--verde-term);
}

#campo-senha {
    background: transparent;
    border: none;
    color: var(--texto);
    font-family: var(--fonte-mono);
    font-size: 28px;
    letter-spacing: 2px;
    width: 100%;
    /* line-height maior evita que emojis (mais altos que o texto mono)
       cortem ou espremam a linha do input */
    line-height: 1.4;
}

#campo-senha:focus {
    outline: none;
}

.botao-copiar {
    background: transparent;
    color: var(--ciano);
    border: 1px solid var(--ciano);
    font-family: var(--fonte-mono);
    font-size: 12px;
    letter-spacing: 1px;
    padding: 10px 14px;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s ease, color 0.15s ease;
}

.botao-copiar:hover {
    background: var(--ciano);
    color: var(--fundo);
}

.botao-copiar.copiado {
    background: var(--verde-term);
    border-color: var(--verde-term);
    color: var(--fundo);
}

/* ===========================================================
   PAINEL DE PARÂMETROS
   =========================================================== */
.parametro {
    background-color: var(--painel);
    border: 1px solid rgba(255, 46, 138, 0.3);
    margin-top: 32px;
    padding: 24px;
}

.parametro-titulo {
    font-family: var(--fonte-display);
    font-size: 30px;
    letter-spacing: 1px;
    color: var(--magenta);
    margin-top: 0;
}

.parametro-senha__titulo {
    font-size: 15px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--texto-fraco);
}

.parametro-coluna__senha {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 24px;
}

.parametro-senha {
    width: 100%;
}

.parametro-senha-botoes {
    display: flex;
    justify-content: center;
    align-items: center;
}

.parametro-senha__botao {
    background-color: var(--painel-claro);
    color: var(--ciano);
    border: 1px solid var(--ciano);
    padding: 18px 24px;
    font-family: var(--fonte-display);
    font-size: 26px;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
}

.parametro-senha__botao:hover {
    background: var(--ciano);
    color: var(--fundo);
}

.parametro-senha__texto {
    padding: 18px 24px;
    border-top: 1px solid var(--ciano);
    border-bottom: 1px solid var(--ciano);
    margin: 0;
    font-family: var(--fonte-display);
    font-size: 28px;
    min-width: 48px;
    text-align: center;
}

label {
    font-size: 15px;
}

.parametro-senha-checkbox {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 0;
}

.checkbox {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: var(--magenta);
}

/* ===========================================================
   BARRA DE FORÇA
   =========================================================== */
.barra {
    background-color: var(--painel-claro);
    height: 26px;
    width: 100%;
}

.forca {
    height: 26px;
    position: relative;
    bottom: 26px;
    transition: width 0.25s ease, background-color 0.25s ease;
    box-shadow: 0 0 12px currentColor;
}

.fraca {
    width: 25%;
    background-color: var(--magenta);
    color: var(--magenta);
}

.media {
    background-color: var(--ambar);
    color: var(--ambar);
    width: 50%;
}

.forte {
    background-color: var(--verde-term);
    color: var(--verde-term);
    width: 100%;
}

.parametro-senha-textos {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--texto-fraco);
    margin-top: 6px;
}

.entropia {
    font-size: 13px;
    color: var(--texto-fraco);
    margin-top: 4px;
}

/* ===========================================================
   BOTÃO DE GERAR + RODAPÉ
   =========================================================== */
.botao-gerar {
    display: block;
    width: 100%;
    margin-top: 32px;
    padding: 18px;
    background: var(--magenta);
    color: var(--fundo);
    border: none;
    font-family: var(--fonte-display);
    font-size: 24px;
    letter-spacing: 3px;
    cursor: pointer;
    box-shadow: 0 0 20px rgba(255, 46, 138, 0.5);
    transition: transform 0.1s ease, box-shadow 0.15s ease, background 0.15s ease;
}

.botao-gerar:hover {
    background: var(--ciano);
    box-shadow: 0 0 24px rgba(0, 240, 255, 0.6);
}

.botao-gerar:active {
    transform: scale(0.98);
}

.rodape {
    text-align: center;
    margin-top: 24px;
    font-size: 12px;
    letter-spacing: 1px;
    color: var(--texto-fraco);
    opacity: 0.7;
}

/* ===========================================================
   RESPONSIVO
   =========================================================== */
@media screen and (min-width: 768px) {
    .parametro-coluna__senha {
        flex-direction: row;
        align-items: flex-start;
    }

    .titulo-principal {
        font-size: 80px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .crt-flicker,
    .glitch,
    .glitch::before,
    .glitch::after,
    .boot-linha::before {
        animation: none;
    }
}
