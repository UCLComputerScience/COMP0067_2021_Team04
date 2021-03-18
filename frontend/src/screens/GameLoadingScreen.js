import React, {Component} from 'react';  
import {Platform, StyleSheet, Text, View, Animated, ImageBackground, Image} from 'react-native';  
  
export default class Loader extends Component {  
    state={  
        progressStatus: 0,  
    }  
    anim = new Animated.Value(0);  
    componentDidMount(){  
        this.onAnimate(),
        this.timeoutHandle = setTimeout(()=>{
            this.props.navigation.navigate('Game')
        }, 2200);
    }  
    onAnimate = () =>{  
        this.anim.addListener(({value})=> {  
            this.setState({progressStatus: parseInt(value,10)});  
        });  
        Animated.timing(this.anim,{  
             toValue: 100,  
             duration: 2000,  
        }).start();  
    }  

    componentWillUnmount(){
        clearTimeout(this.timeoutHandle); 
   }


  render() {  
    return (  
        <ImageBackground style={styles.background} source={require('../imgs/question-mark-background-vector.jpg')} >
      <View style={styles.container}>  
            <Animated.View  
                style={[  
                    styles.inner,{width: this.state.progressStatus +"%"},  
                ]}  
            />  
            <Animated.Text style={styles.label}>  
                    {this.state.progressStatus }%  
            </Animated.Text>  
      </View>  
      </ImageBackground>
    );  
  }  
}  
const styles = StyleSheet.create({  
    background: {
        flex: 1,
        alignItems: "center"
    },
    container: {  
    width: "100%",  
    height: 40,  
    padding: 3,  
    borderColor: "#FAA",  
    borderWidth: 3,  
    borderRadius: 30,  
    marginTop: 200,  
    justifyContent: "center",  
  },  
  inner:{  
    width: "100%",  
    height: 30,  
    borderRadius: 15,  
    backgroundColor:"green",  
  },  
  label:{  
    fontSize:23,  
    color: "black",  
    position: "absolute",  
    zIndex: 1,  
    alignSelf: "center",  
  }  
});  