import {ScrollViewProps} from 'react-native';

export interface KeyboardAwareViewProps extends ScrollViewProps {
  /**
   * Add extra keyboard offset to move the view up.
   * @type number
   * @default 15 
   */
  extraKeyboardOffset?: number;
}