//////////////////////////////////////////////////
//
//	jQuery GPS
//
//////////////////////////////////////////////////
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