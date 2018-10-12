mui.post('http://server-name/login.php',{
		username:'username',
		password:'password'
	},function(data){
		//服务器返回响应，根据响应结果，分析是否登录成功；
	},'json'
);
function case_details(){
	var case_details_content=document.getElementById("case_details_content");
	var div_case_name=null;
	var form_details_list=null;
	var to_process_btn=null;
	// 创建卡片页眉div
	div_case_name= document.createElement("div");
	div_case_name.className="mui-card";
	var div_card_header=document.createElement("div");
	div_card_header.className="mui-card-header";
	var h3_case_title=document.createElement("h3");
	h3_case_title.className="mui-h4";
	h3_case_title.innerHTML=index_case_info_vo.Caselist[num].info.info_name;
	div_card_header.appendChild(h3_case_title);
	div_case_name.appendChild(div_card_header);
	
	
}
