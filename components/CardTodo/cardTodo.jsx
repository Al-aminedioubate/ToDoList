import { TouchableOpacity, Text, Image } from "react-native";
import {s} from "./card.style";
import checkImage from "../../assets/check.png";

export function CardToDo({todo}){
    return (
        <TouchableOpacity style={s.card}>
            {<Text style={[s.txt, todo.isCompleted && {textDecorationLine:"none"}]}>{todo.title}</Text>}
            {todo.isCompleted && <Image style={s.img} source={checkImage} />}
        </TouchableOpacity>
    );
}