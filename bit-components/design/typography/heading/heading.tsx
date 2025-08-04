import type { CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './heading.module.scss';

export type HeadingProps = {
  /**
   * The semantic heading level, from 1 to 6.
   * This determines the HTML tag rendered (e.g., h1, h2).
   */
  level: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * The visual heading level, from 1 to 6.
   * This controls the styling (font size, weight) of the heading,
   * allowing it to differ from its semantic level.
   * If not provided, it defaults to the value of the `level` prop.
   */
  visualLevel?: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * The content to be displayed within the heading.
   */
  children?: ReactNode;

  /**
   * Optional CSS class to apply to the heading element.
   */
  className?: string;

  /**
   * Optional inline styles to apply to the heading element.
   */
  style?: CSSProperties;
};

/**
 * A component for rendering semantic and visually consistent headings.
 * It allows decoupling the semantic HTML tag (h1-h6) from its visual presentation.
 */
export function Heading({
  level,
  visualLevel,
  children,
  className,
  style,
}: HeadingProps) {
  const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements;
  const effectiveVisualLevel = visualLevel || level;

  return (
    <HeadingTag
      style={style}
      className={classNames(
        styles.heading,
        styles[`h${effectiveVisualLevel}`],
        className
      )}
    >
      {children}
    </HeadingTag>
  );
}