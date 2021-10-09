import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardEvent,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import {KeyboardAwareViewProps} from './typings'

const {height: windowHeight} = Dimensions.get('screen');

export const KeyboardAwareView: React.FC<KeyboardAwareViewProps> = ({
  children,
  extraKeyboardOffset = 15,
  scrollEnabled = false,
  ...restProps
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [viewHeight, setViewHeight] = useState(0);
  const [lastPosition, setLastPosition] = useState(0);
  const [currentTopPosition, setCurrentTopPosition] = useState(0);
  const [lastHeightPosition, setLastHeightPosition] = useState(Infinity);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const computeKeyboardHeight = (e: KeyboardEvent) => {
    return e.endCoordinates.height;
  };

  const moveScrollView = (
    inputLocation: number,
    keyboardHeight: number,
    inputHeight: number,
  ) => {
    scrollViewRef.current?.scrollTo({
      y:
        inputLocation -
        (windowHeight - keyboardHeight) +
        inputHeight +
        extraKeyboardOffset,
      x: 0,
      animated: true,
    });
  };

  const onKeyboardDidShow = (e: KeyboardEvent) => {
    const keyboardHeight = computeKeyboardHeight(e);
    const focusedTextInputRef = TextInput.State.currentlyFocusedInput();
    focusedTextInputRef.measure((x, y, w, height, px, py) => {
      const minimumPositionKeyboardAvoidView =
        windowHeight - keyboardHeight - height;
      setLastPosition(y);
      if (py >= minimumPositionKeyboardAvoidView) {
        moveScrollView(y, keyboardHeight, height);
      }
    });
  };

  const onKeyboardDidHide = () => {
    if (lastHeightPosition !== Infinity) {
      scrollViewRef.current?.scrollTo({
        y: lastHeightPosition,
        x: 0,
        animated: true,
      });
    }
    if (TextInput.State.currentlyFocusedInput() === null) {
      setLastHeightPosition(Infinity);
    }
    setIsKeyboardOpen(false);
  };

  const keyboardWillShow = () => {
    setIsKeyboardOpen(true);
  };

  useEffect(() => {
    const removeKeyboardWillShow = Keyboard.addListener(
      'keyboardWillShow',
      keyboardWillShow,
    );
    const removeKeyboardDidShow = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidShow,
    );
    const removeKeyboardDidHide = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardDidHide,
    );
    return () => {
      removeKeyboardDidShow.remove();
      removeKeyboardDidHide.remove();
      removeKeyboardWillShow.remove();
    };
  }, [viewHeight, lastPosition, currentTopPosition, lastHeightPosition]);

  if (Platform.OS === 'android') {
    return (
      <ScrollView scrollEnabled={scrollEnabled} {...restProps}>
        {children}
      </ScrollView>
    );
  }
  return (
    <ScrollView
      ref={scrollViewRef}
      scrollEnabled={scrollEnabled}
      {...restProps}
      scrollToOverflowEnabled={true}
      scrollEventThrottle={0}
      onMomentumScrollEnd={e => {
        setCurrentTopPosition(e.nativeEvent.contentOffset.y);
      }}
      onLayout={e => {
        setViewHeight(e.nativeEvent.layout.height);
      }}
      onScroll={e => {
        if (lastHeightPosition === Infinity && isKeyboardOpen) {
          setLastHeightPosition(e.nativeEvent.contentOffset.y);
        }
      }}>
      {children}
    </ScrollView>
  );
};
