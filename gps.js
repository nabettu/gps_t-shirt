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

				var img_map = new Image,
			    canvas2 = document.createElement("canvas"),
			    ctx = canvas2.getContext("2d"),
			    src = "http://maps.googleapis.com/maps/api/streetview?size=300x300&location="+lat+","+lon+"&sensor=false"; // insert image url here

				img_map.crossOrigin = "Anonymous";


				img_map.src = src;
				// make sure the load event fires for cached images too
				if ( img_map.complete || img_map.complete === undefined ) {
				    img_map.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
				    img_map.src = src;
				}

				img_map.onload = function() {
				    canvas2.width = img_map.width;
				    canvas2.height = img_map.height;
				    ctx.drawImage( img_map, 0, 0 );
				    localStorage.setItem( "savedImageData", canvas2.toDataURL("image/png") );
				    console.log(localStorage.savedImageData);
				}

				img_sv.src = localStorage.savedImageData;
				img_sv.onload = function(){

					context.drawImage(img_sv, 190, 180);
					
					console.log("読み込みが終わりました");

					img_sv.crossOrigin = "Anonymous";

				    var imgd = context.getImageData(190, 180, 300, 300);
					var pix = imgd.data;
					for (var i = 0, n = pix.length; i < n; i += 4) {
						var grayscale = pix[i  ] * .3 + pix[i+1] * .59 + pix[i+2] * .11;

						pix[i  ] = grayscale; // 赤
						pix[i+1] = grayscale; // 緑
						pix[i+2] = grayscale; // 青
						// アルファ
					}
					context.putImageData(imgd, 190, 180);
						
				}

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