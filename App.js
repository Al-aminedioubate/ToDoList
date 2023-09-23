import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";
import { s } from "./App.style";
import { Header } from "./components/header";
import { CardToDo } from "./components/CardTodo/cardTodo";
import { useState } from "react";

export default function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Aller au travail la matin", isCompleted: true },
    { id: 2, title: "Programmer mon app", isCompleted: true },
    { id: 3, title: "Aller a la salle de sport", isCompleted: true },
    { id: 4, title: "Aller dormir", isCompleted: true },
    { id: 5, title: "Aller au travail la matin", isCompleted: false },
    { id: 6, title: "Programmer mon app", isCompleted: true },
    { id: 7, title: "Aller a la salle de sport", isCompleted: true },
    { id: 8, title: "Aller dormir", isCompleted: false },
  ]);

  //La fonction permettant de retourner le tableau.
  function renderTodoList() {
    return todoList.map((todo) => (
      <View style={s.cardItem} key={todo.id}>
        <CardToDo todo={todo} />
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
        <Text>Footer</Text>
      </View>
    </>
  );
}
