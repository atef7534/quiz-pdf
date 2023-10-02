// remove error message  [index.html]
let noQuestion = document.querySelector(".no-question");
let removeErrorMessage = document.querySelector(".remove-error");
let questionsDiv = document.querySelector(".questions");
let clearCQ = document.querySelector(".clear-cq");
let clickedChoices = JSON.parse(localStorage.getItem("clicked"));

removeErrorMessage.addEventListener("click", function(ele){
  ele.target.parentElement.style.display = "none";
});

let allQuestions;
if (localStorage.getItem("allQuestions")) {
  allQuestions = JSON.parse(localStorage.getItem("allQuestions"));
  for (let i = 0; i < allQuestions.length; i++) {
    let temp = document.createElement("div");
    temp.className = "temp";

    let close = document.createElement("div");
    close.className = "close";
    close.textContent = "x";

    close.addEventListener("click", function(e){
      allQuestions.splice(i, 1);
      clickedChoices.splice(i * 4, 4);
      location.reload();
      localStorage.setItem("allQuestions", JSON.stringify(allQuestions));
      localStorage.setItem("clicked", JSON.stringify(clickedChoices));
    });

    temp.appendChild(close);

    let ques = document.createElement("h3");
    ques.className = "ques";

    ques.textContent += `${i + 1}) `;
    ques.textContent += allQuestions[i].question;

    let choices = document.createElement("ul");
    choices.className = "choices";
    let arr = ["answer_1", "answer_2", "answer_3", "answer_4"];
    for (let j = 0; j < 4; j++) {
      let L = document.createElement("li");
      L.className = arr[j];
      L.textContent += `${j + 1}) `;
      L.style.cursor = "auto";

      if (j === 0) {
        L.textContent += allQuestions[i].answer_1;
      } else if (j === 1) {
        L.textContent += allQuestions[i].answer_2;
      } else if (j === 2) {
        L.textContent += allQuestions[i].answer_3;
      } else {
        L.textContent += allQuestions[i].answer_4;
      }
      choices.appendChild(L);
    }
    temp.appendChild(ques);
    temp.appendChild(choices);
    questionsDiv.appendChild(temp);
  }
} else {
  noQuestion.style.display = "block";
}

if (allQuestions.length == 0) {
    removeErrorMessage.parentElement.style.display = "block";
}