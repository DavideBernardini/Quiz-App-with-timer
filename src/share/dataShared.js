import Vue from 'vue';

export default Vue.observable({
    // data
    TestQuestions: [
        {
            question: "A cosa serve il tag break <br/> ?",
            answers: [
                {
                    answer: "Ad andare a capo",
                    correct: true
                },
                {
                    answer: "A rompere le pagine",
                    correct: false
                },
                {
                    answer: "A creare una tabella",
                    correct: false
                },
                {
                    answer: "A creare un paragrafo",
                    correct: false
                }
            ]
        },
        {
            question: "Cosa è possibile inserire nell'head del documento Html?",
            answers: [
                {
                    answer: "Immagini",
                    correct: false
                },
                {
                    answer: "metadata",
                    correct: true
                },
                {
                    answer: "tabelle",
                    correct: false
                },
                {
                    answer: "contenuti multimediali",
                    correct: false
                }
            ]
        },
        {
            question: "Per cosa sta HTML?",
            answers: [
                {
                    answer: "Home Text Markup Language",
                    correct: false
                },
                {
                    answer: "HyperTool Markup Language",
                    correct: false
                },
                {
                    answer: "Hyperlink Text Markup Language",
                    correct: false
                },
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
                {
                    answer: "<head>",
                    correct: false
                },
                {
                    answer: "<title>",
                    correct: false
                },
                {
                    answer: "<h6>",
                    correct: false
                }
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
                {
                    answer: "<h7>",
                    correct: false
                },
                {
                    answer: "<h8>",
                    correct: false
                }
            ],
            multipleChoice: true
        },
        {
            question: "Chi ha sviluppato l'Html?",
            answers: [
                {
                    answer: "Steve Jobs",
                    correct: false
                },
                {
                    answer: "Bill Gates",
                    correct: false
                },
                {
                    answer: "Elon Musk",
                    correct: false
                },
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
                {
                    answer: ":first-parent",
                    correct: false
                },
                {
                    answer: "::after",
                    correct: true
                },
                {
                    answer: "::yesterday",
                    correct: false
                }
            ],
            multipleChoice: true
        },
        {
            question: "Quali proprietà CSS permettono di cambiare il colore di sfondo?",
            answers: [
                {
                    answer: "background-repeat",
                    correct: false
                },
                {
                    answer: "background-colours",
                    correct: false
                },
                {
                    answer: "background-color", 
                    correct: true
                },
                {
                    answer: "background",
                    correct: true
                }
            ],
            multipleChoice: true

        },
        {
            question: "Quali elementi hanno la proprietà display inline di default?",
            answers: [
                {
                    answer: "<span>",
                    correct: true
                },
                {
                    answer: "<section>",
                    correct: false
                },
                {
                    answer: "<a>",
                    correct: true
                },
                {
                    answer: "<p>",
                    correct: false
                }
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
                {
                    answer: "center",
                    correct: false
                },
                {
                    answer: "right",
                    correct: true
                },
                {
                    answer: "bottom",
                    correct: false
                }
            ],
            multipleChoice: true
        }
    ],
    timeOut: false,
    timeLeft: 10,
    pauseTimer: false,
    testStarted: false,
    minAnswModal: false,
    endTest: false,
    attempts: 0,
    checkedAnswers: [],
    pickedAnswer: {},
    score: 0,
    // methods
    timer() {
        setInterval(() => {
            if (this.timeLeft == 0) {
                this.timeOut = true;
                this.minAnswModal = false;
                
            } else if (!this.pauseTimer) {
                this.timeLeft--;
            }
            // this.timeLeft == 0 ? clearInterval(this.timer) && this.timeOut = true : this.timeLeft--
        }, 1000)
    }
});
