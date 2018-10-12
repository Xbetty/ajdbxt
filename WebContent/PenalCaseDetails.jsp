<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!---------------------------------------------------------------------------------------------------->
<!---------------------------------------------------------------------------------------------------->
<title>案件详情信息</title>
<link rel="stylesheet" href="<%=basePath%>css/Info/InfoDetails.css">
<link rel="stylesheet"
	href="<%=basePath%>css/Process/processDetails.css">
<style type="text/css">
html, body, .radio, .checkbox, .button_process {
	margin: 0px !important;
	padding: 0px !important;
}

.first_process_div {
	border: solid 1px #eee;
	margin: 0px 0px 40px 0px;
	/* float: left; */
}

.summon_process {
	border-bottom: solid 1px #eee;
	padding: 10px 0;
}

.process_title, button {
	display: inline-block;
	vertical-align: middle;
}
</style>
</head>
<body>
	<s:action name="User_navbar" namespace="/user" executeResult="true" />
	<!---------------------------------------------------------------------------------------------------->
	<!---------------------------------------------------------------------------------------------------->
	<!---------------------------------------------------------------------------------------------------->
	<div
		style="margin: 80px 0 0 0; float: left; width: 100%; overflow: hidden;">
		<div class="panel"
			style="width: 95%; margin: 20px auto; overflow: inherit; position: relative;">
			<!--  -->
			<div class="panel-heading">
				<h3 class="panel-title">案件详情</h3>
			</div>
			<button onclick="javascript:history.go(-1)" type="button"
				class="btn btn-default button button_return ">
				<i class="fa fa-reply"></i> 返回列表
			</button>
			<!-- 			<button type="button" class="btn btn-default button button_change" -->
			<!-- 				onclick="staff_relive()"> -->
			<!-- 				<i class="fa fa-pencil"></i> 修改人员 -->
			<!-- 			</button> -->
			<div class="panel-body staff_body">
				<form id="staffDetails" enctype="multipart/form-data"
					accept-charset="utf-8">
					<table style="width: 90%; margin-left: 30px;">
						<tr>
							<td colspan="6" class="staff_info_title">基本信息</td>
						</tr>
						<tr style="height: 20px"></tr>
						<tr>
							<td><label>案件名称</label></td>
							<td><input name="info.info_name" disabled="disabled"
								class="form-control" type="text"></td>
							<td><label>案件类别</label></td>
							<td><input name="info.info_category" class="form-control"
								disabled="disabled" type="text"></td>
						</tr>
						<tr>
							<td><label>办案单位</label></td>
							<td><input name="department.department_name"
								disabled="disabled" class="form-control" type="text"></td>

							<td><label>抓获时间</label></td>
							<td><input style="font-size: 12px;" disabled="disabled"
								name="info.info_catch_time" class="form-control" type="text"></td>
						</tr>
						<tr>

							<td><label>主办民警</label></td>
							<td><input name="police[0].police_name" disabled="disabled"
								class="form-control" type="text"></td>
							<td><label>协办民警1</label></td>
							<td><input name="police[1].police_name" disabled="disabled"
								class="form-control" type="text"></td>

						</tr>

						<tr>

							<td><label>协办民警2</label></td>
							<td><input name="police[2].police_name" disabled="disabled"
								class="form-control" type="text"></td>
							<td><label>法制员</label></td>
							<td><input name="info.info_department_legal_member"
								disabled="disabled" class="form-control" type="text"></td>

						</tr>

						<tr>

							<td><label>所（队）长</label></td>
							<td><input name="info.info_department_captain"
								disabled="disabled" class="form-control" type="text"></td>
							<td><label>值班局领导</label></td>
							<td><input name="leader.police_name" disabled="disabled"
								class="form-control" type="text"></td>

						</tr>

						<tr>
							<td><label>值班民警</label></td>
							<td><input name="legal.police_name" disabled="disabled"
								class="form-control" type="text"></td>
						</tr>
					</table>
				</form>
			</div>
			<!-- ------------------------------------------------------------------------------------->
			<!-- -----------------------------------------行政案件-------------------------------------------->
			<div style="margin: 80px 0 0 0; float: left; width: 100%;"
				id="xingzheng_case">
				<div class="panel" style="width: 95%; margin: 20px auto;">
					<!--  -->
					<div class="panel-heading">
						<h4 class="panel-title">行政案件流程</h4>
					</div>
					<div class="panel-body">
						<div class="col-md-12">
							<div class="panel">
								<!--  -->
								<div class="panel-body">
									<!-- 左边 -->
									<!-- 						<div id="administrative_process_left" class="col-md-4"></div> -->
									<!-- 右边 -->
									<form action="" id="processDetails">
										<div id="administrative_process_right" class="col-md-12">
											<!-- 	<div id="administrative_process_right" class="col-md-12"> -->
											<!-------------------------------------->
											<!-------------第一阶段 传唤---------------->
											<div class="first_process_div col-md-12">
												<div class="first_process">
													<fieldset>
														<legend>传唤</legend>
														<!-- 是否传唤嫌疑人 -->
														<div class="summon_process col-md-12">
															<div class="process_title col-md-4">延长传唤嫌疑人：</div>
															<div class="radio col-md-4">
																<label style="margin: 0 10px;"> <input
																	type="radio" onclick=changesuspect_summon_yes(this)
																	name="ajdbxtProcess.process_lengthen_subpoena"
																	id="suspect_summon_yes" value="是"> 是
																</label><label style="margin: 0 10px;"> <input
																	type="radio" onclick=changesuspect_summon_no(this)
																	name="ajdbxtProcess.process_lengthen_subpoena"
																	id="suspect_summon_no" value="否"> 否
																</label>
															</div>
															<div class="col-md-4 process_button">
																<s:if test='#session.loginPolice.police_duty=="警员"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		onclick="suspect_summon(this)"
																		style="width: 40%; float: right;">提交</button>
																</s:if>
															</div>
														</div>
														<!-- 询问未成年人 -->
														<div class="summon_process col-md-12">
															<div class="process_title col-md-4">询问未成年人：</div>
															<div class="radio col-md-4">
																<label style="margin: 0 10px;"> <input
																	type="radio" onclick=changeminors_asking_yes(this)
																	name="ajdbxtProcess.process_nonage"
																	id="minors_asking_yes" value="是"> 是
																</label><label style="margin: 0 10px;"> <input
																	type="radio" onclick=changeminors_asking_no(this)
																	name="ajdbxtProcess.process_nonage"
																	id="minors_asking_no" value="否"> 否
																</label>
															</div>
															<div class="col-md-4 process_button">
																<s:if test='#session.loginPolice.police_duty=="警员"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		onclick="minors_asking()"
																		style="width: 40%; float: right;">提交</button>
																</s:if>
															</div>
															<!-- <div class="col-md-4 process_title">提醒：通知监护人到场</div> -->
														</div>

														<!-- 鉴定 -->
														<div class="summon_process col-md-12">
															<div class="process_title col-md-4">鉴定：</div>
															<div class="radio col-md-4">
																<label style="margin: 0 10px;"> <input
																	type="radio" onclick=changeidentification_yes(this)
																	name="ajdbxtProcess.process_authenticate"
																	id="identification_yes" value="是"> 是
																</label><label style="margin: 0 10px;"> <input
																	type="radio" onclick=changeidentification_no(this)
																	name="ajdbxtProcess.process_authenticate"
																	id="identification_no" value="否"> 否
																</label>
															</div>
															<!-- <div class="col-md-4 process_title">提醒：请在4日内作出决定，5日内将鉴定意见复印件送达违法嫌疑人及被害人</div> -->
															<div class="col-md-4 process_button">
																<s:if test='#session.loginPolice.police_duty=="警员"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		onclick="identification()"
																		style="width: 40%; float: right;">提交</button>
																</s:if>
															</div>
														</div>

														<!-- 涉案财物 -->
														<div class="summon_process col-md-12">
															<div class="process_title col-md-4">涉案财物：</div>
															<div class="radio col-md-4">
																<label style="margin: 0 10px;"> <input
																	type="radio" onclick=changecase_property_yes(this)
																	name="ajdbxtProcess.process_case_goods"
																	id="case_property_yes" value="是"> 有
																</label><label style="margin: 0 10px;"> <input
																	type="radio" onclick=changecase_property_no(this)
																	name="ajdbxtProcess.process_case_goods"
																	id="case_property_no" value="否"> 无
																</label>
															</div>
															<div class="col-md-4 process_button">
																<s:if test='#session.loginPolice.police_duty=="警员"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		style="width: 40%; float: right;"
																		onclick="case_property()">提交</button>
																</s:if>
															</div>
														</div>

													</fieldset>
												</div>
											</div>
											<!-- ------------------------ -->
											<!-- 第二阶段   听证 -->
											<div class="first_process_div col-md-12">
												<div class="first_process">
													<fieldset>
														<legend>听证</legend>
														<!-- 听证申请-->
														<div class="summon_process col-md-12"
															id="hearing_applying_div">
															<div class="process_title col-md-4">听证申请：</div>
															<div class="radio col-md-4">
																<label style="margin: 0 10px;"> <input
																	type="radio" onclick=changehearing_applying_yes(this)
																	name="ajdbxtProcess.process_apply_right"
																	id="hearing_applying_yes" value="是"> 是
																</label><label style="margin: 0 10px;"> <input
																	type="radio" onclick=changehearing_applying_no(this)
																	name="ajdbxtProcess.process_apply_right"
																	id="hearing_applying_no" value="否"> 否
																</label>
															</div>
															<div class="col-md-4 process_button">
																<s:if test='#session.loginPolice.police_duty=="警员"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		style="width: 40%; float: right;"
																		onclick="hearing_applying()">提交</button>
																</s:if>
															</div>
														</div>
													</fieldset>
												</div>
											</div>

											<!-------------------------------------->
											<!-------------第四阶段 法制大队打回案件---------------->
											<div class="first_process_div col-md-12">
												<div class="first_process">
													<fieldset>
														<legend>打回</legend>
														<div class="summon_process col-md-12">
															<div class="process_title col-md-4">打回：</div>
															<div class="radio col-md-4">
																<label style="margin: 0 10px;"> <input
																	type="radio" onclick=changeproblem_asking_yes(this)
																	name="" id="" value="是"> 是
																</label><label style="margin: 0 10px;"> <input
																	type="radio" onclick=changeproblem_asking_no(this)
																	name="" id="" value="否"> 否
																</label>
															</div>
															<div class="col-md-4 process_button">
																<s:if
																	test='#session.loginPolice.police_department=="67ed5ab3-d773-4ac1-981b-2839ed0cec5c"'>
																	<button type="button"
																		class="btn btn-primary  btn-block" onclick=""
																		style="width: 40%; float: right;">提交</button>
																</s:if>
															</div>
														</div>
													</fieldset>
												</div>
											</div>
											<!-------------------------------------->
											<!-------------第四阶段 法制大队提出问题---------------->
											<div class="first_process_div col-md-12">
												<div class="first_process">
													<fieldset>
														<legend>提出问题</legend>
														<div class="summon_process col-md-12">
															<div class="process_title col-md-4">提出问题：</div>
															<!-- 												<div class="radio col-md-4"> -->
															<!-- 													<label style="margin: 0 10px;"> <input type="radio" onclick=changeproblem_asking_yes(this) -->
															<!-- 														name="ajdbxtProcess.process_question_list" id="problem_asking_yes" value="是"> -->
															<!-- 														是 -->
															<!-- 													</label><label style="margin: 0 10px;"> <input type="radio" onclick=changeproblem_asking_no(this) -->
															<!-- 														name="ajdbxtProcess.process_question_list" id="problem_asking_no" value="否"> -->
															<!-- 														否 -->
															<!-- 													</label> -->
															<!-- 												</div> -->
															<div class="process_title col-md-4">
																<input type="text" class="form-control"
																	name="process.process_question_list"
																	id="process_question_list" placeholder="请填写提出问题数量">
															</div>
															<div class="col-md-4 process_button">
																<s:if
																	test='#session.loginPolice.police_department=="67ed5ab3-d773-4ac1-981b-2839ed0cec5c"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		onclick="problem_asking()"
																		style="width: 40%; float: right;">提交</button>
																</s:if>
															</div>
														</div>
													</fieldset>
												</div>
											</div>
											<!-------------------------------------->
											<!-------------第六阶段 普通警员进行问题整改---------------->
											<div class="first_process_div col-md-12">
												<div class="first_process">
													<fieldset>
														<legend>问题整改</legend>
														<!--  -->
														<div class="summon_process col-md-12">
															<div class="process_title col-md-4">问题整改：</div>
															<!-- 												<div class="radio col-md-4"> -->
															<!-- 													<label style="margin: 0 10px;"> <input type="radio" onclick=changeproblem_rectification_yes(this) -->
															<!-- 														name="ajdbxtProcess.process_question" id="problem_rectification_yes" -->
															<!-- 														value="是"> 是 -->
															<!-- 													</label><label style="margin: 0 10px;"> <input type="radio" onclick=changeproblem_rectification_no(this) -->
															<!-- 														name="ajdbxtProcess.process_question" id="problem_rectification_no" -->
															<!-- 														value="否"> 否 -->
															<!-- 													</label> -->
															<!-- 												</div> -->
															<div class="process_title col-md-4">
																<input type="text" class="form-control"
																	name="process.process_question" id="process_question"
																	placeholder="请填写问题整改数量">
															</div>
															<div class="col-md-4 process_button">
																<s:if
																	test='#session.loginPolice.police_department=="67ed5ab3-d773-4ac1-981b-2839ed0cec5c"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		onclick="problem_rectification()"
																		id="but_process_question"
																		style="width: 40%; float: right;">提交</button>
																</s:if>
															</div>
														</div>
													</fieldset>
												</div>
											</div>
											<!-------------------------------------->
											<!-------------第三阶段 处罚---------------->
											<div class="first_process_div col-md-12">
												<div class="first_process">
													<fieldset>
														<legend>处罚</legend>
														<!-- 处罚 -->
														<div class="summon_process col-md-12">
															<div class="process_title col-md-2">处罚:</div>
															<div class="checkbox col-md-8">
																<label style="margin: 0 10px;"> <input
																	type="checkbox" name="process.process_detention"
																	value="是" id="process_detention"> 行政拘留
																</label><label style="margin: 0 10px;"> <input
																	type="checkbox" name="process.process_penalty"
																	value="是" id="process_penalty"> 罚款
																</label> <label style="margin: 0 10px;"> <input
																	onclick=changeprocess_treatment_category_yes(this)
																	id="process_treatment_category_yes" type="radio"
																	name="ajdbxtProcess.process_treatment_category"
																	value="是">强制隔离戒毒
																</label><label style="margin: 0 0px;"> <input
																	id="process_treatment_category_no"
																	onclick=changeprocess_treatment_category_no(this)
																	type="radio"
																	name="ajdbxtProcess.process_treatment_category"
																	value="否"> 社区戒毒
																</label>
															</div>
															<div class="col-md-2 process_button">
																<s:if test='#session.loginPolice.police_duty=="警员"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		onclick="punishmentab()" id="punishmentab"
																		style="width: 90%; float: right;">提交</button>
																</s:if>
															</div>
														</div>
														<!-- 处罚已通知 -->
														<!-- 											<div class="summon_process col-md-12"> -->
														<!-- 												<div class="process_title col-md-4">处罚已通知：</div> -->
														<!-- 												<div class="radio col-md-4"> -->
														<!-- 													<label style="margin: 0 10px;"> <input type="radio" -->
														<!-- 														name="punishment_notice" id="punishment_notice_yes" value=""> -->
														<!-- 														是 -->
														<!-- 													</label><label style="margin: 0 10px;"> <input type="radio" -->
														<!-- 														name="punishment_notice" id="punishment_notice_no" value=""> -->
														<!-- 														否 -->
														<!-- 													</label> -->
														<!-- 												</div> -->
														<!-- 												<div class="col-md-4 process_button"> -->
														<!-- 													<button type="button" class="btn btn-primary  btn-block" -->
														<!-- 														style="width: 40%; float: right;">提交</button> -->
														<!-- 												</div> -->
														<!-- 											</div> -->


													</fieldset>
												</div>
											</div>
											<!-------------------------------------->
											<!-------------第五阶段   所队长 审核---------------->
											<div class="first_process_div col-md-12">
												<div class="first_process">
													<fieldset>
														<legend>审核</legend>
														<!--  -->
														<div class="summon_process col-md-12">
															<div class="process_title col-md-4">审核：</div>
															<div class="radio col-md-4">
																<label style="margin: 0 10px;"> <input
																	type="radio" onclick=changecase_review_yes(this)
																	name="ajdbxtProcess.process_captain_check"
																	id="case_review_yes" value="是"> 是
																</label><label style="margin: 0 10px;"> <input
																	type="radio" onclick=changecase_review_no(this)
																	name="ajdbxtProcess.process_captain_check"
																	id="case_review_no" value="否"> 否
																</label>
															</div>
															<div class="col-md-4 process_button">
																<s:if test='#session.loginPolice.police_duty=="所长"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		onclick="case_review()"
																		style="width: 40%; float: right;">提交</button>
																</s:if>
															</div>
														</div>
													</fieldset>
												</div>
											</div>
											<!-------------------------------------->
											<!-------------第五阶段   涉案财物入库---------------->
											<div class="first_process_div col-md-12" id="sheancaiwu">
												<div class="first_process">
													<fieldset>
														<legend>涉案财物已入库</legend>
														<!--  -->
														<div class="summon_process col-md-12">
															<div class="process_title col-md-4">涉案财物已入库：</div>
															<div class="radio col-md-4">
																<label style="margin: 0 10px;"> <input
																	type="radio" onclick=changecase_ending_yes(this)
																	name="" id="" value="是"> 是
																</label><label style="margin: 0 10px;"> <input
																	type="radio" onclick=changecase_ending_no(this) name=""
																	id="" value="否"> 否
																</label>
															</div>
															<div class="col-md-4 process_button">
																<s:if
																	test='#session.loginPolice.police_department=="67ed5ab3-d773-4ac1-981b-2839ed0cec5c"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		onclick="case_ending()" id="process_case_end"
																		style="width: 40%; float: right;">提交</button>
																</s:if>
															</div>
														</div>

													</fieldset>
												</div>
											</div>
											<!-------------------------------------->
											<!-------------第七阶段 法制大队结案---------------->
											<div class="first_process_div col-md-12">
												<div class="first_process">
													<fieldset>
														<legend>结案</legend>
														<!--  -->
														<div class="summon_process col-md-12">
															<div class="process_title col-md-4">结案：</div>
															<div class="radio col-md-4">
																<label style="margin: 0 10px;"> <input
																	type="radio" onclick=changecase_ending_yes(this)
																	name="ajdbxtProcess.process_case_end"
																	id="case_ending_yes" value="是"> 是
																</label><label style="margin: 0 10px;"> <input
																	type="radio" onclick=changecase_ending_no(this)
																	name="ajdbxtProcess.process_case_end"
																	id="case_ending_no" value="否"> 否
																</label>
															</div>
															<div class="col-md-4 process_button">
																<s:if
																	test='#session.loginPolice.police_department=="67ed5ab3-d773-4ac1-981b-2839ed0cec5c"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		onclick="case_ending()" id="process_case_end"
																		style="width: 40%; float: right;">提交</button>
																</s:if>
															</div>
														</div>

													</fieldset>
												</div>
											</div>
											<!-------------------------------------->
											<!-------------第八阶段 法制大队评分---------------->
											<div class="first_process_div col-md-12">
												<div class="first_process">
													<fieldset>
														<legend>评分</legend>
														<!--  -->
														<div class="summon_process col-md-12">
															<div class="process_title col-md-4">案件评分：</div>
															<div class="process_title col-md-4">
																<input type="text" class="form-control"
																	name="process.process_score" id="input_case_score"
																	placeholder="请填写案件评分">
															</div>
															<div class="col-md-4 process_button">
																<s:if
																	test='#session.loginPolice.police_department=="67ed5ab3-d773-4ac1-981b-2839ed0cec5c"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		onclick="case_score()" id="case_score"
																		style="width: 40%; float: right;">提交</button>
																</s:if>
															</div>
														</div>
													</fieldset>
												</div>
											</div>

											<!-------------------------------------->
											<!-------------第九阶段 办案民警---------------->
											<div class="first_process_div col-md-12">
												<div class="first_process">
													<fieldset>
														<legend>案卷上交</legend>
														<!--  -->
														<div class="summon_process col-md-12">
															<div class="process_title col-md-4">案卷上交：</div>
															<div class="process_title col-md-4">
																<input type="hidden"
																	name="ajdbxtProcess.process_file_hand" value="是">
																<s:if
																	test='#session.loginPolice.police_department=="67ed5ab3-d773-4ac1-981b-2839ed0cec5c"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		onclick="process_file_hand()" id="process_file_hand"
																		style="float: center;">上交案卷</button>
																</s:if>
															</div>

														</div>
													</fieldset>
												</div>
											</div>

										</div>
									</form>
									<!-- administrative_process_right  -->
								</div>
								<!-- panel-body -->
							</div>
						</div>

					</div>
				</div>
			</div>
			<!-- -------------------------------------------刑事案件----------------------------------------- -->
			<div style="margin: 80px 0 0 0; float: left; width: 100%;"
				id="xingshi_case">
				<div class="panel" style="width: 95%; margin: 20px auto;">
					<!--  -->
					<div class="panel-heading">
						<h4 class="panel-title">刑事案件流程</h4>
					</div>
					<div class="panel-body">
						<div class="col-md-12">
							<div class="panel">
								<!--  -->
								<div class="panel-body">
									<!-- 左边 -->
									<!-- 						<div id="administrative_process_left" class="col-md-4"></div> -->
									<!-- 右边 -->
									<form action="" id="processDetails">
										<div id="administrative_process_right" class="col-md-12">
											<!-- 	<div id="administrative_process_right" class="col-md-12"> -->
											<!-------------------------------------->
											<!-------------第一阶段   涉案财物入库---------------->
											<div class="first_process_div col-md-12" id="sheancaiwu" >
												<div class="first_process">
													<fieldset>
														<legend>涉案财物</legend>
														<!-- 涉案财物 -->
														<div class="summon_process col-md-12" id="case_property">
															<div class="process_title col-md-4">涉案财物：</div>
															<div class="radio col-md-4">
																<label style="margin: 0 10px;"> <input
																	type="radio" onclick="case_propertyBtnClick(this)"
																	name="case_property" 
																	id="case_property_yes" value="1"> 有
																</label><label style="margin: 0 10px;"> <input
																	type="radio" onclick="case_propertyBtnClick(this)"
																	name="case_property"
																	id="case_property_no" value="0"> 无
																</label>
															</div>
															<div class="col-md-4 process_button">
																<s:if
																	test='#session.loginPolice.police_department=="67ed5ab3-d773-4ac1-981b-2839ed0cec5c"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		onclick="case_ending()" id="process_case_end"
																		style="width: 40%; float: right;">提交</button>
																</s:if>
															</div>															
														</div>
														<!-- 涉案财物已入库 -->
														<div class="summon_process col-md-12" id="property_storage_div" style="display:none;" >
															<div class="process_title col-md-4">涉案财物已入库：</div>
															<div class="radio col-md-4">
																<label style="margin: 0 10px;"> <input
																	type="radio" onclick=case_propertyBtnClick(this)
																	name="property_storage"
																	id="case_property_yes" value="是"> 是
																</label><label style="margin: 0 10px;"> <input
																	type="radio" onclick=case_propertyBtnClick(this)
																	name="property_storage"
																	id="case_property_no" value="否"> 否
																</label>
															</div>
															<div class="col-md-4 process_button">
																<s:if
																	test='#session.loginPolice.police_department=="67ed5ab3-d773-4ac1-981b-2839ed0cec5c"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		onclick="case_ending()" id="process_case_end"
																		style="width: 40%; float: right;">提交</button>
																</s:if>
															</div>															
														</div>

													</fieldset>
												</div>
												</div>
											<!-------------------------------------->
											<!-------------第二阶段 传唤---------------->
											<div class="first_process_div col-md-12">
												<div class="first_process">
													<fieldset>
														<legend>传唤</legend>
														<!-- 是否传唤嫌疑人 -->
														<div class="summon_process col-md-12">
															<div class="process_title col-md-4">延长传唤嫌疑人：</div>
															<div class="radio col-md-4">
																<label style="margin: 0 10px;"> <input
																	type="radio" onclick=changesuspect_summon_yes(this)
																	name="ajdbxtProcess.process_lengthen_subpoena"
																	id="suspect_summon_yes" value="是"> 是
																</label><label style="margin: 0 10px;"> <input
																	type="radio" onclick=changesuspect_summon_no(this)
																	name="ajdbxtProcess.process_lengthen_subpoena"
																	id="suspect_summon_no" value="否"> 否
																</label>
															</div>
															<div class="col-md-4 process_button">
																<s:if test='#session.loginPolice.police_duty=="警员"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		onclick="suspect_summon(this)"
																		style="width: 40%; float: right;">提交</button>
																</s:if>
															</div>
														</div>
														<!-- 询问未成年人 -->
														<div class="summon_process col-md-12">
															<div class="process_title col-md-4">询问未成年人：</div>
															<div class="radio col-md-4">
																<label style="margin: 0 10px;"> <input
																	type="radio" onclick=changeminors_asking_yes(this)
																	name="ajdbxtProcess.process_nonage"
																	id="minors_asking_yes" value="是"> 是
																</label><label style="margin: 0 10px;"> <input
																	type="radio" onclick=changeminors_asking_no(this)
																	name="ajdbxtProcess.process_nonage"
																	id="minors_asking_no" value="否"> 否
																</label>
															</div>
															<div class="col-md-4 process_button">
																<s:if test='#session.loginPolice.police_duty=="警员"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		onclick="minors_asking()"
																		style="width: 40%; float: right;">提交</button>
																</s:if>
															</div>
															<!-- <div class="col-md-4 process_title">提醒：通知监护人到场</div> -->
														</div>

														<!-- 鉴定 -->
														<div class="summon_process col-md-12">
															<div class="process_title col-md-4">鉴定：</div>
															<div class="radio col-md-4">
																<label style="margin: 0 10px;"> <input
																	type="radio" onclick=changeidentification_yes(this)
																	name="ajdbxtProcess.process_authenticate"
																	id="identification_yes" value="是"> 是
																</label><label style="margin: 0 10px;"> <input
																	type="radio" onclick=changeidentification_no(this)
																	name="ajdbxtProcess.process_authenticate"
																	id="identification_no" value="否"> 否
																</label>
															</div>
															<!-- <div class="col-md-4 process_title">提醒：请在4日内作出决定，5日内将鉴定意见复印件送达违法嫌疑人及被害人</div> -->
															<div class="col-md-4 process_button">
																<s:if test='#session.loginPolice.police_duty=="警员"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		onclick="identification()"
																		style="width: 40%; float: right;">提交</button>
																</s:if>
															</div>
														</div>

														<!-- 申请听证 -->
														<div class="summon_process col-md-12">
															<div class="process_title col-md-4">申请听证：</div>
															<div class="radio col-md-4">
																<label style="margin: 0 10px;"> <input
																	type="radio" onclick=changecase_property_yes(this)
																	name="ajdbxtProcess.process_case_goods"
																	id="case_property_yes" value="是"> 是
																</label><label style="margin: 0 10px;"> <input
																	type="radio" onclick=changecase_property_no(this)
																	name="ajdbxtProcess.process_case_goods"
																	id="case_property_no" value="否"> 否
																</label>
															</div>
															<div class="col-md-4 process_button">
																<s:if test='#session.loginPolice.police_duty=="警员"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		style="width: 40%; float: right;"
																		onclick="case_property()">提交</button>
																</s:if>
															</div>
														</div>

													</fieldset>
												</div>
											</div>
											<!-- ------------------------ -->
											<!-- 第三阶段  第一次强制措施 -->
											<div class="first_process_div col-md-12">
												<div class="first_process">
													<fieldset>	
													<legend>第一次强制措施 ：</legend>													
														<div class="summon_process col-md-12"
															id="hearing_applying_div">
															
															<div class="radio col-md-4">
																<label style="margin: 0 10px;"> <input
																	type="radio" onclick=mandatory_measuresBtnClick(this)
																	name="mandatory_measuresOne"
																	value="0"> 拘留
																</label><label style="margin: 0 10px;"> <input
																	type="radio" onclick=mandatory_measuresBtnClick(this)
																	name="mandatory_measuresOne"
																	value="1"> 监视居住
																</label>
																<label style="margin: 0 10px;"> <input
																	type="radio" onclick=mandatory_measuresBtnClick(this)
																	name="mandatory_measuresOne"
																	value="2"> 取保候审
																</label>
															</div>
															<div class="col-md-4 process_button">
																<s:if test='#session.loginPolice.police_duty=="警员"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		style="width: 40%; float: right;"
																		onclick="hearing_applying()">提交</button>
																</s:if>
															</div>
														</div>
													</fieldset>
												</div>
											</div>
											<!-------------------------------------->
											<!-------------第四阶段 拘留延长期限---------------->
											<div class="first_process_div col-md-12" style="display:none;" id="detention_delay_date">
												<div class="first_process">
													<fieldset>
														<legend>拘留延长期限</legend>
														<div class="summon_process col-md-12">
															<div class="process_title col-md-4">拘留延长期限：</div>
															<div class="radio col-md-4">
																<label style="margin: 0 10px;"> <input
																	type="radio" onclick=changeproblem_asking_yes(this)
																	name="detention_delay_date" id="" value="0"> 30
																</label><label style="margin: 0 10px;"> <input
																	type="radio" onclick=changeproblem_asking_no(this)
																	name="detention_delay_date" id="" value="1"> 7
																</label><label style="margin: 0 10px;"> <input
																	type="radio" onclick=changeproblem_asking_no(this)
																	name="detention_delay_date" id="" value="2"> 0
																</label>
															</div>
															<div class="col-md-4 process_button">
																<s:if
																	test='#session.loginPolice.police_department=="67ed5ab3-d773-4ac1-981b-2839ed0cec5c"'>
																	<button type="button"
																		class="btn btn-primary  btn-block" onclick=""
																		style="width: 40%; float: right;">提交</button>
																</s:if>
															</div>
														</div>
													</fieldset>
												</div>
											</div>
											<!-------------------------------------->
											<!-------------第三阶段 第二次强制措施---------------->
											<div class="first_process_div col-md-12" id="second_punishment" style="display:none;">
												<div class="first_process">
													<fieldset>
														<legend>第二次强制措施 ：</legend>		
														<!-- 处罚 -->
														<div class="summon_process col-md-12 ">
															<!-- <div class="process_title col-md-2">第二次强制措施:</div> -->
															<div class="checkbox col-md-8" id="second_punishment_content">
																
															</div>
															<div class="col-md-2 process_button">
																<s:if test='#session.loginPolice.police_duty=="警员"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		onclick="punishmentab()" id="punishmentab"
																		style="width: 90%; float: right;">提交</button>
																</s:if>
															</div>
														</div>													
													</fieldset>
												</div>
											</div>
											<!-------------------------------------->
											<!-------------第五阶段   第三次强制措施1---------------->
											<div class="first_process_div col-md-12" style="display:none;" id="third_punishmentone">
												<div class="first_process">
													<fieldset>
														<legend>第三次强制措施：</legend>
														<div class="summon_process col-md-12" id="third_punishmentone_value">
															<div class="col-md-4 process_button">
																<s:if
																	test='#session.loginPolice.police_department=="67ed5ab3-d773-4ac1-981b-2839ed0cec5c"'>
																	<button type="button"
																		class="btn btn-primary  btn-block" onclick=""
																		style="width: 40%; float: right;">提交</button>
																</s:if>
															</div>
														</div>
													</fieldset>
												</div>
											</div>
											
											<!-------------------------------------->
											<!-------------第五阶段   起诉---------------->
											<div class="first_process_div col-md-12" id="sheancaiwu">
												<div class="first_process">
													<fieldset>
														<legend>起诉</legend>
														<!--  -->
														<div class="summon_process col-md-12">
															<div class="process_title col-md-4">起诉：</div>
															<div class="radio col-md-4">
																<label style="margin: 0 10px;"> <input
																	type="radio" onclick="changesue(this)"
																	name="sue" id="" value="1"> 是
																</label><label style="margin: 0 10px;"> <input
																	type="radio" onclick="changesue(this)"
																	name="sue"
																	value="0"> 否
																</label>
															</div>
															<div class="col-md-4 process_button">
																<s:if
																	test='#session.loginPolice.police_department=="67ed5ab3-d773-4ac1-981b-2839ed0cec5c"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		onclick="case_ending()" id="process_case_end"
																		style="width: 40%; float: right;">提交</button>
																</s:if>
															</div>
														</div>
														<!--  -->
														<div class="summon_process col-md-12" id="checkOne" style="display:none;">
															<div class="process_title col-md-4">补查一次：</div>
															<div class="radio col-md-4">
																<label style="margin: 0 10px;"> <input
																	type="radio" onclick=changecase_ending_yes(this)
																	name="checkOne" id="checkOneYes" value="是"> 是
																</label><label style="margin: 0 10px;"> <input
																	type="radio" onclick=changecase_ending_no(this) name="checkOne"
																	id="checkOneNo" value="否"> 否
																</label>
															</div>
															<div class="col-md-4 process_button">
																<s:if
																	test='#session.loginPolice.police_department=="67ed5ab3-d773-4ac1-981b-2839ed0cec5c"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		onclick="case_ending()" id="process_case_end"
																		style="width: 40%; float: right;">提交</button>
																</s:if>
															</div>
														</div>
														<!--  -->
														<div class="summon_process col-md-12" id="checkTwo" style="display:none;">
															<div class="process_title col-md-4">补查二次：</div>
															<div class="radio col-md-4">
																<label style="margin: 0 10px;"> <input
																	type="radio" onclick=changecase_ending_yes(this)
																	name="checkTwo" id="" value="是"> 是
																</label><label style="margin: 0 10px;"> <input
																	type="radio" onclick=changecase_ending_no(this) name="checkTwo"
																	id="" value="否"> 否
																</label>
															</div>
															<div class="col-md-4 process_button">
																<s:if
																	test='#session.loginPolice.police_department=="67ed5ab3-d773-4ac1-981b-2839ed0cec5c"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		onclick="case_ending()" id="process_case_end"
																		style="width: 40%; float: right;">提交</button>
																</s:if>
															</div>
														</div>

													</fieldset>
												</div>
											</div>
											<!-------------------------------------->
											<!-------------第四阶段 法制大队提出问题---------------->
											<div class="first_process_div col-md-12">
												<div class="first_process">
													<fieldset>
														<legend>提出问题</legend>
														<div class="summon_process col-md-12">													
															<div class="process_title col-md-4">
																<input type="text" class="form-control"
																	name="process.process_question_list"
																	id="process_question_list" placeholder="请填写提出问题数量">
															</div>
															<div class="col-md-4 process_button">
																<s:if
																	test='#session.loginPolice.police_department=="67ed5ab3-d773-4ac1-981b-2839ed0cec5c"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		onclick="problem_asking()"
																		style="width: 40%; float: right;">提交</button>
																</s:if>
															</div>
														</div>
													</fieldset>
												</div>
											</div>
											<!-------------------------------------->
											<!-------------第六阶段 普通警员进行问题整改---------------->
											<div class="first_process_div col-md-12">
												<div class="first_process">
													<fieldset>
														<legend>问题整改</legend>
														<!--  -->
														<div class="summon_process col-md-12">
															<!-- <div class="process_title col-md-4">问题整改：</div>	 -->													
															<div class="process_title col-md-4">
																<input type="text" class="form-control"
																	name="process.process_question" id="process_question"
																	placeholder="请填写问题整改数量">
															</div>
															<div class="col-md-4 process_button">
																<s:if
																	test='#session.loginPolice.police_department=="67ed5ab3-d773-4ac1-981b-2839ed0cec5c"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		onclick="problem_rectification()"
																		id="but_process_question"
																		style="width: 40%; float: right;">提交</button>
																</s:if>
															</div>
														</div>
													</fieldset>
												</div>
											</div>
											<!-------------------------------------->
											
											
											<!-------------第七阶段 法制大队结案---------------->
											<div class="first_process_div col-md-12">
												<div class="first_process">
													<fieldset>
														<legend>结案</legend>
														<!--  -->
														<div class="summon_process col-md-12">
															<div class="process_title col-md-4">结案：</div>
															<div class="radio col-md-4">
																<label style="margin: 0 10px;"> <input
																	type="radio" onclick=changecase_ending_yes(this)
																	name="ajdbxtProcess.process_case_end"
																	id="case_ending_yes" value="是"> 是
																</label><label style="margin: 0 10px;"> <input
																	type="radio" onclick=changecase_ending_no(this)
																	name="ajdbxtProcess.process_case_end"
																	id="case_ending_no" value="否"> 否
																</label>
															</div>
															<div class="col-md-4 process_button">
																<s:if
																	test='#session.loginPolice.police_department=="67ed5ab3-d773-4ac1-981b-2839ed0cec5c"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		onclick="case_ending()" id="process_case_end"
																		style="width: 40%; float: right;">提交</button>
																</s:if>
															</div>
														</div>

													</fieldset>
												</div>
											</div>
											<!-------------------------------------->
											<!-------------第八阶段 法制大队评分---------------->
											<div class="first_process_div col-md-12">
												<div class="first_process">
													<fieldset>
														<legend>评分</legend>
														<!--  -->
														<div class="summon_process col-md-12">
															<!-- <div class="process_title col-md-4">案件评分：</div> -->
															<div class="process_title col-md-4">
																<input type="text" class="form-control"
																	name="process.process_score" id="input_case_score"
																	placeholder="请填写案件评分">
															</div>
															<div class="col-md-4 process_button">
																<s:if
																	test='#session.loginPolice.police_department=="67ed5ab3-d773-4ac1-981b-2839ed0cec5c"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		onclick="case_score()" id="case_score"
																		style="width: 40%; float: right;">提交</button>
																</s:if>
															</div>
														</div>
													</fieldset>
												</div>
											</div>

											<!-------------------------------------->
											<!-------------第九阶段 办案民警---------------->
											<div class="first_process_div col-md-12">
												<div class="first_process">
													<fieldset>
														<legend>案卷上交</legend>
														<!--  -->
														<div class="summon_process col-md-12">
															<div class="process_title col-md-4">案卷上交：</div>
															<div class="process_title col-md-4">
																<input type="hidden"
																	name="ajdbxtProcess.process_file_hand" value="是">
																<s:if
																	test='#session.loginPolice.police_department=="67ed5ab3-d773-4ac1-981b-2839ed0cec5c"'>
																	<button type="button"
																		class="btn btn-primary  btn-block"
																		onclick="process_file_hand()" id="process_file_hand"
																		style="float: center;">上交案卷</button>
																</s:if>
															</div>

														</div>
													</fieldset>
												</div>
											</div>

										</div>
									</form>
									<!-- administrative_process_right  -->
								</div>
								<!-- panel-body -->
							</div>
						</div>

					</div>
				</div>
			</div>
			<!-- ------------------------------------------案件流程---------------------------------------------------------------------------- -->
		</div>
	</div>

	<script type="text/javascript"
		src="<%=basePath%>js/Process/penalCaseDetails.js"></script>
	<script type="text/javascript">
		$.datetimepicker.setLocale('ch');
		$('.staff_joinPartyTime').datetimepicker({
			yearStart : 1900, // 设置最小年份
			yearEnd : 2100, // 设置最大年份
			yearOffset : 0, // 年偏差
			timepicker : false, // 关闭时间选项
			format : 'Y-m-d', // 格式化日期年-月-日
			minDate : '1900/01/01', // 设置最小日期

			maxDate : '2100/01/01', // 设置最大日期

		});
		$('.staff_joinWorkTime').datetimepicker({
			yearStart : 1900, // 设置最小年份
			yearEnd : 2100, // 设置最大年份
			yearOffset : 0, // 年偏差
			timepicker : true, // 关闭时间选项
			format : 'Y-m-d', // 格式化日期年-月-日
			minDate : '1900/01/01', // 设置最小日期
			maxDate : '2100/01/01', // 设置最大日期
		});
		$('.staff_thePoliceTime').datetimepicker({
			yearStart : 1900, // 设置最小年份
			yearEnd : 2100, // 设置最大年份
			yearOffset : 0, // 年偏差
			timepicker : true, // 关闭时间选项
			format : 'Y-m-d ', // 格式化日期年-月-日
			minDate : '1900/01/01', // 设置最小日期
			maxDate : '2100/01/01', // 设置最大日期
		});
		$('.staff_birthday').datetimepicker({
			yearStart : 1900, // 设置最小年份
			yearEnd : 2100, // 设置最大年份
			yearOffset : 0, // 年偏差
			timepicker : true, // 关闭时间选项
			format : 'Y-m-d ', // 格式化日期年-月-日
			minDate : '1900/01/01', // 设置最小日期
			maxDate : '2100/01/01', // 设置最大日期
		});
		$('.staffStudent_startTime').datetimepicker({
			yearStart : 1900, // 设置最小年份
			yearEnd : 2100, // 设置最大年份
			yearOffset : 0, // 年偏差
			timepicker : true, // 关闭时间选项
			format : 'Y-m-d ', // 格式化日期年-月-日
			minDate : '1900/01/01', // 设置最小日期
			maxDate : '2100/01/01', // 设置最大日期
		});
		$('.staffStudent_stopTime').datetimepicker({
			yearStart : 1900, // 设置最小年份
			yearEnd : 2100, // 设置最大年份
			yearOffset : 0, // 年偏差
			timepicker : true, // 关闭时间选项
			format : 'Y-m-d ', // 格式化日期年-月-日
			minDate : '1900/01/01', // 设置最小日期
			maxDate : '2100/01/01', // 设置最大日期
		});
		$('.staffFamily_birthday').datetimepicker({
			yearStart : 1900, // 设置最小年份
			yearEnd : 2100, // 设置最大年份
			yearOffset : 0, // 年偏差
			timepicker : true, // 关闭时间选项
			format : 'Y-m-d ', // 格式化日期年-月-日
			minDate : '1900/01/01', // 设置最小日期
			maxDate : '2100/01/01', // 设置最大日期
		});
		$('.staffWork_startTime').datetimepicker({
			yearStart : 1900, // 设置最小年份
			yearEnd : 2100, // 设置最大年份
			yearOffset : 0, // 年偏差
			timepicker : true, // 关闭时间选项
			format : 'Y-m-d ', // 格式化日期年-月-日
			minDate : '1900/01/01', // 设置最小日期
			maxDate : '2100/01/01', // 设置最大日期
		});
		$('.staffWork_stopTime').datetimepicker({
			yearStart : 1900, // 设置最小年份
			yearEnd : 2100, // 设置最大年份
			yearOffset : 0, // 年偏差
			timepicker : true, // 关闭时间选项
			format : 'Y-m-d ', // 格式化日期年-月-日
			minDate : '1900/01/01', // 设置最小日期
			maxDate : '2100/01/01', // 设置最大日期
		});
		$('.staffMove_inTime').datetimepicker({
			yearStart : 1900, // 设置最小年份
			yearEnd : 2100, // 设置最大年份
			yearOffset : 0, // 年偏差
			timepicker : true, // 关闭时间选项
			format : 'Y-m-d ', // 格式化日期年-月-日
			minDate : '1990/01/01', // 设置最小日期
			maxDate : '2100/01/01', // 设置最大日期
		});
		$('.staffMove_outTime').datetimepicker({
			yearStart : 1900, // 设置最小年份
			yearEnd : 2100, // 设置最大年份
			yearOffset : 0, // 年偏差
			timepicker : true, // 关闭时间选项
			format : 'Y-m-d ', // 格式化日期年-月-日
			minDate : '1900/01/01', // 设置最小日期
			maxDate : '2100/01/01', // 设置最大日期
		});
		$('.staffReward_Time').datetimepicker({
			yearStart : 1900, // 设置最小年份
			yearEnd : 2100, // 设置最大年份
			yearOffset : 0, // 年偏差
			timepicker : true, // 关闭时间选项
			format : 'Y-m-d ', // 格式化日期年-月-日
			minDate : '1900/01/01', // 设置最小日期
			maxDate : '2100/01/01', // 设置最大日期
		});
		$('.staffPrinciple_Time').datetimepicker({
			yearStart : 1900, // 设置最小年份
			yearEnd : 2100, // 设置最大年份
			yearOffset : 0, // 年偏差
			timepicker : true, // 关闭时间选项
			format : 'Y-m-d ', // 格式化日期年-月-日
			minDate : '1990/01/01', // 设置最小日期
			maxDate : '2100/01/01', // 设置最大日期
		});
		$('.staffPunishment_Time').datetimepicker({
			yearStart : 1900, // 设置最小年份
			yearEnd : 2100, // 设置最大年份
			yearOffset : 0, // 年偏差
			timepicker : true, // 关闭时间选项
			format : 'Y-m-d', // 格式化日期年-月-日
			minDate : '1900/01/01', // 设置最小日期
			maxDate : '2100/01/01', // 设置最大日期
		});
		$('.staffFurlough_startTime').datetimepicker({
			yearStart : 1900, // 设置最小年份
			yearEnd : 2100, // 设置最大年份
			yearOffset : 0, // 年偏差
			timepicker : true, // 关闭时间选项
			format : 'Y-m-d ', // 格式化日期年-月-日
			minDate : '1900/01/01', // 设置最小日期
			maxDate : '2100/01/01', // 设置最大日期
		});
		$('.staffFurlough_stopTime').datetimepicker({
			yearStart : 1900, // 设置最小年份
			yearEnd : 2100, // 设置最大年份
			yearOffset : 0, // 年偏差
			timepicker : true, // 关闭时间选项
			format : 'Y-m-d ', // 格式化日期年-月-日
			minDate : '1900/01/01', // 设置最小日期
			maxDate : '2100/01/01', // 设置最大日期
		});
	</script>

</body>
>>>>>>> origin/lyqqer
</html>