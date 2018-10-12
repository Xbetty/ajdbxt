var xhr;
var total_vo = null;
var btn_value=null;

$(".input_button").bind("click",function(){
	btn_value=this.value;
	/*alert(btn_value);*/
	List_Total_By_Page(btn_value,1);
	$(".input_date").bind("change",function(){
		List_Total_By_Page(btn_value,1);
	});
	$("#select_case_department").bind("input",function(){
		List_Total_By_Page(btn_value,1);
	});
	$(".page_flip").bind("click",function(){
		List_Total_By_Page(btn_value,1);
	});
});


function List_Total_By_Page(e,pageIndex) {
	
	var e_str=null;
	if(e=="主办行政案件"){
		e_str="0";
		
	}
	else if(e=="主办刑事案件"){
		e_str="1";
		
	}
	else if(e=="协办行政案件"){
		e_str="2";
		
	}
	else if(e=="协办刑事案件"){
		e_str="3";
		
	}
	else if(e=="行政案件平均分"){
		e_str="4";
		
	}
	else{
		e_str="5";
	}
	
	var select_start_time = document.getElementById("select_start_time").value+" 00:00:00";
	var select_stop_time = document.getElementById("select_stop_time").value+" 23:59:59";
	var input_Total_PoliceSearchText = document
			.getElementById("input_Total_PoliceSearchText").value;
	var select_case_department = document
			.getElementById("select_case_department").value;//得到部门的id,其中value="...department_id"
	var MainadminCase = document.getElementById("MainadminCase").value;
	var MaincriminalCase = document.getElementById("MaincriminalCase").value;
	var InsisadminCase = document.getElementById("InsisadminCase").value;
	var InsiscriminalCase = document.getElementById("InsiscriminalCase").value;
	var adminAverageScore=document.getElementById("adminAverageScore").value;
	var criminalAverageScore=document.getElementById("criminalAverageScore").value;

	getXMLHttp();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {

				total_vo = JSON.parse(xhr.responseText);
				var new_tr = null;
				var new_td = null;
				var new_a = null;
				var policeId=null;
				var table_total = document.getElementById("table_total");

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
				for (var num = 0; num < total_vo.statisticPoliceCaseDto.length; num++) {
					new_tr = document.createElement("tr");
					new_tr.className = "new_tr";
					new_tr.appendChild(document.createTextNode(''));
					table_total.firstElementChild.appendChild(new_tr);

					 /* 人员id*/
					policeId = total_vo.statisticPoliceCaseDto[num].police.ajdbxt_police_id;
					/*
					 * 序号
					 */
					new_td = document.createElement("td");
					new_tr.appendChild(new_td);
					new_td.innerHTML = (num + 1);
					new_td.colSpan = '2';

					/*
					 * 1. 办案单位
					 */
					new_td = document.createElement("td");
					new_tr.appendChild(new_td);
					new_td.innerHTML = total_vo.statisticPoliceCaseDto[num].department.department_name;

					new_td.colSpan = '2';

					/*
					 * 2. 人员
					 */
					new_td = document.createElement("td");
					new_a = document.createElement("a");
					new_td.appendChild(new_a);
					new_tr.appendChild(new_td);
					new_a.innerHTML = total_vo.statisticPoliceCaseDto[num].police.police_name;
					new_td.colSpan = '2';
				    new_a.style.cursor = "pointer"; 
				    new_a.href = "/ajdbxt/total/Total_page_caseInfoList?policeId="+policeId+"&select_start_time="
						+select_start_time+"&select_stop_time="+select_stop_time;
				    
					/*
					 * 3. 主办行政案件数
					 */
					new_td = document.createElement("td");
					new_a = document.createElement("a");
					new_td.appendChild(new_a);
					new_tr.appendChild(new_td);
					new_a.innerHTML = total_vo.statisticPoliceCaseDto[num].adminMianCase;
					new_a.style.cursor = "pointer"; 
					new_a.href = "/ajdbxt/total/Total_page_caseInfoList?totalcase=0&policeId="+policeId+"&select_start_time="
							+select_start_time+"&select_stop_time="+select_stop_time;
					/*
					 * 4. 主办刑事案件数
					 */
					new_td = document.createElement("td");
					new_a = document.createElement("a");
					new_td.appendChild(new_a);
					new_tr.appendChild(new_td);
					new_a.innerHTML = total_vo.statisticPoliceCaseDto[num].crimalMainCase;
					new_a.style.cursor = "pointer"; 
					new_a.href = "/ajdbxt/total/Total_page_caseInfoList?totalcase=1&policeId="+policeId+"&select_start_time="
						+select_start_time+"&select_stop_time="+select_stop_time;
					/*
					 * 5. 协办行政案件数
					 */
					new_td = document.createElement("td");
					new_a = document.createElement("a");
					new_td.appendChild(new_a);
					new_tr.appendChild(new_td);
					new_a.innerHTML = total_vo.statisticPoliceCaseDto[num].adminAsistCase;
					new_a.style.cursor = "pointer"; 
					new_a.href = "/ajdbxt/total/Total_page_caseInfoList?totalcase=2&policeId="+policeId+"&select_start_time="
					+select_start_time+"&select_stop_time="+select_stop_time;
					/*
					 * 6. 协办刑事案件数
					 */
					new_td = document.createElement("td");
					new_a = document.createElement("a");
					new_td.appendChild(new_a);
					new_tr.appendChild(new_td);
					new_a.innerHTML = total_vo.statisticPoliceCaseDto[num].crimalAsistCase;
					new_a.style.cursor = "pointer"; 
					new_a.href = "/ajdbxt/total/Total_page_caseInfoList?totalcase=3&policeId="+policeId+"&select_start_time="
					+select_start_time+"&select_stop_time="+select_stop_time;
					/*
					 * 7. 行政案件平均分
					 */
					new_td = document.createElement("td");
					new_a = document.createElement("a");
					new_td.appendChild(new_a);
					new_tr.appendChild(new_td);
					new_a.innerHTML = total_vo.statisticPoliceCaseDto[num].adminMainAvgScore;
					new_a.style.cursor = "pointer"; 
					new_a.href = "/ajdbxt/total/Total_page_caseInfoList?totalcase=0&policeId="+policeId+"&select_start_time="
					+select_start_time+"&select_stop_time="+select_stop_time;
					/*
					 * 8. 刑事案件平均分
					 */
					new_td = document.createElement("td");
					new_a = document.createElement("a");
					new_td.appendChild(new_a);
					new_tr.appendChild(new_td);
					new_a.innerHTML = total_vo.statisticPoliceCaseDto[num].cirmalMianAvgScore;
					new_a.style.cursor = "pointer"; 
					new_a.href = "/ajdbxt/total/Total_page_caseInfoList?totalcase=1&policeId="+policeId+"&select_start_time="
					+select_start_time+"&select_stop_time="+select_stop_time;
					
					/* 加载图标 */
					var i_pulse = document.getElementById("i_pulse");
					i_pulse.style.display = "none";
				}
				/*
				 * * 设置页数 /
				 */
				document.getElementById("span_pageIndex").innerHTML = total_vo.currePage;// 当前页
				document.getElementById("span_totalPages").innerHTML = total_vo.totalPages;// 总页数
				document.getElementById("span_totalRecords").innerHTML = total_vo.totalRecords;// 总记录数
			} else {
				toastr.error(xhr.status);
			}
		}
	}
	var formData = new FormData();
	formData.append("policeCaseStatisticVo.currePage", pageIndex);
	formData.append("policeCaseStatisticVo.searchPolice",input_Total_PoliceSearchText);
	formData.append("policeCaseStatisticVo.department", select_case_department);//此处传的是部门id
	formData.append("policeCaseStatisticVo.start_time", select_start_time);
	formData.append("policeCaseStatisticVo.stop_time", select_stop_time);
	formData.append("policeCaseStatisticVo.orderString",e_str);
	
	xhr.open("POST", "/ajdbxt/total/Total_getListPoiceCaseStatistic", true);
	xhr.send(formData);
}
/*
 * 判断页数
 */
function flip(flipPage) {
	switch (flipPage) {
	/* 首页 */
	case 1: {
		List_Total_By_Page(btn_value,1)
		break;
	}
		/* 上一页 */
	case 2: {
		if (total_vo.currePage - 1 == 0) {
			toastr.warning("已经是第一页了");
		} else {
			List_Total_By_Page(btn_value,total_vo.currePage - 1);
		}
		break;
	}
		/* 下一页 */
	case 3: {
		if (total_vo.currePage == total_vo.totalPages) {
			toastr.warning("已经是最后一页了");
		} else {
			List_Total_By_Page(btn_value,total_vo.currePage + 1);
		}
		break;
	}
		/* 尾页 */
	case 4: {
		List_Total_By_Page(btn_value,total_vo.totalPages);

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