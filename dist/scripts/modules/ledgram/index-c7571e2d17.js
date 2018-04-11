"use strict";angular.module("sbAdminApp",["sentencesService"]).controller("ledgramCtrl",["$scope","$rootScope","baseService","sentencesService",function(e,a,n,l){e.displayed=[],e.sp={},e.tableState={},e.ids=[],e.callServer=function(a){n.initTable(e,a,n.api.ledPage+"getLedPageListPage")},e.save=function(a){var t={};a?(t.id=a.id,t.name=a.name,t.font=a.font.toString(),t.fontBold=a.fontBold.toString(),t.fontSize=a.fontSize.toString(),t.fontColor=a.fontColor.toString(),t.stay=a.stay,t.speed=a.speed,t.displayStyle=a.displayStyle.toString(),t.text=a.text):t={name:"",font:"0",fontBold:"3",fontSize:"18",fontColor:"1",stay:0,speed:15,displayStyle:"4",text:""},n.confirmDialog(540,a?"编辑":"添加新节目",t,"tpl/led_savepogram.html",function(o,i){i.isShowMessage=!1,i.modalForm.$valid?l.checkCon(i.data.text).sentencesArr.length?(i.data.text=l.checkCon(i.data.text).sentencesCon,n.alert("抱歉，您输入的内容包含被禁止的词汇，建议修改相关内容","warning",!0)):(i.isPosting=!0,n.postData(n.api.ledPage+"saveLedPage",t,function(){o.close(),n.alert(a?"修改成功":"添加成功","success"),e.callServer(e.tableState)})):i.isShowMessage=!0},function(e){e.font=[{value:0,name:"宋体"},{value:1,name:"黑体"},{value:2,name:"隶书"},{value:3,name:"楷体"}],e.fontColor=[{value:1,name:"红色"},{value:2,name:"黄色"},{value:3,name:"绿色"}],e.displayStyle=[{value:0,name:"随机显示"},{value:1,name:"静止显示"},{value:2,name:"快速打出"},{value:3,name:"向左移动"},{value:4,name:"向左连移"},{value:5,name:"向上移动"},{value:6,name:"向上连移"},{value:7,name:"闪烁"},{value:8,name:"飘雪"},{value:9,name:"冒泡"},{value:10,name:"中间移出"},{value:11,name:"左右移入"},{value:12,name:"左右交叉移入"},{value:13,name:"上下交叉移入"},{value:14,name:"画卷闭合"},{value:15,name:"画卷打开"},{value:16,name:"向左拉伸"},{value:17,name:"向右拉伸"},{value:18,name:"向上拉伸"},{value:19,name:"向下拉伸"},{value:20,name:"向左镭射"},{value:21,name:"向右镭射"},{value:22,name:"向上镭射"},{value:23,name:"向下镭射"},{value:24,name:"左右交叉拉幕"},{value:25,name:"上下交叉拉幕"},{value:26,name:"分散左拉"},{value:27,name:"水平百页"},{value:28,name:"垂直百页"},{value:29,name:"向左拉幕"},{value:30,name:"向右拉幕"},{value:31,name:"向上拉幕"},{value:32,name:"向下拉幕"},{value:33,name:"左右闭合"},{value:34,name:"左右对开"},{value:35,name:"上下闭合"},{value:36,name:"上下对开"},{value:37,name:"向右移动"},{value:38,name:"向右连移"},{value:39,name:"向下移动"},{value:40,name:"向下连移"},{value:41,name:"45度左旋"},{value:42,name:"180度左旋"},{value:43,name:"90度左旋"},{value:44,name:"45度右旋"},{value:45,name:"180度右旋"},{value:46,name:"90度右旋"},{value:47,name:"菱形打开"},{value:48,name:"菱形闭合"}],e.fontSize=function(){for(var e=[],a=10;a<37;a++)e.push({value:a,name:a+"px"});return e}(),e.$watch("data.speed",function(a){var n=a/.3+"%";e.data.speed=a,$("#sliderWrap").find(".bar").css("backgroundSize",n+" 100%")}),e.$watch("data.stay",function(a){var n=a/.1+"%";e.data.stay=a,$("#sliderWrap1").find(".bar").css("backgroundSize",n+" 100%")})})},e.sendDown=function(e){n.confirmDialog(720,"节目下发",e,"tpl/led_list_modal.html",function(a,l){var t="";t=l.ids.join(","),t.length?(l.isPosting=!0,n.postData(n.api.ledPage+"sendProgramCommand",{ledProgramId:e.id,sns:t},function(){a.close(),n.alert("下发成功","success")})):n.alert("请至少勾选一个节目再进行操作","warning",!0)},function(a){a.displayed=[],a.sp={},a.sp.tid=e.id,a.tableState={},a.ids=[],a.callServer=function(e){n.initTable(a,e,n.api.led+"getLedPageList")},a.checkAll=function(e){n.checkAll(e,a)},a.checkThis=function(e,l){n.checkThis(e,l,a)}})},e.del=function(a){n.confirm("删除","确定删除节目"+a.name+"?",function(l,t){t.isPosting=!0,n.postData(n.api.ledPage+"deleteLedPage",{id:a.id},function(a){l.close(),n.alert("删除成功","success"),e.callServer(e.tableState)})})}}]);