var fadeOutBackgroundSpd = 0;//1000;
var fadeInBackgroundSpd = 0;//5000;
var iconAnim = 500;


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
						$('#about').animate({backgroundColor: 'rgba(236, 240, 241, 0.8)'}, 1000);
					});				
				});
			}				
		}else if($(item).hasClass('work-trigger')){
			if($('.head-work').css('margin-left') === '-500px'){
				$('.head-work').animate({'margin-left': '50px'}, 1200, function(){
					$('.head-work').animate({'margin-left': '0px'}, 200, function(){
						$('.content-body-work').fadeIn(1000);
						$('#work').animate({backgroundColor: 'rgba(236, 240, 241, 0.8)'}, 1000);
					});				
				});
			}				
		}else if($(item).hasClass('contact-trigger')){
			if($('.head-contact').css('margin-left') === '-500px'){
				$('.head-contact').animate({'margin-left': '50px'}, 1200, function(){
					$('.head-contact').animate({'margin-left': '0px'}, 200, function(){
						$('.content-body-contact').fadeIn(1000);
						$('#contact').animate({backgroundColor: 'rgba(52, 73, 94, 0.8)'}, 1000);
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
			fadeAll();
			fadeSelect($(this), direction);
			animateContentIn($(this), direction);
		}

	});

	/** Handles smooth scrolling
	*/
	$(document).on('click', '.list-inline li', function(){
		var str = '#' + $(this).attr('class');
		str = str.substring(0, str.length - 7)

		$('body').animate({
			scrollTop: $(str).offset().top
		}, 2500, function(){
		});

	});

	/** Handles form submission
	*/
	$(document).on('click', '.submit-contact', function(e){
		e.preventDefault();
	});

	$('.li-icon img').hover(function(){
		$(this).animate({opacity: 0.0}, iconAnim);
	}, function(){
		$(this).animate({opacity: 1.0}, iconAnim);
	});	

	$('.gh-icon img').hover(function(){
		$(this).animate({opacity: 0.0}, iconAnim);
	}, function(){
		$(this).animate({opacity: 1.0}, iconAnim);
	});	

	$('.glyphicon-envelope').hover(function(){
		$(this).animate({color: 'rgba(0, 122, 184, 1.0)'}, iconAnim);
	}, function(){
		$(this).animate({color: 'rgba(0, 0, 0, 1.0)'}, iconAnim);;
	});	

	$(document).on('click', '.submit-contact', function(e){
		e.preventDefault();
		// console.log('made it');
		var address = $(this).closest('.email-form').find('.email-address').val();
		var message = $(this).closest('.email-form').find('.message').val();

		$.get('/email', {address: address, message: message}, function(data){

		});
	});


	/**
	setup page
	*/
	$(window).load(function(){
		// $('html').animate({
		// 	scrollTop: $('#home').offset().top
		// }, 1000);
		// fadeAll();
		$('.home').addClass('active');
		$('#background-img2').fadeOut(0);
		$('#background-img3').fadeOut(0);
		animateContentOut();
	});

	setDivOffset();

});