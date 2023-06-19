import { NavigationContainer } from '@react-navigation/native'; 
import RootNavigator from './navigators/RootNavigator';

function App() {
  
    return (
     <NavigationContainer>
      <RootNavigator/>
    </NavigationContainer>
    );
}
export default App;