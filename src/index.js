import React, { Component } from "react";
import { View, Text, Platform } from "react-native";
import { Endpoint } from "react-native-pjsip";
import { extendObservable } from "mobx";
import { observer } from "mobx-react";

class EndpointStart extends Component {
  constructor(props) {
    super(props);
    extendObservable(this, {
      endpoint: new Endpoint(),
      appState: {
      },
      startPJSIPFlag:true,
      createAccountFlag: true
    });
  }

  async componentWillMount() {
    this.appState  = await this._onStart();
    this.endpoint.on("registration_changed", (account) => {})
    await this._onCreateAccount();
    console.warn(this.appState);
  }

  _onStart = async () => {
    try {
        if(this.startPJSIPFlag){
        //TODO: Add configuration
      const pjsipStart =   await this.endpoint.start();
      
      if (pjsipStart) {
          this.startPJSIPFlag = false;
        return pjsipStart;
      } else {
        throw "Endpoint failed to start properly ";
      }}
      else{
          return this.appState;
      }
    } catch (err) {
      console.warn("", err.message);
    }
  };

  _onCreateAccount = async () => {
    let configuration = {
      name: "baba alaja",
      username: "babaalaja",
      domain: "sip.antisip.com",
      password: "123456Qw",
    };

    try {
        if (this.createAccountFlag){
      const account = await this.endpoint.createAccount(configuration);
      if (!account) {
        throw " Account Creation Failed";
      }}
      else{
          this.createAccountFlag =false
          return true;
      }
    }
    catch (err) {
        console.warn('',err.message)
    }
  };

  render() {
    const { appState } = this;
    return <Text>Test </Text>;
  }
}

export default observer(EndpointStart);
