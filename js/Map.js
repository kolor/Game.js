
function Tile(rnd, px, py) {
    var _types = ["grass","forest","hills","swamp","forest"];
   
    var height = 60;
    var width = 60;

    var id = "tile_"+px+py+rnd;
    var x = px;
    var y = py;
    
    var type = _types[rnd];
    var img = 'img/maptiles/'+type+'.png';

    this.Draw = function() {
        var div = $("<div class='tile'></div>");
        div.attr('id',id).data('type',type);
        div.css({width:width, height:height, top:height*y, left:width*x});
        div.css({"background":"url('"+img+"')"});
        div.appendTo('#map-content');
    };

}

var Map = new function() {
    var maxHorz = 20;
    var maxVert = 8;
    
    var tiles = [];
    this.init = function() {
        for(var i=0; i<maxVert; i++) {
            tiles[i] = [];
            for(var j=0; j<maxHorz; j++) {
                tiles[i][j] = new Tile(Math.random()*5|0, j, i);
            }
        }  

        Render();
    };

    this.GetMap = function() {
        return tiles;
    };

    var Render = function() {
        $.each(tiles, function(k,v){
            $.each(v, function(k,t){
                t.Draw(); 
            });
        });
    };

    this.Redraw = function(x,y) {

    };
}

Map.init();