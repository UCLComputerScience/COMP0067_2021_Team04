import { Alert, Button, Platform, SafeAreaView, SectionList, StyleSheet, Text, View, ScrollView, Image, TouchableHighlight} from 'react-native';
import React, { Component } from "react";
import { ListItem, Avatar } from 'react-native-elements';

    const styles = StyleSheet.create({
        container: {
         flex: 1,
         paddingTop: 22
        },
        sectionHeader: {
          paddingTop: 2,
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom: 2,
          fontSize: 14,
          fontWeight: 'bold',
          backgroundColor: 'rgba(247,247,247,1.0)',
        },
        item: {
          padding: 10,
          fontSize: 18,
          height: 44,
        },
      })
      
      const Challenger = () => {
          return (
            <View style={styles.container}>
              <SectionList
                sections={[
                  {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
                  {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
                ]}
                renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
              />
            </View>
          );
      }

      export default Challenger;