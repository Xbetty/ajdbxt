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

#checkbox_process_question ul {
	margin: 0 10px;
	padding: 0px;
	list-style-type: none;
	vertical-align: middle;
}

#checkbox_process_question li {
	float: left;
	display: block;
	text-decoration: none;
	margin: 0 10px;
}

#checkbox_process_question_penal_one ul {
	margin: 0 10px;
	padding: 0px;
	list-style-type: none;
	vertical-align: middle;
}

#checkbox_process_question_penal_one li {
	float: left;
	display: block;
	text-decoration: none;
	margin: 0 10px;
}

#checkbox_process_question_penal_two ul {
	margin: 0 10px;
	padding: 0px;
	list-style-type: none;
	vertical-align: middle;
}

#checkbox_process_question_penal_two li {
	float: left;
	display: block;
	text-decoration: none;
	margin: 0 10px;
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

							<td><label>到案时间</label></td>
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
							<td><label>值班法制民警</label></td>
							<td><input name="legal.police_name" disabled="disabled"
								class="form-control" type="text"></td>

							<!-- <td><label>未成年人</label></td>
							<td><label
								style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
									<input type="radio" name="info.info_nonage"
									id="caseDateles_minors_asking_yes" value="是"
									disabled="disabled"> 是
							</label> <label
								style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
									<input type="radio" name="info.info_nonage"
									id="caseDateles_minors_asking_no" value="否" disabled="disabled">
									否
							</label></td> -->
							<td><label>特殊案件</label></td>
							<td><label
								style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
									<input type="checkbox" name="info.info_special_case"
									id="caseDateles_special_case_yes" value="是"
									disabled="disabled"> 是
							</label></td>
						</tr>
						<tr>
							<td>通知局长、政委</td>
							<td><label
								style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
									<input type="checkbox" name="info.info_inform_leaders"
									id="caseDateles_info_inform_leaders_yes" value="是"
									disabled="disabled"> 是
							</label></td>
						</tr>
						
						<tr>
							<td>特殊人员</td>
							<td colspan="3">
							<label
								style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
									<input type="checkbox" name="info.info_special_person"
									id="caseDateles_info_special_person_lawyer" value="律师"
									disabled="disabled"> 律师
							</label>
							<label
								style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
									<input type="checkbox" name="info.info_special_person"
									id="caseDateles_info_special_person_reporter" value="记者"
									disabled="disabled"> 记者
							</label>
							<label
								style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
									<input type="checkbox" name="info.info_special_person"
									id="caseDateles_info_special_person_renda" value="人大"
									disabled="disabled"> 人大
							</label>
							<label
								style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
									<input type="checkbox" name="info.info_special_person"
									id="caseDateles_info_special_person_zhengxie" value="政协"
									disabled="disabled"> 政协
							</label>
							<label
								style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
									<input type="checkbox" name="info.info_special_person"
									id="caseDateles_info_special_person_minor" value="未成年人"
									disabled="disabled">未成年人
							</label>
							<label
								style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
									<input type="checkbox" name="info.info_special_person"
									id="caseDateles_info_special_person_shejing" value="涉警"
									disabled="disabled"> 涉警
							</label>
							
							<label
								style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
									<input type="checkbox" name="info.info_special_person"
									id="caseDateles_info_special_person_shezhong" value="涉众"
									disabled="disabled"> 涉众
							</label>
							<label
								style="margin: 0 10px; color: #999; font-size: 14px; font-weight: 400;">
									<input type="checkbox" name="info.info_special_person"
									id="caseDateles_info_special_person_shehei" value="涉黑"
									disabled="disabled"> 涉黑
							</label>
							</td>
						</tr>
					</table>
				</form>
			</div>
			<!-- ------------------------------------------------------------------------------------->

			<!-- -----------------------------------------行政案件-------------------------------------------->
			<div
				style="margin: 80px 0 0 0; float: left; width: 100%; display: none;"
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
											<!-- ----------------受立案+----------------- -->
											<div class="first_process_div col-md-12 div_put_on_record"
												style="display: none;">
												<div class="first_process">
													<fieldset>
														<legend>受立案</legend>
														<!-- 受立案-->
														<div class="summon_process col-md-12">
															<div class="process_title col-md-4">受立案：</div>
															<div class="radio col-md-4">
																<label style="margin: 0 10px;"> <input
																	type="radio" onclick=changeregister_yes(this)
																	name="ajdbxtProcess.process_put_on_record"
																	id="register_yes" value="是"> 是
																</label><label style="margin: 0 10px;"> <input
																	type="radio" onclick=changeregister_no(this)
																	name="ajdbxtProcess.process_put_on_record"
																	id="register_no" value="否"> 否
																</label>
															</div>
															<div class="col-md-4 process_button">
																<button type="button" id="registercommit"
																	class="btn btn-primary  btn-block btn_police_commit"
																	style="width: 40%; float: right;" onclick=" register()">办案民警提交</button>
															</div>
														</div>
													</fieldset>
												</div>
											</div>
											<!-------------------------------------------->
											<!-- 隐藏流程内容div -->
											<div class="div_no_put_on_record" style="display: none;">
												<!-------------第一阶段 传唤---------------->
												<div class="first_process_div col-md-12">
													<div class="first_process">
														<fieldset>
															<legend>传唤</legend>
															<!-- 是否传唤嫌疑人 -->
															<div class="summon_process col-md-12">
																<div class="process_title col-md-4">延长询问查证时间</div>
																<div class="radio col-md-4">
																	<label style="margin: 0 10px;"> <input
																		type="radio"
																		name="ajdbxtProcess.process_lengthen_subpoena"
																		id="suspect_summon_yes"
																		onclick="changesuspect_summon_yes(this)"
																		value="是"> 是
																	</label><label style="margin: 0 10px;"> <input
																		type="radio"
																		name="ajdbxtProcess.process_lengthen_subpoena"
																		id="suspect_summon_no"
																		onclick="changesuspect_summon_no(this)"
																		value="否"> 否
																	</label>
																</div>
																<div class="col-md-4 process_button">
																	<button type="button" id="suspectcommit"
																		class="btn btn-primary  btn-block btn_police_commit"
																		onclick="suspect_summon(this)"
																		style="width: 40%; float: right;">办案民警提交</button>
																</div>
															</div>

															<!-- 鉴定 -->
															<div class="summon_process col-md-12">
																<div class="process_title col-md-4">是否鉴定</div>
																<div class="radio col-md-4">
																	<label style="margin: 0 10px;"> <input
																		type="radio" onclick="changeidentification_yes(this)"
																		name="ajdbxtProcess.process_authenticate"
																		id="identification_yes" value="是"> 是
																	</label><label style="margin: 0 10px;"> <input
																		type="radio" onclick="changeidentification_no(this)"
																		name="ajdbxtProcess.process_authenticate"
																		id="identification_no" value="否"> 否
																	</label>
																</div>
																<div class="col-md-4 process_button">
																	<button type="button" id="authenticatecommit"
																		class="btn btn-primary  btn-block btn_police_commit"
																		onclick="identification()"
																		style="width: 40%; float: right;">办案民警提交</button>
																</div>
															</div>

															<!-- 涉案财物 -->
															<div class="summon_process col-md-12">
																<div class="process_title col-md-4">涉案财物</div>
																<div class="radio col-md-4">
																	<label style="margin: 0 10px;"> <input
																		type="radio" onclick="changecase_property_yes(this)"
																		name="ajdbxtProcess.process_case_goods"
																		id="case_property_yes" value="是"> 有
																	</label><label style="margin: 0 10px;"> <input
																		type="radio" onclick="changecase_property_no(this)"
																		name="ajdbxtProcess.process_case_goods"
																		id="case_property_no" value="否"> 无
																	</label>
																</div>
																<div class="col-md-4 process_button">
																	<button type="button" id="submitcasegoods"
																		class="btn btn-primary  btn-block btn_police_commit"
																		style="width: 40%; float: right;"
																		onclick="case_property()">办案民警提交</button>
																</div>
															</div>

														</fieldset>
													</div>
												</div>
												
												<!-------------第7阶段   所队长 审核---------------->
												<div class="first_process_div col-md-12">
													<div class="first_process">
														<fieldset>
															<legend>所队长审核</legend>
															<!--  -->
															<div class="summon_process col-md-12">
																<!-- <div class="process_title col-md-4">是否审核</div> -->
																<div class="radio col-md-4">
																	<label style="margin: 0 10px;"> <input
																		type="radio" onclick='changecase_review_yes(this)'
																		name="ajdbxtProcess.process_captain_check"
																		id="case_review_yes" value="是"> 是
																	</label><label style="margin: 0 10px;"> <input
																		type="radio" onclick='changecase_review_no(this)'
																		name="ajdbxtProcess.process_captain_check"
																		id="case_review_no" value="否"> 否
																	</label>
																</div>
																<div class="col-md-4 process_button">
																	<button type="button" id="captaincommit"
																		class="btn btn-primary  btn-block btn_cap_commit"
																		onclick="case_review()"
																		style="width: 40%; float: right;">所队长提交</button>
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
																<div class="process_title col-md-4">听证申请</div>
																<div class="radio col-md-4">
																	<label style="margin: 0 10px;"> <input
																		type="radio" onclick="changehearing_applying_yes(this)"
																		name="ajdbxtProcess.process_apply_right"
																		id="hearing_applying_yes" value="是"> 是
																	</label><label style="margin: 0 10px;"> <input
																		type="radio" onclick="changehearing_applying_no(this)"
																		name="ajdbxtProcess.process_apply_right"
																		id="hearing_applying_no" value="否"> 否
																	</label>
																</div>
																<div class="col-md-4 process_button">
																	<button type="button" id="submithearing"
																		class="btn btn-primary  btn-block btn_police_commit"
																		style="width: 40%; float: right;"
																		onclick="hearing_applying()">办案民警提交</button>
																</div>
															</div>
														</fieldset>
													</div>
												</div>

												<!-------------------------------------->
												<!-------------第3阶段 法制大队打回案件---------------->
												<%-- <div class="first_process_div col-md-12 btn_legal_commit"
													id="dahuixiugai">
													<div class="first_process">
														<fieldset>
															<legend>退回修改</legend>
															<div class="summon_process col-md-12">
																<div class="process_title col-md-4">是否退回</div>
																<div class="radio col-md-4">
																	<label style="margin: 0 10px;"> <input
																		type="radio" onclick=changerollback_yes(this)
																		name="ajdbxtProcess.process_is_rollback"
																		id="rollback_yes" value="是"> 是
																	</label><label style="margin: 0 10px;"> <input
																		type="radio" onclick=changerollback_no(this)
																		name="ajdbxtProcess.process_is_rollback"
																		id="rollback_no" value="否"> 否
																	</label>
																</div>
																<div class="col-md-4 process_button">
																	<button type="button" id="rollback_commit"
																		class="btn btn-primary  btn-block btn_legal_commit"
																		onclick="process_rollback()"
																		style="width: 40%; float: right;">法制大队提交</button>
																</div>
															</div>
														</fieldset>
													</div>
												</div>
												<!-------------------------------------->

												<!-------------------------打回修改完成  -->
												<div class="first_process_div col-md-12 btn_police_commit"
													id="xiugaiok" hidden="true">
													<div class="first_process">
														<fieldset>
															<legend>修改完成</legend>
															<!--  -->
															<div class="summon_process col-md-12">
																<!-- <div class="process_title col-md-4">修改完成：</div> -->
																<div class="process_title col-md-4">
																	<input type="hidden" id="process_is_rollback_id"
																		value="待处理">
																	<s:if
																		test='#session.loginPolice.ajdbxt_police.police_duty=="警员" && #session.loginPolice.ajdbxt_police.police_department!="67ed5ab3-d773-4ac1-981b-2839ed0cec5c"'>
																		<button type="button"
																			class="btn btn-primary  btn-block"
																			onclick="process_is_rollback_ok()"
																			style="float: center;">办案单位打回修改完成</button>
																	</s:if>
																</div>

															</div>
														</fieldset>
													</div>
												</div> --%>


												<!-- ---------------行政案件--证据上交-------------------- -->
												<div class="first_process_div col-md-12">
													<div class="first_process">
														<fieldset>
															<legend>证据上传</legend>
															<!--  -->
															<div class="summon_process col-md-12">
																<div class="process_title col-md-4">证据上传</div>
																<div class="radio col-md-4">
																	<label style="margin: 0 10px;"> <input
																		type="radio" onclick='changeevidence_yes(this)'
																		name="ajdbxtProcess.process_evidence_to_upload_affirm"
																		id="evidence_yes" value="是"> 是
																	</label><label style="margin: 0 10px;"> <input
																		type="radio" onclick='changeevidence_no(this)'
																		name="ajdbxtProcess.process_evidence_to_upload_affirm"
																		id="evidence_no" value="否"> 否
																	</label>
																</div>
																<div class="col-md-4 process_button">
																	<button type="button" id="evidencecommit"
																		class="btn btn-primary  btn-block btn_police_commit"
																		onclick="case_evidence()"
																		style="width: 40%; float: right;">办案民警提交</button>
																</div>
															</div>

														</fieldset>
													</div>
												</div>
												<!-------------第四阶段 法制大队提出问题---------------->
												<div class="first_process_div col-md-12">
													<div class="first_process">
														<fieldset>
															<legend>问题清单</legend>
															<div class="summon_process col-md-12">
																<div class="process_title col-md-4">问题清单</div>
																<div class="process_title col-md-4">
																	<input type="text" class="form-control"
																		name="process.process_question_list"
																		id="process_question_list" placeholder="请填写问题数量">
																</div>
																<div class="col-md-4 process_button">
																	<button type="button" id="askproblemcommit"
																		class="btn btn-primary  btn-block btn_legal_commit"
																		onclick="problem_asking()"
																		style="width: 40%; float: right;">法制民警提交</button>
																</div>
															</div>
														</fieldset>
													</div>
												</div>
												<!-------------------------------------->
												<!-------------第5阶段 法制大队天界问题整改数量---------------->
												<div class="first_process_div col-md-12">
													<div class="first_process">
														<fieldset>
															<legend>问题清单整改</legend>
															<!--  -->
															<div class="summon_process col-md-12">
																<div class="process_title col-md-4">整改情况</div>
																<div class="process_title col-md-4"
																	id="checkbox_process_question"></div>
																<div class="col-md-4 process_button">
																	<button type="button"
																		class="btn btn-primary  btn-block btn_legal_commit" id="problemchangecommit"
																		onclick="problem_rectification()"
																		style="width: 40%; float: right;">法制民警提交</button>
																	<!-- /*id="but_process_question" -->
																</div>
															</div>
														</fieldset>
													</div>
												</div>
												<!-------------------------------------->
												<!-------------第6阶段 处罚---------------->
												<div class="first_process_div col-md-12">
													<div class="first_process" id="punishment">
														<fieldset>
															<legend>处理结果</legend>
															<!-- 处罚 -->
															<div class="summon_process col-md-12">
																<div class="process_title col-md-2"></div>
																<div class="checkbox col-md-8">
																	<label style="margin: 0 10px;"> <input
																		type="checkbox" name="process.process_detention"
																		value="是" id="process_detention"> 行政拘留
																	</label><label style="margin: 0 10px;"> <input
																		type="checkbox" name="process.process_penalty"
																		value="是" id="process_penalty"> 罚款
																	</label> <label style="margin: 0 10px;"> <!-- onclick=changeprocess_treatment_category_yes(this) -->
																		<input type="checkbox"
																		name="process.process_mandatory_abandon_drug"
																		value="是" id="process_mandatory_abandon_drug">强制隔离戒毒
																	</label> <label style="margin: 0 0px;"> <input
																		type="checkbox"
																		name="process.process_community_abandon_drug"
																		value="是" id="process_community_abandon_drug">
																		社区戒毒
																	</label> <label style="margin: 0 0px;"> <input
																		type="checkbox"
																		name="process.process_administrativ_warning" value="是"
																		id="process_administrativ_warning"> 行政警告
																	</label> <label style="margin: 0 0px;"> <input
																		type="checkbox" name="process.process_other" value="是"
																		id="process_other"> 其他
																	</label>
																</div>
																<div class="col-md-2 process_button">
																	<button type="button"
																		class="btn btn-primary  btn-block btn_police_commit"
																		onclick="punishmentab_chufa()" id="punishcommit"
																		style="width: 90%; float: right;">办案民警提交</button>
																</div>
															</div>
														</fieldset>
													</div>
												</div>
												<!-------------------------------------->
												
												<!-------------------------------------->
												<!-------------第7阶段   涉案财物入库---------------->
												<div class="first_process_div col-md-12" id="sheancaiwu">
													<div class="first_process">
														<fieldset>
															<legend>涉案财物入库</legend>
															<!--  -->
															<div class="summon_process col-md-12">
																<div class="process_title col-md-4">涉案财物入库</div>
																<div class="radio col-md-4">
																	<label style="margin: 0 10px;"> <input
																		type="radio" onclick='changecase_ruku_yes(this)'
																		name="ajdbxtProcess.process_goods_in_lib"
																		id="case_ruku_yes" value="是"> 是
																	</label><label style="margin: 0 10px;"> <input
																		type="radio" onclick='changecase_ruku_no(this)'
																		name="ajdbxtProcess.process_goods_in_lib"
																		id="case_ruku_no" value="否"> 否
																	</label>
																</div>
																<div class="col-md-4 process_button">
																	<button type="button"
																		class="btn btn-primary  btn-block btn_legal_commit"
																		onclick="case_ruku()"
																		id="btn_process_goods_in_lib_xingzheng_id"
																		style="width: 40%; float: right;">法制民警提交</button>
																</div>
															</div>

														</fieldset>
													</div>
												</div>
												<!-------------------------------------->
												
												<!-- --------------------------------------------- -->
												<!-------------第8阶段 法制大队结案---------------->
												<div class="first_process_div col-md-12">
													<div class="first_process">
														<fieldset>
															<legend>结案</legend>
															<!--  -->
															<div class="summon_process col-md-12">
																<div class="process_title col-md-4">是否结案</div>
																<div class="radio col-md-4">
																	<label style="margin: 0 10px;"> <input
																		type="radio" onclick='changecase_ending_yes(this)'
																		name="ajdbxtProcess.process_case_end"
																		id="case_ending_yes" value="是"> 是
																	</label><label style="margin: 0 10px;"> <input
																		type="radio" onclick='changecase_ending_no(this)'
																		name="ajdbxtProcess.process_case_end"
																		id="case_ending_no" value="否"> 否
																	</label>
																</div>
																<div class="col-md-4 process_button">
																	<button type="button"
																		class="btn btn-primary  btn-block btn_legal_commit"
																		onclick="case_ending()" id="caseendcommit"
																		style="width: 40%; float: right;">法制民警提交</button>
																</div>
															</div>
														</fieldset>
													</div>
												</div>
												<!-------------------------------------->
												<!-------------第9阶段 法制大队评分---------------->
												<div class="first_process_div col-md-12">
													<div class="first_process">
														<fieldset>
															<legend>案卷考核</legend>
															<!--  -->
															<div class="summon_process col-md-12">
																<div class="process_title col-md-4">案卷考核</div>
																<div class="process_title col-md-4">
																	<input type="text" class="form-control"
																		name="process.process_score" id="input_case_score"
																		placeholder="请填写案件评分">
																</div>
																<div class="col-md-4 process_button">
																	<button type="button"
																		class="btn btn-primary  btn-block btn_legal_commit"
																		onclick="case_score()" id="scorecommit"
																		style="width: 40%; float: right;">法制民警提交</button>
																</div>
															</div>
														</fieldset>
													</div>
												</div>

												<!-------------------------------------->
												<!-------------第10阶段 法制大队确认案件上交---------------->
												<div class="first_process_div col-md-12 btn_legal_commit">
													<div class="first_process">
														<fieldset>
															<legend>案卷是否上交</legend>
															<!--  -->
															<div class="summon_process col-md-12">
																<!-- <div class="process_title col-md-4">修改完成：</div> -->
																<div class="process_title col-md-4">
																	<input type="hidden" value="是"
																		id="process_file_hand_id">
																	<button id="case_xingzhen_hand_button" type="button"
																		class="btn btn-primary  btn-block btn_legal_commit"
																		onclick="process_file_hand()" style="float: center;">法制民警确认案卷上交
																	</button>
																	<span id="case_xingzhen_hand_img">法制民警确认案卷上交<img
																		alt="" src="<%=basePath%>img/select_fill.png"></span>
																</div>
															</div>
														</fieldset>
													</div>
												</div>
												<!-- 隐藏流程内容的div闭合标签 -->
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









			<!--------------------------------------------------- -------------------------------------------刑事案件----------------------------------------- -->

			<div
				style="margin: 80px 0 0 0; float: left; width: 100%; display: none;"
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
									<form action="" id="penalProcessDetails">
										<div id="administrative_process_right" class="col-md-12">

											<!-- ----------------受立案----------------------------->
											<div class="first_process_div col-md-12 div_put_on_record"
												style="display: none;">
												<div class="first_process">
													<fieldset>
														<legend>受立案</legend>
														<!--  -->
														<div class="summon_process col-md-12">
															<div class="process_title col-md-4">受立案</div>
															<div class="radio col-md-4">
																<label style="margin: 0 10px;"> <input
																	type="radio" name="ajdbxtProcess.process_put_on_record"
																	id="process_put_on_record_penal_yes" value="是">
																	是
																</label><label style="margin: 0 10px;"> <input
																	type="radio" name="ajdbxtProcess.process_put_on_record"
																	id="process_put_on_record_penal_no" value="否">
																	否
																</label>
															</div>
															<div class="col-md-4 process_button">
																<button type="button"
																	class="btn btn-primary  btn-block policemen_manager btn_police_commit "
																	onclick="process_put_on_record_penal_but()"
																	id="btn_process_put_on_record_id"
																	style="width: 40%; float: right;">办案民警提交</button>
															</div>
														</div>

													</fieldset>
												</div>
											</div>

											<!--------------------------------------------------->
											<div class="div_no_put_on_record" style="display: none;">
												<!-------------第一阶段   涉案财物入库---------------->
												<div class="first_process_div col-md-12" id="sheancaiwu">
													<div class="first_process">
														<fieldset>
															<legend>涉案财物</legend>
															<!-- 涉案财物 -->
															<div class="summon_process col-md-12" id="case_property">
																<div class="process_title col-md-4">涉案财物</div>
																<div class="radio col-md-4">
																	<label style="margin: 0 10px;"> <input
																		type="radio" name="ajdbxtProcess.process_case_goods"
																		id="penalcase_property_yes" value="是"> 有
																	</label><label style="margin: 0 10px;"> <input
																		type="radio" name="ajdbxtProcess.process_case_goods"
																		id="penalcase_property_no" value="否"> 无
																	</label>
																</div>
																<div class="col-md-4 process_button">
																	<button type="button"
																		class="btn btn-primary  btn-block policemen_manager btn_police_commit"
																		onclick="penalcase_property()"
																		id="btn_process_case_goods_id"
																		style="width: 40%; float: right;">办案民警提交</button>
																</div>
															</div>
															<!-- 涉案财物已入库 -->
															<div class="summon_process col-md-12"
																id="property_storage_div">
																<div class="process_title col-md-4">涉案财物是否入库</div>
																<div class="radio col-md-4">
																	<label style="margin: 0 10px;"> <input
																		onclick="pencalchange_goods_in_lib_yes()"
																		id="goods_in_lib_yes" type="radio"
																		name="ajdbxtProcess.process_goods_in_lib" value="是">
																		是
																	</label><label style="margin: 0 10px;"> <input
																		onclick="pencalchange_goods_in_lib_no()"
																		id="goods_in_lib_no" type="radio"
																		name="ajdbxtProcess.process_goods_in_lib" value="否">
																		否
																	</label>
																</div>
																<div class="col-md-4 process_button">
																	<button type="button" onclick="goods_in_lib()"
																		class="btn btn-primary  btn-block legal_team_manager_btn btn_legal_commit"
																		id="btn_process_goods_in_lib_id"
																		style="width: 40%; float: right;">法制民警提交</button>
																</div>
															</div>

														</fieldset>
													</div>
												</div>

												<!-------------第二阶段 传唤---------------->
												<div class="first_process_div col-md-12">
													<div class="first_process">
														<fieldset>
															<legend>传唤</legend>
															<!-- 是否传唤嫌疑人 -->
															<div class="summon_process col-md-12">
																<div class="process_title col-md-4">延长询问查证时间</div>
																<div class="radio col-md-4">
																	<label style="margin: 0 10px;"> <input
																		type="radio"
																		onclick="penalchangesuspect_summon_yes(this)"
																		value="是"
																		name="ajdbxtProcess.process_lengthen_subpoena"
																		id="penalsuspect_summon_yes"> 是
																	</label><label style="margin: 0 10px;"> <input
																		type="radio"
																		onclick="penalchangesuspect_summon_no(this)"
																		value="否"
																		name="ajdbxtProcess.process_lengthen_subpoena"
																		id="penalsuspect_summon_no"> 否
																	</label>
																</div>
																<div class="col-md-4 process_button">
																	<button type="button"
																		class="btn btn-primary  btn-block btn_police_commit"
																		id="btn_process_lengthen_subpoena_id"
																		onclick="penalsuspect_summon(this)"
																		id="btn_process_lengthen_subpoena"
																		style="width: 40%; float: right;">办案民警提交</button>
																</div>
															</div>
															<!-- 鉴定 -->
															<div class="summon_process col-md-12">
																<div class="process_title col-md-4">是否鉴定</div>
																<div class="radio col-md-4">
																	<label style="margin: 0 10px;"> <input
																		type="radio" name="ajdbxtProcess.process_authenticate"
																		id="penalidentification_yes" value="是"> 是
																	</label><label style="margin: 0 10px;"> <input
																		type="radio" name="ajdbxtProcess.process_authenticate"
																		id="penalidentification_no" value="否"> 否
																	</label>
																</div>
																<!-- <div class="col-md-4 process_title">提醒：请在4日内作出决定，5日内将鉴定意见复印件送达违法嫌疑人及被害人</div> -->
																<div class="col-md-4 process_button">
																	<button type="button"
																		class="btn btn-primary  btn-block policemen_manager btn_police_commit"
																		onclick="penalidentification()"
																		id="btn_process_authenticate_id"
																		style="width: 40%; float: right;">办案民警提交</button>
																</div>
															</div>
														</fieldset>
													</div>
												</div>

												<!-- 第三阶段  第一次强制措施 -->
												<div class="first_process_div col-md-12">
													<div class="first_process">
														<fieldset>
															<legend>强制措施 </legend>
															<div class="summon_process col-md-12"
																id="hearing_applying_div">
																<div class="radio col-md-4">
																	<label style="margin: 0 10px;"> <input
																		type="radio"
																		onclick="mandatory_measuresBtnClick_one(this); mandatory_measuresBtnClick(this) "
																		id="measure_one_one"
																		name="ajdbxtProcess.process_force_measure_one"
																		value="拘留"> 拘留
																	</label><label style="margin: 0 10px;"> <input
																		type="radio"
																		onclick="mandatory_measuresBtnClick_two(this) ;mandatory_measuresBtnClick(this)"
																		id="measure_one_two"
																		name="ajdbxtProcess.process_force_measure_one"
																		value="监视居住"> 监视居住
																	</label> <label style="margin: 0 10px;"> <input
																		type="radio"
																		onclick="mandatory_measuresBtnClick_three(this) ;mandatory_measuresBtnClick(this)"
																		id="measure_one_three"
																		name="ajdbxtProcess.process_force_measure_one"
																		value="取保候审"> 取保候审
																	</label>
																</div>
																<div class="col-md-4 process_button">
																	<button type="button"
																		class="btn btn-primary  btn-block policemen_manager btn_police_commit"
																		onclick="penalmeasure_one()"
																		id="btn_process_force_measure_one_id"
																		style="width: 40%; float: right;">办案民警提交</button>
																</div>
															</div>
														</fieldset>
													</div>
												</div>

												<!-- --------------第一次 证据上交-------------------------->
												<div class="first_process_div col-md-12">
													<div class="first_process">
														<fieldset>
															<legend>证据是否上传</legend>
															<!--  -->
															<div class="summon_process col-md-12">
																<div class="process_title col-md-4">证据上传</div>
																<div class="radio col-md-4">
																	<label style="margin: 0 10px;"> <input
																		type="radio"
																		name="ajdbxtProcess.process_evidence_to_upload_affirm"
																		onclick="change_penal_process_evidence_to_upload_yes(this)"
																		id="process_evidence_to_upload_penal_yes" value="是">
																		是
																	</label><label style="margin: 0 10px;"> <input
																		type="radio"
																		name="ajdbxtProcess.process_evidence_to_upload_affirm"
																		onclick="change_penal_process_evidence_to_upload_no(this)"
																		id="process_evidence_to_upload_penal_no" value="否">
																		否
																	</label>
																</div>
																<div class="col-md-4 process_button">
																	<button type="button"
																		class="btn btn-primary  btn-block policemen_manager btn_police_commit"
																		onclick="process_evidence_to_upload_penal_but()"
																		id="btn_process_evidence_to_upload_id"
																		style="width: 40%; float: right;">办案民警提交</button>
																</div>
															</div>

														</fieldset>
													</div>
												</div>

												<!-------------第一次  案卷上交---------------->
												<div class="first_process_div col-md-12 btn_legal_commit"
													id="process_force_measure_one_process_file_hand">
													<div class="first_process">
														<fieldset>
															<legend>案卷是否上交</legend>
															<!--  -->
															<div class="summon_process col-md-12">
																<div class="process_title col-md-4">案卷是否上交</div>
																<div class="process_title col-md-4">
																	<input type="hidden" id="process_file_hand_penal_one"
																		value="是">
																	<button type="button" onclick="pencalcasehand()"
																		id="process_file_hand_penal_one_bnt"
																		class="btn btn-primary  btn-block legal_team_manager_btn btn_legal_commit"
																		style="float: center;">法制民警确认案卷上交</button>
																	<span id="process_file_hand_penal_one_img"
																		style="display: none;">法制民警确认案卷上交<img alt=""
																		src="<%=basePath%>img/select_fill.png"></span>
																</div>
															</div>
														</fieldset>
													</div>
												</div>

												<!-------------第一次  法制大队提出问题---------------->
												<div class="first_process_div col-md-12">
													<div class="first_process">
														<fieldset>
															<legend>问题清单</legend>
															<div class="summon_process col-md-12">
																<div class="process_title col-md-4">
																	<input type="text" class="form-control"
																		name="process.process_question_list"
																		id="penalprocess_question_list"
																		placeholder="请填写问题数量">
																</div>
																<div class="col-md-4 process_button">
																	<button type="button"
																		class="btn btn-primary  btn-block legal_team_manager_btn btn_legal_commit"
																		onclick="pencalproblem_asking()"
																		id="btn_process_question_list_id"
																		style="width: 40%; float: right;">法制民警提交</button>
																</div>
															</div>
														</fieldset>
													</div>
												</div>

												<!------------- 拘留延长期限---------------->
												<div class="first_process_div col-md-12"
													 id="detention_delay_date">
													<div class="first_process">
														<fieldset>
															<legend>延长拘留期限</legend>
															<div class="summon_process col-md-12">
																<div class="process_title col-md-4">拘留延长期限</div>
																<div class="radio col-md-4">
																	<label style="margin: 0 10px;"> <input
																		onclick="pencalchangecriminal_detention_one()"
																		id="process_lengthen_criminal_detention_one"
																		type="radio"
																		name="ajdbxtProcess.process_lengthen_criminal_detention"
																		value="30"> 30
																	</label><label style="margin: 0 10px;"> <input
																		onclick="pencalchangecriminal_detention_two()"
																		id="process_lengthen_criminal_detention_two"
																		type="radio"
																		name="ajdbxtProcess.process_lengthen_criminal_detention"
																		value="7"> 7
																	</label><label style="margin: 0 10px;"> <input
																		onclick="pencalchangecriminal_detention_three()"
																		id="process_lengthen_criminal_detention_three"
																		type="radio"
																		name="ajdbxtProcess.process_lengthen_criminal_detention"
																		value="0"> 0
																	</label>
																</div>
																<div class="col-md-4 process_button">
																	<button type="button"
																		onclick="process_lengthen_criminal_detention()"
																		class="btn btn-primary  btn-block policemen_manager btn_police_commit"
																		id="btn_process_lengthen_criminal_detention_id"
																		style="width: 40%; float: right;">办案民警提交</button>
																</div>
															</div>
														</fieldset>
													</div>
												</div>
												
													<!-- ------------------------------------第一次  案卷拿回天数 案卷上交期限1-------------------------->
												<div class="first_process_div col-md-12" id="nahui_day_one"
													>
													<div class="first_process">
														<fieldset>
														<!-- 这里原来是案卷拿回期限，现改为案卷上交期限，意思是案卷拿回法制大队的期限，即上交法制大队的期限 -->
															<legend>案卷上交期限</legend>
															<div class="summon_process col-md-12">
																<div class="process_title col-md-4">
																	<input type="text" class="form-control"
																		name="process.process_fileback_day"
																		id="process_fileback_day" placeholder="请填写案卷上交天数">
																</div>
																<div class="col-md-4 process_button">
																	<button type="button"
																		class="btn btn-primary  btn-block legal_team_manager_btn btn_legal_commit"
																		onclick="penal_process_fileback_day()"
																		id="btn_process_fileback_day_id"
																		style="width: 40%; float: right;">法制民警提交</button>
																</div>
															</div>
														</fieldset>
													</div>
												</div>

												<!-- --------------------第一次案卷已拿回-------------------------- -->
												<div class="first_process_div col-md-12" id="casehand_no">
													<div class="first_process">
														<fieldset>
															<legend>案卷是否上交</legend>
															<!--  -->
															<div class="summon_process col-md-12">
																<div class="process_title col-md-4">案卷是否上交</div>
																<div class="process_title col-md-4">
																	<input type="hidden"
																		id="process_file_hand_penal_one_no" value="否">
																	<button type="button" onclick="pencalcasehand_no()"
																		id="process_file_hand_penal_one_no_bnt"
																		class="btn btn-primary  btn-block legal_team_manager_btn btn_legal_commit"
																		style="float: center;">法制民警案卷上交</button>
																	<span id="process_file_hand_penal_one_no_img"
																		style="display: none;">法制民警确认案卷上交<img alt=""
																		src="<%=basePath%>img/select_fill.png"></span>
																</div>
															</div>
														</fieldset>
													</div>
												</div>

												<!-------------第一次强制 问题整改---------------->
												<div class="first_process_div col-md-12">
													<div class="first_process">
														<fieldset>
															<legend>问题清单整改</legend>
															<!--  -->
															<div class="summon_process col-md-12">
																<div class="process_title col-md-4"
																	id="checkbox_process_question_penal_one"></div>
																<div class="col-md-4 process_button">
																	<button type="button"
																		class="btn btn-primary  btn-block legal_team_manager_btn btn_legal_commit"
																		onclick="pencalproblem_rectification()"
																		id="btn_process_question_id"
																		style="width: 40%; float: right;">法制民警提交</button>
																</div>
															</div>
														</fieldset>
													</div>
												</div>
												
			<!-----------------------------------------第二次强制措施-----------------------------------------------------------------------------------------------------  -->
					
												<!-------------第二次强制措施1 ----逮捕----------->
												<div class="first_process_div col-md-12"
													>
													<div class="first_process">
														<fieldset>
															<legend>变更强制措施（一）</legend>
															<!-- 处罚 -->
															<div class="summon_process col-md-12 " id="second_punishment">
																<!-- <div class="process_title col-md-2">第二次强制措施:</div> -->
																<div class="checkbox col-md-8"
																	id="second_punishment_content">
																	<label style="margin: 0 10px;"> <input
																		type="radio"
																		name="ajdbxtProcess.process_force_measure_two"
																		value="逮捕" id="second_punishment_one"
																		onclick="changesecond_punishmentClick_one();second_punishmentClick()">
																		逮捕
																	</label> <label style="margin: 0 10px;"><input
																		type="radio"
																		name="ajdbxtProcess.process_force_measure_two"
																		value="取保候审" id="second_punishment_two"
																		onclick="changesecond_punishmentClick_two() ;second_punishmentClick()">
																		取保候审 </label> <label style="margin: 0 10px;"><input
																		type="radio"
																		name="ajdbxtProcess.process_force_measure_two"
																		value="监视居住" id="second_punishment_three"
																		onclick="changesecond_punishmentClick_three(); second_punishmentClick()">监视居住
																	</label>
																</div>
																<div class="col-md-2 process_button">
																	<button type="button"
																		class="btn btn-primary  btn-block policemen_manager btn_police_commit"
																		onclick="second_punishment()"
																		id="btn_process_force_measure_two_detention_id"
																		style="width: 90%; float: right;">办案民警提交</button>
																</div>
															</div>
															
															<div class="summon_process col-md-12 " id="second_punishment_other"  style="display: none;">
																<!-- <div class="process_title col-md-2">第二次强制措施:</div> -->
																<div class="checkbox col-md-8"
																	id="second_punishment_content">
																	<label style="margin: 0 10px;"> <input
																		type="radio"
																		name="ajdbxtProcess.process_force_measure_two"
																		value="撤案"
																		onclick="pencalchange_cheantwo_yes();second_punishmentClick() "
																		id="chenantwo_yes"> 撤案
																	</label> <label style="margin: 0 0px;"> <input
																		type="radio"
																		name="ajdbxtProcess.process_force_measure_two"
																		value="起诉"
																		onclick="pencalchange_cheantwo_no();second_punishmentClick()"
																		id="chenantwo_no"> 起诉
																	</label> <label style="margin: 0 0px;"> <input
																		type="radio"
																		name="ajdbxtProcess.process_force_measure_two"
																		value="解保"
																		onclick="pencalchange_cheantwo_new();second_punishmentClick()"
																		id="chenantwo_new"> 解保
																	</label>
																</div>
																<div class="col-md-2 process_button">
																	<button type="button"
																		class="btn btn-primary  btn-block policemen_manager btn_police_commit"
																		onclick="chenantwo_second_punishment()"
																		id="btn_process_force_measure_two_detention_two_id"
																		style="width: 90%; float: right;">办案民警提交</button>
																</div>
															</div>
															
														</fieldset>
													</div>
												</div>
												
												<!------------------------------------案卷上交天数（第二次强制措施）---------------------------------->
												<div class="first_process_div col-md-12" id="shangjiao_ju"
													>
													<div class="first_process">
														<fieldset>
															<legend>案卷上交期限</legend>
															<div class="summon_process col-md-12">
																<div class="process_title col-md-4">
																	<input type="text" class="form-control"
																		name="process.process_fileup_day"
																		id="process_fileup_day_juliu" placeholder="请填写案卷上交期限">
																</div>
																<div class="col-md-4 process_button">
																	<button type="button"
																		onclick="penal_process_fileup_day_juliu()"
																		class="btn btn-primary  btn-block legal_team_manager_btn btn_legal_commit"
																		id="btn_process_fileup_day_catch_id"
																		style="width: 40%; float: right;">法制民警提交</button>
																</div>
															</div>
														</fieldset>
													</div>
												</div>
												<!--  -->
												
												<!-- ------------------------------------------第二次 案卷已上交------------------------------------------------------>
													<div class="first_process_div col-md-12"
														id="twocase_hand_juliu">
														<div class="first_process">
															<fieldset>
																<legend>案卷是否上交</legend>
																<!--  -->
																<div class="summon_process col-md-12">
																	<div class="process_title col-md-4">案卷是否上交</div>
																	<div class="process_title col-md-4">
																		<input type="hidden"
																			id="process_file_hand_two_penal_two" value="是">
																		<button type="button"
																			onclick="process_file_hand_two_but()"
																			id="process_file_hand_two_penal_two_bnt"
																			class="btn btn-primary  btn-block legal_team_manager_btn btn_legal_commit"
																			style="float: center;">法制民警确认案卷上交</button>
																		<span id="process_file_hand_two_penal_two_img"
																			style="display: none;">法制民警确认案卷上交<img alt=""
																			src="<%=basePath%>img/select_fill.png"></span>
																	</div>
																</div>
															</fieldset>
														</div>
													</div>
													
												<!--------------------------------------------------->
												<!-- -----------------------第二次 法制大队提出问题--------------------------------->
												<div class="first_process_div col-md-12" id="tichu_two">
													<div class="first_process">
														<fieldset>
															<legend>问题清单</legend>
															<div class="summon_process col-md-12">
																<div class="process_title col-md-4">
																	<input type="text" class="form-control"
																		name="process.process_question_list_two"
																		id="process_question_list_two" placeholder="请填写问题数量">
																</div>
																<div class="col-md-4 process_button">
																	<button type="button"
																		class="btn btn-primary  btn-block legal_team_manager_btn btn_legal_commit"
																		onclick="process_question_list_two_asking()"
																		id="btn_process_question_list_two_id"
																		style="width: 40%; float: right;">法制民警提交</button>
																</div>
															</div>
														</fieldset>
													</div>
												</div>
												
												<!-- -------------------------------第二次 案卷拿回天数--------------------------->
												<div class="first_process_div col-md-12 btn_legal_commit"
													id="nahui_day_two">
													<div class="first_process">
													<!--同上面的案卷拿回  -->
														<fieldset>
															<legend>案卷上交期限</legend>
															<div class="summon_process col-md-12">
																<div class="process_title col-md-4">
																	<input type="text" class="form-control"
																		name="process.process_fileback_day_two"
																		id="process_fileback_day_two" placeholder="请填写案卷上交天数">
																</div>
																<div class="col-md-4 process_button">
																	<button type="button"
																		onclick="penal_process_fileback_day_two()"
																		class="btn btn-primary  btn-block legal_team_manager_btn btn_legal_commit"
																		id="btn_process_fileback_day_two_id"
																		style="width: 40%; float: right;">法制民警提交</button>
																</div>
															</div>
														</fieldset>
													</div>
												</div>
												<!-------------------------------------------------------------------------------->
												<!-- ----------------------------------------第二次 案卷已拿回------ -->
												<div class="first_process_div col-md-12"
													id="casehand_two_no">
													<div class="first_process">
														<fieldset>
															<legend>案卷是否上交</legend>
															<!--  -->
															<div class="summon_process col-md-12">
																<div class="process_title col-md-4">案卷是否上交</div>
																<div class="process_title col-md-4">
																	<input type="hidden"
																		id="process_file_hand_penal_two_no" value="否">
																	<button type="button"
																		onclick="process_file_hand_two_nahui_nut()"
																		id="process_file_hand_penal_two_no_bnt"
																		class="btn btn-primary  btn-block legal_team_manager_btn btn_legal_commit"
																		style="float: center;display: none;">法制民警确认案卷上交</button>
																	<span id="process_file_hand_penal_two_no_img"
																		style="display: none;">法制民警确认案卷上交<img alt=""
																		src="<%=basePath%>img/select_fill.png"></span>
																</div>
															</div>
														</fieldset>
													</div>
												</div>
												
													<!-- ------------------------第二次法制大队问题整改---------------------------------->
												<div class="first_process_div col-md-12" id="zhengai_two">
													<div class="first_process">
														<fieldset>
															<legend>问题清单整改</legend>
															<!--  -->
															<div class="summon_process col-md-12">
																<!-- <div class="process_title col-md-4">问题整改：</div>	 -->
																<div class="process_title col-md-4"
																	id="checkbox_process_question_penal_two"></div>
																<div class="col-md-4 process_button">
																	<button type="button"
																		class="btn btn-primary  btn-block legal_team_manager_btn btn_legal_commit"
																		onclick="pencalproblem_rectification_two()"
																		id="btn_process_question_two_id"
																		style="width: 40%; float: right;">法制民警提交</button>
																</div>
															</div>
														</fieldset>
													</div>
												</div>
												
												
											
												<!-- -------------------------------------------------------------------------------->
												<!------------- 第三次强制措施----上一次为逮捕-------->
												<div class="first_process_div col-md-12" id="third_punishment"
													 style="display: none;">
													<div class="first_process">
														<fieldset>
															<legend>变更强制措施（二）</legend>
															<!-- 处罚 -->
															<div class="summon_process col-md-12 " id="third_punishment">
																<div class="checkbox col-md-8"
																	id="third_punishment_value">
																	<label style="margin: 0 10px;"> <input
																		type="radio"
																		name="ajdbxtProcess.process_force_measure_three"
																		value="取保候审"
																		onclick="pencalchangequbaothree_yes() ;third_punishmentClick()"
																		id="qubaothree_yes"> 取保候审
																	</label> <label style="margin: 0 10px;"><input
																		type="radio"
																		name="ajdbxtProcess.process_force_measure_three"
																		value="起诉"
																		onclick="pencalchangequbaothree_no() ;third_punishmentClick()"
																		id="qubaothree_no"> 起诉 </label>
																</div>
																<div class="col-md-2 process_button">
																	<button type="button" onclick="third_punishment()"
																		class="btn btn-primary  btn-block policemen_manager btn_police_commit"
																		id="btn_process_force_measure_three_arrest_id"
																		style="width: 90%; float: right;">办案民警提交</button>
																</div>
															</div>
														</fieldset>
													</div>
												</div>
												
												<!-- --------------第二次  证据上交 第二次强制措施为”取保/监视“-------------------------->
												<div class="first_process_div col-md-12" id="qubao_zhenju_two" style="display: none">
													<div class="first_process">
														<fieldset>
															<legend>证据上传是否齐全</legend>
															<!--  -->
															<div class="summon_process col-md-12">
																<!-- <div class="process_title col-md-4">证据上传</div> -->
																<div class="radio col-md-4">
																	<label style="margin: 0 10px;"> <input
																		type="radio"
																		name="ajdbxtProcess.process_evidence_to_upload_two_affirm"
																		onclick="change_penal_process_evidence_to_upload_two_yes_two(this)"
																		id="qubao_process_evidence_to_upload_two_penal_two_yes"
																		value="是"> 是
																	</label><label style="margin: 0 10px;"> <input
																		type="radio"
																		name="ajdbxtProcess.process_evidence_to_upload_two"
																		onclick="change_penal_process_evidence_to_upload_two_no_two(this)"
																		id="qubao_process_evidence_to_upload_two_penal_two_no"
																		value="否"> 否
																	</label>
																</div>
																<div class="col-md-4 process_button">
																	<button type="button"
																		class="btn btn-primary  btn-block policemen_manager btn_police_commit"
																		onclick="process_evidence_to_upload_two_two()"
																		id="btn_qubao_process_evidence_to_upload_two_id"
																		style="width: 40%; float: right;">办案民警提交</button>
																</div>
															</div>

														</fieldset>
													</div>
												</div>
												
												<!-- ------------------------------第三次强制2 ---上一次取保/监视------------------------------------- -->
												<div class="first_process_div col-md-12"
													id="qubao_third_punishment" style="display: none;">
													<div class="first_process">
														<fieldset>
															<legend>变更强制措施（二）</legend>
															<!-- 处罚 -->
															<div class="summon_process col-md-12 ">
																<!-- <div class="process_title col-md-2">第三次强制措施:</div> -->
																<div class="checkbox col-md-8"
																	id="third_punishment_value">
																	<label style="margin: 0 10px;"> <input
																		type="radio"
																		name="ajdbxtProcess.process_force_measure_three"
																		value="撤案"
																		onclick="pencalchangecheanthree_yes() ;third_punishmentClick()"
																		id="cheanthree_yes"> 撤案
																	</label> <label style="margin: 0 0px;"> <input
																		type="radio"
																		name="ajdbxtProcess.process_force_measure_three"
																		value="起诉"
																		onclick="pencalchangecheanthree_no() ;third_punishmentClick()"
																		id="cheanthree_no"> 起诉
																	</label> <label style="margin: 0 0px;"> <input
																		type="radio"
																		name="ajdbxtProcess.process_force_measure_three"
																		value="解保"
																		onclick="pencalchangecheanthree_new() ;third_punishmentClick()"
																		id="cheanthree_new"> 解保
																	</label>
																</div>
																<div class="col-md-2 process_button">
																	<button type="button"
																		onclick="qubao_third_punishment()"
																		class="btn btn-primary  btn-block policemen_manager btn_police_commit"
																		id="btn_process_force_measure_three_id"
																		style="width: 90%; float: right;">办案民警提交</button>
																</div>
															</div>
														</fieldset>
													</div>
												</div>
												
												<!-- --------------第二次  证据上交，第二次强制措施为逮捕-------------------------->
												<div class="first_process_div col-md-12" id="zhenju_two" style="display: none">
													<div class="first_process">
														<fieldset>
															<legend>证据上传是否齐全</legend>
															<!--  -->
															<div class="summon_process col-md-12">
																<!-- <div class="process_title col-md-4">证据上传</div> -->
																<div class="radio col-md-4">
																	<label style="margin: 0 10px;"> <input
																		type="radio"
																		name="ajdbxtProcess.process_evidence_to_upload_two_affirm"
																		onclick="change_penal_process_evidence_to_upload_two_yes_two(this)"
																		id="process_evidence_to_upload_two_penal_two_yes"
																		value="是"> 是
																	</label><label style="margin: 0 10px;"> <input
																		type="radio"
																		name="ajdbxtProcess.process_evidence_to_upload_two"
																		onclick="change_penal_process_evidence_to_upload_two_no_two(this)"
																		id="process_evidence_to_upload_two_penal_two_no"
																		value="否"> 否
																	</label>
																</div>
																<div class="col-md-4 process_button">
																	<button type="button"
																		class="btn btn-primary  btn-block policemen_manager btn_police_commit"
																		onclick="process_evidence_to_upload_two_two()"
																		id="btn_process_evidence_to_upload_two_id"
																		style="width: 40%; float: right;">办案民警提交</button>
																</div>
															</div>

														</fieldset>
													</div>
												</div>
												
												<!-------------------------------------->
												<!------------- 第四次强制措施------取保候审---------->
												<div class="first_process_div col-md-12"
													id="fourth_punishment" style="display: none;">
													<div class="first_process">
														<fieldset>
															<legend>变更强制措施（三）</legend>
															<!-- 处罚 -->
															<div class="summon_process col-md-12 ">
																<!-- <div class="process_title col-md-2">第四次强制措施:</div> -->
																<div class="checkbox col-md-8"
																	id="fourth_punishment_value">
																	<label style="margin: 0 10px;"> <input
																		type="radio"
																		name="ajdbxtProcess.process_force_measure_four"
																		value="撤案"
																		onclick="pencalchangechenfour_yes() ;four_punishmentClick()"
																		id="cheanfour_yes"> 撤案
																	</label> <label style="margin: 0 0px;"> <input
																		type="radio"
																		name="ajdbxtProcess.process_force_measure_four"
																		value="起诉"
																		onclick="pencalchangechenfour_no() ;four_punishmentClick()"
																		id="chenanfour_no"> 起诉
																	</label> <label style="margin: 0 0px;"> <input
																		type="radio"
																		name="ajdbxtProcess.process_force_measure_four"
																		value="解保"
																		onclick="pencalchangechenfour_new() ;four_punishmentClick()"
																		id="chenanfour_new"> 解保
																	</label>
																</div>
																<div class="col-md-2 process_button">
																	<button type="button" onclick="fourth_punishment()"
																		class="btn btn-primary  btn-block policemen_manager btn_police_commit"
																		id="btn_process_force_measure_four_id"
																		style="width: 90%; float: right;">办案民警提交</button>
																</div>
															</div>
														</fieldset>
													</div>
												</div>
												<!--------------------------------------------------->
												<!-------------------------------------->
												<!-------------第十阶段   补查---------------->
												<div class="first_process_div col-md-12"
													id="supplement_check" style="display: none;">
													<div class="first_process">
														<fieldset>
															<!-- <legend>补查</legend> -->
															<div class="summon_process col-md-12" id="checkOne"
																style="display: none;">
																<div class="process_title col-md-4">补充侦查</div>
																<div class="radio col-md-4" id="checkOne_value">
																	<label style="margin: 0 10px;"> <input
																		type="radio"
																		name="ajdbxtProcess.process_search_result_one"
																		value="是"
																		onclick="pencalchangecheckone_yes() ;checkOne_Click()"
																		id="checkone_yes"> 是
																	</label> <label style="margin: 0 10px;"> <input
																		type="radio"
																		name="ajdbxtProcess.process_search_result_one"
																		value="否"
																		onclick="pencalchangecheckone_no() ;checkOne_Click()"
																		id="checkedone_no"> 否
																	</label>
																</div>
																<div class="col-md-4 process_button">
																	<button type="button" onclick="checkOne()"
																		class="btn btn-primary  btn-block policemen_manager btn_police_commit"
																		id="btn_process_search_result_one_id"
																		style="width: 40%; float: right;">办案民警提交</button>
																</div>
															</div>
															<!--  -->
															<div class="summon_process col-md-12" id="checkTwo"
																style="display: none;">
																<div class="process_title col-md-4">补充侦查</div>
																<div class="radio col-md-4" id="checkTwo_value">
																	<label style="margin: 0 10px;"> <input
																		type="radio"
																		name="ajdbxtProcess.process_search_result_two"
																		value="是" onclick="pencalchangechecktwo_yes()"
																		id="checktwo_yes"> 是
																	</label> <label style="margin: 0 10px;"> <input
																		type="radio"
																		name="ajdbxtProcess.process_search_result_two"
																		value="否" onclick="pencalchangechecktwo_no()"
																		id="checkedtwo_no"> 否
																	</label>
																</div>
																<div class="col-md-4 process_button">
																	<button type="button" onclick="checkTwo()"
																		class="btn btn-primary  btn-block policemen_manager btn_police_commit"
																		id="btn_process_search_result_two_id"
																		style="width: 40%; float: right;">办案民警提交</button>
																</div>
															</div>

														</fieldset>
													</div>
												</div>
												<!-------------------------------------->
												<!-------------第十一阶段 法制大队结案---------------->
												<div class="first_process_div col-md-12">
													<div class="first_process">
														<fieldset>
															<legend>结案</legend>
															<!--  -->
															<div class="summon_process col-md-12">
																<div class="process_title col-md-4">结案</div>
																<div class="radio col-md-4">
																	<label style="margin: 0 10px;"> <input
																		type="radio" name="ajdbxtProcess.process_case_end"
																		onclick='pencalchangecase_ending_yes(this)'
																		id="pencalcase_ending_yes" value="是"> 是
																	</label><label style="margin: 0 10px;"> <input
																		type="radio" name="ajdbxtProcess.process_case_end"
																		onclick='pencalchangecase_ending_no(this)'
																		id="pencalcase_ending_no" value="否"> 否
																	</label>
																</div>
																<div class="col-md-4 process_button">
																	<button type="button"
																		class="btn btn-primary  btn-block policemen_manager btn_legal_commit"
																		onclick="pencalcase_ending()"
																		id="btn_process_case_end_id"
																		style="width: 40%; float: right;">法制民警提交</button>
																</div>
															</div>

														</fieldset>
													</div>
												</div>
												<!-------------------------------------->
												<!-------------第十二阶段 法制大队评分---------------->
												<div class="first_process_div col-md-12">
													<div class="first_process">
														<fieldset>
															<legend>案件考核</legend>
															<!--  -->
															<div class="summon_process col-md-12">
																<!-- <div class="process_title col-md-4">案件评分：</div> -->
																<div class="process_title col-md-4">
																	<input type="text" class="form-control"
																		id="pencalinput_case_score"
																		name="process.process_score" placeholder="请填写案件评分">
																</div>
																<div class="col-md-4 process_button">
																	<button type="button"
																		class="btn btn-primary  btn-block legal_team_manager_btn btn_legal_commit"
																		onclick="pencalcase_score()"
																		id="btn_process_score_xingshi_id"
																		style="width: 40%; float: right;">法制民警提交</button>
																</div>
															</div>
														</fieldset>
													</div>
												</div>

												<!-------------------------------------->
												<!-------------第十三阶段 附卷上交---------------->
												<div class="first_process_div col-md-12 btn_legal_commit"
													id="process_casefile_auxiliary">
													<div class="first_process">
														<fieldset>
															<legend>附卷上交</legend>

															<div class="summon_process col-md-12">
																<div class="process_title col-md-4">附卷上交</div>
																<div class="process_title col-md-4">
																	<input type="hidden" id="process_casefile_auxiliary_id"
																		value="是">
																	<button type="button"
																		onclick="process_casefile_auxiliary_bnt()"
																		id="process_casefile_auxiliary_id_bnt"
																		class="btn btn-primary  btn-block legal_team_manager_btn"
																		style="float: center;">法制民警确认附卷上交</button>
																	<span id="process_casefile_auxiliary_id_img"
																		style="display: none;">法制民警确认附卷上交<img alt=""
																		src="<%=basePath%>img/select_fill.png"></span>
																</div>
															</div>
														</fieldset>
													</div>
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
		</div>
	</div>

	<script type="text/javascript">
		/* $(bnt).attr("style","display:block;");   */
		$(".btn").hide();
	</script>

	<script type="text/javascript"
		src="<%=basePath%>js/Info/CaseDetails.js"></script>
	<%-- 	<script type="text/javascript" --%>
	<%-- 		src="<%=basePath%>js/Process/penalCaseDetails.js"> --%>
	<%-- 	<script type="text/javascript" --%>
	<%-- 		src="<%=basePath%>js/Process/processDetails.js"></script> --%>
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
</html>