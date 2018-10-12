window.onload = function() {
	// --------------------
	// ------判断角色-------
	var xmlHttpRequest = new XMLHttpRequest();
	xmlHttpRequest.open("POST", "/ajdbxt/user/User_getPower");
	xmlHttpRequest.send(null);
	xmlHttpRequest.onreadystatechange = function() {
		if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
			loginRole = JSON.parse(xmlHttpRequest.responseText);
			console.log("loginRole.ajdbxt_police.police_power:"
					+ loginRole.ajdbxt_police.police_power);
			/*if (loginRole.ajdbxt_police.police_power == "3") {
				document.getElementById("div_police_add").style.display = "block";
			}  else {
				document.getElementById("div_police_add").style.display = "none";
			}*/
			List_Police_By_Page(1);
		}

	}

}

// -------------------------
// 列表显示
function List_Police_By_Page(pageIndex) {
	var input_PoliceSearchText = document
			.getElementById("input_PoliceSearchText").value;
	console.log("input_PoliceSearchText:" + input_PoliceSearchText);
	var formData = new FormData();
	var xhr = false;
	xhr = new XMLHttpRequest();
	console.log("pageIndex1:" + pageIndex);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				police_vo = JSON.parse(xhr.responseText);
				console.log("police_vo:" + police_vo);
				var new_li = null;
				var new_span0 = null;// 警员id
				var new_span1 = null;// 警员序号
				var new_span2 = null;// 警员名
				var new_span3 = null;// 单位名
				var new_a = null;// 案件名链接
				var new_xianshi=null;//div显示修改删除按钮
				// 按钮
				var new_row_button = null;
				var new_btn_xg = null;// 修改按钮
				var new_btn_sc = null;// 删除按钮

				var ul_police_list = document.getElementById("ul_police_list");

				/*
				 * 移出除标题以外的所有行      （开始案件）
				 */

				var old_li = document.getElementsByClassName("new_li");
				var long = old_li.length;
				for (var i = 0; i < long; i++) {
					old_li[0].parentNode.removeChild(old_li[0]);
				}

				var str_page_row = null;
				console.log("police_vo.countRecords:" + police_vo.countRecords);
				if (police_vo.countRecords > 0) {

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
					for (var num = 0; num < police_vo.Caselist.length; num++) {
						new_li = document.createElement("li");
						new_li.className = "mui-table-view-cell mui-collapse new_li";
						new_li.style.borderRadius="0px";
						new_li.appendChild(document.createTextNode(''));
						ul_police_list.appendChild(new_li);
						/*
						 * 案件id
						 */
						new_span0 = document.createElement("span");
						new_li.appendChild(new_span0);
						new_span0.style.display = "none";
						new_span0.className = "input_ajdbxt_police_id";
						new_span0.innerHTML = police_vo.Caselist[num].info.ajdbxt_info_id;
						/*
						 * 0. a链接
						 */
						new_a = document.createElement("a");
						new_a.className = "a_to_details mui-slider-handle";
						new_a.id=police_vo.Caselist[num].info.ajdbxt_info_id;
						//new_a.className = "mui-navigate-right";
					//	new_a.href="/ajdbxt/info/Info_page_mobile_caseOneDetails"
							
						new_a.appendChild(document.createTextNode(''));
						new_li.appendChild(new_a);
						/*$(".a_to_details").bind("click", function() {
							console.log("a");
						
							//document.getElementById("a").href="/ajdbxt/info/Info_page_mobile_caseOneDetails"
							window.location.href="/ajdbxt/info/Info_page_mobile_caseOneDetails?ajdbxt_info_id="+ this.id;
						})
*/
						/*
						 * 1. 案件序号
						 */
						new_span1 = document.createElement("span");
						new_span1.innerHTML = num + 1;
						new_span1.style.margin = " 0 10px 0 0";
						/*new_span1.style.padding = " 0 10px";*/
						new_span1.style.float = "left";
						new_a.appendChild(new_span1);

						/*
						 * 2. 案件名称
						 */
						new_span2 = document.createElement("span");
						new_span2.className ="mobile_index_case_name";
						new_span2.innerHTML = police_vo.Caselist[num].info.info_name;
						input_name = new_span2.innerText;
						new_a.appendChild(new_span2);
						/*
						 * 3.案件类型
						 */
						new_span3 = document.createElement("span");
						if(police_vo.Caselist[num].info.info_category=="行政案件"){
							new_span3.className = "mui-badge mui-badge-warning";
							new_span3.innerHTML="行政案件";
						}else{
							new_span3.className = "mui-badge mui-badge-danger";
							new_span3.innerHTML="刑事案件";
						}
						new_a.appendChild(new_span3);

						// 7按钮
//						if (loginRole.ajdbxt_police.police_power == "2"
//								|| loginRole.ajdbxt_police.police_power == "3") {
							new_row_button = document.createElement("div");
							new_row_button.className = "mui-slider-right mui-disabled";
							new_btn_xg = document.createElement("button");
							new_btn_xg.className = "mui-btn mui-btn-yellow";
							new_btn_xg.innerHTML = "修改";
							new_btn_xg.id = police_vo.Caselist[num].info.ajdbxt_info_id;
							new_btn_xg.style.marginLeft = "5px";
					//		new_btn_xg.style.width = "60px";
							new_btn_xg.onclick = function() {
								window.location.href = "/ajdbxt/info/Info_page_mobile_caseUpdate?ajdbxt_info_id="
										+ this.id;
								/*
								 * window.location.href =
								 * "/ajdbxt/user/User_mobile_police_update"
								 */
								return false;
							}
							new_btn_sc = document.createElement("button");
							new_btn_sc.className = "mui-btn mui-btn-red";
							new_btn_sc.id = police_vo.Caselist[num].info.ajdbxt_info_id;
							new_btn_sc.innerHTML = "删除";
							new_btn_sc.style.margin = "0 30px 0 5px";
							new_btn_sc.style.width = "60px";
							// 删除按钮点击事件
							new_btn_sc.onclick = function() {
								var btn_id = this.id
								var btnArray = [ '是', '否' ];
								mui
										.confirm(
												'确定删除？',
												'提示',
												btnArray,
												function(e) {
													if (e.index == 0) {
														var formData = new FormData();
														formData.append("info.ajdbxt_info_id",
																btn_id);
														var xhr = new XMLHttpRequest();
														xhr
																.open("POST",
																		"/ajdbxt/info/Info_delete");
														xhr.send(formData);
														xhr.onreadystatechange = function() {
															if (xhr.readyState == 4
																	&& xhr.status == 200) {
																if (xhr.responseText == "success") {
																	mui
																			.toast("删除成功");
																	List_Police_By_Page(1);
																} else {
																	mui
																			.toast("删除失败");
																}
															} else {
																mui
																		.toast(xhr.status);
															}
														}

													}
												});
								return false;
							}// ---end 删除
							new_row_button.appendChild(new_btn_sc);
							new_row_button.appendChild(new_btn_xg);
							new_li.appendChild(new_row_button);
                            //显示修改、删除
							new_xianshi=document.createElement("div");
							new_xianshi.className = "mui-slider-handle";
							new_li.appendChild(new_xianshi);

					}// ---for循环
					$("#ul_page_count").css("display","block");
				}/*-----if (police_vo.allRow > 0)*/
				else {
					$("#ul_police_list")
							.html(
									'<li class="mui-table-view-cell mui-collapse new_li" style="text-align:center;color:red;font-size:20px;margin:10px 0;">无案件信息</li>');
					$("#ul_page_count").css("display","none");
				}
				console.log("police_vo.currPage:" + police_vo.currPage);
				console.log("police_vo.totalPages:" + police_vo.totalPages);
				console.log("police_vo.countRecords:" + police_vo.countRecords);
				// 翻页
				str_page_row = '<li class="mui-disabled "><span onclick="flip(2)"> &laquo; </span>';// 上一页
				str_page_row += '<span><select class="mui-select" id="select_page" style="padding:0 15px;margin-bottom:0px;">'
				for (var pageCount = 1; pageCount <= police_vo.totalPages; pageCount++) {
					str_page_row += '<option';
					if (pageCount == police_vo.currPage) {
						str_page_row += ' selected="selected" ';
					}
					str_page_row += '><a>' + pageCount + ' </a></option>';
				}

				str_page_row += '</select></span>';
				str_page_row += '<span onclick="flip(3)">&raquo;</span></li>';// 下一页
				$("#ul_page_count").html(str_page_row);
				// 翻页跳转页面
				document.getElementById("select_page").onchange = function() {
					List_Police_By_Page(this.value);
					console.log(this.value);
				};// ---- 翻页

			}
		}
	}// ---onreadystatechange
	if (pageIndex == null || pageIndex.preventDefault) {
		pageIndex = 1;
	}
	console.log("pageIndex:" + pageIndex);
	formData.append("infoVO.currPage", pageIndex);
	formData.append("infoVO.searchInfo", input_PoliceSearchText);
	xhr.open("POST", "/ajdbxt/info/Info_listAll");
	xhr.send(formData);

}
/*
 * 判断页数
 */
function flip(flipPage) {
	switch (flipPage) {
	/* 首页 */
	case 1: {
		List_Police_By_Page(1)
		break;
	}
		/* 上一页 */
	case 2: {
		if (police_vo.currPage - 1 == 0) {
			mui.toast("已经是第一页了");
		} else {
			List_Police_By_Page(police_vo.currPage - 1);
		}
		break;
	}
		/* 下一页 */
	case 3: {
		if (police_vo.currPage == police_vo.totalPages) {
			mui.toast("已经是最后一页了");
		} else {
			List_Police_By_Page(police_vo.currPage + 1);
		}
		break;
	}
		/* 尾页 */
	case 4: {
		List_Police_By_Page(police_vo.totalPages);

		break;
	}

	}
}