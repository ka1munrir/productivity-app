import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Animated,
    TouchableHighlight,
    TouchableOpacity,
    StatusBar,
    Button
} from 'react-native'
import React, { useRef, useState } from 'react'
import { colorVars } from '../../colors'
import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import RBSheet from "react-native-raw-bottom-sheet";
import useUserStore from '../../hooks/userStore';

export default function TaskListExpandable({ data, navigation }) {
    const { id, title, to_do_items_rel } = data;
    const { addTask, editTask, removeTask, addToDoList, editToDoList, removeToDoList } = useUserStore();
    const [expanded, setExpanded] = useState(false)

    const refSettings = useRef()

    const checkBoxPress = (task) => {
        if (task.completion_status === 'Not Started') {
            task.completion_status = 'Completed';
        } else if (task.completion_status === 'Completed') {
            task.completion_status = 'Not Started';
        }
        editTask(task);
    }

    const VisibleItem = props => {
        const { data } = props;
        const { id, title, description, completion_status } = data.item;
        return (
            <TouchableHighlight onPress={() => {title == 'Shopping' ? navigation.navigate('ShoppingList') : null}}>
                <View style={toDoItemStyles.container}>
                    {
                        completion_status === "Not Started" ?
                            <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color={colorVars.text} style={toDoItemStyles.checkbox} onPress={() => checkBoxPress(data.item)} />
                            :
                            <MaterialCommunityIcons name="checkbox-marked-outline" size={24} color="green" style={toDoItemStyles.checkbox} onPress={() => checkBoxPress(data.item)} />
                    }
                    <View style={toDoItemStyles.textContainer}>
                        <Text style={[toDoItemStyles.title, { opacity: completion_status === 'Not Started' ? 1 : 0.4 }]}>{title}</Text>
                        <Text style={[toDoItemStyles.description, { opacity: completion_status === 'Not Started' ? 1 : 0.4 }]}>{description.length > 40 ? description.slice(0, 40) + "..." : description}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
    const renderItem = (data, rowMap) => {
        return (
            <VisibleItem data={data} />
        );
    }

    const renderHiddenItem = (data, rowMap) => {
        return (
            <HiddenItemWithActions
                data={data}
                rowMap={rowMap}
                onClose={() => closeRow(rowMap, data.item.key)}
                onDelete={() => deleteRow(rowMap, data)}
            />
        )
    }
    const HiddenItemWithActions = props => {
        const { data, onClose, onDelete } = props;
        return (
            <View style={toDoItemStyles.rowBack}>
                <TouchableOpacity style={swipeButtonStyle.backLeftEditBtn}>
                    <Text style={swipeButtonStyle.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={swipeButtonStyle.backRightDeleteBtn} onPress={onDelete}>
                    <Text style={swipeButtonStyle.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }
    const deleteRow = (rowMap, data) => {
        closeRow(rowMap, data.item.key);
        removeTask(data.item)
    }
    
    return (
        <View>
            <View style={expandableListStyles.topLevelContainer}>
                <View style={expandableListStyles.topLevelTitleContainer}>
                    <Text style={expandableListStyles.topLevelTitle} numberOfLines={1}>{title.length > 13 ? title.slice(0, 13) + "..." : title}</Text>
                </View>
                <View style={expandableListStyles.topLevelIconContainer}>
                    <Entypo name="add-to-list" size={24} color={colorVars.text} />
                    <Ionicons name="settings-outline" size={24} color={colorVars.text} onPress={() => refSettings.current.open()} />
                    {
                        expanded ? <Entypo name="chevron-up" size={24} color="white" onPress={() => setExpanded(false)} /> : <Entypo name="chevron-down" size={24} color="white" onPress={() => setExpanded(true)} />
                    }
                </View>
            </View>
            <View style={[expandableListStyles.contentContainer, { height: expanded ? 'auto' : 0 }]}>
                <SwipeListView
                    data={to_do_items_rel.filter((toDoItem) => toDoItem.completion_status === 'Not Started')}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    leftOpenValue={75}
                    rightOpenValue={-75}
                    recalculateHiddenLayout={true}
                />
                <SwipeListView
                    data={to_do_items_rel.filter((toDoItem) => toDoItem.completion_status !== 'Not Started')}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    leftOpenValue={75}
                    rightOpenValue={-75}
                    recalculateHiddenLayout={true}
                />
            </View>
            <RBSheet
                ref={refSettings}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    // container:{
                    //     backgroundColor: 'rgb(135, 135, 135)'
                    // },
                    wrapper: {
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    },
                    draggableIcon: {
                        backgroundColor: colorVars.backgroundSecondary
                    },
                }}
            >
                <View style={taskListPopUpStyles.inputContainer}>
                    <Text style={taskListPopUpStyles.inputLabel}>Name: </Text>
                    <TextInput
                        editable={true}
                        style={taskListPopUpStyles.input}
                        placeholder='To Do List'
                        // value={changedTitle}
                        // onChange={(text) => setChangedTitle(text)}
                    />
                </View>
                <View style={taskListPopUpStyles.buttonContainer}>
                    <TouchableOpacity style={[taskListPopUpStyles.button, taskListPopUpStyles.editButton]}>
                        <Text style={[taskListPopUpStyles.buttonText, taskListPopUpStyles.editText]}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[taskListPopUpStyles.button, taskListPopUpStyles.deleteButton]} onPress={() => {
                        refSettings.current.close();
                        removeToDoList(id);
                    }}>
                        <Text style={[taskListPopUpStyles.buttonText, taskListPopUpStyles.deleteText]}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </RBSheet>
        </View>
    )
}
const expandableListStyles = StyleSheet.create({
    expandableContainer: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    topLevelContainer: {
        backgroundColor: colorVars.backgroundSecondary,
        width: '100%',
        paddingHorizontal: 30,
        paddingVertical: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topLevelTitleContainer: {
        flex: 5,
        marginRight: 50,
    },
    topLevelTitle: {
        color: colorVars.text,
        fontSize: 25
    },
    topLevelIconContainer: {
        flex: 2,
        flexDirection: 'row',
        width: 'content',
        justifyContent: 'space-between',
    },
    contentContainer: {
        backgroundColor: colorVars.backgroundTrinary,
        overflow: 'hidden',
    },
})
const toDoItemStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colorVars.backgroundTrinary,
    },
    checkbox: {
        flex: 1,
    },
    textContainer: {
        flex: 7,
    },
    title: {
        color: colorVars.text,
        fontSize: 20,
        marginBottom: 5,
    },
    description: {
        color: colorVars.text,
        fontSize: 12,
    },
    rowBack: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
})
const swipeButtonStyle = StyleSheet.create({
    backRightDeleteBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        height: '100%',
        width: 75,
    },
    backLeftEditBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorVars.accent,
        height: '100%',
        width: 75,
    },
    buttonText: {
        color: colorVars.text,
    },
})
const taskListPopUpStyles = StyleSheet.create({
    inputContainer:{
        marginHorizontal: 80,
        marginTop: 20,
    },
    inputLabel:{
        fontSize: 15,
        fontWeight: 500,
        marginBottom: 10,
    },
    input:{
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
    },
    
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        borderRadius: 5,
        borderWidth: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 100,
        margin: 10,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 700,
    },
    editButton: {
        borderColor: colorVars.primary,
    },
    editText: {
        color: colorVars.primary,
    },
    deleteButton: {
        borderColor: 'red',
    },
    deleteText: {
        color: 'red',
    },

})