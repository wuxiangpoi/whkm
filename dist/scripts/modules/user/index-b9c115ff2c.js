"use strict";angular.module("sbAdminApp",[]).controller("userCtrl",["$scope","$rootScope","baseService",function(e,a,o){e.displayed=[],e.sp={},e.tableState={},e.currentGroup=a.rootGroup,e.sp.oid=e.currentGroup.id,e.callServer=function(a){o.initTable(e,a,o.api.user+"getUserPageList")},o.getJson(o.api.role+"getRoleList",{},function(a){e.roles=a}),e.initPage=function(){e.callServer(e.tableState)},e.$on("emitGroupLeaf",function(a,o){e.sp.oid!=o.id&&(e.currentGroup=o,e.sp.oid=o.id,e.initPage())}),e.save=function(a){var t={id:a?a.id:"",account:a?a.account:"",password:a?a.password:"",name:a?a.name:"",role:a?a.role:"",oid:a?a.oid:""};o.confirmDialog(540,a?"编辑账号":"添加账号",t,"tpl/user_save.html",function(t,s){if(s.isShowMessage=!1,s.modalForm.$valid){var r={id:a?a.id:"",account:s.data.account,password:s.data.password,name:s.data.name,role:s.data.role,oid:s.currentGroup.id};a||(r.password=o.md5_pwd(r.password)),1==r.role&&(r.oid=""),s.isPosting=!0,o.postData(o.api.user+"saveUser",r,function(){t.close(),o.alert(a?"修改成功":"添加成功","success"),e.callServer(e.tableState)})}else s.isShowMessage=!0},function(a){a.roles=e.roles,a.$on("emitGroupLeaf",function(e,o,t){a.currentGroup=o,a.currentGroup.id=o.id})})},e.resetPwd=function(a){o.confirmDialog(540,"重置密码",{},"tpl/reset_password.html",function(t,s){s.modalForm.$valid?(s.isPosting=!0,o.postData(o.api.user+"resetPwd",{uid:a.id,password:o.md5_pwd(s.data.password)},function(){t.close(),o.alert("修改成功","success"),e.callServer(e.tableState)})):s.isShowMessage=!0})},e.changeStatus=function(a){o.confirm(0==a.enabled?"解禁账号":"禁用账号","您确定"+(0==a.enabled?"解禁":"禁用")+"账号："+a.name+"?",function(t,s){s.isPosting=!0,o.postData(o.api.user+"setUserEnable",{uid:a.id,enabled:1==a.enabled?0:1},function(a){t.close(),o.alert("操作成功","success"),e.callServer(e.tableState)})})}}]);