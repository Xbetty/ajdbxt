var penalProcess_info = null;
function penalProcess_info_by_id(pageIndex) {
	var formData = new FormData();
	var xhr = false;
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				VO_PenalProcess = JSON.parse(xhr.responseXML);
console.log(VO_PenalProcess);
				var new_tr = null;
				var new_td = null;
				var table_penalProcess = document.getElementById("penalProcessInfoTable");
				/*
				 * 移出除标题以外的所有行
				 */
				var old_tr = document.getElementsByClassName("new_tr");
				var long = old_tr.length;
				for (var i = 0; i < long; i++) {
					old_tr[0].parentNode.removeChild(old_tr[0]);
				}
				/*
				 * 将数据库的数据取出来放到表格里
				 */
				for (var num = 0; num < VO_PenalProcess.list.length; num++) {
					new_tr = document.createElement("tr");
					new_tr.className = "new_tr";
					new_tr.appendChild(document.createTextNode(''));
					table_penalProcess.firstElementChild.appendChild(new_tr);
					/*
					 * 隐藏案件流程id
					 */
					new_td = document.createElement("td");
					new_tr.appendChild(new_td);
					new_td.style.display = "none";
					new_td.className = "ajdbxt_process_id";
					new_td.innerHTML = VO_PenalProcess.list[num].process.ajdbxt_process_id;
					
					new_td = document.createElement("td");
					new_tr.appendChild(new_td);
					new_td.innerHTML = VO_PenalProcess.list[num].info.info_name;

					new_td = document.createElement("td");
					new_tr.appendChild(new_td);
					new_td.innerHTML = VO_PenalProcess.list[num].department.department_name;

					new_td = document.createElement("td");
					new_tr.appendChild(new_td);
					new_td.innerHTML = VO_PenalProcess.list[num].info.info_category;
					
					new_td = document.createElement("td");
					new_tr.appendChild(new_td);
					new_td.innerHTML = VO_PenalProcess.list[num].police[0].police_name;
					
					new_td = document.createElement("td");
					new_tr.appendChild(new_td);
					new_td.innerHTML = (VO_PenalProcess.list[num].plice[1].police_name
														+ (VO_PenalProcess.list[num].plice[2].police_name == "" ? "" : ("、"+VO_PenalProcess.list[num].plice[2].police_name)));
					
					new_td = document.createElement("td");
					new_tr.appendChild(new_td);
					new_td.innerHTML = (VO_PenalProcess.list[num].process.process_case_end == "是" ? "是" : "否");
					
					new_td = document.createElement("td");
					new_tr.appendChild(new_td);
					new_td.innerHTML = '<i  id="'+VO_PenalProcess.list[num].process.ajdbxt_process_id+'" onClick=DNADetails(this)></i>';
					new_td.style.cursor="pointer";
				}
				/*
				 * ????
				 */
				var i_pulse = document.getElementById("i_pulse");
				i_pulse.style.display = "none";

				// 当前页
				document.getElementById("span_pageIndex").innerHTML = VO_PenalProcess.currPage;
				// 总页数
				document.getElementById("span_totalPages").innerHTML = VO_PenalProcess.totalPage;
				// 总记录数
				document.getElementById("span_totalRecords").innerHTML = VO_PenalProcess.count;
// document.getElementById("checkbox_all_select").checked=false;
				
			} else {
				toastr.error(xhr.status);
			}
		}
	}
	if (pageIndex == null || pageIndex.preventDefault) {
		pageIndex = 1;
	}
	formData.append("processVO.currPage", pageIndex);
//	fromData.append("processVO.pageSize",10);
	
	xhr.open("POST", "/ajdbxt/process/findSomeProcessAction");
	xhr.send(formData);
}



/*
 * 判断页数
 */
function flip(flipPage) {
	switch (flipPage) {
	/* 首页 */
	case 1: {
		List_DNA_By_PageAndSearch(1)
		break;
	}
	/* 上一页 */
	case 2: {
		if (VO_PenalProcess.currPage - 1 == 0) {
			toastr.warning("已经是第一页了");
		} else {
			List_DNA_By_PageAndSearch(VO_PenalProcess.currPage - 1);
		}
		break;
	}
	/* 下一页 */
	case 3: {
		if (VO_PenalProcess.currPage == VO_PenalProcess.totalPage) {
			toastr.warning("已经是最后一页了");
		} else {
			List_DNA_By_PageAndSearch(VO_PenalProcess.currPage + 1);
		}
		break;
	}
	/* 尾页 */
	case 4: {
		List_DNA_By_PageAndSearch(VO_PenalProcess.totalPage);
		break;
	}
	}
}
