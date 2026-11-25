// ===================================================================
// NEURO-ABRAÇO • SAÚDE PÚBLICA & ODS 3 (FMU)
// Lógica de Interatividade, Navegação SPA e Acessibilidade
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Inicialização da navegação SPA por hash na URL
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    mostrarPagina(hash);
  } else {
    mostrarPagina('index');
  }

  // Toggle do menu mobile
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('ativa');
    });
  }

  // Controles de Acessibilidade: Tamanho de fonte
  let fontSizeAtual = 16;
  const btnFonteMais = document.getElementById('btn-fonte-mais');
  const btnFonteMenos = document.getElementById('btn-fonte-menos');
  const btnModoCalmo = document.getElementById('btn-modo-calmo');

  if (btnFonteMais) {
    btnFonteMais.addEventListener('click', () => {
      if (fontSizeAtual < 22) {
        fontSizeAtual += 1.5;
        document.documentElement.style.setProperty('--tamanho-base-fonte', `${fontSizeAtual}px`);
      }
    });
  }

  if (btnFonteMenos) {
    btnFonteMenos.addEventListener('click', () => {
      if (fontSizeAtual > 13) {
        fontSizeAtual -= 1.5;
        document.documentElement.style.setProperty('--tamanho-base-fonte', `${fontSizeAtual}px`);
      }
    });
  }

  // Controles de Acessibilidade: Modo Calmo (redução de ruído sensorial)
  if (btnModoCalmo) {
    btnModoCalmo.addEventListener('click', () => {
      document.body.classList.toggle('modo-calmo');
      const ativo = document.body.classList.contains('modo-calmo');
      btnModoCalmo.innerText = ativo ? '🌿 Modo Normal' : '🌿 Modo Calmo';
    });
  }
});

/**
 * Função de navegação SPA (Single Page Application)
 * @param {string} id - ID da seção a ser exibida
 */
function mostrarPagina(id) {
  const paginas = document.querySelectorAll('.pagina');
  let paginaAlvo = document.getElementById(id);

  if (!paginaAlvo) {
    paginaAlvo = document.getElementById('index');
    id = 'index';
  }

  paginas.forEach(p => {
    p.classList.remove('ativa');
    p.style.display = 'none';
  });

  paginaAlvo.style.display = 'block';
  paginaAlvo.classList.add('ativa');

  // Rola suavemente para o topo do conteúdo
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Atualiza hash da URL sem recarregar a página
  history.pushState(null, '', `#${id}`);

  // Fecha o menu mobile se estiver aberto
  const navLinks = document.getElementById('nav-links');
  if (navLinks && navLinks.classList.contains('ativa')) {
    navLinks.classList.remove('ativa');
  }
}

/**
 * Simulador de Rota Interativa no SUS
 * @param {'suspeita' | 'reabilitacao' | 'crise'} tipo
 */
function exibirRota(tipo) {
  const painel = document.getElementById('resultado-rota');
  if (!painel) return;

  painel.style.display = 'block';

  let conteudo = '';

  switch (tipo) {
    case 'suspeita':
      conteudo = `
        <strong>👶 1º Passo: Consulta na Unidade Básica de Saúde (UBS) do Bairro</strong><br>
        Agende uma consulta com o médico pediatra ou de saúde da família na UBS mais próxima da sua residência. 
        Relate os marcos do desenvolvimento infantil observados (atraso na fala, contato visual diminuído, desregulação sensorial). 
        O médico iniciará a triagem inicial e emitirá o encaminhamento para a especialidade necessária ou CER via regulação SUS (SIGA Saúde).
      `;
      break;
    case 'reabilitacao':
      conteudo = `
        <strong>🧩 2º Passo: Atendimento no CER (Centro Especializado em Reabilitação)</strong><br>
        Com o encaminhamento ou relatório em mãos, a UBS insere o pedido no sistema de regulação para o CER de referência da sua região. 
        No CER, a pessoa autista terá acesso a equipe multiprofissional (Fonoaudiologia, Terapia Ocupacional com foco em Integração Sensorial, Psicologia e Fisioterapia), 
        garantindo terapias contínuas e gratuitas.
      `;
      break;
    case 'crise':
      conteudo = `
        <strong>⚠️ 3º Passo: Acolhimento Imediato no CAPSi (Porta Aberta)</strong><br>
        Para situações de sofrimento psíquico agudo, crises emocionais severas, desregulação extrema ou conflitos familiares intensos, 
        você <strong>NÃO precisa de agendamento ou encaminhamento</strong>. Dirija-se diretamente ao CAPSi (Centro de Atenção Psicossocial Infantojuvenil) 
        mais próximo do seu município para acolhimento e triagem no mesmo dia.
      `;
      break;
  }

  painel.innerHTML = conteudo;
}
