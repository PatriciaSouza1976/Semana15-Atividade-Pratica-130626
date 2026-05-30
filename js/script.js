document.addEventListener("DOMContentLoaded", function () {

  const linkLogin = document.getElementById("linkLogin");

  if (!linkLogin) return;

  linkLogin.addEventListener("click", function (e) {
    e.preventDefault();

    alert("CLICOU FUNCIONOU");

    window.location.href = "./modulos/login/index.html";
  });

});