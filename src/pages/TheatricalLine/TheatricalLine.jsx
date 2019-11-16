import React from "react";
import QueueAnim from "rc-queue-anim";
import TitleBar from "../../widget/TitleBar/TitleBar";
import MoviesList from "../../widget/MoviesList/MoviesList";

const data = [
    {name:'罗小黑战记',score:8.8,imgSrc:"https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2568288336.jpg"},
    {name:'罗小黑战记',score:8.8,imgSrc:"https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2568288336.jpg"},
    {name:'罗小黑战记',score:8.8,imgSrc:"https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2568288336.jpg"},
    {name:'罗小黑战记',score:8.8,imgSrc:"https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2568288336.jpg"},
    {name:'罗小黑战记',score:8.8,imgSrc:"https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2568288336.jpg"},
    {name:'罗小黑战记',score:8.8,imgSrc:"https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2568288336.jpg"},
]

export default class TheatricalLine extends React.Component {
    render() {
        return (<div id="home">
            <QueueAnim delay={300}>
                <TitleBar key="a" title={"院线热映"}/>
                <MoviesList key="b" withTitle={true} title={"正在上映"} data={data} isFirstNode={true}/>
                <MoviesList key="c" withTitle={true} title={"即将上映"} data={data} isLastNode={true}/>
            </QueueAnim>
        </div>);
    }
}
