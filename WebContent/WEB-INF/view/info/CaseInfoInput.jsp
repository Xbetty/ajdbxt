<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>案件信息</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<link rel="stylesheet" type="text/css" href="<%=basePath%>Info.css" />
<style type="text/css">
/* 熊子婷 */
#page_flip span a:hover {
	cursor: pointer;
}
add_police_two:hover{
cursor: pointer;
}
/* 李文凯 */
/* #newQuery table tbody tr td input {
	margin-top: 6px;
	width: 100% !important;
}

#newQuery table tbody tr td select {
	margin-top: 6px;
	width: 100% !important;
}

.breakcase_table_info tbody tr {
	text-align: center;
}

tfoot tr td a:hover {
	cursor: pointer;
}
 */
</style>
</head>

<body>
	<s:action name="User_navbar" namespace="/user" executeResult="true" />


	<!---------------------------------------------------------------------------------------------------->
	<!---------------------------------------------------------------------------------------------------->
	<!---------------------------------------------------------------------------------------------------->
	<!-- 熊子婷 -->
	<div style="margin: 80px 0 0 0; float: left; width: 100%;">
		<div class="panel" style="width: 95%; margin: 20px auto;">
			<!--  -->
			<div class="panel-heading">
				<h3 class="panel-title">案件列表</h3>
			</div>
			<div class="panel-body">
				<div class="col-md-12">
					<div class="panel">
						<!--  -->
						<div class="panel-body">
							<div style="height: 34px; width: 100%;">
								<div style="width: 150px; float: left; margin: 0 20px 0 0">
									<button data-toggle="modal" data-target="#breakCase_input"
										type="button" class="btn btn-default">
										<i class="fa fa-plus-square"></i> 新添案件
									</button>

								</div>
								<!-- 检索 -->
								<div class="input-group" style="width: 300px; float: right;">
									<input id="input_PoliceSearchText" class="form-control"
										oninput="get_ListCaseSearch(query_data)"
										type="text" placeholder="搜索案件名、办案民警或抓获时间" /> <span
										class="input-group-addon" style="border-radius: unset;">
										<i class="fa fa-search"></i>
									</span>
								</div>

							</div>

							<table
								class="table table-hover  table-condensed breakcase_table_info"
								style="text-align: center; margin: 20px 0;">
								<thead>
									<tr>
										<th>序号</th>
										<th>案件名称</th>
										<th>案件类别</th>
										<th>办案单位</th>
										<th>到案时间</th>
										<th>主办民警</th>
										<th>协办民警</th>
										<s:if
											test='#session.loginPolice.ajdbxt_police.police_power=="3"'>
											<th>操作</th>
										</s:if>
									</tr>
								</thead>
								<tbody>

								</tbody>
							</table>
							<!-- 加载图标 -->
							<div id="i_pulse" style="text-align: center;">
								<i class="fa fa-spinner fa-pulse fa-3x"></i>
							</div>
							<!--翻页  -->
							<div id="page_flip"
								style="margin: 0 auto; width: 400px; text-align: center; display: none;">
								<span> <a onclick="firstPage()"><i
										class="fa fa-angle-double-left">首页</i> </a> &nbsp&nbsp <a
									onclick="prePage()"><i class="fa fa-angle-left"></i>上一页 </a>
									&nbsp&nbsp <a onclick="nextPage()">下一页<i
										class="fa fa-angle-right"></i>
								</a> &nbsp&nbsp <a onclick="lastPage()">尾页<i
										class="fa fa-angle-double-right"></i>
								</a> <br />
									<p class='info' style="margin-top: 5px;">
										第<span id="span_pageIndex">1</span>页&nbsp&nbsp共 <span
											id="span_totalPages">1</span>页&nbsp&nbsp共 <span
											id="span_totalRecords">0</span>条记录

									</p></span>

							</div>

						</div>
					</div>
					<!-- END TABLE HOVER -->
				</div>

			</div>
		</div>
	</div>

	<!-- 李文凯 -->
	<%-- 	
	<div style="float: left; width: 100%;">
		<div class="panel" style="width: 95%; margin: 20px auto;">
			<!--  -->
			<div class="panel-heading">
				<h3 class="panel-title">案件信息</h3>
			</div>
			<div class="panel-body">
				<div class="operation" style="margin-bottom: 6px;">
				        <div class="panel-heading">
							<h3 class="panel-title">案件列表</h3>
							<!-- <p class="text-primary query_prompting_info">nothing to
								query.</p> -->
						</div>
<!-- 					<button style="margin-left: 15px;" type="button" -->
<!-- 						class="btn btn-default" data-toggle="modal" -->
<!-- 						data-target="#newQuery"> -->
<!-- 						<i class="fa fa-plus-square"></i> 刑事破案查询 -->
<!-- 					</button> -->
					
				</div>
				<div class="col-md-12">
					<!-- TABLE HOVER -->
					<div class="panel">
						<button data-toggle="modal" data-target="#breakCase_input"
						style="margin-left: 20px; margin-top:10px;" type="button" class="btn btn-default">
						<i class="fa fa-plus-square"></i> 新添案件
					    </button>
<!-- 					    <div class="input-group" style="width: 300px; float: right; margin-top:10px;"> -->
<!-- 									<input id="input_PoliceSearchText" class="form-control" -->
<!-- 										oninput="List_Police_By_Page(1);" type="text" -->
										placeholder="搜索" /> <span class="input-group-addon"
										style="border-radius: unset;"> <i class="fa fa-search"></i>
									</span>
<!-- 								</div> -->
					<div class="input-group" style="width: 300px; float: right;">
									<input id="input_PoliceSearchText" class="form-control" oninput="get_ListCaseSearch('#session.loginPolice.ajdbxt_police.police_department', 1)" type="text" placeholder="搜索警号、姓名或电话号码" />
									<span class="input-group-addon" style="border-radius: unset;">
										<i class="fa fa-search"></i>   
									</span>
					</div>
						
						<div class="panel-body">
							<table
								class="table table-hover table-condensed breakcase_table_info">
								<thead>
									<tr>
										<th>序号</th>
										<th>案件名称</th>
										<th>案件类别</th>
										<th>办案单位</th>
										<th>到案时间</th>
										<th>主办民警</th>
										<th>协办民警</th>
										<!-- <th>协办民警2</th> -->
										<!-- <th>现场指纹编号</th> -->
										<s:if test='#session.loginPolice.ajdbxt_police.police_department=="67ed5ab3-d773-4ac1-981b-2839ed0cec5c"'>
										<th>操作</th>
										</s:if>
									</tr>
								</thead>
								<tbody>

								</tbody>
								<tfoot>
									<tr>
										<td colspan="8" style="font-size: 12px;" class="page_info"><a
											onclick="firstPage()"><i class="fa fa-angle-double-left">首页</i>
										</a>&nbsp&nbsp<a onclick="prePage()"><i
												class="fa fa-angle-left"></i>上一页 </a>&nbsp&nbsp<a
											onclick="nextPage()">下一页<i class="fa fa-angle-right"></i>
										</a>&nbsp&nbsp <a onclick="lastPage()">尾页<i
												class="fa fa-angle-double-right"></i>
										</a> <br />
											<p class='info'></p></td>
									</tr>
								</tfoot>
							</table>
						</div>
					</div>
					<!-- END TABLE HOVER -->
				</div>

			</div>
		</div>
	</div> --%>
	<!---------------------------------------------------------------------------------------------------->
	<!---------------------------------------------------------------------------------------------------->
	<!---------------------------------------------------------------------------------------------------->
	<!-- 	<!-- 新建查询-模态框（Modal） -->
	<!-- 	<div class="modal fade" id="newQuery" tabindex="-1" role="dialog" -->
	<!-- 		aria-labelledby="myModalLabel" aria-hidden="true"> -->
	<!-- 		<div class="modal-dialog modal-lg"> -->
	<!-- 			<div class="modal-content"> -->
	<!-- 				<div class="modal-header"> -->
	<!-- 					<button type="button" class="close" data-dismiss="modal" -->
	<!-- 						aria-hidden="true">&times;</button> -->
	<!-- 					<h4 class="modal-title" id="myModalLabel">刑事破案修改查询</h4> -->
	<!-- 				</div> -->
	<!-- 				<div class="modal-body"> -->
	<!-- 					<form id="query_infomantion_inmodal" action=""> -->
	<!-- 						<table style="width: 50%; margin: auto;" class="Query_table"> -->
	<!-- 							<tbody> -->
	<!-- 								<tr> -->
	<!-- 									<td>勘验编号</td> -->
	<!-- 									<td><input -->
	<!-- 										name="page_list_BreakecaseInformation.snece_inquestId" -->
	<!-- 										class="form-control" type="text"></td> -->
	<!-- 								</tr> -->
	<!-- 								<tr> -->
	<!-- 									<td>案件名</td> -->
	<!-- 									<td><input -->
	<!-- 										name="page_list_BreakecaseInformation.snece_inquestId" -->
	<!-- 										class="form-control" type="text"></td> -->
	<!-- 								</tr> -->
	<!-- 								<tr> -->
	<!-- 									<td>案件类别</td> -->
	<%-- 									<td><select --%>
	<%-- 										name="page_list_BreakecaseInformation.case_totalCategory" --%>
	<%-- 										onchange="setSectionCase(this.selectedIndex)" --%>
	<%-- 										class="main_case form-control"><option --%>
	<!-- 												selected="selected" value="">请选择案件总类别</option> -->
	<!-- 											<option value="盗窃案">盗窃案</option> -->
	<!-- 											<option value="抢劫案">抢劫案</option> -->
	<!-- 											<option value="抢夺案">抢夺案</option> -->
	<!-- 											<option value="强奸案">强奸案</option> -->
	<!-- 											<option value="绑架案">绑架案</option> -->
	<!-- 											<option value="杀人案">杀人案</option> -->
	<!-- 											<option value="故意伤害案">故意伤害案</option> -->
	<!-- 											<option value="爆炸案">爆炸案</option> -->
	<!-- 											<option value="放火案">放火案</option> -->
	<!-- 											<option value="非法拘禁案">非法拘禁案</option> -->
	<!-- 											<option value="非正常死亡">非正常死亡</option> -->
	<!-- 											<option value="故意损坏公私财物">故意损坏公私财物</option> -->
	<%-- 											<option value="其它">其它</option></select> <select --%>
	<%-- 										name="page_list_BreakecaseInformation.case_sonCategory" --%>
	<%-- 										class="other_case form-control"> --%>
	<!-- 											<option selected value="">请选择案件子类别</option> -->
	<%-- 									</select></td> --%>
	<!-- 								</tr> -->
	<!-- 								<tr> -->
	<!-- 									<td>嫌疑人姓名</td> -->
	<!-- 									<td><input -->
	<!-- 										name="page_list_BreakecaseInformation.breakecase_suspectName" -->
	<!-- 										class="form-control" type="text"></td> -->
	<!-- 								</tr> -->
	<!-- 								<tr> -->
	<!-- 									<td>抓获单位</td> -->
	<!-- 									<td><input -->
	<!-- 										name="page_list_BreakecaseInformation.breakecase_captureUnit" -->
	<!-- 										class="form-control" type="text"></td> -->
	<!-- 								</tr> -->
	<!-- 								<tr> -->
	<!-- 									<td>接警时间</td> -->
	<!-- 									<td><input -->
	<!-- 										name="page_list_BreakecaseInformation.start_time" -->
	<!-- 										style="float: left;" type="text" class="form-control mydate" -->
	<!-- 										placeholder="起始日期"><input -->
	<!-- 										name="page_list_BreakecaseInformation.stop_time" -->
	<!-- 										style="float: right;" type="text" class="form-control" -->
	<!-- 										placeholder="结束日期"></td> -->
	<!-- 								</tr> -->
	<!-- 							</tbody> -->
	<!-- 						</table> -->
	<!-- 					</form> -->
	<!-- 				</div> -->
	<!-- 				<div class="modal-footer"> -->
	<!-- 					<button type="button" class="btn btn-primary to_quert">确认查询</button> -->
	<!-- 					<button type="button" class="btn btn-danger empty_quert">清空查询</button> -->
	<!-- 					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button> -->
	<!-- 				</div> -->
	<!-- 			</div> -->
	<!-- 			<!-- /.modal-content -->
	<!-- 		</div> -->
	<!-- 		<!-- /.modal -->
	<!-- 	</div> -->
	<!---------------------------------------------------------------------------------------------------->
	<!------------------------------------------------------------------------------------------------->
	<!---------------------------------------------------------------------------------------------------->
	<!-- 案件信息修改-模态框（Modal） -->
	<div class="modal fade" id="breakCase_modification" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="modal-title">修改案件</h4>
				</div>
				<div class="modal-body">
					<form action="" id="breakCase_modification_from">
						<div style="width: 80%; margin: auto;" class="panel-body">
					<table align="center" class="table table-hover table-condensed">
					<tbody>
									<tr>
										<td>案件名称</td>
										<td colspan="2"><input id="xzt_update_case_name" style="witdh: 70%;" class="form-control"
											name="info.info_name" type="text" placeholder="请输入案件名"></td>
									</tr>
									<tr>
										<td>案件类别</td>
										<td colspan="2">
										<select style="witdh: 100%;" id="xzt_update_case_type"
											class="form-control" data-live-search="true"
											name="info.info_category">
												<option value="刑事案件">刑事案件</option>
												<option value="行政案件">行政案件</option>
										</select></td>
									</tr>

									<tr>
										<td>办案单位<i class="fa fa-spinner fa-pulse load_remind"></td>
										<td colspan="2"><select  style="witdh: 100%;"
											class="form-control selectpicker" data-live-search="true"
											name="info.info_department" id="xzt_update_info_department" title="请选择办案单位" onchange="updateArray()"></select></td>
									</tr>

									<tr>
										<td>到案时间</td>
										<td colspan="2"><input style="witdh: 70%;" id="xzt_update_case_time"
											class="form-control mydate_minute"
											name="info.info_catch_time" type="text" placeholder="请选择到案时间"></td>

									</tr>
									<!-- <tr>
										<td>未成年人</td>
										<td colspan="2"><label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="radio" 
												name="info.info_nonage" id="update_info_nonage_updata_yes" value="是">
												是
										</label> <label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="radio"  
												name="info.info_nonage" id="update_info_nonage_updata_no" value="否">
												否
										</label></td>
									</tr> -->
									<tr>
										<td>主办民警<i class="fa fa-spinner fa-pulse load_remind"></td>
										<td colspan="2"><select style="witdh: 100%;"
											class="form-control selectpicker" data-live-search="true"
											name="info.info_main_police" id="xzt_update_main_police" title="请指派主办民警"></select></td>
									</tr>

									<tr>
										<td>协办民警1<i class="fa fa-spinner fa-pulse load_remind"></td>
										<td><select style="witdh: 100%;" id="xzt_update_assistant_police_one"
											class="form-control selectpicker" data-live-search="true"
											name="info.info_assistant_police_one" title="请指派协办民警1"></select></td>
										<td id="add_img_update" class="add_img"><img alt=""
											src="<%=basePath%>img/addition_fill.png" id="add_police_two_update" onclick="updateArrayPoliceTwo()"></td>
										
									</tr>
									<tr class="xzt_assistant_police_two">
									<td id="police_two_td_update">协办民警2<i
											class="fa fa-spinner fa-pulse load_remind"></td>
										<td id="police_two_tdd_update"><select style="witdh: 100%;"
											class="form-control selectpicker" data-live-search="true"
											name="info.info_assistant_police_two" id="xzt_update_assistant_police_two" title="请指派协办民警2"></select></td>
									</tr>
									<tr>
										<td>所（队）法制员</td>
										<td colspan="2"><input style="witdh: 70%;" class="form-control"
											id="xzt_update_team_legal" type="text" placeholder="请指派所（队）法制员"></td>
										<td hidden="true"><input style="witdh: 70%;"
											class="form-control"
											id="xzt_update_team_legal_id"
											name="info.info_department_legal_member" type="text" ></td>
									</tr>
									<tr>
										<td>所（队）长</td>
										<td colspan="2"><input style="witdh: 70%;" class="form-control"
											id="update_info_department_captain_name" name="police.police_name"
											type="text" placeholder="请指派所（队）长"></td>
										<td hidden="true"><input style="witdh: 70%;"
											class="form-control" id="update_info_department_captain_id"
											name="info.info_department_captain" type="text" ></td>
									</tr>

									<tr>
										<td>法制大队值班民警<i class="fa fa-spinner fa-pulse load_remind"></td>
										<td colspan="2"><select style="witdh: 100%;" id="xzt_update_info_legal_team_member"
											class="form-control selectpicker" data-live-search="true"
											name="info.info_legal_team_member" 
											title="请选择值班民警"></select></td>
									</tr>
									<tr>
										<td>值班局领导<i class="fa fa-spinner fa-pulse load_remind"></td>
										<td colspan="2"><select style="witdh: 100%;" id="xzt_update_info_bureau_leader"
											class="form-control selectpicker" data-live-search="true"
											name="info.info_bureau_leader" title="请选择值班局领导"></select></td>
										<input type="hidden" id="xzt_update_info_bureau_leader_id" name="info.ajdbxt_info_id">
									</tr>
									<tr>
										<td>特殊人员</td>
										<td colspan="2">
										<!-- <label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="checkbox"
												name="info.info_special_person" id="update_info_special_person_no"
												value="无">无
										</label> -->
										<label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="checkbox"
												name="info.info_special_person" id="update_info_special_person_minor"
												value="未成年人">未成年人
										</label>
										<label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="checkbox"
												onclick="change_info_special_person_lawyer(this)"
												name="info.info_special_person" id="update_info_special_person_lawyer"
												value="律师">律师
										</label>
										<label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="checkbox"
												name="info.info_special_person" id="update_info_special_person_reporter"
												value="记者">记者
										</label>
										<label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="checkbox"
												name="info.info_special_person" id="update_info_special_person_reporter"
												value="人大">人大
										</label>
										<label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="checkbox"
												name="info.info_special_person" id="update_info_special_person_zhengxie"
												value="政协">政协
										</label>
										<label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="checkbox"
												name="info.info_special_person" id="update_info_special_person_shejing"
												value="涉警">涉警
										</label>
										<label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="checkbox"
												name="info.info_special_person" id="update_info_special_person_shezhong"
												value="涉众">涉众
										</label>
										<label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="checkbox"
												name="info.info_special_person" id="update_info_special_person_shehei"
												value="涉黑">涉黑
										</label>
										</td>
									</tr>
									<tr>
										<td>特殊案件</td>
										<td colspan="2"><label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="checkbox"
												name="info.info_specail_case" id="update_info_special_case_yes"
												value="是">是
										</label></td>
									</tr>
									<tr>
										<td>通知局长、政委</td>
										<td colspan="2"><label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="checkbox"
												onclick=change_info_inform_leaders_yes(this)
												name="info.info_inform_leaders" id="update_info_inform_leaders_yes"
												value="是">是
										</label></td>
									</tr>
								</tbody>
							</table>
						
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary breakCase_operation">确认修改</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
	<!---------------------------------------------------------------------------------------------------->
	<!------------------------------------------------------------------------------------------------->
	<!---------------------------------------------------------------------------------------------------->
	<!-- 录入案件信息-模态框（Modal） -->
	<div class="modal fade" id="breakCase_input" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="modal-title">新增案件</h4>
				</div>
				<div class="modal-body">
					<form action="">
						<div style="width: 80%; margin: auto;" class="panel-body">
							<table class="table table-hover" align="center">
								<tbody>
									<tr>
										<td>案件名称</td>
										<td colspan="2"><input id="xzt_case_name" style="witdh: 70%;" class="form-control"
											name="info.info_name" type="text" placeholder="请输入案件名"></td>
									</tr>
									<tr>
										<td>案件类别</td>
										<td colspan="2">
										<select style="witdh: 100%;" id="xzt_case_type"
											class="form-control" data-live-search="true"
											name="info.info_category">
											<option value="">请选择</option>
												<option value="刑事案件">刑事案件</option>
												<option value="行政案件">行政案件</option>
										</select></td>
									</tr>

									<tr>
										<td>办案单位<i class="fa fa-spinner fa-pulse load_remind"></td>
										<td colspan="2"><select  style="witdh: 100%;"
											class="form-control selectpicker" data-live-search="true"
											name="info.info_department" id="info_department" title="请选择办案单位"></select></td>
									</tr>

									<tr>
										<td>到案时间</td>
										<td colspan="2"><input style="witdh: 70%;" id="xzt_case_time"
											class="form-control mydate_minute"
											name="info.info_catch_time" type="text" placeholder="请选择到案时间"></td>

									</tr>
									<!-- <tr>
										<td>未成年人</td>
										<td colspan="2"><label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="radio" onclick=changeminors_asking_yes(this)
												name="info.info_nonage" id="minors_asking_yes" value="是">
												是
										</label> <label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="radio" onclick=changeminors_asking_no(this)
												name="info.info_nonage" id="minors_asking_no" value="否" checked>
												否
										</label></td>
									</tr> -->
									<!-- <tr> -->
									<!-- <tr>
										<td>未成年人</td>
										<td colspan="2"><label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="radio" onclick=changeminors_asking_yes(this)
												name="info.info_nonage" id="minors_asking_yes" value="是">
												是
										</label> <label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="radio" onclick=changeminors_asking_no(this)
												name="info.info_nonage" id="minors_asking_no" value="否" checked>
												否
										</label></td>
									</tr> -->
									<tr>
										<td>主办民警<i class="fa fa-spinner fa-pulse load_remind"></td>
										<td colspan="2"><select style="witdh: 100%;"
											class="form-control selectpicker" data-live-search="true"
											name="info.info_main_police" id="info_main_police" title="请指派主办民警"></select></td>
									</tr>

									<tr>
										<td>协办民警1<i class="fa fa-spinner fa-pulse load_remind"></td>
										<td><select style="witdh: 100%;" id="xzt_assistant_police"
											class="form-control selectpicker" data-live-search="true"
											name="info.info_assistant_police_one" title="请指派协办民警1"></select></td>
										<td id="add_img" class="add_img"><img alt=""
											src="<%=basePath%>img/addition_fill.png" id="add_police_two"></td>
										
									</tr>
									<tr class="xzt_assistant_police_two">
									<td id="police_two_td">协办民警2<i
											class="fa fa-spinner fa-pulse load_remind"></td>
										<td id="police_two_tdd"><select style="witdh: 100%;"
											class="form-control selectpicker" data-live-search="true"
											name="info.info_assistant_police_two" title="请指派协办民警2"></select></td>
									</tr>
									<tr>
										<td>所（队）法制员</td>
										<td colspan="2"><input style="witdh: 70%;" class="form-control"
											id="info_info_department_legal_member_name" type="text" placeholder="请指派所（队）法制员"></td>
										<td hidden="true"><input style="witdh: 70%;"
											class="form-control"
											id="info_info_department_legal_member_id"
											name="info.info_department_legal_member" type="text" ></td>
									</tr>
									<tr>
										<td>所（队）长</td>
										<td colspan="2"><input style="witdh: 70%;" class="form-control"
											id="info_department_captain_name" name="police.police_name"
											type="text" placeholder="请指派所（队）长"></td>
										<td hidden="true"><input style="witdh: 70%;"
											class="form-control" id="info_department_captain_id"
											name="info.info_department_captain" type="text" ></td>
									</tr>

									<tr>
										<td>法制大队值班民警<i class="fa fa-spinner fa-pulse load_remind"></td>
										<td colspan="2"><select style="witdh: 100%;" id="xzt_info_legal_team_member"
											class="form-control selectpicker" data-live-search="true"
											name="info.info_legal_team_member" onclick="legal()"
											title="请选择值班民警"></select></td>
									</tr>
									<tr>
										<td>值班局领导<i class="fa fa-spinner fa-pulse load_remind"></td>
										<td colspan="2"><select style="witdh: 100%;" id="xzt_info_bureau_leader"
											class="form-control selectpicker" data-live-search="true"
											name="info.info_bureau_leader" onclick="leader()" title="请选择值班局领导"></select></td>
										<input type="hidden" name="info.ajdbxt_info_id">
									</tr>
									<tr>
										<td>特殊人员</td>
										<td colspan="2">
										<!-- <label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="checkbox"
												onclick="change_info_special_person_no(this)"
												name="info.info_special_person" id="info_special_person_no"
												value="无">无
										</label> -->
										<label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="checkbox"
												onclick="change_info_special_person_minor(this)"
												name="info.info_special_person" id="info_special_person_minor"
												value="未成年人">未成年人
										</label>
										<label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="checkbox"
												onclick="change_info_special_person_lawyer(this)"
												name="info.info_special_person" id="info_special_person_lawyer"
												value="律师">律师
										</label>
										<label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="checkbox"
												onclick="change_info_special_person_reporter(this)"
												name="info.info_special_person" id="info_special_person_reporter"
												value="记者">记者
										</label>
										<label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="checkbox"
												onclick="change_info_special_person_renda(this)"
												name="info.info_special_person" id="info_special_person_reporter"
												value="人大">人大
										</label>
										<label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="checkbox"
												onclick="change_info_special_person_zhengxie(this)"
												name="info.info_special_person" id="info_special_person_zhengxie"
												value="政协">政协
										</label>
										<label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="checkbox"
												onclick="change_info_special_person_shejing(this)"
												name="info.info_special_person" id="info_special_person_shejing"
												value="涉警">涉警
										</label>
										<label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="checkbox"
												onclick="change_info_special_person_shezhong(this)"
												name="info.info_special_person" id="info_special_person_shezhong"
												value="涉众">涉众
										</label>
										<label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="checkbox"
												onclick="change_info_special_person_shehei(this)"
												name="info.info_special_person" id="info_special_person_shehei"
												value="涉黑">涉黑
										</label>
										</td>
									</tr>
									<tr>
										<td>特殊案件</td>
										<td colspan="2"><label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="checkbox"
												onclick="change_info_special_case_yes(this)"
												name="info.info_special_case" id="info_special_case_yes"
												value="是">是
										</label></td>
									</tr>
									<tr>
										<td>通知局长、政委</td>
										<td colspan="2"><label
											style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
												<input type="checkbox"
												onclick="change_info_inform_leaders_yes(this)"
												name="info.info_inform_leaders" id="info_inform_leaders_yes"
												value="是">是
										</label></td>
									</tr>
								</tbody>
							</table>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary input_sure">添加</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
	<!---------------------------------------------------------------------------------------------------->
	<!---------------------------------------------------------------------------------------------------->
	<!---------------------------------------------------------------------------------------------------->
	<!---------------------------------------------------------------------------------------------------->
	<!-- SneceInput.js仅作为在查询模态框中（案件类别，选择处所，作案手段）的自动匹配子项使用 -->
	<%-- 	<script type="text/javascript" src="<%=basePath%>js/Case/SneceInput.js"></script> --%>
	<script type="text/javascript"
		src="<%=basePath%>js/Info/CaseInfoInput.js"></script>


	<script type="text/javascript">
		$.datetimepicker.setLocale('ch');
		$('.mydate').datetimepicker({
			yearStart : 1900, // 设置最小年份
			yearEnd : 2100, // 设置最大年份 
			yearOffset : 0, // 年偏差 
			timepicker : false, // 关闭时间选项 
			format : 'Y-m-d', // 格式化日期年-月-日 
			minDate : '1900/01/01', // 设置最小日期 
			maxDate : '2100/01/01', // 设置最大日期 
		});
		$('.mydate_minute').datetimepicker({
			yearStart : 1900, // 设置最小年份 
			yearEnd : 2100, // 设置最大年份
			yearOffset : 0, // 年偏差
			step : 1,
			timepicker : true, // 关闭时间选项 
			format : 'Y-m-d H:i', // 格式化日期年-月-日 
			step : 1,
			minDate : '1990/01/01', // 设置最小日期 
			maxDate : '2100/01/01', // 设置最大日期
		});
	</script>
</body>

</html>