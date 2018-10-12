window.onload = function() {
	var url = window.location.href;
	info_id = url.substring(url.indexOf("=") + 1);
	get_staffDetails(info_id);
}
function get_staffDetails(info_id) {
		var url = "/ajdbxt/info/Info_getSingleInfo?info.ajdbxt_info_id=" + info_id;
		get_staffDetails_Ajax(url, info_id);
	}
//案件基本信息
function get_staffDetails_Ajax(url, info_id) {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp = new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var staff_info = xmlhttp.responseText;
			staff_info = JSON.parse(staff_info);
			console.log(staff_info);
			// 遍历并插入input的value
			$.each(staff_info.info, function(key, value) {
				$('input[name="info.' + key + '"]').val(value);
				//法制员
				if (key == 'info_department_legal_member') {
					$('input[name="info.' + key + '"]').val(staff_info.team_legal.police_name);
				}
				//所队长
				if (key == 'info_department_captain') {
					$('input[name="info.' + key + '"]').val(staff_info.cap.police_name);
				}
			});
			// 办案单位
			$.each(staff_info.department, function(key, value) {
				$('input[name="department.' + key + '"]').val(value);
			});
			//值班局领导
			$.each(staff_info.leader, function(key, value) {
				$('input[name="leader.' + key + '"]').val(value);
			});
			//值班法制大队民警
			$.each(staff_info.legal, function(key, value) {
				$('input[name="legal.' + key + '"]').val(value);
			});
			// 主办民警
			$.each(staff_info.police[0], function(key, value) {
				$('input[name="police[0].' + key + '"]').val(value);
			});
			// 协办民警1
			$.each(staff_info.police[1], function(key, value) {
				$('input[name="police[1].' + key + '"]').val(value);
			});
			// 协办民警2
			$.each(staff_info.police[2], function(key, value) {
				console.log(2);
				$('input[name="police[2].' + key + '"]').val(value);
			});
			if($('input[name="police[2].police_name"]').val()==""||$('input[name="police[2].police_name"]').val()==null){
				$('input[name="police[2].police_name"]').val("无");
				return;
			}
			if($('input[name="info.info_inform_leaders"]').val()==""||$('input[name="info.info_inform_leaders"]').val()==null){
				$('input[name="info.info_inform_leaders"]').val("否");
				return;
			}
		}
	}
	xmlhttp.open("post", url, true);
	xmlhttp.send();
}
