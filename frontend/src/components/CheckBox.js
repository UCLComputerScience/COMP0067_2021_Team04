import * as React from 'react';
// import { Checkbox } from 'react-native-paper';
import CheckBox from 'react-native-check-box'



const Check = () => (
<CheckBox
    style={{flex: 1, padding: 10}}
    onClick={()=>{
      this.setState({
          isChecked:!this.state.isChecked
      })
    }}
    isChecked={this.state.isChecked}
    leftText={"CheckBox"}
/>
)

export default Check;