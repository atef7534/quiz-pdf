let landing = document.querySelector(".landing");
let form = document.querySelector(".q-form");
let question = document.querySelector("#question-content");
let answers = document.querySelectorAll(".answer");
let success = document.querySelector(".added");

let clickedChoices;
let allQuestions;

if (localStorage.getItem("allQuestions") === null) {
  allQuestions = [];
  localStorage.setItem("allQuestions", JSON.stringify(allQuestions));
}

if (localStorage.getItem("clicked") === null) {
  clickedChoices = [];
  localStorage.setItem("clicked", JSON.stringify(clickedChoices));
} 

allQuestions = JSON.parse(localStorage.getItem("allQuestions"));
clickedChoices = JSON.parse(localStorage.getItem("clicked"));

form.addEventListener("submit", function(e){
  e.preventDefault();
  var q = question.value;
  /*
    Make all inputs empty
    textarea -> empty
  */
  if (q === "" || answers[0].value === "" || answers[1].value === "" || answers[2].value === "" || answers[3].value === "" || answers[4].value === "") {
    console.log("not all information are correct!");

    // create div with empty message!
    let div = document.createElement("div");
    div.className = "empty";
    div.textContent = `some inputs are empty!`;
    landing.appendChild(div);

    setTimeout(function () {
      div.style.display = "none";
    }, 2000);

  } else {
    var ob = {"question": q, "answer_1": answers[0].value, "answer_2": answers[1].value, "answer_3": answers[2].value, "answer_4": answers[3].value, "right_answer": answers[4].value};
    
    for (let i = 0; i < 4; i++) {
      clickedChoices.push(false);
    }
    // empty inputs
    question.value = "";
    for (let i = 0; i < answers.length; i++) {
      answers[i].value = "";
    }

    allQuestions.push(ob);
    localStorage.setItem("allQuestions", JSON.stringify(allQuestions));

    success.style.visibility = "visible";
    setInterval(function () {
      success.style.visibility = "hidden";
    }, 1500)
    console.log("Added!");
    localStorage.setItem("clicked", JSON.stringify(clickedChoices));
  }
});