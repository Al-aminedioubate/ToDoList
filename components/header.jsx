import {s} from "./header.style";
import { Text, Image } from "react-native";
import headerLogo from "../assets/logo.png";

export function Header(){
    return <>
    <Image style={s.img} source={headerLogo} resizeMode="contain"/>
    <Text style={s.subtitle}>Tu as probablement un truc a faire</Text>
    </>
}