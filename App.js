import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal as ModalWrapper,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

export default function App() {
  const [inputValue, setinputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: inputValue }]);
      setinputValue("");
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const clearAllTodos = () => {
    setTodos([]);
  };

  const openUpdateModal = (id) => {
    setSelectedTodoId(id);
    setModalVisible(true);
  };

  const closeUpdateModal = () => {
    setModalVisible(false);
    setSelectedTodoId(null);
    setinputValue("");
  };

  const updateTodo = () => {
    if (inputValue.trim() !== "") {
      const updatedTodos = todos.map((todo) =>
        todo.id === selectedTodoId ? { ...todo, text: inputValue } : todo
      );
      setTodos(updatedTodos);
      closeUpdateModal();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>TODO APP</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your Todo..."
          style={styles.input}
          onChangeText={(text) => setinputValue(text)}
          value={inputValue}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={addTodo}>
            <Text style={styles.buttonText}>ADD TODO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={clearAllTodos}>
            <Text style={styles.buttonText}>CLEAR ALL</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.todosContainer}>
        {todos.map((item) => (
          <View style={styles.todoItemContainer} key={item.id}>
            <View style={styles.itemsName}>
              <Text style={styles.todoItem}>
                {" "}
                {item.text.length > 6
                  ? item.text.slice(0, 8) + "..."
                  : item.text}
              </Text>
            </View>
            <View style={styles.todoButtons}>
              <TouchableOpacity
                style={styles.todoDelete}
                onPress={() => deleteTodo(item.id)}
              >
                <Ionicons name="trash-bin-outline" size={24} color="#FFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.todoUpdate}
                onPress={() => openUpdateModal(item.id)}
              >
                <Ionicons name="create-outline" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <Modal isVisible={modalVisible}>
        <View style={styles.modalContainer}>
          <TextInput
            placeholder="Edit your Todo..."
            style={styles.modalInput}
            onChangeText={(text) => setinputValue(text)}
            value={inputValue}
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={updateTodo}>
              <Text style={styles.buttonText}>UPDATE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={closeUpdateModal}
            >
              <Text style={styles.buttonText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD700",
    paddingTop: 30,
  },
  heading: {
    alignItems: "center",
    marginVertical: 20,
  },
  headingText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#2E8B57",
  },
  inputContainer: {
    marginHorizontal: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    fontSize: 16,
    backgroundColor: "#FFF",
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  todoButtons: {
    marginTop: 10,
    marginRight: 40,
    flexDirection: "row",
  },
  addButton: {
    backgroundColor: "#32CD32",
    width: "48%",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  clearButton: {
    backgroundColor: "#DC143C",
    width: "48%",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 15,
    color: "#FFF",
  },
  todosContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  todoItemContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  todoItem: {
    fontSize: 20,
    color: "#696969",
    marginRight: 20,
  },
  todoDelete: {
    backgroundColor: "#DC143C",
    width: "40%",
    padding: 15,
    marginRight: 3,
    alignItems: "center",
    borderRadius: 10,
  },
  todoUpdate: {
    backgroundColor: "#4169E1",
    width: "40%",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  modalContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    backgroundColor: "#32CD32",
    width: "48%",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
});
