import React from 'react';
import { Heading } from './heading.js';

export const AllHeadingLevels = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
      <Heading level={1}>Heading Level 1</Heading>
      <Heading level={2}>Heading Level 2</Heading>
      <Heading level={3}>Heading Level 3</Heading>
      <Heading level={4}>Heading Level 4</Heading>
      <Heading level={5}>Heading Level 5</Heading>
      <Heading level={6}>Heading Level 6</Heading>
    </div>
  );
};

export const DecoupledSemanticAndVisualLevels = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
      <div>
        <Heading level={1} visualLevel={6}>
          This is a semantic H1 tag, but styled as an H6.
        </Heading>
        <p style={{ margin: '4px 0 0', color: 'var(--colors-text-secondary)' }}>
          Inspect the element above to see it is an `h1` tag.
        </p>
      </div>
      <div>
        <Heading level={6} visualLevel={1}>
          This is a semantic H6 tag, but styled as an H1.
        </Heading>
        <p style={{ margin: '4px 0 0', color: 'var(--colors-text-secondary)' }}>
          Inspect the element above to see it is an `h6` tag.
        </p>
      </div>
      <div>
        <Heading level={2} visualLevel={4}>
          This is a semantic H2 tag, styled as an H4.
        </Heading>
        <p style={{ margin: '4px 0 0', color: 'var(--colors-text-secondary)' }}>
          This is useful for maintaining semantic HTML structure while having full control over visual hierarchy.
        </p>
      </div>
    </div>
  );
};

export const WithCustomStyling = () => {
  return (
    <div style={{ padding: '16px' }}>
      <Heading
        level={1}
        style={{ color: 'var(--colors-primary-default)', textTransform: 'uppercase' }}
      >
        Custom Styled Heading
      </Heading>
    </div>
  );
};