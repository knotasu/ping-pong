const pCanvas = document.getElementById("pongCanvas");
const pCtx = pCanvas ? pCanvas.getContext("2d") : null;
let player = { x: 125, y: 380, w: 50, h: 10, score: 0 };
let cpu = { x: 125, y: 10, w: 50, h: 10, score: 0 };
let ball = { x: 150, y: 200, r: 7, speedX: 3, speedY: 3 }, pongInterval = null;

function drawPong() {
    pCtx.fillStyle = "black"; pCtx.fillRect(0, 0, pCanvas.width, pCanvas.height);
    pCtx.fillStyle = "#01ffff"; pCtx.fillRect(player.x, player.y, player.w, player.h);
    pCtx.fillStyle = "#ff71ce"; pCtx.fillRect(cpu.x, cpu.y, cpu.w, cpu.h);
    pCtx.fillStyle = "white"; pCtx.beginPath(); pCtx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2); pCtx.fill();
    ball.x += ball.speedX; ball.y += ball.speedY;
    if (ball.x < 0 || ball.x > pCanvas.width) ball.speedX *= -1;
    cpu.x += (ball.x - (cpu.x + cpu.w/2)) * 0.1;
    if (ball.y + ball.r > player.y && ball.x > player.x && ball.x < player.x + player.w) { ball.speedY *= -1; reproducirSonido('blip'); }
    if (ball.y - ball.r < cpu.y + cpu.h && ball.x > cpu.x && ball.x < cpu.x + cpu.w) { ball.speedY *= -1; reproducirSonido('blip'); }
    if (ball.y < 0) { player.score++; lanzarMensajeNeon("¡PUNTO!", "neon-verde"); resetBall(); }
    if (ball.y > pCanvas.height) { cpu.score++; lanzarMensajeNeon("¡PUNTO!", "neon-rojo"); resetBall(); }
    document.getElementById("pong-score").innerText = `TÚ: ${player.score} | CPU: ${cpu.score}`;
}

function resetBall() { ball.x = 150; ball.y = 200; ball.speedY *= -1; }

function togglePong() {
    const btn = document.getElementById("btn-pong-start");
    if (!pongInterval) { pongInterval = setInterval(drawPong, 1000/60); btn.innerText = "PAUSAR"; }
    else { clearInterval(pongInterval); pongInterval = null; btn.innerText = "CONTINUAR"; }
}
