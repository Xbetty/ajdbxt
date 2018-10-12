<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!doctype html>
<html>

<head>
<meta charset="UTF-8">
<title></title>
<meta name="viewport"
	content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
<style>
.index_nav {
	background-color: #007aff;
	color: white;
	font-size: 15px;
}

.index_nav h1, .index_nav a {
	color: white;
}

.mui-input-row select, .mui-input-row input {
	font-size: 14px;
}

ul {
	list-style: none;
}

ul li {
	float: left;
}
</style>
</head>

<body>
	<s:action name="User_mobile_navbar" namespace="/user"
		executeResult="true" />
		<!-- 刷新按钮 -->
	<div class="mui-icon mui-icon-reload"
		style="position: fixed; top: 10px; right: 20px; font-weight: bold; color: white; z-index: 9999999;"
		onclick="window.location.reload();"></div>
	<header class="mui-bar mui-bar-nav index_nav">
		<a id="tory_a"
			class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">案件流程信息</h1>
	</header>
	<!-- ---------------------------行政案件------------------------------------>
	<div class="mui-content mui-hidden" id="xingzhen_case">
		<div class="mui-card" style="margin: 0px;">
			<!--页眉，放置标题-->
			<!--	<div class="mui-card-header">页眉</div>-->
			<!--内容区-->
			<!-------------第一阶段 传唤---------------->
			<div class="mui-card-content">
				<form id="processDetails">
					<!-- ------------------------ -->

					<div class="mui-card mui-h5 div_put_on_record"
						style="display: none;">
						立案
						<div class="mui-card-header">
							<label class=" mui-h5">立案</label>
							<div class="mui-input-row mui-radio">
								<label class=" mui-h5">是</label> <input type="radio"
									onclick="changeregister_yes(this)"
									name="ajdbxtProcess.process_put_on_record" id="register_yes"
									value="是">
							</div>
							<div class="mui-input-row mui-radio">
								<label class=" mui-h5">否</label> <input
									onclick="changeregister_no(this)" value="否"
									name="ajdbxtProcess.process_put_on_record" id="register_no"
									type="radio">
							</div>
							<button type="button"
								class="mui-btn mui-btn-primary btn_police_commit"
								style="line-height: 10px;" onclick="register()">办案民警提交</button>

						</div>
					</div>
					<!-- --------------------------------- -->
					<div class="div_no_put_on_record" style="display: none;">
						<div class="mui-card mui-h5">
							传唤
							<!-- 是否传唤嫌疑人 -->
							<div class="mui-card-header">
								<label class=" mui-h5">延长询问查证时间</label>
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">是</label> <input type="radio"
										name="ajdbxtProcess.process_lengthen_subpoena"
										onclick='changesuspect_summon_yes(this)' id="suspect_summon_yes">
								</div>
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">否</label> <input
										name="ajdbxtProcess.process_lengthen_subpoena"
										onclick='changesuspect_summon_no(this)' id="suspect_summon_no"
										type="radio">
								</div>
								<button type="button"
									class="mui-btn mui-btn-primary btn_police_commit"
									id="commitsuspect" style="line-height: 10px;"
									onclick="suspect_summon(this)">办案民警提交</button>
							</div>

							<div class="mui-card-header">
								<label class=" mui-h5">是否鉴定</label>
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">是</label> <input type="radio"
										onclick='changeidentification_yes(this)'
										name="ajdbxtProcess.process_authenticate"
										id="identification_yes"
										value="是">
								</div>
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">否</label> <input
										onclick='changeidentification_no(this)'
										name="ajdbxtProcess.process_authenticate"
										value="否"
										id="identification_no" type="radio">
								</div>
								<button type="button"
									class="mui-btn mui-btn-primary btn_police_commit"
									style="line-height: 10px;" id="submitidentify"
									onclick="identification()">办案民警提交</button>
							</div>
							<!-- 涉案财物 -->
							<div class="mui-card-header">
								<label class=" mui-h5">涉案财物</label>
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">有</label> <input type="radio"
										onclick='changecase_property_yes(this)'
										value="是"
										name="ajdbxtProcess.process_case_goods" id="case_property_yes">
								</div>
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">无</label> <input
										onclick='changecase_property_no(this)'
										value="否"
										name="ajdbxtProcess.process_case_goods" id="case_property_no"
										type="radio">
								</div>
								<button type="button"
									class="mui-btn mui-btn-primary btn_police_commit"
									id="submitcasegoods" style="line-height: 10px;"
									onclick="case_property()">办案民警提交</button>
							</div>
						</div>
						
						<!-------------第7阶段   所队长 审核---------------->
						<div class="mui-card mui-h5">
							所队长审核
							<div class="mui-card-header">
								<!-- <label class=" mui-h5">是否审核</label> -->
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">是</label> <input type="radio"
										onclick='changecase_review_yes(this)'
										value="是"
										name="ajdbxtProcess.process_captain_check"
										id="case_review_yes">
								</div>
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">否</label> <input
										onclick='changecase_review_no(this)'
										value="否"
										name="ajdbxtProcess.process_captain_check" id="case_review_no"
										type="radio">
								</div>
								<button type="button" id="captaincommit"
									class="mui-btn mui-btn-primary btn_cap_commit"
									style="line-height: 10px;" onclick="case_review()">所队长提交</button>
							</div>
						</div>

						<!-- ------------------------ -->
						<!-- 第二阶段   听证 -->
						<div class="mui-card mui-h5">
							听证
							<!-- 听证申请-->
							<div class="mui-card-header">
								<!-- <label class=" mui-h5">听证申请</label> -->
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">是</label> <input type="radio"
										onclick='changehearing_applying_yes(this)'
										value="是"
										name="ajdbxtProcess.process_apply_right"
										id="hearing_applying_yes">
								</div>
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">否</label> <input
										onclick='changehearing_applying_no(this)'
										value="否"
										name="ajdbxtProcess.process_apply_right"
										id="hearing_applying_no" type="radio">
								</div>
								<button type="button"
									class="mui-btn mui-btn-primary btn_police_commit"
									style="line-height: 10px;" id="submithearing"
									onclick="hearing_applying()">办案民警提交</button>
							</div>
						</div>
						
						<!-- ---------------------证据上传--------------------------------->
						<div class="mui-card mui-h5">
							证据上传
							<div class="mui-card-header">
								<!-- <label class=" mui-h5">证据上传</label> -->
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">是</label> <input type="radio"
										onclick='changeevidence_yes(this)'
										name="ajdbxtProcess.process_evidence_to_upload_affirm"
										id="evidence_yes" value="是">
								</div>
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">否</label> <input
										onclick='changeevidence_no(this)'
										name="ajdbxtProcess.process_evidence_to_upload_affirm"
										id="evidence_no" value="否" type="radio">
								</div>
								<button type="button" id="evidencecommit"
									class="mui-btn mui-btn-primary btn_police_commit"
									style="line-height: 10px;" onclick="case_evidence()">办案民警提交</button>
							</div>
						</div>
						<!-------------第3阶段 法制大队打回案件---------------->

						<!-- <div class="mui-card mui-h5 btn_legal_commit" id="dahuixiugai"
							style="display: none;">
							打回修改
							<div class="mui-card-header">
								<label class=" mui-h5">打回：</label>
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">是</label> <input type="radio"
										onclick=changerollback_yes(this)
										name="ajdbxtProcess.process_is_rollback" id="rollback_yes">
								</div>
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">否</label> <input
										onclick=changerollback_no(this)
										name="ajdbxtProcess.process_is_rollback" id="rollback_no"
										type="radio">
								</div>

								<button type="button" id="rollback_commit"
									class="mui-btn mui-btn-primary btn_legal_commit"
									style="line-height: 10px;" onclick="process_rollback()">提交</button>

							</div>
						</div>

						-----------------------打回修改完成 
						<div class="mui-card mui-h5 btn_police_commit" id="xiugaiok"
							style="display: none;">
							修改完成
							<div class="mui-card-header">
								<input type="hidden" id="process_is_rollback_id" value="待处理">
								<button type="button"
									class="mui-btn mui-btn-primary btn_police_commit"
									style="line-height: 10px; float: center;"
									onclick="process_is_rollback_ok()">打回修改完成</button>
							</div>
						</div> -->

						<!-------------第四阶段 法制大队提出问题---------------->
						<div class="mui-card mui-h5">
							问题清单
							<div class="mui-card-header ">
								<!-- <label class=" mui-h5">问题清单</label>  --><input type="text"
									style="width: 60px; height: 10px; margin-bottom: 0px;" class=""
									name="process.process_question_list" id="process_question_list">
								<button type="button" id="askproblemcommit"
									class="mui-btn mui-btn-primary btn_legal_commit"
									style="line-height: 10px;" onclick="problem_asking()">法制民警提交</button>
							</div>
						</div>
						<!-------------第5阶段 法制大队天界问题整改数量---------------->
						<div class="mui-card mui-h5">
							问题清单整改
							<div class="mui-card-header ">
								<!-- <label class=" mui-h5">整改情况</label> -->
								<div id="checkbox_process_question"></div>
								<button type="button" id="problemchangecommit"
									class="mui-btn mui-btn-primary btn_legal_commit"
									style="line-height: 10px;" onclick="problem_rectification()">法制民警提交</button>
							</div>
						</div>
						
						<!-------------第6阶段 处罚---------------->
						<div class="mui-card mui-h5" id="punishment">
							处理结果
							<div class="mui-card-header ">
								<div class="mui-input-row mui-checkbox mui-left">
									<label class=" mui-h5">行政拘留</label> <input
										name="process.process_detention" value="是"
										id="process_detention" type="checkbox">
								</div>
							</div>
							<div class="mui-card-header ">
								<div class="mui-input-row mui-checkbox mui-left">
									<label class=" mui-h5">罚款</label> <input
										name="process.process_penalty" value="是" id="process_penalty"
										type="checkbox">
								</div>
							</div>
							<div class="mui-card-header ">
								<div class="mui-input-row mui-checkbox mui-left">
									<label class=" mui-h5">强制隔离戒毒</label> <input
										name="process.process_mandatory_abandon_drug" value="是"
										id="process_mandatory_abandon_drug" type="checkbox">
								</div>
							</div>
							<div class="mui-card-header ">
								<div class="mui-input-row mui-checkbox mui-left">
									<label class=" mui-h5">社区戒毒</label> <input
										name="process.process_community_abandon_drug" value="是"
										id="process_community_abandon_drug" type="checkbox">
								</div>
							</div>
							<div class="mui-card-header ">
								<div class="mui-input-row mui-checkbox mui-left">
									<label class=" mui-h5">其他</label> <input
										name="process.process_other" value="是" id="process_other"
										type="checkbox">
								</div>
							</div>
							<div class="mui-card-header ">
								<div class="mui-input-row mui-checkbox mui-left">
									<label class=" mui-h5">行政警告</label> <input
										name="process.process_administrativ_warning" value="是"
										id="process_administrativ_warning" type="checkbox">
								</div>
								<button type="button" id="punishcommit"
									class="mui-btn mui-btn-primary btn_police_commit"
									style="line-height: 10px;" onclick="punishmentab_chufa()"
									id="punishmentab">办案民警提交</button>

							</div>
						</div>
						
						<!-------------第7阶段   涉案财物入库---------------->
						<div class="mui-card mui-h5" id="sheancaiwu">
							涉案财物入库
							<div class="mui-card-header">
								<!-- <label class=" mui-h5">涉案财物入库</label> -->
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">是</label> <input type="radio"
										onclick='changecase_ruku_yes(this)'
										name="ajdbxtProcess.process_goods_in_lib" id="case_ruku_yes"
										value="是">
								</div>
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">否</label> <input
										onclick='changecase_ruku_no(this)'
										name="ajdbxtProcess.process_goods_in_lib" id="case_ruku_no"
										value="否" type="radio">
								</div>
								<button type="button" id="rukucommit"
									class="mui-btn mui-btn-primary btn_legal_commit"
									style="line-height: 10px;" onclick="case_ruku()">法制民警提交</button>
							</div>
						</div>
						
						<!-------------第8阶段 法制大队结案---------------->
						<div class="mui-card mui-h5">
							是否结案
							<div class="mui-card-header">
								<!-- <label class=" mui-h5">是否结案</label> -->
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">是</label> <input type="radio"
										onclick='changecase_ending_yes(this)'
										name="ajdbxtProcess.process_case_end" id="case_ending_yes"
										value="是">
								</div>
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">否</label> <input
										onclick='changecase_ending_no(this)'
										name="ajdbxtProcess.process_case_end" id="case_ending_no"
										value="否" type="radio">
								</div>
								<button type="button" id="caseendcommit"
									class="mui-btn mui-btn-primary btn_legal_commit"
									style="line-height: 10px;" onclick="case_ending()"
									id="process_case_end">法制民警提交</button>
							</div>
						</div>
						
						<!-------------第9阶段 法制大队评分---------------->
						<div class="mui-card mui-h5">
							案卷考核
							<div class="mui-card-header ">
								<!-- <label class=" mui-h5">案卷考核</label> --> <input type="text"
									style="width: 60px; height: 10px; margin-bottom: 0px;" class=""
									name="process.process_score" id="input_case_score">
								<button type="button" id="scorecommit"
									class="mui-btn mui-btn-primary btn_legal_commit"
									style="line-height: 10px;overflow: visible;" onclick="case_score()">法制民警提交</button>

							</div>
						</div>
						
						<!-------------第10阶段 法制大队确认案件上交---------------->
						<div class="mui-card mui-h5 btn_legal_commit">
							案卷是否上交
							<div class="mui-card-header ">
								<input type="hidden" id="process_file_hand_id" value="是">
								<button id="case_xingzhen_hand_button" type="button"
									class="mui-btn mui-btn-primary btn_legal_commit"
									style="line-height: 10px; float: center;"
									onclick="process_file_hand()">法制民警确认案卷上交</button>
								<span id="case_xingzhen_hand_img">法制民警确认案卷上交<img alt=""
									src="<%=basePath%>img/select_fill.png"></span>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>







	<!-- --------------------- -----------------------------------------------------------------------刑事案件----------------- ----------------------------------------------------------- -->


	<div class="mui-content mui-hidden" id="xingshi_case">
		<div class="mui-card" style="margin: 0px;">
			<!--页眉，放置标题-->
			<!--	<div class="mui-card-header">页眉</div>-->
			<!--内容区-->
			<!-------------第一阶段   涉案财物入库---------------->
			<div class="mui-card-content">
				<form id="penalProcessDetails">
					<!-------------------------------------------->
					<div class="mui-card mui-h5 div_put_on_record"
						style="display: none;">
						受立案
						<div class="mui-card-header">
							<label class=" mui-h5">受立案</label>
							<div class="mui-input-row mui-radio">
								<label class=" mui-h5">是</label> <input type="radio"
									onclick='change_penal_process_put_on_record_yes(this)'
									name="ajdbxtProcess.process_put_on_record"
									id="process_put_on_record_penal_yes" value="是">
							</div>
							<div class="mui-input-row mui-radio">
								<label class=" mui-h5">否</label> <input
									onclick='change_penal_process_put_on_record_no(this)' value="否"
									name="ajdbxtProcess.process_put_on_record"
									id="process_put_on_record_penal_no" type="radio">
							</div>
							<button type="button"
								class="mui-btn mui-btn-primary btn_police_commit"
								style="line-height: 10px;" id="btn_id_process_put_on_record_xs"
								onclick="process_put_on_record_penal_but()">办案民警提交</button>
						</div>
					</div>
					
					<!-------------------------------------------->
					<div class="div_no_put_on_record" style="display: none;">
						<div class="mui-card mui-h5">
							涉案财物
							<div class="mui-card-header">
								<label class=" mui-h5">涉案财物</label>
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">有</label> <input type="radio"
										onclick="penalchangecase_property_yes(this) "
										name="ajdbxtProcess.process_case_goods"
										id="penalcase_property_yes" value="是">
								</div>
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">无</label> <input
										onclick="penalchangecase_property_no(this) " type="radio"
										name="ajdbxtProcess.process_case_goods"
										id="penalcase_property_no" value="否">
								</div>
								<button type="button" id="progoodscommit"
									class="mui-btn mui-btn-primary btn_police_commit"
									style="line-height: 10px;" onclick="penalcase_property()">办案民警提交</button>
							</div>
							<!-- 涉案财物已入库 -->
							<div class="mui-card-header" id="property_storage_div"
								>
								<label class=" mui-h5">涉案财物是否入库</label>
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">是</label> <input type="radio"
										onclick="pencalchange_goods_in_lib_yes()"
										id="goods_in_lib_yes" type="radio"
										name="ajdbxtProcess.process_goods_in_lib" value="是">
								</div>
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">否</label> <input
										onclick="pencalchange_goods_in_lib_no()" id="goods_in_lib_no"
										type="radio" name="ajdbxtProcess.process_goods_in_lib"
										value="否">
								</div>
								<button type="button"
									class="mui-btn mui-btn-primary btn_legal_commit"
									style="line-height: 10px;" onclick="goods_in_lib()">法制民警提交</button>
							</div>
						</div>

						<!-- ------------------------ -->
						<!-------------第二阶段 传唤---------------->
						<div class="mui-card mui-h5">
							传唤
							<div class="mui-card-header">
								<label class=" mui-h5">延长询问查证时间</label>
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">是</label> <input type="radio"
										onclick='penalchangesuspect_summon_yes(this)'
										value="是"
										name="ajdbxtProcess.process_lengthen_subpoena"
										id="penalsuspect_summon_yes">
								</div>
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">否</label> <input
										onclick="penalchangesuspect_summon_no(this)"
										value="否"
										name="ajdbxtProcess.process_lengthen_subpoena"
										id="penalsuspect_summon_no" type="radio">
								</div>
								<button type="button"
									class="mui-btn mui-btn-primary btn_police_commit"
									id="btn_id_lengthen_subpoena_xs" style="line-height: 10px;"
									onclick="penalsuspect_summon(this)">办案民警提交</button>
							</div>
							
							<!-- 鉴定 -->
							<div class="mui-card-header">
								<label class=" mui-h5">是否鉴定</label>
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">是</label> <input type="radio"
										name="ajdbxtProcess.process_authenticate"
										id="penalidentification_yes"
										onclick='penalchangeidentification_yes(this)' value="是">
								</div>
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">否</label> <input
										name="ajdbxtProcess.process_authenticate"
										id="penalidentification_no"
										onclick="penalchangeidentification_no(this)" value="否"
										type="radio">
								</div>
								<button type="button"
									class="mui-btn mui-btn-primary btn_police_commit"
									id="btn_id_process_auth_xs" style="line-height: 10px;"
									onclick="penalidentification()">办案民警提交</button>
							</div>
						</div>

						<!-- 第三阶段  第一次强制措施 -->
						<div class="mui-card mui-h5">
							强制措施
							<div class="mui-card-header ">
								<div class="mui-input-row mui-radio mui-left">
									<label class=" mui-h5"> 拘留 </label> <input
										onclick="mandatory_measuresBtnClick_one(this); mandatory_measuresBtnClick(this) "
										id="measure_one_one" type="radio"
										name="ajdbxtProcess.process_force_measure_one" value="拘留">
								</div>
							</div>
							<div class="mui-card-header ">
								<div class="mui-input-row mui-radio mui-left">
									<label class=" mui-h5">监视居住</label> <input type="radio"
										onclick="mandatory_measuresBtnClick_two(this) ;mandatory_measuresBtnClick(this)"
										id="measure_one_two"
										name="ajdbxtProcess.process_force_measure_one" value="监视居住">
								</div>
							</div>
							<div class="mui-card-header ">
								<div class="mui-input-row mui-radio mui-left">
									<label class=" mui-h5">取保候审</label> <input type="radio"
										onclick="mandatory_measuresBtnClick_three(this) ;mandatory_measuresBtnClick(this)"
										id="measure_one_three"
										name="ajdbxtProcess.process_force_measure_one" value="取保候审">
								</div>
								<button type="button"
									class="mui-btn mui-btn-primary btn_police_commit"
									id="btn_id_force_one_xs" style="line-height: 10px;"
									onclick="penalmeasure_one()">办案单位提交</button>
							</div>
						</div>
						
						<!-- -----------------证据上交-------------------------- -->
						<div class="mui-card mui-h5">
							证据是否上传
							<div class="mui-card-header">
								<!-- <label class=" mui-h5">证据上传</label> -->
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">是</label> <input type="radio"
										onclick="change_penal_process_evidence_to_upload_yes(this)"
										name="ajdbxtProcess.process_evidence_to_upload_affirm"
										id="process_evidence_to_upload_penal_yes" value="是">
								</div>
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">否</label> <input
										onclick="change_penal_process_evidence_to_upload_no(this)"
										value="否" name="ajdbxtProcess.process_evidence_to_upload_affirm"
										id="process_evidence_to_upload_penal_no" type="radio">
								</div>
								<button type="button"
									class="mui-btn mui-btn-primary btn_police_commit"
									style="line-height: 10px;" id="btn_id_evidence_upload_one_xs"
									onclick="process_evidence_to_upload_penal_but()">办案民警提交</button>
							</div>
						</div>
						
						<!-------------第一次强制措施案卷上交---------------->
						<div class="mui-card mui-h5">
							案卷是否上交
							<div class="mui-card-header">
								<input type="hidden" id="process_file_hand_penal_one" value="是">
								<button type="button"
									class="mui-btn mui-btn-primary btn_legal_commit"
									style="line-height: 10px; float: center;"
									id="process_file_hand_penal_one_bnt" onclick="pencalcasehand()">法制民警确认案卷上交</button>
								<span id="process_file_hand_penal_one_img"
									style="display: none;">法制民警确认案卷上交<img alt=""
									src="<%=basePath%>img/select_fill.png"></span>
							</div>
						</div>

						<!-------------第五阶段 法制大队提出问题---------------->
						<div class="mui-card mui-h5">
							问题清单
							<div class="mui-card-header ">
								 <input type="text"
									style="width: 60px; height: 10px; margin-bottom: 0px;" class=""
									name="process.process_question_list"
									id="penalprocess_question_list">
								<button type="button"
									class="mui-btn mui-btn-primary btn_legal_commit"
									id="btn_process_question_list_id" style="line-height: 10px;"
									onclick="pencalproblem_asking()">法制民警提交</button>
							</div>
						</div>

						<!-------------第四阶段 拘留延长期限---------------->
						<div class="mui-card mui-h5" style="display: none;"
							id="detention_delay_date">
							延长拘留期限
							<div class="mui-card-header ">
								<div class="mui-input-row mui-radio mui-left">
									<label class=" mui-h5"> 30天 </label> <input
										onclick="pencalchangecriminal_detention_one()"
										id="process_lengthen_criminal_detention_one" type="radio"
										name="ajdbxtProcess.process_lengthen_criminal_detention"
										value="30">
								</div>
							</div>
							<div class="mui-card-header ">
								<div class="mui-input-row mui-radio mui-left">
									<label class=" mui-h5">7天</label> <input
										onclick="pencalchangecriminal_detention_two()"
										id="process_lengthen_criminal_detention_two" type="radio"
										name="ajdbxtProcess.process_lengthen_criminal_detention"
										value="7">
								</div>
							</div>
							<div class="mui-card-header ">
								<div class="mui-input-row mui-radio mui-left">
									<label class=" mui-h5">0天</label> <input
										onclick="pencalchangecriminal_detention_three()"
										id="process_lengthen_criminal_detention_three" type="radio"
										name="ajdbxtProcess.process_lengthen_criminal_detention"
										value="0">
								</div>
								<button type="button" id="detentioncommit"
									class="mui-btn mui-btn-primary btn_police_commit"
									style="line-height: 10px;"
									onclick="process_lengthen_criminal_detention()">办案民警提交</button>
							</div>
						</div>
						
						<!-- ---------------------------案卷上交期限1（原，案卷拿回1）---------------------------------- -->
						<div class="mui-card mui-h5" id="nahui_day_one">
							案卷上交期限
							<div class="mui-card-header ">
								<!-- <label class=" mui-h5">案卷上交期限</label>  --><input type="text"
									style="width: 60px; height: 10px; margin-bottom: 0px;"
									name="process.process_fileback_day" id="process_fileback_day">
								<button type="button"
									class="mui-btn mui-btn-primary btn_legal_commit"
									style="line-height: 10px;"
									onclick="process_fileback_day_commit()"
									id="btn_process_fileback_day_id">法制民警提交</button>
							</div>
						</div>
						
						<!-- ----------------------------------------案件是否上交1------ -->
						<div class="mui-card mui-h5" id="casehand_no">
							案卷是否上交
							<div class="mui-card-header">
								<input type="hidden" id="process_file_hand_penal_one_no"
									value="否">
								<button id="process_file_hand_penal_one_no_bnt" type="button"
									class="mui-btn mui-btn-primary btn_legal_commit"
									style="line-height: 10px; float: center;"
									onclick="pencalcasehand_no()">法制民警案卷上交</button>
								<span id="process_file_hand_penal_one_no_img"
									style="display: none;">法制民警案卷上交<img alt=""
									src="<%=basePath%>img/select_fill.png"></span>
							</div>
						</div>

						<!-------------第六阶段 普通警员进行问题整改---------------->
						<div class="mui-card mui-h5">
							问题清单整改
							<div id="checkbox_process_question_penal_one"
								style="width: 100%; float: left;"></div>
							<div style="width: 100%; float: left; padding: 10px;">
								<button type="button"
									class="mui-btn mui-btn-primary btn_legal_commit"
									style="line-height: 10px; float: right;"
									id="btn_process_question_id"
									onclick="pencalproblem_rectification()">法制民警提交</button>
							</div>
						</div>
						
						<!-------------第七阶段 第二次强制措施-----(拘留)----------->
						<div class="mui-card mui-h5" id="second_punishment"
							style="display: none;">
							变更强制措施（一）
							<div class="mui-card-header ">
								<div class="mui-input-row mui-radio mui-left">
									<label class=" mui-h5">逮捕</label> <input
										name="ajdbxtProcess.process_force_measure_two" value="逮捕"
										type="radio" id="second_punishment_one"
										onclick="changesecond_punishmentClick_one();second_punishmentClick()">
								</div>
							</div>
							<div class="mui-card-header ">
								<div class="mui-input-row mui-radio mui-left">
									<label class=" mui-h5">取保候审</label> <input type="radio"
										name="ajdbxtProcess.process_force_measure_two" value="取保候审"
										id="second_punishment_two"
										onclick="changesecond_punishmentClick_two() ;second_punishmentClick()">
								</div>
							</div>
							<div class="mui-card-header ">
								<div class="mui-input-row mui-radio mui-left">
									<label class=" mui-h5">监视居住</label> <input type="radio"
										name="ajdbxtProcess.process_force_measure_two" value="监视居住"
										id="second_punishment_three"
										onclick="changesecond_punishmentClick_three(); second_punishmentClick()">
								</div>
								<button type="button" id="forcemessurcommit"
									class="mui-btn mui-btn-primary btn_police_commit"
									style="line-height: 10px;" onclick="second_punishment()">办案民警提交</button>
							</div>
						</div>
						<!-- ------------------------------------------------------第二次强制措施-------取保候审、监视居住----------------- -->
						<div class="mui-card mui-h5" id="qubao_second_punishment"
							style="display: none;">
							变更强制措施（一）
							<div class="mui-card-header ">
								<div class="mui-input-row mui-radio mui-left">
									<label class=" mui-h5">撤案</label> <input type="radio"
										name="ajdbxtProcess.process_force_measure_two" value="撤案"
										onclick="pencalchange_cheantwo_yes();second_punishmentClick() "
										id="chenantwo_yes">
								</div>
							</div>
							<div class="mui-card-header ">
								<div class="mui-input-row mui-radio mui-left">
									<label class=" mui-h5">解保</label> <input type="radio"
										name="ajdbxtProcess.process_force_measure_two" value="解保"
										onclick="pencalchange_cheantwo_new();second_punishmentClick() "
										id="chenantwo_new">
								</div>
							</div>
							<div class="mui-card-header ">
								<div class="mui-input-row mui-radio mui-left">
									<label class=" mui-h5">起诉</label> <input type="radio"
										name="ajdbxtProcess.process_force_measure_two" value="起诉"
										onclick="pencalchange_cheantwo_no();second_punishmentClick()"
										id="chenantwo_no">
								</div>
								<button type="button"
									class="mui-btn mui-btn-primary btn_police_commit"
									style="line-height: 10px;"
									id="btn_process_force_measure_two_detention_two_id"
									onclick="chenantwo_second_punishment()">办案民警提交</button>
							</div>
						</div>

						<!-- --------------------------------------案卷上交期限2（拘留）------------------------------------------------------------- -->
						<div class="mui-card mui-h5" id="shangjiao_ju"
							style="display: none;">
							案卷上交期限
							<div class="mui-card-header ">
								<!-- <label class=" mui-h5">案卷上交期限</label> --> <input type="text"
									style="width: 60px; height: 10px; margin-bottom: 0px;"
									name="process.process_fileup_day" id="process_fileup_day_juliu">
								<button type="button"
									class="mui-btn mui-btn-primary btn_legal_commit"
									id="btn_process_fileup_day_catch_id" style="line-height: 10px;"
									onclick="process_fileup_day_juliu_btn()">法制民警提交</button>
							</div>
						</div>

						<!-- ------------------------------------------案卷是否上交2------------------------------------------------------>
						<div class="mui-card mui-h5" id="twocase_hand_juliu"
							style="display: none;">
							案卷是否上交
							<div class="mui-card-header">
								<input type="hidden" id="process_file_hand_two_penal_two"
									value="是">
								<button id="process_file_hand_two_penal_two_bnt" type="button"
									class="mui-btn mui-btn-primary btn_legal_commit"
									style="line-height: 10px; float: center;"
									onclick="process_file_hand_two_but()">法制民警确认案卷上交</button>
								<span id="process_file_hand_two_penal_two_img"
									style="display: none;">法制民警确认案卷上交<img alt=""
									src="<%=basePath%>img/select_fill.png"></span>
							</div>
						</div>

<!-- 	------------------------------问题清单2--------------------------------------- -->
						<div class="mui-card mui-h5" id="tichu_two" style="display: none;">
							问题清单
							<div class="mui-card-header ">
								<!-- <label class=" mui-h5">问题清单</label> --> <input type="text"
									style="width: 60px; height: 10px; margin-bottom: 0px;" class=""
									name="process.process_question_list_two"
									id="process_question_list_two">
								<button type="button"
									class="mui-btn mui-btn-primary btn_legal_commit"
									style="line-height: 10px;"
									id="btn_process_question_list_two_id"
									onclick="process_question_list_two_commit()">法制民警提交</button>
							</div>
						</div>
						
						<!-- -----------------------------------案卷上交期限3（原，案卷拿回2）---------------------------------------------------------- -->
						<div class="mui-card mui-h5" id="shangjiao_qu"
							style="display: none;">
							案卷上交期限
							<div class="mui-card-header ">
								<!-- <label class=" mui-h5">案卷上交期限</label> --> <input type="text"
									style="width: 60px; height: 10px; margin-bottom: 0px;"
									name="process.process_fileup_day" id="process_fileup_day_qubao">
								<button type="button"
									class="mui-btn mui-btn-primary btn_legal_commit"
									style="line-height: 10px;" 
									onclick="process_fileup_day_qubao_btn()"
									id="btn_process_fileback_day_two_id">法制民警提交</button>
							</div>
						</div>
						
						<!-- ----------------------------------------案卷是否上交3----------------- -->
						<div class="mui-card mui-h5 btn_legal_commit"
							id="twocase_hand_qubao" style="display: none;">
							案卷是否上交
							<div class="mui-card-header">
								<input type="hidden" id="process_file_hand_two_two_qubao"
									value="是">
								<button id="process_file_hand_two_two_qubao_bnt" type="button"
									class="mui-btn mui-btn-primary btn_legal_commit"
									style="line-height: 10px; float: center;"
									onclick="process_file_hand_two_qubao_bnt()">法制民警确认案卷上交</button>
								<span id="process_file_hand_two_two_qubao_img"
									style="display: none;">法制民警确认案卷上交<img alt=""
									src="<%=basePath%>img/select_fill.png"></span>
							</div>
						</div>

		<!-- -----------------------------------第二次问题整改--------------------------------------------- -->
						<div class="mui-card mui-h5" id="zhengai_two"
							style="display: none;">
							问题清单整改
							<div class="mui-card-header ">
								<!-- <label class=" mui-h5">问题清单整改</label> -->
								<div id="checkbox_process_question_penal_two"></div>
								<button type="button"
									class="mui-btn mui-btn-primary btn_legal_commit"
									style="line-height: 10px;" id="btn_process_question_two_id"
									onclick="pencalproblem_rectification_two()">法制民警提交</button>
							</div>
						</div>

						
						<!-------------第八阶段 第三次强制措施--------（第二次为逮捕）-------->
						<div class="mui-card mui-h5" id="third_punishment"
							style="display: none;">
							变更强制措施（二）
							<div class="mui-card-header ">
								<div class="mui-input-row mui-radio mui-left">
									<label class=" mui-h5">取保候审</label> <input type="radio"
										name="ajdbxtProcess.process_force_measure_three" value="取保候审"
										onclick="pencalchangequbaothree_yes() ;third_punishmentClick()"
										id="qubaothree_yes">
								</div>
							</div>
							<div class="mui-card-header ">
								<div class="mui-input-row mui-radio mui-left">
									<label class=" mui-h5">起诉</label> <input type="radio"
										name="ajdbxtProcess.process_force_measure_three" value="起诉"
										onclick="pencalchangequbaothree_no() ;third_punishmentClick()"
										id="qubaothree_no">
								</div>
								<button type="button"
									class="mui-btn mui-btn-primary btn_police_commit"
									id="btn_process_force_measure_three_arrest_id"
									style="line-height: 10px;" onclick="third_punishment_btn()">办案民警提交</button>
							</div>
						</div>

						<!-- ------------------------------证据上交是否齐全，第二次强制措施为取保/监视---------------------------------------------------------- -->
						<div class="mui-card mui-h5" id="qubao_zhenju_two"
							style="display: none;">
							证据上传是否齐全
							<div class="mui-card-header">
								<!-- <label class=" mui-h5">证据上交：</label> -->
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">是</label> <input type="radio"
										onclick="daibu_change_penal_process_evidence_to_upload_two_yes_two(this)"
										name="ajdbxtProcess.process_evidence_to_upload_two_affirm"
										id="daibu_process_evidence_to_upload_two_penal_two_yes"
										value="是">
								</div>
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">否</label> <input
										onclick="daibu_change_penal_process_evidence_to_upload_two_no_two(this)"
										value="否" name="ajdbxtProcess.process_evidence_to_upload_two_affirm"
										id="daibu_process_evidence_to_upload_two_penal_two_no"
										type="radio">
								</div>
								<button type="button"
									class="mui-btn mui-btn-primary btn_police_commit"
									style="line-height: 10px;"
									id="btn_qubao_process_evidence_to_upload_two_id"
									onclick="daibu_process_evidence_to_upload_two_two()">办案民警提交</button>
							</div>
						</div>

						<!-- --------------------第三次强制措施----------第二次为取保候审、监视居住------------------------------------- -->
						<div class="mui-card mui-h5" id="qubao_third_punishment"
							style="display: none;">
							变更强制措施（二）
							<div class="mui-card-header ">
								<div class="mui-input-row mui-radio mui-left">
									<label class=" mui-h5">撤案</label> <input type="radio"
										name="ajdbxtProcess.process_force_measure_three" value="撤案"
										onclick="pencalchangecheanthree_yes() ;third_punishmentClick()"
										id="cheanthree_yes">
								</div>
							</div>
							<div class="mui-card-header ">
								<div class="mui-input-row mui-radio mui-left">
									<label class=" mui-h5">解保</label> <input type="radio"
										name="ajdbxtProcess.process_force_measure_three" value="解保"
										onclick="pencalchangecheanthree_new() ;third_punishmentClick()"
										id="cheanthree_new">
								</div>
							</div>
							<div class="mui-card-header ">
								<div class="mui-input-row mui-radio mui-left">
									<label class=" mui-h5">起诉</label> <input type="radio"
										name="ajdbxtProcess.process_force_measure_three" value="起诉"
										onclick="pencalchangecheanthree_no() ;third_punishmentClick()"
										id="cheanthree_no">
								</div>
								<button type="button"
									class="mui-btn mui-btn-primary btn_police_commit"
									id="btn_process_force_measure_three_id"
									style="line-height: 10px;" onclick="qubao_third_punishment_btn()">办案民警提交</button>
							</div>
						</div>

						<!-- ------------------------------证据上交是否齐全，第二次强制措施为逮捕---------------------------------------------------------- -->
						<div class="mui-card mui-h5" id="zhenju_two"
							style="display: none;">
							证据上传是否齐全
							<div class="mui-card-header">
								<!-- <label class=" mui-h5">证据上交：</label> -->
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">是</label> <input type="radio"
										onclick="change_penal_process_evidence_to_upload_two_yes_two(this)"
										name="ajdbxtProcess.process_evidence_to_upload_two_affirm"
										id="process_evidence_to_upload_two_penal_two_yes" value="是">
								</div>
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">否</label> <input
										onclick="change_penal_process_evidence_to_upload_two_no_two(this)"
										value="否" name="ajdbxtProcess.process_evidence_to_upload_two_affirm"
										id="process_evidence_to_upload_two_penal_two_no" type="radio">
								</div>
								<button type="button"
									class="mui-btn mui-btn-primary btn_police_commit"
									style="line-height: 10px;"
									id="btn_process_evidence_to_upload_two_id"
									onclick="process_evidence_to_upload_two_two()">办案民警提交</button>
							</div>
						</div>

						<!-------------第九阶段 第四次强制措施------取保候审---------->
						<div class="mui-card mui-h5" id="fourth_punishment"
							style="display: none;">
							变更强制措施（三）
							<div class="mui-card-header ">
								<div class="mui-input-row mui-radio mui-left">
									<label class=" mui-h5">撤案</label> <input type="radio"
										name="ajdbxtProcess.process_force_measure_four" value="撤案"
										onclick="pencalchangechenfour_yes() ;four_punishmentClick()"
										id="cheanfour_yes">
								</div>
							</div>
							<div class="mui-card-header ">
								<div class="mui-input-row mui-radio mui-left">
									<label class=" mui-h5">解保</label> <input type="radio"
										name="ajdbxtProcess.process_force_measure_four" value="解保"
										onclick="pencalchangechenfour_new() ;four_punishmentClick()"
										id="chenanfour_new">
								</div>
							</div>
							<div class="mui-card-header ">
								<div class="mui-input-row mui-radio mui-left">
									<label class=" mui-h5">起诉</label> <input type="radio"
										name="ajdbxtProcess.process_force_measure_four" value="起诉"
										onclick="pencalchangechenfour_no() ;four_punishmentClick()"
										id="chenanfour_no">
								</div>
								<button type="button"
									class="mui-btn mui-btn-primary btn_police_commit"
									id="btn_process_force_measure_four_id"
									style="line-height: 10px;" onclick="fourth_punishment_btn()">办案民警提交</button>
							</div>
						</div>

						<!-------------第十阶段   补查---------------->
						<div class="mui-card mui-h5" id="supplement_check"
							style="display: none;">
							补充侦查
							<div class="mui-card-header" id="checkOne">
							<label class=" mui-h5">补充侦查（一）</label>
								<div class="mui-input-row mui-radio mui-left">
									<label class=" mui-h5">是</label>
									<input type="radio"
										name="ajdbxtProcess.process_search_result_one"
										value="是"
										onclick="pencalchangecheckone_yes() ;checkOne_Click()"
										id="checkone_yes">
								</div>
								<div class="mui-input-row mui-radio mui-left">
									<label class=" mui-h5">否</label>
									<input type="radio"
										name="ajdbxtProcess.process_search_result_one" 
										value="否"
										onclick="pencalchangecheckone_no() ;checkOne_Click()"
										id="checkedone_no">
									<button type="button"
										class="mui-btn mui-btn-primary btn_police_commit"
										id="btn_process_search_result_one_id"
										style="line-height: 10px;" onclick="checkOne_btn()">办案民警提交</button>
								</div>
							</div>
							<!-- 补差二次 -->
							<div class="mui-card-header" id="checkTwo" style="display: none;">
								<label class=" mui-h5">补充侦查（二）</label>
								<div class="mui-input-row mui-radio mui-left">
									<label class=" mui-h5">是</label> 
									<input type="radio"
										name="ajdbxtProcess.process_search_result_two" 
										value="是"
										onclick="pencalchangechecktwo_yes()" 
										id="checktwo_yes">
								</div>
								<div class="mui-input-row mui-radio mui-left">
									<label class=" mui-h5">否</label> 
									<input type="radio"
										name="ajdbxtProcess.process_search_result_two"
										 value="否"
										onclick="pencalchangechecktwo_no()" 
										id="checkedtwo_no">
									<button type="button"
										class="mui-btn mui-btn-primary btn_police_commit"
										id="btn_process_search_result_two_id"
										style="line-height: 10px;" onclick="checkTwo_btn()">办案民警提交</button>
								</div>
							</div>
						</div>

						<!-------------第十一阶段 法制大队结案---------------->
						<div class="mui-card mui-h5">
							结案
							<div class="mui-card-header">
								<!-- <label class=" mui-h5">结案</label> -->
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">是</label> <input type="radio"
										name="ajdbxtProcess.process_case_end"
										onclick="pencalchangecase_ending_yes(this)"
										id="pencalcase_ending_yes" value="是">
								</div>
								<div class="mui-input-row mui-radio">
									<label class=" mui-h5">否</label> <input type="radio"
										name="ajdbxtProcess.process_case_end"
										onclick="pencalchangecase_ending_no(this)"
										id="pencalcase_ending_no" value="否">
								</div>
								<button type="button" id="penalcaseendcommit"
									class="mui-btn mui-btn-primary btn_legal_commit"
									style="line-height: 10px;" onclick="pencalcase_ending()">法制民警提交</button>
							</div>
						</div>

						<!-------------第十二阶段 法制大队评分---------------->
						<div class="mui-card mui-h5">
							案件考核
							<div class="mui-card-header ">
								<input type="text"
									style="width: 60px; height: 10px; margin-bottom: 0px;" class=""
									name="process.process_score" id="pencalinput_case_score">
								<button type="button"
									class="mui-btn mui-btn-primary btn_legal_commit"
									id="btn_process_score_xingshi_id" style="line-height: 10px;overflow: visible;"
									onclick="pencalcase_score()">法制民警提交</button>
							</div>
						</div>

						<!-- ------------------------------附卷上交--------------------------------------------------- -->
						<div class="mui-card mui-h5" id="process_casefile_auxiliary">
							附卷上交
							<div class="mui-card-header">
								<input type="hidden" id="process_casefile_auxiliary_id"
									value="是">
								<button id="process_casefile_auxiliary_id_bnt" type="button"
									class="mui-btn mui-btn-primary btn_legal_commit"
									style="line-height: 10px; float: center;"
									onclick="process_casefile_auxiliary_bnt()">法制民警确认附卷上交</button>
								<span id="process_casefile_auxiliary_id_img"
									style="display: none;">法制民警确认附卷上交<img alt=""
									src="<%=basePath%>img/select_fill.png"></span>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>


	<!-- -------------------------------------------------------------------------------------- -->
	<script type="text/javascript">
		/* $(bnt).attr("style","display:block;");   */
		$(".mui-btn").hide();
	</script>
	<script type="text/javascript"
		src="<%=basePath%>js/Info/mobile_caseOneProcess.js"></script>
	<script type="text/javascript">
		mui.init();
		document.getElementById("tory_a").addEventListener("tap", function() {
			mui.openWindow({
				url : '/ajdbxt/info/Info_page_mobile_caseOneDetails',
			});
		});
		//监听手机的返回键
		pushHistory(); 
		   window.addEventListener("popstate", function(e) { 
		     window.location = '/ajdbxt/info/Info_page_mobile_caseOneDetails';//返回至案件详情页
		   }, false); 
		   function pushHistory() { 
		     var state = { 
		       title: "title", 
		       url: "#"
		     }; 
		     window.history.pushState(state, "title", "#"); 
		   }
	</script>
</body>

</html>