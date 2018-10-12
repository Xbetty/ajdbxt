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
	Mobile_List_Total_User(a_value,1);
	$(".input_date").bind("change", function() {
		Mobile_List_Total_User(a_value,1);
	});

});
function Mobile_List_Total_User(e,pageIndex) {
	var e_str=null;
	if(e=="按主办行政案件数统计"){
		e_str="0";
		
	}
	else if(e=="按主办刑事案件数统计"){
		e_str="1";
		
	}
	else if(e=="按协办行政案件数统计"){
		e_str="2";
		
	}
	else if(e=="按协办刑事案件数统计"){
		e_str="3";
		
	}
	else if(e=="按行政案件平均分统计"){
		e_str="4";
		
	}
	else{
		e_str="5";
	}
	getXMLHttp();
	var select_start_time = document.getElementById("select_start_time").innerText+" 00:00:00";
	var select_stop_time = document.getElementById("select_stop_time").innerText+" 23:59:59";
	var input_PoliceSearchText=document.getElementById("input_PoliceSearchText").value;
	var select_case_department_id = document.getElementById("select_case_department_id").innerText;
	
	var MainadminCase = document.getElementById("MainadminCase").innerText;
	var MaincriminalCase = document.getElementById("MaincriminalCase").innerText;
	var InsisadminCase = document.getElementById("InsisadminCase").innerText;
	var InsiscriminalCase = document.getElementById("InsiscriminalCase").innerText;
	var adminAverageScore=document.getElementById("adminAverageScore").innerText;
	var criminalAverageScore=document.getElementById("criminalAverageScore").innerText;
	
	var total_info_type = null;

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				total_vo = JSON.parse(xhr.responseText);
				var new_li = null;
				var new_a = null;
				var span_num = null;// 部门序号
				var span_policeName = null;// 人员
				var policeId=null;// 人员id
				var span_checkTotal = null;// 判断根据什么统计

				// -----折叠信息-----
				var new_div = null;
				var new_form = null;// 折叠信息表单

				// 人员
				var div_policeName = null;
				var label_policeName = null;
				var input_policeName = null;

				// 办案单位
				var div_department = null;
				var label_department = null;
				var input_department = null;
				
				// 主办行政案件数
				var div_MainadminCase = null;
				var label_MainadminCase = null;
				var input_MainadminCase = null;

				// 主办刑事案件数
				var div_MaincriminalCase = null;
				var label_MaincriminalCase = null;
				var input_MaincriminalCase = null;
				
				// 协办行政案件数
				var div_InsisadminCase = null;
				var label_InsisadminCase = null;
				var input_InsisadminCase = null;

				// 协办刑事案件数
				var div_InsiscriminalCase = null;
				var label_InsiscriminalCase = null;
				var input_InsiscriminalCase = null;

				// 行政案件平均分
				var div_adminAverageScore = null;
				var label_adminAverageScore = null;
				var input_adminAverageScore = null;
				
				// 刑事案件平均分
				var div_criminalAverageScore = null;
				var label_criminalAverageScore = null;
				var input_criminalAverageScore = null;

				// 获得ul的id
				var ul_total_user = document.getElementById("ul_total_user");

				/*
				 * 移出除标题以外的所有行
				 */

				var old_li = document.getElementsByClassName("new_li");
				var long = old_li.length;
				for (var i = 0; i < long; i++) {
					old_li[0].parentNode.removeChild(old_li[0]);
				}

				var str_page_row = null;
				console.log("total_vo.totalRecords:" +total_vo.totalRecords);
				if (total_vo.totalRecords > 0) {

					/*
					 * 移出除标题以外的所有行
					 */

					var old_li = document.getElementsByClassName("new_li");
					var long = old_li.length;
					for (var i = 0; i < long; i++) {
						old_li[0].parentNode.removeChild(old_li[0]);
					}

					
					/*
					 * 将数据库的数据取出来放到表格里
					 */
					for (var num = 0; num < total_vo.statisticPoliceCaseDto.length; num++) {
						new_li = document.createElement("li");
						new_li.className = "mui-table-view-cell mui-collapse new_li";
						new_li.appendChild(document.createTextNode(''));
						ul_total_user.appendChild(new_li);
						
						/*
						 * 0. a链接
						 */
						new_a = document.createElement("a");
						new_a.className = "mui-navigate-right";
						new_a.appendChild(document.createTextNode(''));
						new_li.appendChild(new_a);

						/*
						 * 1. 部门序号
						 */
						span_num = document.createElement("span");
						span_num.innerHTML = num + 1;
						span_num.style.margin = " 0 10px 0 0";
						span_num.style.padding = " 0 10px";
						new_a.appendChild(span_num);

						/*
						 * 2.人员
						 */
						span_policeName = document.createElement("span");
						new_a.appendChild(span_policeName);
						span_policeName.innerHTML =total_vo.statisticPoliceCaseDto[num].police.police_name;
						new_a.href = "/ajdbxt/total/Total_mobile_caseInfoList?policeId="+policeId+"&select_start_time="
						+select_start_time+"&select_stop_time="+select_stop_time;

						/*
						 * 3.判断按平均分还是主办行政或刑事案件还是协办行政或刑事案件统计
						 */
						span_checkTotal = document.createElement("span");
						span_checkTotal.className = "mui-badge mui-badge-blue";
						new_a.appendChild(span_checkTotal);
						
						
						if(document.getElementById("total_info_type").innerText=="按主办行政案件数统计"){
							span_checkTotal.innerHTML = total_vo.statisticPoliceCaseDto[num].adminMianCase;
						}
						else if(document.getElementById("total_info_type").innerText=="按主办刑事案件数统计"){
							span_checkTotal.innerHTML = total_vo.statisticPoliceCaseDto[num].crimalMainCase;
						}
						else if(document.getElementById("total_info_type").innerText=="按协办行政案件数统计"){
							span_checkTotal.innerHTML = total_vo.statisticPoliceCaseDto[num].adminAsistCase;
						}
						else if(document.getElementById("total_info_type").innerText=="按协办刑事案件数统计"){
							span_checkTotal.innerHTML = total_vo.statisticPoliceCaseDto[num].crimalAsistCase;
						}
						else if(document.getElementById("total_info_type").innerText=="按行政案件平均分统计"){
							span_checkTotal.innerHTML = total_vo.statisticPoliceCaseDto[num].adminMainAvgScore;
						}else{
							span_checkTotal.innerHTML = total_vo.statisticPoliceCaseDto[num].cirmalMianAvgScore;
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
						label_department.style.padding = "11px 0px";
						input_department = document.createElement("input");
						input_department.className = "mui-input-clear  mui-h5";
						
						input_department.style.textAlign = "right";
						input_department.style.padding = "0 30px";
						label_department.style.padding = "11px 0px";
						label_department.style.textAlign = "center";
						input_department.value = total_vo.statisticPoliceCaseDto[num].department.department_name;
						
						input_department.type = "text";
						input_department.disabled = "disabled";
						input_department.style.paddingLeft = "20px";
						div_department.appendChild(label_department);
						div_department.appendChild(input_department);
						new_form.appendChild(div_department);
						new_div.appendChild(new_form);
						new_li.appendChild(new_div);
						

						// 人员
						div_policeName = document.createElement("div");
						div_policeName.className = "mui-input-row div_policeName";
						label_policeName = document.createElement("label");
						label_policeName.innerHTML = "姓名";
						label_policeName.style.padding = "11px 0px";
						input_policeName = document.createElement("input");
						input_policeName.className = "mui-input-clear  mui-h5";
						input_policeName.value = total_vo.statisticPoliceCaseDto[num].police.police_name;
						
						input_policeName.style.textAlign = "right";
						input_policeName.style.padding = "0 30px";
						label_policeName.style.padding = "11px 0px";
						label_policeName.style.textAlign = "center";
						
						label_policeName.id = total_vo.statisticPoliceCaseDto[num].police.ajdbxt_police_id;
						label_policeName.onclick = function() {
								window.location.href = "/ajdbxt/total/Total_mobile_caseInfoList?&select_start_time="
								+select_start_time+"&select_stop_time="+select_stop_time+"&policeId="+this.id;
								};
						
						input_policeName.type = "text";
						input_policeName.disabled = "disabled";
						input_policeName.style.paddingLeft = "20px";
						div_policeName.appendChild(label_policeName);
						div_policeName.appendChild(input_policeName);
						new_form.appendChild(div_policeName);
						
						// 主办行政案件数
						div_MainadminCase = document.createElement("div");
						div_MainadminCase.className = "mui-input-row div_MainadminCase";
						label_MainadminCase = document.createElement("label");
						label_MainadminCase.innerHTML = "主办行政案件数";
						label_MainadminCase.style.padding = "11px 0px";
						input_MainadminCase = document.createElement("input");
						input_MainadminCase.className = "mui-input-clear  mui-h5";
						input_MainadminCase.value =  total_vo.statisticPoliceCaseDto[num].adminMianCase;
						
						input_MainadminCase.style.textAlign = "right";
						input_MainadminCase.style.padding = "0 30px";
						input_MainadminCase.style.width = "120px";
						label_MainadminCase.style.width = "130px";
						label_MainadminCase.style.padding = "11px 0px";
						label_MainadminCase.style.textAlign = "center";
						
						label_MainadminCase.id = total_vo.statisticPoliceCaseDto[num].police.ajdbxt_police_id;
						label_MainadminCase.onclick = function() {
								window.location.href = "/ajdbxt/total/Total_mobile_caseInfoList?totalcase=0&select_start_time="
									+select_start_time+"&select_stop_time="+select_stop_time+"&policeId="+this.id;
						};
						
						input_MainadminCase.type = "text";
						input_MainadminCase.disabled = "disabled";
						input_MainadminCase.style.paddingLeft = "20px";
						div_MainadminCase.appendChild(label_MainadminCase);
						div_MainadminCase.appendChild(input_MainadminCase);
						new_form.appendChild(div_MainadminCase);
						
						// 主办刑事案件数
						div_MaincriminalCase = document.createElement("div");
						div_MaincriminalCase.className = "mui-input-row div_MaincriminalCase";
						label_MaincriminalCase = document.createElement("label");
						label_MaincriminalCase.innerHTML = "主办刑事案件数";
						label_MaincriminalCase.style.padding = "11px 0px";
						input_MaincriminalCase = document.createElement("input");
						input_MaincriminalCase.className = "mui-input-clear  mui-h5";
						input_MaincriminalCase.value = total_vo.statisticPoliceCaseDto[num].crimalMainCase;
						
						input_MaincriminalCase.style.textAlign = "right";
						input_MaincriminalCase.style.padding = "0 30px";
						input_MaincriminalCase.style.width = "120px";
						label_MaincriminalCase.style.width = "130px";
						label_MaincriminalCase.style.padding = "11px 0px";
						label_MaincriminalCase.style.textAlign = "center";
						
						label_MaincriminalCase.id = total_vo.statisticPoliceCaseDto[num].police.ajdbxt_police_id;
						label_MaincriminalCase.onclick = function() {
								window.location.href = "/ajdbxt/total/Total_mobile_caseInfoList?totalcase=1&select_start_time="
									+select_start_time+"&select_stop_time="+select_stop_time+"&policeId="+this.id;
						};
						input_MaincriminalCase.type = "text";
						input_MaincriminalCase.disabled = "disabled";
						input_MaincriminalCase.style.paddingLeft = "20px";
						div_MaincriminalCase.appendChild(label_MaincriminalCase);
						div_MaincriminalCase.appendChild(input_MaincriminalCase);
						new_form.appendChild(div_MaincriminalCase);
						
						// 协办行政案件数
						div_InsisadminCase = document.createElement("div");
						div_InsisadminCase.className = "mui-input-row div_InsisadminCase";
						label_InsisadminCase = document.createElement("label");
						label_InsisadminCase.innerHTML = "协办行政案件数";
						label_InsisadminCase.style.padding = "11px 0px";
						input_InsisadminCase = document.createElement("input");
						input_InsisadminCase.className = "mui-input-clear  mui-h5";
						input_InsisadminCase.value =  total_vo.statisticPoliceCaseDto[num].adminAsistCase;
						
						input_InsisadminCase.style.textAlign = "right";
						input_InsisadminCase.style.padding = "0 30px";
						input_InsisadminCase.style.width = "120px";
						label_InsisadminCase.style.width = "130px";
						label_InsisadminCase.style.padding = "11px 0px";
						label_InsisadminCase.style.textAlign = "center";
						
						label_InsisadminCase.id = total_vo.statisticPoliceCaseDto[num].police.ajdbxt_police_id;
						label_InsisadminCase.onclick = function() {
								window.location.href = "/ajdbxt/total/Total_mobile_caseInfoList?totalcase=2&select_start_time="
									+select_start_time+"&select_stop_time="+select_stop_time+"&policeId="+this.id;
						};
						input_InsisadminCase.type = "text";
						input_InsisadminCase.disabled = "disabled";
						input_InsisadminCase.style.paddingLeft = "20px";
						div_InsisadminCase.appendChild(label_InsisadminCase);
						div_InsisadminCase.appendChild(input_InsisadminCase);
						new_form.appendChild(div_InsisadminCase);

						// 协办刑事案件数
						div_InsiscriminalCase = document.createElement("div");
						div_InsiscriminalCase.className = "mui-input-row div_InsiscriminalCase";
						label_InsiscriminalCase = document.createElement("label");
						label_InsiscriminalCase.innerHTML = "协办刑事案件数";
						label_InsiscriminalCase.style.padding = "11px 0px";
						input_InsiscriminalCase = document.createElement("input");
						input_InsiscriminalCase.className = "mui-input-clear  mui-h5";
						input_InsiscriminalCase.value = total_vo.statisticPoliceCaseDto[num].crimalAsistCase;
						
						input_InsiscriminalCase.style.textAlign = "right";
						input_InsiscriminalCase.style.padding = "0 30px";
						input_InsiscriminalCase.style.width = "120px";
						label_InsiscriminalCase.style.width = "130px";
						label_InsiscriminalCase.style.padding = "11px 0px";
						label_InsiscriminalCase.style.textAlign = "center";
						
						label_InsiscriminalCase.id = total_vo.statisticPoliceCaseDto[num].police.ajdbxt_police_id;
						label_InsiscriminalCase.onclick = function() {
								window.location.href = "/ajdbxt/total/Total_mobile_caseInfoList?totalcase=3&select_start_time="
									+select_start_time+"&select_stop_time="+select_stop_time+"&policeId="+this.id;
						};
						input_InsiscriminalCase.type = "text";
						input_InsiscriminalCase.disabled = "disabled";
						input_InsiscriminalCase.style.paddingLeft = "20px";
						div_InsiscriminalCase.appendChild(label_InsiscriminalCase);
						div_InsiscriminalCase.appendChild(input_InsiscriminalCase);
						new_form.appendChild(div_InsiscriminalCase);
						
						// 行政案件平均分
						div_adminAverageScore = document.createElement("div");
						div_adminAverageScore.className = "mui-input-row div_adminAverageScore";
						label_adminAverageScore = document.createElement("label");
						label_adminAverageScore.innerHTML = "行政案件平均分";
						label_adminAverageScore.style.padding = "11px 0px";
						input_adminAverageScore = document.createElement("input");
						input_adminAverageScore.className = "mui-input-clear  mui-h5";
						input_adminAverageScore.value = total_vo.statisticPoliceCaseDto[num].adminMainAvgScore;
						
						input_adminAverageScore.style.textAlign = "right";
						input_adminAverageScore.style.padding = "0 30px";
						input_adminAverageScore.style.width = "120px";
						label_adminAverageScore.style.width = "130px";
						label_adminAverageScore.style.padding = "11px 0px";
						label_adminAverageScore.style.textAlign = "center";
						
						label_adminAverageScore.id = total_vo.statisticPoliceCaseDto[num].police.ajdbxt_police_id;
						label_adminAverageScore.onclick = function() {
								window.location.href = "/ajdbxt/total/Total_mobile_caseInfoList?totalcase=1&select_start_time="
									+select_start_time+"&select_stop_time="+select_stop_time+"&policeId="+this.id;
						};
						input_adminAverageScore.type = "text";
						input_adminAverageScore.disabled = "disabled";
						input_adminAverageScore.style.paddingLeft = "20px";
						div_adminAverageScore.appendChild(label_adminAverageScore);
						div_adminAverageScore.appendChild(input_adminAverageScore);
						new_form.appendChild(div_adminAverageScore);
						
						// 刑事案件平均分
						div_criminalAverageScore = document.createElement("div");
						div_criminalAverageScore.className = "mui-input-row div_criminalAverageScore";
						label_criminalAverageScore = document.createElement("label");
						label_criminalAverageScore.innerHTML = "刑事案件平均分";
						label_criminalAverageScore.style.padding = "11px 0px";
						input_criminalAverageScore = document.createElement("input");
						input_criminalAverageScore.className = "mui-input-clear  mui-h5";
						input_criminalAverageScore.value = total_vo.statisticPoliceCaseDto[num].cirmalMianAvgScore;
						
						input_criminalAverageScore.style.textAlign = "right";
						input_criminalAverageScore.style.padding = "0 30px";
						input_criminalAverageScore.style.width = "120px";
						label_criminalAverageScore.style.width = "130px";
						label_criminalAverageScore.style.padding = "11px 0px";
						label_criminalAverageScore.style.textAlign = "center";
						
						label_criminalAverageScore.id = total_vo.statisticPoliceCaseDto[num].police.ajdbxt_police_id;
						label_criminalAverageScore.onclick = function() {
								window.location.href = "/ajdbxt/total/Total_mobile_caseInfoList?totalcase=1&select_start_time="
									+select_start_time+"&select_stop_time="+select_stop_time+"&policeId="+this.id;
						};
						input_criminalAverageScore.type = "text";
						input_criminalAverageScore.disabled = "disabled";
						input_criminalAverageScore.style.paddingLeft = "20px";
						div_criminalAverageScore.appendChild(label_criminalAverageScore);
						div_criminalAverageScore.appendChild(input_criminalAverageScore);
						new_form.appendChild(div_criminalAverageScore);
						
						
					}
				}
					else {
						$("#ul_total_user")
								.html(
										'<li class="mui-table-view-cell mui-collapse new_li" style="text-align:center;color:red;font-size:20px;margin:10px 0;">抱歉，无统计信息</li>');
					}
					/*console.log("total_vo.currePage:" + total_vo.currePage);
					console.log("total_vo.totalPages:" +total_vo.totalPages);
					console.log("total_vo.totalRecords:" + total_vo.totalRecords);*/
					// 翻页
					str_page_row = '<li class="mui-disabled "><span onclick="flip(2)"> &laquo; </span>';// 上一页
					str_page_row += '<span><select class="mui-select" id="select_page" style="padding:0 15px;margin-bottom:0px;">'
					for (var pageCount = 1; pageCount <= total_vo.totalPages; pageCount++) {
						str_page_row += '<option';
						if (pageCount == total_vo.currePage) {
							str_page_row += ' selected="selected" ';
						}
						str_page_row += '><a>' + pageCount + ' </a></option>';
					}

					str_page_row += '</select></span>';
					str_page_row += '<span onclick="flip(3)">&raquo;</span></li>';// 下一页
					$("#ul_page_count").html(str_page_row);
					// 翻页跳转页面
					document.getElementById("select_page").onchange = function() {
						Mobile_List_Total_User(a_value,this.value);
					};// ---- 翻页

			}
		}
	}
	if (pageIndex == null || pageIndex.preventDefault) {
		pageIndex = 1;
	}
	xhr.open("POST", "/ajdbxt/total/Total_getListPoiceCaseStatistic", true);
	var formData = new FormData();
	formData.append("policeCaseStatisticVo.currePage", pageIndex);
	formData.append("policeCaseStatisticVo.searchPolice",input_PoliceSearchText);
	formData.append("policeCaseStatisticVo.department", select_case_department_id);
	formData.append("policeCaseStatisticVo.start_time", select_start_time);
	formData.append("policeCaseStatisticVo.stop_time", select_stop_time);
	formData.append("policeCaseStatisticVo.orderString",e_str);
	xhr.send(formData);
}

/*
 * 判断页数
 */
function flip(flipPage) {
	switch (flipPage) {
	/* 首页 */
	case 1: {
		Mobile_List_Total_User(a_value,1)
		break;
	}
		/* 上一页 */
	case 2: {
		if (total_vo.currePage - 1 == 0) {
			mui.toast("已经是第一页了");
		} else {
			Mobile_List_Total_User(a_value,total_vo.currePage - 1);
		}
		break;
	}
		/* 下一页 */
	case 3: {
		if (total_vo.currePage == total_vo.totalPages) {
			mui.toast("已经是最后一页了");
		} else {
			Mobile_List_Total_User(a_value,total_vo.currePage + 1);
		}
		break;
	}
		/* 尾页 */
	case 4: {
		Mobile_List_Total_User(a_value,total_vo.totalPages);

		break;
	}

	}
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
