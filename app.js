
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
				"For how many positive two-digit integers is the ones digit greater than twice the tens digit?",
				"",
				["16", "20", "28", "32", "36"],
				"16"
				);



var noOfQuestions = arrayQuestions.length;
var currentQuestionPosition = 0;
var userCorrectCount = 0;
var feedback;

var startGame = function() {

	//Move menu squares to the left, create box to the right
	//Call loadQuestion function
	$("#endButton").show(2000);
	$("#questionBox").show();
	loadQuestion();
}



var loadQuestion = function() {

			$("#commentButtonText").text(currentQuestionPosition+1 + " of " + noOfQuestions);
			$("#commentButtonText").show();

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

}

var clearQuestion = function() {
		//Clear old question and choices
		$("#questionDiv p").remove();
		$("input[type=radio]").attr("checked", false);

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
	$("#commentButtonText").text("Give up already? Oh well");
	$("#startButton").show();
	$("#endButton").hide();
	$("#questionBox").hide();
	$(".main").animate(
		{left: '300px'},
		500,
		"swing"
		);
})

$("#submitButton").click(function(event) {

		event.preventDefault();
		event.stopPropagation();

		var userAnswer = $('input[name="choices"]:checked').val();
		var realAnswer = arrayQuestions[currentQuestionPosition].answer;

		console.log(userAnswer, realAnswer);
		
		if (userAnswer == realAnswer) {
			userCorrectCount += 1;
			feedback = "Correct";
		} else {
			feedback = "Wrong";
		}

		$("#commentButtonText").text(feedback);
		console.log($("#commentButtonText").text());
		console.log(userCorrectCount);

		//Clear old question and choices
		clearQuestion();
		feedback = "";
		currentQuestionPosition += 1;

		if (currentQuestionPosition < noOfQuestions) {
		loadQuestion();
		}
		else {
			$("#questionBox").hide();
			// Write end of quiz actions here
			$("#commentButtonText").text("");
			$("#commentButtonText").text("You scored "+ userCorrectCount + "/" + noOfQuestions);
			console.log($("#commentButtonText").text());
		}

});




});