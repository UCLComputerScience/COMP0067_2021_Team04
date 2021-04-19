import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableHighlight } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AvatarMenu from '../components/AvatarMenu';




export default function MyProfile() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>
                <TouchableHighlight onPress = { () => alert('Mastered!') }>
                    <Ionicons name="cog" size={40} color="#52575D"></Ionicons>
                    </TouchableHighlight>
                </View>

                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={require("../imgs/bee.jpeg")} style={styles.image} resizeMode="center"></Image>
                    </View>
                    <View style={styles.active}></View>
                    <View style={styles.add}>
                        <AvatarMenu></AvatarMenu>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>Joseph Smith</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Teacher: Mr Langley</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Class: 4B</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Date of Brith: 27/01/2012</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>75%</Text>
                        <Text style={[styles.text, styles.subText, {fontSize: 12}]}>App Completion</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>1H 32M</Text>
                        <Text style={[styles.text, styles.subText, {fontSize: 12}]}>Time Spent</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>3885</Text>
                        <Text style={[styles.text, styles.subText, {fontSize: 12}]}>Total XP</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>28</Text>
                        <Text style={[styles.text, styles.subText, {fontSize: 12}]}>Excercises Completed</Text>
                    </View>
                </View>

                <View style={{ marginTop: 32 }}>
                </View>
                <Text style={[styles.subText, styles.recent]}>Achievements</Text>
                <View style={styles.awardContainer}>
                    <TouchableHighlight onPress = { () => alert('Mastered!') }>
                <Ionicons name="trophy" size={60} color="gold"></Ionicons>
                </TouchableHighlight>
                <TouchableHighlight onPress = { () => alert('Do better next time!') }
>
                <Ionicons name="star" size={60} color="#cd7f32"></Ionicons>
                </TouchableHighlight>
                <TouchableHighlight onPress = { () => alert('Mastered!') }
>
                <Ionicons name="medal" size={60} color="gold"></Ionicons>
                </TouchableHighlight>
                <TouchableHighlight onPress = { () => alert('Good work - reach 60% for the silver award!') }
>
                <Ionicons name="trophy" size={60} color="#cd7f32"></Ionicons>
                </TouchableHighlight>
                <TouchableHighlight onPress = { () => alert('Room for improvement') }>
                <Ionicons name="star" size={60} color="silver"></Ionicons>
                </TouchableHighlight>
                </View>  
                <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
                <View style={{ alignItems: "center" }}>
                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                Started following <Text style={{ fontWeight: "400" }}>Michael Jackson </Text>and <Text style={{ fontWeight: "400" }}>Phil Mitchell</Text>
                            </Text>
                        </View>
                    </View>

                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                Started following <Text style={{ fontWeight: "400" }}>Gordon Brown</Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    awardContainer: {
        height:60,
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        backgroundColor: 'black'
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D",
        alignContent: 'center'
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: 'flex-end',
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500",
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        flex:1,
        flexDirection: 'column'
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flex: 1,
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32,
        flexWrap: 'wrap',
    },
    statsBox: {
        alignItems: "center",
        flex: 1,
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 50,
        marginTop: 25,
        marginBottom: 6,
        fontSize: 16
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    }
});