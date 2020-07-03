import React from 'react'

export class Reducer extends React.Component{
    constructor(props){
        super()
        this.state = {
            hide:props.data.map((obj,index) => this.createDiv(obj,index,props.onHide)),
            show:props.data.map((obj,index) => this.createDiv(obj,index,props.onShow)),
            hidded:props.data.map(() => true)
        }
    }
    createDiv(obj,index,func) {
        return (
            <div key={index} id={index} onClick={this.onClickList}>
                {func(obj)}
            </div>
        )
    }
    onClickList = (events) => {
        let hidded = this.state.hidded
        let id = events.target.parentElement.id
        if(hidded[id]) 
            hidded[id] = false
        else
            hidded[id] = true
        this.setState({
            hidded
        })
    }
    render() {
        let display = []
        for(let i = 0; i < this.state.hidded.length;i++) {
            if(this.state.hidded[i])
                display.push(this.state.hide[i])
            else
                display.push(this.state.show[i])
        }
        return display
    }
}

export default class List extends React.Component{
    constructor(props) {
        super()
        this.state = {
            block:[],
            width:props.width,
            height:props.height
        }
        console.log(props.children)
    }
    render() {
        let width = this.state.width
        let height = this.state.height
        return (
            <div onClick={this.onClickList} style={{
                width:{width},
                height:{height}
            }}>
                {this.props.children}
            </div>
        )
    }
}
