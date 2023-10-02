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
    let ques = document.createElement("h3");
    ques.className = "ques";

    ques.textContent += `${i + 1}) `;
    ques.textContent += allQuestions[i].question;

    let choices = document.createElement("ul");
    choices.className = "choices";
    let arr = ["answer_1", "answer_2", "answer_3", "answer_4"];
    console.log(Number.parseInt(allQuestions[i].right_answer));
    for (let j = 0; j < 4; j++) {
      let L = document.createElement("li");
      L.className = arr[j];
      L.textContent += `${j + 1}) `;
      if (j + 1 === Number.parseInt(allQuestions[i].right_answer)) {
        L.setAttribute("data-answer", true);
      } else {
        L.setAttribute("data-answer", false);
      }

      if (clickedChoices[(i * 4) + j] === true) {
        if (L.dataset.answer === "true") {
          L.classList.add("correct");
        } else {
          L.classList.add("wrong");
        }
      }
      if (j === 0) {
        L.textContent += allQuestions[i].answer_1;
      } else if (j == 1) {
        L.textContent += allQuestions[i].answer_2;
      } else if (j == 2) {
        L.textContent += allQuestions[i].answer_3;
      } else {
        L.textContent += allQuestions[i].answer_4;
      }
      choices.appendChild(L);
      L.addEventListener("click", function(e){
        e.target.classList.remove("correct");
        e.target.classList.remove("wrong");
        clickedChoices[i * 4 + j] = true;
        if (e.target.dataset.answer === "true") {
          e.target.classList.add("correct");
        } else {
          e.target.classList.add("wrong");
        }
        localStorage.setItem("clicked", JSON.stringify(clickedChoices));
      });
    }
    questionsDiv.appendChild(ques);
    questionsDiv.appendChild(choices);
    
  }
} else {
  noQuestion.style.display = "block";
}

let lists = document.querySelectorAll("li");
let overlay = document.querySelector(".overlay");
let ok = document.querySelector(".accept");
let refuse = document.querySelector(".refused");
let refuse_2 = document.querySelector(".x");
clearCQ.addEventListener("click", function(e) {
  overlay.style.display = "block";
  ok.addEventListener("click", function(e) {
    overlay.style.display = "none";
    lists.forEach(function(list) {
      list.classList.remove("correct");
      list.classList.remove("wrong");
    });
      for (let i = 0; i < clickedChoices.length; i++) {
        clickedChoices[i] = false;
      }
      localStorage.setItem("clicked", JSON.stringify(clickedChoices));
  });


  refuse.addEventListener("click", function(e) {
    overlay.style.display = "none";
  });

  refuse_2.addEventListener("click", function(e) {
    overlay.style.display = "none";
  });
});

if (allQuestions.length === 0) {
  removeErrorMessage.parentElement.style.display = "block";
}
