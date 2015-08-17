# callButton.js

Скрипт для отображения кнопки "Перезвонить Вам?"


- Задача скрипта отобразить кнопку и загрузить в 
скрытую панельку форму заказа звонка


- По клику на кнопке отображается панелька с формой 
заказа звонка


- Форма заказа звонка загружается в iframe панельки.


![Перезвонить Вам?](https://raw.githubusercontent.com/antirek/callButton.js/master/images/screenshot.png)



## Использование

### простое

`````javascript
<script type="text/javascript" src="http://developer.mobilon.ru/webcall/0.3-latest/callButton.js"></script>
<script type="text/javascript">
    callButton('yd8p1sk433');
</script>

`````


### с параметрами

`````javascript
<script type="text/javascript" src="http://developer.mobilon.ru/webcall/0.3-latest/callButton.js"></script>
<script type="text/javascript">
    callButton('yd8p1sk433', {
        title: 'Позвоните Сергею', 
        titleColor: '#FFFFFF',   
        backgroundColor: 'darkred',   
        top: '200px',   //отступ сверху
        icon: true,     //иконка телефона
        iconAnimated: true,  //иконка телефона моргает
        intrusiveMode: true,    //режим принудительного показа панели заказа звонка
        intrusiveTimeout: 10    //время, через которое покажется панель, указывается в секундах
        closeButtonTitle: 'закрыть'   // текст кнопки закрыть
        yandexMetrika: {
            counterId: '12345678',      //код Яндекс метрики
            goal: 'callbuttonpressed',  //код цели события
            callback: function (object) {   //функция при нажатии кнопки, можно отрабатывать разные цели в зависимости от object
                console.log('callback', object);
            }
        }
    });
</script>

`````


## Баги? Критика? Вопросы? Предложения?

email: serge.dmitriev@gmail.com
