var fadeOutBackgroundSpd = 200;
var fadeInBackgroundSpd = 0;


$(document).ready(function(){
	var h = window.innerHeight;

	var setDivOffset = function(){
		$('.bottom-left-mask').css('top', (0.9*h));
		$('.content').css('top', (0.39*h));		
		$('.content').css('height', h);		
	}

	var toggleActive = function(item){
		if(!$(item).hasClass('active')){
			$(item).toggleClass('active');
		}
		$(item).siblings('.active').toggleClass('active');
	};

	$(document).on('click', '.nav li', function(e){
		e.stopPropagation();
		toggleActive($(this));
	});
	
	var activate = function(item, dir){
		
		if(dir === 'down'){
			if($(item).hasClass('about-trigger')){
				toggleActive('.about');
			}else if($(item).hasClass('work-trigger')){
				toggleActive('.work');
			}else if($(item).hasClass('contact-trigger')){
				toggleActive('.contact');
			}	
		}else{
			if($(item).hasClass('about-trigger')){
				toggleActive('.home');
			}else if($(item).hasClass('work-trigger')){
				toggleActive('.about');
			}else if($(item).hasClass('contact-trigger')){
				toggleActive('.work');
			}				
		}					
	};

	var animateContentIn = function(item, dir){
		if($(item).hasClass('about-trigger')){
			if($('.head-about').css('margin-left') === '-500px'){
				$('.head-about').animate({'margin-left': '50px'}, 1200, function(){
					$('.head-about').animate({'margin-left': '0px'}, 200, function(){
						$('.content-body-about').fadeIn(1000);
					});				
				});
			}				
		}else if($(item).hasClass('work-trigger')){
			if($('.head-work').css('margin-left') === '-500px'){
				$('.head-work').animate({'margin-left': '50px'}, 1200, function(){
					$('.head-work').animate({'margin-left': '0px'}, 200, function(){
						$('.content-body-work').fadeIn(1000);
					});				
				});
			}				
		}else if($(item).hasClass('contact-trigger')){
			if($('.head-contact').css('margin-left') === '-500px'){
				$('.head-contact').animate({'margin-left': '50px'}, 1200, function(){
					$('.head-contact').animate({'margin-left': '0px'}, 200, function(){
						$('.content-body-contact').fadeIn(1000);
					});				
				});
			}
		}						
	};

	var animateContentOut = function(){
		$('.head-about').animate({'margin-left': '-500px'}, 500);
		$('.content-body-about').fadeOut(200);
		$('.head-work').animate({'margin-left': '-500px'}, 500);
		$('.content-body-work').fadeOut(200);
		$('.head-contact').animate({'margin-left': '-500px'}, 500);
		$('.content-body-contact').fadeOut(200);

	};

	var fadeAll = function(){
		$('#background-img1').fadeOut(fadeOutBackgroundSpd);
		$('#background-img2').fadeOut(fadeOutBackgroundSpd);
		$('#background-img3').fadeOut(fadeOutBackgroundSpd);
	};

	var fadeSelect = function(item, dir){

		if(dir === 'down'){
			if($(item).hasClass('about-trigger')){
				$('#background-img2').fadeIn(fadeInBackgroundSpd);
			}else if($(item).hasClass('work-trigger')){
				$('#background-img3').fadeIn(fadeInBackgroundSpd);
			}			
		}else{
			if($(item).hasClass('about-trigger')){
				$('#background-img1').fadeIn(fadeInBackgroundSpd);
			}else if($(item).hasClass('work-trigger')){
				$('#background-img2').fadeIn(fadeInBackgroundSpd);
			}else if($(item).hasClass('contact-trigger')){
				$('#background-img3').fadeIn(fadeInBackgroundSpd);
			}							
		}

	};

	$('.top-trigger').waypoint(function(direction){
		if(direction === 'down'){
			if(!$(this).hasClass('contact-trigger')){
				fadeAll();
				fadeSelect($(this), direction);
			}
			activate($(this), direction);
			animateContentIn($(this), direction);
		}else{
			activate($(this), direction);
		}
	});

	$('.bottom-trigger').waypoint(function(direction){
		if(direction === 'down'){

		}else{
			fadeSelect($(this), direction);
			animateContentIn($(this), direction);
		}

	});

	/** Handles smooth scrolling
	*/
	$(document).on('click', '.list-inline li', function(){
		var str = '#' + $(this).attr('class');
		str = str.substring(0, str.length - 7)

		$('html').animate({
			scrollTop: $(str).offset().top
		}, 2500);

	});

	/** Handles form submission
	*/
	$(document).on('click', '.submit-contact', function(e){
		e.preventDefault();
	});

	$(document).on('mouseover', '.li-icon img', function(){
		$(this).attr('src', '/images/li-blue.png')
	});

	$(document).on('mouseout', '.li-icon img', function(){
		$(this).attr('src', '/images/li-black.png')
	});


	/**
	setup page
	*/
	$(window).load(function(){
		$('html').animate({
			scrollTop: $('#home').offset().top
		}, 1000);
		$('.home').addClass('active');
		$('#background-img2').fadeOut(0);
		$('#background-img3').fadeOut(0);
		animateContentOut();
	});

	setDivOffset();

});