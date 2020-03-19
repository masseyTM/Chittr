import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import LogInScreen from './screens/LogInScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import AccountScreen from './screens/AccountScreen';
import UpdateAccount from './screens/UpdateAccount';

const AppStackNav = createStackNavigator ({
  Home: {
    screen: HomeScreen
  },
  LogIn: {
    screen: LogInScreen
  },
  CreateAccount: {
    screen: CreateAccountScreen
  },
  AccountScreen: {
    screen: AccountScreen
  },
  UpdateAccount: {
    screen: UpdateAccount
  }
  });

  const AppContainer = createAppContainer(AppStackNav)

  export default AppContainer;
