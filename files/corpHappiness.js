function statusWidth() {
    const windowWidth = window.innerWidth;
	const _$el = document.querySelector('.talent_image .company .slider_item');
	
	if(_$el){
		if (windowWidth >= 1024) {
			_$el.style.width = '239px';
		} else if (windowWidth < 1024 && windowWidth >= 992) {
			_$el.style.width = '209px';
		} else if (windowWidth < 992 && windowWidth >= 810) {
			_$el.style.width = '189px';
		} else if (windowWidth < 810 && windowWidth >= 550) {
			_$el.style.width = '185px';
		} else {
			_$el.style.width = '185px';
		}
	}
}

function corpHappinessInit() {
    /* 幸福企業 */
	$('.talent_image .company .slider_item').each(function(){
		const _$el = this;
		const _$status_slick = $(this);
		const statusCount = _$status_slick[0].children.length;

		if (statusCount >= 4) {
			statusWidth();
			window.addEventListener('resize', () => statusWidth());
			
			if (statusCount % 3 == 1) {
				_$status_slick.slick({
					slidesToShow: 3,
					slidesToScroll: 3,
					autoplay: true,
					autoplaySpeed: 2000,
					arrows: true,
					infinite: true
				});
				_$status_slick.slick('slickAdd', '<div></div>');
				_$status_slick.slick('slickAdd', '<div></div>');
			} 
			else if (statusCount % 3 == 2) {
				_$status_slick.slick({
					slidesToShow: 3,
					slidesToScroll: 3,
					autoplay: true,
					autoplaySpeed: 2000,
					arrows: true,
					infinite: true
				});
				_$status_slick.slick('slickAdd', '<div></div>');
			} 
			else {
				_$status_slick.slick({
					slidesToShow: 3,
					slidesToScroll: 3,
					autoplay: true,
					autoplaySpeed: 2000,
					arrows: true,
					infinite: true
				});
			}
		} 
		else if (statusCount < 4 && statusCount >= 3) {
			let windowWidth = window.innerWidth;
			if (windowWidth >= 810) {
				_$el.style.width = '239px';
			} else {
				_$el.style.width = '185px';
			}
			window.addEventListener('resize', () => {
				windowWidth = window.innerWidth;
				if (windowWidth >= 810) {
					_$el.style.width = '239px';
				} else {
					_$el.style.width = '185px';
				}
			});
			_$status_slick.slick({
				slidesToShow: 3,
				arrows: false
			});
		} 
		else if (statusCount < 3 && statusCount >= 2) {
			let windowWidth = window.innerWidth;
			if (windowWidth >= 810) {
				_$el.style.width = '151px';
			} else {
				_$el.style.width = '115px';
			}
			window.addEventListener('resize', () => {
				windowWidth = window.innerWidth;
				if (windowWidth >= 810) {
					_$el.style.width = '151px';
				} else {
					_$el.style.width = '115px';
				}
			});
			_$status_slick.slick({
				slidesToShow: 2,
				arrows: false
			});
		} 
		else if (statusCount < 2 && statusCount >= 1) {
			let windowWidth = window.innerWidth;
			if (windowWidth >= 810) {
				_$el.style.width = '63px';
			} else {
				_$el.style.width = '45px';
			}
			window.addEventListener('resize', () => {
				windowWidth = window.innerWidth;
				if (windowWidth >= 810) {
					_$el.style.width = '63px';
				} else {
					_$el.style.width = '45px';
				}
			});
			_$status_slick.slick({
				slidesToShow: 1,
				arrows: false
			});
		} 
		else {
			_$el.style.width = 'auto';
		}

	});
}

document.addEventListener('readystatechange', function () {
    if (document.readyState == "complete") {
        setTimeout(function () {
            corpHappinessInit();
        }, 300);
    }
});

$(document).ready(function () {
    setTimeout(function () {

    }, 300);
});