import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { setNavigator } from './src/navigationRef'
import WelcomeScreen from './src/screens/WelcomeScreen'
import TutorialScreen1 from './src/screens/tutorial/TutorialScreen1'
import TutorialScreen2 from './src/screens/tutorial/TutorialScreen2'
import TutorialScreen3 from './src/screens/tutorial/TutorialScreen3'
import SettingsScreen from './src/screens/settings/SettingsScreen'
import DefaultLocationSettingScreen from './src/screens/settings/DefaultLocationSettingScreen'
import RestaurantDetailsScreen from './src/screens/RestaurantDetailsScreen'
import RestaurantSelectorScreen from './src/screens/RestaurantSelectorScreen'
import SearchResultsScreen from './src/screens/SearchResultsScreen'

const stackNavigator = createStackNavigator({
  Welcome: WelcomeScreen,
  appFlow: createBottomTabNavigator({
    'How to Use': createStackNavigator({
      Tutorial1: TutorialScreen1,
      Tutorial2: TutorialScreen2,
      Tutorial3: TutorialScreen3
    }),
    'Find a Restaurant': createStackNavigator({
      RestaurantSelector: RestaurantSelectorScreen,
      SearchResults: SearchResultsScreen,
      RestaurantDetails: RestaurantDetailsScreen
    }),
    'Settings': createStackNavigator({
      Settings: SettingsScreen,
      DefaultLocationSetting: DefaultLocationSettingScreen
    })
  })
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
})

const App = createAppContainer(stackNavigator)

export default () => {
  return (
        <App ref={(navigator) => setNavigator(navigator)} />
  )
}