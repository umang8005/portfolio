// HADELINE

    jQuery(document).ready(function($){
	//set animation timing
	var animationDelay = 2500,
		//loading bar effect
		barAnimationDelay = 3800,
		barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
		//letters effect
		lettersDelay = 50,
		//type effect
		typeLettersDelay = 150,
		selectionDuration = 500,
		typeAnimationDelay = selectionDuration + 800,
		//clip effect 
		revealDuration = 1000,
		revealAnimationDelay = 2000;
	
	initHeadline();
	

	function initHeadline() {
		//insert <i> element for each letter of a changing word
		singleLetters($('.cd-headline.letters').find('b'));
		//initialise headline animation
		animateHeadline($('.cd-headline'));
	}

	function singleLetters($words) {
		$words.each(function(){
			var word = $(this),
				letters = word.text().split(''),
				selected = word.hasClass('is-visible');
			for (i in letters) {
				if(word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
				letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
			}
		    var newLetters = letters.join('');
		    word.html(newLetters).css('opacity', 1);
		});
	}

	function animateHeadline($headlines) {
		var duration = animationDelay;
		$headlines.each(function(){
			var headline = $(this);
			
			if(headline.hasClass('loading-bar')) {
				duration = barAnimationDelay;
				setTimeout(function(){ headline.find('.cd-words-wrapper').addClass('is-loading') }, barWaiting);
			} else if (headline.hasClass('clip')){
				var spanWrapper = headline.find('.cd-words-wrapper'),
					newWidth = spanWrapper.width() + 10
				spanWrapper.css('width', newWidth);
			} else if (!headline.hasClass('type') ) {
				//assign to .cd-words-wrapper the width of its longest word
				var words = headline.find('.cd-words-wrapper b'),
					width = 0;
				words.each(function(){
					var wordWidth = $(this).width();
				    if (wordWidth > width) width = wordWidth;
				});
				headline.find('.cd-words-wrapper').css('width', width);
			};

			//trigger animation
			setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ) }, duration);
		});
	}

	function hideWord($word) {
		var nextWord = takeNext($word);
		
		if($word.parents('.cd-headline').hasClass('type')) {
			var parentSpan = $word.parent('.cd-words-wrapper');
			parentSpan.addClass('selected').removeClass('waiting');	
			setTimeout(function(){ 
				parentSpan.removeClass('selected'); 
				$word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
			}, selectionDuration);
			setTimeout(function(){ showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);
		
		} else if($word.parents('.cd-headline').hasClass('letters')) {
			var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
			hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
			showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

		}  else if($word.parents('.cd-headline').hasClass('clip')) {
			$word.parents('.cd-words-wrapper').animate({ width : '2px' }, revealDuration, function(){
				switchWord($word, nextWord);
				showWord(nextWord);
			});

		} else if ($word.parents('.cd-headline').hasClass('loading-bar')){
			$word.parents('.cd-words-wrapper').removeClass('is-loading');
			switchWord($word, nextWord);
			setTimeout(function(){ hideWord(nextWord) }, barAnimationDelay);
			setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('is-loading') }, barWaiting);

		} else {
			switchWord($word, nextWord);
			setTimeout(function(){ hideWord(nextWord) }, animationDelay);
		}
	}

	function showWord($word, $duration) {
		if($word.parents('.cd-headline').hasClass('type')) {
			showLetter($word.find('i').eq(0), $word, false, $duration);
			$word.addClass('is-visible').removeClass('is-hidden');

		}  else if($word.parents('.cd-headline').hasClass('clip')) {
			$word.parents('.cd-words-wrapper').animate({ 'width' : $word.width() + 10 }, revealDuration, function(){ 
				setTimeout(function(){ hideWord($word) }, revealAnimationDelay); 
			});
		}
	}

	function hideLetter($letter, $word, $bool, $duration) {
		$letter.removeClass('in').addClass('out');
		
		if(!$letter.is(':last-child')) {
		 	setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);  
		} else if($bool) { 
		 	setTimeout(function(){ hideWord(takeNext($word)) }, animationDelay);
		}

		if($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
			var nextWord = takeNext($word);
			switchWord($word, nextWord);
		} 
	}

	function showLetter($letter, $word, $bool, $duration) {
		$letter.addClass('in').removeClass('out');
		
		if(!$letter.is(':last-child')) { 
			setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration); 
		} else { 
			if($word.parents('.cd-headline').hasClass('type')) { setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('waiting'); }, 200);}
			if(!$bool) { setTimeout(function(){ hideWord($word) }, animationDelay) }
		}
	}

	function takeNext($word) {
		return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
	}

	function takePrev($word) {
		return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
	}

	function switchWord($oldWord, $newWord) {
		$oldWord.removeClass('is-visible').addClass('is-hidden');
		$newWord.removeClass('is-hidden').addClass('is-visible');
	}
});

// LOADER

    $(window).on("load",function(){
        $(".overlay").fadeOut(4000);
    });

// FILTER GALLRY

$(".filter a").click(function (e) {
	e.preventDefault();
	var a = $(this).attr("href");
	a = a.substr(1);
	$(".sets a").each(function () {
	  if (!$(this).hasClass(a) && a != "") $(this).addClass("hide");
	  else $(this).removeClass("hide");
	});



// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("btncontainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
	var current = document.getElementsByClassName("btn-active");
	current[0].className = current[0].className.replace(" btn-active", "");
	this.className += " btn-active";

}
});


let imgs = document.querySelectorAll("img");
  let count;
  imgs.forEach((img, index) => {
	img.addEventListener("click", function (e) {
	  if (e.target == this) {
		count = index;
		let openDiv = document.createElement("div");
		let imgPreview = document.createElement("img");
		let butonsSection = document.createElement("div");
		butonsSection.classList.add("butonsSection");
		let closeBtn = document.createElement("button");
		let nextBtn = document.createElement("button");
		let prevButton = document.createElement("button");
		prevButton.innerText = "Previous";
		nextBtn.innerText = "Next";

		nextBtn.classList.add("nextButton");
		prevButton.classList.add("prevButton");
		nextBtn.addEventListener("click", function () {
		  if (count >= imgs.length - 1) {
			count = 0;
		  } else {
			count++;
		  }

		  imgPreview.src = imgs[count].src;
		});

		prevButton.addEventListener("click", function () {
		  if (count === 0) {
			count = imgs.length - 1;
		  } else {
			count--;
		  }

		  imgPreview.src = imgs[count].src;
		});

		closeBtn.classList.add("closeBtn");
		closeBtn.innerText = "Close";
		closeBtn.addEventListener("click", function () {
		  openDiv.remove();
		});

		imgPreview.classList.add("imgPreview");
		imgPreview.src = this.src;

		butonsSection.append(prevButton, nextBtn);
		openDiv.append(imgPreview, butonsSection, closeBtn);

		openDiv.classList.add("openDiv");

		document.querySelector("body").append(openDiv);
	  }
	});
  });

// BACK-TO-TOP

$(window).scroll(function(){
	if($(this).scrollTop() > 0){
		$(".back-to-top").fadeIn();
	}
	else
	{
		$(".back-to-top").fadeOut();
	}
});
$(document).ready(function(){
	$(".back-to-top").click(function(){
		$("html").animate({scrollTop : 0 });
	});
});

$(document).ready(function(){
	$(".switch-icon").click(function(){
		$(".theme-switch").toggleClass("slide-left");
	});
	$("ul li").click(function(){
		var color = $(this).css("background-color");
		$(".background-color").css("background-color", color);
	});
	$("ul li").click(function(){
		var color = $(this).css("background-color");
		$(".text-color").css("color", color);
	});
	$("ul li").click(function(){
		var color = $(this).css("background-color");
		$(".border-color").css("border-color", color);
	});
});