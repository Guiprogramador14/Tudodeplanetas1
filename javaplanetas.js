const planetas = [
    { nome: "Mercúrio", pagina: "mercurio.html" },
    { nome: "Vênus", pagina: "venus.html" },
    { nome: "Terra", pagina: "terra.html" },
    { nome: "Marte", pagina: "marte.html" },
    { nome: "Júpiter", pagina: "jupiter.html" },
    { nome: "Saturno", pagina: "saturno.html" },
    { nome: "Urano", pagina: "urano.html" },
    { nome: "Netuno", pagina: "netuno.html" }
];


const perguntas = [
    { pergunta: "Qual é o maior planeta do nosso sistema solar?\n 1- Saturno  2- Netuno  3- Júpiter  4- Urano  5- Marte", resposta: "3" },
    { pergunta: "Qual planeta é conhecido como o planeta vermelho?\n 1- Vênus  2- Marte  3- Mercúrio  4- Júpiter  5- Saturno", resposta: "2" },
    { pergunta: "Qual é a estrela mais próxima da Terra sem ser o Sol?\n 1- Proxima Centauri  2- Alpha Centauri  3- Betelgeuse  4- Sirius  5- Vega", resposta: "1" },
    { pergunta: "O que é uma supernova?\n 1- A explosão de uma estrela no final de sua vida, liberando enormes quantidades de energia e criando elementos pesados no processo.\n  2- Uma estrela em estágio inicial de formação, que ainda está acumulando material antes de iniciar a fusão nuclear.\n  3- Um tipo de planeta gasoso que não conseguiu se tornar uma estrela, mantendo características distintas de uma atmosfera densa.\n  4- Um remanescente estelar que se tornou um buraco negro após uma explosão supernova, sendo uma das fases mais extremas da evolução estelar.\n  5- Um fenômeno que ocorre durante a fusão nuclear em estrelas jovens, onde há uma instabilidade que pode levar à explosão de uma supernova.", resposta: "1" },
    { pergunta: "Quantos planetas existem no sistema solar?\n 1- 7 planetas  2- 8 planetas  3- 9 planetas  4- 6 planetas  5- 10 planetas", resposta: "2" },
    { pergunta: "Quem foi o primeiro ser humano a viajar para o espaço?\n 1- Buzz Aldrin  2- Yuri Gagarin  3- John Glenn  4- Valentina Tereshkova  5- Neil Armstrong", resposta: "2" },
    { pergunta: "Qual é a camada mais externa da atmosfera da Terra?\n 1- Troposfera  2- Estratosfera  3- Mesosfera  4- Exosfera  5- Termosfera", resposta: "4" },
    { pergunta: "O que são exoplanetas?\n 1- Planetas que orbitam o sol  2- Planetas que orbitam buracos negros  3- Planetas que não orbitam nenhuma estrela  4- Planetas que orbitam outras estrelas fora do Sistema solar  5- Planetas que orbitam dentro de nebulosas", resposta: "4" },
    { pergunta: "Qual é a principal fonte de energia das estrelas?\n 1- Combustão de gases  2- Fissão Nuclear  3- Energia solar  4- Radiação  5- Fusão Nuclear", resposta: "5" },
    { pergunta: "O que é uma pulsar?\n 1- Estrelas que explodem em supernovas  2- Estrelas de nêutrons que giram rapidamente  3- Estrelas que queimam hidrogênio  4- Estrelas em fusão nuclear estável  5- Estrelas que não emitem radiação", resposta: "2" }
];

// Carrega planetas desbloqueados ao iniciar e organiza automaticamente
document.addEventListener("DOMContentLoaded", () => {
    carregarPlanetasDesbloqueados();
    organizarPlanetas(); // Organiza os planetas logo após o carregamento
});

// Carrega planetas desbloqueados do localStorage e adiciona ao menu
function carregarPlanetasDesbloqueados() {
    const desbloqueados = JSON.parse(localStorage.getItem("planetasDesbloqueados")) || [];
    desbloqueados.forEach(planeta => adicionarLink(planeta));
}

// Adiciona o link de um planeta ao menu, evitando duplicações
function adicionarLink(planeta) {
    const nav = document.getElementById("menuPlanetas");

    // Verifica se o botão já existe no menu
    if (!Array.from(nav.children).some(button => button.textContent === planeta.nome)) {
        const button = document.createElement("button");
        button.textContent = planeta.nome;
        button.onclick = () => window.location.href = planeta.pagina;
        nav.appendChild(button);
    }
}

// Libera um planeta aleatório que ainda não tenha sido desbloqueado
function liberarnovoplaneta() {
    const perguntaAleatoria = perguntas[Math.floor(Math.random() * perguntas.length)];
    let usuarioResposta;

    do {
        usuarioResposta = prompt(perguntaAleatoria.pergunta).trim();
        if (usuarioResposta.toLowerCase() === perguntaAleatoria.resposta) {
            const desbloqueados = JSON.parse(localStorage.getItem("planetasDesbloqueados")) || [];

            // Verifica se todos os planetas já foram desbloqueados
            if (desbloqueados.length === planetas.length) {
                alert("Todos os planetas já foram desbloqueados!");
                return;
            }

            let planeta;
            do {
                const indiceAleatorio = Math.floor(Math.random() * planetas.length);
                planeta = planetas[indiceAleatorio];
            } while (desbloqueados.some(p => p.nome === planeta.nome));

            // Exibe o nome do planeta liberado, adiciona ao menu e salva no localStorage
            document.getElementById("planetaLiberado").textContent = "Planeta liberado: " + planeta.nome;
            adicionarLink(planeta);
            salvarPlanetaDesbloqueado(planeta);

            setTimeout(() => {
                window.location.href = planeta.pagina;
            }, 1000);
            break;
        } else {
            alert("Resposta errada! Tente novamente.");
        }
    } while (true);
}

// Salva o planeta desbloqueado no localStorage
function salvarPlanetaDesbloqueado(planeta) {
    let desbloqueados = JSON.parse(localStorage.getItem("planetasDesbloqueados")) || [];
    desbloqueados.push(planeta);
    localStorage.setItem("planetasDesbloqueados", JSON.stringify(desbloqueados));
}

// Organiza os planetas no menu na ordem do Sistema Solar
function organizarPlanetas() {
    const nav = document.getElementById("menuPlanetas");
    while (nav.firstChild) {
        nav.removeChild(nav.firstChild);
    }

    // Botão do Sistema Solar sempre presente
    const sistemaSolarButton = document.createElement("button");
    sistemaSolarButton.textContent = "Sistema Solar";
    sistemaSolarButton.onclick = () => window.location.href = 'index.html';
    nav.appendChild(sistemaSolarButton);

    const desbloqueados = JSON.parse(localStorage.getItem("planetasDesbloqueados")) || [];

    // Organiza os planetas na ordem do array `planetas`, e filtra os desbloqueados
    planetas.forEach(planeta => {
        if (desbloqueados.some(d => d.nome === planeta.nome)) {
            adicionarLink(planeta);
        }
    });
}