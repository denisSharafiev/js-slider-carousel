window.addEventListener('DOMContentLoaded', function() {

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        // Нужно узнать ширину обёртки для карусели со страницы
        width = window.getComputedStyle(slidesWrapper).width;

        let slideIndex = 1;
        // Переменная для инфы о сдвиге
        let offset = 0;

        if(slides.length < 10) {
            total.textContent = `0${slides.length}`; 
            current.textContent = `0${slideIndex}`; 
        } else {
            total.textContent = slides.length;
            current.textContent = slideIndex; 
        }
        // Помещ. все слайды в строку в slidesField
        slidesField.style.width = 100 * slides.length + '%';
        slidesField.style.display = 'flex';
        slidesField.style.transition = '0.5s all';

        // Огранич. показ у wrapper(скрыв. эл., кот. не попадают в обл. видимости)
        slidesWrapper.style.overflow = 'hidden';
        //Задаём фикс., одинаковую ширину всем слайдам
        slides.forEach(slide => {
            slide.style.width = width;
        });

        // Dots
        slider.style.position = 'relative';
        const indicators = document.createElement('ol'),
                dots = [];
                indicators.classList.add('carousel-indicators');
                indicators.style.cssText = `
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 15;
                    display: flex;
                    justify-content: center;
                    margin-right: 15%;
                    margin-left: 15%;
                    list-style: none;`;
        slider.append(indicators);

        for(let i = 0; i < slides.length; i++) {
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1);
            dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
            `;
            if(i == 0) {
                dot.style.opacity = 1;
            }
            indicators.append(dot);
            dots.push(dot);
        }
        // Механизм проверки и изменения для offset(сейчас width - строка('Npx'), преобразуем и вырежем число(отсекаем симфолы, использю регуляр. выраж.))
        function deleteNotDigits(str) {
            return +str.replace(/\D/g, '');
        }
        // Стилизация dots
        function styleDots(item) {
            item.forEach(dot => dot.style.opacity = '.5');
            item[slideIndex - 1].style.opacity = 1;
        }

        // Обработчик для передвижения слайдов
        next.addEventListener('click', () => {
            // Если последний слайд, то возврат на 1й
            if(offset == deleteNotDigits(width) * (slides.length - 1)) {
                offset = 0;
            } else {
                offset += deleteNotDigits(width);                    // Когда клик на стрелку вперёд, к offset прибав. ширина ещё одного слайда и слайд смещ. 
            }
            slidesField.style.transform = `translateX(-${offset}px)`;
            // Отработ. нумер. слайдов
            if(slideIndex == slides.length) {
                slideIndex = 1;
            } else {
                slideIndex++;
            }

            if(slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            // dots
            styleDots(dots);
        });

        prev.addEventListener('click', () => {
            if(offset == 0) {
                offset = deleteNotDigits(width) * (slides.length - 1);
            } else {
                offset -= deleteNotDigits(width);                    // Когда клик на стрелку вперёд, к offset прибав. ширина ещё одного слайда и слайд смещ. 
            }
            slidesField.style.transform = `translateX(-${offset}px)`;

            if(slideIndex == 1) {
                slideIndex = slides.length;
            } else {
                slideIndex--;
            }

            if(slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            // dots
            styleDots(dots);
        });
        // функционал дотсов
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideTo = e.target.getAttribute('data-slide-to');

                slideIndex = slideTo;
                offset = deleteNotDigits(width) * (slideTo - 1);

                slidesField.style.transform = `translateX(-${offset}px)`;

                if(slides.length < 10) {
                    current.textContent = `0${slideIndex}`;
                } else {
                    current.textContent = slideIndex;
                }
                
            styleDots(dots);
            });
        });
});