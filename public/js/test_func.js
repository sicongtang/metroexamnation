var questList = new Array();

function processClick(object){
	var items = object.value.split('_');
	var quest_idx = items[0];
	var answer_idx = items[1];
	
	var answerLetter = questList[quest_idx].answer;
	
	if(transformAnswer(answerLetter) != answer_idx){
		$("#hint_"+quest_idx).css("color","red")
		$("#hint_"+quest_idx).html("错误, 正确答案为:" + answerLetter);
		$("#hint_"+quest_idx).show();
	}else {
		$("#hint_"+quest_idx).css("color","green")
		$("#hint_"+quest_idx).html("正确.");
		$("#hint_"+quest_idx).show();
	}
	
};

function transformAnswer(answerLetter){
	if(answerLetter == 'A'){
		return 0;
	}else if(answerLetter == 'B'){
		return 1;
	}else if(answerLetter == 'C'){
		return 2;
	}else if(answerLetter == 'D'){
		return 3;
	}
}

$(document).ready(
		function() {

			function processClick(object){
				alert(object.name);
				alert(object.value);
			};
			
			function readTextFile() {
				var rawFile = new XMLHttpRequest();
				rawFile.open("GET", "source/question_raw.txt", true);
				rawFile.onreadystatechange = function() {
					if (rawFile.readyState === 4) {
						var allText = rawFile.responseText;
						var line = allText.split('\n');
						$.each(line, function(index, value) {
							var items = value.split('|');
							var quest = new Object();
							quest.idx = index;
							quest.type = items[0];
							quest.content = items[1];
							quest.answer = items[2];
							
							var optionList = new Array();
							
							optionList.push(items[3]);
							optionList.push(items[4]);
							optionList.push(items[5]);
							optionList.push(items[6]);
							
							quest.optionList = optionList;

							questList.push(quest);
						});

						var questStrLine = "";
						
						$.each(questList, function(index, value) {
							var quest = value;
							
							questStrLine += "<div class='r-qu-body'>";
							questStrLine += "<div class='r-qu-body-title'>";
							questStrLine += "" + (quest.idx + 1) + "、<p>"+quest.content+"</p>[" + quest.type + "]";
							questStrLine += "</div>";
							questStrLine += "<div class='r-qu-body-content'>";
							questStrLine += "<ul class='r-qu-body-ul1'>";
							
							$.each(quest.optionList, function(index, value) {
								questStrLine += "<li><ul class='quItem-ul'>";
								questStrLine += "<li><input type='radio' name='radio_"+quest.idx+"' value='"+quest.idx+"_"+index+"' onclick='processClick(this);' /></li>";
								questStrLine += "<li class='quItemOptionName rd_ck'><p>"+value+"</p></li>";
								questStrLine += "</ul></li>";
							});
							
							//hint area
							questStrLine += "<li id='hint_"+quest.idx+"' style='display:none'></li>";
							
							questStrLine += "</ul>";
							questStrLine += "<div style='clear: both;'></div>";
							questStrLine += "<div class='quItemNote'></div>";
							questStrLine += "</div>";
							questStrLine += "</div>";
							
						});
						
						$("#quest_content_id").html(questStrLine);

					}
				}

				//rawFile.send();
			}
			
			readTextFile();
		});



