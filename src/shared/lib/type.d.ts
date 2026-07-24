interface HTMLButtonElement {
  commandFor?: string;
  command?: string;
}

declare namespace React {
  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    commandfor?: string;
    command?: string;
  }
}
