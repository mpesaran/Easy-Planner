import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-web';

/*Task component is designed to represent a single task item with a left side 
for task description and a right side for a completion indicator*/

const Task = (props) => {
    return (
        <View style= {styles.item}>
            {/*This is a nested <View> component that contains the left side of the task item.
            Inside this view, there's a square (<View style={styles.square}></View>) that can be
            used as a checkbox or an indicator.
            Next to the square, there's a <Text> component displaying the task description ({props.text}). */}
            <View style={styles.itemLeft}>
                <View style = {styles.square}></View>
                <Text styles={styles.itemText}>{props.text}</Text>
            </View>
            {/*This is a <View> component representing the right side of the task item.
            Inside this view, there's a circular shape that can be used as a completion indicator or any other visual element. */}
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