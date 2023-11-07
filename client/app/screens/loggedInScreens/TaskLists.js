import { StyleSheet, View, Text, ScrollView } from 'react-native'
import React from 'react'
import { colorVars } from '../../../colors'
import TaskListExpandable from '../../components/TaskListExpandable'
import useUserStore from '../../../hooks/userStore';

export default function TaskLists() {
    const { toDoLists } = useUserStore()
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {
                toDoLists.map(toDoList => <TaskListExpandable data={toDoList} key={toDoList.id}/>)
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorVars.background,
        flex: 1,
        flexDirection: 'column',
        paddingTop: 75,
    }
})
