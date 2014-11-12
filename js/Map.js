
function Tile(rnd, px, py) {
    var self = this;
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
        div.attr('id',id).data('type',type).data('x',x).data('y',y);
        div.get(0).tile = self;
        div.css({top:height*y, left:width*x});
        div.css({"background":"url('"+img+"')"});
        div.appendTo('#map-content');
    };


    this.Alert = function() {
        console.log("tile id:"+id+" was clicked");
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
        Setup();
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

    var Setup = function(){
        $('#map-content').on('click','div.tile', function(e){
             //var tile = tiles[$(this).data('y')][$(this).data('x')];
             this.tile.Alert();
        });
    }

    this.Redraw = function(x,y) {

    };
}

Map.init();