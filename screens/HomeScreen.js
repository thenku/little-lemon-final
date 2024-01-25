import * as React from 'react';
import { useEffect, useState, useCallback, useMemo } from 'react';
import {StatusBar, StyleSheet, Text, View, Image, Pressable, ScrollView, FlatList, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import Header from '../components/Header';
import debounce from 'lodash.debounce';
import json2 from '../assets/menu_items.json'

import {
    createTable,
    getMenuItems,
    saveMenuItems,
    filterByQueryAndCategories,
  } from '../database';
import { getListData, useUpdateEffect } from '../utils/myUtils';

import ListItem from '../components/ListItem';
import Filters from '../components/Filters';

const API_URL =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

const heroImage = require('../assets/hero.png');

const sections = ['Starters', 'Mains', 'Desserts', 'Drinks'];


// 
//
export default function HomeScreen({navigation}) {
    const [data, setData] = useState([]);
    const [searchBarText, setSearchBarText] = useState('');
    const [query, setQuery] = useState('');

    const [filterSelections, setFilterSelections] = useState(
      sections.map(() => false)
    );
  
    const fetchData = async() => {
      // 1. Implement this function
      try{
        const json = await fetch(API_URL).then(txt=>txt.json()) || json2;
        // const json = json2;
        // console.log(JSON.stringify(json, null, '\t'))
        return json.menu;
      }catch(e){
        console.error(`FETCH FAILED`)
      }
      // Fetch the menu from the API_URL endpoint. You can visit the API_URL in your browser to inspect the data returned
      // The category field comes as an object with a property called "title". You just need to get the title value and set it under the key "category".
      // So the server response should be slighly transformed in this function (hint: map function) to flatten out each menu item in the array,
      return [];
    }
  
    useEffect(() => {
      (async () => {
        try {
          await createTable();
          let menuItems = await getMenuItems();
  
          // The application only fetches the menu data once from a remote URL
          // and then stores it into a SQLite database.
          // After that, every application restart loads the menu from the database
          if (!menuItems.length) {
            const menuItems = await fetchData();
            await saveMenuItems(menuItems);
          }
          const listData = getListData(menuItems);
          setData(listData);
        } catch (e) {
          // Handle error
          Alert.alert(e.message);
        }
      })();
    }, []);
  
    useUpdateEffect(() => {
      (async () => {
          const activeCategories = sections.filter((s, i) => {
        // If all filters are deselected, all categories are active
        if (filterSelections.every((item) => item === false)) {
            return true;
          }
          return filterSelections[i];
        });
        try {
            const menuItems = await filterByQueryAndCategories(
                query,
                activeCategories
            );
          const sectionListData = getListData(menuItems);
          setData(sectionListData);
        } catch (e) {
          Alert.alert(e.message);
        }
      })();
    }, [filterSelections, query]);
  
    const lookup = useCallback((q) => {
      setQuery(q);
    }, []);
  
    const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);
  
    const handleSearchChange = (text) => {
      setSearchBarText(text);
      debouncedLookup(text);
    };
  
    const handleFiltersChange = async (index) => {
      const arrayCopy = [...filterSelections];
      arrayCopy[index] = !filterSelections[index];
      setFilterSelections(arrayCopy);
    };
    return (
        <View style={styles.container}>
            <Header navigation={navigation} showProfile={true}/>
            <View style={styles.body}>
                <Text style={styles.h1}>
                    Little Lemon
                </Text>
                <View style={{flexDirection: "row", gap:4, justifyContent: "space-between", alignItems: "flex-start", marginBottom:8}}>
                    <View>
                        <Text style={styles.h2}>
                        Chicago
                        </Text>
                        <Text style={styles.p}>
                            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist
                        </Text>
                    </View>
                    <Image style={styles.imageRight} source={heroImage} />
                </View>
                <Searchbar
                    placeholder=""
                    placeholderTextColor="grey"
                    onChangeText={handleSearchChange}
                    value={searchBarText}
                    style={styles.searchBar}
                    iconColor="black"
                    inputStyle={{ color: 'black' }}
                    elevation={0}
                />
            </View>
            <View style={{flex:1, padding:16, }}>
                <View>
                    <Text style={{fontSize: 18, fontWeight:"bold", marginBottom:16}}>ORDER FOR DELIVERY!</Text>
                </View>
                    <Filters
                        selections={filterSelections}
                        onChange={handleFiltersChange}
                        sections={sections}
                    />
                <FlatList data={data} 
                  style={{flex:.5, }}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <ListItem {...item} key={item.id}/>}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        // backgroundColor: '#495E57',
    },
    searchBar: {
        borderRadius: 4,
        backgroundColor: 'white',
        shadowRadius: 0,
        shadowOpacity: 0,
      },
    body: {
        padding:16,
        backgroundColor: "#495E57",
    },
    h1: {
        color: "#f5ba12",
        fontSize: 48,
        fontFamily: "Markazi",
    },
    h2: {
        color: "white",
        fontSize: 32,
        fontFamily: "Markazi",
        top: -16,
    },
    p: {
        fontSize:16,
        fontFamily: "Karla",
        color: "white",
        width: 200,
    },
    textInput:{
        fontSize:24,
        fontFamily: "Karla",
        backgroundColor:"white",
        borderRadius: 8,
        borderColor:"#344854",
        borderWidth:2,
        marginTop: 8,
        marginBottom: 8,
    },
    footer: {
        flex:.2,
        paddingRight:16,
        paddingLeft:16,
        alignItems:"flex-end",
        justifyContent: "center",
        backgroundColor: "#f1f4f7"
    },
    button: {
        backgroundColor: "#cbd2d9",
        padding:8,
        paddingRight: 16,
        paddingLeft:16,
        borderRadius: 8,
    },
    buttonTxt: {
        fontSize:24,
        fontFamily: "Karla",
    },
   
    imageRight:{
        resizeMode: "cover",
        height: 115,
        width: 115,
        borderRadius: 16,
    }
})