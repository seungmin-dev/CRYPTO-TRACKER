import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = { // DefaultTheme에 항목들이 더 있는 상황에서 여기에 설정을 하지 않았으면 오류라고 알려줌
    bgColor: "#2f3640",
    textColor: "white",
    accentColor: "#fbc531",
    cardBgColor: "transparent",
}

export const lightTheme: DefaultTheme = { 
    bgColor: "whitesmoke",
    textColor: "black",
    accentColor: "#fbc531",
    cardBgColor: "white",
}
