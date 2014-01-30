;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
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
},{"./data":2}],2:[function(require,module,exports){
module.exports = {
    nodes: [
        {id: 0, name: 'société A'},
        {id: 1, name: 'société B'},
        {id: 2, name: 'société C'},
        {id: 3, name: 'société D'},
        {id: 4, name: 'société E'},
        {id: 5, name: 'société F'},
        {id: 6, name: 'société G'},
        {id: 6, name: 'société H'},
        {id: 7, name: 'société I'},
        {id: 8, name: 'société J'},
        {id: 9, name: 'société K'},
        {id: 10, name: 'société L'},
        {id: 11, name: 'société M'},
        {id: 12, name: 'société N'},
        {id: 13, name: 'société O'},
        {id: 14, name: 'société P'},
        {id: 15, name: 'société Q'},
        {id: 16, name: 'société R'},
        {id: 17, name: 'société S'},
        {id: 18, name: 'société T'},
        {id: 19, name: 'société U'},
        {id: 20, name: 'société V'},
        {id: 21, name: 'société W'},
        {id: 22, name: 'société X'},
        {id: 23, name: 'société Y'},
        {id: 24, name: 'société Z'}
    ],

    links: [
        {src: 1, dst: 2, label: '10%'},
        {src: 2, dst: 1, label: '10%'},
        {src: 2, dst: 3, label: '10%'},
        {src: 2, dst: 4, label: '10%'},
        {src: 2, dst: 6, label: '10%'},
        {src: 3, dst: 5, label: '10%'},
        {src: 4, dst: 7, label: '10%'},
        {src: 6, dst: 8, label: '10%'},
        {src: 7, dst: 9, label: '10%'},
        {src: 9, dst: 10, label: '10%'},
    ]
};


},{}]},{},[1])
;