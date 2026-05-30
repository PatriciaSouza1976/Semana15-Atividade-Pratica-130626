// ====================================
// LOGIN - CONHEÇA BH
// ====================================

document.addEventListener("DOMContentLoaded", function () {

  const btnLogin = document.getElementById("btnLogin");
  const linkLogin = document.getElementById("linkLogin");

  // usuários simulados
  const usuarios = [
    { id: 1, nome: "Administrador", login: "admin", senha: "123" },
    { id: 2, nome: "Usuário", login: "user", senha: "123" }
  ];

  // função de login (caso use botão em página de login)
  window.fazerLogin = function () {

    const login = document.getElementById("login")?.value;
    const senha = document.getElementById("senha")?.value;

    const usuario = usuarios.find(u =>
      u.login === login && u.senha === senha
    );

    if (usuario) {

      sessionStorage.setItem(
        "usuarioCorrente",
        JSON.stringify(usuario)
      );

      alert("Login realizado com sucesso!");

      window.location.href = "../../index.html";

    } else {
      alert("Login ou senha inválidos");
    }
  };

  // clique no menu "Entrar" (INDEX PRINCIPAL)
  if (linkLogin) {

    linkLogin.addEventListener("click", function (e) {
      e.preventDefault();

      window.location.href = "modulos/login/index.html";
    });

  }

});