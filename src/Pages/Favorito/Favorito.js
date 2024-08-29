import { TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { 
  MainView, ViewFlat, CardView, CardViewNome, ViewNoItems, 
  ButtonToContato, ButtonToContatoText, NoItemsList 
} from "./FavoritoStyle.js";
import FillIcon from "react-native-vector-icons/MaterialIcons.js"; 
import Title from "../../Components/Title/Title.js";
import { ref, onValue, query, orderByChild } from "firebase/database";
import { database } from "../../Firebase/firebase.js";
import { UserContext } from "../../context/userContext.js";
import { useNavigation } from "@react-navigation/native";

function Favorito(){
  const { navigate } = useNavigation();
  const { user } = React.useContext(UserContext);
  const [dataFavorite, setDataFavorite] = React.useState([])
  
  React.useEffect(() => {
    function getFavorites(){
      const referencia = ref(database, `AppTelContato/${user}`);
      onValue(query(referencia, orderByChild('nome')), (snapshot) => {
        if(snapshot.exists()){
          setDataFavorite([]);

          snapshot.forEach((child) => {
            const data = {
              id: child.key,
              nome: child.val().nome,
              favorito: child.val().favorito
            }
            const dataFavorites = [];
            dataFavorites.push(data);
            const favoritesFilter = dataFavorites.filter((dataF) => dataF.favorito);
            setDataFavorite((prevData) => [...prevData, ...favoritesFilter]);
          });
        } else{
          setDataFavorite([]);
        }
      })
    }
    getFavorites();
  }, []);

  function renderItem({item}){
    return <FavoriteCard data={item} />
  }

  return (
    <MainView>
      <Title>Meus Favoritos</Title>

      {
        dataFavorite.length > 0
        ? (<ViewFlat>
            <FlatList 
              showsVerticalScrollIndicator={false}
              data={dataFavorite} 
              renderItem={renderItem}
              keyExtractor={(contact) => contact.id}
            />
          </ViewFlat>)
        : (<ViewNoItems>
            <NoItemsList>
              Você ainda não possui contatos favoritos. Marque seus contatos preferidos. 
            </NoItemsList>
            <ButtonToContato onPress={() => navigate('Contato')}>
              <ButtonToContatoText>Adicionar Favorito</ButtonToContatoText>
            </ButtonToContato>
          </ViewNoItems>)
      }
    </MainView>
  );
};

function FavoriteCard({data}){
  const { navigate } = useNavigation();
  const { updateFavorite } = React.useContext(UserContext);

  return (
    <TouchableOpacity style={{marginBottom: 16}} onPress={() => navigate('Usuario', { id: data.id })}>
      <CardView>
        <CardViewNome numberOfLines={1}>{data.nome}</CardViewNome>
        <TouchableOpacity 
          onPress={() => updateFavorite(data.favorito, data.id)}
          style={{width: 32, height: 32, alignItems: "center", justifyContent: 'center'}}
        >
          <FillIcon name="favorite" size={24} color="#FF6348" />
        </TouchableOpacity>
      </CardView>
    </TouchableOpacity>
  );
}

export default Favorito;
