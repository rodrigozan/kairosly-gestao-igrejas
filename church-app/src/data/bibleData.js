const bibleData = {
  "Gênesis": {
    "1": [
      "No princípio, criou Deus os céus e a terra.",
      "A terra, porém, estava sem forma e vazia; havia trevas sobre a face do abismo, e o Espírito de Deus pairava por sobre as águas.",
      "Disse Deus: Haja luz; e houve luz.",
      "E viu Deus que a luz era boa; e fez separação entre a luz e as trevas.",
      "Chamou Deus à luz Dia e às trevas, Noite. Houve tarde e manhã, o primeiro dia."
    ],
    "2": [
      "Assim, pois, foram acabados os céus e a terra e todo o seu exército.",
      "E, havendo Deus terminado no dia sétimo a sua obra, que fizera, descansou nesse dia de toda a sua obra que tinha feito.",
      "E abençoou Deus o dia sétimo e o santificou; porque nele descansou de toda a obra que, como Criador, fizera."
    ]
  },
  "Salmos": {
    "23": [
      "O Senhor é o meu pastor; nada me faltará.",
      "Ele me faz repousar em pastos verdejantes. Leva-me para junto das águas de descanso;",
      "refrigera-me a alma. Guia-me pelas veredas da justiça por amor do seu nome.",
      "Ainda que eu ande pelo vale da sombra da morte, não temerei mal nenhum, porque tu estás comigo; o teu bordão e o teu cajado me consolam.",
      "Preparas-me uma mesa na presença dos meus adversários, unges-me a cabeça com óleo; o meu cálice transborda.",
      "Bondade e misericórdia certamente me seguirão todos os dias da minha vida; e habitarei na Casa do Senhor para todo o sempre."
    ],
    "91": [
      "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.",
      "Direi do Senhor: Ele é o meu Deus, o meu refúgio, a minha fortaleza, e nele confiarei.",
      "Porque ele te livrará do laço do passarinheiro, e da peste perniciosa.",
      "Ele te cobrirá com as suas penas, e debaixo das suas asas te confiarás; a sua verdade será o teu escudo e broquel."
    ]
  },
  "Mateus": {
    "5": [
        "Vendo Jesus as multidões, subiu ao monte, e, como se assentasse, aproximaram-se os seus discípulos;",
        "e ele passou a ensiná-los, dizendo:",
        "Bem-aventurados os humildes de espírito, porque deles é o reino dos céus.",
        "Bem-aventurados os que choram, porque serão consolados.",
        "Bem-aventurados os mansos, porque herdarão a terra."
    ],
    "6": [
        "Guardai-vos de exercer a vossa justiça diante dos homens, com o fim de serdes vistos por eles; doutra sorte, não tereis galardão junto de vosso Pai celeste.",
        "Quando, pois, deres esmola, não toques trombeta diante de ti, como fazem os hipócritas, nas sinagogas e nas ruas, para serem glorificados pelos homens. Em verdade vos digo que eles já receberam o galardão.",
        "Tu, porém, ao dares a esmola, ignore a tua mão esquerda o que faz a tua direita,",
        "para que a tua esmola fique em secreto; e teu Pai, que vê em secreto, te recompensará."
    ]
  }
};

export const books = Object.keys(bibleData);

export const getChapters = (book) => {
  return bibleData[book] ? Object.keys(bibleData[book]) : [];
};

export const getVerses = (book, chapter) => {
  return bibleData[book] && bibleData[book][chapter] ? bibleData[book][chapter] : [];
};

export default bibleData;