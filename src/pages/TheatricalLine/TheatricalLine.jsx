import React from "react";
import QueueAnim from "rc-queue-anim";
import TitleBar from "../../widget/TitleBar/TitleBar";
import axios from "axios";
import MoviesSingleLineList from "../../widget/MoviesSingleLineList/MoviesSingleLineList";

const data = [
    {name: '罗小黑战记', score: 8.8, imgSrc: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2568288336.jpg"},
    {name: '罗小黑战记', score: 8.8, imgSrc: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2568288336.jpg"},
    {name: '罗小黑战记', score: 8.8, imgSrc: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2568288336.jpg"},
    {name: '罗小黑战记', score: 8.8, imgSrc: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2568288336.jpg"},
    {name: '罗小黑战记', score: 8.8, imgSrc: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2568288336.jpg"},
    {name: '罗小黑战记', score: 8.8, imgSrc: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2568288336.jpg"},
];

export default class TheatricalLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recentMovieListTotal: 0,
            recentMovieList: null,
        }
    }

    componentDidMount() {
        this.getRecentMoviesData();
    }

    getRecentMoviesData() {
        axios.get("/api/movie/latest").then(
            res => {
                console.log(res);
                let movieList = [];
                let i = 0;
                for (let movie of res.data.movies) {
                    movieList.push({
                        key: i++,
                        id: movie.id,
                        name: movie.name,
                        score: movie.movie_score,
                        imgSrc: movie.movie_cover
                    })
                }
                this.setState({
                    recentMovieListTotal: movieList.length,
                    recentMovieList: movieList,
                })
            }
        )
    }

    render() {
        return (<div id="home">
            <QueueAnim delay={300}>
                <TitleBar key="a" title={"院线热映"}/>
                <MoviesSingleLineList key="c" withTitle={true} title={"正在上映"}
                                      data={this.state.recentMovieList}
                                      total={this.state.recentMovieListTotal}
                                      ShowMoreHref={"/theatricalLine"} lineNum={100}
                                      isFirstNode={true} isLastNode={true} withShowMoreButton={true}
                                      withPagination={false}/>
            </QueueAnim>
        </div>);
    }
}
