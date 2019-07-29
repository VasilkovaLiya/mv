'use strict';


//Подключение параллакса
$(document).ready(function () {
	if (document.body.clientWidth > 1170) {
		$('.parallax .parallax-layer').parallax({ 'yparallax': '30px', 'decay': 0.35 });
		}
});


//Форма - рейтинг(звездочки)
chooseStars();
function chooseStars() {
	var starsValue = document.getElementById('stars');
    var stars = document.querySelectorAll('.star');
	if (document.body.clientWidth > 1170) {
	
   

    var _loop = function _loop(i) {
        moveAndColorStars(i);
        stars[i].addEventListener('mouseout', clearStars);
        stars[i].parentElement.addEventListener('mouseout', clearStars);
		
		var event = 'click';
		// if(isMobile.iOS()){
		// event = 'touchstart';
		// }
		// if(isMobile.any()){
		// console.log('mob')
		// }
		
		stars[i].addEventListener(event, function () {
			color(i);

            starsValue.value = i + 1;
            stars[i].removeEventListener('mouseout', clearStars);
            stars[i].parentElement.removeEventListener('mouseout', clearStars);
            stars[i].parentElement.addEventListener('mouseout', checkStars);
            stars[i].parentElement.addEventListener('mouseout', checkValue);
		});
		
       
    };

    for (var i = 0; i < stars.length; i++) {
        _loop(i);
    };

   
	} else {
		alert('менее 1170');
		
		
		 var _loop = function _loop(i) {
		
		
			stars[i].addEventListener('touchstart', function () {
				
				color(i);
				starsValue.value = i + 1;           
			});
		 };
		 for (var i = 0; i < stars.length; i++) {
        _loop(i);
		};
		
	}
	 function checkStars() {
        var starClassArr = [];
        for (var i = 0; i < stars.length; i++) {
            starClassArr.push(stars[i].classList.contains('selected-star'));
        }
        //console.log(starClassArr);
        function isFalse(val) {
            return val == false;
        }
        if (starClassArr.every(isFalse)) {
            starsValue.value = '';
			 
        }
    }
	function checkValue() {
		if(starsValue.value) {
			
		} else {
			
			for (var i = 0; i < stars.length; i++) {
            stars[i].classList.remove('selected-star');
			}
		}
	}

    function moveAndColorStars(i) {
        stars[i].addEventListener('mousemove', function () {
            color(i);
        });
    }

    function color(i) {
	   
        for (var j = 0; j < stars.length; j++) {

            if (j <= i) {
		  
                stars[j].classList.add('selected-star');
            } else {
                stars[j].classList.add('nonselected-star');
            };
        }
    }

    function clearStars() {
        for (var i = 0; i < stars.length; i++) {
            stars[i].classList.remove('selected-star');
        }
    }
	
}




//ФОРМА - функционал селектов - выбор продукта, выбор типа бонусной
formSelect();
function formSelect() {
    var products = {
        'Кофе в зернах L\'Or Crema Absolu Classique 230 г': 'https://www.mvideo.ru/products/kofe-molotyi-jacobs-monarch-klassicheskii-70-g-20040501',
        'Кофе в зернах Jacobs Monarch классический 430 г': 'https://www.mvideo.ru/products/kofe-v-zernah-jacobs-monarch-klassicheskii-430-g-20040479',
        'Кофе в капсулах L\'Or Espresso Lungo Profondo 10х5,2г': 'https://www.mvideo.ru/products/kofe-v-kapsulah-l-or-espresso-lungo-profondo-10h5-2g-20042124',
        'Кофе молотый Jacobs Monarch классический 195 г': 'https://www.mvideo.ru/products/kofe-molotyi-jacobs-monarch-klassicheskii-70-g-20040501',
        'Кофе в зернах Jacobs Monarch классический 430 г2': 'https://www.mvideo.ru/products/kofe-v-zernah-jacobs-monarch-klassicheskii-430-g-20040479',
        'Кофе в капсулах L\'Or Espresso Lungo Elegante 52г': 'https://www.mvideo.ru/products/kofe-v-kapsulah-l-or-espresso-lungo-profondo-10h5-2g-20042124',
        'Кофе молотый Jacobs Monarch классический 70 г.3': 'https://www.mvideo.ru/products/kofe-molotyi-jacobs-monarch-klassicheskii-70-g-20040501',
        'Кофе в зернах Jacobs Monarch классический 430 г3': 'https://www.mvideo.ru/products/kofe-v-zernah-jacobs-monarch-klassicheskii-430-g-20040479',
        'Кофе в капсулах L\'Or Espresso Lungo Profondo 10х5,2г3': 'https://www.mvideo.ru/products/kofe-v-kapsulah-l-or-espresso-lungo-profondo-10h5-2g-20042124'
    };
	var products = ['Кофе в зернах L\'Or Crema Absolu Classique 230 г', 'Кофе в зернах Jacobs Monarch классический 430 г','Кофе в капсулах L\'Or Espresso Lungo Profondo 10х5,2г', 'Кофе молотый Jacobs Monarch классический 195 г'];

    var bonus = {
        'Виртуальная карта  М.Бонус': 9,
        'Карта М.Бонус': 8,
        'М.Видео-Альфабанк': 8,
        'М.Видео-ВТБ': 9,
        'М.Видео-Cетелем': 11
    };
    var inputProduct = document.getElementById('products');
	var prName = document.getElementById('product_name');
	var bnsName = document.getElementById('bonus_name');
    var inputBonuses = document.getElementById('bonuses'); 	
    var productList = document.getElementById('product__list');
    var bonusesList = document.getElementById('bonuses__list');
    
    inputProduct.addEventListener('click', getPrOptions); 
    inputBonuses.addEventListener('click', getBonusOptions);
    

    function getPrOptions() {
        productList.innerHTML = getPrCode();
		productList.style.display = 'block';
        inputProduct.classList.add('opened-select');		
    }
	function getBonusOptions() {
        bonusesList.innerHTML = getBonusesCode();
        bonusesList.style.display = 'block';
		inputBonuses.classList.add('opened-select');		
    }

	
    function getPrCode() {
        var code = '';
		for (var i = 0; i < products.length; i++) {
            code += '<div class="product">' + products[i] + '</div>';
        }
        return code;
    }
	function getBonusesCode() {
        var code = '';
        for (var item in bonus) {
            code += '<div class="bonus" data-numer="' + bonus[item] + '">' + item + '</div>';
        }
        return code;
    }
	
	
	
	clickWindow();
	function clickWindow() {
		
		window.addEventListener('click', function(event){
			
			if(inputProduct.classList.contains('opened-select')) {
				
				if(event.target.name!='products') {					
					productList.style.display = 'none';
					inputProduct.classList.remove('opened-select');
				} 
				else {					
					bonusesList.style.display = 'none';
					inputBonuses.classList.remove('opened-select');					
				}
			} else if (inputBonuses.classList.contains('opened-select')) {				
				if(event.target.name!='bonuses') {
					bonusesList.style.display = 'none';
					inputBonuses.classList.remove('opened-select');
				} else {
					productList.style.display = 'none';
					inputProduct.classList.remove('opened-select');				
				}
			}	else {
				console.log('3 '+event.target);	
			}
			
			
		});			
	}
	
	productList.addEventListener('click', pickProduct);
    function pickProduct(e) {
        e.preventDefault();
        var newValue = e.target.closest('div').innerHTML;
		inputProduct.value = newValue;
        prName.value = newValue;
        productList.style.display = 'none';
		inputProduct.classList.remove('opened-select');
    } 
	
	
	var cartTypeNumer;
    var maskLength;
    var maskSymb;
    
	bonusesList.addEventListener('click', pickBonus);
    function pickBonus(e) {
		e.preventDefault();
        var newValue = e.target.closest('div').innerHTML;
        inputBonuses.value = newValue;
		bnsName.value = newValue;
        bonusesList.style.display = 'none';
		inputBonuses.classList.remove('opened-select');
		
		
        var numerArr = [];
        var numerUnderscore = [];
        var inputForCartNum = document.getElementById('num');
        var hiddenValue = e.target.closest('div').dataset.numer; 
        cartTypeNumer = hiddenValue;
        for (var i = 0; i < cartTypeNumer; i++) {
            numerArr.push(9);
            numerUnderscore.push('_');
        }
        maskLength = numerArr.join('');
        maskSymb = numerUnderscore.join('');
        inputForCartNum.setAttribute('data', 'data-num');
        inputForCartNum.placeholder = maskSymb;
				

        // Маска номера телефона
        jQuery(function ($) {
            $(function () {

                //console.log(maskLength);
                $("#num").mask(maskLength, { placeholder: "_" });
            });
        });
    }
}

//ФОРМА - вывод подсказки 
showHint();
function showHint() {
    var question = document.querySelector('.hint__img');
    var hint = document.querySelector('.hint__text');

    question.addEventListener('mousemove', openHint);
    question.addEventListener('click', openHint);
    function openHint() {
        hint.style.display = 'block';
    }
    question.addEventListener('mouseout', closeHint);
    function closeHint() {
        window.setTimeout(function () {
            hint.style.display = 'none';
        }, 3000);
    }
}

//ПОДКЛЮЧЕНИЕ СЛИК-СЛАЙДЕРА
$(document).ready(function () {
    $('.products__list').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1367,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 1220,
            settings: {
                slidesToShow: 3
            }
        }, {
            breakpoint: 736,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '50px',
                slidesToShow: 1
            }
        }]
    });
});




//ПЛАВНЫЕ ПЕРЕХОДЫ ПО ВНУТРЕННИМ ССЫЛКАМ

moveToElement();
function moveToElement() {
	var moveToLinkBtn = document.querySelector('.btn__link');
	moveToLinkBtn.addEventListener('click', moveTo);

	var moveToLinks = document.querySelectorAll('li.menu__item > a');
	for(var i=0; i< moveToLinks.length; i++) {
		moveToLinks[i].addEventListener('click', moveTo);
	}

		

	function moveTo(e) {
		e.preventDefault;	
		var href = getHref(this);	
		function getHref (el) {
			return el.getAttribute('href');
		}
		var requiredElem = document.querySelector(href);
		  
		scrollTo(document.body, getCoords(requiredElem), 700);

		function scrollTo(element, to, duration) {
			if (duration <= 0) return;
			var difference = to - element.scrollTop;
			var perTick = difference / duration * 10;
		  
			setTimeout(function() {
				  element.scrollTop = element.scrollTop + perTick;
				  if (element.scrollTop === to) return;
				  scrollTo(element, to, duration - 10);
			}, 10);
		}
			
		function getCoords(elem) { 
			var box = elem.getBoundingClientRect();      
			return box.top + pageYOffset;  
		}
		  


	}
};




