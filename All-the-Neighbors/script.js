// region Imports
// We need to get the information from the page, so lets get some constants!
const fileInputBox = document.getElementById("file"); // This is the file that the user submitted
const fileContentDisplay = document.getElementById("file-content");
const messageDisplay = document.getElementById("message");

// region Message Handler
// displays stuff on the page
function showMessage(message, type) {
	messageDisplay.textContent = message; // set the message
	messageDisplay.style.color = type === "error" ? "red" : "green"; // set the color of the message
}

// region File Handler
// actually read the file and proccess the information inside of it

fileInputBox.addEventListener("change", handleFileSelection); // add an event listener to detect file changes

function handleFileSelection(event) {
	// runs whenever a change is detected
	const file = event.target.files[0]; // get the file
	var inputFileName = file.name.split(".");
	console.log(inputFileName[0]);
	fileContentDisplay.textContent = ""; // Clear previous file content
	messageDisplay.textContent = ""; // Clear previous messages

	if (!file) {
		// make sure the files exists
		showMessage("No file selected. Please choose a file.", "error"); // tell the user to choose a file :>
		return;
	}

	if (!file.type.startsWith("application/json")) {
		// checks the file to see if it's not a json file
		showMessage(
			"Please select a JSON file with the correct formatting.",
			"error"
		);
		return;
	}

	const reader = new FileReader(); // after the validation, read the file
	reader.onload = () => {
		obj = JSON.parse(reader.result);

		// Lets make it call the functions we used in Mock Data under await, so I don't lose my mind moving everything.
		// format it in the way of the mock
		// the way we'll do this is make it add the element along with the next one in an array format, since the next is the y-axis of the same pair.

		var result = doTheMainThing(obj.pairList);
        var final = JSON.stringify({"allLocations": [result]}, null, 2)
        
        var element = document.createElement('a');
        element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(final));
        element.setAttribute('download', `${inputFileName[0]}Output`);
        
        element.style.display = 'none';
        document.body.appendChild(element);
        
        element.click();
        
        document.body.removeChild(element);
        fileContentDisplay.textContent = final; // show the result   
            

	};
	reader.onerror = () => {
		// if there was an error, stop it from crashing the script
		showMessage("Error reading the file. Please try again.", "error");
	};
	reader.readAsText(file); // finalize the action :>
}

/*
// region Mock Data
    this is before I implimented the parsing the pairList into JavaScript objects, 
    so I'm using mock data to see if i can actually do this.
*/

function pos(num) {
	return Number(num) * Math.sign(Number(num));
}
function doTheMainThing(pairList) {
	console.log(pairList); // show us what the pairList is

	var newList = [];
	for (let i = 0; i < pairList.length; i++) {
		// for every array in pairList, run the following
		var init = pairList[i]; // init is the array at i of pairList
		var closestX = 9999999; // set this to a very high number so it's never close
		var closestY = 9999999; // this too
		var xs = [];
		var ys = [];
		var diffs = [];
		console.log(`Looking for ${init} meow`);
		pairList.forEach((element) => {
			// for every number in pairList again

			/*
        ADD UP THE DIFFERENCES TO FIND THE SMALLEST DIFFERENCE
        how do we do that

        we have 3 temp lists: X, Y, & Diff
        Diff is the difference between the Init X and the element X, Y is the same thing, but Y
        We find the index of the smallest DIff, match it up to the X & Y, and we have our closest pair!

        get the difference of the X of the init and element [NOT DONE]
        get the difference of the Y of the init and element [NOT DONE]

        ADD UP THE DIFFERENCE, STORE IN FIRST PAIRLIST LOOP [NOT DONE]
        ONCE THE SECOND LOOP IS DONE, SET THE CLOSEST PAIR AS THE ONE WITH THE SMALLEST DIFFERENCE [NOT DONE]
        
        */

			if (init[0] == element[0]) {
				// if it's the same as the number we're looking for the closest of
				return; // exit, this is the number we're looking for, we need to look for other numbers
			}

			// X difference
			let xdiff = pos(pos(element[0]) - pos(init[0]));
			// y difference
			let ydiff = pos(pos(element[1]) - pos(init[1]));

			// total difference
			let diff = pos(xdiff + ydiff);

			xs.push(Number(element[0]));
			ys.push(Number(element[1]));
			diffs.push(diff);
			console.log(diffs); // THIS IS THE ONE
		});
		lowestDiff = Math.min(...diffs);
		// how can we find the index of the lowest diff?
		// uneffecient way: go through each number in the array until we find lowestDiff, and look at what the index is
		for (let index = 0; index < diffs.length; index++) {
			const element = diffs[index];
			if (element == lowestDiff) {
				var lowestDiffIndex = index;
			}
		}
		var closestY = ys[lowestDiffIndex];
		var closestX = xs[lowestDiffIndex];

		newList.push(
			`closestPoint:[${closestX}, ${closestY}],location: [${init}]`
		);
	}
    return(newList);
}
