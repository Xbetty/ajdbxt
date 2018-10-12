/**
 * 
 */
window.onload = function() {
	totalCase=GetQueryString("totalcase");
	select_start_time=GetQueryString("select_start_time");
	select_stop_time=GetQueryString("select_stop_time");
	department_id=GetQueryString("department_id");
	policeId=GetQueryString("policeId");
	alert(totalCase);
	//判断是
	if(totalCase !=null && totalCase.length>0){
		getCase(totalCase,select_start_time,select_stop_time,department_id,policeId);
	}else{
		getCase(null,select_start_time,select_stop_time,department_id,policeId);
	}	
}

//获取地址栏参数
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)
    	 return  unescape(r[2]); 
     return null;
}
//发送请求获取后台数据
function getCase(totalCase,select_start_time,select_stop_time,department_id,policeId) { 
	 var pageIndex=1;
	 Mobile_List_Total_Link(pageIndex,totalCase,select_start_time,select_stop_time,department_id,policeId);
}


var xhr;
var total_vo = null;

function Mobile_List_Total_Link(pageIndex,totalCase,select_start_time,select_stop_time,department_id,policeId) {
	getXMLHttp();
	var input_Total_CaseSearchText = document.getElementById("input_Total_CaseSearchText").value;
	var total_info_type = null;

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				total_vo = JSON.parse(xhr.responseText);
				var new_li = null;
				var new_a = null;
				var span_num = null;// 序号
				var span_caseName = null;// 案件名
				var span_score = null;// 评分

				// -----折叠信息-----
				var new_div = null;
				var new_form = null;// 折叠信息表单

				// 案件名
				var div_caseName = null;
				var label_caseName = null;
				var input_caseName = null;

				// 评分
				var div_score = null;
				var label_score = null;
				var input_score = null;
				
				// 及时整改
				var div_correctiveTimely = null;
				var label_correctiveTimely = null;
				var input_correctiveTimely = null;

				// 整改到位
				var div_rectification = null;
				var label_rectification = null;
				var input_rectification = null;
				
				// 案卷及时上交
				var div_caseDue = null;
				var label_caseDue = null;
				var input_caseDue = null;

				// 涉案财物及时入库
				var div_propertyStorage = null;
				var label_propertyStorage = null;
				var input_propertyStorage = null;


				// 获得ul的id
				var ul_total_link = document.getElementById("ul_total_link");

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
					for (var num = 0; num <  total_vo.caseListDTO.length; num++) {
						new_li = document.createElement("li");
						new_li.className = "mui-table-view-cell mui-collapse new_li";
						new_li.appendChild(document.createTextNode(''));
						ul_total_link.appendChild(new_li);
						/*
						 * 0. a链接
						 */
						new_a = document.createElement("a");
						new_a.className = "mui-navigate-right";
						new_a.appendChild(document.createTextNode(''));
						new_li.appendChild(new_a);

						/*
						 * 1. 序号
						 */
						span_num = document.createElement("span");
						span_num.innerHTML = num + 1;
						span_num.style.margin = " 0 10px 0 0";
						span_num.style.padding = " 0 10px";
						new_a.appendChild(span_num);

						/*
						 * 2.案件名
						 */
						span_caseName = document.createElement("span");
						new_a.appendChild(span_caseName);
						span_caseName.innerHTML = total_vo.caseListDTO[num].info.info_name;

						/*
						 * 3.评分
						 */
						span_score = document.createElement("span");
						span_score.className = "mui-badge mui-badge-blue";
						span_score.innerHTML = total_vo.caseListDTO[num].prcocess.process_score;
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
						
						// 案件名
						div_caseName = document.createElement("div");
						div_caseName.className = "mui-input-row mui-h5";
						label_caseName = document.createElement("label");
						label_caseName.innerHTML = "案件名";
						label_caseName.style.padding = "11px 0px";
						input_caseName = document.createElement("input");
						input_caseName.className = "mui-input-clear  mui-h5";
						
						input_caseName.style.textAlign = "right";
						input_caseName.style.padding = "0 30px";
						label_caseName.style.padding = "11px 0px";
						label_caseName.style.textAlign = "center";

						input_caseName.value = total_vo.caseListDTO[num].info.info_name;
						input_caseName.type = "text";
						input_caseName.disabled = "disabled";
						input_caseName.style.paddingLeft = "20px";
						div_caseName.appendChild(label_caseName);
						div_caseName.appendChild(input_caseName);
						new_form.appendChild(div_caseName);
						new_div.appendChild(new_form);
						new_li.appendChild(new_div);
						
						// 评分
						div_score = document.createElement("div");
						div_score.className = "mui-input-row";
						label_score = document.createElement("label");
						label_score.innerHTML = "评分";
						label_score.style.padding = "11px 0px";
						input_score = document.createElement("input");
						input_score.className = "mui-input-clear  mui-h5";

						input_score.style.textAlign = "right";
						input_score.style.padding = "0 30px";
						label_score.style.padding = "11px 0px";
						label_score.style.textAlign = "center";

						input_score.value = total_vo.caseListDTO[num].prcocess.process_score;
						input_score.type = "text";
						input_score.disabled = "disabled";
						input_score.style.paddingLeft = "20px";
						div_score.appendChild(label_score);
						div_score.appendChild(input_score);
						new_form.appendChild(div_score);
						
						// 及时整改
						div_correctiveTimely = document.createElement("div");
						div_correctiveTimely.className = "mui-input-row";
						label_correctiveTimely = document.createElement("label");
						label_correctiveTimely.innerHTML = "及时整改";
						label_correctiveTimely.style.padding = "11px 0px";
						input_correctiveTimely = document.createElement("input");
						input_correctiveTimely.className = "mui-input-clear  mui-h5";
						
						input_correctiveTimely.style.textAlign = "right";
						input_correctiveTimely.style.padding = "0 30px";
						label_correctiveTimely.style.padding = "11px 0px";
						label_correctiveTimely.style.textAlign = "center";

						input_correctiveTimely.value = isUndefined(total_vo.caseListDTO[num].prcocess.process_question);
						input_correctiveTimely.type = "text";
						input_correctiveTimely.disabled = "disabled";
						input_correctiveTimely.style.paddingLeft = "20px";
						div_correctiveTimely.appendChild(label_correctiveTimely);
						div_correctiveTimely.appendChild(input_correctiveTimely);
						new_form.appendChild(div_correctiveTimely);
						
						// 整改到位
						div_rectification = document.createElement("div");
						div_rectification.className = "mui-input-row";
						label_rectification = document.createElement("label");
						label_rectification.innerHTML = "整改到位";
						label_rectification.style.padding = "11px 0px";
						input_rectification = document.createElement("input");
						input_rectification.className = "mui-input-clear  mui-h5";
						
						input_rectification.style.textAlign = "right";
						input_rectification.style.padding = "0 30px";
						label_rectification.style.padding = "11px 0px";
						label_rectification.style.textAlign = "center";

						input_rectification.value = isUndefined(total_vo.caseListDTO[num].prcocess.process_question_difference);
						input_rectification.type = "text";
						input_rectification.disabled = "disabled";
						input_rectification.style.paddingLeft = "20px";
						div_rectification.appendChild(label_rectification);
						div_rectification.appendChild(input_rectification);
						new_form.appendChild(div_rectification);
						
						// 案卷及时上交
						div_caseDue = document.createElement("div");
						div_caseDue.className = "mui-input-row";
						label_caseDue = document.createElement("label");
						label_caseDue.innerHTML = "案卷及时上交";
						label_caseDue.style.padding = "11px 0px";
						input_caseDue = document.createElement("input");
						input_caseDue.className = "mui-input-clear  mui-h5";
						
						input_caseDue.style.textAlign = "right";
						input_caseDue.style.padding = "0 30px";
						label_caseDue.style.padding = "11px 0px";
						label_caseDue.style.textAlign = "center";

						input_caseDue.value =  isUndefined(total_vo.caseListDTO[num].prcocess.process_file_up_time_out_police);
						input_caseDue.type = "text";
						input_caseDue.disabled = "disabled";
						input_caseDue.style.paddingLeft = "20px";
						div_caseDue.appendChild(label_caseDue);
						div_caseDue.appendChild(input_caseDue);
						new_form.appendChild(div_caseDue);
						
						// 涉案财物及时入库
						div_propertyStorage = document.createElement("div");
						div_propertyStorage.className = "mui-input-row";
						label_propertyStorage = document.createElement("label");
						label_propertyStorage.innerHTML = "涉案财物及时入库";
						label_propertyStorage.style.padding = "11px 0px";
						input_propertyStorage = document.createElement("input");
						input_propertyStorage.className = "mui-input-clear  mui-h5";
						
						input_propertyStorage.style.textAlign = "right";
						input_propertyStorage.style.padding = "0 30px";
						input_propertyStorage.style.width = "180px";
						label_propertyStorage.style.width = "140px";
						label_propertyStorage.style.padding = "11px 0px";
						label_propertyStorage.style.textAlign = "center";


						input_propertyStorage.value = isUndefined(total_vo.caseListDTO[num].prcocess.process_goods_time_out_police);
						input_propertyStorage.type = "text";
						input_propertyStorage.disabled = "disabled";
						input_propertyStorage.style.paddingLeft = "20px";
						div_propertyStorage.appendChild(label_propertyStorage);
						div_propertyStorage.appendChild(input_propertyStorage);
						new_form.appendChild(div_propertyStorage);
						
					}
				}
					else {
						$("#ul_total_link")
								.html(
										'<li class="mui-table-view-cell mui-collapse new_li" style="text-align:center;color:red;font-size:20px;margin:10px 0;">抱歉，无详细信息</li>');
					}
					/*console.log("total_vo.currePage:" + total_vo.currePage);
					console.log("total_vo.totalPages:" +total_vo.totalPages);
					console.log("total_vo.totalRecords:" + total_vo.totalRecords);*/
				console.log("total_vo.totalRecords:" + total_vo.totalRecords);
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
						Mobile_List_Total_Link(this.value,totalCase,select_start_time,select_stop_time,department_id,policeId);
					};// ---- 翻页

			}
		}
	}
	if (pageIndex == null || pageIndex.preventDefault) {
		pageIndex = 1;
	}
	xhr.open("POST", "/ajdbxt/total/Total_findListCaseInfo", true);
	var formData = new FormData();
	formData.append("findCaseListVo.currePage", pageIndex);
	formData.append("findCaseListVo.queyType", totalCase);
	formData.append("findCaseListVo.departmentId", department_id);
	formData.append("findCaseListVo.start_time", select_start_time);
	formData.append("findCaseListVo.stop_time", select_stop_time);
	formData.append("findCaseListVo.policeId", policeId);
	formData.append("findCaseListVo.searchCase", input_Total_CaseSearchText);
	xhr.send(formData);
}

function isUndefined(value){
	if(typeof(value)=="undefined"){
		return "是";
	}
	else{
		return "否";
	}
}

/*
 * 判断页数
 */
function flip(flipPage) {
	switch (flipPage) {
	/* 首页 */
	case 1: {
		Mobile_List_Total_Link(1,totalCase,select_start_time,select_stop_time,department_id,policeId)
		break;
	}
		/* 上一页 */
	case 2: {
		if (total_vo.currePage - 1 == 0) {
			mui.toast("已经是第一页了");
		} else {
			Mobile_List_Total_Link(total_vo.currePage - 1,totalCase,select_start_time,select_stop_time,department_id,policeId);
		}
		break;
	}
		/* 下一页 */
	case 3: {
		if (total_vo.currePage == total_vo.totalPages) {
			mui.toast("已经是最后一页了");
		} else {
			Mobile_List_Total_Link(total_vo.currePage + 1,totalCase,select_start_time,select_stop_time,department_id,policeId);
		}
		break;
	}
		/* 尾页 */
	case 4: {
		Mobile_List_Total_Link(total_vo.totalPages,totalCase,select_start_time,select_stop_time,department_id,policeId);

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
