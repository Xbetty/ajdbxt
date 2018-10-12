//涉案财物为是时，出现涉案财物是否入库
function case_propertyBtnClick() {
	var case_property = document.getElementsByName("case_property");
	for (var num = 0; num < 2; num++) {
		var case_property_value = case_property[num].value;
		if (case_property[num].checked) {
			if (case_property_value == "1") {//"1"表示点击有涉案财物
				document.getElementById("property_storage_div").style.display = "block";
			}else{
				document.getElementById("property_storage_div").style.display = "none";
			}
		} 
	}
}

// 根据第一次强制措施所选进行判断

// 选择拘留时，显示出拘留延长期限
var second_str=null;
var third_str=null;
function mandatory_measuresBtnClick() {
	var mandatory_measuresOne = document.getElementsByName("mandatory_measuresOne");
	for (var num = 0; num < 3; num++) {
		var mandatory_measuresOne_value = mandatory_measuresOne[num].value;
		if (mandatory_measuresOne[num].checked) {
			if (mandatory_measuresOne_value == "0") {//"0"表示拘留
				document.getElementById("detention_delay_date").style.display = "block";
				document.getElementById("second_punishment").style.display = "block";
				second_str='<label style="margin: 0 10px;"> <input type="radio" name="punishment" id="punishment_arrest" class="second_punishment" value="0"> 逮捕</label>';
				second_str+='<label style="margin: 0 10px;"><input type="radio" name="punishment" id="punishment_qbhs" class="second_punishment" value="1" > 取保候审 </label>';
				second_str+='<label style="margin: 0 10px;"><input type="radio" name="punishment" class="second_punishment" value="2">监视居住 </label>';
				second_str+='<label style="margin: 0 0px;"> <input type="radio" name="punishment" class="second_punishment" value="3"> 撤案 </label>';
				$("#second_punishment_content").html(second_str);
				var punishment = document.getElementsByName("punishment");
				$(".second_punishment").bind("click",function(){
					if (this.value == "0") {
						third_str='<div class="process_title col-md-4">取保</div>';
						third_str+='<div class="radio col-md-4">';
						third_str+='<label style="margin: 0 10px;"> <input type="radio"  name="detention_delay_date" id="" value="1"> 是</label>';
						third_str+='<label style="margin: 0 10px;"> <input type="radio" name="detention_delay_date" id="" value="0"> 否</label>';
						third_str+='</div>';
						$("#third_punishmentone_value").html(third_str);
						$("#third_punishmentone").css("display","block");
					}
					else if (this.value == "1"){
						third_str='<div class="process_title col-md-4">撤案</div>';
						third_str+='<div class="radio col-md-4">';
						third_str+='<label style="margin: 0 10px;"> <input type="radio"  name="detention_delay_date" id="" value="1"> 是 </label>';
						third_str+='<label style="margin: 0 10px;"> <input type="radio" name="detention_delay_date" id="" value="0"> 否 </label>';
						third_str+='</div>';
						$("#third_punishmentone_value").html(third_str);
						$("#third_punishmentone").css("display","block");
						return;
					}else{
						$("#third_punishmentone").css("display","none");
					}
					
				});
			}
			else if(mandatory_measuresOne_value == "2"){//"2"表示取保候审
				document.getElementById("detention_delay_date").style.display = "none";
				document.getElementById("second_punishment").style.display = "block";
				second_str='<label style="margin: 0 10px;"> <input type="radio" name="punishment" value="4"> 解保 </label>';
				second_str+='<label style="margin: 0 0px;"> <input type="radio" name="punishment" value="5"> 撤案 </label>';
				$("#second_punishment_content").html(second_str);
				$("#third_punishmentone").css("display","none");
				
			}
			else{//其余为"1",表示监视居住
				document.getElementById("detention_delay_date").style.display = "none";
				document.getElementById("second_punishment").style.display = "none";
				document.getElementById("third_punishmentone").style.display="none";
			}
		} 
	}
}

//起诉为是时，显示补查一次，补查一次为是时，显示补查二次
function changesue() {
	var sue = document.getElementsByName("sue");
	for (var num = 0; num < 2; num++) {
		var sue_value = sue[num].value;
		if (sue[num].checked) {
			if (sue_value == "1") {
				document.getElementById("checkOne").style.display = "block";
			}
			else{
				document.getElementById("checkOne").style.display = "none";
				document.getElementById("checkTwo").style.display = "none";
			}
			document.getElementById("checkOneYes").onclick=function(){
				document.getElementById("checkTwo").style.display = "block";
			}
			document.getElementById("checkOneNo").onclick=function(){
				document.getElementById("checkTwo").style.display = "none";
			}
			}
		} 
	}




