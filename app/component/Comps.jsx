import React from 'react'
import {Carousel} from 'antd-mobile'
import '../assets/css/comps.scss'
import {App, CTYPE} from "../common";

class Banners extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            banners: this.props.banners,
            list: []
        }
    }

    go = (banner) => {
        let {url} = banner;
        if (url) {
            window.location.href = url;
        }
    };

    render() {

        let {banners = [], type} = this.state;
        let isHome = type === CTYPE.bannerTypes.HOME;
        let length = banners.length;

        return <div className={isHome ? 'main-carousel home-carousel' : 'main-carousel'}>
            {length > 0 && <Carousel autoplay={length > 1} dots={length > 1}
                                     speed={1000} autoplaySpeed={5000} infinite>
                {banners.map((banner, index) => {
                    let {img} = banner;
                    return <img key={index} className='img-item' src={img} onClick={() => {
                        this.go(banner);
                    }}/>
                })}
            </Carousel>}
        </div>
    }
}

class Custevals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: this.props.limit,
            list: []
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        let {limit = 4} = this.state;
        App.api('/usr/home/custevals', {limit}).then((list) => {
            this.setState({list})
        });
    };

    render() {

        let {list = []} = this.state;

        return <div className='custeval-list'>
            <div className='eval-header'/>
            <ul>
                {list.map((ce, index) => {
                    let {img, title, customer} = ce;
                    return <li key={index} className='item'>
                        <img src={img} className='img'/>
                        <div className='title'>{title}</div>
                        <div className='customer'>{customer}</div>
                    </li>
                })}
            </ul>
            <div className='clearfix-h20'/>
        </div>
    }
}

export {Banners, Custevals}