import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Alert, ScrollView, Text, View } from "react-native";
import { s } from "./App.style";
import { Header } from "./components/header";
import { CardToDo } from "./components/CardTodo/cardTodo";
import { useState } from "react";
import { TabBottomMenu } from "./components/TabBottomMenu/tabBottomMenu";
import { ButtonAdd } from "./components/ButtonAdd/ButtonAdd";
import Dialog from "react-native-dialog";

export default function App() {
  const [selectedTabName, setSelectedTabName] = useState("all");
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Aller a la mosqueé", isCompleted: true },
    { id: 2, title: "Programmer mon app", isCompleted: false },
    { id: 3, title: "Aller a la salle de sport", isCompleted: true },
    { id: 4, title: "Aller dormir", isCompleted: true },
    { id: 5, title: "Aller au travail la matin", isCompleted: false },
    { id: 6, title: "Programmer mon app", isCompleted: true },
    { id: 7, title: "Aller a la salle de sport", isCompleted: true },
    { id: 8, title: "Aller dormir", isCompleted: false },
  ]);

  //la fonction qui permet de filtrage des taches
  function getFilteredList() {
    switch (selectedTabName) {
      case "all":
        return todoList;
      case "inProgress":
        return todoList.filter((todo) => !todo.isCompleted);
      case "done":
        return todoList.filter((todo) => todo.isCompleted);
    }
  }

  //La fonction qui permet de faire la mise a jour d'une tache.
  function updateTodo(todo) {
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };

    const indexToUpdate = todoList.findIndex(
      (todo) => todo.id === updatedTodo.id
    );

    const updatedTodoList = [...todoList];
    updatedTodoList[indexToUpdate] = updatedTodo;
    setTodoList(updatedTodoList);

    //console.log(todo);
  }

  /*//La fonction permettant de retourner le tableau.
  function renderTodoList() {
    return todoList.map((todo) => (
      <View style={s.cardItem} key={todo.id}>
        <CardToDo onPress={updateTodo} todo={todo} />
      </View>
    ));
  }*/

  //function qui permet d'effacer une tache
  function deleteTodo(todoToDelete) {
    Alert.alert("Suppression", "Supprimer cette tache ?", [
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          setTodoList(todoList.filter((todo) => todo.id !== todoToDelete.id));
        },
      },
      {
        text: "Annuler",
        style: "cancel",
      },
    ]);
  }

  //La fonction d'afficher le resultat filtrer
  function renderTodoList() {
    return getFilteredList().map((todo) => (
      <View style={s.cardItem} key={todo.id}>
        <CardToDo onLongPress={deleteTodo} onPress={updateTodo} todo={todo} />
      </View>
    ));
  }

  //la fonction permettant de faire les ajouts des taches.
  function addTodo() {}

  function showAddDialog() {
    setIsAddDialogVisible(true);
  }

  //le state permettant d'afficher le dialog
  const [isAddDialogVisible, setIsAddDialogVisible] = useState(false);

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>
          <View style={s.body}></View>
          <ButtonAdd onPress={showAddDialog} />
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <TabBottomMenu
          todoList={todoList}
          onPress={setSelectedTabName}
          selectedTabName={selectedTabName}
        />
        <Dialog.Container
          visible={isAddDialogVisible}
          onBackdropPress={() => setIsAddDialogVisible(false)}
        >
          <Dialog.Title>Creer une tache</Dialog.Title>
          <Dialog.Description>
            Choisir un nom pour la nouvelle tache
          </Dialog.Description>
          <Dialog.Input onChangeText={() => ""} />
          <Dialog.Button label="Creer" onPress={() => ""} />
        </Dialog.Container>
      </View>
    </>
  );
}
