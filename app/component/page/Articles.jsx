import React from 'react'
import U from "../../common/U";
import {App, Utils} from "../../common";
import '../../assets/css/page/articles.scss'
import {Icon, Toast} from 'antd-mobile'

export default class Articles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],

            pagination: {
                pageSize: 12,
                current: 0,
                total: 0
            }
        }
    }

    componentDidMount() {
        U.setWXTitle('动态');
        this.loadData();
    }

    loadData = () => {

        let {pagination = {}} = this.state;

        App.api('/usr/home/articles', {
            articleQo: JSON.stringify({
                pageNumber: pagination.current,
                pageSize: pagination.pageSize
            })
        }).then((result) => {
            let {content = []} = result;
            let pagination = Utils.pager.convert2Pagination(result);
            this.setState({
                list: content,
                pagination
            });
        });
    };

    onPageChange = (current, pageSize) => {
        let pagination = this.state.pagination;
        this.setState({
            pagination: {
                ...pagination,
                current, pageSize
            }
        }, () => this.loadData());
    };

    loadMore = () => {
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

    render() {

        let {list = [], pagination = {}} = this.state;

        let {current, totalPages} = pagination;

        return <div className='articles-page'>

            <ArticleList list={list} type='inner'/>

            {current < totalPages &&
            <div className='btn-more-topcase' onClick={this.caseLoadMore}><span>更多动态&nbsp;</span><Icon type='down'/>
            </div>}


            {/*TODO pager*/}
            <div className='clearfix-h20'/>

        </div>

    }
}

export class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            list: this.props.list,

        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({list: nextProps.list})
    }

    go = (id) => {
        let url = window.location.href;
        if (url.indexOf('106.14.81.141:9011') > -1) {
            window.location.href = `http://106.14.81.141:9011/tsw-pc/#/article/${id}`;
        } else {
            window.location.href = window.location.protocol + '//' + window.location.host + `#/article/${id}`;
        }
    };

    render() {
        let {type, list = []} = this.state;

        return <div>

            <div className={type === 'home' ? 'articles-header' : 'articles-header-inner'}/>
            <ul className={type === 'home' ? 'ul-articles' : 'ul-articles-inner'}>
                {list.map((article, index) => {
                    let {id, img, title, intro, createdAt} = article;
                    return <li key={index} onClick={() => this.go(id)}>
                        <img src={img} className='img'/>
                        <div className='right'>
                            <div className='title'>{title}</div>
                            <div className='date'>{U.date.format(new Date(createdAt), 'yyyy-MM-dd')}</div>
                            <div className='intro'>{intro}</div>
                        </div>
                    </li>
                })}
            </ul>
            <div className='clearfix-h20'/>
        </div>
    }

}