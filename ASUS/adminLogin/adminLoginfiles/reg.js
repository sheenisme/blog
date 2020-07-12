// JavaScript Document
function checkPassword(str)
{
	var reg = /^(\w|[\u4E00-\u9FA5])*$/;
	if(arr=str.match(reg) &&!bChinese(str))
	{
		return true;
	}
	else
	{
		return false;
	}
}
function bChinese(str)
{
	var l=str.length;
	for (var i=0;i<l;i++)
	{
		if (str.charCodeAt(i)<0||str.charCodeAt(i)>255)
			return true;
	}
	return false;
}

function checkTel(str)
{

var tel =str;
 var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
 if (reg.test(tel)) {
      return true;
 }else{
     return false;
 };
}


function Jtrim(str)  //去空格函数
{
	//alert(str);
        var i = 0;
		var trimstr="";
        var len = str.length;
        if ( str == "" ) return( str );
        j = len -1;
        flagbegin = true;
        flagend = true;
        while ( flagbegin == true && i< len)
        {
           if ( str.charAt(i) == " " )
                {
                  i=i+1;
                  flagbegin=true;
                }
                else
                {
                        flagbegin=false;
                }
        }

        while  (flagend== true && j>=0)
        {
            if (str.charAt(j)==" ")
                {
                        j=j-1;
                        flagend=true;
                }
                else
                {
                        flagend=false;
                }
        }

        if ( i > j ) return ("")

        trimstr = str.substring(i,j+1);
        return trimstr;
}			  

//检查链接输入正确性
			  
function isLink(mlink){ 
	str = mlink; 
	str = str.match(/http:\/\/.+/); 
	if (str == null){ 
	return false; 
}
else{ 
	return true; 
} 
} 

//检查EMAIL正确性
function isEmail(email) 
{ 
	if (email.length > 100) 
	{ 
		alert("email地址长度不能超过100位!"); 
		return false; 
	} 
	var regu = "^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*[0-9a-zA-Z]+))@([a-zA-Z0-9-]+[.])+([a-zA-Z]{2}|net|NET|com|COM|gov|GOV|mil|MIL|org|ORG|edu|EDU|int|INT)$";
	var re = new RegExp(regu); 
	if (email.search(re) != -1)
	{
		return true; 
	}
	else 
	{
		return false; 
	}
}

//检查复选框是否一个多没选
//是否被选中验证有选中的return true,否return false
function mycheckbox() {
var falg = 0;
 $('input:checkbox').each(function() {
if ($(this).attr("checked")) {
falg += 1;
}
})
if (falg > 0)
return true;
else
return false;
} 

function check_submit()
{
	with(form1)
	{
		
		if(Jtrim(select1.value)=="")
		{
			alert("请选择城市");
			select1.focus();
			return;
		}
		if(Jtrim(select2.value)=="")
		{
			alert("请选择学校");
			select2.focus();
			return;
		}
		if(Jtrim(mUsername.value)=="")
		{
			alert("请填写姓名");
			mUsername.focus();
			return;
		}
		if(Jtrim(mTel.value)=="")
		{
			alert("请填写手机号");
			mTel.focus();
			return;
		}
		else
		{
			if (!checkTel(mTel.value))
			{
				alert("电话号码只能为1开头的11位的数字");
				mTel.focus();
				return;
			}
		}
		if(Jtrim(mfaultDesc.value)=="")
		{
			alert("请填写故障描述");
			mfaultDesc.focus();
			return;
		}
		else
		{
			if (Jtrim(mfaultDesc.value).length > 200) 
			{ 
				alert("故障描述长度不能超过200字!"); 
				mfaultDesc.focus();
				return; 
			} 
		}
 		submit();
	}
}

function check_permSubmit()
{
	with(form1)
	{
		
		if(Jtrim(select1.value)=="")
		{
			alert("请选择城市");
			select1.focus();
			return;
		}
		if(Jtrim(select2.value)=="")
		{
			alert("请选择学校");
			select2.focus();
			return;
		}
		if(Jtrim(mUsername.value)=="")
		{
			alert("请填写姓名");
			mUsername.focus();
			return;
		}
		if(Jtrim(mTel.value)=="")
		{
			alert("请填写手机号");
			mTel.focus();
			return;
		}
		else
		{
			if (!checkTel(mTel.value))
			{
				alert("电话号码只能为1开头的11位的数字");
				mTel.focus();
				return;
			}
		}
		if(!isEmail(mEmail.value))
		{
			alert("请正确填写Email地址");
			mEmail.focus();
			return;
		}

 		submit();
	}
}

function check_loginSubmit()  //管理员密码校验
{
	with(form1)
	{
		
		if(Jtrim(mPWD.value)=="")
		{
			alert("请填写管理账号");
			mPWD.focus();
			return;
		}
		if(Jtrim(mPWD.value)=="hngydxcsca")    //管理员密码更改
		{
			mPWD.value="uQYSZgBZQprZf";
		}
		if(Jtrim(mPWD.value)=="HNGYDXCSCA")    //管理员密码更改
		{
			mPWD.value="uQYSZgBZQprZf";
		}
 		submit();
	}
}


function check_worksSubmit()
{
	with(form1)
	{
		if(Jtrim(mUsername.value)=="")
		{
			alert("请填写姓名");
			mUsername.focus();
			return;
		}
		if(Jtrim(mTel.value)=="")
		{
			alert("请填写手机号");
			mTel.focus();
			return;
		}
		if(!isEmail(mEmail.value))
		{
			alert("请正确填写Email地址");
			mEmail.focus();
			return;
		}
		if(Jtrim(select1.value)=="")
		{
			alert("请选择地区");
			select1.focus();
			return;
		}
		if(Jtrim(select2.value)=="")
		{
			alert("请选择学校");
			select2.focus();
			return;
		}
		if(Jtrim(mworks.value)=="")
		{
			alert("请填写作品名称");
			mworks.focus();
			return;
		}

		if(Jtrim(mworksDesc.value)=="")
		{
			alert("请填写作品简介");
			mworksDesc.focus();
			return;
		}
		else
		{
			if (Jtrim(mworksDesc.value).length > 300) 
			{ 
				alert("作品简介长度不能超过300字!"); 
				mworksDesc.focus();
				return; 
			} 
		}		
		if(Jtrim(mworksLink.value)=="")
		{
			alert("请填写作品链接");
			mworksLink.focus();
			return;
		}
		//else
		//{
			//if(!isLink(Jtrim(mworksLink.value)));
			//{
				//alert("您输入的URL无效"); 
				//mworksLink.focus();
				//return;
			//}

		//}

		//if(Jtrim(xdPicture1.value)=="")
		//{
			//alert("请上传作品二维码");
			//xdPicture1.focus();
			//return;
		//}
 		submit();
	}
}



function changeVcode()
{

	document.getElementById('Image1').src="vcode.asp?"+Math.random();
}

function check_dh()
{
	with(form1)
	{
		
		if(Jtrim(SN.value)=="")
		{
			alert("请填写产品序列号");
			SN.focus();
			return;
		}
		if(Jtrim(PN.value)=="")
		{
			alert("请填写产品料号");
			PN.focus();
			return;
		}
		
		if(Jtrim(mCode.value)=="")
		{
			alert("请填写验证码");
			mCode.focus();
			return;
		}
		
		submit();
	}
}

function check_login()
{
	with(form1)
	{
		
		if(Jtrim(mUsername.value)=="")
		{
			alert("请填写团队名称");
			mUsername.focus();
			return;
		}
		if(Jtrim(mPassword.value)=="")
		{
			alert("请填写登录密码")
			mPassword.focus();
			return;
		}
		else
		{
			if (!checkPassword(mPassword.value))
			{
				alert("密码错误");
				mPassword.focus();
				return;
			}
		}
		

		submit();
	}
}

function check_vidsubmit()
{
	with(form1)
	{
		
		if(Jtrim(muserDesc.value)=="")
		{
			alert("请填团队介绍");
			muserDesc.focus();
			return;
		}
		if(Jtrim(mvideo.value)=="")
		{
			alert("请填写作品名称");
			mvideo.focus();
			return;
		}
		if(Jtrim(mvideoPath.value)=="")
		{
			alert("请填写作品链接");
			mvideoPath.focus();
			return;
		}
		
		if(Jtrim(mvideoDesc.value)=="")
		{
			alert("请填写作品简介");
			mvideoDesc.focus();
			return;
		}
		if(Jtrim(xdPicture.value)=="")
		{
			alert("请上传作品海报");
			xdPicture.focus();
			return;
		}
		if(Jtrim(muserDesc.value)=="")
		{
			alert("请填团队介绍");
			muserDesc.focus();
			return;
		}
		submit();
	}
}

function check_grasubmit()
{
	with(form1)
	{
		
		if(Jtrim(mgraphics.value)=="")
		{
			alert("请填写作品名称");
			mgraphics.focus();
			return;
		}
		if(Jtrim(mgraphicsDesc.value)=="")
		{
			alert("请填写作品简介");
			mgraphicsDesc.focus();
			return;
		}
		if(Jtrim(xdPicture1.value)=="")
		{
			alert("请上传系列作品1");
			xdPicture1.focus();
			return;
		}
		if(Jtrim(xdPicture2.value)=="")
		{
			alert("请上传系列作品2");
			xdPicture2.focus();
			return;
		}
		if(Jtrim(xdPicture3.value)=="")
		{
			alert("请上传系列作品3");
			xdPicture3.focus();
			return;
		}
		if(Jtrim(muserDesc.value)=="")
		{
			alert("请填团队介绍");
			muserDesc.focus();
			return;
		}
		submit();
	}
}

function check_share()
{
	with(form1)
	{
		
		if(Jtrim(mUsername.value)=="")
		{
			alert("请填写姓名");
			mUsername.focus();
			return;
		}
	
		if(Jtrim(select1.value)=="")
		{
			alert("请选择地区");
			select1.focus();
			return;
		}
		if(Jtrim(select2.value)=="")
		{
			alert("请选择学校");
			select2.focus();
			return;
		}
		if(!isEmail(mEmail.value))
		{
			alert("请正确填写Email地址");
			mEmail.focus();
			return;
		}
		submit();
	}
}