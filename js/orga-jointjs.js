;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
    el: $('#wrapper'),
    width: 1280,
    height: 1024,
    gridSize: 1,
    model: graph,
    perpendicularLinks: true
});

var member = function(x, y, rank, name, image, background, border) {

    var cell = new joint.shapes.org.Member({
        position: { x: x, y: y },
        attrs: {
            '.card': { fill: '#e5e5e5', stroke: '#9e9e9e'},
//            image: { 'xlink:href': '/images/'+ image },
            '.rank': { text: rank }, '.name': { text: name }
        }
    });
    graph.addCell(cell);
    return cell;
};

function link(source, target, breakpoints) {

    var cell = new joint.shapes.org.Arrow({
        source: { id: source.id },
        target: { id: target.id },
//        vertices: breakpoints
    });
    graph.addCell(cell);
    return cell;
}

for(var i=0; i<50; i++){
    var bart = member(300+i,70+i,'CEO', 'Bart Simpson', 'member1.png', '#F1C40F', 'gray');
    var homer = member(90+i,200+i,'VP Marketing', 'Homer Simpson', 'member2.png', '#2ECC71', '#008e09');
    var marge = member(300+i,200+i,'VP Sales', 'Marge Simpson', 'member3.png', '#2ECC71', '#008e09');
    var lisa = member(500+i,200+i,'VP Production and other thing' , 'Lisa Simpson', 'member4.png', '#2ECC71', '#008e09');
    var maggie = member(400+i,350+i,'Manager', 'Maggie Simpson', 'member5.png', '#3498DB', '#333');
    var lenny = member(190+i,350+i,'Manager', 'Lenny Leonard', 'member6.png', '#3498DB', '#333');
    var carl = member(190+i,500+i,'Manager', 'Carl Carlson', 'member7.png', '#3498DB', '#333');

    link(bart, marge, [{x: 385, y: 180}]);
    link(bart, homer, [{x: 385, y: 180}, {x: 175, y: 180}]);
    link(bart, lisa, [{x: 385, y: 180}, {x: 585, y: 180}]);
    link(homer, lenny, [{x:175 , y: 380}]);
    link(homer, carl, [{x:175 , y: 530}]);
    link(marge, maggie, [{x:385 , y: 380}]);
}
},{}]},{},[1])
;