import { ButtonHTMLAttributes } from 'react';
import './styles.scss';

type ButtonPros = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button (props: ButtonPros) {
  return (
    <button className="button" {...props}>

    </button>
  );
}