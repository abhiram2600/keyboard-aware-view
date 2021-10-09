# keyboard-aware-view

keyboard-aware-view is a react-native package that handles the view position based on input position and keyboard so that the text input doesn't get hidden behind the keyboard. 

## Installation

### npm

```sh
npm install keyboard-aware-view
```

### yarn

```sh
yarn add keyboard-aware-view
```
### Demo


https://user-images.githubusercontent.com/59743820/136658844-03ba5af8-46d3-45d1-a0bc-a114f7e4522a.mov 

## Usage

```js
import {KeyboardAwareView} from 'keyboard-aware-view';
```

```js
<KeyboardAwareView>
    <TextInput /> 
</KeyboardAwareView>
```

## Props

`extraKeyboardOffset` :- Sets extra offset from keyboard.


  This component is implemented in a `ScrollView` and has its scrollEnabled default to false. Incase a scroll view is needed in a certain component, add the `scrollEnabled` prop and set it to `true`.

[`All ScrollView Props`](https://reactnative.dev/docs/scrollview#props)



## Android Support

Android supports this feature natively. In order to have the same feature in android,

Navigate `projectDirectory -> android -> app -> src -> main -> AndroidManifest.xml`,
Change `android:windowSoftInputMode` to `adjustPan`

```xml
  <activity
        ......
        android:windowSoftInputMode="adjustPan">
         ........
  </activity>
```

## Motivation

KeyboardAvoidingView from react native doesn't give the expected output in most cases and KeyboardAwareScrollView has wobbling issues in few cases. 


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)