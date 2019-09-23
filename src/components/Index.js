import React, {Fragment} from 'react'
import {Row, Col, List, Button, Icon, Popover, Modal, Drawer, Menu, Divider} from 'antd'
import video from 'video.js'
import 'video.js/dist/video-js.min.css'
import 'videojs-flash'
import axios from "axios/index"
import Add from './Add'
import Edit from './Edit'
import './styles.css'

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            all: [],
            one: {},
            addVisible: false,
            editVisible: false,
            drawerVisible: false,
            now: {}
        }
    }

    showDrawer = () => {
        this.setState({
            drawerVisible: true,
        });
    };

    onClose = () => {
        this.setState({
            drawerVisible: false,
        });
    };

    handleSwitch = value => {
        let player = video('player'); //初始化视频
        player.src([value.rtmp, value.hls]); //重置video的src
        player.load(); //使video重新加载
        this.setState({now: value});
    };

    handleAdd = value => {
        let all = this.state.all;
        all.push(value);
        this.setState({all: all});
        this.setState({addVisible: false});
    };

    handleEdit = value => {
        this.setState({all: value});
        this.setState({editVisible: false});
    };

    handleDel = value => {
        axios
            .post('/api/del', {id: value})
            .then(res => {
                this.setState({all: res.data.cb})
            })
            .catch(error => {
                console.log(error)
            })
    };

    async componentDidMount() {
        await axios
            .get('/api/getDate')
            .then(cb => {
                this.setState({all: cb.data.all});
                this.setState({one: cb.data.one});
                this.setState({now: cb.data.one});
            })
            .catch(error => {
                console.log(error)
            });
        new video('player', {
            muted: false,
            flash: {swf: 'video-js.swf'},
            techOrder: ['flash', 'html5'],
            autoplay: true,
            controls: true,
            controlBar: {
                captionsButton: false,
                chaptersButton: false,
                playbackRateMenuButton: false,
                LiveDisplay: false,
                subtitlesButton: false,
                remainingTimeDisplay: false,
                progressControl: false,
                fullscreenToggle: true
            },
            languages: {
                zh: {
                    "Play": "播放",
                    "Pause": "暂停",
                    "Current Time": "当前时间",
                    "Duration": "时长",
                    "Remaining Time": "剩余时间",
                    "Stream Type": "媒体流类型",
                    "LIVE": "直播",
                    "Loaded": "加载完毕",
                    "Progress": "进度",
                    "Fullscreen": "全屏",
                    "Non-Fullscreen": "退出全屏",
                    "Mute": "静音",
                    "Unmute": "取消静音",
                    "Audio Track": "音轨",
                    "You aborted the media playback": "视频播放被终止",
                    "A network error caused the media download to fail part-way.": "网络错误导致视频下载中途失败。",
                    "The media could not be loaded, either because the server or network failed or because the format is not supported.": "视频因格式不支持或者服务器或网络的问题无法加载。",
                    "The media playback was aborted due to a corruption problem or because the media used features your browser did not support.": "由于视频文件损坏或是该视频使用了你的浏览器不支持的功能，播放终止。",
                    "No compatible source was found for this media.": "无法找到此视频兼容的源。",
                    "The media is encrypted and we do not have the keys to decrypt it.": "视频已加密，无法解密。",
                    "Play Video": "播放视频",
                    "Close": "关闭",
                    "Audio Player": "音频播放器",
                    "Video Player": "视频播放器",
                    "Replay": "重播",
                    "Progress Bar": "进度小节",
                    "Volume Level": "音量",
                    "Text": "文字",
                    "White": "白",
                    "Black": "黑",
                    "Red": "红",
                    "Green": "绿",
                    "Blue": "蓝",
                    "Yellow": "黄",
                    "Magenta": "紫红",
                    "Cyan": "青",
                    "Background": "背景",
                    "Window": "视窗",
                    "Transparent": "透明",
                    "Semi-Transparent": "半透明",
                    "Opaque": "不透明",
                    "Font Size": "字体尺寸",
                    "Text Edge Style": "字体边缘样式",
                    "None": "无",
                    "Raised": "浮雕",
                    "Depressed": "压低",
                    "Uniform": "均匀",
                    "Dropshadow": "下阴影",
                    "Font Family": "字体库",
                    "Casual": "舒适",
                    "Script": "手写体",
                    "Small Caps": "小型大写字体",
                    "Reset": "重启",
                    "restore all settings to the default values": "恢复全部设定至预设值",
                    "Done": "完成"
                }
            },
            fluid: true,
            sources: [{
                src: this.state.one.rtmp,
                type: 'rtmp/flv'
            }, {
                src: this.state.one.hls,
                type: 'application/x-mpegURL'
            }]
        }, function () {
            this.on('loadedmetadata', function () {
                console.log('metadata is ready');
            });
            this.on('canplay', function () {
                console.log('canplay');
                this.play();
            });
        })
    }

    render() {
        return <Fragment>
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" theme={'dark'}>
                <Menu.Item key="setting">
                    <Popover content='设置' placement="bottom">
                        <Icon type="setting" onClick={this.showDrawer}
                              style={{textAlign: 'center', margin: '0px auto', color: '#FFFFFF'}}/>
                    </Popover>
                </Menu.Item>
                <Menu.Item>
                    <span style={{textAlign: 'center', margin: '0px auto'}}>4K现场节目制作无线监看系统</span>
                </Menu.Item>
            </Menu>
            <Drawer
                title={
                    <Row>
                        <Col span={2}>
                            <Icon type="setting"/>
                        </Col>
                        <Col span={4}>
                            <b>设置</b>
                        </Col>
                    </Row>
                }
                placement="left"
                onClose={this.onClose}
                visible={this.state.drawerVisible}
                width={290}
                bodyStyle={{padding: 0}}
            >
                <List
                    size="small"
                    footer={
                        <div>
                            <div style={{textAlign: 'center', margin: '0px auto',
                                alignItems: 'center'}}>
                                <Popover content='添加' placement="bottom">
                                    <Button className={'btn'} onClick={() => this.setState({addVisible: true})}>
                                        <Icon type="plus"/>
                                    </Button>
                                    <Modal title="添加机位" footer={null} visible={this.state.addVisible}
                                           onCancel={() => this.setState({addVisible: false})}>
                                        <Row type="flex" justify="center" align="middle">
                                            <Col xs={22} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                                <Add handleAdd={value => this.handleAdd(value)}/>
                                            </Col>
                                        </Row>
                                    </Modal>
                                </Popover>
                            </div>
                            <Divider/>
                        </div>}
                    dataSource={this.state.all}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={
                                    <Row>
                                        <Col offset={1}>
                                            <Popover content={'串流码：' + item.code} placement="bottom">
                                                <span style={{color: '#00000060'}}>{item.name}</span>
                                            </Popover>
                                        </Col>
                                        <Col offset={16}>
                                            <Popover content='切换' placement="bottom">
                                                <Button className={'btn'} onClick={() => this.handleSwitch(item)}>
                                                    <Icon type="swap"/>
                                                </Button>
                                            </Popover>
                                            <Divider type="vertical"/>
                                            <Popover content='修改' placement="bottom">
                                                <Button className={'btn'}
                                                        onClick={() => this.setState({editVisible: true})}>
                                                    <Icon type="edit"/>
                                                </Button>
                                                <Modal title="修改机位" footer={null} visible={this.state.editVisible}
                                                       onCancel={() => this.setState({editVisible: false})}>
                                                    <Row type="flex" justify="center" align="middle">
                                                        <Col xs={22} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                                            <Edit data={item.id}
                                                                  handleEdit={value => this.handleEdit(value)}/>
                                                        </Col>
                                                    </Row>
                                                </Modal>
                                            </Popover>
                                            <Divider type="vertical"/>
                                            <Popover content='删除' placement="bottom">
                                                <Button className={'btn'} onClick={() => this.handleDel(item.id)}>
                                                    <Icon type="delete"/>
                                                </Button>
                                            </Popover>
                                        </Col>
                                    </Row>
                                }
                            />
                        </List.Item>)}/>
            </Drawer>
            <Row type="flex" justify="center" align="middle" style={{marginTop: 10}}>
                <Col xs={22} sm={16} md={16} lg={16} xl={16} xxl={16}>
                    <video id='player' className='video-js vjs-big-play-centered'/>
                    <div style={{textAlign: 'center', margin: '10px auto', fontSize: 20}}>
                        <span>当前频道：{this.state.now.name}</span>
                    </div>
                </Col>
            </Row>
        </Fragment>
    }
}

export default Index