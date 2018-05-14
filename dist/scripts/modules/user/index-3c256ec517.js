"use strict";angular.module("sbAdminApp",[]).controller("userCtrl",["$scope","$rootScope","baseService",function(e,a,t){e.displayed=[],e.sp={},e.tableState={},e.currentGroup=a.rootGroup,e.sp.oid=e.currentGroup.id,e.callServer=function(a){t.initTable(e,a,t.api.user+"getUserPageList")},t.getJson(t.api.role+"getRoleList",{},function(a){e.roles=a}),e.initPage=function(){e.tableState.pagination.start=0,e.callServer(e.tableState)},e.$on("emitGroupLeaf",function(a,t){e.sp.oid!=t.id&&(e.currentGroup=t,e.sp.oid=t.id,e.initPage())}),e.save=function(a){var o={id:a?a.id:"",account:a?a.account:"",password:a?a.password:"",name:a?a.name:"",role:a?a.role:"",oid:a?a.oid:""};t.confirmDialog(540,a?"编辑账号":"添加账号",o,"tpl/user_save.html",function(o,s){if(s.isShowMessage=!1,s.modalForm.$valid){var r={id:a?a.id:"",account:s.data.account,password:s.data.password,name:s.data.name,role:s.data.role,oid:s.currentGroup.id};a||(r.password=t.md5_pwd(r.password)),1==r.role&&(r.oid=""),s.isPosting=!0,t.postData(t.api.user+"saveUser",r,function(){o.close(),t.alert(a?"修改成功":"添加成功","success"),e.callServer(e.tableState)})}else s.isShowMessage=!0},function(a){a.roles=e.roles,a.$on("emitGroupLeaf",function(e,t,o){a.currentGroup=t,a.currentGroup.id=t.id})})},e.resetPwd=function(a){t.confirmDialog(540,"重置密码",{},"tpl/reset_password.html",function(o,s){s.modalForm.$valid?(s.isPosting=!0,t.postData(t.api.user+"resetPwd",{uid:a.id,password:t.md5_pwd(s.data.password)},function(){o.close(),t.alert("修改成功","success"),e.callServer(e.tableState)})):s.isShowMessage=!0})},e.changeStatus=function(a){t.confirm(0==a.enabled?"解禁账号":"禁用账号","您确定"+(0==a.enabled?"解禁":"禁用")+"账号："+a.name+"?",function(o,s){s.isPosting=!0,t.postData(t.api.user+"setUserEnable",{uid:a.id,enabled:1==a.enabled?0:1},function(a){o.close(),t.alert("操作成功","success"),e.callServer(e.tableState)})})}}]);