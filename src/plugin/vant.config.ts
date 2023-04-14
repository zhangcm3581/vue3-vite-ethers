import {  Popup, Button, Field , Slider ,CountDown, List, Empty, Loading ,NoticeBar  } from 'vant';

export function vant(app:any) {
    app.use(Popup)
    app.use(Button);
    app.use(Field);
    app.use(Slider);
    app.use(CountDown);
    app.use(List)
    app.use(Empty)
    app.use(Loading)
    app.use(NoticeBar)
}