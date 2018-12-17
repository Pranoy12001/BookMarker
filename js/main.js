//listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

//save bookmarks
function saveBookmark(e){
	var siteName = document.getElementById("siteName").value;
	var siteUrl = document.getElementById("siteURL").value;

	var bookMark = {
		name : siteName,
		url : siteUrl
	};
	

	//test if bookmark is null
	if(localStorage.getItem("bookmarks") === null){
		//init an array
		var bookmarks = [];

		//add to array
		bookmarks.push(bookMark);
		//set to the local storage
		localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
	}else{
		//get bookmarks from localstorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//add to the array
		bookmarks.push(bookMark);
		//reset to the local storage
		localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
	}

	//re-fetch bookmarks
	fetchBookMarks();
	
	//prevent form from submitting
	e.preventDefault();

}

//delete bookmark
function deleteBookmark(url){
	//get bookmarks from local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	for(var i = 0; i < bookmarks.length; i++){
		if(bookmarks[i].url == url){
			//remove from array
			bookmarks.splice(i,1);
		}
	}
	//re-set back to localstorage
	localStorage.setItem("bookmarks",JSON.stringify(bookmarks));

	//re-fetch bookmarks
	fetchBookMarks();
}

//fetch the output
function fetchBookMarks(){
	//get bookmarks from local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//get output id

	var bookmarksResults = document.getElementById('bookmarksResults');

	//build output

	bookmarksResults.innerHTML = '';

	for(var i=0; i<bookmarks.length; i++){
		var site = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class = "well">' + 
									   '<h3>'+ site +
									   '&nbsp<a class="btn btn-primary" target = "_blank" href= "'+ url +'"> Visit </a>&nbsp'+
									   '<a onclick="deleteBookmark(\'' + url +'\')" class="btn btn-danger" href= "#"> Detete </a>' +
									   '</h3>'+
									   '</div>'

	}
}