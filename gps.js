//////////////////////////////////////////////////
//
//	jQuery GPS
//
//////////////////////////////////////////////////

var img = new Image();
var img_sv = new Image();
var img_m = new Image();
var img_m2 = new Image();
img.src = "t-shirt.jpg";
var img_chara = new Image();
img_chara.src = "chara.png";
var img_chara2 = new Image();
img_chara2.src = "chara2.png";

var lat=0;
var lon=0;

var imagewidth = 200;
var imageheight = 250;
var mapimagewidth = 100;
var mapimageheight = 100;
var satimagewidth = 200;
var satimageheight = 50;


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

				var img_map = new Image;
			    canvas2 = document.createElement("canvas");
			    ctx = canvas2.getContext("2d");
			    src = "http://maps.googleapis.com/maps/api/streetview?size="+imagewidth+"x"+imageheight+"&location="+lat+","+lon+"&sensor=false"; // insert image url here

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

				    var imgd = context.getImageData(190, 180, imagewidth, imageheight);
					var pix = imgd.data;
					for (var i = 0, n = pix.length; i < n; i += 4) {
						var grayscale = (pix[i  ] + pix[i+1] + pix[i+2] )/3;
						if(grayscale>126)grayscale=255;
						else grayscale = 0;

						pix[i  ] = grayscale; // 赤
						pix[i+1] = grayscale; // 緑
						pix[i+2] = grayscale; // 青
						// アルファ
					}
					context.putImageData(imgd, 190, 180);

					context.fillStyle = 'rgba(0, 0, 0, 1)';
					context.fillRect(190, 400, 200, 30)

					}

				var img_map2 = new Image;
				src2 = "http://maps.googleapis.com/maps/api/staticmap?size="+mapimagewidth+"x"+mapimageheight+"&center="+lat+","+lon+"&maptype=terrain&sensor=false&zoom=12"; // insert image url here
				img_map2.src = src2;
				canvas3 = document.createElement("canvas");
			    ctx2 = canvas3.getContext("2d");

				// make sure the load event fires for cached images too
				if ( img_map2.complete || img_map2.complete === undefined ) {
				    img_map2.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
				    img_map2.src = src2;
				}

				img_map2.onload = function() {
				    canvas3.width = img_map2.width;
				    canvas3.height = img_map2.height;
				    ctx2.drawImage( img_map2, 0, 0 );
				    localStorage.setItem("savedMapImageData", canvas3.toDataURL("image/png") );
				    console.log(localStorage.savedMapImageData);
				}

				img_m.src = localStorage.savedMapImageData;
				img_m.onload = function(){

					context.drawImage(img_m, 190, 445);
					
					console.log("読み込みが終わりました");

					img_m.crossOrigin = "Anonymous";

				    var imgd = context.getImageData(190, 445, mapimagewidth, mapimageheight);
					var pix = imgd.data;
					for (var i = 0, n = pix.length; i < n; i += 4) {
						var grayscale = (pix[i  ] + pix[i+1] + pix[i+2] )/3;
						if(grayscale>220)grayscale=255;
						else grayscale = 0;

						pix[i  ] = grayscale; // 赤
						pix[i+1] = grayscale; // 緑
						pix[i+2] = grayscale; // 青
						// アルファ
					}
					context.putImageData(imgd, 190, 445);
				}

/*
				var img_map3 = new Image;
				src3 = "http://maps.googleapis.com/maps/api/staticmap?size="+satimagewidth+"x"+satimageheight+"&center="+lat+","+lon+"&maptype=satellite&sensor=false&zoom=15"; // insert image url here
				img_map3.src = src3;
				canvas4 = document.createElement("canvas");
			    ctx3 = canvas4.getContext("2d");

				// make sure the load event fires for cached images too
				if ( img_map3.complete || img_map3.complete === undefined ) {
				    img_map3.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
				    img_map3.src = src3;
				}

				img_map3.onload = function() {
				    canvas4.width = img_map3.width;
				    canvas4.height = img_map3,height;
				    ctx3.drawImage( img_map3, 0, 0 );
				    localStorage.setItem( "savedSatImageData", canvas4.toDataURL("image/png") );
				    console.log(localStorage.savedsatImageData);
				}

				img_m2.src = localStorage.savedSatImageData;
				img_m2.onload = function(){

					context.drawImage(img_m2, 190, 445);
					/*
					console.log("読み込みが終わりました");

					img_m.crossOrigin = "Anonymous";

				    var imgd = context.getImageData(190, 445, mapimagewidth, mapimageheight);
					var pix = imgd.data;
					for (var i = 0, n = pix.length; i < n; i += 4) {
						var grayscale = (pix[i  ] + pix[i+1] + pix[i+2] )/3;
						if(grayscale>220)grayscale=255;
						else grayscale = 0;

						pix[i  ] = grayscale; // 赤
						pix[i+1] = grayscale; // 緑
						pix[i+2] = grayscale; // 青
						// アルファ
					}
					context.putImageData(imgd, 190, 445);
				}
*/
				$.get(
				    url,
				    {ll : lat+","+lon, client_id : id, client_secret:secret,v:"20140905", limit:1},
				    function(data) {
				    	var	result =data.response.venues; 
						console.log(result[0]);

						context.textAlign = "center";
						var fontsize =10;
						context.font = fontsize + "pt Arial";

						context.fillStyle = 'rgba(0, 0, 0, 1)';
						context.fillRect(340-(fontsize*15), 155, fontsize*30, fontsize+10)
						context.fillRect(340-(fontsize*15), 435, fontsize*30, 5)

						context.fillStyle = 'rgba(255, 255, 255, 1)';
						context.fillText(result[0].name, 340, 170);

						context.drawImage(img_chara, 390, 180);
						context.drawImage(img_chara2, 295, 445);

						context.textAlign = "left";
						context.fillStyle = 'rgba(0, 0, 0, 1)';
						context.fillText(result[0].location.address, 390, 330);
						context.fillText(result[0].location.cc, 390, 350);
						context.fillText(result[0].location.city, 390, 370);

				    }
				);

			}
		);

	};
};
