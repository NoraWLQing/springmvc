
$(function() {
	$('#dg').datagrid({
	    url:"../../opinion/queryOpinion?random"+parseInt(Math.random()*100000),
	    method:"POST",
	    showFooter: true,
	    loadMsg:"请稍等.....",
	    rownumbers:true,
	    singleSelect:true,
	    checkOnSelect:true,
	    queryParams:{},
	    idField:'opinionid',
		 width:'100%',    
		 height:'auto',
		 fitColumns:true,
		 pagination:true,
	    pageNumber:1,
	    pageSize:10,
	    pageList:[10,20,30,40,50],
	    beforePageText: '第',//页数文本框前显示的汉字  
        afterPageText: '页    共 {pages} 页',  
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',  
	    columns:[[
	    	 	  {field:'opinionid',title:'提案ID',width:$(this).width()*0.15,hidden:true},
	    	 	  {field:'opinionTitle',title:'提案标题',width:$(this).width()*0.15},
	    	 	  {field:'userid',title:'提案人ID',width:$(this).width()*0.15,hidden:true},
	    	 	  {field:'createtime',title:'创建时间',width:$(this).width()*0.15},
	    	 	  {
	    	 		  field:'approveState',
	    	 		  title:'审核状态',
	    	 		  width:$(this).width()*0.15,
	    	 		  formatter:function(val,row){
			                if (val == '0'){
			                    return '未审核';
			                } 
			                else if (val == '1'){
			                    return '已审核';
			                }
			              	else if (val == '2'){
			                    return '审核为通过';
			                }
			                else {
			                    return '未知状态';
			                }
		            	},
	    	 	  },
	    	 	  {field:'opinionContent',title:'提案内容',width:$(this).width()*0.15,hidden:true},
	    	 	  {field:'approveUserid',title:'核查人ID',width:$(this).width()*0.15,hidden:true},
	    	 	  {field:'approveTime',title:'核查时间',width:$(this).width()*0.15}
	    ]],
	     onLoadError:function(){
                  alert('','加载数据失败！');
         },
         onLoadSuccess:function(){
         }
	});
	
	$("#query").click(
		function () {
			$('#dg').datagrid('reload',{
				opinionTitle: $('#opinionTitle').val()
			}).datagrid("clearSelections");
		});
	
	
	
	$("#add").click(
		function () {
			$('#myModal').modal({
  				keyboard: false
			});
			
			$("#dg").datagrid("clearSelections");
			$('#modal_form')[0].reset();
			$('#opinionContentModal').ckeditor();
	});
	
	
	$("#modify").click(
		function () {
			var row = $("#dg").datagrid("getSelected");
			
			if(row == null || row == "undefined"){
				$.messager.alert("操作提示", "请选择一行记录","info");
			}
			else{
		    	 	  $("#opinionidModal").val(row.opinionid);
		    	 	  $("#opinionTitleModal").val(row.opinionTitle);
		    	 	  $("#opinionContentModal").val(row.opinionContent);
				$('#myModal').modal({
	  				keyboard: false
				});
				$('#opinionContentModal').ckeditor();
			}
	});
	
	/**
	 * 新增或者更新
	 */
	$("#add_modify_modal").click(
		function (){
			var row = $("#dg").datagrid("getSelected");
			
			//新增
			if(row == null ||  row == "undefined"){
				var opinionid = $("#opinionidModal").val();
				var opinionTitle = $("#opinionTitleModal").val();
				var userid = $("#useridModal").val();
				var createtime = $("#createtimeModal").val();
				var approveState = $("#approveStateModal").val();
				var opinionContent = $("#opinionContentModal").val();
				var approveUserid = $("#approveUseridModal").val();
				var approveTime = $("#approveTimeModal").val();
				
				$.ajax({
				   type: "POST",
				   url: "../../opinion/addOpinion?random"+parseInt(Math.random()*100000),
				   data: {
							opinionid:opinionid,
							opinionTitle:opinionTitle,
							userid:userid,
							createtime:createtime,
							approveState:approveState,
							opinionContent:opinionContent,
							approveUserid:approveUserid,
							approveTime:approveTime
				   },
				   success: function(msg){
				     $.messager.alert("操作提示", $.parseJSON(msg),"info");
				     $('#dg').datagrid('reload');
				     $("#dg").datagrid("clearSelections");
				   }
				});
			}
			else{
				var opinionid = row.opinionid;
				var opinionid = $("#opinionidModal").val();
				var opinionTitle = $("#opinionTitleModal").val();
				var userid = $("#useridModal").val();
				var createtime = $("#createtimeModal").val();
				var approveState = $("#approveStateModal").val();
				var opinionContent = $("#opinionContentModal").val();
				var approveUserid = $("#approveUseridModal").val();
				var approveTime = $("#approveTimeModal").val();
				$.ajax({
				   type: "POST",
				   url: "../../opinion/modifyOpinion?random"+parseInt(Math.random()*100000),
				   data: {
							opinionid:opinionid,
							opinionTitle:opinionTitle,
							userid:userid,
							createtime:createtime,
							approveState:approveState,
							opinionContent:opinionContent,
							approveUserid:approveUserid,
							approveTime:approveTime
				   },
				   success: function(msg){
				     $.messager.alert("操作提示", $.parseJSON(msg),"info");
				     $('#dg').datagrid('reload');
				     $("#dg").datagrid("clearSelections");
				   }
				});
			}
		}
	);
	
	
	
	
	$("#delete").click(
		function () {
			var row = $("#dg").datagrid("getSelected");
			if(row == null || row == "undefined"){
				$.messager.alert("操作提示", "请选择一行记录","info");
			}
			else{
				 $.messager.confirm("操作提示", "您确定要执行操作吗？", function (data) {
		         	if (data) {
		         		$.ajax({
						   type: "POST",
						   url: "../../opinion/deleteOpinion?random"+parseInt(Math.random()*100000),
						   data: {
								opinionid:row.opinionid
						   },
						   success: function(msg){
						     $.messager.alert("操作提示", $.parseJSON(msg),"info");
						     $('#dg').datagrid('reload');
						     $("#dg").datagrid("clearSelections");
						   }
						});
		            }
		            else {
		                return false;
		            }
		         });
			}
			
	});
	
	
});

