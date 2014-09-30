
$(document).ready(function(){


function questionObject(text1, text2, choices, answer ) {
	this.text1 = text1;
	this.text2 = text2;
	this.choices = choices;
	this.answer = answer; 
}

//Load questions on questionObject
//[new quesionObject(...),new quesionObject(),new quesionObject()]

var arrayQuestions = new Array();
arrayQuestions[0] = new questionObject(
				"Choose the word or set of words that, when inserted in the sentence, best fits the meaning of the sentence as a whole.", 
				"Samantha tends to behave -------, rarely considering the consequences of her reckless actions.", 
				["seriously", "deceitfully", "cautiously", "deliberately", "impetuously"],
				"impetuously"
				);

arrayQuestions[1] = new questionObject(
				"A student decides to sell lemonade at her school. She knows she will sell 90 glasses of lemonade each day. Each glass will cost her 30 cents to make. What is the minimum price she should charge per glass if she hopes to make $45 profit each day?",
				"",
				["35 cents", "45 cents", "50 cents", "72 cents", "80 cents"],
				"80 cents"
				);

arrayQuestions[2] = new questionObject(
				"Choose the word or set of words that, when inserted in the sentence, best fits the meaning of the sentence as a whole.",
				"A judgment made before all the facts are known must be called ------- .",
				["harsh", "deliberate", "sensible", "premature", "fair"],
				"premature"
				);
	
arrayQuestions[3] = new questionObject(
				"Choose the word or set of words that, when inserted in the sentence, best fits the meaning of the sentence as a whole. ",
				"Bromelain, an enzyme found in pineapples, is not ------- in preventing bone and joint diseases, which can make bones susceptible to injury, but it can help injured bones -------.",
				["corrective . . heal", "effective . . recover", "detrimental . . multiply", "supportive . . degenerate", "vital . . persist"],
				"effective . . recover"
				);

arrayQuestions[4] = new questionObject(
				"Read the following SAT test question and then click on a button to select your answer.",
				"The sum of the positive odd integers less than 50 is subtracted from the sum of the positive even integers less than or equal to 50. What is the resulting difference?",
				["0", "25", "50", "100", "200"],
				"25"
				);


var noOfQuestions = arrayQuestions.length;
var currentQuestionPosition;
var userCorrectCount;
var feedback;

var startGame = function() {

	currentQuestionPosition = 0;
	userCorrectCount = 0;
	feedback ="";
	$("#submitEndButton").hide();
	$("#scoreButtonText").hide();
	$("#endButton").show();
	$("#questionBox").show();
	loadQuestion();
}

var clearQuestion = function() {
		//Clear old question and choices
		$("#questionDiv p").remove();
		$("input[type=radio]").attr("checked", false);
		feedback="";
}

var loadQuestion = function() {

			clearQuestion();

			//Load current question position text1
			$("#questionDiv").append("<p>" + arrayQuestions[currentQuestionPosition].text1 + "</p>");


			//Load current question position text2
			if (arrayQuestions[currentQuestionPosition].text2 != "") {
				$("#questionDiv").append("<p>" + arrayQuestions[currentQuestionPosition].text2 + "</p>");
			}

			//Load choices for current question
			var arrayChoicesLength = arrayQuestions[currentQuestionPosition].choices.length;

			for (i = 0; i < arrayChoicesLength; i++) {
				$("#choiceVal" + i).val(arrayQuestions[currentQuestionPosition].choices[i]);		
				$("#choiceText" + i).text(arrayQuestions[currentQuestionPosition].choices[i]);
			}

			$("#commentButtonText").text("Question # " + (currentQuestionPosition+1));
			$("#commentButtonText").show();

}


var endGame = function() {
	$("#startButton").show();
	$("#endButton").hide();
	$("#questionBox").hide();
	$("#feedbackBox").hide();
	$(".main").animate(
		{left: '300px'},
		500,
		"swing"
		);
	$("#commentButtonText").text("");
	$("#scoreButtonText").text("");
}

$("#startButton").click(function() {
	$(".main").animate(
		{left: '1px'},
		500,
		"swing"
		);
	startGame();
	$("#startButton").hide();
})

$("#endButton").click(function() {
	endGame();
})

$("#submitEndButton").click(function() {
	endGame();
})


$("#submitButton").click(function(event) {

		event.preventDefault();
		event.stopPropagation();


		//Check if user selected an answer
		if ($("input:radio[name='choices']").is(":checked")) {

			var userAnswer = $('input[name="choices"]:checked').val();
			var realAnswer = arrayQuestions[currentQuestionPosition].answer;

			console.log(userAnswer, realAnswer);
			

			//Set feedback variable to determine if answer is correct
			if (userAnswer == realAnswer) {
				userCorrectCount += 1;
				feedback = "correct";
			} else {
				feedback = "wrong";
			}

			//Display feedback to user
			$("#questionBox").hide();
			$("#scoreButtonText").show();
			$("#feedbackBox").show();
			$("#nextButton").show();
			$("#feedbackDiv p").remove();
			$("#feedbackDiv").append("<p> That's "+feedback+" </p>");
			//$("#scoreButtonText").text("Hello");
			$("#scoreButtonText").text("Answered correctly: " + userCorrectCount + "/" + noOfQuestions );


			currentQuestionPosition += 1;

			//Check if the end of the questions is reached, if not, load next question
			if (currentQuestionPosition < noOfQuestions) {
				loadQuestion();
			}

			//No more questions to load, end the game
			else {
				var scorePct = (userCorrectCount/noOfQuestions)*100;
				$("#nextButton").hide();
				$("#feedbackBox").css("height", "300px");
				$("#submitEndButton").val("You scored " + scorePct + "%");
				$("#submitEndButton").show();
				//endGame();
			}

		}

		//User did not make a selection
		else {
			alert("You have to select one of the choices");
		}



});

$("#nextButton").click(function(event) {
		$("#feedbackDiv p").remove();
		$("#feedbackBox").hide();
		$("#questionBox").show();
});


});