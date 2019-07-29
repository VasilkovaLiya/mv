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



