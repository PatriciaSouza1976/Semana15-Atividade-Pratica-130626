// LOGIN FUNCIONAL - sessionStorage (SEM FORM)

document.addEventListener("DOMContentLoaded", () => {

  const btnLogin = document.getElementById("btnLogin");

  if (!btnLogin) return;

  btnLogin.addEventListener("click", (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");

    if (!emailInput || !senhaInput) {
      alert("Campos de login não encontrados!");
      return;
    }

    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    // 🔐 usuário simulado (igual padrão de sala de aula)
    const usuario = {
      id: 1,
      nome: "Administrador",
      email: "admin@email.com",
      senha: "123"
    };

    // validação
    if (email === usuario.email && senha === usuario.senha) {

      sessionStorage.setItem(
  "usuarioCorrente",
  JSON.stringify({
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    admin: true
  })
);

      alert("Login realizado com sucesso!");

      window.location.href = "index.html";

    } else {
      alert("Email ou senha inválidos!");
    }
  });

});