//////////////////////////////////////////////////
//
//	jQuery GPS
//
//////////////////////////////////////////////////

$(window).load(function() {
 		 update_img();
});

var img = new Image();
img.src = "t-shirt.jpg";

function update_img(){
	//描画コンテキストの取得
	var canvas = document.getElementById('a_canvas');
	if (canvas.getContext) {
		var context = canvas.getContext('2d');

	   	context.drawImage(img, 0, 0);
		context.textAlign = "center";
		context.font = "40pt Arial";
		context.fillText("loading...", 340, 340);
/*
	   	var inputname = document.listname_form.listname_text.value;

	   	if (inputname == "") {
	   		inputname = document.listname_form.listname_text.placeholder;
	   	};

		context.font = "20pt Arial";
		context.fillStyle = 'rgba(255, 255, 255, 1)';
		context.strokeStyle = 'rgba(255, 255, 255, 1)';
		context.shadowColor = 'black';
		context.shadowOffsetX = 2;
	  	context.shadowOffsetY = 2;
  		context.shadowBlur = 4;
		context.textAlign = "center";
		context.fillText(inputname, 400, 380); */

	   	context.drawImage(img, 0, 0);
	};
};

$(function(){
	//GPS情報取得を開始
	$('#start_gps').click(function(){
		navigator.geolocation.watchPosition(
			function(position){
				/*
				$('#latitude').html(position.coords.latitude); //緯度
				$('#longitude').html(position.coords.longitude); //経度
				*/

				var url="https://api.foursquare.com/v2/venues/search";
				var id="ZFOPLOQQS0IU10UA322AWCDEU5NL5VGDXSR4QIFYFLNZAYXR"
				var secret="1PZPDQPDILWYPSHMZ0QOR0QP5AJLBSGNRD24AHAYXARB1UEG"

				$.get(
				    url,
				    {ll : position.coords.latitude+","+position.coords.longitude, client_id : id, client_secret:secret,v:"20140905"},
				    function(data) {
				    	var	result =data.response.venues; 
//						console.log(data.response.venues);
						var list ="";  
						for(var i=0;i<30;i++){
							console.log(result[i]);
							list += "<td>"+result[i].name+"</td>";
						}
						//結果を出力
//						$(".results").innerHTML = list;
				    }
				);

			}
		);
	});
});