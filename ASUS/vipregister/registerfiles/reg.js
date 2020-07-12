// JavaScript Document
function checkPassword(str)
{
	var reg = /^(w|[u4E00-u9FA5])*$/;
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
			  
//检查EMAIL正确性
function isEmail(email) 
{ 
	if (email.length > 100) 
	{ 
		alert("email地址长度不能超过100位!"); 
		return false; 
	} 
	if (email.length < 11) 
	{ 
		mEmail.value = mEmail.value+"@qq.com";
		mail.value = email.value+"@qq.com";
	}
	if (email.length == 11) 
	{ 
		mEmail.value = mEmail.value+"@163.com";
		mail.value = email.value+"@163.com";
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
var checkBoxs = document.getElementsByName("mSort");
for (var i = 0; i < checkBoxs .length; i++) {
  if (checkBoxs[i].checked){
	falg += 1; 
  }
}




//var falg = 0;
// $('input:checkbox').each(function() {
//if ($(this).attr("checked")) {
//falg += 1;
//}
//})
if (falg > 0)
return true;
else
return false;
} 

function check_submit()
{
	with(form1)
	{
		if(Jtrim(mWXname.value)=="")
		{
			alert("请填写微信昵称");
			mWXname.focus();
			return false;
		}
		if(Jtrim(mUsername.value)=="")
		{
			alert("请填写姓名");
			mUsername.focus();
			return false;
		}
		if(Jtrim(mTel.value)=="")
		{
			alert("请填写联系电话");
			mTel.focus();
			return false;
		}
		if(!isEmail(mEmail.value))
		{
			alert("请正确填写Email地址");
			mEmail.focus();
			return false;
		}
		if(Jtrim(mCollege.value)=="")
		{
			alert("请填写高校名称");
			mCollege.focus();
			return false;
		}
		if(Jtrim(mIdentity.value)=="" || Jtrim(mIdentity.value)=="blank")
		{
			alert("请选择身份类别");
			mIdentity.focus();
			return false;
		}
		if(!mycheckbox())
		{
			alert("请选择特长");
			mSort[0].focus();
			return false;
		}
		else
		{
			return true;
			}


 		//submit();
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