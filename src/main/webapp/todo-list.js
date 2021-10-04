
function updateList(items) {
    $("#my-list").html("");
    
    Object.keys(items).forEach(function (k) {
	
    	var li = document.createElement("li");
		var item = document.createTextNode(items[k]+" ");
		
		var timestamp = document.createTextNode(" "+createTimeStamp()+" ");
		
    	var closeCheck = document.createElement('input');
    	closeCheck.type = "checkbox";
		
    	closeCheck.addEventListener('change', function() {
  			if (this.checked) {
    			deleteItem(k);
			}
    	});
		
		var span = document.createElement('span');
		
		span.appendChild(timestamp);
		
		li.appendChild(item);
		li.appendChild(span);
		li.appendChild(closeCheck);
    	
		$("#my-list").append(li);
    })
}

function createTimeStamp(){
	var now = new Date();

	var hours = rightTimeFormat(now.getHours());
	var mins = rightTimeFormat(now.getMinutes());
	var date = rightTimeFormat(now.getDate());
	var month = rightTimeFormat(now.getMonth());
	var year = now.getFullYear();
	
	return hours + ":" + mins+ " " + date + "-" + month + "-" + year;
	
}

function rightTimeFormat(time) {
	upd_time = time > 9? time : "0" + time; 
		
	return upd_time;
}

function deleteItem(id) {	
	$.ajax({
	    url : 'services/items/' + id,
	    type : 'DELETE',
	    success : function() {
            getListItems();
        }
	});
}

function getListItems() {
    $.ajax({
        url : 'services/items',
        dataType : 'json',
        success : function(r) {
            updateList(r);
        }
    });
}

const validate = (text) => {
	
	const REGEXP = /^\s*$/g;
    return REGEXP.test(text);
}

function sendListItem() {
	
	if (validate($("#texttosend").val())){
		
		alert("You must write something!");
		
	}else{
		var listItem = $("#texttosend").val();
		
		try{
			$.post("services/items", {
				newEntry : listItem
			}, function() {
				getListItems();
			});
		}catch(exception){
			throw exception;
		}
	
	}
}

function clearList() {
	$.ajax({
	    url : 'services/items',
	    type : 'DELETE',
	    success : function(r) {
            updateList(r);
        }
	});
}

$(document).ready(function() {
	getListItems();
	
	try{
		$("#send-item").on('click', function() {
			sendListItem();
		});
	}catch(exception){
		alert("No more than 10 items!");
	}
});
		
$(document).ready(function() {
	$("#clear-list").on('click', function() {
		clearList();
	});
});
	