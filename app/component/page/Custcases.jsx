import React from 'react'
import U from "../../common/U";
import {App, Utils} from "../../common";
import '../../assets/css/page/custcases.scss'
import {Icon, Toast} from 'antd-mobile';

export default class Custcases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        U.setWXTitle('客户案例');
    }

    render() {

        return <div className='custcases-page'>

            <div className='cases-header'/>

            <CustcaseList offtop={0}/>

        </div>
    }
}

export class CustcaseList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            offtop: this.props.offtop,
            list: [],
            pagination: {
                pageSize: 21,
                current: 0,
                total: 0
            }
        }
    }

    componentDidMount() {
        this.loadCase();
    }

    loadCase = () => {
        let {offtop, pagination = {}, list = []} = this.state;

        App.api('/usr/home/custcases', {
            custcaseQo: JSON.stringify({
                offtop,
                pageNumber: pagination.current,
                pageSize: pagination.pageSize
            })
        }).then((result) => {
            let {content = []} = result;
            list.push(...content);
            let pagination = Utils.pager.convert2Pagination(result);
            this.setState({
                list, pagination
            });
        });
    };

    caseLoadMore = () => {
        let pagination = this.state.pagination;
        let {current} = pagination;
        Toast.loading('加载中...', 0.4, null, false);
        this.setState({
            pagination: {
                ...pagination,
                current: current + 1
            }
        }, () => this.loadCase());
    };


    go = (id) => {
        let url = window.location.href;
        if (url.indexOf('106.14.81.141:9011') > -1) {
            window.location.href = `http://106.14.81.141:9011/tsw-pc/#/custcase/${id}`;
        } else {
            window.location.href = window.location.protocol + '//' + window.location.host + `#/custcase/${id}`;
        }
    };

    render() {

        let {list = [], pagination = {}} = this.state;

        let {current, totalPages} = pagination;

        return <div>

            <ul className='ul-custcases'>
                {list.map((cc, index) => {
                    let {id, img, title, subtitle, service} = cc;
                    return <li key={index} onClick={() => {
                        this.go(id);
                    }}>
                        <img src={img} className='img'/>
                        <div className='cover'>
                            <div className='title'> {title}</div>
                            <div className='subtitle'>{subtitle}</div>
                            <div className='subtitle' style={{marginTop: '20px'}}>{service}</div>
                        </div>
                    </li>
                })}

            </ul>

            <div className='clearfix-h20'/>

            {current < totalPages &&
            <div className='btn-more-topcase' onClick={this.caseLoadMore}><span>更多案例&nbsp;</span><Icon type='down'/>
            </div>}

            <div className='clearfix-h20'/>

        </div>

    }

}

export class TopCaseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({list: nextProps.list});
    }


    go = (id) => {
        App.go(`#/custcase/${id}`);
    };

    render() {

        let {list = []} = this.state;

        return <div>

            <ul className='ul-topcases'>
                {list.map((cc, index) => {
                    let {id, topImg, title, subtitle, topIntro, service} = cc;
                    return <li key={index}>
                        <div className='title' onClick={() => {
                            this.go(id);
                        }}> {title}</div>
                        <div className='subtitle'>{subtitle}</div>
                        <div className='intro'>{topIntro}</div>
                        <div className='service'>服务：{service}</div>
                        <div className='btn' onClick={() => {
                            this.go(id);
                        }}>了解更多 >
                        </div>
                        <img src={topImg} className='banner'/>
                    </li>
                })}

            </ul>

            <div className='clearfix-h20'/>

        </div>

    }

}