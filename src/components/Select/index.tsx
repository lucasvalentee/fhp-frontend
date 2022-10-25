import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  isDisabled?: boolean;
  onChange?: (data: any) => void;
}

const Select: React.FC<InputProps> = ({
  name,
  icon: Icon,
  isDisabled,
  onChange,
  children,
  ...rest
}) => {
  const inputRef = useRef<HTMLSelectElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleInputChange = useCallback(() => {
    setIsFilled(!!inputRef.current?.value);

    if (onChange) {
      onChange(inputRef.current?.value);
    }
  }, [onChange]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      isErrored={!!error}
      isFilled={!!inputRef.current?.value || isFilled}
      isFocused={isFocused}
      isDisabled={!!isDisabled}
    >
      {Icon && <Icon size={20} />}
      <select
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        disabled={isDisabled}
        {...rest}
      >
        {children}
      </select>
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Select;
