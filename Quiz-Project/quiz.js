let Questions = [

            {
                Question: "Which language is used to create web pages?",
                Options: ["Java","HTML","Python","C++"],
                Answer: "HTML"
            },


            {
                Question: "Which language is used to style web pages?",

                Options: [
                    "HTML",
                    "CSS",
                    "Java",
                    "SQL"
                ],

                Answer: "CSS"
            },


            {
                Question: "Which language is used to add functionality to a web page?",

                Options: [
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "SQL"
                ],

                Answer: "JavaScript"
            },


            {
                Question: "Which method adds an element to the end of an array?",

                Options: [
                    "pop()",
                    "push()",
                    "shift()",
                    "splice()"
                ],

                Answer: "push()"
            },


            {
                Question: "Which keyword is used to create a variable?",

                Options: [
                    "let",
                    "print",
                    "function",
                    "class"
                ],

                Answer: "let"
            }

        ];



        // =========================
        // GET HTML ELEMENTS
        // =========================

        let QuestionNumber = document.getElementById("QuestionNumber");
        let Question = document.getElementById("Question");
        let Options = document.getElementById("Options");
        let NextBtn = document.getElementById("NextBtn");
        let PreviousBtn = document.getElementById("PreviousBtn");
        let RestartBtn = document.getElementById("RestartBtn");
        let Score = document.getElementById("Score");

        // =========================
        // VARIABLES
        // =========================

        let CurrentQuestion = 0;
        let TotalScore = 0;
        let Answered = false;

function DisplayQuiz(){

    Options.innerHTML = ""
    Answered = false

    let Current = Questions[CurrentQuestion]

    // Dsiplay Question number //

    QuestionNumber.textContent = "Question " + (CurrentQuestion + 1) + " ot of " +Questions.length

    // Display Question 

    Question.textContent = Current.Question

    Current.Options.forEach(function(Option){

        let Button = document.createElement("button")
        Button.textContent = Option

        Button.addEventListener("click",function(){

            if(Answered === true){
                return
            }

            Answered = true

            if(Option === Current.Answer){

                Button.style.backgroundColor = "green"
                Button.style.color = "white"

                TotalScore++
            }


            else{

                Button.style.backgroundColor = "red"
                Button.style.color = "white"

                let AllButtons = Options.querySelectorAll("button")
                AllButtons.forEach(function(OptionButton){

                    if(OptionButton.textContent === Current.Answer){

                        OptionButton.style.backgroundColor = "green"
                        OptionButton.style.color = "white"
                    }
                })
            }

            let AllButtons = Options.querySelectorAll("button")

            AllButtons.forEach(function(OptionButton){

                OptionButton.disabled = true
            })

        })

        Options.appendChild(Button)

        if(CurrentQuestion === 0){

            PreviousBtn.disabled = true
        }

        else{

            PreviousBtn.disabled = false
        }
    })
}

    NextBtn.addEventListener("click",function(){

        if(CurrentQuestion < Questions.length-1){

            // Move to next question //

            CurrentQuestion++
            DisplayQuiz()
        }

        else{
            ShowResult()
        }
    })


    PreviousBtn.addEventListener("click",function(){

        if(CurrentQuestion > 0){

            // Move to previous question //

            CurrentQuestion--

            DisplayQuiz()
        }
    })


    function ShowResult(){

        Options.innerHTML = ""
        QuestionNumber.textContent = ""
        Question.textContent = "Quiz Completed"
        PreviousBtn.style.display = "none"
        NextBtn.style.display  = ""
        Score.textContent = "Your Score is " + TotalScore + " / " + Questions.length

        RestartBtn.style.display = "block"

    }


    RestartBtn.addEventListener("click",function(){

        CurrentQuestion = 0
        TotalScore = 0
        NextBtn.style.display = "block"
        Score.textContent = ""
        PreviousBtn.style.display = "block"
        RestartBtn.style.display = "none"

        DisplayQuiz()
    })

    RestartBtn.style.display = "none"

    DisplayQuiz()
