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
import { SwipeListView } from 'react-native-swipe-list-view';
import RBSheet from "react-native-raw-bottom-sheet";
import { Formik } from 'formik';
import * as Yup from 'yup';
import React, { useRef } from 'react'
import { colorVars } from '../../../colors'
import useUserStore from '../../../hooks/userStore';

export default function ShoppingList() {
  const { shoppingItems, addShoppingItem, editShoppingItem, removeShoppingItem, user } = useUserStore();
  const refNewShoppingItemRBSheet = useRef();
  const refEditShoppingItemRBSheet = useRef();
  
  const VisibleItem = props => {
    const { data } = props;
    const { id, title, quantity, location_rel, category } = data.item;
    return (
      <View>
        <TouchableHighlight style={styles.shoppingItemContainer}>
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Text style={styles.sITextBig}>{title}</Text>
              <Text style={styles.sITextSmall}>Quantity: {quantity}</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
              <Text style={styles.sITextBig}>{location_rel['title']}</Text>
              <Text style={styles.sITextSmall}>{category}</Text>
            </View>
          </View>
        </TouchableHighlight>
        <RBSheet
          ref={refEditShoppingItemRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            container:{
              height:350,
              padding: 20,
            },
            wrapper: {
              backgroundColor: "transparent"
            },
            draggableIcon: {
              backgroundColor: "#000"
            }
          }}
        >
          <Formik
            initialValues={{
              id: 0,
              title: "",
              quantity: 1,
              category: ""
            }}

            enableReinitialize

            validationSchema={Yup.object({
              title: Yup.string().required('Required'),
              quantity: Yup.number().required('Required'),
              category: Yup.string().required('Required'),
            })}
            onSubmit={(values) => {
              const shoppingItemPatchObj = {
                "id": values.id,
                "title": values.title,
                "quantity": parseInt(values.quantity, 10),
                "category": values.category
              };
              editShoppingItem(shoppingItemPatchObj);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
              <View style={styles.formContainer}>
                <View style={styles.doubledUp}>
                  <View style={styles.doubledUpInputContainers}>
                    <Text style={styles.labels}>Item Name:</Text>
                    <TextInput
                      style={styles.inputs}
                      placeholder='ex. Bread'
                      value={values.title}
                      onChangeText={handleChange('title')}
                      onBlur={handleBlur('title')}
                    />
                    {touched.title && errors.title ? (<Text style={styles.errorMessage}>{errors.title}</Text>) : null}
                  </View>
                </View>
                <View style={styles.doubledUp}>
                  <View style={styles.doubledUpInputContainers}>
                    <Text style={styles.labels}>Quantity:</Text>
                    <TextInput
                      style={styles.inputs}
                      value={values.quantity}
                      onChangeText={handleChange('quantity')}
                      onBlur={handleBlur('quantity')}
                    />
                    {touched.quantity && errors.quantity ? (<Text style={styles.errorMessage}>{errors.quantity}</Text>) : null}
                  </View>
                  <View style={styles.doubledUpInputContainers}>
                    <Text style={styles.labels}> Category:</Text>
                    <TextInput
                      style={styles.inputs}
                      placeholder='ex. Produce'
                      value={values.category}
                      onChangeText={handleChange('category')}
                      onBlur={handleBlur('category')}
                    />
                    {touched.category && errors.category ? (<Text style={styles.errorMessage}>{errors.category}</Text>) : null}
                  </View>
                </View>
                <Button
                  style={styles.button}
                  title='Finish'
                  onPress={() => {
                    handleSubmit()
                    refEditShoppingItemRBSheet.current.close()
                  }} />
              </View>
            )}
          </Formik>
        </RBSheet>
      </View>
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
      <View style={styles.rowBack}>
        <TouchableOpacity style={styles.backLeftEditBtn} onPress={() => {
          console.log(data.item)
          refEditShoppingItemRBSheet.current.props.children.props.initialValues.id = data.item.id
          refEditShoppingItemRBSheet.current.props.children.props.initialValues.title = data.item.title
          refEditShoppingItemRBSheet.current.props.children.props.initialValues.quantity = data.item.quantity
          refEditShoppingItemRBSheet.current.props.children.props.initialValues.category = data.item.category
          refEditShoppingItemRBSheet.current.open()
        }
        }>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backRightDeleteBtn} onPress={onDelete}>
          <Text style={styles.buttonText}>Delete</Text>
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
    removeShoppingItem(data.item.id);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ShoppingList</Text>
      <ScrollView style={styles.shoppingListContainer} contentContainerStyle={styles.sLContainerContent} showsVerticalScrollIndicator={false}>
        <SwipeListView
          data={shoppingItems}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-75}
          style={{ width: '100%' }}
        />
      </ScrollView>
      <TouchableOpacity style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginVertical: 20, }} onPress={() => refNewShoppingItemRBSheet.current.open()}>
        <Text style={{ fontSize: 30 }}>➕</Text>
      </TouchableOpacity>
      <RBSheet
        ref={refNewShoppingItemRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container:{
            height:350,
            padding: 20,
          },
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <Formik
          initialValues={{
            title: "",
            quantity: 1,
            location: "",
            category: ""
          }}
          validationSchema={Yup.object({
            title: Yup.string().required('Required'),
            quantity: Yup.number().required('Required'),
            location: Yup.string().required('Required'),
            category: Yup.string().required('Required'),
          })}
          onSubmit={(values) => {
            const shoppingItemObj = {
              "user_id": user.id,
              "title": values.title,
              "quantity": parseInt(values.quantity, 10),
              "location": values.location,
              "category": values.category
            };
            addShoppingItem(shoppingItemObj)
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
            <View style={styles.formContainer}>
              <View style={styles.doubledUp}>
                <View style={styles.doubledUpInputContainers}>
                  <Text style={styles.labels}>Item Name:</Text>
                  <TextInput
                    style={styles.inputs}
                    placeholder='ex. Bread'
                    placeholderTextColor={'rgba(0, 0, 0, 0.6)'}
                    value={values.title}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                  />
                  {touched.title && errors.title ? (<Text style={styles.errorMessage}>{errors.title}</Text>) : null}
                </View>
                <View style={styles.doubledUpInputContainers}>
                  <Text style={styles.labels}> Location:</Text>
                  <TextInput
                    style={styles.inputs}
                    placeholder='ex. Target'
                    placeholderTextColor={'rgba(0, 0, 0, 0.6)'}
                    value={values.location}
                    onChangeText={handleChange('location')}
                    onBlur={handleBlur('location')}
                  />
                  {touched.location && errors.location ? (<Text style={styles.errorMessage}>{errors.location}</Text>) : null}
                </View>
              </View>
              <View style={styles.doubledUp}>
                <View style={styles.doubledUpInputContainers}>
                  <Text style={styles.labels}>Quantity:</Text>
                  <TextInput
                    style={styles.inputs}
                    value={values.quantity}
                    onChangeText={handleChange('quantity')}
                    onBlur={handleBlur('quantity')}
                  />
                  {touched.quantity && errors.quantity ? (<Text style={styles.errorMessage}>{errors.quantity}</Text>) : null}
                </View>
                <View style={styles.doubledUpInputContainers}>
                  <Text style={styles.labels}> Category:</Text>
                  <TextInput
                    style={styles.inputs}
                    placeholder='ex. Produce'
                    placeholderTextColor={'rgba(0, 0, 0, 0.6)'}
                    value={values.category}
                    onChangeText={handleChange('category')}
                    onBlur={handleBlur('category')}
                  />
                  {touched.category && errors.category ? (<Text style={styles.errorMessage}>{errors.category}</Text>) : null}
                </View>
              </View>
              <Button
                style={styles.button}
                title='Add Item'
                onPress={() => {
                  handleSubmit()
                  refNewShoppingItemRBSheet.current.close()
                }} />
            </View>
          )}
        </Formik>
      </RBSheet>

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
    fontWeight: 900,
  },
  shoppingListContainer: {
    height: '50%',
    width: '85%',
    flex: 1,
    flexDirection: 'column',
  },
  sLContainerContent: {
    alignItems: 'center',
  },
  shoppingItemContainer: {
    backgroundColor: colorVars.backgroundSecondary,
    padding: 5,
    width: '100%' - 10,
    height: 70,
    padding: 15,
    borderRadius: 7,
    margin: 2.5,
  },
  sITextBig: {
    color: colorVars.text,
    fontSize: 17.5,
    fontWeight: 500
  },
  sITextSmall: {
    color: colorVars.text,
    fontSize: 12.5,
    fontWeight: 300
  },
  backRightDeleteBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    height: 69,
    width: 80,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    left: -3,
  },
  backLeftEditBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorVars.accent,
    height: 69,
    width: 80,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    right: -3,
  },
  buttonText: {
    color: colorVars.text,
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%' - 10,
    borderRadius: 5,
  },
  doubledUp: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  doubledUpInputContainers: {
    marginVertical: 10,
    width: '49%',
  },
  labels:{
    fontSize: 15,
    fontWeight: 500,
    marginBottom:5,
  }, 
  inputs:{
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  errorMessage:{
    color: 'red'
  }
})