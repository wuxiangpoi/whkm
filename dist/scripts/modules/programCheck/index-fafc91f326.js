"use strict";angular.module("sbAdminApp").controller("programCheckCtrl",["$scope","$rootScope","baseService",function(r,a,o){r.displayed=[],r.sp={},r.tableState={},r.callServer=function(t){o.initTable(r,t,o.api.program+"getCheckProgramList",function(r){a.programCheckCounts=r.recordsTotal})},r.showProgram=function(a,t){a.pid=a.id,o.showProgram(a,t,function(t){o.confirm("节目审核","确定"+(3==t?"通过":"不通过")+"节目："+a.name+"?",function(e,c){c.isPosting=!0;var i,n;2==a.status?(i=3==t?6:4,n=o.api.program+"check"):(i=3==t?3:7,n=o.api.program+"checkFinal"),o.postData(n,{id:a.id,status:i},function(a){e.close(),o.alert("操作成功","success"),r.callServer(r.tableState)})})})}}]);