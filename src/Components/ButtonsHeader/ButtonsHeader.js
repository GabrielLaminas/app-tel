import React from "react";
import { TouchableOpacity } from "react-native";
import { ContainerView, ViewButtons, ViewDropDown, TextDropDown } from "./ButtonsHeaderStyle";
import Icon from "react-native-vector-icons/Feather.js"; 

function ButtonsHeader({visibleMenu, setVisibleMenu, modalVisible, modalSetVisible, shareContact}){
  return (
    <ContainerView>
      <ViewButtons>
        <TouchableOpacity onPress={() => {
          setVisibleMenu(false)
          modalSetVisible({...modalVisible, "editModal": true });
        }}>
          <Icon name="edit-2" size={22} color="#45505E" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setVisibleMenu((prev) => !prev)} style={{paddingVertical: 6}}>
          <Icon name="more-vertical" size={22} color="#000" />
        </TouchableOpacity>
      </ViewButtons>

      <ViewDropDown visible={visibleMenu}>
        <TouchableOpacity onPress={() => {
          setVisibleMenu(false)
          modalSetVisible({...modalVisible, "deleteModal": true })
        }}>
          <TextDropDown>Excluir</TextDropDown >
        </TouchableOpacity>

        <TouchableOpacity onPress={shareContact}>
          <TextDropDown>Compartilhar</TextDropDown>
        </TouchableOpacity>
      </ViewDropDown>
    </ContainerView>
  );
};

export default ButtonsHeader;