import React from "react";
import QueueAnim from 'rc-queue-anim';
import Banner from "../../widget/Banner/Banner";
import CommentList from "../../widget/CommentList/CommentList";
import TitleBar from "../../widget/TitleBar/TitleBar";
import MoviesSingleLineList from "../../widget/MoviesSingleLineList/MoviesSingleLineList";


const bannerData = [
    {
        title: '罗小黑战记',
        description: "2000",
        imgSrc: "https://pic1.iqiyipic.com/image/20191111/ff/f9/v_130601874_m_601_m7_220_124.jpg"
    },
    {
        title: '罗小黑战记',
        description: "2001",
        imgSrc: "https://pic4.iqiyipic.com/image/20191112/4c/26/v_50223166_m_601_m8_220_124.jpg"
    },
    {
        title: '罗小黑战记',
        description: "2002",
        imgSrc: "https://pic7.iqiyipic.com/image/20190810/bf/0c/v_112873415_m_601_m4_220_124.jpg"
    },
    {
        title: '罗小黑战记',
        description: "2003",
        imgSrc: "https://pic4.iqiyipic.com/image/20190808/ab/75/v_50116514_m_601_m7_220_124.jpg"
    },
    {
        title: '罗小黑战记',
        description: "2004",
        imgSrc: "https://pic4.iqiyipic.com/image/20191114/f5/51/a_100238925_m_601_m6_220_124.jpg"
    },
    {
        title: '罗小黑战记',
        description: "2005",
        imgSrc: "https://pic3.iqiyipic.com/common/lego/20191115/6cb286496e1548cd80bf7cba8f35e4a8.jpg"
    },
    {
        title: '罗小黑战记',
        description: "2006",
        imgSrc: "https://pic2.iqiyipic.com/common/lego/20191113/265d0d577fc944a58ca4cc6bbcf80135.jpg"
    },
    {
        title: '罗小黑战记',
        description: "2007",
        imgSrc: "https://pic3.iqiyipic.com/common/lego/20191115/641ab8668fa34cf3bfdfbc06e1b9bc46.jpg"
    },
    {
        title: '罗小黑战记',
        description: "2008",
        imgSrc: "https://pic0.iqiyipic.com/image/20191012/d4/e3/a_100317150_m_601_m4_220_124.jpg"
    },
    {
        title: '罗小黑战记',
        description: "2009",
        imgSrc: "https://pic4.iqiyipic.com/image/20190605/51/7b/a_100300228_m_601_m1_220_124.jpg"
    },
    {
        title: '罗小黑战记',
        description: "2010",
        imgSrc: "https://pic1.iqiyipic.com/image/20190704/61/11/a_100260404_m_601_m4_220_124.jpg"
    },
    {
        title: '罗小黑战记',
        description: "2011",
        imgSrc: "https://pic4.iqiyipic.com/image/20191104/51/6b/v_139343015_m_601_m12_220_124.jpg"
    },
    {
        title: '罗小黑战记',
        description: "2012",
        imgSrc: "https://pic4.iqiyipic.com/image/20191108/d4/86/a_100345137_m_601_m7_220_124.jpg"
    },
]

const moviesData = [
    {name: '罗小黑战记', score: 8.1, imgSrc: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2568288336.jpg"},
    {name: '罗小黑战记', score: 8.2, imgSrc: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2568288336.jpg"},
    {name: '罗小黑战记', score: 8.3, imgSrc: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2568288336.jpg"},
    {name: '罗小黑战记', score: 8.4, imgSrc: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2568288336.jpg"},
    {name: '罗小黑战记', score: 8.5, imgSrc: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2568288336.jpg"},
    {name: '罗小黑战记', score: 8.6, imgSrc: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2568288336.jpg"},
]

const moviesGalleryFilterList = [
    {value: "热门", key: '1'},
    {value: "最新", key: '2'},
    {value: "豆瓣高分", key: '3'},
    {value: "冷门佳片", key: '4'},
    {value: "华语", key: '5'},
    {value: "欧美", key: '6'},
    {value: "韩国", key: '7'},
    {value: "日本", key: '8'},
]

export default class Home extends React.Component {
    render() {
        return (
            <div id="home">
                <QueueAnim delay={300}>
                    <TitleBar key="a" title={"为您推荐"}/>
                    <Banner key="b" data={bannerData} pageSize={3}/>
                    <MoviesSingleLineList key="c" withTitle={true} title={"正在热映"} data={moviesData} isFirstNode={true}
                                          withShowMoreButton={true}/>
                    <MoviesSingleLineList key="d" withTitle={true} title={"热门电影"} data={moviesData}
                                          withShowMoreButton={true}
                                          withFilter={true}
                                          filterList={moviesGalleryFilterList}/>
                    <CommentList key="d" withTitle={true} title={"最受欢迎的影评"} data={moviesData} isLastNode={true}
                                 withShowMoreButton={true}/>
                </QueueAnim>
            </div>
        );
    }
}
