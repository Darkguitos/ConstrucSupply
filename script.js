function navegarPara(destino) {
  window.location.assign(destino);
}

document.addEventListener("click", (evento) => {
  const elemento =
    evento.target instanceof Element
      ? evento.target.closest("[data-ir-para], [data-voltar], [data-sem-destino]")
      : null;

  if (!elemento) return;
  if (elemento.hasAttribute("data-sem-destino")) {
    evento.preventDefault();
    return;
  }
  if (elemento.hasAttribute("data-voltar")) {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navegarPara(elemento.dataset.destinoAlternativo);
    }
    return;
  }

  evento.preventDefault();
  navegarPara(elemento.dataset.irPara);
});

document.addEventListener("submit", (evento) => {
  if (!(evento.target instanceof HTMLFormElement)) return;

  const formulario = evento.target;
  const tipo = formulario.querySelector('input[name="account_type"]:checked')?.value;
  const destinos = {
    cliente: formulario.dataset.destinoCliente,
    empresa: formulario.dataset.destinoEmpresa,
  };
  const destino = formulario.hasAttribute("data-selecao-cadastro")
    ? destinos[tipo]
    : formulario.dataset.destinoEnvio;

  if (!destino) return;
  evento.preventDefault();
  navegarPara(destino);
});
