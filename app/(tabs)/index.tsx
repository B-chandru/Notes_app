import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Button, ScrollView, StyleSheet, Text, TextInput, View , FlatList, TouchableOpacity} from "react-native";

export default function HomeScreen() {
  const [task, setTask] = useState('');
   const [btntext, setBtntext] = useState(-1);
  const [tasklist, setaTasklist] = useState([]);

  const handleaddtask =()=> {
    if(task){
      if (btntext !== -1) {
        const updatedtask = [...tasklist];
        updatedtask[btntext] = task;
        setaTasklist(updatedtask);
        setBtntext(-1);
      } else {
        setaTasklist([...tasklist, task]);
      }
      setTask("");
    }
  
  }


     const renderitem =({item, index})=>{
        return (
          <View style={styles.list_container}>
            <Text style={styles.list_h2}>{item}</Text>
            <View style={styles.inner_list_con}>
              <TouchableOpacity onPress={() => Edittask(index)}>
                <Text style={styles.list_edit}>
                  <MaterialIcons name="edit" size={24} color="green" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Deletetask(index)}>
                <Text style={styles.list_del}>
                  <MaterialCommunityIcons
                    name="delete"
                    size={24}
                    color="red"
                  />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
  }
  
 
    const Edittask = (item) => {
      const tasktoedit = tasklist[item];
      setTask(tasktoedit);
      setBtntext(item);
    };

      const Deletetask = (item) => {
        const updatedtask= [...tasklist];
        updatedtask.splice(item,1);
        setaTasklist(updatedtask);
      };

  return (
    <ScrollView style={styles.titlecon}>
      <Text style={styles.title_h1}>Be productive</Text>
      <View>
      {/* Textinput */}
        <TextInput
          placeholder="Enter task"
          onChangeText={(e) => setTask(e)}
          style={styles.txtinput}
          value={task}
        />
      {/*  button */}
        <TouchableOpacity
          style={styles.btn}
          onPress={handleaddtask}
        >
          <Text style={styles.enter_btn}>{btntext !== -1 ?" Update task": "Add Task"}</Text>
        </TouchableOpacity>

        {/* lising */}
        <FlatList data={tasklist} renderItem={renderitem} keyExtractor={(item, index)=> index.toString()}/>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titlecon: {
    flex: 1,
    padding: 40,
    marginTop: 20,
    backgroundColor: "white",
  },
  title_h1: {
    fontSize: 30,
    textAlign: "center",
    textTransform: "capitalize",
    paddingBottom: 10,
  },
  txtinput: {
    marginTop: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderBlockColor: "#37474f",
    padding: 10,
    borderRadius: 4,
  },
  btn: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 4,
  },
  enter_btn: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  list_container:{
  padding:10,
  marginTop:10,
  marginBottom:10,
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between'
  },
  list_h2:{
    fontWeight:'bold',
  },
  inner_list_con:{
    display:'flex',
    flexDirection:'row',
  },
  list_edit:{
    color:'#4caf50'
  },
  list_del:{
    color:'red'
  }
  
});
