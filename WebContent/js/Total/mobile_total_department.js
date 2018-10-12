/**
 * 
 */
var xhr;
var total_vo = null;
var a_value = null;
$(".a_total_type").bind("click", function() {
	total_info_type = this.innerHTML;
	mui('.mui-popover').popover('hide');
	$("#total_info_type").html(total_info_type);
	a_value = this.innerText;
	Mobile_List_Total_Department(a_value, 1);
	$(".input_date").bind("change", function() {
		Mobile_List_Total_Department(a_value, 1);
	});

});
function Mobile_List_Total_Department(e, pageIndex) {
	var e_str = null;

	if (e == "按行政案件数统计") {
		e_str = "0";

	} else if (e == "按刑事案件数统计") {
		e_str = "1";

	} else if (e == "按总案件数统计") {
		e_str = "2";

	} else if (e == "按行政案件平均分统计") {
		e_str = "3";

	} else {
		e_str = "4";
	}
	getXMLHttp();
	var select_start_time = document.getElementById("select_start_time").innerText
			+ " 00:00:00";
	var select_stop_time = document.getElementById("select_stop_time").innerText
			+ " 23:59:59";
	var adminCase = document.getElementById("adminCase").innerText;
	var criminalCase = document.getElementById("criminalCase").innerText;
	var sumCase = document.getElementById("sumCase"), innerText;
	var adminAverageScore = document.getElementById("adminAverageScore").innerText;
	var crimianAverageScore = document.getElementById("crimianAverageScore"), innerText;
	var total_info_type = null;

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				total_vo = JSON.parse(xhr.responseText);
				var new_li = null;
				var new_a = null;
				var span_alltotal = null;// 全局
				var span_num = null;// 部门序号
				var span_department = null;// 办案单位
				var span_checkTotal = null;// 判断根据什么统计

				// -----折叠信息-----
				var new_div = null;
				var new_form = null;// 折叠信息表单

				// 全局
				var div_alltotal = null;
				var label_alltotal = null;
				var input_alltotal = null;

				// 办案单位
				var div_department = null;
				var label_department = null;
				var input_department = null;

				// 行政案件
				var div_adminCase = null;
				var label_adminCase = null;
				var input_adminCase = null;

				// 刑事案件
				var div_criminalCase = null;
				var label_criminalCase = null;
				var input_criminalCase = null;

				// 总案件数
				var div_sumCase = null;
				var label_sumCase = null;
				var input_sumCase = null;

				// 行政案件平均分
				var div_adminAverageScore = null;
				var label_adminAverageScore = null;
				var input_adminAverageScore = null;

				// 刑事案件平均分
				var div_crimianAverageScore = null;
				var label_crimianAverageScore = null;
				var input_crimianAverageScore = null;

				// 获得ul的id
				var ul_total_department = document
						.getElementById("ul_total_department");

				/*
				 * 移出除标题以外的所有行
				 */
				var old_li = document.getElementsByClassName("new_li");
				var long = old_li.length;
				for (var i = 0; i < long; i++) {
					old_li[0].parentNode.removeChild(old_li[0]);
				}

				new_li = document.createElement("li");
				new_li.className = "mui-table-view-cell mui-collapse new_li";
				new_li.appendChild(document.createTextNode(''));
				ul_total_department.appendChild(new_li);
				/*
				 * a链接
				 */
				new_a = document.createElement("a");
				new_a.className = "mui-navigate-right";
				new_a.appendChild(document.createTextNode(''));
				new_li.appendChild(new_a);

				// 获得全局序号
				span_alltotal = document.createElement("span");
				new_a.appendChild(span_alltotal);
				span_alltotal.style.margin = " 0 10px 0 0";
				span_alltotal.style.padding = " 0 10px";
				span_alltotal.innerHTML = (1);

				// 全局
				span_alltotal = document.createElement("span");
				new_a.appendChild(span_alltotal);
				span_alltotal.innerHTML = total_vo.allDepartment;

				// 全局统计数量
				span_alltotal = document.createElement("span");
				span_alltotal.className = "mui-badge mui-badge-blue";
				new_a.appendChild(span_alltotal);
				span_alltotal.innerHTML = total_vo.allTotalCase;

				/*
				 * 全局折叠信息
				 */
				new_div = document.createElement("div");// 折叠信息div
				new_div.className = "mui-collapse-content mui-h5";
				new_div.style.text_indent = "25px";

				new_div.style.padding = "0 20px 0 20px";
				new_div.style.textIndent = "25px";

				new_form = document.createElement("form");
				new_form.className = "mui-input-group mui-h5";

				/*
				 * 全局折叠内容
				 */

				// 办案单位
				div_department = document.createElement("div");
				div_department.className = "mui-input-row mui-h5";
				label_department = document.createElement("label");
				label_department.innerHTML = "办案单位";
				label_department.style.padding = "11px 0px";
				input_department = document.createElement("input");
				input_department.className = "mui-input-clear  mui-h5";

				input_department.value = total_vo.allDepartment;
				input_department.type = "text";
				input_department.disabled = "disabled";
				input_department.style.paddingLeft = "20px";
				div_department.appendChild(label_department);
				div_department.appendChild(input_department);
				new_form.appendChild(div_department);

				input_department.style.textAlign = "right";
				input_department.style.padding = "0 30px";
				label_department.style.padding = "11px 0px";
				label_department.style.textAlign = "center";
				
				new_div.appendChild(new_form);
				new_li.appendChild(new_div);

				// 行政案件
				div_adminCase = document.createElement("div");
				div_adminCase.className = "mui-input-row";
				label_adminCase = document.createElement("label");
				label_adminCase.innerHTML = "行政案件";
				label_adminCase.style.padding = "11px 0px";
				input_adminCase = document.createElement("input");
				input_adminCase.className = "mui-input-clear  mui-h5";
				
				input_adminCase.style.textAlign = "right";
				input_adminCase.style.padding = "0 30px";
				label_adminCase.style.padding = "11px 0px";
				label_adminCase.style.textAlign = "center";


				input_adminCase.value = total_vo.allAdminCase;
				input_adminCase.type = "text";
				input_adminCase.disabled = "disabled";
				input_adminCase.style.paddingLeft = "20px";
				div_adminCase.appendChild(label_adminCase);
				div_adminCase.appendChild(input_adminCase);
				new_form.appendChild(div_adminCase);

				// 刑事案件
				div_criminalCase = document.createElement("div");
				div_criminalCase.className = "mui-input-row";
				label_criminalCase = document.createElement("label");
				label_criminalCase.innerHTML = "刑事案件";
				label_criminalCase.style.padding = "11px 0px";
				input_criminalCase = document.createElement("input");
				input_criminalCase.className = "mui-input-clear  mui-h5";

				input_criminalCase.style.textAlign = "right";
				input_criminalCase.style.padding = "0 30px";
				label_criminalCase.style.padding = "11px 0px";
				label_criminalCase.style.textAlign = "center";
				
				input_criminalCase.value = total_vo.allCriminCase;
				input_criminalCase.type = "text";
				input_criminalCase.disabled = "disabled";
				input_criminalCase.style.paddingLeft = "20px";
				div_criminalCase.appendChild(label_criminalCase);
				div_criminalCase.appendChild(input_criminalCase);
				new_form.appendChild(div_criminalCase);

				// 总案件数
				div_sumCase = document.createElement("div");
				div_sumCase.className = "mui-input-row";
				label_sumCase = document.createElement("label");
				label_sumCase.innerHTML = "总案件数";
				label_sumCase.style.padding = "11px 0px";
				input_sumCase = document.createElement("input");
				input_sumCase.className = "mui-input-clear  mui-h5";
				
				input_sumCase.style.textAlign = "right";
				input_sumCase.style.padding = "0 30px";
				label_sumCase.style.padding = "11px 0px";
				label_sumCase.style.textAlign = "center";

				input_sumCase.value = total_vo.allTotalCase;
				input_sumCase.type = "text";
				input_sumCase.disabled = "disabled";
				input_sumCase.style.paddingLeft = "20px";
				div_sumCase.appendChild(label_sumCase);
				div_sumCase.appendChild(input_sumCase);
				new_form.appendChild(div_sumCase);

				// 行政案件平均分
				div_adminAverageScore = document.createElement("div");
				div_adminAverageScore.className = "mui-input-row";
				label_adminAverageScore = document.createElement("label");
				label_adminAverageScore.innerHTML = "行政案件平均分";
				label_adminAverageScore.style.padding = "11px 0px";
				label_adminAverageScore.style.width = "126px";
				input_adminAverageScore = document.createElement("input");
				input_adminAverageScore.style.width = "120px";
				input_adminAverageScore.className = "mui-input-clear  mui-h5";
				
				input_adminAverageScore.style.textAlign = "right";
				input_adminAverageScore.style.padding = "0 30px";
				label_adminAverageScore.style.padding = "11px 0px";
				label_adminAverageScore.style.textAlign = "center";

				input_adminAverageScore.value = total_vo.allAdminAvgScore;
				input_adminAverageScore.type = "text";
				input_adminAverageScore.disabled = "disabled";
				input_adminAverageScore.style.paddingLeft = "20px";
				div_adminAverageScore.appendChild(label_adminAverageScore);
				div_adminAverageScore.appendChild(input_adminAverageScore);
				new_form.appendChild(div_adminAverageScore);

				// 刑事案件平均分
				div_crimianAverageScore = document.createElement("div");
				div_crimianAverageScore.className = "mui-input-row";
				label_crimianAverageScore = document.createElement("label");
				label_crimianAverageScore.innerHTML = "刑事案件平均分";
				label_crimianAverageScore.style.padding = "11px 0px";
				label_crimianAverageScore.style.width = "126px";
				input_crimianAverageScore = document.createElement("input");
				input_crimianAverageScore.style.width = "120px";
				input_crimianAverageScore.className = "mui-input-clear  mui-h5";
				
				input_crimianAverageScore.style.textAlign = "right";
				input_crimianAverageScore.style.padding = "0 30px";
				label_crimianAverageScore.style.padding = "11px 0px";
				label_crimianAverageScore.style.textAlign = "center";


				input_crimianAverageScore.value = total_vo.allCriminAvgScore;
				input_crimianAverageScore.type = "text";
				input_crimianAverageScore.disabled = "disabled";
				input_crimianAverageScore.style.paddingLeft = "20px";
				div_crimianAverageScore.appendChild(label_crimianAverageScore);
				div_crimianAverageScore.appendChild(input_crimianAverageScore);
				new_form.appendChild(div_crimianAverageScore);

				/*
				 * 将数据库的数据取出来放到表格里
				 */
				for (var num = 0; num < total_vo.statisticDepartmentCaseNumDTO.length; num++) {

					new_li = document.createElement("li");
					new_li.className = "mui-table-view-cell mui-collapse new_li";
					new_li.appendChild(document.createTextNode(''));
					ul_total_department.appendChild(new_li);
					/*
					 * 0. a链接
					 */
					new_a = document.createElement("a");
					new_a.className = "mui-navigate-right";
					new_a.appendChild(document.createTextNode(''));
					new_li.appendChild(new_a);
					/* new_a.id=total_vo.statisticDepartmentCaseNumDTO[num].department.ajdbxt_department_id; */

					/*
					 * 1. 部门序号
					 */
					span_num = document.createElement("span");
					span_num.innerHTML = num + 2;
					span_num.style.margin = " 0 10px 0 0";
					span_num.style.padding = " 0 10px";
					new_a.appendChild(span_num);

					/*
					 * 2.办案单位
					 */
					span_department = document.createElement("span");
					new_a.appendChild(span_department);
					span_department.innerHTML = total_vo.statisticDepartmentCaseNumDTO[num].department.department_name;

					/*
					 * 3.判断按什么类型统计
					 */
					span_checkTotal = document.createElement("span");
					span_checkTotal.className = "mui-badge mui-badge-blue";
					new_a.appendChild(span_checkTotal);

					if (document.getElementById("total_info_type").innerText == "按行政案件数统计") {
						span_checkTotal.innerHTML = total_vo.statisticDepartmentCaseNumDTO[num].adminCase;

					} else if (document.getElementById("total_info_type").innerText == "按刑事案件数统计") {
						span_checkTotal.innerHTML = total_vo.statisticDepartmentCaseNumDTO[num].criminalCase;

					} else if (document.getElementById("total_info_type").innerText == "按总案件数统计") {
						span_checkTotal.innerHTML = total_vo.statisticDepartmentCaseNumDTO[num].totalCase;

					} else if (document.getElementById("total_info_type").innerText == "按行政案件平均分统计") {
						span_checkTotal.innerHTML = total_vo.statisticDepartmentCaseNumDTO[num].adminAverageScore;

					} else {
						span_checkTotal.innerHTML = total_vo.statisticDepartmentCaseNumDTO[num].crimianAverageScore;
					}

					/*
					 * 4. 折叠信息
					 */
					new_div = document.createElement("div");// 折叠信息div
					new_div.className = "mui-collapse-content mui-h5";
					new_div.style.text_indent = "25px";
					new_div.style.padding = "0 20px 0 20px";
					new_div.style.textIndent = "25px";

					new_form = document.createElement("form");
					new_form.className = "mui-input-group mui-h5";

					// 办案单位
					div_department = document.createElement("div");
					div_department.className = "mui-input-row mui-h5";
					label_department = document.createElement("label");
					label_department.innerHTML = "办案单位";

					input_department = document.createElement("input");
					input_department.className = "mui-input-clear  mui-h5";

					input_department.value = total_vo.statisticDepartmentCaseNumDTO[num].department.department_name;
					input_department.type = "text";
					input_department.disabled = "disabled";

					div_department.appendChild(label_department);
					div_department.appendChild(input_department);
					new_form.appendChild(div_department);

					input_department.style.textAlign = "right";
					input_department.style.padding = "0 30px";
					label_department.style.padding = "11px 0px";
					label_department.style.textAlign = "center";

					new_div.appendChild(new_form);
					new_li.appendChild(new_div);

					// 行政案件
					div_adminCase = document.createElement("div");
					div_adminCase.className = "mui-input-row div_adminCase";
					label_adminCase = document.createElement("label");
					label_adminCase.innerHTML = "行政案件";
					label_adminCase.style.padding = "11px 0px";
					input_adminCase = document.createElement("input");
					input_adminCase.className = "mui-input-clear  mui-h5";
					input_adminCase.value = total_vo.statisticDepartmentCaseNumDTO[num].adminCase;
					
					input_adminCase.style.textAlign = "right";
					input_adminCase.style.padding = "0 30px";
					label_adminCase.style.padding = "11px 0px";
					label_adminCase.style.textAlign = "center";
					
					label_adminCase.id = total_vo.statisticDepartmentCaseNumDTO[num].department.ajdbxt_department_id;
					label_adminCase.onclick = function() {
						window.location.href = "/ajdbxt/total/Total_mobile_caseInfoList?totalcase=0&select_start_time="
								+ select_start_time
								+ "&select_stop_time="
								+ select_stop_time
								+ "&department_id="
								+ this.id;
					};
					
				
					input_adminCase.type = "text";
					input_adminCase.disabled = "disabled";
					input_adminCase.style.paddingLeft = "20px";
					div_adminCase.appendChild(label_adminCase);
					div_adminCase.appendChild(input_adminCase);
					new_form.appendChild(div_adminCase);

					// 刑事案件
					div_criminalCase = document.createElement("div");
					div_criminalCase.id = total_vo.statisticDepartmentCaseNumDTO[num].department.ajdbxt_department_id;
					div_criminalCase.className = "mui-input-row div_criminalCase";
					label_criminalCase = document.createElement("label");
					label_criminalCase.innerHTML = "刑事案件";
					label_criminalCase.style.padding = "11px 0px";
					input_criminalCase = document.createElement("input");
					input_criminalCase.className = "mui-input-clear  mui-h5";

					input_criminalCase.style.textAlign = "right";
					input_criminalCase.style.padding = "0 30px";
					label_criminalCase.style.padding = "11px 0px";
					label_criminalCase.style.textAlign = "center";

					input_criminalCase.value = total_vo.statisticDepartmentCaseNumDTO[num].criminalCase;
					
					label_criminalCase.id = total_vo.statisticDepartmentCaseNumDTO[num].department.ajdbxt_department_id;
					label_criminalCase.onclick = function() {
						window.location.href = "/ajdbxt/total/Total_mobile_caseInfoList?totalcase=1&select_start_time="
								+ select_start_time
								+ "&select_stop_time="
								+ select_stop_time
								+ "&department_id="
								+ this.id;
					};

					input_criminalCase.type = "text";
					input_criminalCase.disabled = "disabled";
					input_criminalCase.style.paddingLeft = "20px";
					div_criminalCase.appendChild(label_criminalCase);
					div_criminalCase.appendChild(input_criminalCase);
					new_form.appendChild(div_criminalCase);

					// 总案件数
					div_sumCase = document.createElement("div");
					div_sumCase.id = total_vo.statisticDepartmentCaseNumDTO[num].department.ajdbxt_department_id;
					div_sumCase.className = "mui-input-row div_sumCase";
					label_sumCase = document.createElement("label");
					label_sumCase.innerHTML = "总案件数";
					label_sumCase.style.padding = "11px 0px";
					input_sumCase = document.createElement("input");
					input_sumCase.className = "mui-input-clear  mui-h5";

					input_sumCase.style.textAlign = "right";
					input_sumCase.style.padding = "0 30px";
					label_sumCase.style.padding = "11px 0px";
					label_sumCase.style.textAlign = "center";
					input_sumCase.value = total_vo.statisticDepartmentCaseNumDTO[num].totalCase;
					
					label_sumCase.id = total_vo.statisticDepartmentCaseNumDTO[num].department.ajdbxt_department_id;
					label_sumCase.onclick = function() {
						window.location.href = "/ajdbxt/total/Total_mobile_caseInfoList?select_start_time="
								+ select_start_time
								+ "&select_stop_time="
								+ select_stop_time
								+ "&department_id="
								+ this.id;
					};
					input_sumCase.type = "text";
					input_sumCase.disabled = "disabled";
					input_sumCase.style.paddingLeft = "20px";
					div_sumCase.appendChild(label_sumCase);
					div_sumCase.appendChild(input_sumCase);
					new_form.appendChild(div_sumCase);

					// 行政案件平均分
					div_adminAverageScore = document.createElement("div");
					div_adminAverageScore.id = total_vo.statisticDepartmentCaseNumDTO[num].department.ajdbxt_department_id;
					div_adminAverageScore.className = "mui-input-row div_adminAverageScore";
					label_adminAverageScore = document.createElement("label");
					label_adminAverageScore.innerHTML = "行政案件平均分";
					label_adminAverageScore.style.padding = "11px 0px";
					/*label_adminAverageScore.style.width = "126px";*/
					input_adminAverageScore = document.createElement("input");
					input_adminAverageScore.style.width = "120px";
					input_adminAverageScore.className = "mui-input-clear  mui-h5";

					input_adminAverageScore.style.textAlign = "right";
					input_adminAverageScore.style.padding = "0 30px";
					label_adminAverageScore.style.padding = "11px 0px";
					label_adminAverageScore.style.textAlign = "center";
					input_adminAverageScore.value = total_vo.statisticDepartmentCaseNumDTO[num].adminAverageScore;
					
					label_adminAverageScore.id = total_vo.statisticDepartmentCaseNumDTO[num].department.ajdbxt_department_id;
					label_adminAverageScore.onclick = function() {
						window.location.href = "/ajdbxt/total/Total_mobile_caseInfoList?totalcase=1&select_start_time="
								+ select_start_time
								+ "&select_stop_time="
								+ select_stop_time
								+ "&department_id="
								+ this.id;
					};
					
					input_adminAverageScore.type = "text";
					input_adminAverageScore.disabled = "disabled";
					input_adminAverageScore.style.paddingLeft = "20px";
					div_adminAverageScore.appendChild(label_adminAverageScore);
					div_adminAverageScore.appendChild(input_adminAverageScore);
					new_form.appendChild(div_adminAverageScore);

					// 刑事案件平均分
					div_crimianAverageScore = document.createElement("div");
					div_crimianAverageScore.id = total_vo.statisticDepartmentCaseNumDTO[num].department.ajdbxt_department_id;
					div_crimianAverageScore.className = "mui-input-row div_crimianAverageScore";
					label_crimianAverageScore = document.createElement("label");
					label_crimianAverageScore.innerHTML = "刑事案件平均分";
					label_crimianAverageScore.style.padding = "11px 0px";
					/*label_crimianAverageScore.style.width = "126px";*/
					input_crimianAverageScore = document.createElement("input");
					input_crimianAverageScore.style.width = "120px";
					input_crimianAverageScore.className = "mui-input-clear  mui-h5";

					input_crimianAverageScore.style.textAlign = "right";
					input_crimianAverageScore.style.padding = "0 30px";
					label_crimianAverageScore.style.padding = "11px 0px";
					label_crimianAverageScore.style.textAlign = "center";
					input_crimianAverageScore.value = total_vo.statisticDepartmentCaseNumDTO[num].crimianAverageScore;
					
					label_crimianAverageScore.id = total_vo.statisticDepartmentCaseNumDTO[num].department.ajdbxt_department_id;
					label_crimianAverageScore.onclick = function() {
						window.location.href = "/ajdbxt/total/Total_mobile_caseInfoList?totalcase=1&select_start_time="
								+ select_start_time
								+ "&select_stop_time="
								+ select_stop_time
								+ "&department_id="
								+ this.id;
					};
					
					input_crimianAverageScore.type = "text";
					input_crimianAverageScore.disabled = "disabled";
					input_crimianAverageScore.style.paddingLeft = "20px";
					div_crimianAverageScore
							.appendChild(label_crimianAverageScore);
					div_crimianAverageScore
							.appendChild(input_crimianAverageScore);
					new_form.appendChild(div_crimianAverageScore);

				}

			}
		}
	}
	xhr
			.open("POST", "/ajdbxt/total/Total_getListDeparmentCaseStatistics",
					true);
	var formData = new FormData();
	formData.append("departmentStatisticVo.currePage", pageIndex);
	formData.append("departmentStatisticVo.start_time", select_start_time);
	formData.append("departmentStatisticVo.stop_time", select_stop_time);
	formData.append("departmentStatisticVo.orderString", e_str);
	xhr.send(formData);
}

function getXMLHttp() {
	if (window.XMLHttpRequest) {
		// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xhr = new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
}
