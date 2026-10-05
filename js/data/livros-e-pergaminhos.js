/* js/data/livros-e-pergaminhos.js
 * Conteúdo completo, páginas, receitas e dados dos Livros e Pergaminhos do mundo.
 * Suporta livros de Culinária (Vol I e II), Ferramentas Primitivas, Construção Básica,
 * Armas e Equipamentos Comuns, Pergaminho Rúnico Sagrado (Círculos e Triângulos),
 * Catálogo de Recursos da Terra, Atlas de Biomas e Bestiário de Criaturas.
 * Padrão global: window.Game.BooksAndScrolls
 */
"use strict";

window.Game = window.Game || {};

(function (G) {
  // Catálogo com todo o conteúdo formatado em páginas para Livros e seções para Pergaminhos
  const BOOKS_AND_SCROLLS_DB = {
    // 1. LIVRO DE CULINÁRIA - VOLUME I
    culinaria_vol1: {
      type: "book",
      id: "item_livro_culinaria_1",
      name: "Livro de Culinária — Volume I: Pratos Rústicos e Assados",
      shortTitle: "Culinária Rústica (Vol. I)",
      author: "Mestre Gastrônomo Teodoro de Delfos",
      coverColor: "#9a3412", // Terracota / Couro avermelhado
      accentColor: "#fbbf24",
      icon: "📖",
      rarity: "incomum",
      description: "Compêndio gastronômico com receitas tradicionais de fogueira e forno de barro. Contém instruções para pães, peixes no espeto, carnes defumadas e caldos silvestres.",
      value: 135,
      pages: [
        {
          chapter: "Prefácio Gastrônomo",
          title: "A Arte das Brasas & Sabores da Terra",
          subtitle: "Volume I — O Fogo como Primeiro Alquimista",
          content: `Nas terras selvagens, alimentar-se é mais que sobrevivência: é renovar o espírito e temperar a resistência do corpo.
          
O viajante prudente jamais despreza o poder de uma fogueira acesa. O calor brando das brasas transforma ingredientes ásperos em manjares revitalizantes.
          
Este primeiro volume reúne o conhecimento das cozinhas rústicas dos povoados e acampamentos de caçadores. Domine o ponto do fogo e jamais temerás a fome nem o cansaço.`,
          flavor: "“A paciência diante das brasas é o tempero mais nobre da culinária.” — Provérbio dos Caçadores",
        },
        {
          chapter: "Receita I — Panificação",
          title: "Pão Rústico de Trigo e Sementes",
          subtitle: "Cozido sob Cinzas Quentes ou Forno de Barro",
          content: `🌾 INGREDIENTES:
• 3 porções de Grãos de Trigo Seco triturados em pedra
• 1 medida de Água fresca de nascente cristalina
• Pitada de Sal mineral colhido nas rochas

🔥 PREPARO:
Misture a farinha rústica com a água até formar uma massa consistente e elástica. Molde em formato de disco achatado. Aqueça uma pedra chata na fogueira ou use o Forno de Barro. Asse por 2 minutos até a crosta dourar e chiar.

✨ EFEITO VITAL:
Restaura +65 Pontos de Vida instantaneamente e concede +80 de Stamina ao viajante.`,
          flavor: "Dica: Conserve o pão envolvido em folhas largas de bananeira para mantê-lo fresco por dias.",
        },
        {
          chapter: "Receita II — Frutos das Águas",
          title: "Peixe na Brasa ao Ramo de Alecrim",
          subtitle: "Assado Tradicional no Espeto de Carvalho",
          content: `🐟 INGREDIENTES:
• 1 Peixe fresco (Lambari, Tilápia, Cascudo ou Truta dos riachos)
• 1 Galho seco de Carvalho para espeto
• Folhas frescas de alecrim e ervas da campina

🔥 PREPARO:
Limpe as escamas com uma faca afiada de pedra ou ferro. Atravesse o galho no sentido longitudinal. Posicione sobre as chamas a 2 palmos da brasa viva. Gire lentamente a cada 15 segundos até a pele soltar aroma defumado inconfundível.

✨ EFEITO VITAL:
Restaura +70 de Vida e fornece +90 de Stamina. Fortalece o fôlego para corridas prolongadas.`,
          flavor: "Aviso: Peixe cru pode causar desconforto estomacal; sempre asse nas chamas antes de comer.",
        },
        {
          chapter: "Receita III — Carnes da Caça",
          title: "Carne de Caça Seca & Defumada",
          subtitle: "Provisão de Longa Jornada para Mochilas",
          content: `🥩 INGREDIENTES:
• Fatias finas de Carne de Coelho ou Cervo nobre
• Resina aromática de pinheiro e sal mineral grosso

🔥 PREPARO:
Corte a carne em tiras delgadas de um dedo de espessura. Suspenda-as em uma grelha de gravetos sobre fumaça fria por pelo menos 1 hora. A desidratação gradual preserva todos os nutrientes sem estragar na mochila.

✨ EFEITO VITAL:
Proporciona +85 de Vida e +60 de Stamina de forma contínua, sendo o alimento definitivo para expedições profundas em cavernas e ruínas.`,
          flavor: "Dura semanas sem perder o sabor marcante e a maciez fibrosa.",
        },
        {
          chapter: "Receita IV — Caldeirão de Ervas",
          title: "Caldo Silvestre de Cogumelos & Raízes",
          subtitle: "Tônico Aquecedor para Noites Gélidas",
          content: `🍄 INGREDIENTES:
• 2 Cogumelos marrons comestíveis da floresta
• 1 Raiz aromática triturada
• 1 Jarro de cerâmica com água pura

🔥 PREPARO:
Aproxime-se de um caldeirão ou pote cerâmico colocado sobre brasas incandescentes. Ferva a água até borbulhar e adicione os cogumelos fatiados e as raízes. Cozinhe em fogo brando até o caldo adquirir coloração dourada e brilhante.

✨ EFEITO VITAL:
Recupera +50 de Vida e acelera a regeneração natural de Stamina durante 3 minutos inteiros.`,
          flavor: "Indispensável ao cruzar biomas montanhosos de neve e ventos cortantes.",
        },
        {
          chapter: "Encerramento do Volume I",
          title: "Conselhos do Mestre das Panelas",
          subtitle: "O Caminho Rumo ao Segundo Volume",
          content: `Quem domina o pão, o peixe no espeto, a carne defumada e o caldo de raízes já é capaz de sobreviver em qualquer canto deste mundo.
          
Entretanto, a verdadeira alta gastronomia helênica vai além: banquetes nobres com carnes marinadas, tortas doces de bagas da floresta e néctares raros são detalhados no **Volume II: Banquetes e Elixires Gastronômicos**.
          
Mantenha seus potes de cerâmica sempre limpos e suas pederneiras sempre secas!`,
          flavor: "Registrado com tinta de noz-de-galha na Biblioteca de Delfos.",
        },
      ],
    },

    // 2. LIVRO DE CULINÁRIA - VOLUME II
    culinaria_vol2: {
      type: "book",
      id: "item_livro_culinaria_2",
      name: "Livro de Culinária — Volume II: Banquetes e Elixires Gastronômicos",
      shortTitle: "Banquetes & Elixires (Vol. II)",
      author: "Mestre Gastrônomo Teodoro de Delfos",
      coverColor: "#831843", // Vinho nobre / Púrpura imperial
      accentColor: "#f472b6",
      icon: "📕",
      rarity: "raro",
      description: "Segunda parte do compêndio culinário. Revela banquetes nobres, tortas de bagas silvestres, geleias energéticas do oásis e a lendária Ambrosia dos deuses.",
      value: 180,
      pages: [
        {
          chapter: "Prólogo Imperial",
          title: "Os Festins dos Reis e Sábios",
          subtitle: "Volume II — A Alquimia da Boa Mesa",
          content: `Se o primeiro volume ensinou a manter o fôlego da sobrevivência, este segundo volume consagra a culinária como arte divina.
          
Na corte dos heróis antigos, guerreiros não partiam para combater feras temíveis sem antes partilharem de um Banquete Nobre. As combinações aqui transcritas fortalecem a fibra muscular e aguçam a visão noturna.
          
Reúna caldeirões de bronze, frutas raras dos oásis e mel puro da mata densa.`,
          flavor: "“O banquete certo antes da batalha vale por dez escudos reforçados.” — Arquitas de Tarento",
        },
        {
          chapter: "Receita V — O Grande Prato",
          title: "Banquete dos Campeões",
          subtitle: "O Festim Completo para Batalhas Épicas",
          content: `👑 INGREDIENTES:
• 1 Peça suculenta de Carne de Cervo nobre
• 1 Truta dourada grelhada no carvalho
• 2 Pães rústicos fatiados
• Ramos frescos de alecrim e folhas medicinais

🔥 PREPARO:
Em mesa ampla de banquete ou sobre pedras polidas ao lado de uma grande fogueira, sirva a carne assada em lascas sobre os pães aquecidos, guarnecendo com a truta desossada e as ervas silvestres.

✨ EFEITO VITAL:
Aumenta a Vida Máxima temporariamente e regenera +150 HP e +150 Stamina instantaneamente.`,
          flavor: "O prato predileto dos campeões da arena helênica antes das grandes provações.",
        },
        {
          chapter: "Receita VI — Doçura da Floresta",
          title: "Torta Silvestre de Bagas & Mel",
          subtitle: "Sobremesa Nobre de Energia Inesgotável",
          content: `🥧 INGREDIENTES:
• Massa fina de trigo cozido ao sol
• Punhado de Amoras e Bagas roxas colhidas nas matas
• Favo de Mel silvestre gotejante

🔥 PREPARO:
Forre o fundo de uma tigela cerâmica com a massa de farinha. Amasse as bagas até formarem uma polpa rubra e espessa. Cubra generosamente com mel e asse no Forno de Barro até caramelizar as bordas.

✨ EFEITO VITAL:
Cura toda a fadiga, restaura 100% da Stamina do personagem e concede regeneração rápida de energia ao caminhar.`,
          flavor: "O perfume adocicado atrai borboletas e acalma os ânimos após dias de combate.",
        },
        {
          chapter: "Receita VII — Oásis do Deserto",
          title: "Geleia Energética de Frutas Raras",
          subtitle: "Concentrado Revigorante das Palmeiras do Deserto",
          content: `🍯 INGREDIENTES:
• Frutas doces colhidas nas palmeiras de Oásis cristalinos
• Resina adocicada de acácia
• Água pura de nascente subterrânea

🔥 PREPARO:
Em panela cerâmica ou caldeirão de barro, reduza as frutas em fogo brando por tempo prolongado, mexendo com colher de madeira até espessar. Guarde em pequenos frascos cerâmicos herméticos.

✨ EFEITO VITAL:
Aumenta a velocidade de movimento do herói em +25% por 5 minutos, além de revigorar a mente contra o calor opressivo do deserto.`,
          flavor: "Um pequeno frasco cabe em qualquer bolso do cinto de equipamentos.",
        },
        {
          chapter: "Receita VIII — O Caldo Supremo",
          title: "Ensopado Lendário dos Caçadores",
          subtitle: "Cozimento Lento de Ossos, Carne e Raízes",
          content: `🍲 INGREDIENTES:
• Ossos grandes de fera com tutano rico
• Pedaços nobres de carne de caça
• Raízes de mandrágora e cogumelos luminescentes
• Água fervente temperada com sal de rocha

🔥 PREPARO:
Cozinhe lentamente por vários minutos no caldeirão. O tutano derrete na água e as propriedades dos cogumelos criam um brilho azulado sutil na superfície do caldo.

✨ EFEITO VITAL:
Torna o corpo imune ao atordoamento causado por golpes pesados e cura ferimentos profundos (+120 Vida).`,
          flavor: "Bebido fumegante nas noites mais escuras sob as estrelas ancestrais.",
        },
        {
          chapter: "O Mito dos Deuses",
          title: "A Ambrosia Divina",
          subtitle: "O Alimento dos Imortais do Olimpo",
          content: `Dizem os pergaminhos preservados nos templos que acima das nuvens os deuses não comem o trigo da terra, mas sim a *Ambrosia* — substância de doçura celestial e pureza absoluta.
          
Quem prova deste néctar esquece a dor, o envelhecimento e o medo da derrota. Os ingredientes exatos pertencem aos rituais arcanos das ruínas ocultas.
          
Que estas receitas guiem sua jornada pelas terras infinitas!`,
          flavor: "Fim do Compêndio Culinário Completo (Volumes I & II).",
        },
      ],
    },

    // 3. PERGAMINHO DE FERRAMENTAS PRIMITIVAS
    ferramentas_primitivas: {
      type: "scroll",
      id: "item_pergaminho_ferramentas_primitivas",
      name: "Pergaminho de Ferramentas Primitivas",
      shortTitle: "Ferramentas Primitivas",
      author: "Papiro Antigo dos Primeiros Nômades",
      scrollTheme: "primitive",
      accentColor: "#f59e0b",
      icon: "📜",
      rarity: "comum",
      description: "Rolo de papiro rústico descrevendo o lascamento de pedra, machados de sílex, picaretas primitivas, tochas de resina e lanças de osso.",
      value: 110,
      sections: [
        {
          title: "I. O Dom do Lascamento de Pedra",
          glyph: "🪨",
          text: `Antes do bronze e do ferro forjado, a humanidade dominou o mundo com a pedra lascada. Encontre seixos e rochas sedimentares rígidas à beira de rios e encostas.
          
Golpeie um seixo contra outro em ângulo agudo de 45 graus: lascas finas e afiadas como navalhas se desprenderão. Estas lascas são o embrião de todas as ferramentas de sobrevivência.`,
        },
        {
          title: "II. Machadinha Rústica de Sílex",
          glyph: "🪓",
          text: `FABRICAÇÃO BÁSICA:
• 1 Pedra Lascada ou Sílex chanfrado
• 1 Galho resistente de carvalho ou cedro
• Fibras vegetais trançadas para amarra

Encaixe a pedra na extremidade bifurcada do galho. Amarre com nós cruzados umedecidos em seiva: ao secar, a amarra encolhe e trava a lâmina com firmeza absoluta. Permite derrubar troncos e colher gravetos rapidamente.`,
        },
        {
          title: "III. Picareta Primitiva de Mineração",
          glyph: "⛏️",
          text: `FABRICAÇÃO BÁSICA:
• 1 Rocha pontiaguda piramidal de basalto
• 1 Cabo longo e reto de madeira firme
• Tiras de couro cru ou cipós reforçados

Essencial para fraturar veios minerais expostos na superfície. Com ela, o explorador consegue extrair fragmentos de carvão, sílex e os primeiros nós de minério de ferro das rochas escuras.`,
        },
        {
          title: "IV. Tocha Incandescente de Resina",
          glyph: "🔥",
          text: `FABRICAÇÃO BÁSICA:
• 1 Galho seco longo
• Fibras de palha ou tecido velho embebidos em seiva de pinheiro
• Faísca de pederneira para acendimento

A tocha é o sol portátil das noites ermas. Seu calor afugenta lobos e predadores noturnos que temem o fogo aberto. Além de clarear cavernas subterrâneas, pode ser equipada na Mão Esquerda como escudo luminoso!`,
        },
        {
          title: "V. Lança de Madeira com Ponta de Osso",
          glyph: "🗡️",
          text: `FABRICAÇÃO BÁSICA:
• 1 Haste reta e polida de cedro (2 metros)
• 1 Osso longo de caça afiado em bisel
• Tendões animais secos para fixação rígida

A lança garante alcance superior em combate, permitindo golpear feras e slimes mantendo distância de segurança contra presas e mordidas venenosas.`,
        },
      ],
    },

    // 4. LIVRO DE COMO CONSTRUIR ITENS BÁSICOS
    itens_basicos: {
      type: "book",
      id: "item_livro_itens_basicos",
      name: "Manual de Construção: Itens Básicos & Sobrevivência",
      shortTitle: "Construção de Itens Básicos",
      author: "Arquiteto e Construtor Hélio de Corinto",
      coverColor: "#166534", // Verde floresta profundo
      accentColor: "#4ade80",
      icon: "📗",
      rarity: "incomum",
      description: "Manual prático ensinando a montar fogueiras no solo, fornos cúpula de argila, cordas de linho, baús de armazenamento e esteiras de descanso.",
      value: 125,
      pages: [
        {
          chapter: "Capítulo I",
          title: "O Ponto de Partida do Sobrevivente",
          subtitle: "Transformando Recursos Brutos em Abrigo",
          content: `A natureza oferece materiais abundantes, mas desordenados: árvores caídas, pedras dispersas, barro nas margens e fibras na relva.
          
O artífice experiente não necessita de oficina sofisticada para dar os primeiros passos. Com as próprias mãos e noções de geometria rústica, constrói os esteios da sobrevivência.
          
Leia com atenção cada diagrama deste manual antes de gastar seus preciosos recursos.`,
          flavor: "“Quem sabe erguer seu fogo e guardar seus grãos é soberano em qualquer terra.” — Hélio de Corinto",
        },
        {
          chapter: "Capítulo II — Fogo no Solo",
          title: "Montagem da Fogueira de Acampamento",
          subtitle: "O Centro de Todo Acampamento Seguro",
          content: `🪵 MATERIAIS NECESSÁRIOS:
• 10 Galhos secos colhidos do solo da floresta
• 2 Pedras de pederneira para faísca rápida

🔨 PROCEDIMENTO:
Limpe uma área circular de 2 metros no solo, retirando folhas secas para evitar propagação descontrolada. Disponha os galhos maiores em formato de pirâmide (cone) e os gravetos finos no núcleo. Golpeie as pederneiras sobre palha seca: a fogueira iluminará a noite, assará carnes e espantará criaturas hostis.`,
          flavor: "Aproxime-se da fogueira para descansar e salvar seu progresso no mundo.",
        },
        {
          chapter: "Capítulo III — Cordoaria",
          title: "Trançado de Fibras & Cordas de Linho",
          subtitle: "O Vínculo Forte de Todas as Construções",
          content: `🌿 MATERIAIS NECESSÁRIOS:
• Folhas longas de linho selvagem, cânhamo ou palha úmida

🔨 PROCEDIMENTO:
Bata as hastes com pedra chata para separar os filamentos internos. Separe três mechas iguais e trance-as alternando a mecha externa para o centro enquanto torce cada fio no sentido horário.
          
Uma corda de 3 pernas assim fabricada suporta o peso de um homem adulto e serve para amarrar mochilas, arcos, machados e armações de cabana.`,
          flavor: "Umedeça as fibras com água doce antes de trançar para evitar quebras.",
        },
        {
          chapter: "Capítulo IV — Olaria",
          title: "Forno Cúpula de Barro e Argila",
          subtitle: "Cocção Superior e Retenção Térmica",
          content: `🧱 MATERIAIS NECESSÁRIOS:
• 8 Porções de Argila pura cinzenta ou avermelhada
• Palha fina picada como ligante estrutural

🔨 PROCEDIMENTO:
Amasse a argila com um pouco de água até obter consistência plástica uniforme. Modele uma base circular sólida e erga paredes em espiral convergindo para o topo (cúpula). Deixe uma boca frontal arqueada e um pequeno respiradouro superior.
          
Acenda brasas no interior: o calor cozerá o barro, tornando-o rígido como pedra e mantendo calor constante para assar pães e peixes.`,
          flavor: "O Forno de Barro instalado no mapa não se apaga com a chuva fraca.",
        },
        {
          chapter: "Capítulo V — Guarda e Armazenamento",
          title: "Baú de Madeira Reforçado",
          subtitle: "Proteção Contra Saqueadores e Umidade",
          content: `📦 MATERIAIS NECESSÁRIOS:
• 12 Tábuas maciças de cedro ou carvalho
• Cavilhas de madeira dura e fecho de couro ou bronze

🔨 PROCEDIMENTO:
Junte as tábuas em junta macho-e-fêmea ou encaixe chanfrado. Fixe as laterais com cavilhas de madeira batidas com martelo de pedra. A tampa arqueada impede que a água da chuva se acumule.
          
O baú oferece compartimento seguro para guardar dezenas de itens valiosos, aliviando o peso da mochila do explorador.`,
          flavor: "Posicione o baú sempre próximo a uma fogueira para fácil acesso noturno.",
        },
        {
          chapter: "Capítulo VI — Descanso Pleno",
          title: "Cama de Palha & Esteiras de Dormir",
          subtitle: "Recuperação Total do Vigor e da Mente",
          content: `🛏️ MATERIAIS NECESSÁRIOS:
• 4 Varas de madeira de sustentação
• Feixes grossos de palha seca e peles macias de coelho

🔨 PROCEDIMENTO:
Erga uma estrutura de varas a 1 palmo do solo para evitar a umidade e os insetos rastejantes. Cubra com camadas cruzadas de esteira de palha e finalize com as peles curtidas.
          
Dormir em cama acolchoada restaura integralmente a Vida e a Stamina, dissipando qualquer mal-estar acumulado em longas caminhadas.`,
          flavor: "Fim das Instruções de Construção Básica.",
        },
      ],
    },

    // 5. LIVRO DE CONSTRUÇÃO DE EQUIPAMENTOS E ARMAS COMUNS
    armas_e_equipamentos: {
      type: "book",
      id: "item_livro_armas_equipamentos",
      name: "Tratado de Armas & Equipamentos Comuns",
      shortTitle: "Armas & Equipamentos Comuns",
      author: "Mestre Armeiro Calícrates de Esparta",
      coverColor: "#1e3a8a", // Azul marinho metálico
      accentColor: "#60a5fa",
      icon: "⚔️",
      rarity: "incomum",
      description: "Tratado metalúrgico detalhando a forja de espadas de bronze e ferro, o chicote de couro trançado, adagas de combate, escudos de carvalho e armaduras resistentes.",
      value: 160,
      pages: [
        {
          chapter: "Exórdio Marcial",
          title: "O Peso da Lâmina e a Firmeza do Escudo",
          subtitle: "Fundamentos da Armaria e Equipamento de Batalha",
          content: `Nas fronteiras do mundo civilizado, monstros e feras não negociam: respeitam apenas a solidez do bronze e o fio aguçado do ferro temperado.
          
Um guerreiro desarmado é presa fácil; um guerreiro mal equipado cansa antes do terceiro golpe. O equilíbrio entre peso, alcance e defesa é a chave da maestria.
          
Este tratado ensina a moldar as armas e vestimentas de combate mais confiáveis da era clássica.`,
          flavor: "“Não pergunte quantos são os inimigos, mas sim onde estão!” — Calícrates",
        },
        {
          chapter: "Seção I — As Espadas de Infantaria",
          title: "Espada de Bronze & Espada Larga de Ferro",
          subtitle: "As Rainhas do Combate Corpo-a-Corpo",
          content: `🗡️ ESPADA CURTA DE BRONZE (Xiphos):
Forjada pela liga de cobre e estanho em molde de areia. Lâmina folha de gume duplo excelente para estocadas rápidas. Leve, de manejo ágil, causa dano moderado sem esgotar a Stamina.
          
⚔️ ESPADA LARGA DE FERRO:
Martelada a quente sobre bigorna de pedra a partir de minério purificado. Lâmina mais pesada e resistente que decepa membros de monstros com facilidade e quebra defesas inimigas.`,
          flavor: "Equipe na Mão Direita para desferir golpes devastadores com botão de ataque.",
        },
        {
          chapter: "Seção II — A Arma de Alcance Flexível",
          title: "Chicote de Couro Trançado com Estalos",
          subtitle: "Manejo Rápido e Desestabilização de Inimigos",
          content: `➰ CONSTRUÇÃO:
• 4 Tiras longas de couro curtido de lobo ou caça
• Alma central de corda trançada
• Cabo cilíndrico de madeira com pomo de chumbo
• Ponta com nó de impacto ou fibra endurecida

⚡ CARACTERÍSTICAS EM COMBATE:
O chicote quebra a barreira do som com um estalo estrepitoso. Possui amplo raio de alcance, permitindo manter slimes e lobos à distância enquanto desfere estalos que atordoam e quebram o ímpeto dos monstros!`,
          flavor: "Arma veloz e fluida que atinge múltiplos alvos à frente.",
        },
        {
          chapter: "Seção III — Defesa Frontal",
          title: "Escudo Redondo de Carvalho (Aspis)",
          subtitle: "A Muralha Pessoal do Guerreiro",
          content: `🛡️ CONSTRUÇÃO:
• Pranchas de carvalho coladas e curvadas em calota
• Umbo central metálico de bronze fundido
• Revestimento externo de couro batido e borda reforçada
• Braçadeira (porpax) e manopla interna (antilabe)

🛡️ USO EM COMBATE:
Equipado na Mão Esquerda, absorve 50% a 70% do dano de ataques frontais e projeta o atacante para trás quando utilizado no momento exato do impacto.`,
          flavor: "Volte com ele ou sobre ele.",
        },
        {
          chapter: "Seção IV — Armaduras Corporais",
          title: "Peitoral de Couro Curtido & Elmo Helênico",
          subtitle: "Proteção Vital Contra Cortes e Mordidas",
          content: `🥋 PEITORAL DE COURO REFORÇADO (Camisa/Armadura):
Placas de couro fervido em cera de abelha, moldadas sobre torso anatômico. Amortece garras de lobos e flechas sem comprometer a agilidade de esquiva.
          
🪖 ELMO DE INFANTARIA COM PENACHO:
Cúpula de bronze ou ferro com protetores auriculares e nasais. Protege o crânio contra quedas de pedras em cavernas e golpes críticos na cabeça.`,
          flavor: "Equipamentos de armadura reduzem o dano sofrido em todas as batalhas.",
        },
        {
          chapter: "Seção V — Calçados de Marcha",
          title: "Botas de Couro Nobre do Caçador",
          subtitle: "Passadas Ligeiras e Tração em Todos os Biomas",
          content: `👢 CONSTRUÇÃO:
Couro macio de cervo na parte superior ajustado com correias cruzadas até a canela; solado espesso de couro de touro com cravos de bronze embutidos.
          
🏃 EFEITO EM VIAGEM:
Proporcionam tração firme em encostas arenosas de dunas, relva molhada e neve escorregadia, aumentando a velocidade de caminhada do herói em +15%!`,
          flavor: "Fim do Tratado de Armas & Equipamentos Comuns.",
        },
      ],
    },

    // 6. PERGAMINHO ESPECIAL RÚNICO (O MISTÉRIO DOS CÍRCULOS E TRIÂNGULOS)
    pergaminho_runico_misterio: {
      type: "scroll",
      id: "item_pergaminho_runico_misterio",
      name: "Pergaminho Ancestral dos Rituais Rúnicos",
      shortTitle: "Pergaminho dos Mistérios Sagrados",
      author: "Hierofante Desconhecido dos Antigos Deuses",
      scrollTheme: "runic_mystery",
      accentColor: "#a855f7", // Púrpura cósmico luminoso
      icon: "📜",
      rarity: "lendario",
      description: "Pergaminho ancestral reluzente coberto de geometria sagrada, círculos concêntricos entrelaçados, triângulos alquímicos e runas enigmáticas. Aqui começa o grande mistério do mundo.",
      value: 350,
      hasGeometrySVG: true,
      sections: [
        {
          title: "O Selo Primordial — Círculos e Triângulos Sagrados",
          glyph: "🔯",
          text: `᚛ ᛟ ᛚ ᚺ ᚨ ᛫ ᛈ ᚨ ᚱ ᚨ ᛫ ᚨ ᛋ ᛫ ᛈ ᚱ ᛟ ᚠ ᚢ ᚾ ᛞ ᛖ ᛉ ᚨ ᛋ ᚜
          
No princípio das eras, os Arquitetos do Infinito não desenharam o mundo com palavras, mas com a Geometria Sagrada dos Três e dos Quatro.
          
O Grande Círculo Exterior representa o Cosmos Sem Fim — o mundo procedural que se desdobra em todas as direções sem jamais encontrar um limite.
          
Dentro dele, dois Triângulos Equiláteros se cruzam em perfeita comunhão: o Triângulo da Ascensão (apontando aos céus) e o Triângulo da Descida (apontando às profundezas do abismo).`,
        },
        {
          title: "A Tetragrama dos Quatro Elementos",
          glyph: "🜂 🜄 🜁 🜃",
          text: `Observe os quatro vértices revelados pelos ângulos sagrados:
          
🜂 FOGO (Ignis) — A chama da fogueira que purifica e aquece, nascida da pederneira.
🜄 ÁGUA (Aqua) — O espelho dos lagos e a fonte oculta nos oásis cristalinos do deserto.
🜁 AR (Aër) — Os ventos gelados que sopram nos cumes nevados e movem as brumas dos pântanos.
🜃 TERRA (Terra) — O mármore das ruínas eternas e o leito fértil das florestas antigas.
          
Aquele que equilibrar os quatro elementos em seu íntimo jamais perecerá sob a investida das trevas.`,
        },
        {
          title: "A Profecia das Ruínas Subterrâneas",
          glyph: "🏛️",
          text: `ᛋ ᛟ ᛒ ᛫ ᛟ ᛫ ᛗ ᚨ ᚱ ᛗ ᛟ ᚱ ᛖ ᛫ ᛞ ᛖ ᛋ ᛈ ᛖ ᚱ ᛏ ᚨ ᚜
          
"Sob os pisos de mármore e mosaicos da Biblioteca Helênica, há escadarias lacradas que mergulham nas entranhas da terra.
          
Três são as chaves de pedra; três são os círculos concêntricos gravados nas lajes; um é o destino do viajante audaz.
          
Quando as estrelas se alinharem sobre as colunas dóricas e o portador da sabedoria pronunciar as palavras gravadas nos três ângulos do selo, as portas do Templo Subterrâneo se abrirão."`,
        },
        {
          title: "O Círculo Central e o Olho de Éter",
          glyph: "👁️",
          text: `No epicentro dos triângulos cruzados, repousa o Ponto Zero — a Centelha Cósmica de onde toda a matéria deste mundo procede.
          
Os símbolos inscritos ao redor do círculo central (✦ ☿ ☉ ☽ ♃ ♄ ♂ ♀) guardam a fórmula da transmutação dos metais ordinários em ligas míticas de poder incomparável.
          
Guarde este pergaminho junto ao peito. Os sussurros das ruínas logo chamarão pelo teu nome...`,
        },
      ],
    },

    // 7. LIVRO DE CATÁLOGO DE ITENS BÁSICOS
    catalogo_itens: {
      type: "book",
      id: "item_livro_catalogo_itens",
      name: "Compêndio & Catálogo Ilustrado de Recursos da Terra",
      shortTitle: "Catálogo de Recursos da Terra",
      author: "Erudito Teofrasto de Lesbos",
      coverColor: "#713f12", // Marrom terra mineral
      accentColor: "#facc15",
      icon: "📚",
      rarity: "incomum",
      description: "Catálogo enciclopédico listando minérios, madeiras nobres, fibras, ervas medicinais, gemas cristalinas e partes animais com propriedades e localizações.",
      value: 140,
      pages: [
        {
          chapter: "Classificação Mineral",
          title: "Minérios & Metais da Crosta",
          subtitle: "Recursos Fundamentais Extraídos das Rochas",
          content: `⛏️ MINÉRIO DE FERRO:
Nódulos de cor marrom-avermelhada incrustados em rochas escuras. Fundido em forja, produz lingotes de ferro indispensáveis para armas, armaduras e ferramentas de alto rendimento.
          
✨ PEPITAS DE MINÉRIO DE OURO:
Grãos reluzentes amarelados encontrados em veios profundos e leitos de rios. Metal nobre de alta maleabilidade, utilizado em joalheria, braceletes mágicos e comércio.
          
🪨 PEDRA LASCADA & SÍLEX:
Minerais de fratura conchoidal e gume afiadíssimo. A fagulha do sílex com ferro acende fogueiras instantaneamente.
          
🌑 CARVÃO MINERAL:
Combustível fóssil que queima com o dobro de calor e duração que a madeira comum.`,
          flavor: "Extraia com picareta de pedra ou superior nas encostas rochosas.",
        },
        {
          chapter: "Cristais e Gemas",
          title: "Formações Cristalinas & Gemas Raras",
          subtitle: "Estruturas de Luz e Energia Elemental",
          content: `💎 DRUSA DE CRISTAL DE QUARTZO:
Prisma límpido hexagonal que reflete todas as cores do arco-íris. Canaliza feixes de luz no escuro e serve como foco de pingentes de clarividência.
          
🔮 CRISTAL DE AMETISTA & OBSIDIANA:
Formações vítreas nascidas do calor vulcânico e resfriamento rápido. A obsidiana produz as lâminas mais afiadas conhecidas pelos cirurgiões e caçadores arcanos.
          
💚 ESMERALDA DAS MATAS:
Pedra preciosa verde brilhante encontrada raramente em cavernas profundas. Extremamente cobiçada por mercadores e colecionadores.`,
          flavor: "Gemas e cristais não se deterioram com o tempo nem com a umidade.",
        },
        {
          chapter: "Madeiras e Fibras",
          title: "Dendrologia & Fibras Silvestres",
          subtitle: "A Vegetação como Matéria-Prima",
          content: `🪵 GRAVETO & GALHO SECO:
Abundante sob copas de carvalhos e pinheiros. O combustível primordial para fogueiras e a haste de flechas e lanças.
          
🌲 MADEIRA NOBRE DE CEDRO & CARVALHO:
Troncos densos de cerne avermelhado. Resistente ao apodrecimento por cupins e umidade, perfeita para portas, baús e estantes de biblioteca.
          
🌾 FIBRAS NATURAIS DE LINHO:
Fios vegetais flexíveis extraídos de hastes herbáceas. Base para cordas, esteiras, sacos de suprimento e forros de armadura.`,
          flavor: "Derrube árvores maduras com machado para obter toretes inteiros.",
        },
        {
          chapter: "Ervas e Raízes",
          title: "Botânica Medicinal & Fungos",
          subtitle: "Os Remédios Espontâneos da Natureza",
          content: `🌿 ERVA MEDICINAL SILVESTRE:
Folhas denteadas verde-claras com pequenas flores amarelas. Trituradas e aplicadas sobre ferimentos estancam hemorragias e aceleram a cicatrização natural.
          
🥕 RAIZ FORTE NUTRITIVA:
Tubérculo aromático subterrâneo rico em amido. Pode ser consumido cru em emergências ou cozido em caldos reconfortantes.
          
🍄 COGUMELO MARROM & COGUMELO VERMELHO:
Fungos de troncos caídos. O marrom é nutritivo e saboroso; o vermelho deve ser cozido para neutralizar seus alcaloides antes da ingestão.`,
          flavor: "Colha ervas frescas pela manhã quando o orvalho ainda umedece as pétalas.",
        },
        {
          chapter: "Recursos Faunísticos",
          title: "Despojos Nobres de Criaturas",
          subtitle: "Materiais Obtidos pela Caça e Destrinchamento",
          content: `🐇 PELE MACIA DE COELHO:
Pelo denso e aveludado de altíssimo isolamento térmico. Ideal para forros de botas, capuzes e luvas leves.
          
🐺 COURO CURTIDO DE LOBO:
Derme espessa e flexível com pelos ásperos. Excelente resistência contra abrasão e perfurações rasas.
          
🦌 CHIFRES RAMIFICADOS DE CERVO:
Queratina e osso denso. Matéria-prima nobre para entalhe de cabos de adagas cerimoniais, pontas de arpão e botoeiras de capas.
          
🥩 CARNE PURA DE CAÇA:
Fonte máxima de proteína e força para longas caminhadas pelo mundo procedural.`,
          flavor: "Use sempre uma faca ou adaga afiada para destrinchar carcaças de caça.",
        },
        {
          chapter: "Fluidos Especiais",
          title: "Alquímicos & Seivas Naturais",
          subtitle: "Líquidos com Propriedades Singulares",
          content: `🟢 GOSMA PURA DE SLIME:
Fluido viscoso e elástico com propriedades adesivas. Não seca ao ar e serve como agente ligante para chicotes mágicos e tochas de longa duração.
          
🌲 RESINA VEGETAL DE PINHEIRO:
Seiva dourada pegajosa altamente inflamável. Impermeabiliza embarcações de madeira, sela potes cerâmicos e acelera a combustão das fogueiras.
          
💧 ÁGUA PURA DE NASCENTE:
Coletada em frascos ou ânforas à beira de rios e lagos. Hidrata o viajante e serve de veículo para elixires e poções revigorantes.`,
          flavor: "Fim do Catálogo Geral de Recursos da Terra.",
        },
      ],
    },

    // 8. LIVRO DE GEOGRAFIA DE BIOMAS E CRIATURAS
    geografia_e_criaturas: {
      type: "book",
      id: "item_livro_geografia_criaturas",
      name: "Atlas Geográfico: Biomas do Mundo & Guia de Criaturas",
      shortTitle: "Atlas de Biomas & Criaturas",
      author: "Geógrafo e Explorador Ptolomeu de Rodes",
      coverColor: "#0f766e", // Verde azulado / Teal oceânico
      accentColor: "#2dd4bf",
      icon: "🗺️",
      rarity: "raro",
      description: "Atlas completo descrevendo as florestas, planícies, desertos com oásis, montanhas nevadas e pântanos, além do bestiário detalhado de coelhos, lobos, cervos, slimes e monstros.",
      value: 175,
      pages: [
        {
          chapter: "Introdução à Geografia",
          title: "O Manto das Terras Infinitas",
          subtitle: "A Harmonia dos Climas e dos Relevos",
          content: `O mundo em que pisamos não tem fronteiras muradas: expande-se infinitamente ao passo do viajante corajoso.
          
À medida que caminhamos pelo globo, a umidade, a temperatura e a altitude combinam-se para moldar ecossistemas singulares chamados *Biomas*.
          
Cada bioma possui sua flora característica, suas rochas predominantes e sua comunidade de criaturas nativas. Conhecer a terra é antecipar seus perigos e colher suas bênçãos.`,
          flavor: "“Quem conhece o mapa do terreno antecipa a vitória em qualquer marcha.” — Ptolomeu de Rodes",
        },
        {
          chapter: "Biomas Temperados",
          title: "Planícies Verdejantes & Florestas Densas",
          subtitle: "O Berço da Vida e das Grandes Matas",
          content: `🌿 PLANÍCIES VERDEJANTES:
Colinas suaves forradas de relva baixa e flores coloridas. Terreno aberto com excelente visibilidade, riachos sinuosos e clima ameno. Habitat ideal para lebres velozes e o melhor local para acampamentos iniciais.
          
🌲 FLORESTA DENSA DE CARVALHOS:
Bosques fechados com copas altíssimas que filtram a luz solar em raios dourados. Solo rico em cogumelos, raízes medicinais e gravetos. Lar de cervos imponentes e, nas sombras mais fundas, de alcateias vigilantes de lobos cinzentos.`,
          flavor: "O som do vento nas copas dos carvalhos avisa sobre tempestades que se aproximam.",
        },
        {
          chapter: "Biomas Extremos",
          title: "Desertos Escaldantes & Montanhas de Neve",
          subtitle: "Terras de Provação e Resiliência Extrema",
          content: `🏜️ DESERTO DAS DUNAS & OÁSIS CRISTALINOS:
Areias douradas que ondulam com o vento quente. O sol castiga durante o dia e a temperatura desaba à noite. Contudo, em meio às dunas resplandecem os Oásis — nascentes de água límpida cercadas por palmeiras carregadas de frutas doces.
          
❄️ MONTANHAS NEVADAS & TUNDRA GÉLIDA:
Picos rochosos cobertos de neves perpétuas. O ar rarefeito e o vento uivante exigem capas térmicas e fogueiras constantes. Em compensação, suas encostas guardam as maiores jazidas de cristais e minérios puros.`,
          flavor: "Nos Oásis do deserto a água nunca congela nem escasseia.",
        },
        {
          chapter: "Biomas Sombrios & Ruínas",
          title: "Pântanos Nebulosos & Câmaras Helênicas",
          subtitle: "Onde o Passado e o Mistério se Encontram",
          content: `🌫️ PÂNTANOS BRUMOSOS:
Águas rasas e turvas entremeadas por juncos e ciprestes retorcidos. A névoa reduz o alcance da visão; slimes aquáticos e criaturas furtivas espreitam sob as poças de lama.
          
🏛️ RUÍNAS HELÊNICAS & CÂMARAS SUBTERRÂNEAS:
Templos e salões ancestrais de colunas caneladas de mármore branco. Preservam bibliotecas intactas, estantes de livros filosóficos e câmaras secretas esculpidas em rocha maciça.`,
          flavor: "Cuidado ao pisar em mosaicos antigos: alguns ocultam passagens para o subterrâneo.",
        },
        {
          chapter: "Bestiário das Presas",
          title: "Guia da Fauna: Coelhos & Cervos",
          subtitle: "Comportamento, Hábitos e Rastreamento",
          content: `🐇 COELHO SILVESTRE (Lepus):
Pequeno mamífero de orelhas longas e audição apuradíssima. Alimenta-se de relva nas planícies. Ao avistar o jogador a curta distância, dispara em zigue-zague veloz. Caça rápida que fornece carne macia e pelagem suave.
          
🦌 CERVO NOBRE DA FLORESTA (Cervus Elaphus):
O rei majestoso das matas. Porte esguio, galhardia e chifres imponentes. Herbívoro pacífico, mas dotado de arrancada poderosa quando ameaçado. Permite extrair grandes porções de carne nobre, couro e ossos densos.`,
          flavor: "Aproxime-se agachado contra a direção do vento para não ser farejado.",
        },
        {
          chapter: "Bestiário dos Predadores",
          title: "Guia da Fauna: Lobos, Slimes & Monstros",
          subtitle: "Táticas de Defesa e Combate Frente a Ameaças",
          content: `🐺 LOBO CINZENTO (Canis Lupus):
Predador temível que ronda florestas e tundras. Ataca com mordidas rápidas e persegue alvos cansados. Use armas de haste (lanças) ou chicote para mantê-lo afastado e golpes de espada ao contra-atacar.
          
🟢 SLIMES ELEMENTAIS:
Massa gelatinosa senciente que avança por saltos ritmados. Causa dano de impacto e reduz a velocidade de quem toca em sua gosma.
          
👁️ MONSTROS DAS SOMBRAS & GUARDIÕES:
Criaturas agressivas que surgem na escuridão da noite ou guardam câmaras profundas das ruínas. Enfrente-os sempre iluminado por tochas!`,
          flavor: "Fim do Atlas Geográfico de Biomas & Guia de Criaturas.",
        },
      ],
    },

    // 9. TOMOS CLÁSSICOS PRESERVADOS DAS RUÍNAS (Filosofia, Astronomia, Botânica, Estratégia, Cartografia, Forja, Alquimia)
    filosofia: {
      type: "book",
      id: "item_livro_filosofia",
      name: "Tomo de Filosofia de Atenas",
      shortTitle: "Filosofia Helênica",
      author: "Sócrates e Platão da Academia",
      coverColor: "#3730a3",
      accentColor: "#818cf8",
      icon: "📖",
      rarity: "raro",
      description: "Diálogos sobre ética, virtude, justiça e a harmonia da alma humana com o cosmos.",
      value: 120,
      pages: [
        {
          chapter: "Diálogo I",
          title: "Conhece-te a Ti Mesmo",
          subtitle: "A Primeira Lei da Sabedoria",
          content: `“Uma vida sem reflexão e autoexame não é digna de ser vivida pelo homem livre.”
          
Aquele que caminha pelo mundo sem examinar suas próprias motivações é como um barco à deriva sem leme nas correntes do mar.
          
A verdadeira coragem não reside na ausência do medo, mas no discernimento entre o que é verdadeiramente nobre e o que é indigno.`,
          flavor: "Inscrito no frontão do Templo de Delfos.",
        },
        {
          chapter: "Diálogo II",
          title: "A Harmonia dos Três Poderes da Alma",
          subtitle: "Razão, Coragem e Temperança",
          content: `Como uma carruagem alada conduzida pelo cocheiro da Razão e puxada por dois cavalos — a Nobre Ambição e o Desejo Terreno —, a alma humana só encontra paz quando o cocheiro governa com firmeza e justiça.
          
Mantenha a mente serena no combate e o coração generoso na vitória.`,
          flavor: "Tomo clássico preservado nas ruínas helênicas.",
        },
      ],
    },

    astronomia: {
      type: "book",
      id: "item_livro_astronomia",
      name: "Tratado de Astronomia e Mecânica",
      shortTitle: "Astronomia dos Astros",
      author: "Hiparco de Niceia",
      coverColor: "#0369a1",
      accentColor: "#38bdf8",
      icon: "📘",
      rarity: "raro",
      description: "Diagramas celestes, esferas de cálculo planetário e a harmonia geométrica dos astros.",
      value: 130,
      pages: [
        {
          chapter: "Esfera Celeste",
          title: "A Dança Imutável das Constelações",
          subtitle: "O Movimento dos Corpos Celestes",
          content: `Os astros não vagueiam ao acaso pela abóbada escura da noite. Eles seguem círculos concêntricos de harmonia matemática absoluta.
          
Ao observar a Estrela Polar no topo do céu do norte, o marinheiro e o caminhante encontram o meridiano fiel de sua posição geográfica.`,
          flavor: "Diagramas desenhados com compasso de bronze.",
        },
        {
          chapter: "Cálculo do Tempo",
          title: "O Relógio Solar e o Ciclo do Dia",
          subtitle: "Da Alvorada ao Zênite e à Noite Profunda",
          content: `O sol divide o dia em 12 horas de luz e a noite em 4 vigílias de guarda. A sombra projetada por uma vara no solo indica com exatidão quanto tempo resta antes da escuridão e do despertar das criaturas noturnas.`,
          flavor: "Tratado clássico com tabelas trigonométricas antigas.",
        },
      ],
    },

    botanica: {
      type: "book",
      id: "item_livro_botanica",
      name: "Compêndio de Botânica e Ervas",
      shortTitle: "Botânica das Ervas",
      author: "Dióscorides de Anazarbo",
      coverColor: "#15803d",
      accentColor: "#4ade80",
      icon: "📗",
      rarity: "incomum",
      description: "Ilustrações detalhadas de raízes, plantas medicinais e fungos da natureza.",
      value: 95,
      pages: [
        {
          chapter: "Ervas da Campina",
          title: "As Propriedades Medicinais das Folhas",
          subtitle: "Infusões, Emplastros e Seivas Curativas",
          content: `Toda planta guarda uma virtude específica: algumas resfriam a febre, outras aceleram o estancamento de feridas e outras revigoram o fôlego após a exaustão.
          
Aprenda a colher sem danificar as raízes para que a planta continue brotando nos ciclos futuros.`,
          flavor: "Compêndio ilustrado à mão em papiro nobre.",
        },
      ],
    },

    estrategia: {
      type: "book",
      id: "item_livro_estrategia",
      name: "Manuscrito de Estratégia e Táticas",
      shortTitle: "Estratégia de Batalha",
      author: "General Epaminondas de Tebas",
      coverColor: "#b91c1c",
      accentColor: "#f87171",
      icon: "📕",
      rarity: "incomum",
      description: "Manuscrito clássico descrevendo fortificações, navegação marítima e táticas de falange.",
      value: 110,
      pages: [
        {
          chapter: "Tática de Falange",
          title: "A Força da Linha Unida",
          subtitle: "Onde o Escudo de Um Protege o Flanco do Outro",
          content: `Nenhum guerreiro vence uma guerra solitário sem dominar o terreno e o ritmo da marcha.
          
Em terreno acidentado, mantenha os flancos guardados por arqueiros e lanceiros; em campo aberto, a investida sólida da infantaria pesada quebra qualquer formação desorganizada.`,
          flavor: "Manuscrito militar clássico encadernado em couro carmim.",
        },
      ],
    },

    cartografia: {
      type: "scroll",
      id: "item_pergaminho_cartografia",
      name: "Pergaminho de Cartografia do Mundo",
      shortTitle: "Cartografia do Mundo",
      author: "Cartógrafos Reais de Mileto",
      scrollTheme: "cartography",
      accentColor: "#eab308",
      icon: "📜",
      rarity: "raro",
      description: "Rolo de pergaminho desenhado à mão com a topografia de ilhas, montanhas e florestas do mundo.",
      value: 115,
      sections: [
        {
          title: "Cartografia dos Rios e Encostas",
          glyph: "🗺️",
          text: `Os cursos de água doce descem sempre das cordilheiras nevadas em direção aos vales férteis e planícies costeiras. Siga a correnteza de qualquer riacho para encontrar lagos naturais e povoados ribeirinhos.`,
        },
      ],
    },

    forja: {
      type: "scroll",
      id: "item_pergaminho_forja",
      name: "Pergaminho de Segredos da Forja",
      shortTitle: "Segredos da Forja",
      author: "Ferreiros do Monte Etna",
      scrollTheme: "forge",
      accentColor: "#f97316",
      icon: "📜",
      rarity: "raro",
      description: "Pergaminho antigo revelando segredos de têmpera de metais, minérios puros e fusão de ligas resistentes.",
      value: 140,
      sections: [
        {
          title: "A Têmpera Perfeita do Metal",
          glyph: "🔥",
          text: `O ferro aquecido até a tonalidade vermelho-cereja deve ser mergulhado em salmoura fria com movimento firme e sem hesitação. A têmpera rápida trava as fibras cristalinas, conferindo dureza sem fragilidade à lâmina.`,
        },
      ],
    },

    alquimia: {
      type: "scroll",
      id: "item_pergaminho_alquimia",
      name: "Pergaminho Arcano de Alquimia",
      shortTitle: "Alquimia Ancestral",
      author: "Hermes Trismegisto",
      scrollTheme: "alchemy",
      accentColor: "#c084fc",
      icon: "📜",
      rarity: "raro",
      description: "Pergaminho preservado com fórmulas ancestrais para extração de essências puras e poções de vigor.",
      value: 125,
      sections: [
        {
          title: "A Separação e Purificação dos Humores",
          glyph: "⚗️",
          text: `O que está embaixo é como o que está em cima; o que está em cima é como o que está embaixo. Pela destilação lenta em retortas de vidro e cerâmica, as impurezas decantam e a essência radiante se eleva.`,
        },
      ],
    },
  };

  // Função utilitária para buscar os dados de leitura a partir de qualquer item
  function getBookOrScrollData(item) {
    if (!item) return null;
    const id = (item.id || "").toLowerCase();
    const name = (item.name || "").toLowerCase();

    // 1. Culinária Vol 1
    if (id.includes("culinaria_1") || (name.includes("culinária") && name.includes("volume i")) || (name.includes("culinaria") && (name.includes("volume 1") || name.includes("volume i")))) {
      return BOOKS_AND_SCROLLS_DB.culinaria_vol1;
    }
    // 2. Culinária Vol 2
    if (id.includes("culinaria_2") || (name.includes("culinária") && (name.includes("volume ii") || name.includes("volume 2"))) || (name.includes("culinaria") && name.includes("volume ii"))) {
      return BOOKS_AND_SCROLLS_DB.culinaria_vol2;
    }
    // Se só fala culinária sem volume:
    if (name.includes("culinária") || name.includes("culinaria")) {
      return id.includes("2") ? BOOKS_AND_SCROLLS_DB.culinaria_vol2 : BOOKS_AND_SCROLLS_DB.culinaria_vol1;
    }

    // 3. Ferramentas Primitivas
    if (id.includes("primitivas") || (name.includes("ferramentas") && name.includes("primitivas"))) {
      return BOOKS_AND_SCROLLS_DB.ferramentas_primitivas;
    }

    // 4. Construção de Itens Básicos
    if (id.includes("itens_basicos") || (name.includes("construir") && name.includes("básicos")) || (name.includes("construção") && name.includes("básicos")) || (name.includes("itens básicos") && !name.includes("catálogo"))) {
      return BOOKS_AND_SCROLLS_DB.itens_basicos;
    }

    // 5. Armas e Equipamentos Comuns
    if (id.includes("armas_equipamentos") || (name.includes("equipamentos") && name.includes("comuns")) || (name.includes("armas") && name.includes("comuns"))) {
      return BOOKS_AND_SCROLLS_DB.armas_e_equipamentos;
    }

    // 6. Pergaminho Rúnico (Mistério)
    if (id.includes("runico") || id.includes("misterio") || name.includes("rúnicos") || name.includes("runicos") || name.includes("mistério") || name.includes("misterio") || (name.includes("pergaminho") && (name.includes("círculos") || name.includes("circulos") || name.includes("triângulos") || name.includes("triangulos")))) {
      return BOOKS_AND_SCROLLS_DB.pergaminho_runico_misterio;
    }

    // 7. Catálogo de Recursos da Terra / Itens Básicos
    if (id.includes("catalogo") || (name.includes("catálogo") && name.includes("itens")) || (name.includes("catalogo") && name.includes("itens")) || (name.includes("catálogo") && name.includes("recursos")) || (name.includes("catalogo") && name.includes("recursos"))) {
      return BOOKS_AND_SCROLLS_DB.catalogo_itens;
    }

    // 8. Geografia e Criaturas
    if (id.includes("geografia") || id.includes("criaturas") || (name.includes("geografia") && name.includes("biomas")) || (name.includes("biomas") && name.includes("criaturas")) || name.includes("atlas")) {
      return BOOKS_AND_SCROLLS_DB.geografia_e_criaturas;
    }

    // 9. Tomos clássicos
    if (id.includes("filosofia") || name.includes("filosofia")) {
      return BOOKS_AND_SCROLLS_DB.filosofia;
    }
    if (id.includes("astronomia") || name.includes("astronomia")) {
      return BOOKS_AND_SCROLLS_DB.astronomia;
    }
    if (id.includes("botanica") || id.includes("botânica") || name.includes("botânica") || name.includes("botanica")) {
      return BOOKS_AND_SCROLLS_DB.botanica;
    }
    if (id.includes("estrategia") || id.includes("estratégia") || name.includes("estratégia") || name.includes("estrategia")) {
      return BOOKS_AND_SCROLLS_DB.estrategia;
    }
    if (id.includes("cartografia") || name.includes("cartografia")) {
      return BOOKS_AND_SCROLLS_DB.cartografia;
    }
    if (id.includes("forja") || name.includes("forja")) {
      return BOOKS_AND_SCROLLS_DB.forja;
    }
    if (id.includes("alquimia") || name.includes("alquimia")) {
      return BOOKS_AND_SCROLLS_DB.alquimia;
    }

    // Fallback genérico para qualquer livro ou pergaminho não mapeado
    if (name.includes("pergaminho") || id.includes("pergaminho")) {
      return {
        type: "scroll",
        id: item.id || "pergaminho_generico",
        name: item.name || "Pergaminho Antigo",
        shortTitle: item.name || "Pergaminho Antigo",
        author: "Scriba Desconhecido",
        scrollTheme: "generic",
        accentColor: item.color || "#eab308",
        icon: "📜",
        rarity: item.rarity || "comum",
        description: item.description || "Pergaminho de papiro preservado com antigas escrituras.",
        sections: [
          {
            title: "Inscrições Antigas",
            glyph: "📜",
            text: item.description || "As palavras inscritas neste rolo de pergaminho contam histórias de viajantes e conhecimentos esquecidos pelo tempo.",
          },
        ],
      };
    }

    if (name.includes("livro") || name.includes("tomo") || name.includes("tratado") || name.includes("compêndio") || name.includes("compendio") || name.includes("manuscrito") || id.includes("livro")) {
      return {
        type: "book",
        id: item.id || "livro_generico",
        name: item.name || "Tomo Antigo",
        shortTitle: item.name || "Tomo Antigo",
        author: "Filósofo Clássico",
        coverColor: item.color || "#4338ca",
        accentColor: "#fbbf24",
        icon: "📖",
        rarity: item.rarity || "comum",
        description: item.description || "Volume encadernado em couro com manuscritos clássicos.",
        pages: [
          {
            chapter: "Capítulo Único",
            title: item.name || "Manuscrito Preservado",
            subtitle: "Registro da Biblioteca Helênica",
            content: item.description || "As páginas deste livro trazem registros detalhados sobre a natureza, os elementos e as leis do mundo.",
            flavor: "Preservado com cuidado nas estantes da biblioteca.",
          },
        ],
      };
    }

    return null;
  }

  // Helper para criar instâncias de itens prontos para o inventário
  function createBookOrScrollItem(key) {
    const data = BOOKS_AND_SCROLLS_DB[key];
    if (!data) return null;
    const uid = `${data.id}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    return {
      id: uid,
      name: data.name,
      categoryType: "consumable",
      isEquippable: false,
      rarity: data.rarity,
      value: data.value,
      stackCount: 1,
      maxStack: 1,
      isStackable: false,
      icon: data.icon,
      color: data.accentColor,
      description: data.description + " Não empilhável. [Ler] para folhear.",
      bookKey: key,
      isReadable: true,
      readerType: data.type,
    };
  }

  // Exporta para o namespace global
  G.BooksAndScrolls = {
    DB: BOOKS_AND_SCROLLS_DB,
    getData: getBookOrScrollData,
    createItem: createBookOrScrollItem,
  };
})(window.Game);
