"use strict";

$(function () {
	app.init();
});

var app = {};

app.url = window.location;

app.getSelectedValues = function () {

	// When user selects from the dropdown menu
	$('select').change(function () {
		console.log("option changed!");

		// Get the selected cateogry type from user
		var selectedCategory = $(this).find(':selected').text();
		console.log(selectedCategory);

		// Contacting information above to get the unsplash picture URL
		var unsplashUrl = "https://source.unsplash.com/category/" + selectedCategory;
		console.log(unsplashUrl);

		//ajax call for downloading the image to server
		$.ajax({
			url: app.url + '/image-download.php',
			type: 'POST',
			data: {
				imageUrl: unsplashUrl
			}
		}).then(function () {
			// $('.colorBox').css({ "background": "none" });
			// run display image function
			app.displayImage();
			$('.form-color').fadeIn(400);
			$('.download').fadeIn(400);
			$('.headerText').css({ "opacity": ".5" });
		});
	}); // end of select change
};

// Init getting color palette
$('.form-color').on('submit', function (e) {
	e.preventDefault();
	app.displayColorPalette();
});

// display image on the page
app.displayImage = function () {

	// wrapping the url with image tag
	var unsplashImgTag = '<img id="myImage" src="images/photo.jpg?'+(+new Date())+'" alt="">';

	console.log(unsplashImgTag);
	// displaying the image insde imgContainer
	$('header').css({
		"background": "url(images/photo.jpg?"+(+new Date())+ ")",
		"background-size": "cover"
	});

	$('.imgContainer').html(unsplashImgTag);

	var myImage = $('#myImage')[0];

	console.log(myImage);
};

// displaying Color Palette
app.displayColorPalette = function () {

	//using color thief to get the color values
	var colorThief = new ColorThief();
	var dominantColor = colorThief.getColor(myImage);
	var paletteColors = colorThief.getPalette(myImage, 5);

	console.log(dominantColor);
	console.log(paletteColors);

	//storing color values into variable
	var color1 = paletteColors[0];
	var color2 = paletteColors[1];
	var color3 = paletteColors[2];
	var color4 = paletteColors[3];
	var color5 = paletteColors[4];

	console.log(color1);
	// displaying color values
	$('.colorBox1').css({ "background": "rgb(" + color1 + ")" });
	$('.colorBox2').css({ "background": "rgb(" + color2 + ")" });
	$('.colorBox3').css({ "background": "rgb(" + color3 + ")" });
	$('.colorBox4').css({ "background": "rgb(" + color4 + ")" });
	$('.colorBox5').css({ "background": "rgb(" + color5 + ")" });

	$('.label1').text("rgb(" + color1 + ")");
	$('.label2').text("rgb(" + color2 + ")");
	$('.label3').text("rgb(" + color3 + ")");
	$('.label4').text("rgb(" + color4 + ")");
	$('.label5').text("rgb(" + color5 + ")");
};

app.init = function () {
	app.getSelectedValues();
};