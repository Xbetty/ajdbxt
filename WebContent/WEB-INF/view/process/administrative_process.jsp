<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html PUBLIC "-//W4C//DTD HTML 4.01 Transitional//EN" "http://www.w4.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>行政案件流程</title>
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
	<div style="margin: 80px 0 0 0; float: left; width: 100%;">
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
						<div id="administrative_process_left" class="col-md-4"></div>
							<!-- 右边 -->
							<div id="administrative_process_right" class="col-md-8">
							<!-- 	<div id="administrative_process_right" class="col-md-12"> -->
								<!-------------------------------------->
								<!-------------第一阶段 传唤---------------->
								<div class="first_process_div col-md-12">
									<div class="first_process">
										<fieldset>
											<legend>传唤</legend>
											<!-- 是否传唤嫌疑人 -->
											<div class="summon_process col-md-12">
												<div class="process_title col-md-4">已传唤嫌疑人：</div>
												<div class="radio col-md-4">
													<label style="margin: 0 10px;"> <input type="radio"
														name="suspect_summon" id="suspect_summon_yes" value="">
														是
													</label><label style="margin: 0 10px;"> <input type="radio"
														name="suspect_summon" id="suspect_summon_no" value="">
														否
													</label>
												</div>
												<div class="col-md-4 process_button">
													<button type="button" class="btn btn-primary  btn-block"
														style="width: 40%; float: right;">提交</button>
												</div>
											</div>
											<!-- 询问未成年人 -->
											<div class="summon_process col-md-12">
												<div class="process_title col-md-4">询问未成年人：</div>
												<div class="radio col-md-4">
													<label style="margin: 0 10px;"> <input type="radio"
														name="minors_asking" id="minors_asking_yes" value="">
														是
													</label><label style="margin: 0 10px;"> <input type="radio"
														name="minors_asking" id="minors_asking_no" value="">
														否
													</label>
												</div>
												<div class="col-md-4 process_button">
													<button type="button" class="btn btn-primary  btn-block"
														style="width: 40%; float: right;">提交</button>
												</div>
												<!-- <div class="col-md-4 process_title">提醒：通知监护人到场</div> -->
											</div>

											<!-- 鉴定 -->
											<div class="summon_process col-md-12">
												<div class="process_title col-md-4">鉴定：</div>
												<div class="radio col-md-4">
													<label style="margin: 0 10px;"> <input type="radio"
														name="identification" id="identification_yes" value="">
														是
													</label><label style="margin: 0 10px;"> <input type="radio"
														name="identification" id="identification_no" value="">
														否
													</label>
												</div>
												<!-- <div class="col-md-4 process_title">提醒：请在4日内作出决定，5日内将鉴定意见复印件送达违法嫌疑人及被害人</div> -->
												<div class="col-md-4 process_button">
													<button type="button" class="btn btn-primary  btn-block"
														style="width: 40%; float: right;">提交</button>
												</div>
											</div>

											<!-- 涉案财物 -->
											<div class="summon_process col-md-12">
												<div class="process_title col-md-4">涉案财物：</div>
												<div class="radio col-md-4">
													<label style="margin: 0 10px;"> <input type="radio"
														name="case_property" id="case_property_yes" value="case_property_yes">
														有
													</label><label style="margin: 0 10px;"> <input type="radio"
														name="case_property" id="case_property_no" value="case_property_no">
														无
													</label>
												</div>
												<div class="col-md-4 process_button">
													<button type="button" class="btn btn-primary  btn-block"
														style="width: 40%; float: right;" onclick="case_propertyBtnClick(this)">提交</button>
												</div>
											</div>

											<!-- 涉案财物已入库 -->
											<div id="property_storage_div" class="summon_process col-md-12" style="display:none;">
												<div class="process_title col-md-4">涉案财物已入库：</div>
												<div class="radio col-md-4">
													<label style="margin: 0 10px;"> <input type="radio"
														name="property_storage" id="property_storage_yes" value="">
														是
													</label><label style="margin: 0 10px;"> <input type="radio"
														name="property_storage" id="property_storage_no" value="">
														否
													</label>
												</div>
												<div class="col-md-4 process_button">
													<button type="button" class="btn btn-primary  btn-block"
														style="width: 40%; float: right;">提交</button>
												</div>
											</div>

										</fieldset>
									</div>
								</div>
								<!-- ------------------------ -->
								<!-- 第二阶段    处罚-->
								<div class="first_process_div col-md-12">
									<div class="first_process">
										<fieldset>
											<legend>处罚</legend>
											<!-- 处罚 -->
											<div class="summon_process col-md-12">
												<div class="process_title col-md-2">处罚:</div>
												<div class="checkbox col-md-8" >
													<label style="margin: 0 10px;"> <input
														type="checkbox" name="punishment" value=""> 行政拘留
													</label><label style="margin: 0 10px;"> <input
														type="checkbox" name="punishment" value=""> 罚款
													</label> <label style="margin: 0 10px;"> <input
														type="checkbox" name="punishment" value="">强制隔离戒毒
													</label><label style="margin: 0 10px;"> <input
														type="checkbox" name="punishment" value=""> 社区戒毒
													</label>
												</div>
												<div class="col-md-2 process_button">
													<button type="button" class="btn btn-primary  btn-block" 
														style="width: 90%; float: right;">提交</button>
												</div>
											</div>
											<!-- 处罚已通知 -->
											<div class="summon_process col-md-12">
												<div class="process_title col-md-4">处罚已通知：</div>
												<div class="radio col-md-4">
													<label style="margin: 0 10px;"> <input type="radio"
														name="punishment_notice" id="punishment_notice_yes" value="">
														是
													</label><label style="margin: 0 10px;"> <input type="radio"
														name="punishment_notice" id="punishment_notice_no" value="">
														否
													</label>
												</div>
												<div class="col-md-4 process_button">
													<button type="button" class="btn btn-primary  btn-block"
														style="width: 40%; float: right;">提交</button>
												</div>
											</div>


										</fieldset>
									</div>
								</div>

								<!-------------------------------------->
								<!-------------第三阶段 听证---------------->
								<div class="first_process_div col-md-12">
									<div class="first_process">
										<fieldset>
											<legend>听证</legend>
											<!-- 听证申请-->
											<div class="summon_process col-md-12" id="hearing_applying_div">
												<div class="process_title col-md-4">听证申请：</div>
												<div class="radio col-md-4">
													<label style="margin: 0 10px;"> <input type="radio"
														name="hearing_applying" id="hearing_applying_yes" value="hearing_applying_yes">
														是
													</label><label style="margin: 0 10px;"> <input type="radio"
														name="hearing_applying" id="hearing_applying_no" value="hearing_applying_no">
														否
													</label>
												</div>
												<div class="col-md-4 process_button">
													<button type="button" class="btn btn-primary  btn-block"
														style="width: 40%; float: right;" onclick="hearing_applyingBtnClick(this)">提交</button>
												</div>
											</div>
											<!-- 受理听证-->
											<div class="summon_process col-md-12" id="hearing_accepting_div"  style="display:none;">
												<div class="process_title col-md-4">受理听证：</div>
												<div class="radio col-md-4">
													<label style="margin: 0 10px;"> <input type="radio"
														name="hearing_accepting" id="hearing_accepting_yes"
														value="hearing_accepting_yes"> 是
													</label><label style="margin: 0 10px;"> <input type="radio"
														name="hearing_accepting" id="hearing_accepting_no" value="hearing_accepting_no">
														否
													</label>
												</div>
												<div class="col-md-4 process_button">
													<button type="button" class="btn btn-primary  btn-block"
														style="width: 40%; float: right;" onclick="hearing_acceptingBtnClick(this)">提交</button>
												</div>
											</div>
											<!-- 听证举行-->
											<div class="summon_process col-md-12" id="hearing_holding_div" style="display:none;">
												<div class="process_title col-md-4">听证举行：</div>
												<div class="radio col-md-4">
													<label style="margin: 0 10px;"> <input type="radio"
														name="hearing_holding" id="hearing_holding_yes" value="hearing_holding_yes">
														是
													</label><label style="margin: 0 10px;"> <input type="radio"
														name="hearing_holding" id="hearing_holding_no" value="hearing_holding_no">
														否
													</label>
												</div>
												<div class="col-md-4 process_button">
													<button type="button" class="btn btn-primary  btn-block"
														style="width: 40%; float: right;" >提交</button>
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
												<div class="radio col-md-4">
													<label style="margin: 0 10px;"> <input type="radio"
														name="problem_asking" id="problem_asking_yes" value="">
														是
													</label><label style="margin: 0 10px;"> <input type="radio"
														name="problem_asking" id="problem_asking_no" value="">
														否
													</label>
												</div>
												<div class="col-md-4 process_button">
													<button type="button" class="btn btn-primary  btn-block"
														style="width: 40%; float: right;">提交</button>
												</div>
											</div>
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
													<label style="margin: 0 10px;"> <input type="radio"
														name="case_review" id="case_review_yes" value=""> 是
													</label><label style="margin: 0 10px;"> <input type="radio"
														name="case_review" id="case_review_no" value=""> 否
													</label>
												</div>
												<div class="col-md-4 process_button">
													<button type="button" class="btn btn-primary  btn-block"
														style="width: 40%; float: right;">提交</button>
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
												<div class="radio col-md-4">
													<label style="margin: 0 10px;"> <input type="radio"
														name="problem_rectification" id="problem_rectification_yes"
														value=""> 是
													</label><label style="margin: 0 10px;"> <input type="radio"
														name="problem_rectification" id="problem_rectification_no"
														value=""> 否
													</label>
												</div>
												<div class="col-md-4 process_button">
													<button type="button" class="btn btn-primary  btn-block"
														style="width: 40%; float: right;">提交</button>
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
														id="input_case_score" placeholder="请填写案件评分">
												</div>
												<div class="col-md-4 process_button">
													<button type="button" class="btn btn-primary  btn-block"
														style="width: 40%; float: right;">提交</button>
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
													<label style="margin: 0 10px;"> <input type="radio"
														name="case_ending" id="case_ending_yes" value=""> 是
													</label><label style="margin: 0 10px;"> <input type="radio"
														name="case_ending" id="case_ending_no" value=""> 否
													</label>
												</div>
												<div class="col-md-4 process_button">
													<button type="button" class="btn btn-primary  btn-block"
														style="width: 40%; float: right;">提交</button>
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
											<legend>案件上交</legend>
											<!--  -->
											<div class="summon_process col-md-12">
												<div class="process_title col-md-4">案件上交：</div>
												<div class="process_title col-md-4">
													<button type="button" class="btn btn-primary  btn-block"
														style="float: center;">上交案件</button>
												</div>

											</div>
										</fieldset>
									</div>
								</div>
								
								
							</div>
							<!-- administrative_process_right  -->
						</div>
						<!-- panel-body -->
					</div>
				</div>

			</div>
		</div>
	</div>

	<script type="text/javascript"
		src="<%=basePath%>js/Process/administrativeProcess.js"></script>
</body>
</html>