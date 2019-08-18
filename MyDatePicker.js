import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { 
  View, TouchableOpacity, Text, Modal, Image, StyleSheet, DatePickerAndroid, DatePickerIOS, Platform
} from 'react-native'

import colors from './colors';

export default class MyDatePicker extends PureComponent {

  state = {
    iosDatePicker: false,
  }

  openAndroidDatePicker = async () => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(),

        // onDateChange goes here.. this func will be passed from parent 
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  toggleIosDatePicker = () => {
    this.setState(state => ({ iosDatePicker: !state.iosDatePicker }))
  }

  openDatePicker = () => {
    const platform = Platform.OS

    if(platform === 'ios') {
      this.toggleIosDatePicker()
    } else {
      this.openAndroidDatePicker()
    }
  }

  render() {
    return (
      <View style={[ styles.defaultMainContainerStyle, this.props.mainContainerStyle ]}>

        <Text style={[ styles.defaultLabelStyle ]}>
          {this.props.label}
        </Text>
        
        <TouchableOpacity
          style={styles.defaultDatePickerContainerStyle}
          onPress={this.openDatePicker}
        >
          
          <Text style={[ 
            this.props.value === "Date" && { color: colors.lightGrey },
            styles.defaultDatePickerTextStyle,
          ]}>
            {this.props.value}
          </Text>
          
          <Image 
            source={ require('./calendar-today.png') }
            style={styles.iconStyle}
          />
        </TouchableOpacity>

        {
          Platform.OS === 'ios' &&
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.iosDatePicker}
            >
              <View style={styles.iosDatePickerContainerStyle}>

                <TouchableOpacity 
                  style={{ flex: 1 }}
                  onPress={this.toggleIosDatePicker}
                />

                <View style={styles.iosDatePickerStyle}>

                  <View style={ styles.optionBtnContainerStyle }>

                    <TouchableOpacity
                      style={[ styles.optionBtnStyle, styles.cancelBtnStyle ]}
                      onPress={this.toggleIosDatePicker}
                    >
                      <Text>Close</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={[ styles.optionBtnStyle, styles.okBtnStyle ]}
                    >
                      <Text>OK</Text>
                    </TouchableOpacity>

                  </View>
                  
                  <DatePickerIOS
                    mode="date"
                    date={this.props.date}
                    onDateChange={this.props.onDateChange}
                  />
                </View>
              </View>
            </Modal>
        }
      </View>
    );
  }
}

MyDatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([ PropTypes.instanceOf(Date), PropTypes.string ]).isRequired,
  onDateChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  mainContainerStyle: PropTypes.object,
};

MyDatePicker.defaultProps = {
  label: " ",
  value: "Date",
  date: new Date(),
  // TODO: place holder and change the logic of showing palceholder text
}

const styles = StyleSheet.create({

  defaultMainContainerStyle: {
    flex: 1,
  },
  defaultDatePickerContainerStyle: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.lightGrey,
    height: 45,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'space-between',
    borderRadius: 5,
    alignItems: 'center',
  },
  iconStyle: {
    resizeMode: 'contain',
    width: 18,
    height: 20,
  },
  defaultDatePickerTextStyle: {
    fontSize: 16,
  },

  defaultLabelStyle: {
    fontSize: 16,
    color: colors.primary,
    marginBottom: 5,
    marginTop: 15,
  },

  iosDatePickerContainerStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  iosDatePickerStyle: {
    backgroundColor: '#F8F8F8',
  },

  optionBtnContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    height: 40,
    alignItems: 'center', 
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    backgroundColor: '#F6F6F6',
  },
  optionBtnStyle: {
    width: 100,
    height: 30,
    justifyContent: 'center',
  },
  okBtnStyle: {
    alignItems: 'flex-end',
  },
  cancelBtnStyle: {
    alignItems: 'flex-start'
  }
})