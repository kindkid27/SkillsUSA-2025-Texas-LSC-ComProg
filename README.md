# Before we start
Hello! The printed resume is out of date and I just wanted to include the most recent version in the files. It's labaled as `Skills-USA-Resume.pdf`, so if you want to check it out, it's pretty good.

# How to run the programs
To run this program, simply navigate into the challenge folder you are trying to run `(e.x. All the Neighbors)`, run the `index.html` file and follow the instructions on the page.

# Internal notes
### directions:
Really Augmented has a database of multiple cartesian coordinate pairs. They need to determine the the closest point for each pair and output a json file with the results.


### Writing My thoughts
How can we determine the closest point?
What if for every pair in the input file, we go through each other pair in the file and find the closest one. Like, if it's [7, 5] and we have [1, 3], [9, 4], and [4, 3]. It sets [1, 3] as the closest and goes down until it finds one closer. We break up the pair into two numbers, same with the others, and compare them?

let's focus on actually getting the files first, because I haven't done anything like this before. Thank GOD I downloaded the mozilla MDN, I wouldn't be able to do this without them.

I'm not gonna be able to do this bro, I'm so cooked.

How can we detect the closeness of the initial number and the others?
what if we do that one thing where the closer the number is the higher another number is?
like if the initial number is 5, if the input includes 5 it would be 1, 0 would be 0, 3 would be something else, etc etc idk im tired, the hotel coffee sucks.


Okay, I did a lot of thinking and I'm gonna go with adding the X and Y differences between the inital number and the second number being compared. That's the total difference. The pair with the lowest difference will be the closest.

I'm gonna stop writing these, they're distracting me. The MDN did help me out a lot, I downloaded the entire thing lmao

I just finished, it's really unoptimized and won't pass the 90 seconds rule, but whatever. Never really have a chance.