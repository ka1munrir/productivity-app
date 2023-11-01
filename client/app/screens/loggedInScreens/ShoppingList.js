import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view';
import React from 'react'
import { colorVars } from '../../../colors'

export default function ShoppingList() {

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ShoppingList</Text>
      <ScrollView style={styles.shoppingListContainer} contentContainerStyle={styles.sLContainerContent}>
        <View style={styles.shoppingItemContainer}>
          <Text style={styles.sIText}>adslkfajl</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: colorVars.background,
      alignItems: 'center',
      paddingTop: 75,
    },
    title: {
      fontSize: 35,
      color: colorVars.text,
      marginBottom: 15,
    },
    shoppingListContainer: {
      backgroundColor: colorVars.backgroundSecondary,
      height: '50%',
      width: '85%',
      flex: 1,
    },
    sLContainerContent:{
      alignItems: 'center',
    },
    shoppingItemContainer:{
      backgroundColor: colorVars.backgroundTrinary,
      padding: 5,
      width: '95%',
      padding: 15,
    },
    sIText: {
      color: colorVars.text,
      fontSize: 17.5,
    }


})