"use strict";angular.module("sbAdminApp").controller("programCtrl",["$scope","$rootScope","$state","baseService","leafService",function(e,t,r,a,i){e.displayed=[],e.sp={},e.ids=[],e.leafes=[],e.currentGroup=t.rootGroup,e.sp.oid=e.currentGroup.id,e.currentLeaf={},e.currentLeaf.id="",e.sp.gid="",e.tableState={},e.callServer=function(t){e.ids=[],a.initTable(e,t,a.api.program+"getProgramList")},e.getGroups=function(t){i.getLeafes(a.api.program+"getProgramGroups",t,function(t){e.leafes=t})},e.initPage=function(){e.tableState.pagination.start=0,e.ids=[],e.callServer(e.tableState)},e.$on("emitGroupLeaf",function(t,r){e.sp.oid!=r.id&&(e.currentGroup=r,e.sp.oid=r.id,e.sp.gid="",e.initPage(),e.getGroups(e.sp.oid))}),e.getGroups(e.currentGroup.id),e.addGroup=function(){i.addGroup(a.api.program+"optGroupSave",e.currentGroup.id,function(){e.getGroups(e.currentGroup.id),a.alert("添加成功","success")})},e.setGroup=function(){var t=e.ids.join(",");i.setGroup(a.api.program+"setOrganization",t,function(){e.getGroups(e.currentGroup.id),a.alert("设置成功","success"),e.initPage()})},e.chooseLeaf=function(t,r){e.currentLeaf.id=t,e.sp.gid=t,e.initPage()},e.setLeaf=function(){var t=e.ids.join(",");i.setLeaf(a.api.program+"setGroupRelations",e.currentGroup.id,t,e.leafes,function(){a.alert("设置成功","success",!0),e.initPage()})},e.cancelLeaf=function(){var t=e.ids.join(",");i.cancelLeaf(a.api.program+"setGroupRelations",t,e.currentLeaf,function(){a.alert("设置成功","success",!0),e.initPage()})},e.editLeaf=function(t,r){function n(){var r=c.val();""==r||r==d?(c.val(d),o.removeClass("edit")):i.editLeaf(a.api.program+"optGroupSave",{id:t.id,name:r,oid:e.currentGroup.id},function(){o.removeClass("edit"),e.getGroups(e.currentGroup.id)},function(){s.text(d),c.val(d),o.removeClass("edit")})}var o=$(r.currentTarget).parents(".leafGroup"),s=$(r.currentTarget).parents(".leafGroup").children(".leafName"),c=$(r.currentTarget).parents(".leafGroup").children(".leafEdit").children("input"),d=c.val();o.addClass("edit"),c.focus(),c.blur(function(){n()}),c.bind("keydown",function(e){var t=e||window.event;13==(t.keyCode||t.which||t.charCode)&&n()})},e.delLeaf=function(t){i.delLeaf(a.api.program+"optGroupDel",t,function(){e.getGroups(e.currentGroup.id),a.alert("删除成功","success"),e.currentLeaf={},e.currentLeaf.id="",e.sp.gid="",e.callServer(e.tableState)})},e.showProgram=function(e){e.pid=e.id,a.showProgram(e)},e.sendCommandStopProgram=function(r,i){a.confirmDialog(720,"播放管理",r,"tpl/terminal_list_modal.html",function(e,t){var i=t.ids.join(",");if(i.length){t.isPosting=!0;var n=0==t.programOrSchedule?"/api/program/programManage_sendCommand":"/api/programSchedule/scheduleManage_sendCommand",o={};o=0==t.programOrSchedule?{tids:i,type:0,pid:r.id,oid:r.oid,gid:r.gid}:{tids:i,type:0,pid:r.id},a.postData(a.api.apiUrl+n,o,function(t){e.close(),a.alert("操作成功","success",!0)})}else a.alert("请至少勾选一个终端再进行操作","warning",!0)},function(n){n.displayed=[],n.sp={},n.ids=[],n.currentGroup=t.rootGroup,n.sp.oid=n.currentGroup.id,n.currentLeaf={},n.currentLeaf.id="",n.sp.gid="",n.sp.pid=r.id,n.tableState={},n.showType=0,n.checkPerms=!1,n.programOrSchedule=0,n.callUrl=a.api.program+"getProgramPlayPageByPid",n.callServer=function(r){a.initTable(n,r,n.callUrl,function(r){r.data[0]&&(r.data[0].stype&&0!=r.data[0].stype?(t.perms(445)&&(n.checkPerms=!0),n.programOrSchedule=1):(t.perms(436)&&(n.checkPerms=!0),n.programOrSchedule=0)),n.callUrl==a.api.program+"getProgramPlayPageByPid"&&(e.displayed[i].playTers=r.recordsTotal)})},n.initPage=function(){n.tableState.pagination.start=0,n.ids=[],n.callServer(n.tableState)},n.initTable=function(){switch(n.sp.resolution="",n.sp.status="",n.showType){case 0:n.callUrl=a.api.program+"getProgramPlayPageByPid";break;case 1:n.callUrl=a.api.program+"getProgramCommandPengdingPageByPid"}n.currentGroup=t.rootGroup,n.sp.oid=n.currentGroup.id,n.currentLeaf={},n.currentLeaf.id="",n.sp.gid="",n.callServer(n.tableState)},n.switchTab=function(e){n.showType!=e&&(n.showType=e,n.initTable())},n.$on("emitGroupLeaf",function(e,t,r){n.sp.oid==t.id&&n.sp.gid==r.id||(n.currentGroup=t,n.sp.oid=t.id,n.sp.gid=r.id,n.initPage())}),n.checkAll=function(e){if(n.ids=[],$(e.currentTarget).is(":checked"))for(var t=0;t<n.displayed.length;t++)n.ids.push(n.displayed[t].tid);else n.ids=[]},n.checkThis=function(e,t){$(t.currentTarget).is(":checked")?n.ids.push(e.tid):n.ids=a.removeAry(n.ids,e.tid)}})},e.sendDown=function(e){a.confirmDialog(820,"发布",e,"tpl/terminal_list_set_modal.html",function(t,r){var i=r.ids.join(",");i.length?r.data.endDate>r.data.startDate?r.showTip?a.alert("请选择正确的播放时间段","warning",!0):(r.isPosting=!0,a.postData(a.api.program+"programManage_sendCommand",{tids:i,type:1,pid:e.id},function(){t.close(),a.alert("发布成功","success",!0),r.callServer(r.tableState)})):a.alert("请选择正确的播放日期","warning",!0):a.alert("请至少勾选一个终端再进行操作","warning",!0)},function(r){function i(e){return e<10?"0"+e.toString():e.toString()}r.displayed=[],r.sp={},r.ids=[],r.currentGroup=t.rootGroup,r.sp.oid=r.currentGroup.id,r.currentLeaf={},r.currentLeaf.id="",r.sp.gid="",r.sp.pid=e.id,r.tableState={},r.start_h=0,r.start_m=0,r.end_h=24,r.end_m=0,r.showTip=!1,r.selectH=[],r.selectM=[];var n=new Date;r.today=n.getFullYear()+"-"+a.formateDay(n.getMonth()+1)+a.formateDay(n.getDate());for(var o=0;o<25;o++)r.selectH.push({name:o+"时",value:o});for(var o=0;o<60;o++)r.selectM.push({name:o+"分",value:o});r.callServer=function(e){a.initTable(r,e,a.api.program+"programManage_getAllOkTerminalList")},r.initPage=function(){r.tableState.pagination.start=0,r.callServer(r.tableState)};var s=new Date,c=s.getFullYear(),d=s.getMonth()+1,p=s.getDate();r.data.startDate=c.toString()+i(d)+i(p.toString()),r.data.endDate=(c+1).toString()+i(d)+i(p.toString()),r.formDate=function(e,t,a){r.data[a]=e._i.split("-").join("")},r.checkTime=function(){24==r.start_h&&(r.start_m=0),24==r.end_h&&(r.end_m=0),parseFloat(r.end_h+r.end_m/60)<=parseFloat(r.start_h+r.start_m/60)?r.showTip=!0:r.showTip=!1},r.$on("emitGroupLeaf",function(e,t,a){r.sp.oid==t.id&&r.sp.gid==a.id||(r.currentGroup=t,r.sp.oid=t.id,r.sp.gid=a.id,r.initPage())}),r.checkAll=function(e){a.checkAll(e,r)},r.checkThis=function(e,t){a.checkThis(e,t,r)}})},e.del=function(t){a.confirm("删除","确定删除节目："+t.name+"?",function(r,i){i.isPosting=!0,a.postData(a.api.program+"deleteProgram",{id:t.id},function(t){r.close(),a.alert("删除成功","success"),e.callServer(e.tableState)})})},e.submitCheck=function(t){a.confirm("提交审核","是否提交审核？",function(r,i){i.isPosting=!0,a.postData(a.api.program+"sumbmitCheck",{id:t.id},function(t){r.close(),a.alert("提交成功","success"),e.callServer(e.tableState)})})},e.saveEdit=function(e){r.go("dashboard.programEdit",{id:e.id})},e.saveAs=function(e){r.go("dashboard.programCopy",{id:e.id})},e.checkAll=function(t){a.checkAll(t,e)},e.checkThis=function(t,r){a.checkThis(t,r,e)},e.showTip=function(e){$(e.currentTarget).children(".btn").hasClass("disabled")&&$(e.currentTarget).children(".tipDiv").show()},e.hideTip=function(e){$(e.currentTarget).children(".tipDiv").hide()}}]);