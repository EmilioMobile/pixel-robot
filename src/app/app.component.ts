import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as Raphael from 'raphael';

export  interface PlanCount {
  nodesCnt: number;
  levelsCnt: number;
}

@Component({
  selector: 'piro-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'piro';
  svg2: SafeHtml;
  radius = 30;
  yurzui = 'LoL';
  hierarchyNodes = [];
  maxLevels = 0;
  selectedElement: any;
  square;
  pivot;
  rot = 0;

  polygons = [
    {
      type: 'polygon',
      points: '30,0 0,60 60,60',
      points2: '290,0 260,60 320,60',
    }, {
      type: 'circle',
      x: 100,
      y: 30,
      r: 30
    }, {
      type: 'circle',
      x: 200,
      y: 30,
      r: 30
    }
  ];

  data = [{
    'operator': 'distribute-result',
    'expressions': '$$11',
    'operatorId': '1.1',
    'execution-mode': 'UNPARTITIONED',
    'inputs': [
            {
                    'operator': 'project',
                    'variables': [
                            '$$11'
                    ],
                    'operatorId': '1.2',
                    'execution-mode': 'UNPARTITIONED',
                    'inputs': [
                            {
                                    'operator': 'assign',
                                    'variables': [
                                            '$$11'
                                    ],
                                    'expressions': '{ TwitterUsers : $$TwitterUsers}',
                                    'operatorId': '1.3',
                                    'execution-mode': 'UNPARTITIONED',
                                    'inputs': [
                                            {
                                                    'operator': 'unnest',
                                                    'variables': [
                                                            '$$TwitterUsers'
                                                    ],
                                                    'expressions': 'dataset( TinySocial.TwitterUsers )',
                                                    'operatorId': '1.4',
                                                    'execution-mode': 'UNPARTITIONED',
                                                    'inputs': [
                                                            {
                                                                    'operator': 'empty-tuple-source',
                                                                    'operatorId': '1.5',
                                                                    'execution-mode': 'UNPARTITIONED'
                                                            },
                                                            {
                                                              'operator': 'empty-tuple-source',
                                                              'operatorId': '1.5',
                                                              'execution-mode': 'UNPARTITIONED'
                                                            },
                                                            {
                                                              'operator': 'empty-tuple-source',
                                                              'operatorId': '1.5',
                                                              'execution-mode': 'UNPARTITIONED'
                                                            }
                                                    ]
                                            },
                                            {
                                              'operator': 'empty-tuple-source',
                                              'operatorId': '1.X',
                                              'execution-mode': 'UNPARTITIONED'
                                            },
                                            {
                                              'operator': 'empty-tuple-source',
                                              'operatorId': '1.X',
                                              'execution-mode': 'UNPARTITIONED'
                                            }
                                    ]
                            }
                    ]
            }
    ]
  }];

  @ViewChild('dataContainer') dataContainer: ElementRef;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {}

/*
  var svg   = document.documentElement;
  var svgNS = svg.namespaceURI;

  var rect = document.createElementNS(svgNS,'rect');
  rect.setAttribute('x',5);
  rect.setAttribute('y',5);
  rect.setAttribute('width',500);
  rect.setAttribute('height',500);
  rect.setAttribute('fill','#95B3D7');
  svg.appendChild(rect);
  document.body.appendChild(svg);

  var h=document.createElement('a');
  var t=document.createTextNode('Hello World');
  h.appendChild(t);
  document.body.appendChild(h);
*/

  makeSVG(parent, tag, attrs) {
    const el = <SVGElement>document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const k in attrs) {
        if (k === 'xlink:href') {
            el.setAttributeNS('http://www.w3.org/1999/xlink', 'href', attrs[k]);
        } else {
            el.setAttribute(k, attrs[k]);
        }
    }
    parent.appendChild(el);
  }

  // http://dmitrybaranovskiy.github.io/raphael/
  KK() {
    const paper = Raphael(document.getElementById('testP1'), 200, 200);
    paper.image('http://i.imgur.com/LQIsf.jpg', 0, 0, 100, 100);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttributeNS('http://www.w3.org/2000/svg', 'xlink', 'http://www.w3.org/1999/xlink');
    svg.setAttributeNS('http://www.w3.org/2000/svg', 'height', '200');
    svg.setAttributeNS('http://www.w3.org/2000/svg', 'width', '200');
    svg.setAttributeNS('http://www.w3.org/2000/svg', 'id', 'test2');

    const svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    svgimg.setAttributeNS('http://www.w3.org/2000/svg', 'height', '100');
    svgimg.setAttributeNS('http://www.w3.org/2000/svg', 'width', '100');
    svgimg.setAttributeNS('http://www.w3.org/2000/svg', 'id', 'testimg2');
    svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'http://i.imgur.com/LQIsf.jpg');
    svgimg.setAttributeNS('http://www.w3.org/2000/svg', 'x', '0');
    svgimg.setAttributeNS('http://www.w3.org/2000/svg', 'y', '0');

    svg.appendChild(svgimg);

    document.querySelector('#testP2').appendChild(svg);
  }

  superSizeMe() {
    this.radius = this.radius * 2;
  }

  miniSizeMe() {
    this.radius = this.radius / 2;
  }

  showMe() {
    const polygons = document.getElementById('polygon');
    polygons.style.display = 'none';

    // document.querySelector(".svgClass").getSVGDocument().getElementById("svgInternalID").setAttribute("fill", "red")
  }

  drawPlan() {
    const parent = document.getElementById('testX');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttributeNS('http://www.w3.org/2000/svg', 'xlink', 'http://www.w3.org/1999/xlink');
    svg.setAttribute('height', '800');
    svg.setAttribute('width', '400');
    svg.setAttribute('id', 'test6');

    const summary: PlanCount = {nodesCnt: 1, levelsCnt: 1};
    this.analyzePlan(svg, this.data[0], 1, 1);

    parent.appendChild(svg);

    console.log(parent);

  }

  drawPlanLinear() {
    const parent = document.getElementById('testX');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttributeNS('http://www.w3.org/2000/svg', 'xlink', 'http://www.w3.org/1999/xlink');
    svg.setAttribute('height', '800');
    svg.setAttribute('width', '400');
    svg.setAttribute('id', 'test6');

    const summary: PlanCount = {nodesCnt: 1, levelsCnt: 1};
    this.analyzePlanLinear(svg, this.data[0], 1, 1);

    parent.appendChild(svg);

    console.log(parent);

  }

  analyzePlan(parent, plan, level, node) {
    let nodes = {};
    nodes = plan;
    console.log(nodes);

    if (nodes) {
      // Calculate Position
      const  level1 = level;
      console.log('DRAWING ON LEVEL ' + level1);
      const y = 30 * level1;
      const x = 30 * node;
      this.makeSVG(parent, 'circle', {class: 'circle', cx: x, cy: y, r: 10});

      if (nodes['inputs']) {
        level += 1;
        node = 0;
        for (let i = 0; i < nodes['inputs'].length; i++) {
            node += 1;
            this.analyzePlan(parent, nodes['inputs'][i], level, node);
        }

        console.log('FINISH DRAWING ON LEVEL ' + level1);


   //     console.log(levelCounter);
    //    console.log(planCounter);
      }
    }

    // return planCounter;
  }

  analyzePlanLinear(parent, plan, level, node) {
    let nodes = {};
    nodes = plan;
    console.log(nodes);

    if (nodes) {
      // Calculate Position
      const  level1 = level;
      console.log('DRAWING ON LEVELs ' + level1);
     // const y = 30 * level1;
     // const x = 30 * node;
     // this.makeSVG(parent, 'circle', {class: 'circle', cx: x, cy: y, r: 10});

      if (nodes['inputs']) {
        level += 1;
        node = 0;

        console.log('NUMBER OF CHILDS' + nodes['inputs'].length);
        console.log('CHECKING WICH IS THE LONGEST PATH IN THIS LEVEL');
        for (let i = 0; i < nodes['inputs'].length; i++) {
            node += 1;
            console.log('GOING ' + level + ':' + node + ' ROUTE');

            this.analyzePlanLinear(parent, nodes['inputs'][i], level, node);
        }

        console.log('PATH LENGHT: ' + level);
        console.log('FINISH DRAWING ON LEVEL ' + level1);


   //     console.log(levelCounter);
    //    console.log(planCounter);
      }
    }

    // return planCounter;
  }


  nodeMe() {

    const svg = document.getElementById('SVG_scene'); // GET MAIN SVG
    svg.addEventListener('SVGLoad', this.makeDraggable);
    svg.addEventListener('mousedown', this.startDrag);
    svg.addEventListener('mousemove', this.drag);
    svg.addEventListener('mouseup', this.endDrag);
    svg.addEventListener('mouseleave', this.endDrag);
    svg.setAttribute('fill', 'yellow');
    svg.setAttribute('background', 'red');
    svg.setAttribute('height', '400');
    svg.setAttribute('width', '400');
    svg.setAttribute('style', 'background: red');
    svg.setAttribute('viewbox', '0  0 400 400');

    /*const ani = document.createElementNS('http://www.w3.org/2000/svg', 'animateTransform'); // CREATE SVG ANIMATION ELEMENT
    ani.setAttributeNS(null, 'id', 'Ani'); // ID OF THE ANIMATION, FOR LATER ACCESS
    ani.setAttribute('attributeName', 'transform'); // ANIMATION ATTRIBUTE
    ani.setAttribute('attributeType', 'xml'); // ATTRIBUTE TYPE
    ani.setAttribute('type', 'rotate' ); // ANIMATE ROTATION
    // ani.setAttribute('from', '0' + ' ' + (pivot.cx.baseVal.value)+" "+(pivot.cy.baseVal.value));//FROM 0 DEG, WITH THE PIVOT POSITION X & Y
    // .setAttribute('to', '360' + ' ' + (pivot.cx.baseVal.value)+" "+(pivot.cy.baseVal.value));//TO 360 DEG, WITH THE PIVOT POSITION X & Y
    ani.setAttribute('begin', '0s'); // START OF THE ANIMATION
    ani.setAttribute('dur', '2s');  // DURATION OF THE ANIMATION
    ani.setAttribute('repeatCount', 'indefinite'); // REPEAT INFINITY
    */

    this.hierarchyNodes = [];
    this.maxLevels = 0;
    this.calculateNodes(this.data[0], 0, 0);
    console.log(this.maxLevels);
    console.log(this.hierarchyNodes);

    for (let i = 0; i <= this.maxLevels; i++) {
      const y = 50 * (i + 1);
      let x = 50;
      let count = 0;
      for ( let u = 0; u < this.hierarchyNodes.length; u++) {
        if (this.hierarchyNodes[u].level === i) {
          count += 1;
          x = 50 * count;
          this.makeSVG(svg, 'circle', {class: 'circle', cx: x, cy: y, r: 10});
        }
      }
    }
  }

  calculateNodes(plan, level, levelNode) {
    let nodes = {};
    nodes = plan;

    if (level > this.maxLevels) {
      this.maxLevels = level;
    }
    if (nodes) {
      const nodeSummary = { nodes: nodes, level: level, levelNode: levelNode, posX: 0, posY: 0, maxLevels: 0, maxChilds: 0 };
      this.hierarchyNodes.push(nodeSummary);
      if (nodes['inputs']) {
        level += 1;
        levelNode = 0;
        for (let i = 0; i < nodes['inputs'].length; i++) {
            levelNode += 1;
            this.calculateNodes(nodes['inputs'][i], level, levelNode);
        }
      }
    }
  }

  leftMe(evt) {
    //console.log('left E');
    /* svg = document.getElementById('SVG_scene'); // GET MAIN SVG
    const elemRect = svg.getBoundingCSVGElementlientRect();
    console.log(elemRect);SVGElement
    console.log(svg.style.left);SVGElement
    //let offset   = elemRect.top - bSVGElementodyRect.top;

    //alert('Element is ' + offset + ' vertical pixels from <body>');
    const newX = elemRect.x;
    console.log(newX)
    let kk = Number(newX)  + 50;
    console.log('k: ' + kk)
    let mm = kk + 'px';
    console.log(mm)
    //svg.style.left = mm;
    svg.setAttribute('style', 'left: ' + mm);

    //svg.style.top = y_pos+'px'; */
  }

  rightMe() {
    console.log('right E');
  }

  svgInit(evt) {
    console.log('makeDraggable');
  }

  makeDraggable(evt) {
    console.log('makeDraggable');
   // const svg = evt.target;

   // svg.addEventListener('mousedown', this.startDrag);
   // svg.addEventListener('mousemove', this.drag);
   // svg.addEventListener('mouseup', this.endDrag);
   // svg.addEventListener('mouseleave', this.endDrag);
  }

  getMousePosition(evt) {
    const svg = evt.target;

    const CTM = svg.getScreenCTM();
    return {
      x: (evt.clientX - CTM.e) / CTM.a,
      y: (evt.clientY - CTM.f) / CTM.d
    };
  }

  startDrag(evt) {
    this.selectedElement = evt.target;

    console.log(this.selectedElement.constructor.name);

    if (this.selectedElement instanceof SVGCircleElement) {
      console.log(this.selectedElement);
    } else {
      this.selectedElement = null;
    }
  }

  drag(evt) {
      if (this.selectedElement) {

        evt.preventDefault();
       // const pt = evt.target.createSVGPoint();
       // pt.x = evt.clientX;
       // pt.y = evt.clientY;
       // const globalPoint = pt.matrixTransform(evt.target.getScreenCTM().inverse());


      //  const CTM = evt.target.getScreenCTM();
      //  console.log(CTM);
        // CTM.inverse()
       // screenPoint.matrixTransform( CTM.inverse() )
        /*var globalToLocal = dragObject.getTransformToElement(svg).inverse();
        var inObjectSpace = globalPoint.matrixTransform( globalToLocal );
        */

        // https://stackoverflow.com/questions/4850821/svg-coordinates-with-transform-matrix/5223921 //

        /*
        SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function(elem) {
        return elem.getScreenCTM().inverse().multiply(this.getScreenCTM());
        };

        var ani = document.createElementNS("http://www.w3.org/2000/svg","animateTransform");//CREATE SVG ANIMATION ELEMENT
        ani.setAttributeNS(null,"id","Ani"); //ID OF THE ANIMATION, FOR LATER ACCESS
        ani.setAttribute("attributeName", "transform"); //ANIMATION ATTRIBUTE
        ani.setAttribute("attributeType", "xml"); //ATTRIBUTE TYPE
        ani.setAttribute("type", "rotate" ); //ANIMATE ROTATION
        ani.setAttribute("from", "0"+" "+(pivot.cx.baseVal.value)+" "+(pivot.cy.baseVal.value));//FROM 0 DEG, WITH THE PIVOT POSITION X & Y
        ani.setAttribute("to", "360"+" "+(pivot.cx.baseVal.value)+" "+(pivot.cy.baseVal.value));//TO 360 DEG, WITH THE PIVOT POSITION X & Y
        ani.setAttribute("begin", "0s");//START OF THE ANIMATION
        ani.setAttribute("dur", "2s");  //DURATION OF THE ANIMATION
        ani.setAttribute("repeatCount", "indefinite"); //REPEAT INFINITY

        square.appendChild(ani); //APPEND THE ANIMATION TO AN OBJECT
        http://www.inkfood.com/animate-with-svg/
        */
//        const svgRoot = document.getElementById('test6');
        const pt = (<SVGSVGElement>(<Element>document.getElementById('SVG_scene'))).createSVGPoint();
        //const pt = document.getElementById('SVG_scene').createSVGPoint(); // GET MAIN SVG
        //const pt =  svgRoot
        const CTM = evt.target.getScreenCTM();
        const globalPoint = pt.matrixTransform(CTM.inverse());

        const dragX = evt.clientX + globalPoint.x;
        const dragY = evt.clientY + globalPoint.y;

        this.selectedElement.setAttribute('cx', dragX);
        this.selectedElement.setAttribute('cy', dragY);

        this.selectedElement.setAttribute('class', 'red');
      }
  }

  endDrag(evt) {
   if (this.selectedElement) {
      this.selectedElement = null;
    }
  }

  moveMe() {
    const svg = document.getElementById('SVG_scene2'); //  GET MAIN SVG ELEMENT
    svg.setAttributeNS(null, 'viewbox', '0  0 1920 600');

    const svgNS = 'http://www.w3.org/2000/svg';   //  DEFINE THE namespaceURI

    const w = window.innerWidth; // WINDOW WIDTH
    const h = window.innerHeight; // WINDOW HEIGHT
    console.log(h);
    console.log(w);
    console.log(h / 2 - 50);
    console.log(w / 2 - 50);


    this.square = document.createElementNS(svgNS, 'rect'); // CREATE SVG RECT
    this.square.setAttributeNS(null, 'id', 'Square'); // ID OF THE CIRCLE, OBJECT CAN BE MODIFIED VIA CSS
    this.square.setAttributeNS(null, 'x', w / 2 - 50); // CENTER RECT X
    this.square.setAttributeNS(null, 'y', h / 2 - 50); // CENTER RECT Y
    this.square.setAttributeNS(null, 'width', 100); // RECT WIDTH
    this.square.setAttributeNS(null, 'height', 100); // RECT HEIGHT
    this.square.setAttributeNS(null, 'fill', '#F05011'); // SET RANDOM COLOR
    this.square.setAttributeNS(null, 'stroke', 'none'); // NO STROKE


    svg.appendChild(this.square); // ADD CIRCLE TO THE MAIN SVG ELEMENT

    this.pivot = document.createElementNS(svgNS, 'circle');
    // CREATE BASIC SVG ELEMENT(RECT, CIRCLE, ELLIPSE, LINE, POLYLINE, POLYGON)
    this.pivot.setAttributeNS(null, 'id', 'Circle'); // ID OF THE CIRCLE, OBJECT CAN BE MODIFIED VIA CSS
    this.pivot.setAttributeNS(null, 'class', 'circle'); // CLASS OF THE CIRCLE, OBJECT CAN BE MODIFIED VIA CSS
    this.pivot.setAttributeNS(null, 'cx', w / 2);  // CENTER OF THE CIRCLE X
    this.pivot.setAttributeNS(null, 'cy', h / 2);  // CENTER OF THE CIRCLE Y
    this.pivot.setAttributeNS(null, 'r', 10);   // RADIUS OF THE CIRCLE
    this.pivot.setAttributeNS(null, 'fill', 'black');   // FILLCOLOR
    this.pivot.setAttributeNS(null, 'stroke', 'none');  // OUTLINE COLOR
    // this.pivot.onmousedown = this.movePivot(); // ON CLICK EVENT
    this.pivot.addEventListener('mousedown', this.movePivot.bind(this));

    svg.appendChild(this.pivot); // ADD CIRCLE TO THE MAIN SVG ELEMENT

    this.animate();
  }

  movePivot(this, e) {
      console.log('hey !');
      console.log(e);
     // this.pivot.cx.baseVal.value = e.pageX; // MOVE PIVOT TO MOUSE POSITION X
     // this.pivot.cy.baseVal.value = e.pageY; // MOVE PIVOT TO MOUSE POSITION Y
      this.pivot.cx.baseVal.value += 10; // MOVE PIVOT TO MOUSE POSITION X
     // this.pivot.cy.baseVal.value = e.pageY; // MOVE PIVOT TO MOUSE POSITION Y
     // IF MOUSE IS RELEASED STOP MOVE EVENT
    // document.onmouseup = function() {
    //    document.onmousemove = null
    // }
  }


  // THIS FUNCTION IS EXECUTED EACH FRAME
  animate() {
    this.rot += 2; // ADD EACH FRAME TO THE ROTATION
    this.square.setAttribute('transform', 'rotate(' + this.rot + ' '
      + this.pivot.cx.baseVal.value + ' ' + this.pivot.cy.baseVal.value + ')');

    // SET CURRENT ROTATION AND PIVOT
    requestAnimationFrame(this.animate.bind(this));

  }

}

/*
"styles": [
    "styles.scss",
    //Other style files
  ],
  "scripts": [
    "../node_modules/jsplugin/dist/js/plugin.js",
    //Other script files
  ],
*/
// npm install --save @types/raphael
