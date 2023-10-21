import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Alert, ScrollView, Text, View } from "react-native";
import { s } from "./App.style";
import { Header } from "./components/header";
import { CardToDo } from "./components/CardTodo/cardTodo";
import { useEffect, useState } from "react";
import { TabBottomMenu } from "./components/TabBottomMenu/tabBottomMenu";
import { ButtonAdd } from "./components/ButtonAdd/ButtonAdd";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

let isFirstRender = true;
let isLoadUpdate = false;

export default function App() {
  const [selectedTabName, setSelectedTabName] = useState("all");
  //le state permettant d'afficher le dialog
  const [isAddDialogVisible, setIsAddDialogVisible] = useState(false);
  //le state contenant le contenu du popUp pour utilisation lors de la creation
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);

  //permettant d'excuter un code lors de demarage de l'application et juste une fois
  useEffect(() => {
    loadTodoList();
  }, []);

  //permet de verifier notre modificatio quand il ya changement.
  useEffect(() => {
    if (isLoadUpdate) {
      isLoadUpdate = false;
    } else {
      if (!isFirstRender) {
        saveTodoList();
      } else {
        isFirstRender = false;
      }
    }
  }, [todoList]);

  //Fonction permettant de sauvegarder
  async function saveTodoList() {
    console.log("save");
    try {
      await AsyncStorage.setItem("@todoList", JSON.stringify(todoList));
    } catch (err) {
      alert("Erreur " + err);
    }
  }

  //la fonction pour loader les taches
  async function loadTodoList() {
    console.log("load");
    try {
      const stringifiedTodoList = await AsyncStorage.getItem("@todoList");
      if (stringifiedTodoList !== null) {
        const parsedTodoList = JSON.parse(stringifiedTodoList);
        isLoadUpdate = true;
        setTodoList(parsedTodoList);
      }
    } catch (err) {
      alert("Erreur " + err);
    }
  }

  /*
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Aller a la mosqueé", isCompleted: true },
    { id: 2, title: "Programmer mon app", isCompleted: false },
    { id: 3, title: "Aller a la salle de sport", isCompleted: true },
    { id: 4, title: "Aller dormir", isCompleted: true },
  ]);*/

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

  //La fonction permettant de retourner le tableau.
  function renderTodoList() {
    return todoList.map((todo) => (
      <View style={s.cardItem} key={todo.id}>
        <CardToDo onPress={updateTodo} todo={todo} />
      </View>
    ));
  }

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

  //La fonction qui permet d'afficher le resultat du tableau filtrer
  function renderTodoList() {
    return getFilteredList().map((todo) => (
      <View style={s.cardItem} key={todo.id}>
        <CardToDo onLongPress={deleteTodo} onPress={updateTodo} todo={todo} />
      </View>
    ));
  }

  //la fonction permettant d'afficher le dialog
  function showAddDialog() {
    setIsAddDialogVisible(true);
  }

  //la fonction permettante de faire l'ajout des taches en creant une nouvelle taches
  function addTodo() {
    const newTodo = {
      id: uuid.v4(),
      title: inputValue,
      isCompleted: false,
    };

    setTodoList([...todoList, newTodo]); //ajout notre todo aux existant.
    setIsAddDialogVisible(false);
  }

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>
          <View style={s.body}>
            <ScrollView>{renderTodoList()}</ScrollView>
          </View>
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
          <Dialog.Input onChangeText={setInputValue} />
          <Dialog.Button
            disabled={inputValue.trim().length === 0}
            label="Creer"
            onPress={addTodo}
          />
        </Dialog.Container>
      </View>
    </>
  );
}
