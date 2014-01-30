var data = require('./data');

var $wrapper = document.getElementById('wrapper');

function Link(src, dest, label) {

    var startPoint = src.node.position;
    var middlePoint = new paper.Point(src.node.position.x, dest.node.position.y);
    var endPoint = dest.node.position;

    var path = new paper.Path();
    path.add(startPoint);
    path.add(middlePoint);

    path.strokeColor = "black";


    var text = new paper.PointText(middlePoint);
    text.content = label;
    text.justification = 'center';

    this.path = path;
    this.text = text;
    this.fleche = new paper.Path();

    if (startPoint.x < endPoint.x) {
        this.fleche.add(endPoint.subtract(new paper.Point(10, 10)));
        this.fleche.add(endPoint.add(new paper.Point(-10, 10)));
        this.fleche.add(endPoint);


    } else {
        this.fleche.add(endPoint.add(new paper.Point(10, 10)));
        this.fleche.add(endPoint.add(new paper.Point(-10, 10)));
        this.fleche.add(endPoint);
    }
    path.add(endPoint);

    this.fleche.close;
    this.fleche.fillColor = 'black';


    this.srcMove = function(position) {
        var middlePoint = new paper.Point(position.x, this.path.lastSegment.point.y )

        this.path.removeSegment(0);
        this.path.insertSegment(0, position);
        this.path.removeSegment(1);
        this.path.insertSegment(1, middlePoint);
        this.text.position = middlePoint;
    };
    this.destMove = function(position)  {
        var middlePoint = new paper.Point( this.path.firstSegment.point.x, position.y );

        this.path.removeSegment(2);
        this.path.insertSegment(2, position);
        this.path.removeSegment(1);
        this.path.insertSegment(1, middlePoint);
        this.text.position = middlePoint;
        this.fleche.position = position;
    };

    return this;
}

function Cartouche(center, title) {
    var group = new paper.Group();

    var rectangle = new paper.Rectangle(center, new paper.Size(80, 20));
    var cornerSize = new paper.Size(5, 5);
    var rect = new paper.Path.RoundRectangle(rectangle, cornerSize)
    rect.strokeColor = "black";
    rect.strokeWidth = "1";
    rect.fillColor = 'white';
    rect.draggable = true;

    var text = new paper.PointText(rectangle.center);
    text.content = title;
    text.justification = 'center';


    if (text.bounds.width > rectangle.width) {
        text.content = title.substr(0, 20) + '...';
    }

    group.fillColor = 'white';
    group.draggable = true;
    group.addChild(rect);
    group.addChild(text);
    group.data.cartouche = this;

    this.node = group;
    this.links = [];
    this._linksFrom = [];
    this.__id = null;

    this.setId = function(id) {
        this.id = id;
    };

    this.linkFrom = function(links) {
        this._linksFrom.push(links);
    }

    this.linkTo = function(node, label) {
        var link =new Link(this, node, label);
        this.links.push(link);
        node.linkFrom(link);
    };

    this.moveTo = function(position) {
        this.node.position = position;
        this.links.forEach(function(link) {
            link.srcMove(position);
        });
        this._linksFrom.forEach(function(link) {
            link.destMove(position);
        });
    };

    return this;
}

paper.setup($wrapper);

var lastPoint = new paper.Point(0, 0);
var nodes = [];
data.nodes.forEach(function(node, index) {
    node.id = index;
    lastPoint = lastPoint.add(new paper.Point(100, 0));
    if (lastPoint.x > 1900) {
        lastPoint.x = 0;
        lastPoint.y += 30;
    }
    var elmt = new Cartouche(lastPoint, node.name);
    elmt.setId(node.id);
    nodes[node.id] = elmt;
}, this);

data.links.forEach(function(link) {
    var node = nodes[link.src];
    node.linkTo(nodes[link.dst], link.label);
});


var tool = new paper.Tool();
var dragItem = null;
var deltaDrag = null;

tool.onMouseDown = function(e) {
    if (e.item && e.item.draggable ) {
        dragItem = e.item.data.cartouche;
        deltaDrag = dragItem.node.position.subtract(e.point);
    }
};

tool.onMouseUp = function(e) {
    dragItem = null;
};

tool.onMouseDrag = function(e) {
    if (!dragItem) return;
    dragItem.moveTo(e.point.add(deltaDrag));
};

document.getElementById('scroll-wrapper').addEventListener('scroll', function(e) {
    console.log(e);
}, false);


paper.view.draw();