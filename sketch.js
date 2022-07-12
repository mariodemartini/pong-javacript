//Variaveis da Bolinha
let xBolinha=300;
let yBolinha=200;
let diametro=15;
let raio=diametro/2;

//Velocidade da Bolinha
let velocidadeXBolinha=5;
let velocidadeYBolinha=5;

//Variaveis da Raquete
let xRaquete=5;
let yRaquete=150;
let compRaquete=10;
let alturaRaquete=90;

let xOponente=585;
let yOponente=150;
let velocidadeYOponente;

let colidiu = false;

// Placar do Jogo
let meusPontos=0;
let pontosOponente=0;

let chanceDeErrar=0;

// Sons do Jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
  
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  colisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  colisaoRaquetes(xRaquete, yRaquete);
  mostraRaquete(xOponente, yOponente);
  movimentaRaqueteOponente();
  colisaoRaquetes(xOponente, yOponente);
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function colisaoBorda(){
    if (xBolinha + raio>width || xBolinha - raio<0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio>height || yBolinha - raio<0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y){
  rect(x, y, compRaquete, alturaRaquete)
}  

function movimentaMinhaRaquete() {
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 10;
    }
}

function verificaColisaoRaquete() {
    if (xBolinha - raio < xRaquete + compRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

function colisaoRaquetes(x, y) {
    colidiu = collideRectCircle(x, y, compRaquete, alturaRaquete, xBolinha, yBolinha, raio);
    if (colidiu) {
      velocidadeXBolinha *= -1;
      raquetada.play();
    
    }
}

function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yOponente - compRaquete / 2 - 30;
  yOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar()
    //if (keyIsDown(87)) {
        //yOponente -= 10;
    //}
    //if (keyIsDown(83)) {
        //yOponente += 10;
    //}
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function incluiPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosOponente, 470, 26);
}

function marcaPonto(){
  if (xBolinha>590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha<10){
    pontosOponente +=1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
      xBolinha = 23
    }
    if (xBolinha + raio > 600){
      xBolinha = 580
    }
}
