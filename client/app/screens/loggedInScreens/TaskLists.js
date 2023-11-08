import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import RBSheet from "react-native-raw-bottom-sheet";
import { Formik } from 'formik';
import * as Yup from 'yup';
import SelectDropdown from 'react-native-select-dropdown'
import React, { useRef } from 'react'
import { colorVars } from '../../../colors'
import TaskListExpandable from '../../components/TaskListExpandable'
import useUserStore from '../../../hooks/userStore';

export default function TaskLists({navigation}) {
    const { user, toDoLists, addToDoList } = useUserStore()
    const newTaskListForm = useRef();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
                {
                    toDoLists.map(toDoList => <TaskListExpandable data={toDoList} navigation={navigation} key={toDoList.id} />)
                }
            </ScrollView>
            <TouchableOpacity style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                <Text style={{ fontSize: 30 }} onPress={() => newTaskListForm.current.open()}>➕</Text>
            </TouchableOpacity>
            <RBSheet
                ref={newTaskListForm}
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
                        title: "",
                        repeats: ""
                    }}
                    validationSchema={Yup.object({
                        title: Yup.string().required('Required'),
                        repeats: Yup.string(),
                    })}
                    onSubmit={(values) => {
                        const toDoListObj = {
                            "user_id": user.id,
                            "title": values.title,
                            "repeats": values.repeats,
                        };
                        addToDoList(toDoListObj)
                        newTaskListForm.current.close()
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
                        <View style={{flex:1, alignItems: 'center', paddingHorizontal: 40, paddingVertical: 40}}>
                            <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-evely', width: '100%'}}>
                                <View style={{flex: 1}}>
                                    <Text style={newTaskListFormStyles.inputLabel}>Name: </Text>
                                    <TextInput 
                                        onChangeText={handleChange('title')}
                                        onBlur={handleBlur('title')}
                                        value={values.title}
                                        placeholder='ex. Morning Routine'
                                        placeholderTextColor={'rgba(0, 0, 0, 0.75)'}
                                        style={{padding: 10, fontSize: 15, width: 150, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 5}}
                                    />
                                    {touched.title && errors.title ? (<Text style={{color: 'red'}}>{errors.title}</Text>) : null}
                                </View>
                                <View>
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
                                        buttonStyle={{width: 150, height: 'auto', paddingHorizontal: 20, paddingVertical: 10}}
                                        buttonTextStyle={{fontSize: 15}}
                                        dropdownStyle={{height: 'auto'}}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity style={newTaskListFormStyles.button} onPress={handleSubmit}>
                                <Text style={newTaskListFormStyles.buttonText}>Create</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </RBSheet>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorVars.background,
        flex: 1,
        flexDirection: 'column',
        paddingTop: 75,
        alignItems: 'center'
    },
    listContainer: {
        backgroundColor: colorVars.background,
        flex: 1,
        flexDirection: 'column',
        width: '100%'
    }
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