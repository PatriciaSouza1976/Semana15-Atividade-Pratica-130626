// ====================================
// LOGIN - CONHEÇA BH (VERSÃO SEGURA)
// ====================================

const usuarios = [
  {
    id: 1,
    nome: "Administrador",
    login: "admin",
    senha: "123"
  },
  {
    id: 2,
    nome: "Usuário",
    login: "user",
    senha: "123"
  }
];

// deixa global (caso HTML use onclick)
window.fazerLogin = function () {

  const loginEl = document.getElementById("login");
  const senhaEl = document.getElementById("senha");

  if (!loginEl || !senhaEl) {
    console.error("Campos de login não encontrados.");
    return;
  }

  const login = loginEl.value.trim();
  const senha = senhaEl.value.trim();

  const usuario = usuarios.find(u =>
    u.login === login && u.senha === senha
  );

  if (usuario) {

    sessionStorage.setItem(
      "usuarioCorrente",
      JSON.stringify(usuario)
    );

    alert("Login realizado com sucesso!");

    // volta para raiz com segurança
    window.location.href = "../../index.html";

  } else {
    alert("Login ou senha inválidos");
  }
};