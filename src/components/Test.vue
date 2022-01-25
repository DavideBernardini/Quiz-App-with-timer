<template>
    <div class="wrapper">
        <h2>question</h2>
        <ul class="answers">
            <li>answer</li>
            <li>answer</li>
            <li>answer</li>
            <li>answer</li>
        </ul>
        <div v-for="(item, index) in filterQuestions" :key="index">{{item.question}}</div>
    </div>
</template>

<script>


export default {
  name: 'Test',
  data() {
      return {
          TestQuestions: [
              {
                  question: "A cosa serve il tag break <br/> ?",
                  answers: [
                      {
                          answer: "Ad andare a capo",
                          correct: true
                      },
                      {answer: "A rompere le pagine"},
                      {answer: "A creare una tabella"},
                      {answer: "A creare un paragrafo"}
                  ]
              },
              {
                  question: "Cosa è possibile inserire nell'head del documento Html?",
                  answers: [
                      {answer: "Immagini"},
                      {
                          answer: "metadata",
                          correct: true
                      },
                      {answer: "tabelle"},
                      {answer: "contenuti multimediali"}
                  ]
              },
              {
                  question: "Per cosa sta HTML?",
                  answers: [
                      {answer: "Home Text Markup Language"},
                      {answer: "HyperTool Markup Language"},
                      {answer: "Hyperlink Text Markup Language"},
                      {
                          answer: "Hyper Text Markup Language",
                          correct: true
                      }
                  ]
              },
              {
                  question: "Quale elemento Html produce il titolo più grande?",
                  answers: [
                      {
                          answer: "<h1>",
                          correct: true
                      },
                      {answer: "<head>"},
                      {answer: "<title>"},
                      {answer: "<h6>"}
                  ]
              },
              {
                  question: "Quali di questi elementi rappresenta un titolo?",
                  answers: [
                      {
                          answer: "<h5>",
                          correct: true
                      },
                      {
                          answer: "<h6>",
                          correct: true
                      },
                      {answer: "<h7>"},
                      {answer: "<h8>"}
                  ],
                  multipleChoice: true
              },
              {
                  question: "Chi ha sviluppato l'Html?",
                  answers: [
                      {answer: "Steve Jobs"},
                      {answer: "Bill Gates"},
                      {answer: "Elon Musk"},
                      {
                          answer: "Tim Berners-Lee",
                          correct: true
                      }
                  ]
              },
              {
                  question: "Quali di questi selettori CSS sono corretti?",
                  answers: [
                      {
                          answer: ":first-child",
                          correct: true
                      },
                      {answer: ":first-parent"},
                      {
                          answer: "::after",
                          correct: true
                      },
                      {answer: "::yesterday"}
                  ],
                  multipleChoice: true
              },
              {
                  question: "Quali proprietà CSS permettono di cambiare il colore di sfondo?",
                  answers: [
                      {answer: "background-repeat"},
                      {answer: "background-colours"},
                      {answer: "background-color"},
                      {answer: "background"}
                  ],
                  multipleChoice: true

              },
              {
                  question: "Quali elementi hanno la proprietà disply inline di default?",
                  answers: [
                      {
                          answer: "<span>",
                          correct: true
                      },
                      {answer: "<section>"},
                      {
                          answer: "<a>",
                          correct: true
                      },
                      {answer: "<p>"}
                  ],
                  multipleChoice: true

              },
              {
                  question: "Quali valori può avere la proprietà float?",
                  answers: [
                      {
                          answer: "left",
                          correct: true
                      },
                      {answer: "center"},
                      {
                          answer: "right",
                          correct: true
                      },
                      {
                          answer: "none",
                          correct: true
                      }
                  ],
                  multipleChoice: true
              }
          ]
      }
  },
  computed: {
      filterQuestions() {
          let questions = [];
          while (questions.length < 3) {
              let n = Math.floor(Math.random() * this.TestQuestions.length);
              if (questions.includes(this.TestQuestions[n]) == false) {
                  questions.push(this.TestQuestions[n])
              }
          }
          console.log(questions);
          return questions;
      }
  }
}
</script>

<style lang="scss" scoped>


</style>