/**
 * 
 */
var xhr;
var total_vo = null;
var btn_value=null;
$(".input_button").bind("click",function(){
	btn_value=this.value;
	/*alert(btn_value);*/
	List_Total_By_Department(btn_value,1);
	$(".input_date").bind("change",function(){
		List_Total_By_Department(btn_value,1);
	});
});

function List_Total_By_Department(e,pageIndex){
	
	var e_str=null;
	
	if(e=="行政案件"){
		e_str="0";
		
	}
	else if(e=="刑事案件"){
		e_str="1";
		
	}
	else if(e=="总案件数"){
		e_str="2";
		
	}
	else if(e=="行政案件平均分"){
		e_str="3";
		
	}
	else{
		e_str="4";
		console.log(e);
		console.log(e_str);
	}

	getXMLHttp();	
	var select_start_time=document.getElementById("select_start_time").value+" 00:00:00";
	var select_stop_time=document.getElementById("select_stop_time").value+" 23:59:59";
	var adminCase=document.getElementById("adminCase").value;
	var criminalCase=document.getElementById("criminalCase").value;
	var sumCase=document.getElementById("sumCase"),value;
	var adminAverageScore=document.getElementById("adminAverageScore").value;
	var crimianAverageScore=document.getElementById("crimianAverageScore"),value;
	
	xhr.onreadystatechange=function(){
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
			total_vo=JSON.parse(xhr.responseText);
			var new_tr=null;
			var new_td=null;
			var new_a=null;
			var department_id=null;
			var table_total=document.getElementById("table_total");
			
			/*
			 * 移出除标题以外的所有行
			 */
			var old_tr = document.getElementsByClassName("new_tr");
			var long = old_tr.length;
			for (var i = 0; i < long; i++) {
				old_tr[0].parentNode.removeChild(old_tr[0]);
				// table_total_user.firstElementChild.removeChild(old_tr[0]);
			}

			new_tr=document.createElement("tr");
			new_tr.className="new_tr";
			new_tr.appendChild(document.createTextNode(''));
			table_total.firstElementChild.appendChild(new_tr);
			/*new_tr.style.color="green";*/
			
			new_td=document.createElement("td");
			new_tr.appendChild(new_td);
			new_td.innerHTML="1";
			
			new_td=document.createElement("td");
			new_tr.appendChild(new_td);
			new_td.innerHTML = total_vo.allDepartment;
			
			new_td=document.createElement("td");
			new_tr.appendChild(new_td);
			new_td.innerHTML = total_vo.allAdminCase;
			
			new_td=document.createElement("td");
			new_tr.appendChild(new_td);
			new_td.innerHTML = total_vo.allCriminCase;
			
			new_td=document.createElement("td");
			new_tr.appendChild(new_td);
			new_td.innerHTML = total_vo.allTotalCase;
			
			new_td=document.createElement("td");
			new_tr.appendChild(new_td);
			new_td.innerHTML = total_vo.allAdminAvgScore;
			
			new_td=document.createElement("td");
			new_tr.appendChild(new_td);
			new_td.innerHTML = total_vo.allCriminAvgScore;
			
			/*
			 * 将数据库的数据取出来放到表格里
			 */
			for(var num=0;num<total_vo.statisticDepartmentCaseNumDTO.length;num++){
				new_tr=document.createElement("tr");
				new_tr.className="new_tr";
				new_tr.appendChild(document.createTextNode(''));
				table_total.firstElementChild.appendChild(new_tr);
				
				/*
				 * 1.序号
				 */
				new_td=document.createElement("td");
				new_tr.appendChild(new_td);
				new_td.innerHTML =(num+2);
				/*
				 * 2.办案单位
				 */
				new_td=document.createElement("td");
				new_tr.appendChild(new_td);
				new_td.innerHTML = total_vo.statisticDepartmentCaseNumDTO[num].department.department_name;
				
				/*办案单位id*/
				department_id=total_vo.statisticDepartmentCaseNumDTO[num].department.ajdbxt_department_id;
				
				/*
				 * 3.行政案件
				 */
				new_td=document.createElement("td");
				new_a=document.createElement("a");
				new_td.appendChild(new_a);
				new_tr.appendChild(new_td);
				new_a.innerHTML = total_vo.statisticDepartmentCaseNumDTO[num].adminCase;
				new_a.style.cursor="pointer";
				new_a.href = "/ajdbxt/total/Total_page_caseInfoList?totalcase=0&select_start_time="
					+select_start_time+"&select_stop_time="+select_stop_time+"&department_id="+department_id;
				/*
				 * 4.刑事案件
				 */
				new_td=document.createElement("td");
				new_a=document.createElement("a");
				new_td.appendChild(new_a);
				new_tr.appendChild(new_td);
				new_a.innerHTML = total_vo.statisticDepartmentCaseNumDTO[num].criminalCase;
				new_a.style.cursor="pointer";
				new_a.href = "/ajdbxt/total/Total_page_caseInfoList?totalcase=1&select_start_time="
					+select_start_time+"&select_stop_time="+select_stop_time+"&department_id="+department_id;
				/*
				 * 5.总案件数
				 */
				new_td=document.createElement("td");
				new_a=document.createElement("a");
				new_td.appendChild(new_a);
				new_tr.appendChild(new_td);
				new_a.innerHTML = total_vo.statisticDepartmentCaseNumDTO[num].totalCase;
				new_a.style.cursor="pointer";
				new_a.href = "/ajdbxt/total/Total_page_caseInfoList?select_start_time="
					+select_start_time+"&select_stop_time="+select_stop_time+"&department_id="+department_id;
				
				/*
				 * 6.行政案件平均分
				 */
				new_td=document.createElement("td");
				new_a=document.createElement("a");
				new_td.appendChild(new_a);
				new_tr.appendChild(new_td);
				new_a.innerHTML = total_vo.statisticDepartmentCaseNumDTO[num].adminAverageScore;
				new_a.style.cursor="pointer";
				new_a.href = "/ajdbxt/total/Total_page_caseInfoList?totalcase=0&select_start_time="
					+select_start_time+"&select_stop_time="+select_stop_time+"&department_id="+department_id;
				
				/*
				 * 7.刑事案件平均分
				 */
				new_td=document.createElement("td");
				new_a=document.createElement("a");
				new_td.appendChild(new_a);
				new_tr.appendChild(new_td);
				new_a.innerHTML = total_vo.statisticDepartmentCaseNumDTO[num].crimianAverageScore;
				new_a.style.cursor="pointer";
				new_a.href = "/ajdbxt/total/Total_page_caseInfoList?totalcase=1&select_start_time="
					+select_start_time+"&select_stop_time="+select_stop_time+"&department_id="+department_id;
				
				/*
				 * 加载图标
				 */
				var i_pulse=document.getElementById("i_pulse");
				i_pulse.style.display="none";
			}
			/*
			 * * 设置页数 /
			 */
			document.getElementById("span_pageIndex").innerHTML = total_vo.currePage;// 当前页
			document.getElementById("span_totalPages").innerHTML = total_vo.totalPages;// 总页数
			document.getElementById("span_totalRecords").innerHTML = total_vo.totalRecords;// 总记录数
			}
		else{
			toastr.error(xhr.status);
		}
		}
	}
	xhr.open("POST","/ajdbxt/total/Total_getListDeparmentCaseStatistics",true);
	var formData=new FormData();
	formData.append("departmentStatisticVo.currePage", pageIndex);
	formData.append("departmentStatisticVo.start_time",select_start_time);
	formData.append("departmentStatisticVo.stop_time",select_stop_time);
	formData.append("departmentStatisticVo.orderString",e_str);
	xhr.send(formData);
}
/*
 * 判断页数
 */
function flip(flipPage) {
	switch (flipPage) {
	/* 首页 */
	case 1: {
		List_Total_By_Department(1)
		break;
	}
		/* 上一页 */
	case 2: {
		if (total_vo.currePage - 1 == 0) {
			toastr.warning("已经是第一页了");
		} else {
			List_Total_By_Department(total_vo.currePage - 1);
		}
		break;
	}
		/* 下一页 */
	case 3: {
		if (total_vo.currePage == total_vo.totalPages) {
			toastr.warning("已经是最后一页了");
		} else {
			List_Total_By_Department(total_vo.currePage + 1);
		}
		break;
	}
		/* 尾页 */
	case 4: {
		List_Total_By_Department(total_vo.totalPages);

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
