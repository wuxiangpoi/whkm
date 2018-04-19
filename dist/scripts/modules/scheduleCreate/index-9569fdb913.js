"use strict";angular.module("sbAdminApp",["chartService"]).controller("scheduleCreateCtrl",["$scope","$rootScope","$state","$stateParams","baseService","leafService","chartService",function(e,t,a,r,i,s,o){function m(e){return e<10?"0"+e.toString():e.toString()}function n(){var t=14;e.playList.length>t&&(t=e.playList.length),e.chartStyle={height:30*t+30+"px",width:"100%"},e.eoption=o.initChartSchedule(e.playList,t),setTimeout(function(){e.$apply()},1)}function d(t){function a(e,t,a,r,i){return a==e&&r==t?"date"==i:!(r<=e)&&(!(r>e&&a>=t)&&(!(a>=t)&&!(a<t&&r<=e)))}var r={check:!1};if(0==t.stype)return r;if(r.cross=[],!(60*(t.eTime-t.sTime)<t.duration*t.plays)){for(var s=0;s<e.playList.length;s++)if(1==e.playList[s].stype&&a(t.sTime,t.eTime,e.playList[s].sTime,e.playList[s].eTime,"time")&&a(t.startDate,t.endDate,e.playList[s].startDate,e.playList[s].endDate,"date")){var o=e.playList[s];o.msg={type:3,info:"暂不能添加交叉时段，此时段与已添加的"+e.playList[s].startTime+"至"+e.playList[s].endTime+"交叉，请重新选择时段"},r.cross.push(o)}if(r.cross.length>0)return r.check=!0,r;for(var m=(i.formateDayTime(t.endDate)-i.formateDayTime(t.startDate))/c,o={},s=0;s<=m;s++)if(T[i.formateDayTime(t.startDate)+s*c][t.timeSel])if(T[i.formateDayTime(t.startDate)+s*c][t.timeSel].minuteRemain-t.duration*t.plays<0){var n=new Date(i.formateDayTime(t.startDate)+s*c),d=n.getFullYear()+"-"+i.formateDay(n.getMonth()+1)+"-"+i.formateDay(n.getDate());o.date?o.dateInterval=o.date+"至"+d:o={date:d},o.msg={type:5,info:o.dateInterval?o.dateInterval+"的"+t.startTime+"至"+t.endTime+"剩余时长不足~":o.date+"的"+t.startTime+"至"+t.endTime+"剩余时长不足~"}}else T[i.formateDayTime(t.startDate)+s*c][t.timeSel]={minuteRemain:T[i.formateDayTime(t.startDate)+s*c][t.timeSel].minuteRemain-t.duration*t.plays};else T[i.formateDayTime(t.startDate)+s*c][t.timeSel]={minuteRemain:60*(t.eTime-t.sTime)-t.duration*t.plays};return o.date&&r.cross.push(o),r.cross.length>0&&(r.check=!0),r}var o=t,l=t.startDate==t.startDate?i.formateDayTime(t.startDate,"date"):i.formateDayTime(t.startDate,"date")+"-"+i.formateDayTime(t.startDate,"date");return o.msg={type:4,info:l+"的"+t.startTime+"至"+t.endTime+"剩余时长不足~"},r.cross.push(o),r.cross.length>0?(r.check=!0,r):void 0}e.displayed=[],e.sp={},e.ids=[],e.leafes=[],e.currentGroup=t.rootGroup,e.sp.oid=e.currentGroup.id,e.currentLeaf={},e.currentLeaf.id="",e.sp.gid="",e.sp.status=1,e.tableState={},e.playList=[],e.playListId=[],e.isShowMessage=!1;for(var l=new Date,p=l.getFullYear(),u=l.getMonth()+1,D=l.getDate(),y=new Date,c=864e5,f=y.getFullYear()+"-"+i.formateDay(y.getMonth()+1)+"-"+i.formateDay(y.getDate()),g=y.getFullYear()+1+"-"+i.formateDay(y.getMonth()+2)+i.formateDay(y.getDate()),h=p.toString()+m(u)+m(D.toString()),T=((p+1).toString(),m(u),m(D.toString()),{}),S=0;S<400;S++){Date.parse(f),y.getFullYear(),i.formateDay(y.getMonth()+1),i.formateDay(y.getDate());T[Date.parse(f)+S*c]={}}r.id&&i.postData(i.api.programSchedule+"getProgramScheduleById",{id:r.id},function(t){function a(t){if(e.playListId.push(t.id),e.playList.push(t),i.formateDayTime(t.startDate)<Date.parse(f)&&(t.startDate=f.split("-").join("")),1==t.stype)for(var a=(i.formateDayTime(t.endDate)-i.formateDayTime(t.startDate))/c,r=0;r<=a;r++)T[i.formateDayTime(t.startDate)+r*c][t.timeSel]?T[i.formateDayTime(t.startDate)+r*c][t.timeSel]={minuteRemain:T[i.formateDayTime(t.startDate)+r*c][t.timeSel].minuteRemain-t.duration*t.plays}:T[i.formateDayTime(t.startDate)+r*c][t.timeSel]={minuteRemain:60*(t.eTime-t.sTime)-t.duration*t.plays}}for(var s=0;s<t.programs.length;s++){var o={id:t.programs[s].id,name:t.programs[s].name,size:t.programs[s].size,materials:t.programs[s].materials,duration:t.programs[s].duration,content:t.programs[s].content,startDate:t.programs[s].startDate.toString(),endDate:t.programs[s].endDate.toString(),stype:t.programs[s].stype};1==t.programs[s].stype&&(o.startTime=t.programs[s].startTime,o.endTime=t.programs[s].endTime,o.plays=t.programs[s].plays),"saveAs"==r.type||r.id?i.formateDayTime(o.endDate)>=Date.parse(f)&&a(o):a(o)}r.id&&"saveAs"!=r.type&&(e.scheduleName=t.name),r.pos&&(e.schedulePos=r.pos),n()}),e.callServer=function(t){i.initTable(e,t,i.api.program+"getProgramList")},e.initPage=function(){e.callServer(e.tableState)},e.$on("emitGroupLeaf",function(t,a,r){e.sp.oid==a.id&&e.sp.gid==r.id||(e.currentGroup=a,e.sp.oid=a.id,e.sp.gid=r.id,e.initPage())}),e.showProgram=function(e){e.pid=e.id,i.showProgram(e)},e.add=function(t){i.confirmDialog(540,"添加排期",{},"tpl/add_schedule.html",function(a,r){if(r.modalForm.$valid&&!r.showTip&&r.data.endDate>=r.data.startDate){var s={id:t.id,name:t.name,size:t.size,materials:t.materials,duration:t.duration,content:t.content,startDate:r.data.startDate,endDate:r.data.endDate,stype:r.stype};1==r.stype&&(s.sTime=60*r.start_h+r.start_m,s.eTime=60*r.end_h+r.end_m,s.timeSel=s.sTime+"-"+s.eTime,s.startTime=i.formateDay(r.start_h)+":"+i.formateDay(r.start_m),s.endTime=i.formateDay(r.end_h)+":"+i.formateDay(r.end_m),s.plays=r.data.plays);var o=d(s);o.check?i.confirmAlert("提示",o.cross[0].msg.info,"warning"):(a.close(),e.playListId.push(s.id),e.playList.push(s),n())}else r.isShowMessage=!0},function(e){e.instructions="<p>1、如果排期中只有全天轮播，则每个节目轮流播放。</p>",e.instructions+="<p>2、如果排期中只有按次数轮播，则按次数轮播节目在设置的时段内按比例轮播，在设置以外的时段轮流播放。如：节目A设置9:00-12:00至少播5次，节目B设置9:00-12:00至少播10次，则9:00-12:00内，节目B每播2次，节目A播1次，9:00-12:00以外的时段则按1:1轮流播放。</p>",e.instructions+="<p>3、如果排期中包含以上二种播放方式，则按次数轮播节目只在设置时段内播，其它时段播放全天轮播节目。如：节目A、B按次数轮播，时段为9:00-12:00，节目C全天轮播，则9:00-12:00播节目A、B，其它时段播节目C。</p>",e.start_h=0,e.start_m=0,e.end_h=24,e.end_m=0,e.showTip=!1,e.selectH=[],e.selectM=[];new Date;e.today=f,e.maxDate=g;for(var t=0;t<25;t++)e.selectH.push({name:t+"时",value:t});for(var t=0;t<60;t++)e.selectM.push({name:t+"分",value:t});e.data.startDate=h,e.data.endDate="",e.stype=0,e.formDate=function(t,a,r){e.data[r]=t._i.split("-").join("")},e.checkTime=function(){24==e.start_h&&(e.start_m=0),24==e.end_h&&(e.end_m=0),parseFloat(e.end_h+e.end_m/60)<=parseFloat(e.start_h+e.start_m/60)?e.showTip=!0:e.showTip=!1}})},e.saveSchedule=function(){e.scheduleNameForm.$valid?i.confirm("提示","确定保存排期："+e.scheduleName+"?",function(t,a){a.isPosting=!0,i.postData(i.api.programSchedule+"saveProgramSchedule",{id:"saveAs"!=r.type&&r.id?r.id:"",name:e.scheduleName,programs:JSON.stringify(e.playList)},function(e){i.alert("添加成功","success"),i.goToUrl("dashboard/schedule")})}):(e.isShowMessage=!0,window.scrollTo(0,0))},e.del=function(t){if(1==t.stype)for(var a=(i.formateDayTime(t.endDate)-i.formateDayTime(t.startDate))/c,r=0;r<=a;r++)T[i.formateDayTime(t.startDate)+r*c][t.timeSel]={minuteRemain:T[i.formateDayTime(t.startDate)+r*c][t.timeSel].minuteRemain+t.duration*t.plays};e.playList=i.removeAryId(e.playList,t.id),e.playListId=i.removeAry(e.playListId,t.id),n()}}]);