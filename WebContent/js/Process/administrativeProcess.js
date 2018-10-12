//破案财物为是时，出现破案财物是否入库
function case_propertyBtnClick(button) {
	var case_property = document.getElementsByName("case_property");
	for (var num = 0; num < 2; num++) {
		var case_property_value = case_property[num].value;
		if (case_property[num].checked) {
			if (case_property_value == "case_property_yes") {
				document.getElementById("property_storage_div").style.display = "block";
			}
		} 
		button.disabled = "false";
		case_property[num].disabled = "false";
	}
}
//听证申请
function hearing_applyingBtnClick(button) {
	var hearing_applying = document.getElementsByName("hearing_applying");
	for (var num = 0; num < 2; num++) {
		var hearing_applying_value = hearing_applying[num].value;
		if (hearing_applying[num].checked) {
			if (hearing_applying_value == "hearing_applying_yes") {
				document.getElementById("hearing_accepting_div").style.display = "block";
			}
		} 
		button.disabled = "false";
		hearing_applying[num].disabled = "false";
	}
}
//受理听证
function hearing_acceptingBtnClick(button) {
	var hearing_accepting = document.getElementsByName("hearing_accepting");
	for (var num = 0; num < 2; num++) {
		var hearing_accepting_value = hearing_accepting[num].value;
		if (hearing_accepting[num].checked) {
			if (hearing_accepting_value == "hearing_accepting_yes") {
				document.getElementById("hearing_holding_div").style.display = "block";
			}
		} 
		button.disabled = "false";
		hearing_accepting[num].disabled = "false";
	}
}
