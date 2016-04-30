# Drawing on the Web
## Assignment 8 - Final Project

Eigth Assignment for CSCI-UA.0380-002 - Drawing on the Web
[Link to Assignment](http://i6.cims.nyu.edu/~jcc608/drawingOnTheWeb/Final/)

### Criteria
######Outline
  - Thoughtfully-considered project outline of at least 200 words (3 points)
  - At least one sketch of your idea (2 points)

######Project
  - Project should incorporate graphical elements such as bitmap images, SVG, and/or styled div tags. (4 points)
  - Project should include durational changes in the form of CSS transitions, CSS animation, or HTML canvas animation. (4 points)
  - Project should use JavaScript to dynamically apply randomness to some aspect of the drawing. (4 points)
  - Well-formed HTML, CSS, and JavaScript. JavaScript and CSS should be linked to in separate, external documents. Project should be in a completed state, with regard for display in current versions of Chrome, Safari, and Firefox. (4 points)
  - Project should be placed under version control in a publicly-accessible Git repository with a descriptive README file. (4 points)
  
######Presentation
  - Well-prepared in-class presentation, 3–4 minutes in length, of project concept and development (5 points)


### Instructions

Outline
>Before you begin working on your final project, take some time to consider how you would like to approach it. How will you explore randomness in a way that is of interest to you? What kinds of forms do you intend to create? What kind of interactivity will there be and how will you achieve it?
Write a concise project outline of at least 200 words describing your intent. Include at least one sketch (hand-drawn, Photoshopped, or coded) to illustrate this. While you will not be held to every detail of your outline, your final project should be clearly derived from what you set out to do. If you will be working with a partner, you will need to write and sketch the outline collaboratively and put both of your names on it.
Submit your project outline by Tuesday, April 19 via NYU Classes as a PDF upload to the “Final Project Outline” assignment. If you work in pairs, you should both submit a copy of the outline via NYU Classes.

Project.
>The final project is an opportunity for you to develop a refined web drawing with the coding techniques we have been exploring all semester. It can exist on a single page or span multiple web pages. Your project should incorporate graphical elements such as bitmap images, SVG, and/or styled div tags. Your project should also include durational changes in the form of CSS transitions, CSS animation, or HTML canvas animation.
Your project should creatively explore randomness in some way. We have discussed using JavaScript to dynamically generate random numbers that can be used in your code. This could be applied to a variety of drawing attributes such as color, position, speed, scale, etc.
Your JavaScript and CSS should be linked to as external documents. The site should be viewable with current versions of Chrome, Safari, and Firefox. As you complete your work, pay attention to presentational aspects of the site and the overall quality of its appearance. Although there are several required elements, your project does not need to be highly complex. It should, however, be polished.
Additionally, use GitHub to place your project under version control in a publicly-accessible Git repository with a descriptive README file.

Presentation.
>You will be required to do a brief presentation of your work on Tuesday, May 3. This is a time for you to share your accomplishments and describe your process. Your presentation should be 3–4 minutes in length and well-prepared. As with the project outline, the presentation is part of your grade. Consider how you will introduce, describe, and demo your work and also talk about its technical development.

### Description
At first it was a little difficult deciding on a project to complete for this final assignment, but after the HTML Canvas assignment, I was confident in my project choice. For the HMTL Canvas assignment, I decided that one of my canvases would be a little Flappy Bird game. It was very simple, with few graphics, but it sparked my interest in creating another game. Looking back on simple 8 bit games, I chose to recreate the classic Dig Dug game for this assignment, a game that has a mixture of complexity and entertainment suitable for this project.  

In order to create the game, I used p5.js and its p5.play library. Utilization of sprites and groups were essential for the animation and interactivity needed to create a game of this nature. To incorporate randomness, enemies are loaded in random places before the game begins. Groups() from p5.play are also used to classify different types of sprites. There are two different types of sprites (digger and block), and three different groups (blocks, enemies, and emptyBlocks). The reason for using three types of groups was to take advantage of p5.play’s sprite collider function. Using this, I was able to write callback functions whenever the enemy or the digger hit a block or emptyBlock. For interactivity, users are able to move the digger with directional key presses, and attack an enemy with the strike of the 'X' key.

I hope you have as much fun playing, as I had creating this game! Have fun!
