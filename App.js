import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { s } from "./App.style";
import { Header } from "./components/header";
import { CardToDo } from "./components/CardTodo/cardTodo";

const TODO_LIST = [
  { id: 1, title: "Sortir le chien", isCompleted: true },
  { id: 2, title: "Aller chez le garagiste", isCompleted: true },
  { id: 3, title: "Faire les courses", isCompleted: true },
  { id: 4, title: "Appeler le veterinaire", isCompleted: true },
];
export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>
          <View style={s.body}>
            <CardToDo todo={TODO_LIST[0]} />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <Text>Footer</Text>
      </View>
    </>
  );
}
