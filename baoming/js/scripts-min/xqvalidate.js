var createTip=function(e){var t=document.createElement("div");return clearTip(e),e.parent().append(t),t},clearTip=function(e){var t=e.parent().find(".error");for(var n=0;n<t.length;n++)t[n].parentNode.removeChild(t[n])},validateSettings={onFocus:{state:null,container:"_error",style:"focus",run:function(e){clearTip(e.element)}},isNull:{state:0,container:"_error",style:"error",run:function(e,t){if(t!=undefined&&t!=null){e.element.attr("sta",0);var n=createTip(e.element);n.className=validateSettings.isNull.style,n.innerHTML=t}else e.element.attr("sta",2)}},error:{state:1,container:"_error",style:"error",run:function(e,t){e.element.attr("sta",1);var n=createTip(e.element);n.className=validateSettings.error.style,n.innerHTML=t}},succeed:{state:2,container:"_succeed",style:"succeed",run:function(e){e.element.attr("sta",2)}}},validateRules={isNull:function(e){return e==""||typeof e!="string"},isSfzh:function(e){var t=!1;!e&&15!=e.length&&18!=e.length&&(t=!1);if(15==e.length){var n=e.substring(6,8),r=e.substring(8,10),i=e.substring(10,12),s=e.substring(14,15),o=new Date(n,parseFloat(r)-1,parseFloat(i));o.getYear()!=parseFloat(n)||o.getMonth()!=parseFloat(r)-1||o.getDate()!=parseFloat(i)?t=!1:t=!0}if(18==e.length){var n=e.substring(6,10),r=e.substring(10,12),i=e.substring(12,14),s=e.substring(14,17),o=new Date(n,parseFloat(r)-1,parseFloat(i));if(o.getFullYear()!=parseFloat(n)||o.getMonth()!=parseFloat(r)-1||o.getDate()!=parseFloat(i))t=!1;var u=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1],a=[1,0,10,9,8,7,6,5,4,3,2],f=0,l=e.split("");l[17].toLowerCase()=="x"&&(l[17]=10);for(var c=0;c<17;c++)f+=u[c]*l[c];var c=f%11;l[17]!=a[c]?t=!1:t=!0}return t},isMoney:function(e){return(new RegExp(/^0?(13|15|18|14|17)[0-9]{9}$/)).test(e)}},validatePrompt={xx_name:{onFocus:"请输入姓名",succeed:"",isNull:"姓名不能为空!",error:"姓名过长",error2:"姓名不能包含特殊符号",class1:"grdd"},xx_sfzh:{onFocus:"请输入身份证号",succeed:"",isNull:"身份证号不能为空!",error:"身份证号不正确",class1:"grdd"},xx_tel:{onFocus:"请输入手机号码",succeed:"",isNull:"手机号码不能为空!",error:"手机号码不正确",class1:"grdd"},xx_telphone:{onFocus:"请输入联系电话",succeed:"",error:"联系电话不正确",error2:"联系电话过长",class1:"grdd"},xx_referralCode:{onFocus:"请输入推荐人手机号",succeed:"",error:"推荐人手机号不正确",error2:"手机号不能和报名人手机号一致",class1:"grdd"},xx_remarks:{onFocus:"请输入备注",succeed:"",error:"备注内容过长",class1:"grdd"},xx_jgz:{onFocus:"请输入军官证",succeed:"",isNull:"军官证不能为空",error:"军官证过长",class1:"grdd"}},validateFunction={xxnameFunc:function(e){var t=validateRules.isNull(e.value);if(t){validateSettings.error.run(e,e.prompts.isNull);return}var n=e.value.length>10;if(n){validateSettings.error.run(e,e.prompts.error);return}var r=RegExp(/[(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);if(r.test(e.value)){validateSettings.error.run(e,e.prompts.error2);return}validateSettings.succeed.run(e)},xxSfzhFunc:function(e){var t=validateRules.isNull(e.value);if(t){validateSettings.error.run(e,e.prompts.isNull);return}var n=validateRules.isSfzh(e.value);if(!n){validateSettings.error.run(e,e.prompts.error);return}validateSettings.succeed.run(e)},xxTelphoneFunc:function(e){if(e.value.length>20){validateSettings.error.run(e,e.prompts.error2);return}validateSettings.succeed.run(e)},xxTelFunc:function(e){var t=validateRules.isNull(e.value);if(t){validateSettings.error.run(e,e.prompts.isNull);return}var n=validateRules.isMoney(e.value);if(!n){validateSettings.error.run(e,e.prompts.error);return}validateSettings.succeed.run(e)},xxReferralCodeFunc:function(e){var t=validateRules.isNull(e.value);if(t)validateSettings.succeed.run(e);else{var n=validateRules.isMoney(e.value);if(!n){validateSettings.error.run(e,e.prompts.error);return}$("#textTel").val().trim()==e.value.trim()?validateSettings.error.run(e,e.prompts.error2):validateSettings.succeed.run(e)}},xxRemarksFunc:function(e){if(e.value.length>80){validateSettings.error.run(e,e.prompts.error);return}validateSettings.succeed.run(e)},xxJgzFunc:function(e){var t=validateRules.isNull(e.value);if(t){validateSettings.error.run(e,e.prompts.isNull);return}if(e.value.length>30){validateSettings.error.run(e,e.prompts.error);return}validateSettings.succeed.run(e)},FORM_submit:function(e){var t=!0;for(var n=0;n<e.length;n++){if($(e[n]).attr("sta")!=2){t=!1;break}t=!0}return t}};(function(e){e.fn.xqValidate=function(t,n,r,i){var s=e(this),o=s.attr("type");if(r==1){var u=s.val(),a=s.attr("sta");if(i)n({prompts:t,element:s,value:u,errorEle:_error,succeedEle:_succeed});else if(u==""||u=="-1")validateSettings.isNull.run({prompts:t,element:s},t.isNull);else{if(a==1||a==2)return;n({prompts:t,element:s,value:u})}}else{typeof r=="string"&&s.val(r),(o=="checkbox"||o=="radio")&&s.attr("checked")==1&&s.attr("sta",validateSettings.succeed.state);switch(o){case"number":case"text":case"password":s.unbind("focus").bind("focus",function(){var e=s.val();validateSettings.onFocus.run({prompts:t,element:s,value:e})}).unbind("blur").bind("blur",function(){var e=s.val();n({prompts:t,element:s,value:e})})}}}})(Zepto);