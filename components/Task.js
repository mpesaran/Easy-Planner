import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-web';


const Task = (props) => {
    return (
        <View style= {styles.item}>
            <View style={styles.itemLeft}>
                <View style = {styles.square}></View>
                <Text styles={styles.itemText}>{props.text}</Text>
            </View>
            <View style={styles.circular}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemLeft : {
        flexDirection: 'row',
        alignItems : 'center',
        flexWrap: 'wrap',
    },
    item: {
        backgroundColor: '#fff' ,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    square: {
        
    },
    itemText :{
        maxWidth : '80%'
    },
    circular :{
        width :12,
        height: 12,
        borderColor: '#067e2e',
        borderWidth: 2,
        borderRadius: 5,
    },
    square: {
        width:24,
        height: 24,
        backgroundColor: '#067e2e',
        opacity: 0.4,
        borderRadius :5,
        marginRight : 15,
    }
});


export default Task;