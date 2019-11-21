import React from "react";
import './MoviesDetail.css'
import {Col, Row, Typography} from "antd";
import TitleBar from "../../widget/TitleBar/TitleBar";
import QueueAnim from "rc-queue-anim";

const {Title, Paragraph, Text} = Typography;
export default class MoviesDetail extends React.Component {
    render() {
        return (
            <div className={"moviesDetail"}>
                <TitleBar key="a" title={"终结者：黑暗命运 Terminator: Dark Fate (2019)"}/>
                <div className={"movieInfo"} style={{background: '#fff'}}>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={19} xl={24} xxl={6}>
                            <div className="movie-picture" style={{
                                backgroundImage: "url('" + "https://img9.doubanio.com/view/photo/l/public/p2571762536.webp" + "')",
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no repeat',
                                backgroundSize: 'cover'
                            }}/>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={19} xl={24} xxl={18}>
                            <div className={"movie-info-text"}>
                                <Paragraph>
                                    《终结者2：审判日》发生的27年后，由于未来天网派来T-800成功杀死年幼的约翰，以致令未来产生变化，一个全新进化的液态金属终结者从未来派出，目的是追杀持有关键讯息的丹妮·拉莫斯、半生化人葛蕾丝和她的朋友。这使莎拉·康纳以及成功杀死约翰的T800终结者前来帮助她们一行人，以共同为了人类的未来而战。
                                </Paragraph>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
