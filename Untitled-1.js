
const form = document.getElementById("formulario");

if (form) {
  const msg = document.getElementById("mensagem-form");

  function mostrar(texto, tipo) {
    msg.textContent = texto;
    msg.className = "mensagem-form " + tipo;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = form.elements["nome"].value.trim();
    const email = form.elements["email"].value.trim();
    const texto = form.elements["mensagem"].value.trim();

    if (nome.length < 3) {
      mostrar("Digite seu nome completo (mínimo 3 letras).", "erro");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      mostrar("Digite um e-mail válido.", "erro");
      return;
    }
    if (texto.length < 10) {
      mostrar("A mensagem precisa ter pelo menos 10 caracteres.", "erro");
      return;
    }

    mostrar("Mensagem enviada com sucesso! Obrigada, " + nome + ".", "sucesso");
    form.reset();
  });
}

const canvas = document.getElementById("meuCanvas");

if (canvas) {
  const ctx = canvas.getContext("2d");
  const CHAVE = "desenho-canvas";
  let desenhando = false;

  // Restaura o desenho salvo
  try {
    const salvo = localStorage.getItem(CHAVE);
    if (salvo) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = salvo;
    }
  } catch (erro) {
    console.warn("localStorage indisponível:", erro);
  }

  function posicao(e) {
    const area = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - area.left) * (canvas.width / area.width),
      y: (e.clientY - area.top) * (canvas.height / area.height)
    };
  }

  canvas.addEventListener("pointerdown", function (e) {
    desenhando = true;
    const p = posicao(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  });

  canvas.addEventListener("pointermove", function (e) {
    if (!desenhando) return;
    const p = posicao(e);
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#8b5a2b";
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  });

  window.addEventListener("pointerup", function () {
    if (!desenhando) return;
    desenhando = false;
    localStorage.setItem(CHAVE, canvas.toDataURL()); // salva
  });

  document.getElementById("limpar").addEventListener("click", function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    localStorage.removeItem(CHAVE);
  });
}

