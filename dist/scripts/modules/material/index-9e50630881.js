"use strict";angular.module("sbAdminApp").controller("materialCtrl",["$scope","$rootScope","$stateParams","baseService","leafService","FileUploader",function(e,i,t,a,r,n){e.displayed=[],e.sp={},e.tableState={},e.ids=[],e.idsNoSubmitCheck=[],e.leafes=[],e.currentGroup=i.rootGroup,e.sp.oid=e.currentGroup.id,e.currentLeaf={},e.currentLeaf.id="",e.sp.gid="",e.callServer=function(i){e.ids=[],a.initTable(e,i,a.api.material+"getMaterialList")},e.getGroups=function(i){r.getLeafes(a.api.material+"getMaterialGroups",i,function(i){e.leafes=i})},e.initPage=function(){e.tableState.pagination.start=0,e.ids=[],e.callServer(e.tableState)},e.$on("emitGroupLeaf",function(i,t){e.sp.oid!=t.id&&(e.currentGroup=t,e.sp.oid=t.id,e.sp.gid="",e.initPage(),e.getGroups(e.sp.oid))}),e.getGroups(e.currentGroup.id),e.addGroup=function(){r.addGroup(a.api.material+"optGroupSave",e.currentGroup.id,function(){e.getGroups(e.currentGroup.id),a.alert("添加成功","success")})},e.setGroup=function(){var i=e.ids.join(",");r.setGroup(a.api.material+"setOrganization",i,function(){e.getGroups(e.currentGroup.id),a.alert("设置成功","success"),e.initPage()})},e.chooseLeaf=function(i,t){e.currentLeaf.id=i,e.sp.gid=i,e.initPage()},e.setLeaf=function(){var i=e.ids.join(",");r.setLeaf(a.api.material+"setGroupRelations",e.currentGroup.id,i,e.leafes,function(){a.alert("设置成功","success",!0),e.initPage()})},e.cancelLeaf=function(){var i=e.ids.join(",");r.cancelLeaf(a.api.material+"setGroupRelations",i,e.currentLeaf,function(){a.alert("设置成功","success",!0),e.initPage()})},e.editLeaf=function(i,t){function n(){var t=u.val();""==t||t==c?(u.val(c),o.removeClass("edit")):r.editLeaf(a.api.material+"optGroupSave",{id:i.id,name:t,oid:e.currentGroup.id},function(){o.removeClass("edit"),e.getGroups(e.currentGroup.id)},function(){s.text(c),u.val(c),o.removeClass("edit")})}var o=$(t.currentTarget).parents(".leafGroup"),s=$(t.currentTarget).parents(".leafGroup").children(".leafName"),u=$(t.currentTarget).parents(".leafGroup").children(".leafEdit").children("input"),c=u.val();o.addClass("edit"),u.focus(),u.blur(function(){n()}),u.bind("keydown",function(e){var i=e||window.event;13==(i.keyCode||i.which||i.charCode)&&n()})},e.delLeaf=function(i){r.delLeaf(a.api.material+"optGroupDel",i,function(){e.getGroups(e.currentGroup.id),a.alert("删除成功","success"),e.currentLeaf={},e.currentLeaf.id="",e.sp.gid="",e.callServer(e.tableState)})},e.showMaterial=function(e){a.showMaterial(e,1)},e.submitCheck=function(i){a.confirm("提交审核","是否提交审核？",function(t,r){r.isPosting=!0;var n="";n=i?i.id:e.idsNoSubmitCheck.length?e.idsNoSubmitCheck.join(","):"",""==n?(t.close(),a.alert("提交成功","success"),e.ids=[],e.idsNoSubmitCheck=[]):a.postData(a.api.material+"sumbmitCheck",{id:n},function(i){t.close(),a.alert("提交成功","success"),e.callServer(e.tableState),e.ids=[],e.idsNoSubmitCheck=[]})})},e.saveName=function(i){var t={name:i.name};a.confirmDialog(540,"编辑",t,"tpl/material_saveName.html",function(t,r){r.modalForm.$valid?(r.isPosting=!0,a.postData(a.api.material+"saveMaterial",{id:i.id,name:a.trim(r.data.name,"g")},function(){t.close(),e.callServer(e.tableState),a.alert(i?"修改成功":"添加成功","success")},function(e){r.isPosting=!1,a.alert(e,"warning",!0)})):r.isShowMessage=!0})},e.del=function(i){a.confirm("删除素材","确定删除素材："+i.name+"?",function(t,r){r.isPosting=!0,a.postData(a.api.material+"delMaterial",{id:i.id},function(i){t.close(),a.alert("删除成功","success"),e.callServer(e.tableState)})})},e.save=function(){a.confirmDialog(720,"添加素材",{},"tpl/material_save.html",function(e,t){if(t.uploader.queue.length){for(var r=[],n=0;n<t.uploader.queue.length;n++)t.uploader.queue[n].oid=t.currentGroup.id,t.uploader.queue[n].gid=t.currentLeaf.id,t.uploader.queue[n].file.desc=a.trim(t.uploader.queue[n].file.desc,"g"),r.push(t.uploader.queue[n].file.desc);a.postData(a.api.material+"addMaterial_checkUpload",{filenameArray:JSON.stringify(r)},function(e){if(e.length)for(var a=0;a<e.length;a++)t.uploader.queue[e[a].index].message=e[a].message,t.uploader.queue[e[a].index].oname=e[a].name;else t.closeThisDialog(),i.$broadcast("callUploader",t.uploader)})}else a.alert("请先选择文件","warning",!0)},function(t){t.sp={},t.sp.oid="",t.currentGroup=i.rootGroup,t.sp.oid=t.currentGroup.id,t.$on("emitGroupLeaf",function(e,i,a){t.sp.oid!=i.id&&(t.currentGroup=i)});t.uploader=new n({url:"http://dmbd4.oss-cn-hangzhou.aliyuncs.com"});t.uploader.filters.push({name:"customFilter",fn:function(e,r){if(this.queue.length>=10)return a.alert("上传队列达到最大值10个","warining",!0),!1;var n=e.name.substr(e.name.lastIndexOf(".")+1).toLowerCase(),o=","+n+",",s=",mp3,",u=t.imgfile_type=i.getRootDicNameStrs("image_format"),c=t.videofile_type=i.getRootDicNameStrs("video_format");if(-1==(","+u.toLowerCase()+",").indexOf(o)&&-1==(","+c.toLowerCase()+",").indexOf(o)&&-1==(","+s.toLowerCase()+",").indexOf(o)&&-1==(","+",zip,".toLowerCase()+",").indexOf(o))return a.confirmAlert("提示","上传的文件格式平台暂时不支持，目前支持的图片格式是:"+u+"，目前支持的视频格式是:"+c+"，目前支持的音频格式是:mp3","warning"),!1;if(-1!=(","+u.toLowerCase()+",").indexOf(o)){if(!(e.size>10485760))return!0;a.alert("不得上传大于10Mb的图片","warning",!0)}else if(-1!=(","+s.toLowerCase()+",").indexOf(o)){if(!(e.size>10485760))return!0;a.alert("不得上传大于10Mb的音乐","warning",!0)}else{if(!(e.size>524288e3))return!0;a.alert("不得上传大于500Mb的视频","warning",!0)}}}),t.uploader.onAfterAddingFile=function(e){var i=e.file.name.split(".");i.pop(),e.file.desc=i.join(",")},t.uploader.onCompleteItem=function(i,t,a,r){1!=t.code?(i.isSuccess=!1,i.isError=!0,i.errorMsg=t.message):e.initPage()}})},e.checkAll=function(i){if(e.ids=[],e.idsNoSubmitCheck=[],$(i.currentTarget).is(":checked"))for(var t=0;t<e.displayed.length;t++)e.ids.push(e.displayed[t].id),0==e.displayed[t].status&&e.idsNoSubmitCheck.push(e.displayed[t].id);else e.ids=[],e.idsNoSubmitCheck=[]},e.checkThis=function(i,t){$(t.currentTarget).is(":checked")?(e.ids.push(i.id),0==i.status&&e.idsNoSubmitCheck.push(i.id)):(e.ids=a.removeAry(e.ids,i.id),e.idsNoSubmitCheck=a.removeAry(e.idsNoSubmitCheck,i.id))},e.showTip=function(e){$(e.currentTarget).children(".btn").hasClass("disabled")&&$(e.currentTarget).children(".tipDiv").show()},e.hideTip=function(e){$(e.currentTarget).children(".tipDiv").hide()}}]);