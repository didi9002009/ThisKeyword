// use inspector to check the orientation of 'this'

// 1. if fn is part of obj, which is called method -> 'this' refers to the obj, who calls the fn.
function video = {
  title = 'a',
  play(){
    console.log(this);
}
};
video.stop = function(){
  console.log(this);
}
video.play(); 
video.stop(); 

// 2. the regular fn is not part of obj, 'this' refers to global(window, global), if not provide context.
function playVideo(){
  console.log(this);
}
playVideo();
// 2-1. when create a new empty obj under constructor, this refer to the empty obj 'this' = {}
function Video(title){
  this.title = title;
  console.log(this);
}
 const v = new Video('b')

// 2-2 'this' refers to window, as the callback fn called by forEach is not the method of video, just a regular fn.
 function video = {
  title = 'a',
  tags: ['a','b','c'],
  showTags(){
    this.tags.forEach(function(tag) {
      console.log(this, tag);
});
  }
};
video.showTages();
// 2-3 fix, put 'this' as a 2nd argument, so 'this' is still within showTags 
showTags(){
  this.tags.forEach(function(tag) {
    console.log(this.title, tag);
}, this);


//"use strict";  

let box = document.querySelector('.box');
let log = console.log;
let myFunc = function(){
    log('1', this);  // 'this' is the 'box' in regular fn, but in 'use strict', this would be undefined, as there is no context provided.
    setTimeout( ()=> {
        log('3', 'timed out', this);
    }, 250)   //'this' is box, as its parent is box, even if it is within an arrow fn.
};
let myFunc2 = () => {
    log('2', this);       // 'this' is the window in arrow fn, 'this' points to where the parent obj(myFunc2) was declared, which is window, using lexical scope 
    setTimeout( ()=> {
        log('3', 'timed out', this);
    }, 250)  //'this' is window, as its parent is window
};

box.addEventListener('mousedown', myFunc);   // 'this' points to box, as it is the box call the myFunc
box.addEventListener('mouseup', myFunc2);

//myFunc();  // 'this' is window, as it did not provide context, considering window call the fn. && if with 'use strict', both 1&3 'this' is undefind
//myFunc.call(window);  //  'this' is window
myFunc.call/apply(box); // 'this' is box, evne with 'use strict', as it provids context.    
myFunc2.call/apply(box);   // 'this' is window

/*
 -implicit binding
 -explicit binding
 -new binding
 -window binding
*/
// implicit binding, right left of the dot at call time
var me = {
 name: 'Dan',
 age: 25,
 sayName: function(){
   console.log(this.name);
 }
};
me.sayName();
// explicit binding, call, apply, bind
var sayName = function(){
    console.log(this.name);
 };
 var stacey = {
   name: 'stacey',
   age: 34
 }
 sayName.call(stacey);

 // window binding
 var sayage = function(){
  console.log(this.age);   
};
var me = {
 age: 34
}

// window.age = 35; // 35 'this' = window
sayName();     // undefined  if in strict mode, error