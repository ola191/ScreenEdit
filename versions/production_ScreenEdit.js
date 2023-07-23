// Scrolling zoom speed (recommended values: 0.5, 0.1 - 1)
let zoomSpeed = document.querySelector(".screenshotToolContainer").getAttribute("zoomSpeed");

// Speed for movement (recommended values: 20, 1-30)
let moveSpeed = document.querySelector(".screenshotToolContainer").getAttribute("moveSpeed");

// Configuration for initial display

const configA = {
	//displayHeight: `${window.outerHeight / 6}`, //  will be changed for aspect ratio
	displayBorder: "2px solid black"
};

configA.displayWidth = document.querySelector(".screenshotToolContainer").getAttribute("canvasWidth")
// Css onfiguration for image 
let styleForImage = {
	border: '10px solid red',
	backgroundColor: 'lightgray',
	padding: '10px',
	borderRadius: '5px'
};

let windowWidth = window.screen.width * window.devicePixelRatio
let windowHeight = window.screen.height * window.devicePixelRatio
let number = windowWidth / windowHeight
let preparedNumber = parseFloat(number.toFixed(10))

configA.displayHeight = configA.displayWidth / preparedNumber

const htmlCode = `
    <canvas class="screenshotToolCanvas"></canvas>
    <div class="screenshotToolMenu">
        <div class="wrapper">
            <button style="transform: translateX(5px) translateY(1px);">&#x2212;</button>
            <input class="screenshotToolInputWrapper" type="range" min="1" max="5" value="5"/>
            <button style="transform: translateX(-5px) translateY(1px);">&#x2b;</button>
        </div>
        <button class="screenshotToolSave"><i class="fa fa-camera" style="font-size:15px"></i></button>
    </div>
`;

document.querySelector(".screenshotToolContainer").insertAdjacentHTML("beforeend", htmlCode);


let cssCode = `
.screenshotToolContainer {   
    margin: 0 !important; padding: 0 !important;
    display: flex;
    flex-direction: column;
}

.screenshotToolContainer * {
    box-sizing: border-box;
}

.screenshotToolMenu {
    margin: 0 !important; padding: 0 !important;
    display: flex;
    flex-direction: row;
    border: 2px solid black;
    border-top: none;
    height: 1.75em;
}
.wrapper {
    margin: 0 !important; padding: 0 !important;
    display: flex;
    flex-direction: row;
    position: relative;
    height: 100%;
    width: 90%;
}

.wrapper > button {
    margin: 0 !important; padding: 0 !important;
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 10%;
    font-size: 1.5em;
    font-weight: 100;
    padding: 0; margin: 0;
}

.screenshotToolInputWrapper {
    -webkit-appearance: none;
    border: none;
    width: 80%;
    height: 100%;
    transform: translateY(-0.15em);
}

.screenshotToolInputWrapper::-webkit-slider-runnable-track::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 50%;
    bottom: 0;
    background-color: grey; /* Set the color to grey */
}
.screenshotToolInputWrapper::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    margin-top: -4.5px; /* Centers thumb on the track */
    background-color: rgb(76, 154, 222);
    border-radius: 50%;
    height: 12.5px;
    width: 12.5px;    
}

.screenshotToolInputWrapper::-webkit-slider-runnable-track {
    background-color: rgb(76, 154, 222);
    height: 0.15rem;
    border-radius: 2px;
}

.screenshotToolInputWrapper::-moz-range-track {
    background-color: rgb(76, 154, 222);
    height: 0.15rem;
    border-radius: 2px;

}
.screenshotToolSave {
    display: flex;
    align-items: center; justify-content: center;
    color: rgb(76, 154, 222);
    width: 10%;
    height: 100%;
    line-height: 100%;
    background-color: aliceblue;
    border: none;
}
.screenshotToolSave:hover {
    background-color: lightsteelblue;
}
`;

let sheet = document.createElement("style")
sheet.innerHTML = cssCode
document.head.appendChild(sheet)


// Variables for handling mouse interactions
let mouseX = 0;
let mouseY = 0;
let prevMouseX = 0;
let prevMouseY = 0;
let imageX = 0;
let imageY = 0;
let isDragging = false;
let firstDrag = false;
let actualZoom = 5;

let inputZoom = document.querySelector(".screenshotToolInputWrapper")
inputZoom.addEventListener('input', (event) => {
	actualZoom = event.target.value
	const zoomedImageWidth = img.width * actualZoom;
	const zoomedImageHeight = img.height * actualZoom;

	if (zoomedImageWidth < canvasWidth) {
		actualZoom = canvasWidth / img.width;
	}

	if (zoomedImageHeight < canvasHeight) {
		actualZoom = canvasHeight / img.height;
	}

	if (imageX + zoomedImageWidth > canvasWidth) {
		imageX = Math.max(0, canvasWidth - zoomedImageWidth);
	}
	if (imageY + zoomedImageHeight > canvasHeight) {
		imageY = Math.max(0, canvasHeight - zoomedImageHeight);
	}

	const visibleWidth = canvasWidth / actualZoom;
	const visibleHeight = canvasHeight / actualZoom;


	console.log("Visible Width:", visibleWidth);
	console.log("Visible Height:", visibleHeight);

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(img, imageX, imageY, zoomedImageWidth, zoomedImageHeight);
});



// Configuration for the updated display
const configB = {
	displayWidth: `${window.outerWidth}`,
	displayHeight: `${window.outerHeight}`,
	displayBorder: "2px solid red"
};

// Function to apply styles to an element
function applyStyles(element, styles) {
	Object.assign(element.style, styles);
}

document.querySelector(".screenshotToolContainer").style.maxWidth = `${configA.displayWidth}px`

// Function to convert Blob to ImageBitmap
function blobToImageBitmap(blob) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			resolve(createImageBitmap(img));
		};
		img.onerror = reject;
		img.src = URL.createObjectURL(blob);
	});
}

// Canvas setup
const canvas = document.querySelector('.screenshotToolCanvas');
const ctx = canvas.getContext('2d');


applyStyles(canvas, {
	width: `${configA.displayWidth}px`,
	height: `${configA.displayHeight}px`,
	border: configA.displayBorder
});

// Event listener for paste event
window.addEventListener('paste', (event) => {
	console.log('paste event');
	pasteScreenshotToCanvas(event);
});

// Image object to hold the pasted image
let img

// Function to paste the screenshot to the canvas
async function pasteScreenshotToCanvas(event) {
	const clipboardData = event.clipboardData || window.clipboardData;
	if (!clipboardData) {
		return;
	}

	const items = clipboardData.items;
	if (!items) {
		return;
	}

	for (const item of items) {
		if (item.type.indexOf('image') !== -1) {
			const blob = item.getAsFile();
			try {
				img = await blobToImageBitmap(blob);

				canvas.width = img.width;
				canvas.height = img.height;

				ctx.clearRect(0, 0, canvas.width, canvas.height);

				ctx.drawImage(img, imageX, imageY, img.width * actualZoom, img.height * actualZoom);

			} catch (error) {
				console.error(error);
			}
			break;
		}
	}
}

// Event listeners for mouse interaction (dragging and panning) #1
canvas.addEventListener('mousedown', function(event) {
	if (event.button === 0) {
		isDragging = true;

	}
});

// Event listeners for mouse interaction (dragging and panning) #2
canvas.addEventListener('mouseup', function(event) {
	if (event.button === 0) {
		isDragging = false;
		firstDrag = false
	}
});


/**
 * Clamps the given value within the range [-1, 1].
 * @param {number} value - The value to be clamped.
 * @returns {number} The clamped value within the range [-1, 1].
 */

// Clamps the given value within the range [-1, 1].
function clampToRange(value) {
	return Math.min(1, Math.max(-1, value));
}

// Event listeners for mouse interaction (dragging and panning) #3
canvas.addEventListener('mousemove', function(event) {
	if (event.buttons === 1) {
		prevMouseX = mouseX;
		prevMouseY = mouseY;

		mouseX = event.clientX - canvas.offsetLeft;
		mouseY = event.clientY - canvas.offsetTop;

		let deltaX = clampToRange(mouseX - prevMouseX);
		let deltaY = clampToRange(mouseY - prevMouseY);
		if (firstDrag == false) {
			firstDrag = true;
		} else {
			if (imageX + deltaX < 0 && -(imageX - img.width + deltaX) / actualZoom < canvas.width) {
				if (imageX + deltaX * moveSpeed < 0 && -(imageX - img.width + deltaX * moveSpeed) / actualZoom < canvas.width) {
					imageX += deltaX * moveSpeed;
				} else {
					if (deltaX == -1) {
						let canUseUnit = parseInt(canvas.width - (-(imageX - img.width + deltaX) / actualZoom))
						imageX + deltaX * canUseUnit
					}
				}


			}
			if (imageY + deltaY < 0 && -(imageY - img.height + deltaY) / actualZoom < canvas.height) {
				if (imageY + deltaY * moveSpeed < 0 && -(imageY - img.height + deltaY * moveSpeed) / actualZoom < canvas.height) {
					imageY += deltaY * moveSpeed;
				} else {
					if (deltaY == -1) {
						let canUseUnit = parseInt(canvas.height - (-(imageY - img.height + deltaY) / actualZoom));
						imageY += deltaY * canUseUnit;
					}
				}

			}

			console.log()

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			ctx.drawImage(img, imageX, imageY, img.width * actualZoom, img.height * actualZoom);
		}
	}
});

// Variables for handling zoom interactions
const minZoom = 1;
const maxZoom = 5;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Event listener for zooming
canvas.addEventListener('wheel', function(event) {
	event.preventDefault();

	const delta = event.deltaY;

	if (delta > 0) {

		actualZoom = Math.max(minZoom, actualZoom - zoomSpeed);
	} else if (delta < 0) {
		actualZoom = Math.min(maxZoom, actualZoom + zoomSpeed);
	}

	const zoomedImageWidth = img.width * actualZoom;
	const zoomedImageHeight = img.height * actualZoom;

	if (zoomedImageWidth < canvasWidth) {
		actualZoom = canvasWidth / img.width;
	}

	if (zoomedImageHeight < canvasHeight) {
		actualZoom = canvasHeight / img.height;
	}

	if (imageX + zoomedImageWidth > canvasWidth) {
		imageX = Math.max(0, canvasWidth - zoomedImageWidth);
	}
	if (imageY + zoomedImageHeight > canvasHeight) {
		imageY = Math.max(0, canvasHeight - zoomedImageHeight);
	}

	const visibleWidth = canvasWidth / actualZoom;
	const visibleHeight = canvasHeight / actualZoom;


	console.log("Visible Width:", visibleWidth);
	console.log("Visible Height:", visibleHeight);

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(img, imageX, imageY, zoomedImageWidth, zoomedImageHeight);
});

// Function to create an Image element with a given source
function createImageElement(src) {
	const img = new Image();
	img.src = src;
	img.classList.add("screenshotToolInput")
	img.style.width = `${configA.displayWidth}px`
	return img;
}

// Function to save the canvas content as a Blob
function saveCanvasAsBlob() {
	const dataURL = canvas.toDataURL('image/png');
	const blobBin = atob(dataURL.split(',')[1]);
	const array = [];
	for (let i = 0; i < blobBin.length; i++) {
		array.push(blobBin.charCodeAt(i));
	}
	const fileBlob = new Blob([new Uint8Array(array)], {
		type: 'image/png'
	});
	return fileBlob;
}

// Function to get base64 data from a Blob
function getBase64FromBlob(blob) {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onload = function(event) {
			const base64 = event.target.result;
			resolve(base64);
		};
		reader.readAsDataURL(blob);
	});
}

async function saveCanvas() {
	event.preventDefault();
	const fileBlob = saveCanvasAsBlob();
	const objectURL = URL.createObjectURL(fileBlob);

	const reader = new FileReader();
	reader.onload = function(event) {
		const blobDataAsText = event.target.result;
	};
	reader.readAsDataURL(fileBlob);

	if (document.classList.contains('screenshotToolInput')) {
		const base64Value = await getBase64FromBlob(fileBlob);
		document.querySelector(".blobData").src = base64Value;
	}


	try {
		let imageInDom = document.querySelector('.screenshotToolInput');
		let img = createImageElement(objectURL);

		if (imageInDom) {
			imageInDom.classList.forEach(className => {
				if (className != "screenshotToolCanvas") {
					img.classList.add(className);
				}
			});
			imageInDom.replaceWith(img);
		} else {

			let imageContainer = document.createElement('div');
			imageContainer.appendChild(img);
			document.body.appendChild(imageContainer);
		}
		applyStyles(imageInDom, styleForImage);
	} catch (error) {
		console.error('Wystąpił błąd:', error);
	}
}

// Event listener for keyboard shortcut to save canvas content
document.addEventListener('keydown', async function(event) {
	if (event.ctrlKey && event.key === 's') {
		await saveCanvas()
	}
});

let saveButton = document.querySelector(".screenshotToolSave")
saveButton.addEventListener('click', async function(event) {
	await saveCanvas()
});