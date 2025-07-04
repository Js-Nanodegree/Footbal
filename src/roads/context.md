# context.md

Purpose: Описывает структуру роутов и навигации приложения. Все Stack/Tab/Drawer навигаторы и маршруты хранятся здесь. Расширять навигацию — добавлять новые Stack/Screen в соответствующие файлы.

- RootNavigator.tsx — основной Stack.Navigator (TeamListScreen, TeamDetailsScreen)
- Используется в App.tsx через NavigationContainer 