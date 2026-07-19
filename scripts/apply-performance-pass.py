#!/usr/bin/env python3
from __future__ import annotations

import runpy
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CORE = ROOT / "scripts/apply-performance-pass-core.py"
SELF = ROOT / "scripts/apply-performance-pass.py"


def patch(path: str, old: str, new: str) -> None:
    target = ROOT / path
    text = target.read_text(encoding="utf-8")
    if old not in text:
        raise SystemExit(f"Trecho não encontrado em {path}: {old[:120]}")
    target.write_text(text.replace(old, new, 1), encoding="utf-8")


def integrate() -> None:
    patch(
        "sistemas/index.html",
        '<div class="system-journey__step"><div><strong>Consulte regras específicas</strong><p>Abra Criações, Propagação, Travessias, Transformações, Controle, Recursos, Informação, Proteção, Dano ou Cura somente quando forem relevantes.</p></div></div>',
        '<div class="system-journey__step"><div><strong>Consulte regras específicas</strong><p>Abra Criações, Propagação, Travessias, Transformações, Controle, Recursos, Informação, Proteção, Dano, Cura ou Custos e Reservas somente quando forem relevantes.</p></div></div>',
    )
    bloco10_portal = '<a class="system-category-card" href="protecao-neutralizacao-e-interacao-entre-milagres.html"><span class="system-level" data-level="construction-advanced">Construção avançada</span><p class="system-category-card__eyebrow">Registro editorial: Bloco 10</p><h3>Proteção, Neutralização e Interação</h3><p>Para defesas sobrenaturais, Supressão, Dissipação, Redirecionamento, Reflexão e disputas.</p><span class="system-card-action">Ler Proteção →</span></a>'
    patch(
        "sistemas/index.html",
        bloco10_portal,
        bloco10_portal + '\n          <a class="system-category-card" href="custos-reservas-sacrificios-e-recuperacao.html"><span class="system-level" data-level="construction-advanced">Construção avançada</span><p class="system-category-card__eyebrow">Registro editorial: Bloco 14</p><h3>Custos, Reservas, Sacrifícios e Recuperação</h3><p>Para pagamentos, manutenção, armazenamento, Recarga, Conversão e bloqueios sacrificiais.</p><span class="system-card-action">Ler Custos e Reservas →</span></a>',
    )

    bloco10_biblioteca = '<a class="system-category-card" href="protecao-neutralizacao-e-interacao-entre-milagres.html"><span class="system-level" data-level="construction-advanced">Construção avançada</span><p class="system-category-card__eyebrow">Registro editorial: Bloco 10</p><h3>Proteção, Neutralização e Interação entre Milagres</h3><p>Para Redução, Supressão, Dissipação, Redirecionamento, Reflexão e proteção de funções.</p><span class="system-card-action">Ler capítulo →</span></a>'
    patch(
        "sistemas/biblioteca.html",
        bloco10_biblioteca,
        bloco10_biblioteca + '\n          <a class="system-category-card" href="custos-reservas-sacrificios-e-recuperacao.html"><span class="system-level" data-level="construction-advanced">Construção avançada</span><p class="system-category-card__eyebrow">Registro editorial: Bloco 14</p><h3>Custos, Reservas, Sacrifícios e Recuperação</h3><p>Para custos em Vida ou Resistência, manutenção, Reservas, Recarga, Conversão e Sacrifícios.</p><span class="system-card-action">Ler capítulo →</span></a>',
    )
    matriz_anchor = '<tr><td>Compartilhar um pool</td><td>Fundamentos + Alcance + Fusão de Recursos.</td></tr>'
    patch(
        "sistemas/biblioteca.html",
        matriz_anchor,
        matriz_anchor + '''
          <tr><td>Pagar Vida, Resistência ou Reserva</td><td>Custos e Reservas, com pagador, quantidade e momento registrados.</td></tr>
          <tr><td>Manter uma aplicação com combustível</td><td>Custos e Reservas, com manutenção e marco objetivo.</td></tr>
          <tr><td>Criar ou recarregar Reserva</td><td>Fundamentos + Custos e Reservas; adicione fonte e Potência à Recarga.</td></tr>
          <tr><td>Recuperar Uso, Passo ou Mudança</td><td>Custos e Reservas, com Recarga discreta e fonte numérica suficiente.</td></tr>
          <tr><td>Converter recurso armazenado</td><td>Custos e Reservas, na função Conversão.</td></tr>
          <tr><td>Utilizar Sacrifício</td><td>Custos e Reservas, com vínculo, liberação e Alimentação Sacrificial quando houver combustível.</td></tr>''',
    )

    patch(
        "sistemas/consulta-rapida.html",
        "Encontre custos, valores e limites dos treze capítulos publicados sem reler toda a explicação.",
        "Encontre custos, valores e limites dos quatorze capítulos publicados sem reler toda a explicação.",
    )
    quick_nav = '      <nav class="article-navigation" aria-label="Navegação da página"><a href="index.html">Voltar ao Portal</a><a href="biblioteca.html">Abrir Biblioteca</a></nav>'
    quick_section = '''      <section class="domain-section" id="custos-reservas-sacrificios" aria-labelledby="titulo-custos-consulta">
        <p class="section-kicker">Pagamento e recuperação</p><h2 id="titulo-custos-consulta">Custos, Reservas, Sacrifícios e Recuperação</h2>
        <details class="system-quick-group" open><summary>Funções principais</summary><div class="system-quick-group__content"><div class="table-wrap"><table><thead><tr><th>Função</th><th>Custo</th></tr></thead><tbody><tr><td>Pagamento dividido</td><td>1</td></tr><tr><td>Recurso alternativo</td><td>1 por alternativa</td></tr><tr><td>Pagamento Terminal</td><td>5</td></tr><tr><td>Recarga de Reserva</td><td>1</td></tr><tr><td>Recarga de capacidade discreta</td><td>5</td></tr><tr><td>Recarga Condicionada</td><td>3</td></tr><tr><td>Conversão</td><td>3</td></tr><tr><td>Alimentação Sacrificial</td><td>3</td></tr><tr><td>Autoridade sobre Sacrifício</td><td>7</td></tr></tbody></table></div></div></details>
        <details class="system-quick-group" open><summary>Recuperação passiva</summary><div class="system-quick-group__content"><div class="table-wrap"><table><thead><tr><th>Recuperação completa</th><th>Custo</th></tr></thead><tbody><tr><td>Após 8 horas</td><td>0</td></tr><tr><td>Após 1 hora</td><td>1</td></tr><tr><td>Após 10 minutos</td><td>3</td></tr><tr><td>Após 1 minuto</td><td>5</td></tr></tbody></table></div><p>Cada compra afeta uma categoria específica: Usos, Passos, Mudanças ou uma Reserva determinada.</p></div></details>
        <details class="system-quick-group"><summary>Capacidade comum de Reserva</summary><div class="system-quick-group__content"><div class="table-wrap"><table><thead><tr><th>Grau</th><th>Capacidade</th></tr></thead><tbody><tr><td>1</td><td>4</td></tr><tr><td>2</td><td>8</td></tr><tr><td>3</td><td>12</td></tr><tr><td>4</td><td>16</td></tr><tr><td>5</td><td>20</td></tr><tr><td>6</td><td>24</td></tr><tr><td>7</td><td>28</td></tr></tbody></table></div></div></details>
        <div class="domain-guide"><p>Custos comprometidos não retornam.</p><p>Nenhum recurso fica negativo.</p><p>Duração não paga manutenção.</p><p>Nova ativação não recupera capacidades discretas.</p><p>Recarga exige fonte válida.</p><p>Conversão comum funciona de um para um.</p><p>Sacrifício bloqueia parte do máximo recuperável.</p><p>Retorno não remove Sacrifícios.</p></div>
        <div class="system-inline-actions"><a href="custos-reservas-sacrificios-e-recuperacao.html">Entender Custos e Reservas por completo</a></div>
      </section>

'''
    patch("sistemas/consulta-rapida.html", quick_nav, quick_section + quick_nav)

    patch(
        "sistemas/construcao-guiada.html",
        "Somente capacidades cobertas pelos treze blocos publicados podem ser finalizadas como regra oficial.",
        "Somente capacidades cobertas pelos quatorze blocos publicados podem ser finalizadas como regra oficial.",
    )
    patch(
        "sistemas/construcao-guiada.html",
        "Permanência verdadeira, alteração direta de memória e conversão entre recursos ainda dependem de capítulos futuros.",
        "Permanência verdadeira e alteração direta de memória ainda dependem de capítulos futuros.",
    )
    recovery_card = '<div class="system-category-card"><p class="system-category-card__eyebrow">Recuperação</p><h3>Curar, restaurar ou retornar</h3><p>Restaurar Vida ou Resistência, tratar Ferimentos, encerrar Condições, regenerar estruturas ou realizar Retorno.</p></div>'
    patch(
        "sistemas/construcao-guiada.html",
        recovery_card,
        recovery_card + '\n          <div class="system-category-card"><p class="system-category-card__eyebrow">Preço e combustível</p><h3>Pagar, armazenar ou sacrificar</h3><p>Definir custos, manutenção, Reservas, Recarga, Conversão, Recuperação e Sacrifícios.</p></div>',
    )
    cure_link = '<a href="cura-regeneracao-morte-e-retorno.html">Ler Cura e Retorno</a>'
    patch(
        "sistemas/construcao-guiada.html",
        cure_link,
        cure_link + '<a href="custos-reservas-sacrificios-e-recuperacao.html">Ler Custos e Reservas</a>',
    )
    memory_row = '<tr><td>Apaga ou reescreve memória?</td><td>Aguarde o capítulo especializado.</td></tr>'
    patch(
        "sistemas/construcao-guiada.html",
        memory_row,
        '''<tr><td>Paga Vida, Resistência, Reserva ou capacidade?</td><td>Consulte Custos e registre pagador, quantidade e momento.</td></tr>
          <tr><td>Exige manutenção?</td><td>Registre o marco, a prioridade e o resultado da falta de pagamento.</td></tr>
          <tr><td>Armazena recurso?</td><td>Registre Reserva, categoria, capacidade, origem, consumo e Duração.</td></tr>
          <tr><td>Recupera Uso, Passo ou Mudança?</td><td>Adicione Recarga discreta, Potência e fonte numérica suficiente.</td></tr>
          <tr><td>Converte recurso?</td><td>Adicione Conversão; mover o recurso também exige Transferência.</td></tr>
          <tr><td>Utiliza Sacrifício?</td><td>Registre bloqueio, vínculo, liberação e Alimentação Sacrificial quando houver combustível.</td></tr>
          ''' + memory_row,
    )
    patch(
        "sistemas/construcao-guiada.html",
        '<p>Retorno possui identidade, receptáculo e janela?</p><p>Qual é o custo total?</p>',
        '<p>Retorno possui identidade, receptáculo e janela?</p><p>Quem paga cada custo e em qual momento?</p><p>A Reserva declara categoria, capacidade e fonte?</p><p>A Recarga consome fonte válida?</p><p>O Sacrifício declara vínculo e liberação?</p><p>Qual é o custo total?</p>',
    )
    patch(
        "sistemas/construcao-guiada.html",
        '<p>Retorno não duplica identidade nem cria corpo gratuito.</p><p>O custo total respeita o Rank.</p>',
        '<p>Retorno não duplica identidade nem cria corpo gratuito.</p><p>Custos possuem recurso, pagador, quantidade e momento.</p><p>Manutenção possui marco objetivo.</p><p>Reservas possuem categoria e capacidade.</p><p>Recarga não recupera o próprio Uso na mesma cadeia.</p><p>Conversão não cria recurso.</p><p>Sacrifícios bloqueiam o máximo recuperável correspondente.</p><p>O custo total respeita o Rank.</p>',
    )

    old_nav = '<nav class="article-navigation" aria-label="Navegação da página"><a href="dano-ferimentos-condicoes-e-derrota.html">Bloco 12: Dano e Derrota</a><a href="index.html">Voltar aos Sistemas</a></nav>'
    new_nav = '<nav class="article-navigation" aria-label="Navegação da página"><a href="dano-ferimentos-condicoes-e-derrota.html">Bloco 12: Dano e Derrota</a><a href="custos-reservas-sacrificios-e-recuperacao.html">Bloco 14: Custos e Reservas</a><a href="index.html">Voltar aos Sistemas</a></nav>'
    patch("sistemas/cura-regeneracao-morte-e-retorno.html", old_nav, new_nav)


def remove_temporaries() -> None:
    for relative in (
        ".github/workflows/publicar-bloco-14.yml",
        "sistemas/.bloco-14-trigger.html",
        "sistemas/bloco-14-trigger.html",
        "sistemas/bloco-14-trigger-2.html",
        "scripts/publish-block-14.py",
    ):
        target = ROOT / relative
        if target.exists():
            target.unlink()


def main() -> int:
    core_text = CORE.read_text(encoding="utf-8")
    integrate()
    remove_temporaries()
    namespace = runpy.run_path(str(CORE), run_name="performance_core")
    result = int(namespace["main"]())
    SELF.write_text(core_text, encoding="utf-8")
    CORE.unlink()
    return result


if __name__ == "__main__":
    raise SystemExit(main())
