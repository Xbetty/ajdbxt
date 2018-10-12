window.onload = function() {
	totalCase=GetQueryString("totalcase");
	select_start_time=GetQueryString("select_start_time");
	select_stop_time=GetQueryString("select_stop_time");
	department_id=GetQueryString("department_id");
	policeId=GetQueryString("policeId");
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
	List_Total_link(pageIndex,totalCase,select_start_time,select_stop_time,department_id,policeId);
	
		
}
var xhr;
var total_vo = null;
function List_Total_link(pageIndex,totalCase,select_start_time,select_stop_time,department_id,policeId) {
	var input_Total_CaseSearchText = document
			.getElementById("input_Total_CaseSearchText").value;
	var input_police_id = document.getElementById("input_police_id").value;
	getXMLHttp();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				total_vo = JSON.parse(xhr.responseText);
				console.log("xhr.total_vo:" + xhr.responseText);
				var new_tr = null;
				var new_td = null;
				var ner_a = null;
				var table_total_link = document
						.getElementById("table_total_link");
				/*
				 * 移出除标题以外的所有行
				 */
				var old_tr = document.getElementsByClassName("new_tr");
				var long = old_tr.length;
				for (var i = 0; i < long; i++) {
					old_tr[0].parentNode.removeChild(old_tr[0]);
					// table_total_user.firstElementChild.removeChild(old_tr[0]);
				}
				/*
				 * 将数据库的数据取出来放到表格里
				 */
				if (total_vo.totalRecords > 0) {
				for (var num = 0; num < total_vo.caseListDTO.length; num++) {
					new_tr = document.createElement("tr");
					new_tr.className = "new_tr";
					new_tr.appendChild(document.createTextNode(''));
					table_total_link.firstElementChild.appendChild(new_tr);
					
					
					/* 获取单位 */
					/* document.getElementById("span_total_department").innerHTML=total_vo.caseListDTO[num].department.department_name; */

					/*
					 * 1.序号
					 */
					new_td = document.createElement("td");
					new_tr.appendChild(new_td);
					new_td.innerHTML = (num + 1);

					/*
					 * 2. 案件名
					 */
					new_td = document.createElement("td");
					new_tr.appendChild(new_td);
					new_td.innerHTML = total_vo.caseListDTO[num].info.info_name;
					/*
					 * 3. 评分
					 */
					new_td = document.createElement("td");
					new_tr.appendChild(new_td);
					new_td.innerHTML = total_vo.caseListDTO[num].prcocess.process_score;
					/*
					 * 4. 及时整改
					 */
					new_td = document.createElement("td");
					new_tr.appendChild(new_td);
					new_td.innerHTML = isUndefined(total_vo.caseListDTO[num].prcocess.process_question);
					
					/*
					 * 5. 整改到位
					 */
					new_td = document.createElement("td");
					new_tr.appendChild(new_td);
					new_td.innerHTML = isUndefined(total_vo.caseListDTO[num].prcocess.process_question_difference);
					
					/*
					 * 3. 案卷及时上交
					 */
					new_td = document.createElement("td");
					new_tr.appendChild(new_td);
					new_td.innerHTML = isUndefined(total_vo.caseListDTO[num].prcocess.process_file_up_time_out_police);
					
					/*
					 * 4. 涉案财物及时入库
					 */
					new_td = document.createElement("td");
					new_tr.appendChild(new_td);
					new_td.innerHTML = isUndefined(total_vo.caseListDTO[num].prcocess.process_goods_time_out_police);
					
					
				}}else{
					new_tr = document.createElement("tr");
					new_tr.className = "new_tr";
					new_tr.appendChild(document.createTextNode(''));
					table_total_link.firstElementChild.appendChild(new_tr);
					document.getElementById("page_flip").style.display="none";
					$(new_tr)
							.html(
									'<td colspan="9" style="text-align:center;color:red;font-size:20px;margin:10px 0;">抱歉，无案件信息</td>');
				}
				/* 加载图标 */
				var i_pulse = document.getElementById("i_pulse");
				i_pulse.style.display = "none";
				/* 获取人员 */
				/* document.getElementById("span_total_user").innerHTML=total_vo.policeName; */

				/*
				 * * 设置页数 /
				 */
				document.getElementById("span_pageIndex").innerHTML = total_vo.currePage;// 当前页
				document.getElementById("span_totalPages").innerHTML = total_vo.pageSize;// 总页数
				document.getElementById("span_totalRecords").innerHTML = total_vo.totalRecords;// 总记录数
			} else {
				toastr.error(xhr.status);
			}
		}
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
		List_Total_link(1,totalCase,select_start_time,select_stop_time,department_id,policeId);
		break;
	}
		/* 上一页 */
	case 2: {
		if (total_vo.currePage - 1 == 0) {
			toastr.warning("已经是第一页了");
		} else {
			List_Total_link(total_vo.currePage - 1,totalCase,select_start_time,select_stop_time,department_id,policeId);
		}
		break;
	}
		/* 下一页 */
	case 3: {
		if (total_vo.currePage == total_vo.totalPages) {
			toastr.warning("已经是最后一页了");
		} else {
			List_Total_link(total_vo.currePage + 1,totalCase,select_start_time,select_stop_time,department_id,policeId);
		}
		break;
	}
		/* 尾页 */
	case 4: {
		List_Total_link(total_vo.totalPages,totalCase,select_start_time,select_stop_time,department_id,policeId);

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

