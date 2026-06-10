import { useRef, ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { useMagnetic, MagneticOptions } from '@/lib/animations/hooks/useMagnetic';

interface SharedProps {
  children: ReactNode;
  className?: string;
  magneticOptions?: MagneticOptions;
}

type ButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };
type AnchorProps = SharedProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' };
type SpanProps = SharedProps & { as?: 'span' };
type DivProps = SharedProps & { as: 'div' };

type MagneticButtonProps = ButtonProps | AnchorProps | SpanProps | DivProps;

export default function MagneticButton(props: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const { children, className = '', magneticOptions } = props;
  const as = (props as SharedProps & { as?: string }).as || 'button';

  useMagnetic(ref, magneticOptions);

  const cls = `magnetic-btn${className ? ' ' + className : ''}`;

  switch (as) {
    case 'a': {
      const { href, target, rel, download, ...rest } = props as AnchorProps;
      return <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} target={target} rel={rel} download={download} className={cls} {...rest}>{children}</a>;
    }
    case 'span': {
      const { ...rest } = props as SpanProps;
      return <span ref={ref as React.Ref<HTMLSpanElement>} className={cls} {...rest}>{children}</span>;
    }
    case 'div': {
      const { ...rest } = props as DivProps;
      return <div ref={ref as React.Ref<HTMLDivElement>} className={cls} {...rest}>{children}</div>;
    }
    default: {
      const { onClick, disabled, type, ...rest } = props as ButtonProps;
      return <button ref={ref as React.Ref<HTMLButtonElement>} onClick={onClick} disabled={disabled} type={type || 'button'} className={cls} {...rest}>{children}</button>;
    }
  }
}