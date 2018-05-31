
new p5();
function cityScape () {

    scale(1);

    noStroke();

   // rectMode(CENTER);

        for(var bx = -100; bx < 800; bx = bx + bxAmt){

            for(var by = -120; by < 300; by = by + byAmt){

                fill(150);

                rect(bx,by-byAmt,bx/30,by*0.8);

                fill(110);

                rect(bx,by+byAmt*2,bx/10,by*1.8);

                fill(255);

               // rect(bx+byAmt,by-bxAmt,20,20);

                fill(200);

                rect(bx+byAmt/2.5,by-bxAmt*0.8,20,20);

                fill(225);

                rect(bx+byAmt*1.5,by-bxAmt/0.5,20,20);

            }

        }

        resetMatrix();

}



function cityWindows() {

    for(var wx = 150; wx < 8000; wx = wx + bxAmt*2.5){

        for( var wy = 350; wy < 500; wy = wy + byAmt*2.5) {

            rectMode(CENTER);

            fill(255,255,255);

            rect(wx,wy*1.2,50,30);

            fill(255,255,255,100);

            rect(wx,wy*1.2,65,45);

            fill(255,255,255,50);

            rect(wx,wy*1.2,105,85);

            rectMode(CORNER);

        }

    }

}

var charc = {

     x: 150,

     y: 100,

     sze: 1.2,

     r: 0,

     spin:0,

     

     ro: 50,

     g:150,

     b:200, 

     draw: function() {

 

        translate(this.x,this.y-50 );

        scale(this.sze);

        rotate(this.r);

        this.r = this.r + this.spin;

        noStroke();

        strokeWeight(2);

        //body

        fill(this.ro,this.g,this.b);

        ellipse(0,0,25,50);

        //tail fin

        fill(this.ro-75,this.g-75,this.b-75);

        triangle(0,20,-5,45,5,55);

        //arm fins

        //l

        triangle(-12,-5,-22,15,-17,20);

        //r

        triangle(12,-5,22,15,17,20);

        fill(255);

        //left eye

        ellipse(-10,-15,10,10);

        //right eye

        ellipse(10,-15,10,10);

        fill(25);

        //left pupil

        ellipse(-10,-15,3,3);

        //right pupil

        ellipse(10,-15,3,3);

        strokeWeight(1);

        resetMatrix();

    },

    

};



/*

var charc = {

  x: 150,

  y: 100,

  r:0,

  spin: 0,

  draw:function () {

    translate(this.x,this.y);

    rectMode(CENTER);

    rotate(this.r);

    this.r = this.r + this.spin;

    rect(0,0,50,50);

    

    rectMode(CORNER);

    resetMatrix();

 },

};*/

var bxAmt;

var byAmt;

var flip = 0; 

var x = 100;

var y = 100;

var yspeed = 0;

var grav = 1;

var timer = 0;

var lives = 3;

var score = 0;

var scorePlus = 0;

var fall = false;



var holex = 1000;

var holey = 350;



var holex2 = 1900;

var holey2 = 350;



var loseScreen = false;

var intro = false;

var game = true;

var holeR = 10;



var winX = 0;

var winY = 0;

var cityScapeX = 0;

var cityScapeY = 0;



function setup () {
    scale(0.3);

    frameRate(160);

    createCanvas(window.screen.width,window.screen.height);

    bxAmt = random(175,190);

    byAmt = random(165,280);

}



draw = function () {
   
    if(game === true && loseScreen === false){

        scorePlus = 1;

        background(100);

        translate(cityScapeX, cityScapeY);

        cityScapeX = cityScapeX - holeR/10;

        if(cityScapeX < -8000){

            cityScapeX=0;

        }

        //noLoop();

        cityScape();
       
        //loop();

        resetMatrix();
        
        fill(255);

        

        textSize(20);

        text("Tap to flip, flip to parkour, parkour to survive!",10,50);

        textSize(20);

        text("Lives: "+lives,300,150);

        if (lives<1){

            game = false;

            loseScreen = true;

            fall = false;

        }

        text("Score: "+score,300,200);

        fill(200);

        rect(0,350,1500,600);

        noStroke();

        fill(100);

        //windows

        translate(winX,winY);

        winX = winX - holeR;

        if(winX < -8000){

            winX = 0;

        }

        cityWindows();

        resetMatrix();

        //hole

        fill(90);

        rect(holex-20,holey,150,600);

        holex = holex - holeR;

        if(holex<-150){

            holex = 1150;

        }

        if(dist(charc.x,charc.y,holex,holey)<30){

            fall = true;

            if(charc.y<320){

                fall = false;

            }

            //yspeed = 10;

        }

        rect(holex2-10,holey2,100,600);

        holex2 =holex2 - holeR;

        if(holex2<-200){

            holex2 = 1650;



        }
        if(score > 100){

            holeR = random(7,12);

        }
        
        if(score > 200){

            holeR = random(12,19);

        }
       if(score > 300){

            holeR = random(22,29);

        }
        if(dist(charc.x,charc.y,holex2,holey2)<30){

            fall = true;

            //yspeed = 10;

            if(charc.y<320){

                fall = false;

            }

        }

        //character

        resetMatrix();

        charc.draw();

        //gravity and jump

        charc.y = charc.y + yspeed;

        yspeed = yspeed + grav;

        if(mouseIsPressed){

          charc.spin = 0.9;

            if(timer<=1){

                timer = timer +1;

                //charc.spin = 0.4;

                yspeed = -15;

            }

        }

        resetMatrix();
        //touchscreen button
        rectMode(CENTER);
        fill(10,150,255);
        if(mouseIsPressed && fall === false){
            fill(10,255,150);
        }
        if(mouseIsPressed && fall === true){
            fill(255,50,10);
        }
        rect(window.screen.width/2, window.screen.height - 150, 250, 100, 50);
        rectMode(CORNER);
        fill(255);
        textSize(48);
        text("FLIP", (window.screen.width/2)-50, window.screen.height-130);
         if(fall === false){

            if(charc.y > 350){

                score = score + scorePlus;

                charc.y = 350;

                if(charc.y === 350){

                    timer = 0;

                    charc.spin = 0;

                    charc.r = 0;

                    yspeed = 0;

                } 

            }

        }

        if(fall === true){

            charc.spin = -0.3;

            if(mouseIsPressed&&charc.y< 390){

                charc.spin = 0.9;

                if(timer<=2){

                    timer = timer +1;

                    //charc.spin = 0.4;

                    yspeed = -15;

                    if(dist(charc.x,charc.y,holex,holey)>25){

                        fall = false;

                    }

                    if(dist(charc.x,charc.y,holex2,holey2)>25){

                        fall = false;

                        //yspeed = 10;

                     }

                }

            }

        }

        if(charc.y>1000){

            background(255,0,0);

            charc.y = 1000;

            if(charc.y === 1000){

                lives = lives - 1;

                timer = 0;

                charc.x = 100;

                charc.y = 100;

                fall = false;

            }    

        }

    }  

    if(game === false && loseScreen === true){

        scorePlus = 0;

        background(0);

        textSize(22);

        fill(255);

       

        text("Your PARKOUR days are at an end..",50,250);

        fill(255,20,50);

        text("Your high score: " + score,100,350);

        fill(100);

        rect(100,375,200,100,100);

        fill(255);

        text("TAP HERE",120,425);

        /*

        if(mouseX>200 && mouseX<500){

            if(mouseY>375 && mouseY<475){

                if(mousePressed){

                    game = true;

                    loseScreen = false;

                }

            }

        }*/

        if(game === false && mouseIsPressed){

            game = true;

            loseScreen = false;

            lives = 3;

            score = 0;

            holeR = random(7,20);

            

        }

    }

    // rect(width/2,height/2,width/10,height/10);

};
