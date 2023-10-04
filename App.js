import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";
import { s } from "./App.style";
import { Header } from "./components/header";
import { CardToDo } from "./components/CardTodo/cardTodo";
import { useState } from "react";
import { TabBottomMenu } from "./components/TabBottomMenu/tabBottomMenu";

export default function App() {
  const [selectedTabName, setSelectedTabName] = useState("all");
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Aller au travail la matin", isCompleted: true },
    { id: 2, title: "Programmer mon app", isCompleted: false },
    { id: 3, title: "Aller a la salle de sport", isCompleted: true },
    { id: 4, title: "Aller dormir", isCompleted: true },
    { id: 5, title: "Aller au travail la matin", isCompleted: false },
    { id: 6, title: "Programmer mon app", isCompleted: true },
    { id: 7, title: "Aller a la salle de sport", isCompleted: true },
    { id: 8, title: "Aller dormir", isCompleted: false },
  ]);

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

    console.log(todo);
  }

  //La fonction permettant de retourner le tableau.
  function renderTodoList() {
    return todoList.map((todo) => (
      <View style={s.cardItem} key={todo.id}>
        <CardToDo onPress={updateTodo} todo={todo} />
      </View>
    ));
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
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <TabBottomMenu
          onPress={setSelectedTabName}
          selectedTabName={selectedTabName}
        />
      </View>
    </>
  );
}
