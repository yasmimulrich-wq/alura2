let sketch = (p) => {
    let dados = [];
    let largura = 800;
    let altura = 400;
    let animacao = 0;

    p.setup = function() {
        let container = document.getElementById('sketch-container');
        largura = container.offsetWidth - 40;
        if (largura > 800) largura = 800;
        
        p.createCanvas(largura, altura);
        gerarDados();
    };

    p.draw = function() {
        p.background(15, 20, 25);
        
        // Título do gráfico
        p.fill(255);
        p.textSize(14);
        p.textAlign(p.LEFT);
        p.text('Índice do Mercado (Últimas 30 dias)', 20, 20);

        // Desenha eixos
        desenharEixos();
        
        // Desenha linha do gráfico
        desenharGrafico();
        
        // Desenha pontos de dados
        desenharPontos();
        
        // Anima
        animacao += 0.01;
        if (animacao > 1) animacao = 0;
    };

    function gerarDados() {
        dados = [];
        let valor = 100;
        for (let i = 0; i < 30; i++) {
            valor += p.random(-5, 5);
            valor = p.constrain(valor, 80, 120);
            dados.push(valor);
        }
    }

    function desenharEixos() {
        p.stroke(42, 47, 56);
        p.strokeWeight(1);

        // Eixo X
        p.line(40, altura - 40, largura - 20, altura - 40);
        
        // Eixo Y
        p.line(40, 40, 40, altura - 40);

        // Labels
        p.fill(176, 176, 176);
        p.textSize(11);
        p.textAlign(p.RIGHT);
        
        // Escala Y
        for (let i = 0; i <= 4; i++) {
            let y = altura - 40 - (i * (altura - 80) / 4);
            let valor = 80 + i * 10;
            p.text(valor, 35, y + 4);
            p.stroke(42, 47, 56);
            p.strokeWeight(0.5);
            p.line(38, y, largura - 20, y);
        }
    }

    function desenharGrafico() {
        p.stroke(0, 204, 153);
        p.strokeWeight(3);
        p.noFill();
        
        p.beginShape();
        
        let padX = (largura - 60) / (dados.length - 1);
        let escalaY = (altura - 80) / 40;
        
        for (let i = 0; i < dados.length; i++) {
            let x = 40 + i * padX;
            let y = altura - 40 - (dados[i] - 80) * escalaY;
            p.vertex(x, y);
        }
        
        p.endShape();

        // Preenchimento com gradiente
        p.stroke(0, 204, 153, 50);
        p.fill(0, 102, 204, 30);
        p.beginShape();
        
        for (let i = 0; i < dados.length; i++) {
            let x = 40 + i * padX;
            let y = altura - 40 - (dados[i] - 80) * escalaY;
            p.vertex(x, y);
        }
        
        p.vertex(largura - 20, altura - 40);
        p.vertex(40, altura - 40);
        p.endShape(p.CLOSE);
    }

    function desenharPontos() {
        p.fill(0, 204, 153);
        p.noStroke();
        
        let padX = (largura - 60) / (dados.length - 1);
        let escalaY = (altura - 80) / 40;
        
        for (let i = 0; i < dados.length; i++) {
            let x = 40 + i * padX;
            let y = altura - 40 - (dados[i] - 80) * escalaY;
            p.circle(x, y, 4);
        }
    }

    p.windowResized = function() {
        if (document.getElementById('sketch-container')) {
            let container = document.getElementById('sketch-container');
            largura = container.offsetWidth - 40;
            if (largura > 800) largura = 800;
            p.resizeCanvas(largura, altura);
        }
    };
};

let mySketch = new p5(sketch);