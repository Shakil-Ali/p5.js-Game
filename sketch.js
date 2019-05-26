/*

The Game Project 5 - Making a complete level

Week 7

*/

var char_x;
var char_y;
var floorPos_y;
var scrollPos;
var realPos;

var isLeft;
var isRight;
var isJumping;
var isFalling;

var clouds;
var mountains;
var trees;
var houseXs;
var house_y;
var t_canyon;
var t_obj;

var score;
var isWon;
var isLost;
var lives;

var enemies;

function setup()
{
	createCanvas(1024, 576);
    floorPos_y = (height * 3/4)-30;
    
    score = 0;
    lives = 3;
    
    startGame();
}

function startGame()
{   
    // Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	realPos = char_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isJumping = false;
	isFalling = false;
    isWon = false;
    isLost = false;
    
    char_x = width/2;
	char_y = floorPos_y-30;
    house_y = floorPos_y;

	// Initialise arrays of scenery objects.
    
// houseXs
    
    houseXs = [];
    
    for(var i = 0; i < 25; i++)
    {
        houseXs.push(i * random(500,1000));
    }
    
// clouds 
    
    clouds = [];
    
    for(var i = 0; i < 25; i++)
    {
        clouds.push({pos_x: i * random(100, 200), pos_y: random(floorPos_y - 100), size: random(40,70)});
    }
        
    
// mountains
    
    mountains = [];
    
    for(var i = 0; i < 25; i ++)
    {
        mountains.push({pos_x: i * random(100,200), height: 40});
    }
    
// trees
    
    trees = [];
    
    for(var i = 0; i < 40; i ++)
    {
        trees.push({pos_x: i * random(100,200), height: 260, size: random(20,30)});
    }
    


// Rings
    
    t_obj = [{x_pos: 770, y_pos: 80, size: 50, isFound: false},{x_pos: 970, y_pos: 80, size: 50, isFound: false},{x_pos: 1200, y_pos: 80, size: 50, isFound: false},{x_pos: 1300, y_pos: 80, size: 50, isFound: false},{x_pos: 1500, y_pos: 80, size: 50, isFound: false},{x_pos: 1600, y_pos: 80, size: 50, isFound: false},{x_pos: 1800, y_pos: 80, size: 50, isFound: false}, {x_pos: 1900, y_pos: 80, size: 50, isFound: false}, {x_pos: 2100, y_pos: 80, size: 50, isFound: false}, {x_pos: 2300, y_pos: 80, size: 50, isFound: false}, {x_pos: 2500, y_pos: 80, size: 50, isFound: false},{x_pos: 2700, y_pos: 80, size: 50, isFound: false}];
    

// Canyons
    
    t_canyon = [{x_pos: 300, width: 40},{x_pos: 700, width: 40},{x_pos: 500, width: 40},{x_pos: 1000, width: 100},{x_pos: 1300, width: 70},{x_pos: 1600, width: 70},{x_pos: 1800, width: 70},{x_pos: 2000, width: 120},{x_pos: 2200, width: 100}];
    
    
// Enemies
    
    enemies = [];

    // 1st enemy
    enemies.push(
        {
            x_pos: 10,
            y_pos: floorPos_y,
            x1: 10,
            x2: 150,
            speed: 1,
            size: 30,
            display: function()
            {
                // Draw enemy.
                push();
                fill(random(180,255), 0, 0);
                ellipse(this.x_pos, this.y_pos-10, this.size);
                triangle(this.x_pos-10,this.y_pos+33,this.x_pos+10,this.y_pos+33,this.x_pos, this.y_pos);
                fill(255);
                ellipse(this.x_pos+7,this.y_pos-15,8);
                ellipse(this.x_pos-7,this.y_pos-15,8);
                stroke(255);
                strokeWeight(4);
                line(this.x_pos+7, this.y_pos-5,this.x_pos-7,this.y_pos-5);
                pop();
                
            },
            move: function()
            {
                this.x_pos += this.speed;
                if(this.x_pos < this.x1 || this.x_pos > this.x2)
                {
                    // reverse direction
                    this.speed *= -1;
                }
            },
            checkCharCollision: function()
            {
                if(abs(realPos - this.x_pos) < 20 && abs(char_y - this.y_pos) < 20)
                {
                    playerDied();
                }
            }
        }
    );
    
    
    // 2nd enemy
    enemies.push(
        {
            x_pos: 350,
            y_pos: floorPos_y,
            x1: 350,
            x2: 600,
            speed: 1,
            size: 30,
            display: function()
            {
                // Draw enemy.
                push();
                fill(random(180,255), 0, 0);
                ellipse(this.x_pos, this.y_pos-10, this.size);
                triangle(this.x_pos-10,this.y_pos+33,this.x_pos+10,this.y_pos+33,this.x_pos, this.y_pos);
                fill(255);
                ellipse(this.x_pos+7,this.y_pos-15,8);
                ellipse(this.x_pos-7,this.y_pos-15,8);
                stroke(255);
                strokeWeight(4);
                line(this.x_pos+7, this.y_pos-5,this.x_pos-7,this.y_pos-5);
                pop();
            },
            move: function()
            {
                this.x_pos += this.speed;
                if(this.x_pos < this.x1 || this.x_pos > this.x2)
                {
                    // reverse direction
                    this.speed *= -1;
                }
            },
            checkCharCollision: function()
            {
                if(abs(realPos - this.x_pos) < 20 && abs(char_y - this.y_pos) < 20)
                {
                    playerDied();
                }
            }
        }
    );
    
    
    // 3rd enemy
    enemies.push(
        {
            x_pos: 950,
            y_pos: floorPos_y,
            x1: 900,
            x2: 1025,
            speed: 1,
            size: 30,
            display: function()
            {
                // Draw enemy.
                push();
                fill(random(180,255), 0, 0);
                ellipse(this.x_pos, this.y_pos-10, this.size);
                triangle(this.x_pos-10,this.y_pos+33,this.x_pos+10,this.y_pos+33,this.x_pos, this.y_pos);
                fill(255);
                ellipse(this.x_pos+7,this.y_pos-15,8);
                ellipse(this.x_pos-7,this.y_pos-15,8);
                stroke(255);
                strokeWeight(4);
                line(this.x_pos+7, this.y_pos-5,this.x_pos-7,this.y_pos-5);
                pop();
            },
            move: function()
            {
                this.x_pos += this.speed;
                if(this.x_pos < this.x1 || this.x_pos > this.x2)
                {
                    // reverse direction
                    this.speed *= -1;
                }
            },
            checkCharCollision: function()
            {
                if(abs(realPos - this.x_pos) < 20 && abs(char_y - this.y_pos) < 20)
                {
                    playerDied();
                }
            }
        }
    );
    
    
    // 4th enemy
    enemies.push(
        {
            x_pos: 1300,
            y_pos: floorPos_y,
            x1: 1150,
            x2: 1320,
            speed: 2,
            size: 30,
            display: function()
            {
                // Draw enemy.
                push();
                fill(random(180,255), 0, 0);
                ellipse(this.x_pos, this.y_pos-10, this.size);
                triangle(this.x_pos-10,this.y_pos+33,this.x_pos+10,this.y_pos+33,this.x_pos, this.y_pos);
                fill(255);
                ellipse(this.x_pos+7,this.y_pos-15,8);
                ellipse(this.x_pos-7,this.y_pos-15,8);
                stroke(255);
                strokeWeight(4);
                line(this.x_pos+7, this.y_pos-5,this.x_pos-7,this.y_pos-5);
                pop();
            },
            move: function()
            {
                this.x_pos += this.speed;
                if(this.x_pos < this.x1 || this.x_pos > this.x2)
                {
                    // reverse direction
                    this.speed *= -1;
                }
            },
            checkCharCollision: function()
            {
                if(abs(realPos - this.x_pos) < 20 && abs(char_y - this.y_pos) < 20)
                {
                    playerDied();
                }
            }
        }
    );
    
    
    // 5th enemy
    enemies.push(
        {
            x_pos: 1580,
            y_pos: floorPos_y,
            x1: 1475,
            x2: 1620,
            speed: 1.5,
            size: 30,
            display: function()
            {
                // Draw enemy.
                push();
                fill(random(180,255), 0, 0);
                ellipse(this.x_pos, this.y_pos-10, this.size);
                triangle(this.x_pos-10,this.y_pos+33,this.x_pos+10,this.y_pos+33,this.x_pos, this.y_pos);
                fill(255);
                ellipse(this.x_pos+7,this.y_pos-15,8);
                ellipse(this.x_pos-7,this.y_pos-15,8);
                stroke(255);
                strokeWeight(4);
                line(this.x_pos+7, this.y_pos-5,this.x_pos-7,this.y_pos-5);
                pop();
            },
            move: function()
            {
                this.x_pos += this.speed;
                if(this.x_pos < this.x1 || this.x_pos > this.x2)
                {
                    // reverse direction
                    this.speed *= -1;
                }
            },
            checkCharCollision: function()
            {
                if(abs(realPos - this.x_pos) < 20 && abs(char_y - this.y_pos) < 20)
                {
                    playerDied();
                }
            }
        }
    );
    
    
    // 6th enemy
    enemies.push(
        {
            x_pos: 1870,
            y_pos: floorPos_y,
            x1: 1750,
            x2: 1920,
            speed: 2,
            size: 30,
            display: function()
            {
                // Draw enemy.
                push();
                fill(random(180,255), 0, 0);
                ellipse(this.x_pos, this.y_pos-10, this.size);
                triangle(this.x_pos-10,this.y_pos+33,this.x_pos+10,this.y_pos+33,this.x_pos, this.y_pos);
                fill(255);
                ellipse(this.x_pos+7,this.y_pos-15,8);
                ellipse(this.x_pos-7,this.y_pos-15,8);
                stroke(255);
                strokeWeight(4);
                line(this.x_pos+7, this.y_pos-5,this.x_pos-7,this.y_pos-5);
                pop();
            },
            move: function()
            {
                this.x_pos += this.speed;
                if(this.x_pos < this.x1 || this.x_pos > this.x2)
                {
                    // reverse direction
                    this.speed *= -1;
                }
            },
            checkCharCollision: function()
            {
                if(abs(realPos - this.x_pos) < 20 && abs(char_y - this.y_pos) < 20)
                {
                    playerDied();
                }
            }
        }
    );
    
    
    // 7th enemy
    enemies.push(
        {
            x_pos: 2100,
            y_pos: floorPos_y,
            x1: 2045,
            x2: 2140,
            speed: 1,
            size: 30,
            display: function()
            {
                // Draw enemy.
                push();
                fill(random(180,255), 0, 0);
                ellipse(this.x_pos, this.y_pos-10, this.size);
                triangle(this.x_pos-10,this.y_pos+33,this.x_pos+10,this.y_pos+33,this.x_pos, this.y_pos);
                fill(255);
                ellipse(this.x_pos+7,this.y_pos-15,8);
                ellipse(this.x_pos-7,this.y_pos-15,8);
                stroke(255);
                strokeWeight(4);
                line(this.x_pos+7, this.y_pos-5,this.x_pos-7,this.y_pos-5);
                pop();
            },
            move: function()
            {
                this.x_pos += this.speed;
                if(this.x_pos < this.x1 || this.x_pos > this.x2)
                {
                    // reverse direction
                    this.speed *= -1;
                }
            },
            checkCharCollision: function()
            {
                if(abs(realPos - this.x_pos) < 20 && abs(char_y - this.y_pos) < 20)
                {
                    playerDied();
                }
            }
        }
    );
    
    
}
    

function draw()
{
//	background(100, 155, 255); // fill the sky blue
    background(0, 0, 139);

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y+30, width, height/4); // draw some green ground

	// Draw clouds.
    push();
    translate(scrollPos * 0.4, 0);
    drawClouds();
    pop();

	// Draw mountains.
    push();
    translate(scrollPos * 0.6, 0);
    drawMountains();
    pop();

	// Draw trees.
    push();
    translate(scrollPos * 0.8, 0);
    drawTrees();
    pop();

	// Draw houses.
    push();
    translate(scrollPos * 0.9, 0);
    drawHouses();
    pop();

	// Draw canyons.
    for(var i = 0; i < t_canyon.length; i++)
    {
    push();
    translate(scrollPos * 1, 0);
    drawCanyon(t_canyon[i]);
    checkCanyon(t_canyon[i]);
    pop();
    }
    
    // Draw pickup items.
    for(var i = 0; i < t_obj.length; i++)
    {
    push();
    translate(scrollPos * 1, 0);
    drawRing(t_obj[i]);
    checkRing(t_obj[i]);
    pop();
    }
    
    // Check for win or if charcter died/lost
    checkPlayerWon();
    checkPlayerDied();

    
    // Draw Enemies
    
    push();
    translate(scrollPos * 1, 0);
    for(var i = 0; i < enemies.length; i++)
    {
        enemies[i].display();
        enemies[i].move();
        enemies[i].checkCharCollision();
    }
    pop();
    
    
	// Draw game character.
	drawGameChar();
    
    // Score on screen
    fill(255);
    noStroke();
    textSize(32);
    text("SCORE: " + score, 20, 30);
    
    // Lives remaining on screen
    fill(255);
    noStroke();
    textSize(32);
    text("LIVES: " + lives, 200, 30);
    
    // tokens
    for(var i = 0; i < lives; i++)
    {
        fill(255,0,0);
        ellipse(349+i*40,15,20,20);
        ellipse(360+i*40,15,20,20);
        triangle(339+i*40,18,370+i*40,18,355+i*40,35);
    }


    // Conditionals for isWon/isLost
    if(isLost == true && lives == 0)
    {
        background(0,20,0);
        createCanvas(1024,576);
        fill(255,0,0);
        noStroke();
        textStyle(BOLD);
        textSize(40);
        text("Game over - you're crap. Press space to continue", 10, 300);
        textSize(40);
        text("Final score: " + score, 300, 400);
        text("Lives Remaining: " + lives, 270,460)
        console.log('LOSER');
        return;
    } 
    
    if(isWon == true && lives > 0) 
    {
        createCanvas(1024,576);
        fill(0,255,0);
        noStroke();
        textStyle(BOLD);
        textSize(40);
        text("WELL DONE - you won. Press space to continue", 10, 300);
        textSize(40);
        text("Final score: " + score, 300, 400);
        text("Lives Remaining: " + lives, 270,460)
        console.log('WINNER');
        return;
   }
    
    
	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
			if(char_x > width * 0.2)
			{
					char_x -= 5;
			}
			else
			{
					scrollPos += 5;
			}
	}

	if(isRight)
	{
			if(char_x < width * 0.8)
			{
					char_x  += 5;
			}
			else
			{
					scrollPos -= 5; // negative for moving against the background
			}
	}

	// Logic to make the game character rise and fall.
	if(char_y < floorPos_y)
	{
			char_y += 2;
			isJumping = true;
	}
	else
	{
			isJumping = false;
	}

	if(isFalling)
	{
			char_y += 5;
	}

	// Update real position of gameChar for collision detection.
	realPos = char_x - scrollPos;
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed(){

		// console.log(keyCode);
		// console.log(key);
    
    if(isLost || isWon)
{
    if(key == ' ')
    {
        nextLevel();
    }
    return;
}
    

	if(key == 'A' || keyCode == 37)
	{
			isLeft = true;
	}

	if(key == 'D' || keyCode == 39)
	{
			isRight = true;
	}

	if(key == ' ' || key == 'W')
	{
			if(!isJumping)
			{
					char_y -= 100;
			}
	}
}

function keyReleased(){

	if(key == 'A' || keyCode == 37)
	{
		isLeft = false;
	}

	if(key == 'D' || keyCode == 39)
	{
		isRight = false;
	}

}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
	// draw game character
    if(isLeft && isJumping)
    {
        
    // add your jumping-left code
    stroke(0);
    strokeWeight(4);
    //arms
    line(char_x-6,char_y+8,char_x-26,char_y-27);
    line(char_x+20,char_y+26,char_x+5,char_y+8);
    noStroke();
    fill(255,255,0);
    // head
    ellipse(char_x,char_y-20,25,25);
     //body
    triangle(char_x,char_y-15,char_x-10,char_y+30,char_x+10,char_y+30);
    stroke(0);
    fill(0);
    // mouth
    line(char_x,char_y-15,char_x-10,char_y-15); 
    noStroke();
    fill(0);
    // eyes
    ellipse(char_x,char_y-25,5,5); 
    ellipse(char_x-10,char_y-25,5,5);  
        

    }
    
    else if(isRight && isJumping)
    {
        
    // add your jumping-right code
    stroke(0);
    strokeWeight(4);
    //arms
    line(char_x+6,char_y+8,char_x+26,char_y-27);
    line(char_x-20,char_y+26,char_x-5,char_y+8);
    noStroke();
    fill(255,255,0);
    // head
    ellipse(char_x,char_y-20,25,25);
     //body
    triangle(char_x,char_y-15,char_x-10,char_y+30,char_x+10,char_y+30);
    stroke(0);
    fill(0);
    // mouth
    line(char_x,char_y-15,char_x+10,char_y-15); 
    noStroke();
    fill(0);
    // eyes
    ellipse(char_x,char_y-25,5,5); 
    ellipse(char_x+10,char_y-25,5,5);  
        
    
    }
    
    
    else if(isLeft)
    {
        
    // add your walking left code
    noStroke();    
    fill(255,255,0);
    ellipse(char_x,char_y-20,25,25);// head
    triangle(char_x,char_y-15,char_x-10,char_y+30,char_x+10,char_y+30); //body
    stroke(0);
    strokeWeight(4);
    line(char_x+10,char_y+10,char_x+20,char_y+10);
    line(char_x+10,char_y,char_x+20,char_y);
    line(char_x+10,char_y+20,char_x+20,char_y+20);
    line(char_x,char_y-15,char_x-10,char_y-15); // mouth
    noStroke();
    fill(0);
    ellipse(char_x-5,char_y-25,5,5); // eye
    
        
    }
    
    else if(isRight)
    {
        
    // add your walking right code
    noStroke();
    fill(255,255,0);
    ellipse(char_x,char_y-20,25,25);// head
    triangle(char_x,char_y-15,char_x-10,char_y+30,char_x+10,char_y+30); //body
    stroke(0);
    strokeWeight(4);
    line(char_x-10,char_y+10,char_x-20,char_y+10);
    line(char_x-10,char_y,char_x-20,char_y);
    line(char_x-10,char_y+20,char_x-20,char_y+20);
    line(char_x,char_y-15,char_x+10,char_y-15); // mouth
    noStroke();
    fill(0);
    ellipse(char_x+5,char_y-25,5,5); // eye
        
       
    }
    
    else if(isJumping || isFalling)
    {
        
    // add your jumping facing forwards code
    stroke(0);
    strokeWeight(4);
    // arms
    line(char_x-5,char_y+10,char_x-25,char_y-30); 
    line(char_x-5,char_y+28,char_x+25,char_y-30); 
    // head
    noStroke();
    fill(255,255,0);
    ellipse(char_x,char_y-20,25,25); 
    //body
    triangle(char_x,char_y-15,char_x-10,char_y+30,char_x+10,char_y+30); 
    // eyes
    fill(0); 
    ellipse(char_x-5,char_y-25,5,5);
    ellipse(char_x+5,char_y-25,5,5);
    // mouth
    noStroke(0); 
    fill(255,0,0)
    ellipse(char_x,char_y-15,10,10);
    }
    
    else
    {
    
    // add your standing front facing code
    stroke(0);
    strokeWeight(4);
    line(char_x,char_y,char_x-15,char_y+20); //arms
    line(char_x,char_y,char_x+15,char_y+20);   
    noStroke();
    fill(255,255,0);
    ellipse(char_x,char_y-20,25,25); //head
    triangle(char_x,char_y-15,char_x-10,char_y+30,char_x+10,char_y+30); //body
    fill(0); // eyes
    ellipse(char_x-5,char_y-25,5,5);
    ellipse(char_x+5,char_y-25,5,5);
    stroke(0); // mouth
    line(char_x-5,char_y-15,char_x+5,char_y-15);
    
    }
} 

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds()
{
    for(var i=0; i < clouds.length; i++)
    {
    noStroke();
    fill(random(0,255),random(0,255),random(0,255));
    ellipse(clouds[i].pos_x, clouds[i].pos_y, clouds[i].size);
    ellipse(clouds[i].pos_x+30, clouds[i].pos_y, clouds[i].size);
    ellipse(clouds[i].pos_x+60, clouds[i].pos_y, clouds[i].size);
    ellipse(clouds[i].pos_x+30, clouds[i].pos_y-20, clouds[i].size);
    }
}

// Function to draw mountains objects.
function drawMountains()
{
    for(var i=0; i < mountains.length; i++)
    {
    // mountain     
    fill(169); 
    triangle(mountains[i].pos_x,mountains[i].height,mountains[i].pos_x+85,mountains[i].height+393,mountains[i].pos_x-65,mountains[i].height+393);
    // snow 
    fill(255);
    triangle(mountains[i].pos_x,mountains[i].height,mountains[i].pos_x-15,mountains[i].height+80,mountains[i].pos_x+18,mountains[i].height+80);
    }
}

// Function to draw trees objects.
function drawTrees()
{
    for(var i=0; i < trees.length; i++)
    {
    noStroke();
    fill(165,42,42); 
    rect(trees[i].pos_x-5,height * 1.075 - 340,18,152);
    fill(0,255,0);
    triangle(trees[i].pos_x,trees[i].height,trees[i].pos_x-53,trees[i].height+70,trees[i].pos_x+57,trees[i].height+70);
    triangle(trees[i].pos_x,trees[i].height+50,trees[i].pos_x-53,trees[i].height+120,trees[i].pos_x+57,trees[i].height+120);
    // cherries
    fill(0,0,random(100,250)); 
    ellipse(trees[i].pos_x+17,trees[i].height+30,trees[i].size); 
    ellipse(trees[i].pos_x+17,trees[i].height+100,trees[i].size);
    ellipse(trees[i].pos_x-18,trees[i].height+55,trees[i].size);
    }
}

// Function to draw houses objects.
function drawHouses()
{
    for(var i=0; i < houseXs.length; i++)
    { 
    noStroke();
    // centre triangle
    fill(238,232,170);
    triangle(houseXs[i],house_y - 350,houseXs[i] - 40,house_y - 300,houseXs[i] + 40,house_y - 300);
    
    // dome 
    fill(255,228,196); 
    ellipse(houseXs[i] ,house_y - 230,220,160);
    
    // house box
    fill(238,203,173); 
    rect(houseXs[i]  - 110,house_y * 1.48 - 422,220,260);
    
    // columns
    fill(255,218,185); 
    rect(houseXs[i]  - 160,house_y * 1.09 - 350,50,345);
    rect(houseXs[i]  + 110,height * 0.815 - 380,50,345);
    
     // little triangles
    fill(238,232,170); 
    triangle(houseXs[i]  - 135,house_y - 360,houseXs[i]  - 160,house_y - 310,houseXs[i]  - 110,house_y - 310);
    triangle(houseXs[i]  + 135,house_y - 360,houseXs[i]  + 110,house_y - 310,houseXs[i]  + 160,house_y - 310); 
    
    // door
    fill(0); 
    rect(houseXs[i]  - 20,house_y * 2.9 - 808,50,75);
    }
    pop();
}


// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
    fill(50,50,0);
    rect(t_canyon.x_pos+350, floorPos_y+30, t_canyon.width, height - floorPos_y);
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
    if(realPos > t_canyon.x_pos+350 && realPos < t_canyon.x_pos+ 350 + t_canyon.width)
    {
      if(char_y >= floorPos_y)
      {
      console.log("canyon")
      isFalling = true;
      }
    }

    if(isFalling)
    {
       char_y +=2;
    }
}

// ----------------------------------
// Pick-up render and check functions
// ----------------------------------

// Function to draw pick-up objects.
function drawRing(t_obj)
{
    if(t_obj.isFound == false) 
    {
    fill(0,random(50,255),0);
    noStroke();    
    triangle(t_obj.x_pos-10,t_obj.y_pos+280,t_obj.x_pos+10,t_obj.y_pos+280,t_obj.x_pos,t_obj.y_pos+300);
    stroke(212,175,55);
    strokeWeight(10);
    fill(212,175,55,0);
    ellipse(t_obj.x_pos,t_obj.y_pos+320,t_obj.size,t_obj.size);
    }
}

// Function to check character has picked up an item.
function checkRing(t_obj)
{
    if(realPos < t_obj.x_pos + t_obj.size && realPos > t_obj.x_pos - t_obj.size) 
    {
      
//      if(char_y >= floorPos_y-30) 
//      {
//      console.log("found")
//      t_obj.isFound = true;
//      }
        
      if(!t_obj.isFound)
      {
            t_obj.isFound = true;
            score += 1;
            console.log(score);
      }
        
    }
}


function checkPlayerWon() 
{
    if(score == t_obj.length)
    {
        isWon = true;
        console.log('you won');
    }
    
}


function checkPlayerDied()
{
    if(char_y >  height)
    {
        playerDied();
    }
    
}


function playerDied()
{
        console.log('you died');
        if(lives > 0)
        {
            startGame();
            lives -= 1;
            console.log('lost a life');
            console.log(lives);
        }
        else
        {
            isLost = true;
            console.log('you lost');
        }
        
        if(lives == 0)
        {
            isLost = true;
        }   

    
}



function nextLevel()
{
    // DO NOT CHANGE THIS FUNCTION!
    console.log('next level');
}

