//Global Variable : static
var firebase_url = "https://hevetica-e4d31.firebaseio.com/";
var firebase_api_key = "AIzaSyAqbt-WXCdum0_Hfxh4tWSUOOYDHROswdE";
var firebase_config = {
  apiKey: firebase_api_key,
  databaseURL: firebase_url
};
firebase.initializeApp(firebase_config);
var database = firebase.database();
var itemRef = database.ref("item");
var itemNumRef = database.ref("item_num");
var itemTagRef = database.ref("item_tag");
var itemSellerRef = database.ref("item_seller");
var userRef = database.ref("user");

//Global Variable : dynamic
var item = [];

//functions
function onclickSearch(){
	$('#search_submit').click(function() {
		//console.log("beginning");

		var search_input = $('#search_input').val();
		if (search_input != ""){
			//console.log(search_input);
			searchItem(search_input);
			searchTag(search_input);
		}else {
			console.log("search nothing");
			//not implemented
			//window.open('.html','1494164703883','width=300,height=200,toolbar=0,menubar=0,location=0,status=0,scrollbars=0,resizable=1,left=0,top=0');
		}
    });
}

function onclickCart(){
	$('#shopping-cart-button').click(function() {
		location.href = "shopping_cart.html?user_id=" + 0;
    });
}

function refresh_item_table(){
	$("#resultTable_stock div").remove();
	$("#resultTable_nostock div").remove();
	for(var i=0;i<item.length;i++) {

		var product_page_url = "product_page.html?item_id=" + item[i]["item_id"];

		if (item[i]["seller_num"] > 0){
			$("#resultTable_stock").append(
				`<div class="col-lg-3">
					<img class="img-circle" src=${item[i]["image_src"]} alt="Generic placeholder image" width="140" height="140">
					<h2>${item[i]["item_name"]}</h2>
					<p>Lowest Price : $ ${item[i]["min_price"]}</p>
					<p><a class="btn btn-default" href=${product_page_url} role="button">View details &raquo;</a></p>
				</div>`
			);
		}else {
			$("#resultTable_nostock").append(
				`<div class="col-lg-3">
					<img class="img-circle" src=${item[i]["image_src"]} alt="Generic placeholder image" width="140" height="140">
					<h2>${item[i]["item_name"]}</h2>
					<p>Lowest Price : "No stock"</p>
					<p><a class="btn btn-default" href=${product_page_url} role="button">View details &raquo;</a></p>
				</div>`
			);
		}
	}

	$("#resultTable_nostock").append(
		`<div class="col-lg-3">
			<a class="btn btn-default no-border" href="request.html" role="button">
				<img class="img-circle" src="https://image.freepik.com/free-icon/add-button-with-plus-symbol-in-a-black-circle_318-48599.jpg" alt="Generic placeholder image" width="150" height="150">
				<h3>Request unregistered item</h3>
			</a>
        </div>`
	);
}

function searchItem (search_input){
	itemRef.once("value", function(snapshot) {
	  	item = [];
	  	snapshot.forEach(function(child) {
	    	var single_val = child.val();
	    	//console.log(single_val);
	    	if(single_val["item_name"].includes(search_input)){
	    		item.unshift({"item_id":single_val["item_id"],
	    						"item_name":single_val["item_name"],
	    						"seller_num":single_val["seller_num"],
	    						"requst_num":single_val["requst_num"],
	    						"description":single_val["description"],
	    						"min_price":single_val["min_price"]});
	    	}
	  	});
		refresh_item_table();
	});
}

function searchTag (search_input){
	itemTagRef.once("value", function(snapshot){
		snapshot.forEach(function(child) {
	    	var single_val = child.val();
	    	if (single_val["item_tag"].includes(search_input)) {
	    		//console.log("comes here?");
	    		searchItemID(single_val["item_id"]);
	    	};
	  	});
	});
}

function searchItemID (item_id){
	itemRef.once("value", function(snapshot) {
	  	snapshot.forEach(function(child) {
	    	var single_val = child.val();
	    	//console.log(single_val);
	    	if(single_val["item_id"] == item_id){
	    		item.unshift({"item_id":single_val["item_id"],
	    						"item_name":single_val["item_name"],
	    						"seller_num":single_val["seller_num"],
	    						"requst_num":single_val["requst_num"],
	    						"description":single_val["description"],
	    						"min_price":single_val["min_price"]});
	    	}
	  	});
		refresh_item_table();
	});
}

function enterListner(e) {
	if (e.keyCode == 13) {
		if (search_input != ""){
	        var search_input = $('#search_input').val();
			searchItem(search_input);
			searchTag(search_input);
			return true;
		}else {
			console.log("search nothing");
			//not implemented
			//window.open('.html','1494164703883','width=300,height=200,toolbar=0,menubar=0,location=0,status=0,scrollbars=0,resizable=1,left=0,top=0');
		}
    }
}

function tempPush(){
	/*itemNumRef.once("value").then(function(snapshot) {
		var item_id = snapshot.val();

		database.ref("item/" + item_id).set({
			"item_id":item_id,
			"item_name":"nimbus 9000",
			"image_src":"https://cdn2.iconfinder.com/data/icons/social-media-8/512/bell.png",
			"seller_num":1,
			"requst_num":0,
			"description":"nothing in mind",
			"min_price":100.0
		});
		itemNumRef.set(item_id+1);
	});

	
	itemTagRef.push({
		"item_id":0,
		"item_tag":"baseballbat"
	});

	itemSellerRef.push({
		"item_id":0,
		"user_id":0,
		"price":"100.0"
	});

	userRef.push({
		"user_id":"0",
		"user_name":"Eojin Rho"
	});*/

	/*itemNumRef.once("value").then(function(snapshot) {
		var item_id = snapshot.val();

		database.ref("item/" + item_id).set({
			"item_id":item_id,
			"item_name":"exo bat",
			"image_src":"https://cdn2.iconfinder.com/data/icons/social-media-8/512/bell.png",
			"seller_num":0,
			"requst_num":0,
			"description":"what's diff?",
			"min_price":300.0
		});
		itemNumRef.set(item_id+1);
	});

	
	itemTagRef.push({
		"item_id":1,
		"item_tag":"baseballbat"
	});*/
}


//Main

onclickSearch();
onclickCart();
tempPush();