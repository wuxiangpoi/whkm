"use strict";angular.module("sbAdminApp",["chartService"]).controller("programCommandCtrl",["$scope","$rootScope","baseService","chartService",function(e,t,a,r){e.displayed=[],e.sp={},e.tableState={},e.callServer=function(t){a.initTable(e,t,a.api.programCmd+"getProgramCmdPageList")},e.initPage=function(){e.tableState.pagination.start=0,e.callServer(e.tableState)},e.showProgramOrSchedule=function(e){21==e.cmdCode||22==e.cmdCode?(e.pStatus=1,a.showProgram(e)):(e.id=e.pid,a.showSchedule(e,2,r))}}]);