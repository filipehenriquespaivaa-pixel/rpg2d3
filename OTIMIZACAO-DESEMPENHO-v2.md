# Otimizações de desempenho (v2) — sem mudar gráficos nem jogabilidade

- Cache de chunks de terreno com LRU e teto dinâmico: corrige o thrash (apagava 101 chunks de uma vez, inclusive visíveis). Zoom afastado: ~700 ms/frame -> ~220 ms/frame, 0 chunks re-pintados por frame.
- Água, gelo/terreno animado e itens do chão só desenhados na área visível (luzes e props seguem com a janela ampla original).
- Cache de tiles com chave numérica (menos strings por getTile).
- Limite de 60 FPS com passo fixo (caixa "Limitar a 60 FPS" no painel ⚙). ATENÇÃO: o movimento do jogo é por frame; sem o limite, em 120/144 Hz o jogo roda mais rápido. Com o limite, em telas de alta taxa ele fica na velocidade de 60 Hz.
- Gráficos: diferença média de pixels 0,0000 em 8 cenários (pior pixel: 1-2 níveis de 255 em deserto/neve).
- Ganho em frame normal é modesto (0-16% conforme a cena, medido em CPU software). Maior custo restante: iluminação noturna, sombras de props e água.
