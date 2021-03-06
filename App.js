import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { setNavigator } from './src/navigationRef'
import { Provider } from './src/context/LocationContext'
import WelcomeScreen from './src/screens/WelcomeScreen'
import TutorialScreen1 from './src/screens/tutorial/TutorialScreen1'
import TutorialScreen2 from './src/screens/tutorial/TutorialScreen2'
import TutorialScreen3 from './src/screens/tutorial/TutorialScreen3'
import SettingsScreen from './src/screens/settings/SettingsScreen'
import DefaultLocationSettingScreen from './src/screens/settings/DefaultLocationSettingScreen'
import DefaultLimitSettingScreen from './src/screens/settings/DefaultLimitSettingScreen'
import DefaultTermSettingScreen from './src/screens/settings/DefaultTermSettingScreen'
import RestaurantDetailsScreen from './src/screens/app/RestaurantDetailsScreen'
import LocationSelectorScreen from './src/screens/app/LocationSelectorScreen'
import SearchResultsScreen from './src/screens/app/SearchResultsScreen'
import NewSearchScreen from './src/screens/app/NewSearchScreen'

const stackNavigator = createStackNavigator({
  Welcome: WelcomeScreen,
  'College Eats': createBottomTabNavigator({
    'How to Use': createStackNavigator({
      Tutorial1: TutorialScreen1,
      Tutorial2: TutorialScreen2,
      Tutorial3: TutorialScreen3
    }),
    'Find a Restaurant': createStackNavigator({
      SearchResults: SearchResultsScreen,
      LocationSelector: LocationSelectorScreen,
      RestaurantDetails: RestaurantDetailsScreen,
      NewSearch: NewSearchScreen,
    }),
    'Settings': createStackNavigator({
      Settings: SettingsScreen,
      DefaultLocationSetting: DefaultLocationSettingScreen,
      DefaultTermSetting: DefaultTermSettingScreen,
      DefaultLimitSetting: DefaultLimitSettingScreen,
    })
  },
  {
    tabBarOptions: {
      activeTintColor: 'black',
      activeBackgroundColor: '#DBD6D2',
      inactiveBackgroundColor: '#2F323A',
    }
  }
  )
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
})

const App = createAppContainer(stackNavigator)

export default () => {
  return <Provider>
    <App ref={(navigator) => setNavigator(navigator)} />
  </Provider>
}