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

var id;


$("#img_button").on( "click", function() {
	$("#up_img").attr("src",$("#img").val());
});

$("#submit").on("click",function() {

	
	// var name = $("#name").val();
	add_info();
	alert("Done");
	var href = "index.html";
	window.location.href = href;
	
	
	//alert(description);
	


});
function add_info()
{
	var tag_id;
	itemNumRef.once("value").then(function(snapshot) {
		var item_id = snapshot.val();

		database.ref("item/" + item_id).set({
			"item_id":item_id,
			"item_name":$("#name").val(),
			"image_src":$("#img").val(),
			"seller_num":0,
			"requst_num":0,
			"description":$("#description").val(),
			"min_price":0
		});
		itemTagRef.push({
			item_id:item_id,
			item_tag:$("#tag").val()
		
		})
		itemNumRef.set(item_id+1);
	});



}

