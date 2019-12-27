import React from "react";
import Banner from "../../widget/Banner/Banner";

import TitleBar from "../../widget/TitleBar/TitleBar";
import MoviesSingleLineList from "../../widget/MoviesSingleLineList/MoviesSingleLineList";
import LongCommentPreviewList from "../../widget/LongCommentPreviewList/LongCommentPreviewList";
import axios from "axios";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hotLongCommentListTotal: 0,
            hotLongCommentList: null,
            hotMovieListTotal: 0,
            hotMovieList: null,
            recentMovieListTotal: 0,
            recentMovieList: null,
            bannerData: null
        }
    }

    componentDidMount() {
        this.getBannerData();
        this.getRecentMoviesData();
        this.getHotMoviesData();
        this.getHotLongCommentData();
    }

    getBannerData() {
        axios.get("/api/movie/recommend").then(
            res => {
                let movieList = [];
                let i = 0;
                for (let movie of res.data.movies) {
                    movieList.push({
                        key: i++,
                        id: movie.id,
                        title: movie.name,
                        description: movie.hasOwnProperty('movie_type') ? movie.movie_type : "",
                        imgSrc: movie.movie_cover
                    })
                }
                this.setState({
                    bannerData: movieList,
                })
            }
        )
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

    getHotMoviesData() {
        axios.get("/api/movie/hot").then(
            res => {
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
                    hotMovieListTotal: movieList.length,
                    hotMovieList: movieList,
                })
            }
        )
    }

    getHotLongCommentData() {
        axios.get("/api/longComments/hot").then(
            res => {
                let longCommentList = [];
                let i = 0;
                for (let comment of res.data.comments) {
                    longCommentList.push({
                        key: i++,
                        movieId: comment.comments.movieid,
                        commentId: comment.comments.longcommentsid,
                        // 基本信息
                        authorName: comment.comments.username,
                        movieName: comment.comments.moviename,
                        movieScore: comment.comments.score * 2,
                        editTime: comment.comments.createtimedate,
                        commentTitle: comment.comments.longcommentstitle,
                        commentContent: comment.comments.longcommentscontent,
                        authorPic: comment.comments.useravatar,
                        moviePic: comment.comments.moviecover,
                        likeNumber: comment.longcommentslikenum,
                        dislikeNumber: comment.longcommentsunlikenum,
                        likeType: comment.likeType
                    })
                }
                this.setState({
                    hotLongCommentListTotal: longCommentList.length,
                    hotLongCommentList: longCommentList,
                })
            }
        )
    }

    render() {
        return (
            <div id="home">
                <TitleBar key="a" title={"为您推荐"}/>
                <Banner key="b" data={this.state.bannerData}/>
                <MoviesSingleLineList key="c" withTitle={true} title={"正在热映"}
                                      data={this.state.recentMovieList}
                                      total={this.state.recentMovieListTotal}
                                      ShowMoreHref={"/theatricalLine"}
                                      isFirstNode={true} withShowMoreButton={true}/>

                <MoviesSingleLineList key="d" withTitle={true} title={"热门电影"}
                                      data={this.state.hotMovieList}
                                      total={this.state.hotMovieListTotal}
                                      ShowMoreHref={"/moviesGallery"}
                                      withShowMoreButton={true}/>

                <LongCommentPreviewList key="e" withTitle={true} title={"最受欢迎的影评"}
                                        data={this.state.hotLongCommentList}
                                        total={this.state.hotLongCommentListTotal}
                                        ShowMoreHref={"/hottestComments"}
                                        pageSize={3}
                                        isLastNode={true} withShowMoreButton={true}
                                        withMoviePicShow={true}/>
            </div>
        );
    }
}
