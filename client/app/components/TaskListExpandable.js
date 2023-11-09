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
import { Formik } from 'formik';
import * as Yup from 'yup';
import SelectDropdown from 'react-native-select-dropdown'
import React, { useRef, useState } from 'react'
import { colorVars } from '../../colors'
import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import RBSheet from "react-native-raw-bottom-sheet";
import useUserStore from '../../hooks/userStore';

export default function TaskListExpandable({ data, navigation }) {
    const { id, title, repeats, to_do_items_rel } = data;
    const { addTask, editTask, removeTask, addToDoList, editToDoList, removeToDoList } = useUserStore();
    const [expanded, setExpanded] = useState(false)

    const refSettings = useRef()
    const newTaskForm = useRef();

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
            <TouchableHighlight onPress={() => { title.includes('Shopping') ? navigation.navigate('ShoppingList') : null }}>
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
                    <Entypo name="add-to-list" size={24} color={colorVars.text} onPress={() => newTaskForm.current.open()} />
                    <Ionicons name="settings-outline" size={24} color={colorVars.text} onPress={() => {
                        refSettings.current.props.children.props.initialValues.id = id
                        refSettings.current.props.children.props.initialValues.title = title
                        refSettings.current.props.children.props.initialValues.repeats = repeats
                        refSettings.current.open()
                        }} />
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
                    // leftOpenValue={75}
                    rightOpenValue={-75}
                    recalculateHiddenLayout={true}
                />
                <SwipeListView
                    data={to_do_items_rel.filter((toDoItem) => toDoItem.completion_status !== 'Not Started')}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    // leftOpenValue={75}
                    rightOpenValue={-75}
                    recalculateHiddenLayout={true}
                />
            </View>
            <RBSheet
                ref={refSettings}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    },
                    draggableIcon: {
                        backgroundColor: colorVars.backgroundSecondary
                    },
                }}
            >
                <Formik
                    initialValues={{
                        id: 0,
                        title: "",
                        repeats: ""
                    }}
                    validationSchema={Yup.object({
                        title: Yup.string().required('Required'),
                        repeats: Yup.string(),
                    })}
                    onSubmit={(values) => {
                        const toDoListObj = {
                            "id": values.id,
                            "title": values.title,
                            "repeats": values.repeats,
                        };
                        editToDoList(toDoListObj)
                        refSettings.current.close()
                        // console.log(toDoListObj)
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (

                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'space-evenly', width: '100%', paddingVertical: 30, }}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 40}}>
                                <View style={{ margin: 10 }}>
                                    <Text style={newTaskListFormStyles.inputLabel}>Name: </Text>
                                    <TextInput
                                        onChangeText={handleChange('title')}
                                        onBlur={handleBlur('title')}
                                        value={values.title}
                                        placeholder='ex. Morning Routine'
                                        placeholderTextColor={'rgba(0, 0, 0, 0.75)'}
                                        style={{ padding: 10, fontSize: 15, width: 150, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 5 }}
                                    />
                                    {touched.title && errors.title ? (<Text style={{ color: 'red' }}>{errors.title}</Text>) : null}
                                </View>
                                <View style={{margin:10}}>
                                    <Text style={newTaskListFormStyles.inputLabel}>Repeats: </Text>
                                    <SelectDropdown
                                        data={['Never', 'Yearly', 'Monthly', 'Weekly', 'Daily']}
                                        onSelect={handleChange('repeats')}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            return item
                                        }}
                                        buttonStyle={{ width: 150, height: 'auto', paddingHorizontal: 10, paddingVertical: 10 }}
                                        buttonTextStyle={{ fontSize: 15 }}
                                        dropdownStyle={{ height: 'auto' }}
                                        defaultValue={values.repeats}
                                    />
                                </View>
                            </View>
                            <View style={taskListPopUpStyles.buttonContainer}>
                                <TouchableOpacity style={[taskListPopUpStyles.button, taskListPopUpStyles.editButton]} onPress={handleSubmit}>
                                    <Text style={[taskListPopUpStyles.buttonText, taskListPopUpStyles.editText]}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[taskListPopUpStyles.button, taskListPopUpStyles.deleteButton]} onPress={() => {
                                    refSettings.current.close();
                                    removeToDoList(id);
                                }}>
                                    <Text style={[taskListPopUpStyles.buttonText, taskListPopUpStyles.deleteText]}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
            </RBSheet>

            <RBSheet
                ref={newTaskForm}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    container: {
                        height: 350,
                    },
                    wrapper: {
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    },
                    draggableIcon: {
                        backgroundColor: colorVars.backgroundSecondary
                    },
                }}
            >
                <Formik
                    initialValues={{
                        title: '',
                        description: '',
                        urgency: 'Not Urgent',
                        importance: 'Not Important'
                    }}
                    validationSchema={Yup.object({
                        title: Yup.string().required('Required'),
                        description: Yup.string(),
                        urgency: Yup.string().required('Required'),
                        importance: Yup.string().required('Required'),
                    })}
                    onSubmit={(values) => {
                        const toDoObj = {
                            toDoList_id: id,
                            event_id: null,
                            title: values.title,
                            description: values.description,
                            start_date: null,
                            end_date: null,
                            completion_status: 'Not Started',
                            urgency: values.urgency,
                            importance: values.importance,
                        };
                        addTask(toDoObj)
                        newTaskForm.current.close()
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
                        <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 40, paddingBottom: 40 }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evely', width: '100%' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={newTaskListFormStyles.inputLabel}>Name: </Text>
                                    <TextInput
                                        onChangeText={handleChange('title')}
                                        onBlur={handleBlur('title')}
                                        value={values.title}
                                        placeholder='Read 10 mins'
                                        placeholderTextColor={'rgba(0, 0, 0, 0.75)'}
                                        style={{ padding: 10, fontSize: 15, width: 150, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 5 }}
                                    />
                                    {touched.title && errors.title ? (<Text style={{ color: 'red' }}>{errors.title}</Text>) : null}
                                </View>
                                <View>
                                    <Text style={newTaskListFormStyles.inputLabel}>Description: </Text>
                                    <TextInput
                                        onChangeText={handleChange('description')}
                                        onBlur={handleBlur('description')}
                                        value={values.description}
                                        placeholder='Read Becoming a better person for 10 mins'
                                        placeholderTextColor={'rgba(0, 0, 0, 0.75)'}
                                        style={{ padding: 10, fontSize: 15, width: 150, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 5 }}
                                    />
                                    {touched.description && errors.description ? (<Text style={{ color: 'red' }}>{errors.description}</Text>) : null}
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evely', width: '100%' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={newTaskListFormStyles.inputLabel}>Importance: </Text>
                                    <SelectDropdown
                                        data={['Not Important', 'Important']}
                                        onSelect={handleChange('importance')}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            return item
                                        }}
                                        buttonStyle={{ width: 150, height: 'auto', padding: 10 }}
                                        buttonTextStyle={{ fontSize: 15 }}
                                        dropdownStyle={{ height: 'auto' }}
                                        defaultValue={'Not Important'}
                                    />
                                    {touched.importance && errors.importance ? (<Text style={{ color: 'red' }}>{errors.importance}</Text>) : null}
                                </View>
                                <View>
                                    <Text style={newTaskListFormStyles.inputLabel}>Urgency: </Text>
                                    <SelectDropdown
                                        data={['Not Urgent', 'Urgent']}
                                        onSelect={handleChange('urgency')}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            return item
                                        }}
                                        buttonStyle={{ width: 150, height: 'auto', padding: 10 }}
                                        buttonTextStyle={{ fontSize: 15 }}
                                        dropdownStyle={{ height: 'auto' }}
                                        defaultValue={'Not Urgent'}
                                    />
                                    {touched.urgency && errors.urgency ? (<Text style={{ color: 'red' }}>{errors.urgency}</Text>) : null}
                                </View>
                            </View>
                            <TouchableOpacity style={newTaskListFormStyles.button} onPress={handleSubmit}>
                                <Text style={newTaskListFormStyles.buttonText}>Create</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
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
    inputContainer: {
        marginHorizontal: 80,
        marginTop: 20,
    },
    inputLabel: {
        fontSize: 15,
        fontWeight: 500,
        marginBottom: 10,
    },
    input: {
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
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 50,
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
const newTaskListFormStyles = StyleSheet.create({
    inputLabel: {
        marginBottom: 5,
        fontSize: 20,
        fontWeight: 500
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colorVars.accent,
        borderWidth: 3,
        borderRadius: 7,
        paddingVertical: 10,
        width: 100,
    },
    buttonText: {
        color: colorVars.accent,
        fontSize: 15,
        fontWeight: 500,
    }
})
