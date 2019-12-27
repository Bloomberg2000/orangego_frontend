import React from "react";
import QueueAnim from "rc-queue-anim";
import TitleBar from "../../widget/TitleBar/TitleBar";
import MoviesList from "../../widget/MoviesList/MoviesList";
import {Col, Row, Tag} from "antd";
import './MoviesGallery.css'
import axios from "axios";

const {CheckableTag} = Tag;


const filterType = ["类型", "地区", "年代", "特色"];
const filterList = [
    ["剧情", "喜剧", "动作", "爱情", "科幻", "动画", "悬疑", "惊悚", "恐怖", "犯罪", "同性", "音乐", "歌舞", "传记", "历史战争", "西部奇幻", "冒险", "灾难", "武侠", "情色"],
    ["中国大陆", "美国", "中国香港", "中国台湾", "日本", "韩国", "英国", "法国", "德国", "意大利", "西班牙", "印度", "泰国", "俄罗斯", "伊朗", "加拿大", "澳大利亚", "爱尔兰", "瑞典", "巴西", "丹麦"],
    ["2019", "2018", "2010年代", "2000年代", "90年代", "80年代", "70年代", "60年代"],
    ["经典", "青春", "文艺", "搞笑", "励志", "魔幻", "感人", "女性", "黑帮"]
];

export default class MovieGallary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesPage: 1,
            moviesTotal: 0,
            moviesList: null,
            selectedTags: [],
        };
    }

    getMovieData(pageNum, pageSize) {
        if (this.state.selectedTags.length === 0) {
            axios.get("/api/movie/list?page=" + pageNum + "&size=" + pageSize).then(
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
                        moviesList: movieList,
                        moviesTotal: res.data.num,
                        moviesPage: pageNum
                    })
                }
            )
        } else {
            axios.post("/api/movie/search?page=" + pageNum + "&size=" + pageSize, {terms: this.state.selectedTags}).then(
                res => {
                    let movieList = [];
                    let i = 0;
                    for (let movie of res.data.result) {
                        movieList.push({
                            key: i++,
                            id: movie.movieid,
                            name: movie.moviename,
                            score: movie.moviescore,
                            imgSrc: movie.moviecover
                        })
                    }
                    this.setState({
                        moviesList: movieList,
                        moviesTotal: res.data.num,
                        moviesPage: pageNum
                    })
                }
            )
        }
    }

    handleChange(tag, checked, arrayIndex) {
        const {selectedTags} = this.state;
        let nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        if (checked) {
            for (let otherTags of filterList[arrayIndex]) {
                if (otherTags === tag) {
                    continue;
                }
                nextSelectedTags = nextSelectedTags.filter(t => t !== otherTags);
            }
        }
        this.setState({selectedTags: nextSelectedTags}, () => {
            this.movieList.setPageNum(1);
        });
    }

    onRef(name, ref) {
        switch (name) {
            case 'movieList':
                this.movieList = ref;
                break
            default:
                break;
        }
    }

    render() {
        const {selectedTags} = this.state;
        return (
            <div className="movies-gallery">
                <QueueAnim delay={300}>
                    <TitleBar key="a" title={"选电影"}/>
                    <div key="b" style={{
                        background: '#fff',
                        padding: '16px 26px 26px'
                    }}>
                        {filterList.map((filters, index) => {
                            return (
                                <div key={index} style={{paddingBottom: '5px'}}>
                                    <Row>
                                        <Col md={2} xl={1}>
                                            <h6 style={{marginRight: 8, display: 'inline'}}>{filterType[index]}:</h6>
                                        </Col>
                                        <Col md={22} xl={23}>
                                            {filters.map((tag, key) => {
                                                return (
                                                    <CheckableTag
                                                        key={tag}
                                                        checked={selectedTags.indexOf(tag) > -1}
                                                        onChange={(checked) => this.handleChange(tag, checked, index)}
                                                    >
                                                        {tag}
                                                    </CheckableTag>
                                                )
                                            })}
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })}
                    </div>
                    <MoviesList key="c" title={"正在上映"}
                                data={this.state.moviesList} total={this.state.moviesTotal}
                                page={this.state.moviesPage} onRef={this.onRef.bind(this)}
                                getDataFunction={this.getMovieData.bind(this)}
                    />
                </QueueAnim>
            </div>);
    }
}
