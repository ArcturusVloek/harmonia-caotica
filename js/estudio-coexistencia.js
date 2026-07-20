(() => {
  'use strict';

  if (window.location.pathname.split('/').pop() !== 'construcao-guiada.html') return;
  let host;
  let repairing = false;

  const repair = () => {
    if (!host || repairing) return;
    repairing = true;

    try {
      const steps = host.querySelectorAll('.studio-step');
      steps.forEach((step) => {
        const workshops = [...step.querySelectorAll('.writing-workshop')];
        workshops.slice(0, -1).forEach((panel) => panel.remove());

        /*
         * Oficina de funcionamento e Arquitetura do Poder são ferramentas
         * diferentes. A Oficina não recebe mais a classe complex-builder,
         * pois isso fazia o módulo de Propagação acreditar que a Arquitetura
         * já existia e deixava de montá-la.
         */
        workshops.forEach((workshop) => workshop.classList.remove('complex-builder'));

        const architecturePanels = [...step.querySelectorAll('.complex-builder:not(.writing-workshop)')];
        architecturePanels.slice(1).forEach((panel) => panel.remove());
      });
    } finally {
      repairing = false;
    }
  };

  const start = () => {
    host = document.querySelector('.miracle-studio-host');
    if (!host) {
      window.setTimeout(start, 80);
      return;
    }

    new MutationObserver(repair).observe(host, { childList: true, subtree: true });
    repair();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
