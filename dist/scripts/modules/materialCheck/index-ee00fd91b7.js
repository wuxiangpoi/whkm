"use strict";angular.module("sbAdminApp").controller("materialCheckCtrl",["$scope","$rootScope","baseService",function(e,t,a){e.displayed=[],e.sp={},e.tableState={},e.callServer=function(i){a.initTable(e,i,a.api.material+"materialCheck_getMaterialCheckList",function(e){t.materialCheckCounts=e.recordsTotal})},e.showMaterial=function(t,i){a.showMaterial(t,i,function(i){a.confirm("素材审核","确定"+(3==i?"通过":"不通过")+"素材："+t.name+"?",function(c,l){l.isPosting=!0,a.postData(a.api.material+"materialCheck_check",{id:t.id,status:i},function(t){c.close(),a.alert("操作成功","success"),e.callServer(e.tableState)})})})}}]);