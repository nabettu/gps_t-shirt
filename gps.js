//////////////////////////////////////////////////
//
//	jQuery GPS
//
//////////////////////////////////////////////////

var img = new Image();
img.src = "t-shirt.jpg";

$(window).load(function() {
	var canvas = document.getElementById('a_canvas');
	if (canvas.getContext) {
		var context = canvas.getContext('2d');

	   	context.drawImage(img, 0, 0);
	   }
	}
);


function update_img(){
	//描画コンテキストの取得
	var canvas = document.getElementById('a_canvas');
	if (canvas.getContext) {
		var context = canvas.getContext('2d');

	   	context.drawImage(img, 0, 0);
		context.textAlign = "center";
		var fontsize =10;
		context.font = fontsize + "pt Arial";

		context.fillStyle = 'rgba(0, 0, 0, 1)';
		context.fillRect(340-(fontsize*15), 155, fontsize*30, fontsize+10)


//位置情報取得
		navigator.geolocation.watchPosition(
			function(position){

//forsquareAPI
				var url="https://api.foursquare.com/v2/venues/search";
				var id="ZFOPLOQQS0IU10UA322AWCDEU5NL5VGDXSR4QIFYFLNZAYXR"
				var secret="1PZPDQPDILWYPSHMZ0QOR0QP5AJLBSGNRD24AHAYXARB1UEG"

				$.get(
				    url,
				    {ll : position.coords.latitude+","+position.coords.longitude, client_id : id, client_secret:secret,v:"20140905", limit:1},
				    function(data) {
				    	var	result =data.response.venues; 
						console.log(result[0].name);

						context.fillStyle = 'rgba(255, 255, 255, 1)';
						context.fillText(result[0].name, 340, 170);
				    }
				);

			}
		);

	   	//context.drawImage(img, 0, 0);
	};
};