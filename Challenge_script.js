function generateUserTable(data){
	let idx = 0;
	let tbody = document.getElementById('users').querySelector('tbody');
	tbody.innerHTML = '';
	for(idx = 0; idx < data.length; idx++){
		let colID = '<td>'+data[idx].id+'</td>'; //<td>1</td>
		let colName = '<td>'+data[idx].name+'</td>';//<td>Leanne Graham</td>
		let colEmail = '<td>'+data[idx].email+'</td>';//<td>Sincere@april.biz</td>
		//let colAddress = '<td>'+data[idx].address.street+' '+data[idx].address.suite+' '+data[idx].address.city+'</td>';
		let colCompanyName = '<td>'+data[idx].company.name+ '</td>';//<td>Romaguera-Crona</td>
		let btnShowPost = '<td><button class="button-posts" userId='+data[idx].id +' onclick="loadPosts('+data[idx].id+')">Show Posts</button></td>';
		//<td><button class="button-posts" userId='1' onclick="loadPosts('1')">Show Posts</button></td>		
		let newRow = '<tr>'+colID+colName+colEmail+colCompanyName+btnShowPost+'</tr>';
		/*
			<tr>
				<td>1</td>
				<td>Leanne Graham</td>
				<td>Sincere@april.biz</td>
				<td>Romaguera-Crona</td>
				<td><button class="button-posts" userId='1' onclick="loadPosts('1')">Show Posts</button></td>
			</tr>
		*/
		tbody.innerHTML += newRow;
	}
}

function loadUserData(){
	let request = new XMLHttpRequest();
	let url ='https://jsonplaceholder.typicode.com/users';
	request.open('GET', url, true);

	request.onload = function(){
		if (request.status == 200) {
			let data = JSON.parse(request.responseText);
			//console.log('id:'+data[0].id);
			generateUserTable(data);
		}
		else{
			alert('Page Not Found');
		}
	}
	request.onerror = function(){
		alert('Request Failed! Check your internet connection');
	}
	request.send();
}

function onDocumentFinish(){
	loadUserData();
}

function showPosts(data){
	let idx = 0;
	let div = document.getElementById('user-posts');
	div.innerHTML = '';
	for(idx = 0; idx < data.length; idx++){
		let title = '<p style="text-transform: uppercase;"><b>TITLE: "'+data[idx].title+'"</b></p>';
		let body = '<p>...'+data[idx].body+'</p>';
		let btnShowComments = '<button class="button-comments" postId='+data[idx].id+' onclick="loadComments('+data[idx].id+')">Show Comments</button>';
		let newDiv = '<div id="comment-'+data[idx].id+'" class="box">'+title+body+btnShowComments+'</div>';
		div.innerHTML += newDiv;
	}
}

function loadPosts(id){
	let request = new XMLHttpRequest();
	let url ='https://jsonplaceholder.typicode.com/posts/?userId='+id;
	request.open('GET', url, true);

	request.onload = function(){
		if(request.status == 200){
			let data = JSON.parse(request.responseText);
			showPosts(data);
		}
		else{
			alert('Page Not Found');
		}
	}
	request.onerror = function(){
		alert('Request Failed! Check your internet connection');
	}
	request.send();
}

function showComments(data,id){
	let idx = 0;
	let div = document.getElementById('comment-'+id);
	document.getElementById('comment-'+id).querySelector('button').setAttribute("class","hidden");
	div.innerHTML = div.innerHTML.replace('...','');
	div.innerHTML += '<p><b>Comments:</b></p>';
	for(idx = 0; idx < data.length; idx++){
		let title ='<b>'+data[idx].name+'</b>';
		let email = '<b>('+data[idx].email+')</b>';
		let body = 'commented: "'+data[idx].body+'"';
		let newDiv = '<div style="margin:10px;">'+title+' '+email+' '+body+'</div>';
		div.innerHTML += newDiv;
	}
}

function loadComments(id){
	let request = new XMLHttpRequest();
	let url = 'https://jsonplaceholder.typicode.com/posts/1/comments/?postId='+id;
	request.open('GET', url, true);
	
	request.onload = function(){
		if (request.status == 200) {
			let data = JSON.parse(request.responseText);
			showComments(data,id);
		}
		else{
			alert('Page Not Found');
		}
	}
	request.onerror = function(){
		alert('Request Failed! Check your internet connection');
	}
	request.send();
}