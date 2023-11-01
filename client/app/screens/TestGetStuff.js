import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../network/userAPI'

export default function TestGetStuff() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        // getAllUsers()
        //     .then(data => {
        //         console.log(data.data)
        //         setUsers(data.data)
        //     })
        fetch('https://172.30.135.18:5000/users')
            .then(r => r.json())
            .then(data => {
                console.log(data.data)
                setUsers(data.data)
            })
    }, [])
    const userList = users.map(user => <Text key={user.id}>{user.username}</Text>)
    return (
        <View style={{ flex: 1, marginTop: 75, marginHorizontal: 20 }}>
            <Text>Users:</Text>

            {userList}
        </View>
    )
}