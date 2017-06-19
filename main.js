function Captcha(){
    this.text = "";
    this.length = 5; //length of captcha, max is 10, default is 5
    this.difficulty = 3; //max is 5, default is 3
    this.canvas = "";
    //this.color = "#000"; // default text color black
    //this.bgColor = "#fff"; //default background white
    this.refresh = function(canvas){
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.generate();
        this.render(canvas);
    }
    this.generate = function(){
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        this.text = "";
        for( var i=0; i < this.length; i++ )
            this.text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.render = function(canvas){
        var ctx = canvas.getContext('2d');
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.font = "36px captcha1";
        ctx.fillText(this.text, 140, 50);
    }
}

var captchize = (function(){
    return function(obj){
        if(typeof obj !== "object"){
            console.log("Should be an object. " + typeof obj);
            return;
        }
        var captcha = new Captcha(); // init the object
        if(obj.elem){
            captcha.canvas = obj.elem;
            document.getElementById(obj.elem).style.display = "inline-flex";
            document.getElementById(obj.elem).style.flexFlow = "row wrap";
            document.getElementById(obj.elem).style.height = "180px";
            document.getElementById(obj.elem).style.width = "300px";
            document.getElementById(obj.elem).style.marginLeft = "20px";
        }else return;
        if(obj.difficulty){
            captcha.difficulty = obj.difficulty;
        }
        if(obj.length){
            captcha.length = obj.length >= 10 ? 10 : obj.length;
        }
        var canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        canvas.style.height = "150";
        canvas.style.width = "300";
        var txt = document.createElement('input');
        txt.type = "text";
        txt.id = "txt";
        txt.onkeyup = function(e){
              if(e.which == 13){
                  if(this.value.toLowerCase() == captcha.text.toLowerCase()){
                      alert("correct");
                  }
                   else {
                       alert("incorrect " + captcha.text);
                   }
                  captcha.refresh(canvas);
                  this.value = "";
              }
        };
        document.getElementById(obj.elem).appendChild(canvas);
        document.getElementById(obj.elem).appendChild(txt);
        captcha.generate();
        captcha.render(canvas);
    }
}());