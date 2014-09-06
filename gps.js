//////////////////////////////////////////////////
//
//	jQuery GPS
//
//////////////////////////////////////////////////

var img = new Image();
var img_sv = new Image();
img.src = "t-shirt.jpg";

var lat=0;
var lon=0;

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

//位置情報取得
		navigator.geolocation.watchPosition(
			function(position){

//forsquareAPI
				var url="https://api.foursquare.com/v2/venues/search";
				var id="ZFOPLOQQS0IU10UA322AWCDEU5NL5VGDXSR4QIFYFLNZAYXR"
				var secret="1PZPDQPDILWYPSHMZ0QOR0QP5AJLBSGNRD24AHAYXARB1UEG"

				lat=position.coords.latitude;
				lon=position.coords.longitude;

				img_sv.src = "http://maps.googleapis.com/maps/api/streetview?size=300x300&location="+lat+","+lon+"&sensor=false";
				context.drawImage(img_sv, 190, 170);

				$.get(
				    url,
				    {ll : lat+","+lon, client_id : id, client_secret:secret,v:"20140905", limit:1},
				    function(data) {
				    	var	result =data.response.venues; 
						console.log(result[0].name);

						context.textAlign = "center";
						var fontsize =10;
						context.font = fontsize + "pt Arial";

						context.fillStyle = 'rgba(0, 0, 0, 1)';
						context.fillRect(340-(fontsize*15), 155, fontsize*30, fontsize+10)

						context.fillStyle = 'rgba(255, 255, 255, 1)';
						context.fillText(result[0].name, 340, 170);

						//settimeout("gray()",3000);
					    var imgd = context.getImageData(190, 170, 300, 300);
						var pix = imgd.data;
						for (var i = 0, n = pix.length; i < n; i += 4) {
							var grayscale = pix[i  ] * .3 + pix[i+1] * .59 + pix[i+2] * .11;
							pix[i  ] = grayscale; // 赤
							pix[i+1] = grayscale; // 緑
							pix[i+2] = grayscale; // 青
							// アルファ
						}
						context.putImageData(imgd, 190, 170);
				    }
				);

			}
		);

	   	//context.drawImage(img, 0, 0);
	};
};
/*
function gray(){
	var canvas = document.getElementById('a_canvas');
	if (canvas.getContext) {
		var context = canvas.getContext('2d');
	    var imgd = context.getImageData(190, 170, 300, 300);
		var pix = imgd.data;
		for (var i = 0, n = pix.length; i < n; i += 4) {
			var grayscale = pix[i  ] * .3 + pix[i+1] * .59 + pix[i+2] * .11;
			pix[i  ] = grayscale; // 赤
			pix[i+1] = grayscale; // 緑
			pix[i+2] = grayscale; // 青
			// アルファ
		}
		context.putImageData(imgd, 190, 170);
	}
}*/