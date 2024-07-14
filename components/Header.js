import * as React from "react";
import { Appbar } from "react-native-paper";

// Heading of the applications

const MyHeader = () => {
    return (
        <Appbar.Header style={{backgroundColor:"black"}}>
            <Appbar.Content title="StopWatch" style={{alignItems:"center"}}/>
        </Appbar.Header>
    );
};

export default MyHeader;