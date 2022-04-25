import { ButtonHTMLAttributes } from 'react';
import '../styles/button.scss';

type ButtonPros = ButtonHTMLAttributes<HTMLButtonElement>

export function Button (props: ButtonPros) {
  return (
    <button className="button" {...props}>

    </button>
  );
}